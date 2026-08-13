$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root
$port = 8765
$prefix = "http://127.0.0.1:$port/"
$configPath = Join-Path $root "admin-config.json"
$script:sessions = @{}

$allowedSaves = @(
  "all-heroes.json",
  "items-data.json",
  "featured-heroes.json"
)

$blockedNames = @(
  "admin-config.json",
  "serve.ps1",
  "serve.log",
  "OCHISH.bat",
  "SAYTNİ-OCHISH.bat"
)

function Get-AdminConfig {
  if (Test-Path $configPath) {
    return Get-Content -LiteralPath $configPath -Raw -Encoding UTF8 | ConvertFrom-Json
  }
  return [pscustomobject]@{ username = "admin"; password = "mlbb2026" }
}

function Save-AdminConfig($cfg) {
  $json = @{
    username = [string]$cfg.username
    password = [string]$cfg.password
  } | ConvertTo-Json -Depth 5
  [IO.File]::WriteAllText($configPath, $json, [Text.UTF8Encoding]::new($false))
}

function Read-Body($req) {
  if ($req.ContentLength64 -gt 12MB) {
    throw "Body too large"
  }
  $reader = New-Object IO.StreamReader($req.InputStream, [Text.Encoding]::UTF8)
  try {
    return $reader.ReadToEnd()
  } finally {
    $reader.Close()
  }
}

function Send-Json($ctx, $obj, $code = 200) {
  $json = $obj | ConvertTo-Json -Depth 8 -Compress
  $bytes = [Text.Encoding]::UTF8.GetBytes($json)
  $ctx.Response.StatusCode = $code
  $ctx.Response.ContentType = "application/json; charset=utf-8"
  $ctx.Response.Headers.Add("Cache-Control", "no-store")
  $ctx.Response.ContentLength64 = $bytes.Length
  $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
  $ctx.Response.Close()
}

function Set-SessionCookie($ctx, $token, $clear = $false) {
  if ($clear) {
    $ctx.Response.Headers.Add("Set-Cookie", "mlbb_admin=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0")
  } else {
    $ctx.Response.Headers.Add("Set-Cookie", "mlbb_admin=$token; Path=/; HttpOnly; SameSite=Lax")
  }
}

function Get-SessionToken($ctx) {
  $c = $ctx.Request.Cookies["mlbb_admin"]
  if ($c -and -not [string]::IsNullOrWhiteSpace($c.Value)) { return $c.Value }
  $header = [string]$ctx.Request.Headers["Cookie"]
  if ($header -match "mlbb_admin=([A-Fa-f0-9]+)") { return $Matches[1] }
  return $null
}

function Get-Session($ctx) {
  $token = Get-SessionToken $ctx
  if ([string]::IsNullOrWhiteSpace($token)) { return $null }
  if ($script:sessions.ContainsKey($token)) { return $script:sessions[$token] }
  return $null
}

function Get-RequestCsrf($ctx) {
  $h = [string]$ctx.Request.Headers["X-Admin-Csrf"]
  if ([string]::IsNullOrWhiteSpace($h)) {
    $h = [string]$ctx.Request.Headers["x-admin-csrf"]
  }
  return $h
}

function Assert-Admin($ctx) {
  $s = Get-Session $ctx
  if ($null -eq $s) {
    Send-Json $ctx @{ ok = $false; error = "Unauthorized" } 401
    return $false
  }
  $csrf = Get-RequestCsrf $ctx
  if ([string]::IsNullOrWhiteSpace($csrf) -or $csrf -ne [string]$s.csrf) {
    Send-Json $ctx @{ ok = $false; error = "Unauthorized" } 401
    return $false
  }
  return $true
}

function Read-JsonFile($name) {
  $path = Join-Path $root $name
  if (-not (Test-Path -LiteralPath $path)) { return $null }
  return Get-Content -LiteralPath $path -Raw -Encoding UTF8 | ConvertFrom-Json
}

function Handle-Api($ctx) {
  $method = $ctx.Request.HttpMethod.ToUpperInvariant()
  $path = $ctx.Request.Url.AbsolutePath.TrimEnd('/')
  if ([string]::IsNullOrWhiteSpace($path)) { $path = "/" }

  if ($method -eq "POST" -and $path -eq "/api/login") {
    $body = Read-Body $ctx.Request | ConvertFrom-Json
    $cfg = Get-AdminConfig
    $user = [string]$body.username
    $pass = [string]$body.password
    if ([string]::IsNullOrWhiteSpace($user) -or [string]::IsNullOrWhiteSpace($pass)) {
      Send-Json $ctx @{ ok = $false; error = "Login va parol shart" } 401
      return
    }
    if ($user -eq [string]$cfg.username -and $pass -eq [string]$cfg.password) {
      $token = [guid]::NewGuid().ToString("N")
      $csrf = [guid]::NewGuid().ToString("N")
      $script:sessions[$token] = @{ username = $user; csrf = $csrf; at = (Get-Date) }
      Set-SessionCookie $ctx $token
      Send-Json $ctx @{ ok = $true; username = $user; csrf = $csrf }
    } else {
      Send-Json $ctx @{ ok = $false; error = "Login yoki parol noto‘g‘ri" } 401
    }
    return
  }

  if ($method -eq "POST" -and $path -eq "/api/logout") {
    $token = Get-SessionToken $ctx
    if ($token -and $script:sessions.ContainsKey($token)) {
      $script:sessions.Remove($token)
    }
    Set-SessionCookie $ctx "" $true
    Send-Json $ctx @{ ok = $true }
    return
  }

  if ($method -eq "GET" -and $path -eq "/api/me") {
    Send-Json $ctx @{ ok = $false; error = "Login required" } 401
    return
  }

  if ($method -eq "GET" -and $path.StartsWith("/api/data/")) {
    if (-not (Assert-Admin $ctx)) { return }
    $name = [IO.Path]::GetFileName([Uri]::UnescapeDataString($path.Substring("/api/data/".Length)))
    if ($allowedSaves -notcontains $name) {
      Send-Json $ctx @{ ok = $false; error = "File not allowed" } 400
      return
    }
    $filePath = Join-Path $root $name
    if (-not (Test-Path -LiteralPath $filePath)) {
      Send-Json $ctx @{ ok = $false; error = "Not found" } 404
      return
    }
    $bytes = [IO.File]::ReadAllBytes($filePath)
    $ctx.Response.StatusCode = 200
    $ctx.Response.ContentType = "application/json; charset=utf-8"
    $ctx.Response.Headers.Add("Cache-Control", "no-store")
    $ctx.Response.ContentLength64 = $bytes.Length
    $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    $ctx.Response.Close()
    return
  }

  if ($method -eq "GET" -and $path -eq "/api/stats") {
    if (-not (Assert-Admin $ctx)) { return }
    $heroes = Read-JsonFile "all-heroes.json"
    $items = Read-JsonFile "items-data.json"
    $feat = Read-JsonFile "featured-heroes.json"
    $heroCount = 0
    if ($heroes -and $heroes.heroes) { $heroCount = @($heroes.heroes).Count }
    $itemCount = 0
    if ($items -and $items.items) { $itemCount = @($items.items).Count }
    $featCount = 0
    if ($feat -and $feat.heroes) { $featCount = @($feat.heroes).Count }
    Send-Json $ctx @{
      ok = $true
      heroes = $heroCount
      items = $itemCount
      featured = $featCount
    }
    return
  }

  if ($method -eq "PUT" -and $path.StartsWith("/api/save/")) {
    if (-not (Assert-Admin $ctx)) { return }
    $name = [Uri]::UnescapeDataString($path.Substring("/api/save/".Length))
    $name = [IO.Path]::GetFileName($name)
    if ($allowedSaves -notcontains $name) {
      Send-Json $ctx @{ ok = $false; error = "File not allowed" } 400
      return
    }
    $raw = Read-Body $ctx.Request
    try {
      $null = $raw | ConvertFrom-Json
    } catch {
      Send-Json $ctx @{ ok = $false; error = "JSON noto‘g‘ri" } 400
      return
    }
    $filePath = Join-Path $root $name
    [IO.File]::WriteAllText($filePath, $raw, [Text.UTF8Encoding]::new($false))
    Send-Json $ctx @{ ok = $true; file = $name }
    return
  }

  if ($method -eq "POST" -and $path -eq "/api/password") {
    if (-not (Assert-Admin $ctx)) { return }
    $body = Read-Body $ctx.Request | ConvertFrom-Json
    $cfg = Get-AdminConfig
    if ([string]$body.current -ne [string]$cfg.password) {
      Send-Json $ctx @{ ok = $false; error = "Joriy parol noto‘g‘ri" } 400
      return
    }
    $next = [string]$body.next
    if ($next.Length -lt 6) {
      Send-Json $ctx @{ ok = $false; error = "Yangi parol kamida 6 belgi bo‘lsin" } 400
      return
    }
    $cfg.password = $next
    Save-AdminConfig $cfg
    Send-Json $ctx @{ ok = $true }
    return
  }

  Send-Json $ctx @{ ok = $false; error = "Not found" } 404
}

try {
  $h = New-Object System.Net.HttpListener
  $h.Prefixes.Add($prefix)
  $h.Start()
} catch {
  Write-Host "HttpListener failed: $_"
  exit 1
}
Write-Host "Serving $root at $prefix"
Write-Host "Admin panel: ${prefix}admin.html"

while ($h.IsListening) {
  $ctx = $h.GetContext()
  try {
    $local = $ctx.Request.Url.LocalPath.TrimStart('/')
    $absPath = $ctx.Request.Url.AbsolutePath

    if ($absPath.StartsWith("/api/")) {
      Handle-Api $ctx
      continue
    }

    $httpMethod = $ctx.Request.HttpMethod.ToUpperInvariant()
    if ($httpMethod -ne "GET" -and $httpMethod -ne "HEAD") {
      $ctx.Response.StatusCode = 405
      $ctx.Response.Close()
      continue
    }

    if ([string]::IsNullOrWhiteSpace($local)) { $local = "index.html" }
    $local = [Uri]::UnescapeDataString($local)
    $baseName = [IO.Path]::GetFileName($local)
    if ($blockedNames -contains $baseName) {
      $ctx.Response.StatusCode = 403
      $ctx.Response.Close()
      continue
    }

    $path = [IO.Path]::GetFullPath((Join-Path $root ($local -replace '/', [IO.Path]::DirectorySeparatorChar)))
    if (-not $path.StartsWith($root, [StringComparison]::OrdinalIgnoreCase)) {
      $ctx.Response.StatusCode = 403
      $ctx.Response.Close()
      continue
    }
    if (Test-Path $path -PathType Leaf) {
      $ext = [IO.Path]::GetExtension($path).ToLowerInvariant()
      $types = @{
        ".html" = "text/html; charset=utf-8"
        ".css" = "text/css; charset=utf-8"
        ".js" = "application/javascript; charset=utf-8"
        ".json" = "application/json; charset=utf-8"
        ".png" = "image/png"
        ".jpg" = "image/jpeg"
        ".jpeg" = "image/jpeg"
        ".webp" = "image/webp"
        ".svg" = "image/svg+xml"
        ".ico" = "image/x-icon"
      }
      if ($types.ContainsKey($ext)) { $ctx.Response.ContentType = $types[$ext] }
      else { $ctx.Response.ContentType = "application/octet-stream" }
      $bytes = [IO.File]::ReadAllBytes($path)
      $ctx.Response.ContentLength64 = $bytes.Length
      $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $ctx.Response.StatusCode = 404
      $msg = [Text.Encoding]::UTF8.GetBytes("Not found")
      $ctx.Response.OutputStream.Write($msg, 0, $msg.Length)
    }
    $ctx.Response.Close()
  } catch {
    try {
      $ctx.Response.StatusCode = 500
      $msg = [Text.Encoding]::UTF8.GetBytes("Server error")
      $ctx.Response.OutputStream.Write($msg, 0, $msg.Length)
      $ctx.Response.Close()
    } catch {}
  }
}

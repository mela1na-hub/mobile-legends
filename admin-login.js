(function () {
  const form = document.getElementById("loginForm");
  const loginError = document.getElementById("loginError");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    loginError.hidden = true;
    const fd = new FormData(form);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        credentials: "same-origin",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: fd.get("username"),
          password: fd.get("password"),
        }),
      });
      let data = {};
      try {
        data = await res.json();
      } catch (_) {}
      if (!res.ok || !data.csrf) {
        loginError.textContent =
          data.error || "Login yoki parol noto‘g‘ri";
        loginError.hidden = false;
        return;
      }
      sessionStorage.setItem("mlbb_admin_csrf", data.csrf);
      sessionStorage.setItem("mlbb_admin_user", data.username || "admin");
      location.replace("admin-panel.html");
    } catch (_) {
      loginError.textContent =
        "Serverga ulanib bo‘lmadi. OCHISH.bat ni ishga tushiring.";
      loginError.hidden = false;
    }
  });
})();

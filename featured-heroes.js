(function () {
  const host = document.getElementById("featuredHeroes");
  if (!host) return;

  let heroes = [];

  function tt(key) {
    return window.MLBB && window.MLBB.t ? window.MLBB.t(key) : key;
  }

  function lang() {
    return window.MLBB && window.MLBB.getLang ? window.MLBB.getLang() : "en";
  }

  function pick(map) {
    if (!map) return "";
    if (typeof map === "string") return map;
    const l = lang();
    return map[l] || map.en || map.uz || map.ru || "";
  }

  function card(h) {
    const article = document.createElement("article");
    article.className = "hero-profile";

    const img = document.createElement("img");
    img.src = h.image || "";
    img.alt = h.name || "";
    img.width = 400;
    img.height = 520;
    img.loading = "lazy";

    const body = document.createElement("div");
    body.className = "hero-profile-body";

    const chip = document.createElement("span");
    chip.className = "chip-role";
    chip.textContent = h.role || "Hero";

    const name = document.createElement("h3");
    name.textContent = h.name || "";

    const skin = document.createElement("p");
    skin.className = "hero-skin";
    skin.textContent = pick(h.skin);

    const desc = document.createElement("p");
    desc.textContent = pick(h.desc);

    const ul = document.createElement("ul");
    const rows = [
      [tt("label_role"), h.role || ""],
      [tt("label_style"), pick(h.style)],
      [tt("label_tip"), pick(h.tip)],
    ];
    rows.forEach(([label, value]) => {
      const li = document.createElement("li");
      const strong = document.createElement("strong");
      strong.textContent = label;
      li.append(strong, document.createTextNode(": " + value));
      ul.appendChild(li);
    });

    body.append(chip, name, skin, desc, ul);
    article.append(img, body);
    return article;
  }

  function render() {
    host.innerHTML = "";
    if (!heroes.length) {
      const p = document.createElement("p");
      p.className = "section-lead";
      p.textContent = tt("roster_loading");
      host.appendChild(p);
      return;
    }
    const frag = document.createDocumentFragment();
    heroes.forEach((h) => frag.appendChild(card(h)));
    host.appendChild(frag);
  }

  fetch("featured-heroes.json", { cache: "no-store" })
    .then((r) => {
      if (!r.ok) throw new Error("fail");
      return r.json();
    })
    .then((data) => {
      heroes = Array.isArray(data.heroes) ? data.heroes : [];
      render();
    })
    .catch(() => {
      host.innerHTML =
        '<p class="section-lead">' + tt("roster_fail") + "</p>";
    });

  window.addEventListener("mlbb:lang", render);
})();

(function () {
  const grid = document.getElementById("itemsGrid");
  const filters = document.getElementById("itemFilters");
  if (!grid || !filters) return;

  let items = [];
  let active = "All";
  let categories = ["Attack", "Magic", "Defense", "Boots", "Jungle / Roam"];

  function tt(key, vars) {
    return window.MLBB && window.MLBB.t ? window.MLBB.t(key, vars) : key;
  }

  function catLabel(c) {
    const map = {
      All: "cat_all",
      Attack: "cat_attack",
      Magic: "cat_magic",
      Defense: "cat_defense",
      Boots: "cat_boots",
      "Jungle / Roam": "cat_jungle",
    };
    return map[c] ? tt(map[c]) : c;
  }

  function card(item) {
    const el = document.createElement("article");
    el.className = "item-card";
    el.dataset.category = item.category || "Attack";

    const img = document.createElement("img");
    img.src = item.icon;
    img.alt = item.name;
    img.loading = "lazy";
    img.width = 64;
    img.height = 64;
    img.onerror = () => {
      img.style.visibility = "hidden";
    };

    const body = document.createElement("div");
    body.className = "item-card-body";

    const cat = document.createElement("p");
    cat.className = "item-cat";
    cat.textContent = catLabel(item.category || "Attack");

    const title = document.createElement("h3");
    title.textContent = item.name;

    const des = document.createElement("p");
    des.className = "item-des";
    des.textContent = item.des || "";

    body.append(cat, title, des);
    el.append(img, body);
    return el;
  }

  function renderFilters() {
    const cats = ["All"].concat(categories);
    filters.innerHTML = "";
    cats.forEach((c) => {
      const b = document.createElement("button");
      b.type = "button";
      b.dataset.filter = c;
      b.textContent = catLabel(c);
      if (c === active) b.classList.add("is-active");
      filters.appendChild(b);
    });
  }

  function render() {
    grid.innerHTML = "";
    const list =
      active === "All" ? items : items.filter((i) => i.category === active);

    if (!list.length) {
      grid.innerHTML = '<p class="item-empty">' + tt("item_empty") + "</p>";
      return;
    }

    const frag = document.createDocumentFragment();
    list.forEach((item) => frag.appendChild(card(item)));
    grid.appendChild(frag);
  }

  function setActive(btn) {
    filters.querySelectorAll("button").forEach((b) => {
      b.classList.toggle("is-active", b === btn);
    });
    active = btn.dataset.filter || "All";
    render();
  }

  filters.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-filter]");
    if (!btn) return;
    setActive(btn);
  });

  fetch("items-data.json", { cache: "no-store" })
    .then((r) => {
      if (!r.ok) throw new Error("Failed to load items");
      return r.json();
    })
    .then((data) => {
      items = Array.isArray(data.items) ? data.items : [];
      categories =
        data.categories ||
        ["Attack", "Magic", "Defense", "Boots", "Jungle / Roam"];
      renderFilters();
      render();
    })
    .catch(() => {
      grid.innerHTML = '<p class="item-empty">' + tt("item_fail") + "</p>";
    });

  window.addEventListener("mlbb:lang", () => {
    if (items.length) {
      renderFilters();
      render();
    }
  });
})();

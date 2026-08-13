(function () {
  const grid = document.getElementById("itemsGrid");
  const filters = document.getElementById("itemFilters");
  if (!grid || !filters) return;

  const PAGE_ORDER = [
    "Attack",
    "Attack & Magic",
    "Defense",
    "Jungling",
    "Magic",
    "Movement",
    "Roam",
  ];

  let items = [];
  let active = "All";
  let categories = PAGE_ORDER.slice();

  function tt(key, vars) {
    return window.MLBB && window.MLBB.t ? window.MLBB.t(key, vars) : key;
  }

  function catLabel(c) {
    const map = {
      All: "cat_all",
      Attack: "cat_attack",
      "Attack & Magic": "cat_attack_magic",
      Defense: "cat_defense",
      Jungling: "cat_jungling",
      Magic: "cat_magic",
      Movement: "cat_movement",
      Roam: "cat_roam",
      Boots: "cat_movement",
      "Jungle / Roam": "cat_jungling",
    };
    return map[c] ? tt(map[c]) : c;
  }

  function slug(cat) {
    return "items-" + String(cat).toLowerCase().replace(/[^a-z0-9]+/g, "-");
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

    const title = document.createElement("h3");
    title.textContent = item.name;

    const des = document.createElement("p");
    des.className = "item-des";
    des.textContent = item.des || "";

    body.append(title, des);
    el.append(img, body);
    return el;
  }

  function usedCategories() {
    const present = new Set(items.map((i) => i.category || "Attack"));
    return PAGE_ORDER.filter((c) => present.has(c) || categories.includes(c)).filter(
      (c) => items.some((i) => i.category === c)
    );
  }

  function renderFilters() {
    const cats = ["All"].concat(usedCategories());
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

  function section(cat, list) {
    const wrap = document.createElement("section");
    wrap.className = "item-section";
    wrap.id = slug(cat);

    const head = document.createElement("div");
    head.className = "item-section-head";

    const h2 = document.createElement("h2");
    h2.textContent = catLabel(cat);

    const count = document.createElement("p");
    count.className = "item-section-count";
    count.textContent = String(list.length);

    head.append(h2, count);

    const inner = document.createElement("div");
    inner.className = "items-grid";
    list.forEach((item) => inner.appendChild(card(item)));

    wrap.append(head, inner);
    return wrap;
  }

  function render() {
    grid.innerHTML = "";
    const pages = usedCategories();
    const show = active === "All" ? pages : pages.filter((c) => c === active);
    const frag = document.createDocumentFragment();
    let any = false;

    show.forEach((cat) => {
      const list = items.filter((i) => i.category === cat);
      if (!list.length) return;
      any = true;
      frag.appendChild(section(cat, list));
    });

    if (!any) {
      grid.innerHTML = '<p class="item-empty">' + tt("item_empty") + "</p>";
      return;
    }

    grid.appendChild(frag);
  }

  function setActive(btn) {
    filters.querySelectorAll("button").forEach((b) => {
      b.classList.toggle("is-active", b === btn);
    });
    active = btn.dataset.filter || "All";
    render();
    if (active !== "All") {
      const target = document.getElementById(slug(active));
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      grid.scrollIntoView({ behavior: "smooth", block: "start" });
    }
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
      const fromFile = Array.isArray(data.categories) ? data.categories : [];
      categories = PAGE_ORDER.filter(
        (c) => fromFile.includes(c) || items.some((i) => i.category === c)
      );
      if (!categories.length) categories = PAGE_ORDER.slice();
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

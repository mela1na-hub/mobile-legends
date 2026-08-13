(function () {
  const ROLES = [
    "Marksman",
    "Mage",
    "Assassin",
    "Fighter",
    "Tank",
    "Support",
    "Support / Tank",
    "Tank / Support",
    "Fighter / Tank",
    "Assassin / Mage",
  ];
  const ITEM_CATS = ["Attack", "Magic", "Defense", "Boots", "Jungle / Roam"];
  const LANGS = [
    ["en", "EN"],
    ["uz", "UZ"],
    ["ru", "RU"],
  ];

  const appView = document.getElementById("appView");
  const viewRoot = document.getElementById("viewRoot");
  const viewTitle = document.getElementById("viewTitle");
  const whoami = document.getElementById("whoami");
  const modal = document.getElementById("editModal");
  const modalTitle = document.getElementById("modalTitle");
  const editForm = document.getElementById("editForm");
  const toastEl = document.getElementById("toast");
  let csrf = sessionStorage.getItem("mlbb_admin_csrf") || "";
  let authed = false;

  if (!appView || !csrf) {
    sessionStorage.removeItem("mlbb_admin_csrf");
    sessionStorage.removeItem("mlbb_admin_user");
    location.replace("admin.html");
    return;
  }

  const titles = {
    dash: "Dashboard",
    featured: "Tanlangan qahramonlar",
    heroes: "Barcha qahramonlar",
    items: "Ekipmanlar",
    password: "Parol",
  };

  const state = {
    view: "dash",
    username: "",
    heroes: [],
    items: [],
    categories: ITEM_CATS.slice(),
    featured: [],
    heroQuery: "",
    heroRole: "All",
    itemQuery: "",
    itemCat: "All",
    editing: null,
  };

  function toast(msg, isError) {
    toastEl.textContent = msg;
    toastEl.classList.toggle("is-error", !!isError);
    toastEl.hidden = false;
    clearTimeout(toast.t);
    toast.t = setTimeout(() => {
      toastEl.hidden = true;
    }, 2600);
  }

  function lockAdmin() {
    authed = false;
    csrf = "";
    sessionStorage.removeItem("mlbb_admin_csrf");
    sessionStorage.removeItem("mlbb_admin_user");
    location.replace("admin.html");
  }

  async function api(path, opts) {
    const headers = {
      "Content-Type": "application/json",
      ...((opts && opts.headers) || {}),
    };
    if (csrf) headers["X-Admin-Csrf"] = csrf;
    const res = await fetch(path, {
      credentials: "same-origin",
      cache: "no-store",
      ...opts,
      headers,
    });
    let data = {};
    try {
      data = await res.json();
    } catch (_) {}
    if (!res.ok) {
      if (res.status === 401 && path !== "/api/login") {
        lockAdmin();
      }
      const err = new Error(data.error || "Xatolik");
      err.status = res.status;
      throw err;
    }
    return data;
  }

  async function loadJson(file) {
    return api("/api/data/" + file);
  }

  async function saveFile(name, payload) {
    if (!authed || !csrf) {
      lockAdmin();
      throw new Error("Unauthorized");
    }
    await api("/api/save/" + name, {
      method: "PUT",
      body: JSON.stringify(payload, null, 2),
    });
  }

  function pick(map, lang) {
    if (!map || typeof map !== "object") return "";
    return map[lang] || map.en || map.uz || map.ru || "";
  }

  function closeModal() {
    modal.hidden = true;
    editForm.innerHTML = "";
    state.editing = null;
  }

  function openModal(title, fieldsHtml, onSubmit) {
    modalTitle.textContent = title;
    editForm.innerHTML = fieldsHtml;
    modal.hidden = false;
    editForm.onsubmit = async (e) => {
      e.preventDefault();
      const btn = editForm.querySelector("[type=submit]");
      if (btn) btn.disabled = true;
      try {
        await onSubmit(new FormData(editForm));
        closeModal();
      } catch (err) {
        toast(err.message || "Saqlanmadi", true);
      } finally {
        if (btn) btn.disabled = false;
      }
    };
  }

  function field(label, name, value, extra) {
    const type = (extra && extra.type) || "text";
    if (type === "textarea") {
      return (
        "<label>" +
        label +
        '<textarea name="' +
        name +
        '" ' +
        ((extra && extra.required) ? "required" : "") +
        ">" +
        escapeHtml(value || "") +
        "</textarea></label>"
      );
    }
    if (type === "select") {
      const opts = (extra.options || [])
        .map((o) => {
          const sel = o === value ? " selected" : "";
          return "<option" + sel + ">" + escapeHtml(o) + "</option>";
        })
        .join("");
      return (
        "<label>" +
        label +
        '<select name="' +
        name +
        '">' +
        opts +
        "</select></label>"
      );
    }
    return (
      "<label>" +
      label +
      '<input type="' +
      type +
      '" name="' +
      name +
      '" value="' +
      escapeAttr(value || "") +
      '" ' +
      ((extra && extra.required) ? "required" : "") +
      " /></label>"
    );
  }

  function langTriple(prefix, obj, labels) {
    return LANGS.map(([code, short]) =>
      field(labels + " (" + short + ")", prefix + "_" + code, pick(obj, code), {
        type: prefix === "desc" || prefix === "des" ? "textarea" : "text",
      })
    ).join("");
  }

  function fromLang(fd, prefix) {
    return {
      en: String(fd.get(prefix + "_en") || ""),
      uz: String(fd.get(prefix + "_uz") || ""),
      ru: String(fd.get(prefix + "_ru") || ""),
    };
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function escapeAttr(s) {
    return escapeHtml(s).replace(/"/g, "&quot;");
  }

  function actionsHtml() {
    return (
      '<div class="admin-form-actions">' +
      '<button type="button" class="btn btn-store" data-close-modal>Bekor</button>' +
      '<button type="submit" class="btn btn-play">Saqlash</button>' +
      "</div>"
    );
  }

  async function loadAll() {
    const [heroesData, itemsData, featData] = await Promise.all([
      loadJson("all-heroes.json"),
      loadJson("items-data.json"),
      loadJson("featured-heroes.json"),
    ]);
    state.heroes = Array.isArray(heroesData.heroes) ? heroesData.heroes : [];
    state.items = Array.isArray(itemsData.items) ? itemsData.items : [];
    state.categories = itemsData.categories || ITEM_CATS.slice();
    state.featured = Array.isArray(featData.heroes) ? featData.heroes : [];
  }

  async function saveHeroes() {
    await saveFile("all-heroes.json", {
      count: state.heroes.length,
      heroes: state.heroes,
    });
    toast("Qahramonlar saqlandi");
  }

  async function saveItems() {
    await saveFile("items-data.json", {
      categories: state.categories,
      items: state.items,
    });
    toast("Ekipmanlar saqlandi");
  }

  async function saveFeatured() {
    await saveFile("featured-heroes.json", { heroes: state.featured });
    toast("Tanlangan qahramonlar saqlandi");
  }

  function renderDash() {
    viewRoot.innerHTML =
      '<div class="admin-stats">' +
      '<div class="admin-stat"><b>' +
      state.heroes.length +
      "</b><span>Qahramonlar</span></div>" +
      '<div class="admin-stat"><b>' +
      state.items.length +
      "</b><span>Ekipmanlar</span></div>" +
      '<div class="admin-stat"><b>' +
      state.featured.length +
      "</b><span>Tanlangan kartalar</span></div>" +
      "</div>" +
      '<p class="admin-help">Bu yerdan Heroes sahifasidagi tanlangan kartalar, to‘liq qahramonlar ro‘yxati va ekipmanlarni qo‘shish, tahrirlash yoki o‘chirish mumkin. Saqlangandan so‘ng o‘zgarishlar saytda darhol ko‘rinadi.</p>';
  }

  function renderFeatured() {
    const cards = state.featured
      .map((h, i) => {
        return (
          '<article class="admin-feat-card" data-i="' +
          i +
          '">' +
          '<img src="' +
          escapeAttr(h.image || "") +
          '" alt="" />' +
          "<div><h3>" +
          escapeHtml(h.name || "") +
          "</h3><p>" +
          escapeHtml(h.role || "") +
          " · " +
          escapeHtml(pick(h.skin, "uz") || pick(h.skin, "en")) +
          "</p></div>" +
          '<div class="row-actions">' +
          '<button type="button" class="admin-mini" data-act="edit">Tahrir</button>' +
          '<button type="button" class="admin-mini danger" data-act="del">O‘chirish</button>' +
          "</div></article>"
        );
      })
      .join("");
    viewRoot.innerHTML =
      '<div class="admin-toolbar">' +
      '<button type="button" class="btn btn-play" id="addFeat">+ Yangi karta</button>' +
      "</div>" +
      '<div class="admin-feat-grid">' +
      (cards || "<p class='admin-help'>Hali tanlangan qahramon yo‘q.</p>") +
      "</div>";

    document.getElementById("addFeat").onclick = () => editFeatured(-1);
    viewRoot.querySelectorAll(".admin-feat-card").forEach((card) => {
      const i = Number(card.dataset.i);
      card.querySelector('[data-act="edit"]').onclick = () => editFeatured(i);
      card.querySelector('[data-act="del"]').onclick = async () => {
        if (!confirm("Bu kartani o‘chirasizmi?")) return;
        state.featured.splice(i, 1);
        await saveFeatured();
        render();
      };
    });
  }

  function editFeatured(index) {
    const h =
      index >= 0
        ? state.featured[index]
        : {
            name: "",
            role: "Marksman",
            image: "",
            skin: {},
            desc: {},
            style: {},
            tip: {},
          };
    openModal(
      index >= 0 ? "Kartani tahrirlash" : "Yangi karta",
      field("Ism", "name", h.name, { required: true }) +
        '<div class="admin-form-row">' +
        field("Rol", "role", h.role, { type: "select", options: ROLES }) +
        field("Rasm URL", "image", h.image, { required: true }) +
        "</div>" +
        langTriple("skin", h.skin, "Skin") +
        langTriple("desc", h.desc, "Tavsif") +
        langTriple("style", h.style, "Uslub") +
        langTriple("tip", h.tip, "Maslahat") +
        actionsHtml(),
      async (fd) => {
        const next = {
          name: String(fd.get("name") || "").trim(),
          role: String(fd.get("role") || "Hero"),
          image: String(fd.get("image") || "").trim(),
          skin: fromLang(fd, "skin"),
          desc: fromLang(fd, "desc"),
          style: fromLang(fd, "style"),
          tip: fromLang(fd, "tip"),
        };
        if (index >= 0) state.featured[index] = next;
        else state.featured.push(next);
        await saveFeatured();
        render();
      }
    );
  }

  function filteredHeroes() {
    const q = state.heroQuery.toLowerCase();
    return state.heroes.filter((h) => {
      if (state.heroRole !== "All" && String(h.type || "") !== state.heroRole)
        return false;
      if (!q) return true;
      return (
        String(h.name || "").toLowerCase().includes(q) ||
        String(h.id || "").includes(q)
      );
    });
  }

  function renderHeroes() {
    const roles = ["All"].concat(
      Array.from(new Set(state.heroes.map((h) => h.type || "Hero"))).sort()
    );
    const rows = filteredHeroes()
      .map((h) => {
        const idx = state.heroes.indexOf(h);
        return (
          "<tr>" +
          "<td><img src=\"" +
          escapeAttr(h.icon || "") +
          '" alt="" /></td>' +
          "<td>" +
          escapeHtml(h.name) +
          "</td>" +
          "<td>" +
          escapeHtml(h.type || "") +
          "</td>" +
          "<td>" +
          escapeHtml(h.id || "") +
          "</td>" +
          '<td class="row-actions">' +
          '<button type="button" class="admin-mini" data-act="edit" data-i="' +
          idx +
          '">Tahrir</button>' +
          '<button type="button" class="admin-mini danger" data-act="del" data-i="' +
          idx +
          '">O‘chirish</button>' +
          "</td></tr>"
        );
      })
      .join("");

    viewRoot.innerHTML =
      '<div class="admin-toolbar">' +
      '<input type="search" id="heroQ" placeholder="Qidirish…" value="' +
      escapeAttr(state.heroQuery) +
      '" />' +
      '<select id="heroRole">' +
      roles
        .map((r) => {
          const sel = r === state.heroRole ? " selected" : "";
          return "<option" + sel + ">" + escapeHtml(r) + "</option>";
        })
        .join("") +
      "</select>" +
      '<button type="button" class="btn btn-play" id="addHero">+ Qahramon</button>' +
      "<span class='admin-help' style='margin:0'>" +
      filteredHeroes().length +
      " / " +
      state.heroes.length +
      "</span></div>" +
      '<div class="admin-table-wrap"><table class="admin-table"><thead><tr>' +
      "<th>Icon</th><th>Ism</th><th>Rol</th><th>ID</th><th></th>" +
      "</tr></thead><tbody>" +
      (rows || "<tr><td colspan='5'>Hech narsa topilmadi</td></tr>") +
      "</tbody></table></div>";

    document.getElementById("heroQ").oninput = (e) => {
      state.heroQuery = e.target.value;
      renderHeroes();
      document.getElementById("heroQ").focus();
      const el = document.getElementById("heroQ");
      el.setSelectionRange(el.value.length, el.value.length);
    };
    document.getElementById("heroRole").onchange = (e) => {
      state.heroRole = e.target.value;
      renderHeroes();
    };
    document.getElementById("addHero").onclick = () => editHero(-1);
    viewRoot.querySelectorAll("[data-act]").forEach((btn) => {
      const i = Number(btn.dataset.i);
      if (btn.dataset.act === "edit") btn.onclick = () => editHero(i);
      if (btn.dataset.act === "del")
        btn.onclick = async () => {
          if (!confirm(state.heroes[i].name + " o‘chirilsinmi?")) return;
          state.heroes.splice(i, 1);
          await saveHeroes();
          render();
        };
    });
  }

  function editHero(index) {
    const h =
      index >= 0
        ? state.heroes[index]
        : { id: "", name: "", type: "Marksman", icon: "", des: "" };
    const roleOpts = Array.from(new Set(ROLES.concat(h.type || [])));
    openModal(
      index >= 0 ? h.name : "Yangi qahramon",
      '<div class="admin-form-row">' +
        field("Ism", "name", h.name, { required: true }) +
        field("ID", "id", h.id, { required: true }) +
        "</div>" +
        '<div class="admin-form-row">' +
        field("Rol", "type", h.type, { type: "select", options: roleOpts }) +
        field("Icon URL", "icon", h.icon, { required: true }) +
        "</div>" +
        field("Tavsif", "des", h.des, { type: "textarea" }) +
        (h.icon
          ? '<img class="admin-preview" src="' + escapeAttr(h.icon) + '" alt="" />'
          : "") +
        actionsHtml(),
      async (fd) => {
        const next = {
          id: String(fd.get("id") || "").trim(),
          name: String(fd.get("name") || "").trim(),
          type: String(fd.get("type") || "Hero"),
          icon: String(fd.get("icon") || "").trim(),
          des: String(fd.get("des") || ""),
        };
        if (index >= 0) {
          const prev = state.heroes[index];
          state.heroes[index] = { ...prev, ...next };
        } else {
          state.heroes.unshift(next);
        }
        await saveHeroes();
        render();
      }
    );
  }

  function filteredItems() {
    const q = state.itemQuery.toLowerCase();
    return state.items.filter((it) => {
      if (state.itemCat !== "All" && it.category !== state.itemCat) return false;
      if (!q) return true;
      return String(it.name || "").toLowerCase().includes(q);
    });
  }

  function renderItems() {
    const cats = ["All"].concat(state.categories);
    const rows = filteredItems()
      .map((it) => {
        const idx = state.items.indexOf(it);
        return (
          "<tr>" +
          "<td><img src=\"" +
          escapeAttr(it.icon || "") +
          '" alt="" /></td>' +
          "<td>" +
          escapeHtml(it.name) +
          "</td>" +
          "<td>" +
          escapeHtml(it.category || "") +
          "</td>" +
          "<td>" +
          escapeHtml((it.des || "").slice(0, 90)) +
          (String(it.des || "").length > 90 ? "…" : "") +
          "</td>" +
          '<td class="row-actions">' +
          '<button type="button" class="admin-mini" data-act="edit" data-i="' +
          idx +
          '">Tahrir</button>' +
          '<button type="button" class="admin-mini danger" data-act="del" data-i="' +
          idx +
          '">O‘chirish</button>' +
          "</td></tr>"
        );
      })
      .join("");

    viewRoot.innerHTML =
      '<div class="admin-toolbar">' +
      '<input type="search" id="itemQ" placeholder="Qidirish…" value="' +
      escapeAttr(state.itemQuery) +
      '" />' +
      '<select id="itemCat">' +
      cats
        .map((c) => {
          const sel = c === state.itemCat ? " selected" : "";
          return "<option" + sel + ">" + escapeHtml(c) + "</option>";
        })
        .join("") +
      "</select>" +
      '<button type="button" class="btn btn-play" id="addItem">+ Item</button>' +
      "<span class='admin-help' style='margin:0'>" +
      filteredItems().length +
      " / " +
      state.items.length +
      "</span></div>" +
      '<div class="admin-table-wrap"><table class="admin-table"><thead><tr>' +
      "<th>Icon</th><th>Nomi</th><th>Tur</th><th>Funksiya</th><th></th>" +
      "</tr></thead><tbody>" +
      (rows || "<tr><td colspan='5'>Hech narsa topilmadi</td></tr>") +
      "</tbody></table></div>";

    document.getElementById("itemQ").oninput = (e) => {
      state.itemQuery = e.target.value;
      renderItems();
      const el = document.getElementById("itemQ");
      el.focus();
      el.setSelectionRange(el.value.length, el.value.length);
    };
    document.getElementById("itemCat").onchange = (e) => {
      state.itemCat = e.target.value;
      renderItems();
    };
    document.getElementById("addItem").onclick = () => editItem(-1);
    viewRoot.querySelectorAll("[data-act]").forEach((btn) => {
      const i = Number(btn.dataset.i);
      if (btn.dataset.act === "edit") btn.onclick = () => editItem(i);
      if (btn.dataset.act === "del")
        btn.onclick = async () => {
          if (!confirm(state.items[i].name + " o‘chirilsinmi?")) return;
          state.items.splice(i, 1);
          await saveItems();
          render();
        };
    });
  }

  function nextItemId() {
    const ids = state.items.map((x) => Number(x.id) || 0);
    return (ids.length ? Math.max.apply(null, ids) : 3000) + 1;
  }

  function editItem(index) {
    const it =
      index >= 0
        ? state.items[index]
        : {
            id: nextItemId(),
            name: "",
            category: "Attack",
            icon: "",
            des: "",
          };
    openModal(
      index >= 0 ? it.name : "Yangi item",
      '<div class="admin-form-row">' +
        field("Nomi", "name", it.name, { required: true }) +
        field("Tur", "category", it.category, {
          type: "select",
          options: state.categories,
        }) +
        "</div>" +
        field("Icon URL", "icon", it.icon, { required: true }) +
        field("Funksiya / tavsif", "des", it.des, { type: "textarea" }) +
        '<input type="hidden" name="id" value="' +
        escapeAttr(it.id) +
        '" />' +
        (it.icon
          ? '<img class="admin-preview" src="' + escapeAttr(it.icon) + '" alt="" />'
          : "") +
        actionsHtml(),
      async (fd) => {
        const next = {
          id: Number(fd.get("id")) || nextItemId(),
          name: String(fd.get("name") || "").trim(),
          category: String(fd.get("category") || "Attack"),
          icon: String(fd.get("icon") || "").trim(),
          des: String(fd.get("des") || ""),
        };
        if (index >= 0) state.items[index] = next;
        else state.items.unshift(next);
        await saveItems();
        render();
      }
    );
  }

  function renderPassword() {
    viewRoot.innerHTML =
      '<form id="pwForm" class="admin-form" style="max-width:420px">' +
      field("Joriy parol", "current", "", { type: "password", required: true }) +
      field("Yangi parol", "next", "", { type: "password", required: true }) +
      '<button type="submit" class="btn btn-play">Parolni almashtirish</button>' +
      "</form>";
    document.getElementById("pwForm").onsubmit = async (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      try {
        await api("/api/password", {
          method: "POST",
          body: JSON.stringify({
            current: fd.get("current"),
            next: fd.get("next"),
          }),
        });
        toast("Parol yangilandi");
        e.target.reset();
      } catch (err) {
        toast(err.message || "Xatolik", true);
      }
    };
  }

  function render() {
    if (!authed) return;
    viewTitle.textContent = titles[state.view] || "Admin";
    document.querySelectorAll(".admin-nav button").forEach((b) => {
      b.classList.toggle("is-active", b.dataset.view === state.view);
    });
    if (state.view === "dash") renderDash();
    else if (state.view === "featured") renderFeatured();
    else if (state.view === "heroes") renderHeroes();
    else if (state.view === "items") renderItems();
    else if (state.view === "password") renderPassword();
  }

  async function boot() {
    csrf = sessionStorage.getItem("mlbb_admin_csrf") || "";
    if (!csrf) {
      lockAdmin();
      return;
    }
    authed = true;
    state.username = sessionStorage.getItem("mlbb_admin_user") || "admin";
    if (whoami) whoami.textContent = "Kirgan: " + state.username;
    try {
      await loadAll();
      render();
    } catch (err) {
      toast(err.message || "Ma’lumot yuklanmadi", true);
    }
  }

  document.getElementById("logoutBtn").addEventListener("click", async () => {
    try {
      await api("/api/logout", { method: "POST", body: "{}" });
    } catch (_) {}
    lockAdmin();
  });

  document.querySelectorAll(".admin-nav button").forEach((b) => {
    b.addEventListener("click", () => {
      state.view = b.dataset.view;
      render();
    });
  });

  modal.addEventListener("click", (e) => {
    if (e.target.closest("[data-close-modal]")) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });

  boot();
})();

(function () {
  const btn = document.getElementById("allHeroesBtn");
  const panel = document.getElementById("allHeroesPanel");
  const grid = document.getElementById("allHeroesGrid");
  const lead = document.getElementById("allHeroesLead");
  const closeBtn = document.getElementById("allHeroesClose");
  const modal = document.getElementById("heroDetailModal");
  const skillsEl = document.getElementById("heroDetailSkills");
  if (!btn || !panel || !grid) return;

  let heroes = [];
  let loaded = false;
  let lastDetail = null;

  function tt(key, vars) {
    return window.MLBB && window.MLBB.t ? window.MLBB.t(key, vars) : key;
  }

  function primaryRoleKey(type) {
    const t = String(type || "Hero").toLowerCase();
    if (t.includes("marksman")) return "marksman";
    if (t.includes("mage")) return "mage";
    if (t.includes("assassin")) return "assassin";
    if (t.includes("fighter")) return "fighter";
    if (t.includes("tank")) return "tank";
    if (t.includes("support")) return "support";
    return "fighter";
  }

  function styleFor(key) {
    return tt("style_" + key);
  }

  function tipFor(key) {
    return tt("tip_" + key);
  }

  function fixUrl(url) {
    if (!url) return "";
    const s = String(url);
    return s.startsWith("//") ? "https:" + s : s;
  }

  function enrich(hero) {
    const role = hero.type || hero.role || "Hero";
    const key = primaryRoleKey(role);
    const parts = String(role)
      .split(/[\/,&]+/)
      .map((s) => s.trim())
      .filter(Boolean);
    let style = parts
      .map((p) => styleFor(primaryRoleKey(p)))
      .filter(Boolean)
      .filter((v, i, a) => a.indexOf(v) === i)
      .join(" · ");
    if (!style) style = styleFor(key);
    const tip = tipFor(key) || tt("tip_default");
    return {
      ...hero,
      role,
      style,
      tip,
      des: hero.des || "",
    };
  }

  function metaList(hero) {
    const ul = document.createElement("ul");
    ul.className = "hero-meta";
    [
      [tt("label_role"), hero.role],
      [tt("label_style"), hero.style],
      [tt("label_tip"), hero.tip],
    ].forEach(([label, value]) => {
      const li = document.createElement("li");
      const strong = document.createElement("strong");
      strong.textContent = label + ":";
      li.append(strong, document.createTextNode(" " + value));
      ul.appendChild(li);
    });
    return ul;
  }

  function openPanel() {
    panel.hidden = false;
    btn.setAttribute("aria-expanded", "true");
    btn.classList.add("is-open");
    panel.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function closePanel() {
    panel.hidden = true;
    btn.setAttribute("aria-expanded", "false");
    btn.classList.remove("is-open");
  }

  function renderGrid() {
    grid.innerHTML = "";
    const frag = document.createDocumentFragment();
    heroes.forEach((raw, index) => {
      const hero = enrich(raw);
      const card = document.createElement("button");
      card.type = "button";
      card.className = "all-hero-card";

      const imgWrap = document.createElement("span");
      imgWrap.className = "all-hero-art";
      const img = document.createElement("img");
      img.src = fixUrl(hero.icon);
      img.alt = hero.name;
      img.loading = "lazy";
      img.width = 200;
      img.height = 200;
      img.decoding = "async";
      imgWrap.appendChild(img);

      const body = document.createElement("span");
      body.className = "all-hero-body";
      const chip = document.createElement("small");
      chip.className = "chip-role";
      chip.textContent = hero.role;
      const name = document.createElement("strong");
      name.textContent = hero.name;
      body.append(chip, name, metaList(hero));

      card.append(imgWrap, body);
      card.addEventListener("click", () => openDetail(hero));
      frag.appendChild(card);
    });
    grid.appendChild(frag);
    if (lead) {
      lead.textContent = tt("roster_count", { n: heroes.length });
    }
  }

  function openDetail(hero) {
    if (!modal) return;
    const h = enrich(hero);
    lastDetail = hero;
    document.getElementById("heroDetailIcon").src = fixUrl(h.icon);
    document.getElementById("heroDetailIcon").alt = h.name;
    document.getElementById("heroDetailType").textContent = h.role;
    document.getElementById("heroDetailName").textContent = h.name;

    const desEl = document.getElementById("heroDetailDes");
    desEl.textContent = h.des || "";
    let metaHost = document.getElementById("heroDetailMeta");
    if (!metaHost) {
      metaHost = document.createElement("div");
      metaHost.id = "heroDetailMeta";
      desEl.parentNode.insertBefore(metaHost, desEl.nextSibling);
    }
    metaHost.innerHTML = "";
    metaHost.appendChild(metaList(h));

    skillsEl.innerHTML =
      "<p class='skill-empty'>" + tt("skills_loading") + "</p>";
    modal.hidden = false;
    document.body.style.overflow = "hidden";

    fetch(
      "https://mapi.mobilelegends.com/hero/detail?id=" + encodeURIComponent(h.id)
    )
      .then((r) => r.json())
      .then((data) => {
        const d = data && data.data ? data.data : null;
        if (!d) throw new Error("No detail");
        if (d.des) desEl.textContent = d.des;
        if (d.type) {
          document.getElementById("heroDetailType").textContent = d.type;
          const updated = enrich({ ...h, type: d.type });
          metaHost.innerHTML = "";
          metaHost.appendChild(metaList(updated));
        }
        const skills =
          (d.skill && d.skill.skill) ||
          (Array.isArray(d.skill) ? d.skill : []) ||
          [];
        skillsEl.innerHTML = "";
        if (!skills.length) {
          skillsEl.innerHTML =
            "<p class='skill-empty'>" + tt("skills_none") + "</p>";
          return;
        }
        skills.forEach((sk, i) => {
          const item = document.createElement("article");
          item.className = "skill-item";
          const head = document.createElement("div");
          head.className = "skill-head";
          if (sk.icon) {
            const ic = document.createElement("img");
            ic.src = fixUrl(sk.icon);
            ic.alt = "";
            head.appendChild(ic);
          }
          const titleWrap = document.createElement("div");
          const label = document.createElement("span");
          label.className = "skill-label";
          label.textContent =
            i === 0 ? tt("skill_passive") : tt("skill_n", { n: i });
          const h5 = document.createElement("h5");
          h5.textContent = sk.name || "Skill";
          titleWrap.append(label, h5);
          head.appendChild(titleWrap);
          const p = document.createElement("p");
          p.textContent = (sk.des || "").replace(/<[^>]+>/g, " ").trim();
          item.append(head, p);
          if (sk.tips) {
            const tips = document.createElement("p");
            tips.className = "skill-tips";
            tips.textContent =
              tt("tip_prefix") +
              " " +
              String(sk.tips).replace(/<[^>]+>/g, " ").trim();
            item.appendChild(tips);
          }
          skillsEl.appendChild(item);
        });
      })
      .catch(() => {
        skillsEl.innerHTML =
          "<p class='skill-empty'>" + tt("skills_fail") + "</p>";
      });
  }

  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = "";
    lastDetail = null;
  }

  function loadHeroes() {
    if (loaded) {
      openPanel();
      renderGrid();
      return;
    }
    if (lead) lead.textContent = tt("roster_loading_full");
    openPanel();
    fetch("all-heroes.json", { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error("missing json");
        return r.json();
      })
      .then((data) => {
        heroes = Array.isArray(data.heroes) ? data.heroes : [];
        loaded = true;
        renderGrid();
      })
      .catch(() => {
        if (lead) lead.textContent = tt("roster_fail");
      });
  }

  btn.addEventListener("click", () => {
    if (panel.hidden) loadHeroes();
    else closePanel();
  });
  if (closeBtn) closeBtn.addEventListener("click", closePanel);

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target.closest("[data-close]")) closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.hidden) closeModal();
    });
  }

  window.addEventListener("mlbb:lang", () => {
    if (loaded && !panel.hidden) renderGrid();
    if (lastDetail && modal && !modal.hidden) openDetail(lastDetail);
  });
})();

function tt(key, vars) {
  return window.MLBB && window.MLBB.t ? window.MLBB.t(key, vars) : key;
}

const LANE_I18N = {
  gold: { title: "lane_gold", desc: "lane_gold_desc" },
  exp: { title: "lane_exp", desc: "lane_exp_desc" },
  mid: { title: "lane_mid", desc: "lane_mid_desc" },
  roam: { title: "lane_roam", desc: "lane_roam_desc" },
  jungle: { title: "lane_jungle", desc: "lane_jungle_desc" },
};

async function loadHeroData() {
  const res = await fetch("heroes-data.json", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load data");
  return res.json();
}

function clear(el) {
  while (el.firstChild) el.removeChild(el.firstChild);
}

function ytQuery(heroName, extra) {
  return encodeURIComponent(`${heroName} Mobile Legends ${extra}`.trim());
}

const gameplayCache = new Map();

const PIPED_APIS = [
  "https://api.piped.private.coffee",
  "https://pipedapi.reallyaweso.me",
  "https://pipedapi.kavin.rocks",
];

function extractVideoId(item) {
  if (!item) return "";
  if (item.videoId) return String(item.videoId);
  if (item.id && typeof item.id === "string" && /^[\w-]{11}$/.test(item.id)) {
    return item.id;
  }
  const url = String(item.url || item.videoUrl || item.link || "");
  const m = url.match(/(?:v=|\/watch\?v=|youtu\.be\/|\/shorts\/|\/embed\/)([\w-]{11})/);
  if (m) return m[1];
  if (url.startsWith("/watch?v=")) return url.slice(9, 20);
  return "";
}

async function findGameplayVideoId(heroName) {
  const key = heroName.toLowerCase();
  if (gameplayCache.has(key)) return gameplayCache.get(key);

  const query = `${heroName} Mobile Legends gameplay MLBB`;
  for (const base of PIPED_APIS) {
    try {
      const url =
        base.replace(/\/$/, "") +
        "/search?q=" +
        encodeURIComponent(query) +
        "&filter=videos";
      const res = await fetch(url);
      if (!res.ok) continue;
      const data = await res.json();
      const items = Array.isArray(data.items)
        ? data.items
        : Array.isArray(data)
          ? data
          : [];
      for (const item of items) {
        // prefer normal videos over livestreams/shorts if flagged
        if (item.isShort) continue;
        const id = extractVideoId(item);
        if (id) {
          gameplayCache.set(key, id);
          return id;
        }
      }
      // fallback: first item even if short
      for (const item of items) {
        const id = extractVideoId(item);
        if (id) {
          gameplayCache.set(key, id);
          return id;
        }
      }
    } catch (_) {
      /* try next API */
    }
  }
  gameplayCache.set(key, "");
  return "";
}

function setGameplayLinks(hero) {
  const name = hero.name || "Hero";
  const gameplayQ = ytQuery(name, "gameplay");
  const guideQ = ytQuery(name, "guide combo");
  const lead = document.getElementById("gameplayLead");
  const link = document.getElementById("gameplayLink");
  const guide = document.getElementById("gameplayGuideLink");

  if (lead) {
    lead.textContent = tt("gameplay_loading", { name: name });
  }
  if (link) {
    link.href = "https://www.youtube.com/results?search_query=" + gameplayQ;
    link.textContent = tt("gameplay_open_name", { name: name });
  }
  if (guide) {
    guide.href = "https://www.youtube.com/results?search_query=" + guideQ;
    guide.textContent = tt("gameplay_guides_name", { name: name });
  }
}

async function setGameplay(hero) {
  const name = hero.name || "Hero";
  const frame = document.getElementById("gameplayFrame");
  const lead = document.getElementById("gameplayLead");
  const wrap = document.querySelector(".gameplay-frame-wrap");
  if (!frame) return;

  setGameplayLinks(hero);
  frame.removeAttribute("src");
  frame.src = "about:blank";
  if (wrap) wrap.classList.add("is-loading");

  const videoId = await findGameplayVideoId(name);
  // If modal already closed / another hero opened, skip
  const currentName = document.getElementById("modalName")?.textContent;
  if (currentName && currentName !== name) return;

  if (videoId) {
    frame.src =
      "https://www.youtube.com/embed/" +
      encodeURIComponent(videoId) +
      "?rel=0&modestbranding=1";
    if (lead) {
      lead.textContent = tt("gameplay_watch", { name: name });
    }
    const link = document.getElementById("gameplayLink");
    if (link) {
      link.href = "https://www.youtube.com/watch?v=" + encodeURIComponent(videoId);
      link.textContent = tt("gameplay_open_video");
    }
  } else {
    frame.removeAttribute("src");
    if (lead) {
      lead.textContent = tt("gameplay_fail", { name: name });
    }
  }
  if (wrap) wrap.classList.remove("is-loading");
}

function showModal(hero) {
  const modal = document.getElementById("heroModal");
  document.getElementById("modalIcon").src = hero.icon;
  document.getElementById("modalIcon").alt = hero.name;
  document.getElementById("modalType").textContent = hero.type || "Hero";
  document.getElementById("modalName").textContent = hero.name;
  document.getElementById("modalDes").textContent =
    hero.des || tt("no_desc");

  const skillsEl = document.getElementById("modalSkills");
  clear(skillsEl);

  const skills = Array.isArray(hero.skills) ? hero.skills : [];
  if (!skills.length) {
    const empty = document.createElement("p");
    empty.className = "skill-empty";
    empty.textContent = tt("no_skills");
    skillsEl.appendChild(empty);
  } else {
    skills.forEach((skill, i) => {
      const item = document.createElement("article");
      item.className = "skill-item";

      const head = document.createElement("div");
      head.className = "skill-head";

      if (skill.icon) {
        const img = document.createElement("img");
        img.src = skill.icon;
        img.alt = skill.name || "";
        img.loading = "lazy";
        head.appendChild(img);
      }

      const titleWrap = document.createElement("div");
      const label = document.createElement("span");
      label.className = "skill-label";
      const labels = [
        tt("skill_n", { n: 1 }),
        tt("skill_n", { n: 2 }),
        tt("skill_ultimate"),
        tt("skill_passive"),
      ];
      label.textContent = labels[i] || tt("skill_n", { n: i + 1 });
      const name = document.createElement("h5");
      name.textContent = skill.name || "Skill";
      titleWrap.appendChild(label);
      titleWrap.appendChild(name);
      head.appendChild(titleWrap);

      const des = document.createElement("p");
      des.textContent = skill.des || "";

      item.appendChild(head);
      item.appendChild(des);

      if (skill.tips) {
        const tips = document.createElement("p");
        tips.className = "skill-tips";
        tips.textContent = tt("tip_prefix") + " " + skill.tips;
        item.appendChild(tips);
      }

      skillsEl.appendChild(item);
    });
  }

  setGameplay(hero);

  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function hideModal() {
  const modal = document.getElementById("heroModal");
  const frame = document.getElementById("gameplayFrame");
  if (frame) {
    frame.src = "about:blank";
    frame.removeAttribute("src");
  }
  modal.hidden = true;
  document.body.style.overflow = "";
}

let rolesData = null;
let activeLane = null;
let activeHero = null;

function renderLane(data, laneKey) {
  const lane = data.lanes[laneKey];
  const panel = document.getElementById("lanePanel");
  const hint = document.getElementById("laneHint");
  const heroesEl = document.getElementById("laneHeroes");
  activeLane = laneKey;

  const i18nLane = LANE_I18N[laneKey];
  document.getElementById("laneTitle").textContent = i18nLane
    ? tt(i18nLane.title)
    : lane.title;
  document.getElementById("laneDesc").textContent = i18nLane
    ? tt(i18nLane.desc)
    : lane.desc;
  clear(heroesEl);

  lane.heroes.forEach((name) => {
    const hero = data.heroes[name];
    if (!hero) return;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "lane-hero";
    btn.setAttribute("aria-label", hero.name + " skills");

    const img = document.createElement("img");
    img.src = hero.icon;
    img.alt = hero.name;
    img.loading = "lazy";

    const label = document.createElement("span");
    label.textContent = hero.name;

    const role = document.createElement("small");
    role.textContent = hero.type || "";

    btn.appendChild(img);
    btn.appendChild(label);
    btn.appendChild(role);
    btn.addEventListener("click", () => {
      activeHero = hero;
      showModal(hero);
    });
    heroesEl.appendChild(btn);
  });

  panel.hidden = false;
  hint.hidden = true;
}

async function initRolesPage() {
  const tabs = document.querySelectorAll(".lane-tab");
  if (!tabs.length) return;

  try {
    rolesData = await loadHeroData();
  } catch (err) {
    document.getElementById("laneHint").textContent = tt("lane_fail");
    return;
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("is-active"));
      tab.classList.add("is-active");
      renderLane(rolesData, tab.dataset.lane);
    });
  });

  document.querySelectorAll("[data-close]").forEach((el) => {
    el.addEventListener("click", hideModal);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") hideModal();
  });

  window.addEventListener("mlbb:lang", () => {
    if (rolesData && activeLane) renderLane(rolesData, activeLane);
    if (activeHero) {
      const modal = document.getElementById("heroModal");
      if (modal && !modal.hidden) showModal(activeHero);
    }
  });
}

initRolesPage();

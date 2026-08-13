(function () {
  const meta = {
    warrior: { key: "rank_warrior", image: "images/ranks/warrior.png?v=4" },
    elite: { key: "rank_elite", image: "images/ranks/elite.png?v=4" },
    master: { key: "rank_master", image: "images/ranks/master.png?v=4" },
    grandmaster: { key: "rank_grandmaster", image: "images/ranks/grandmaster.png?v=4" },
    epic: { key: "rank_epic", image: "images/ranks/epic.png?v=4" },
    legend: { key: "rank_legend", image: "images/ranks/legend.png?v=4" },
    mythic: { key: "rank_mythic", image: "images/ranks/mythic.png?v=4" },
    "mythical-honor": {
      key: "rank_mythical_honor",
      image: "images/ranks/mythical-honor.png?v=4",
    },
    "mythical-glory": {
      key: "rank_mythical_glory",
      image: "images/ranks/mythical-glory.png?v=4",
    },
    "mythical-immortal": {
      key: "rank_mythical_immortal",
      image: "images/ranks/mythical-immortal.png?v=4",
    },
  };

  const detailKeys = {
    warrior: ["rank_warrior_tier", "rank_warrior_desc", "rank_warrior_f1", "rank_warrior_f2", "rank_warrior_f3"],
    elite: ["rank_elite_tier", "rank_elite_desc", "rank_elite_f1", "rank_elite_f2", "rank_elite_f3"],
    master: ["rank_master_tier", "rank_master_desc", "rank_master_f1", "rank_master_f2", "rank_master_f3"],
    grandmaster: [
      "rank_grandmaster_tier",
      "rank_grandmaster_desc",
      "rank_grandmaster_f1",
      "rank_grandmaster_f2",
      "rank_grandmaster_f3",
    ],
    epic: ["rank_epic_tier", "rank_epic_desc", "rank_epic_f1", "rank_epic_f2", "rank_epic_f3"],
    legend: ["rank_legend_tier", "rank_legend_desc", "rank_legend_f1", "rank_legend_f2", "rank_legend_f3"],
    mythic: ["rank_mythic_tier", "rank_mythic_desc", "rank_mythic_f1", "rank_mythic_f2", "rank_mythic_f3"],
    "mythical-honor": ["rank_honor_tier", "rank_honor_desc", "rank_honor_f1", "rank_honor_f2", "rank_honor_f3"],
    "mythical-glory": ["rank_glory_tier", "rank_glory_desc", "rank_glory_f1", "rank_glory_f2", "rank_glory_f3"],
    "mythical-immortal": [
      "rank_immortal_tier",
      "rank_immortal_desc",
      "rank_immortal_f1",
      "rank_immortal_f2",
      "rank_immortal_f3",
    ],
  };

  function tt(key, vars) {
    return window.MLBB && window.MLBB.t ? window.MLBB.t(key, vars) : key;
  }

  const track = document.getElementById("rankTrack");
  const detail = document.getElementById("rankDetail");
  const hint = document.getElementById("rankHint");
  if (!track || !detail) return;

  const img = document.getElementById("rankImage");
  const nameEl = document.getElementById("rankName");
  const tierEl = document.getElementById("rankTier");
  const descEl = document.getElementById("rankDesc");
  const factsEl = document.getElementById("rankFacts");

  let activeId = null;

  function showRank(id) {
    const m = meta[id];
    const keys = detailKeys[id];
    if (!m || !keys) return;
    activeId = id;

    track.querySelectorAll(".rank-pill").forEach((btn) => {
      const on = btn.dataset.rank === id;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-selected", on ? "true" : "false");
    });

    const name = tt(m.key);
    img.src = m.image;
    img.alt = tt("rank_emblem", { name: name });
    nameEl.textContent = name;
    tierEl.textContent = tt(keys[0]);
    descEl.textContent = tt(keys[1]);
    factsEl.innerHTML = "";
    keys.slice(2).forEach((k) => {
      const li = document.createElement("li");
      li.textContent = tt(k);
      factsEl.appendChild(li);
    });

    detail.hidden = false;
    if (hint) hint.hidden = true;
  }

  track.addEventListener("click", (e) => {
    const btn = e.target.closest(".rank-pill[data-rank]");
    if (!btn) return;
    showRank(btn.dataset.rank);
  });

  window.addEventListener("mlbb:lang", () => {
    if (activeId) showRank(activeId);
  });
})();

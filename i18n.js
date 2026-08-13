(function () {
  const STORAGE_KEY = "mlbb_lang";

  const dict = {
    en: {
      nav_about: "About",
      nav_heroes: "Heroes",
      nav_roles: "Roles",
      nav_equip: "Equipments",
      nav_play: "Play",
      nav_home: "Home",
      menu: "Menu",
      close: "Close",
      lang_label: "Language",
      footer: "— fan site. Official game by Moonton / Mobile Legends: Bang Bang.",

      // Home
      eyebrow: "5V5 Battle Arena",
      lead_before:
        "Join millions of players worldwide in the ultimate 5v5 battle arena. Team up. Strategize.",
      lead_em: "Become a legend.",
      btn_play: "Play Now",
      btn_about: "About the Game",
      explore_eyebrow: "Explore",
      explore_title: "Pick a path",
      card_about_p: "Map, ranks and how the game works.",
      card_heroes_p: "Roster, skills and playstyle tips.",
      card_roles_p: "Gold, EXP, Mid, Roam and Jungle.",
      card_equip_p: "Items, passives and farming.",
      card_play_p: "Download and jump into a match.",

      // About
      about_eyebrow: "About the Game",
      about_lead:
        "Mobile Legends: Bang Bang (MLBB) is a 5v5 MOBA game where two teams battle to destroy the enemy base while defending their own. Teamwork, strategy, and skill are the keys to victory!",
      fact_dev: "Developer",
      fact_release: "Release Date",
      fact_mode: "Game Mode",
      fact_platform: "Platform",
      fact_release_val: "July 14, 2016",
      how_eyebrow: "How To Play",
      how_title: "5 steps to victory",
      how1_t: "Choose Your Hero",
      how1_p: "Select a hero that fits your role and strategy.",
      how2_t: "Farm & Level Up",
      how2_p: "Defeat minions, jungle monsters and earn gold.",
      how3_t: "Destroy Turrets",
      how3_p: "Push lanes and destroy enemy turrets.",
      how4_t: "Team Fight",
      how4_p: "Work with your team to defeat enemies.",
      how5_t: "Destroy the Base",
      how5_p: "Break the enemy base to win the match!",
      map_eyebrow: "Game Overview",
      map_title: "Land of Dawn map",
      map_lead: "Three lanes, jungle, Turtle, Lord — know the battlefield.",
      map1_t: "Base (Spawn)",
      map1_p: "Revives heroes.",
      map2_t: "Top Lane (EXP Lane)",
      map2_p: "Usually for Fighters/Tanks.",
      map3_t: "Mid Lane",
      map3_p: "Short lane, faster EXP.",
      map4_t: "Bottom Lane (Gold Lane)",
      map4_p: "For Marksmen.",
      map5_t: "Jungle",
      map5_p: "Monsters give buffs & gold.",
      map6_t: "Turtle",
      map6_p: "Provides team gold & EXP.",
      map7_t: "Lord",
      map7_p: "Strong ally that pushes lanes.",
      map8_t: "Turrets",
      map8_p: "Defend your lanes.",
      map9_t: "Inhibitor Turret",
      map9_p: "Destroy to open the base.",
      map10_t: "Base (Enemy)",
      map10_p: "Destroy to win!",
      modes_eyebrow: "Game Modes",
      modes_title: "Pick your match",
      mode_classic_t: "Classic",
      mode_classic_p: "Play for fun and practice.",
      mode_ranked_t: "Ranked",
      mode_ranked_p: "Climb the ranks and prove your skill.",
      mode_brawl_t: "Brawl",
      mode_brawl_p: "5v5 in a single lane. Fast & fun.",
      mode_custom_t: "Custom",
      mode_custom_p: "Create custom matches with friends.",
      ranks_eyebrow: "Rank System",
      ranks_title: "Climb to Mythic",
      ranks_lead: "Tap a rank to see its badge and what it means.",
      ranks_hint: "Select a rank above to view its badge and details.",
      roles_eyebrow: "Roles",
      roles_title: "Every role matters",
      role_tank_p: "Protect teammates and start fights.",
      role_fighter_p: "Balanced between damage and defense.",
      role_assassin_p: "High damage, excel in killing enemies.",
      role_marksman_p: "Ranged physical damage dealer.",
      role_mage_p: "Deal magic damage from a distance.",
      role_support_p: "Help and protect teammates.",
      obj_eyebrow: "Key Objectives",
      obj_title: "What wins games",
      obj_turrets_t: "Destroy Turrets",
      obj_turrets_p: "Push lanes and take down enemy turrets.",
      obj_lord_t: "Take Lord",
      obj_lord_p: "Summon Lord to help push and destroy.",
      obj_turtle_t: "Take Turtle",
      obj_turtle_p: "Provides gold and experience boost.",
      obj_base_t: "Defend Base",
      obj_base_p: "Protect your base and win the game.",
      tips_eyebrow: "Tips for Beginners",
      tips_title: "Start strong",
      tip1: "Learn at least 2–3 heroes.",
      tip2: "Focus on farming and leveling up.",
      tip3: "Watch the map and help your team.",
      tip4: "Don't fight alone, team up!",
      tip5: "Practice makes perfect!",
      quote: "“Victory comes to those who believe in teamwork.” — MLBB",
      stat_downloads: "Downloads",
      stat_heroes: "Heroes",
      stat_countries: "Countries",
      stat_community: "Active Community",
      about_cta: "Join millions of players worldwide and become a legend!",
      btn_download: "Download",

      // Heroes page
      heroes_eyebrow: "Heroes",
      heroes_title: "Featured fighters",
      heroes_lead: "Selected heroes with role, playstyle, and a short overview.",
      label_role: "Role",
      label_style: "Style",
      label_tip: "Tip",
      skin_prefix: "Skin:",
      h_melissa_skin: "Skin: Sparkle (ALLSTAR)",
      h_melissa_p:
        "Gold Lane marksman. Deals steady ranged damage and can carry late game with mobility and attack speed. In her Sparkle skin she owns the stage — guitar, energy, and battlefield flair.",
      h_melissa_style: "Ranged DPS / kiting",
      h_melissa_tip: "Farm well and fight with your team.",
      h_gusion_skin: "Skin: K' (MLBB × The King of Fighters)",
      h_gusion_p:
        "Jungle / Mid assassin famous for dagger combos and high burst. The K' skin gives him the KOF fire look — still the same hero: dive squishies, reset, and leave.",
      h_gusion_style: "Burst / chase",
      h_gusion_tip: "Target squishies and avoid overextending.",
      h_cecilion_skin: "Default / Embrace of Night look",
      h_cecilion_p:
        "Mid Lane mage who stacks Magic Power during the match. Long-range poke, strong late-game burst, and teamfight pressure — especially when paired with Carmilla.",
      h_cecilion_style: "Poke / scaling / teamfight",
      h_cecilion_tip: "Keep stacking — he gets much stronger later.",
      h_belerick_skin: "Mecha / special skin look",
      h_belerick_p:
        "High-HP tank who thrives in the front line. Punishes attackers, shields and protects allies, and anchors teamfights with strong sustain.",
      h_belerick_style: "Frontline / peel / sustain",
      h_belerick_tip: "Stack HP and stay in front of your carries.",
      h_carmilla_skin: "Gothic / Abyssal look",
      h_carmilla_p:
        "Roam support who links enemies and spreads crowd control through her curse. Strong set-up in teamfights — especially deadly when paired with Cecilion.",
      h_carmilla_style: "Engage / link / teamfight",
      h_carmilla_tip: "Land your curse on clustered enemies for max value.",
      h_johnson_skin: "Skin: The Mustang (Transformers)",
      h_johnson_p:
        "Transforms into a car, picks up an ally, and crashes into enemies. Ultimate enables fast map-wide engages — one of the most iconic roam tanks.",
      h_johnson_style: "Engage / peel / roam",
      h_johnson_tip: "Pick a good angle and timing for Ultimate.",
      heroes_more_label: "127 Heroes",
      heroes_more_hint: "Tap to open full roster",
      roster_eyebrow: "Full Roster",
      roster_title: "All heroes",
      roster_loading: "Loading hero list…",
      roster_loading_full: "Loading full roster…",
      roster_count:
        "{n} heroes — each with Role, Style and Tip. Tap a hero for full skills.",
      roster_fail:
        "Could not load all-heroes.json. Open the site with OCHISH.bat / local server.",
      skills_title: "Skills",
      skills_loading: "Loading skills…",
      skills_none: "No skill data available.",
      skills_fail: "Could not load skills right now.",
      skill_passive: "Passive",
      skill_n: "Skill {n}",
      skill_ultimate: "Ultimate",
      tip_prefix: "Tip:",
      style_marksman: "Ranged DPS / kiting",
      style_mage: "Poke / burst / teamfight",
      style_assassin: "Burst / chase / pick",
      style_fighter: "Duel / skirmish / sustain",
      style_tank: "Frontline / initiate / peel",
      style_support: "Heal / shield / utility",
      tip_marksman: "Farm well and fight from a safe distance.",
      tip_mage: "Stay in the backline and land skills on groups.",
      tip_assassin: "Target squishies and avoid overextending.",
      tip_fighter: "Trade smart and control side lanes or jungle.",
      tip_tank: "Start fights for your team and protect carries.",
      tip_support: "Roam with vision and keep allies alive.",
      tip_default: "Learn the kit and play with your team.",
      back_about: "← About",
      to_roles: "Roles →",

      // Roles page
      roles_page_eyebrow: "Roles",
      roles_page_title: "Choose a lane",
      roles_page_lead:
        "Click a lane name to see its heroes. Click a hero to view skills and what they do.",
      lane_gold: "Gold Lane",
      lane_exp: "EXP Lane",
      lane_mid: "Mid Lane",
      lane_roam: "Roamer",
      lane_jungle: "Jungler",
      lane_gold_desc: "Marksmen — farm and carry late game.",
      lane_exp_desc: "Fighters / Tanks — duel and hold the side lane.",
      lane_mid_desc: "Mages / Assassins — control mid and rotate.",
      lane_roam_desc: "Supports / Tanks — protect, vision, and set up fights.",
      lane_jungle_desc: "Junglers — clear camps, gank, and take objectives.",
      lane_hint: "Select a lane above to get started.",
      lane_fail:
        "Failed to load data. Open the site via the local server (http://127.0.0.1:8765/rollar.html).",
      gameplay_title: "Gameplay",
      gameplay_lead: "Watch this hero’s gameplay on YouTube.",
      gameplay_loading: "Loading {name} gameplay video…",
      gameplay_watch: "Watch {name} gameplay on YouTube.",
      gameplay_fail:
        "Could not embed a video right now. Use the buttons below to watch {name} gameplay on YouTube.",
      gameplay_open: "Open on YouTube",
      gameplay_open_name: "Open {name} gameplay",
      gameplay_open_video: "Open this video",
      gameplay_guides: "Guides & tips",
      gameplay_guides_name: "{name} guides",
      no_desc: "No description available.",
      no_skills: "No skill data available yet.",

      // Equipments
      eq_eyebrow: "Equipments",
      eq_title: "Equipment & farming",
      eq_lead:
        "Each item below shows its icon, name, and what it does in battle. After that: how to farm gold, EXP, and map objectives.",
      shop_eyebrow: "Shop Items",
      shop_title: "Equipment — image, name & function",
      shop_lead:
        "Filter by type. Icons and passives come from official Mobile Legends hero build data.",
      item_loading: "Loading equipment…",
      item_empty: "No items in this category.",
      item_fail:
        "Could not load equipment. Open the site via the local server (OCHISH.bat).",
      cat_all: "All",
      cat_attack: "Attack",
      cat_magic: "Magic",
      cat_defense: "Defense",
      cat_boots: "Boots",
      cat_jungle: "Jungle / Roam",
      farm_lane_eyebrow: "Lane Farming",
      farm_lane_title: "Minions & turrets",
      melee_t: "Melee minions",
      melee_p: "Front-line creeps. Give solid gold/EXP. Last-hit them for full gold.",
      ranged_t: "Ranged minions",
      ranged_p:
        "Glassier backline creeps. Easy to last-hit; important for wave clear tempo.",
      siege_t: "Siege / cannon minion",
      siege_p:
        "Tankier wave unit that appears on bigger waves. High gold — prioritize the last hit.",
      enemy_tur_t: "Enemy turrets",
      enemy_tur_p:
        "Destroying turrets gives team gold and map control. Outer → middle → inhibitor → base.",
      jungle_eyebrow: "Jungle Camps",
      jungle_title: "Camps used for farming",
      orange_t: "Orange Buff (Fiend)",
      orange_role: "Physical junglers / fighters",
      orange_p:
        "Grants extra damage and lifesteal-style sustain while the buff lasts. Core camp for AD junglers.",
      blue_t: "Blue Buff (Spirit)",
      blue_role: "Mages / mana users",
      blue_p:
        "Improves mana regen and cooldown reduction. Mid laners often take it after the jungler finishes a clear.",
      small_t: "Small jungle creeps",
      small_role: "All junglers",
      small_p:
        "Basic camps for gold and EXP. Keep your jungle clear on cooldown to stay ahead in levels.",
      litho_t: "Lithowanderer",
      litho_role: "Lane pressure helper",
      litho_p:
        "After defeat, it walks a lane path and helps push. Great for converting jungle farm into turret pressure.",
      crab_t: "Crab / river camp",
      crab_role: "Tempo & vision",
      crab_p:
        "Gives gold and map control around river. Contested early — fight only if your team can back you up.",
      special_t: "Inverted / special camps",
      special_role: "Situational",
      special_p:
        "Some patches rotate special jungle monsters. Always check the in-game tip for current buff effects.",
      major_eyebrow: "Major Objectives",
      major_title: "Turtle & Lord",
      turtle_t: "Turtle",
      turtle_p:
        "Early–mid objective. Gives team gold and EXP. Spawns before Lord — take it when your team is stronger nearby.",
      lord_t: "Lord",
      lord_p:
        "Late objective. When slain, summons a powerful ally that pushes a lane. Often decides the game.",
      basecore_t: "Base (Base Core)",
      basecore_p:
        "Final target. Destroy the enemy base to win. Only commit when inhibitors are open and the enemy is down.",
      inhib_t: "Inhibitor turret",
      inhib_p:
        "Last defense before the base. Taking it opens the high ground and makes base sieges much safer.",
      tools_eyebrow: "Farming Tools",
      tools_title: "Spells & items that help you farm",
      retri_t: "Retribution",
      retri_p:
        "Jungler battle spell. Damages monsters hard and helps secure Turtle/Lord. Required for most junglers.",
      exec_t: "Execute",
      exec_p:
        "Gold Lane spell. Finishes low-HP heroes and helps snowball after successful trades/farm leads.",
      jungle_eq_t: "Jungle equipment",
      jungle_eq_p:
        "Bought with Retribution. Speeds up monster clear and upgrades into stronger jungler items.",
      wave_t: "Wave-clear items",
      wave_p:
        "Items with AoE or attack effects (for example magic multi-target or physical cleave) help farm lanes faster safely.",
      prio_eyebrow: "Farming Priority",
      prio_title: "What to take first",
      prio1_t: "Your lane / your jungle",
      prio1_p:
        "Don’t steal teammate farm unless they are dead or the wave will waste under turret.",
      prio2_t: "Secure buffs on cooldown",
      prio2_p: "Orange/Blue buffs are tempo. Missing them for free puts you behind.",
      prio3_t: "Turtle when the map allows",
      prio3_p: "Only start Turtle if you have vision and numbers nearby.",
      prio4_t: "Lord after a won fight",
      prio4_p: "Best time: enemy team wiped or forced back. Then push with Lord.",
      back_roles: "← Roles",
      play_now_arrow: "Play Now →",

      // Play
      play_title: "Land of Dawn is waiting.",
      play_lead: "Download the game on your phone and start your first battle.",
      dl_google: "Download on Google Play",
      dl_apple: "Download on App Store",

      // Rank names + details
      rank_warrior: "Warrior",
      rank_elite: "Elite",
      rank_master: "Master",
      rank_grandmaster: "Grandmaster",
      rank_epic: "Epic",
      rank_legend: "Legend",
      rank_mythic: "Mythic",
      rank_mythical_honor: "Mythical Honor",
      rank_mythical_glory: "Mythical Glory",
      rank_mythical_immortal: "Mythical Immortal",
      rank_warrior_tier: "Divisions I–III",
      rank_warrior_desc:
        "Starting rank for new ranked players. Perfect place to learn the basics of lanes, objectives, and teamwork.",
      rank_warrior_f1: "Stars per division: up to ×3",
      rank_warrior_f2: "No star loss on defeat in Warrior",
      rank_warrior_f3: "Focus: last-hitting, map awareness, roles",
      rank_elite_tier: "Divisions I–III",
      rank_elite_desc:
        "Players start forming clearer roles. Wins give stars; losses can take them away — consistency matters more.",
      rank_elite_f1: "Stars per division: up to ×4",
      rank_elite_f2: "Learn wave control and basic rotations",
      rank_elite_f3: "Season reward tier above Warrior",
      rank_master_tier: "Divisions I–IV",
      rank_master_desc:
        "Mid-tier competitive play. Draft awareness and hero pools start deciding more games than raw mechanics alone.",
      rank_master_f1: "4 divisions (I–IV)",
      rank_master_f2: "Stars per division: up to ×4",
      rank_master_f3: "Practice 2–3 comfort heroes per role",
      rank_grandmaster_tier: "Divisions I–V",
      rank_grandmaster_desc:
        "Strong fundamentals expected: objective timing, roam paths, and punishing mispositioned enemies.",
      rank_grandmaster_f1: "5 divisions (I–V)",
      rank_grandmaster_f2: "Stars per division: up to ×5",
      rank_grandmaster_f3: "Teamfight positioning becomes critical",
      rank_epic_tier: "Divisions I–V",
      rank_epic_desc:
        "High-skill bracket where drafts, counters, and macro plays matter. First Road-to-Mythic reward milestones appear here.",
      rank_epic_f1: "5 divisions (I–V)",
      rank_epic_f2: "Stars per division: up to ×5",
      rank_epic_f3: "Unlocks Rank Protection Card rewards on the Road to Mythic",
      rank_legend_tier: "Divisions I–V",
      rank_legend_desc:
        "Near the top of the ladder. One bad fight can snowball — vision, Lord timing, and clean executes separate Legend from Mythic.",
      rank_legend_f1: "5 divisions (I–V)",
      rank_legend_f2: "Stars per division: up to ×5",
      rank_legend_f3: "Extra Rank Protection Card rewards vs Epic",
      rank_mythic_tier: "×0 – ×24",
      rank_mythic_desc:
        "Entry to the highest medal. Keep stacking stars to reach Mythical Honor, Glory, and Immortal.",
      rank_mythic_f1: "Stars: ×0–×24",
      rank_mythic_f2: "Seasonal Mythic rewards unlock here",
      rank_mythic_f3: "Draft and macro decide most games",
      rank_honor_tier: "×25 – ×49",
      rank_honor_desc:
        "Above base Mythic. Strong players with consistent ranked performance and higher MMR lobbies.",
      rank_honor_f1: "Stars: ×25–×49",
      rank_honor_f2: "Profile / namecard reward milestones",
      rank_honor_f3: "Expect tougher drafts and fewer free wins",
      rank_glory_tier: "×50 – ×99",
      rank_glory_desc:
        "Elite Mythic tier. Very high skill — one mistake can cost a star. Seasonal prestige upgrades unlock here.",
      rank_glory_f1: "Stars: ×50–×99",
      rank_glory_f2: "Upgraded seasonal profile rewards",
      rank_glory_f3: "Close to Immortal threshold",
      rank_immortal_tier: "×100+",
      rank_immortal_desc:
        "The peak of the ranked ladder. Top competitive players and pros dominate this bracket.",
      rank_immortal_f1: "Stars: ×100 and beyond",
      rank_immortal_f2: "Unique loading border reward",
      rank_immortal_f3: "Highest prestige in Ranked mode",
      rank_emblem: "{name} rank emblem",
    },

    uz: {
      nav_about: "Haqida",
      nav_heroes: "Qahramonlar",
      nav_roles: "Rollar",
      nav_equip: "Jihozlar",
      nav_play: "O‘ynash",
      nav_home: "Bosh sahifa",
      menu: "Menyu",
      close: "Yopish",
      lang_label: "Til",
      footer: "— fan sayt. Rasmiy o‘yin: Moonton / Mobile Legends: Bang Bang.",

      eyebrow: "5V5 Jang Arenasi",
      lead_before:
        "Dunyodagi millionlab o‘yinchilarga qo‘shiling — eng kuchli 5v5 jang arenasida. Jamoa bo‘ling. Strategiya qiling.",
      lead_em: "Afsonaga aylaning.",
      btn_play: "Hozir o‘ynash",
      btn_about: "O‘yin haqida",
      explore_eyebrow: "Bo‘limlar",
      explore_title: "Yo‘lni tanlang",
      card_about_p: "Xarita, ranklar va o‘yin qoidalari.",
      card_heroes_p: "Ro‘yxat, skilllar va uslub maslahatlari.",
      card_roles_p: "Gold, EXP, Mid, Roam va Jungle.",
      card_equip_p: "Itemlar, passivlar va farm.",
      card_play_p: "Yuklab oling va o‘yinga kiring.",

      about_eyebrow: "O‘yin haqida",
      about_lead:
        "Mobile Legends: Bang Bang (MLBB) — ikki jamoa raqib bazasini yo‘q qilish uchun kurashadigan 5v5 MOBA o‘yin. G‘alaba kaliti: jamoa, strategiya va mahorat!",
      fact_dev: "Ishlab chiqaruvchi",
      fact_release: "Chiqa sanasi",
      fact_mode: "O‘yin rejimi",
      fact_platform: "Platforma",
      fact_release_val: "2016-yil 14-iyul",
      how_eyebrow: "Qanday o‘ynash",
      how_title: "G‘alabaga 5 qadam",
      how1_t: "Qahramoningizni tanlang",
      how1_p: "Rolingiz va strategiyangizga mos qahramon tanlang.",
      how2_t: "Farm qiling va daraja oshiring",
      how2_p: "Minionlar va jungle yirtqichlarini yengib, oltin to‘plang.",
      how3_t: "Minoralarni buzing",
      how3_p: "Yo‘laklarni suring va raqib minoralarini yo‘q qiling.",
      how4_t: "Jamoa jangi",
      how4_p: "Jamoa bilan birga dushmanlarni yenging.",
      how5_t: "Bazani yo‘q qiling",
      how5_p: "Raqib bazasini buzib, o‘yinni yuting!",
      map_eyebrow: "O‘yin ko‘rinishi",
      map_title: "Land of Dawn xaritasi",
      map_lead: "Uch yo‘lak, jungle, Turtle, Lord — maydonni biling.",
      map1_t: "Baza (Spawn)",
      map1_p: "Qahramonlar qayta tiriladi.",
      map2_t: "Yuqori yo‘lak (EXP)",
      map2_p: "Odatda Fighter/Tank uchun.",
      map3_t: "O‘rta yo‘lak",
      map3_p: "Qisqa yo‘lak, tezroq EXP.",
      map4_t: "Pastki yo‘lak (Gold)",
      map4_p: "Marksmanlar uchun.",
      map5_t: "Jungle",
      map5_p: "Yirtqichlar buff va oltin beradi.",
      map6_t: "Turtle",
      map6_p: "Jamoaga oltin va EXP beradi.",
      map7_t: "Lord",
      map7_p: "Yo‘lakni suradigan kuchli ittifoqchi.",
      map8_t: "Minoralar",
      map8_p: "Yo‘laklaringizni himoya qiladi.",
      map9_t: "Inhibitor minorasi",
      map9_p: "Bazani ochish uchun buzing.",
      map10_t: "Baza (raqib)",
      map10_p: "Yutish uchun yo‘q qiling!",
      modes_eyebrow: "O‘yin rejimlari",
      modes_title: "O‘yiningizni tanlang",
      mode_classic_t: "Classic",
      mode_classic_p: "Dam olish va mashq uchun.",
      mode_ranked_t: "Ranked",
      mode_ranked_p: "Reytingni ko‘tarib, mahoratingizni isbotlang.",
      mode_brawl_t: "Brawl",
      mode_brawl_p: "Bitta yo‘lakda 5v5. Tez va qiziq.",
      mode_custom_t: "Custom",
      mode_custom_p: "Do‘stlar bilan maxsus o‘yin yarating.",
      ranks_eyebrow: "Reyting tizimi",
      ranks_title: "Mythic’gacha chiqing",
      ranks_lead: "Nishon va ma’nosini ko‘rish uchun reytingni bosing.",
      ranks_hint: "Batafsil ko‘rish uchun yuqoridan reyting tanlang.",
      roles_eyebrow: "Rollar",
      roles_title: "Har bir rol muhim",
      role_tank_p: "Jamoadoshlarni himoya qiladi va jangni boshlaydi.",
      role_fighter_p: "Zarar va himoya o‘rtasida muvozanat.",
      role_assassin_p: "Yuqori zarar, dushmanni tez yo‘q qiladi.",
      role_marksman_p: "Uzoqdan jismoniy zarar beradi.",
      role_mage_p: "Masofadan sehrli zarar beradi.",
      role_support_p: "Jamoadoshlarga yordam va himoya.",
      obj_eyebrow: "Asosiy maqsadlar",
      obj_title: "O‘yinni nima yutadi",
      obj_turrets_t: "Minoralarni buzing",
      obj_turrets_p: "Yo‘laklarni surib, raqib minoralarini oling.",
      obj_lord_t: "Lord oling",
      obj_lord_p: "Surish uchun Lordni chaqiring.",
      obj_turtle_t: "Turtle oling",
      obj_turtle_p: "Oltin va tajriba beradi.",
      obj_base_t: "Bazani himoya qiling",
      obj_base_p: "Bazangizni saqlab, o‘yinni yuting.",
      tips_eyebrow: "Yangi o‘yinchilar uchun",
      tips_title: "Kuchli boshlang",
      tip1: "Kamida 2–3 qahramonni o‘rganing.",
      tip2: "Farm va daraja oshirishga e’tibor bering.",
      tip3: "Xaritani kuzating va jamoaga yordam bering.",
      tip4: "Yolg‘iz jang qilmang — jamoa bo‘ling!",
      tip5: "Mashq — mukammallik kaliti!",
      quote: "“G‘alaba jamoaga ishonganlarga keladi.” — MLBB",
      stat_downloads: "Yuklab olishlar",
      stat_heroes: "Qahramonlar",
      stat_countries: "Mamlakatlar",
      stat_community: "Faol jamiyat",
      about_cta: "Millionlab o‘yinchilarga qo‘shiling va afsonaga aylaning!",
      btn_download: "Yuklab olish",

      heroes_eyebrow: "Qahramonlar",
      heroes_title: "Tanlangan jangchilar",
      heroes_lead: "Rol, uslub va qisqa tavsif bilan tanlangan qahramonlar.",
      label_role: "Rol",
      label_style: "Uslub",
      label_tip: "Maslahat",
      skin_prefix: "Skin:",
      h_melissa_skin: "Skin: Sparkle (ALLSTAR)",
      h_melissa_p:
        "Gold Lane marksman. Barqaror uzoqdan zarar beradi, kech o‘yinda mobility va attack speed bilan carry qiladi. Sparkle skinida sahna uniki — gitara, energiya va jang maydoni uslubi.",
      h_melissa_style: "Uzoqdan DPS / kiting",
      h_melissa_tip: "Yaxshi farm qiling va jamoa bilan jang qiling.",
      h_gusion_skin: "Skin: K' (MLBB × The King of Fighters)",
      h_gusion_p:
        "Jungle / Mid assassin — xanjar kombinatsiyasi va yuqori burst bilan mashhur. K' skini KOF olov ko‘rinishini beradi: squishylarga sho‘ng‘ing, reset, chiqing.",
      h_gusion_style: "Burst / ta’qib",
      h_gusion_tip: "Squishylarni nishonga oling, haddan tashqari chuqur kirmang.",
      h_cecilion_skin: "Default / Embrace of Night ko‘rinishi",
      h_cecilion_p:
        "O‘yin davomida Magic Power yig‘adigan Mid mage. Uzoq poke, kuchli late burst va teamfight bosimi — Carmilla bilan ayniqsa xavfli.",
      h_cecilion_style: "Poke / scaling / teamfight",
      h_cecilion_tip: "Stack to‘plashda davom eting — keyinroq ancha kuchli bo‘ladi.",
      h_belerick_skin: "Mecha / maxsus skin",
      h_belerick_p:
        "Yuqori HP tank, frontlineda yashaydi. Hujumchilarni jazolaydi, himoya beradi va teamfightni ushlab turadi.",
      h_belerick_style: "Frontline / peel / sustain",
      h_belerick_tip: "HP yig‘ing va carrylar oldida turing.",
      h_carmilla_skin: "Gothic / Abyssal ko‘rinishi",
      h_carmilla_p:
        "Dushmanlarni bog‘lab, la’nat orqali CC tarqatadigan roam support. Teamfight setup kuchli — Cecilion bilan ayniqsa o‘limli.",
      h_carmilla_style: "Engage / bog‘lash / teamfight",
      h_carmilla_tip: "La’natni to‘plangan dushmanlarga tushiring.",
      h_johnson_skin: "Skin: The Mustang (Transformers)",
      h_johnson_p:
        "Mashinaga aylanadi, ittifoqchini olib, dushmanga uriladi. Ultimate tez xarita bo‘ylab engage beradi — eng mashhur roam tanklardan.",
      h_johnson_style: "Engage / peel / roam",
      h_johnson_tip: "Ultimate uchun yaxshi burchak va vaqtni tanlang.",
      heroes_more_label: "127 Qahramon",
      heroes_more_hint: "To‘liq ro‘yxatni ochish",
      roster_eyebrow: "To‘liq ro‘yxat",
      roster_title: "Barcha qahramonlar",
      roster_loading: "Ro‘yxat yuklanmoqda…",
      roster_loading_full: "To‘liq ro‘yxat yuklanmoqda…",
      roster_count:
        "{n} qahramon — har birida Rol, Uslub va Maslahat. Skilllar uchun bosing.",
      roster_fail:
        "all-heroes.json yuklanmadi. OCHISH.bat / lokal server orqali oching.",
      skills_title: "Skilllar",
      skills_loading: "Skilllar yuklanmoqda…",
      skills_none: "Skill ma’lumoti yo‘q.",
      skills_fail: "Hozir skilllarni yuklab bo‘lmadi.",
      skill_passive: "Passiv",
      skill_n: "Skill {n}",
      skill_ultimate: "Ultimate",
      tip_prefix: "Maslahat:",
      style_marksman: "Uzoqdan DPS / kiting",
      style_mage: "Poke / burst / teamfight",
      style_assassin: "Burst / ta’qib / pick",
      style_fighter: "Duel / skirmish / sustain",
      style_tank: "Frontline / initiate / peel",
      style_support: "Heal / shield / utility",
      tip_marksman: "Yaxshi farm qiling va xavfsiz masofadan jang qiling.",
      tip_mage: "Orqada turing va skilllarni guruhga tushiring.",
      tip_assassin: "Squishylarni nishonga oling, haddan tashqari chuqur kirmang.",
      tip_fighter: "Aqlli trade qiling, yon yo‘lak yoki jungleni nazorat qiling.",
      tip_tank: "Jamoa uchun jangni boshlang va carrylarni himoya qiling.",
      tip_support: "Vision bilan roam qiling va ittifoqchilarni saqlang.",
      tip_default: "Kitni o‘rganing va jamoa bilan o‘ynang.",
      back_about: "← Haqida",
      to_roles: "Rollar →",

      roles_page_eyebrow: "Rollar",
      roles_page_title: "Yo‘lakni tanlang",
      roles_page_lead:
        "Yo‘lak nomini bosing — qahramonlar chiqadi. Skilllarni ko‘rish uchun qahramonga bosing.",
      lane_gold: "Gold Lane",
      lane_exp: "EXP Lane",
      lane_mid: "Mid Lane",
      lane_roam: "Roamer",
      lane_jungle: "Jungler",
      lane_gold_desc: "Marksmanlar — farm qilib, late o‘yinda carry.",
      lane_exp_desc: "Fighter / Tank — duel va yon yo‘lakni ushlash.",
      lane_mid_desc: "Mage / Assassin — midni nazorat va rotate.",
      lane_roam_desc: "Support / Tank — himoya, vision va jang setup.",
      lane_jungle_desc: "Jungler — camp, gank va objective.",
      lane_hint: "Boshlash uchun yuqoridan yo‘lak tanlang.",
      lane_fail:
        "Ma’lumot yuklanmadi. Lokal server orqali oching (http://127.0.0.1:8765/rollar.html).",
      gameplay_title: "Gameplay",
      gameplay_lead: "Bu qahramon gameplayini YouTube’da ko‘ring.",
      gameplay_loading: "{name} gameplay videosi yuklanmoqda…",
      gameplay_watch: "{name} gameplayini YouTube’da ko‘ring.",
      gameplay_fail:
        "Hozir video joylashmadi. Pastdagi tugmalar orqali {name} gameplayini YouTube’da oching.",
      gameplay_open: "YouTube’da ochish",
      gameplay_open_name: "{name} gameplayini ochish",
      gameplay_open_video: "Bu videoni ochish",
      gameplay_guides: "Gaydlar va maslahatlar",
      gameplay_guides_name: "{name} gaydlari",
      no_desc: "Tavsif mavjud emas.",
      no_skills: "Hali skill ma’lumoti yo‘q.",

      eq_eyebrow: "Jihozlar",
      eq_title: "Jihozlar va farming",
      eq_lead:
        "Har bir itemda ikonka, nom va jangdagi vazifasi. Keyin: oltin, EXP va xarita maqsadlarini farm qilish.",
      shop_eyebrow: "Do‘kon itemlari",
      shop_title: "Jihoz — rasm, nom va funksiya",
      shop_lead:
        "Turi bo‘yicha filtrlang. Ikonka va passivlar rasmiy MLBB ma’lumotidan.",
      item_loading: "Jihozlar yuklanmoqda…",
      item_empty: "Bu kategoriyada item yo‘q.",
      item_fail:
        "Jihozlar yuklanmadi. Lokal server orqali oching (OCHISH.bat).",
      cat_all: "Hammasi",
      cat_attack: "Hujum",
      cat_magic: "Sehr",
      cat_defense: "Himoya",
      cat_boots: "Oyoq kiyim",
      cat_jungle: "Jungle / Roam",
      farm_lane_eyebrow: "Yo‘lak farming",
      farm_lane_title: "Minionlar va minoralar",
      melee_t: "Yaqin jang minionlari",
      melee_p: "Old qator. Yaxshi oltin/EXP. To‘liq oltin uchun last-hit qiling.",
      ranged_t: "Uzoq jang minionlari",
      ranged_p: "Zaifroq orqa qator. Last-hit oson; wave clear tempi uchun muhim.",
      siege_t: "Siege / to‘p minion",
      siege_p: "Katta to‘lqinda keladigan mustahkam birlik. Ko‘p oltin — last-hitni ustuvor qiling.",
      enemy_tur_t: "Raqib minorasi",
      enemy_tur_p:
        "Minorani buzish jamoaga oltin va xarita nazorati beradi. Tashqi → o‘rta → inhibitor → baza.",
      jungle_eyebrow: "Jungle camp’lar",
      jungle_title: "Farm uchun camp’lar",
      orange_t: "Orange Buff (Fiend)",
      orange_role: "Jismoniy jungler / fighter",
      orange_p:
        "Buff davomida qo‘shimcha zarar va lifesteal-uslubidagi sustain. AD jungler uchun asosiy camp.",
      blue_t: "Blue Buff (Spirit)",
      blue_role: "Mage / mana ishlatuvchilar",
      blue_p:
        "Mana regen va cooldownni yaxshilaydi. Mid ko‘pincha jungler clear’dan keyin oladi.",
      small_t: "Kichik jungle creep’lar",
      small_role: "Barcha junglerlar",
      small_p:
        "Oltin va EXP uchun asosiy camp’lar. Darajada oldinda turish uchun jungle’ni doim tozalang.",
      litho_t: "Lithowanderer",
      litho_role: "Yo‘lak bosimi yordamchisi",
      litho_p:
        "Yengilgach yo‘lak bo‘ylab yurib surishga yordam beradi. Jungle farmni minoraga aylantirish uchun yaxshi.",
      crab_t: "Crab / daryo camp",
      crab_role: "Tempo va vision",
      crab_p:
        "Daryo atrofida oltin va nazorat. Erta bahsli — jamoa qo‘llab-quvvatlasa jang qiling.",
      special_t: "Maxsus / inverted camp’lar",
      special_role: "Vaziyatga qarab",
      special_p:
        "Ba’zi patch’larda maxsus yirtqichlar aylanadi. Joriy buff uchun o‘yin ichidagi tipni tekshiring.",
      major_eyebrow: "Asosiy objective’lar",
      major_title: "Turtle va Lord",
      turtle_t: "Turtle",
      turtle_p:
        "Erta–o‘rta objective. Jamoaga oltin va EXP. Lorddan oldin spawn — yaqin kuchliroq bo‘lsangiz oling.",
      lord_t: "Lord",
      lord_p:
        "Kech objective. O‘ldirilganda yo‘lakni suradigan kuchli ittifoqchi chaqiriladi. Ko‘pincha o‘yinni hal qiladi.",
      basecore_t: "Baza (Base Core)",
      basecore_p:
        "Yakuniy maqsad. Yutish uchun raqib bazasini buzing. Inhibitor ochiq va dushman past bo‘lganda boring.",
      inhib_t: "Inhibitor minorasi",
      inhib_p:
        "Bazadan oldingi oxirgi himoya. Olish high groundni ochadi va baza siege’ni xavfsizroq qiladi.",
      tools_eyebrow: "Farm vositalari",
      tools_title: "Farmga yordam beradigan spell va itemlar",
      retri_t: "Retribution",
      retri_p:
        "Jungler battle spell. Yirtqichlarga kuchli zarar va Turtle/Lord ni himoya qilish. Ko‘p jungler uchun majburiy.",
      exec_t: "Execute",
      exec_p:
        "Gold Lane spell. Past HP qahramonlarni tugatadi va farm ustunligidan keyin snowball qiladi.",
      jungle_eq_t: "Jungle jihozi",
      jungle_eq_p:
        "Retribution bilan sotib olinadi. Clear’ni tezlashtiradi va kuchliroq jungler itemiga o‘sadi.",
      wave_t: "Wave-clear itemlar",
      wave_p:
        "AoE yoki hujum effektli itemlar (masalan multi-target sehr yoki physical cleave) yo‘lakni tezroq farm qilishga yordam beradi.",
      prio_eyebrow: "Farm ustuvorligi",
      prio_title: "Avval nima olish kerak",
      prio1_t: "O‘z yo‘lagingiz / jungle’ingiz",
      prio1_p:
        "Jamoadosh farmiga tegmang — o‘lik bo‘lmasa yoki to‘lqin minorada behuda ketmasa.",
      prio2_t: "Buff’larni cooldown’da oling",
      prio2_p: "Orange/Blue — tempo. Bepul qoldirish orqada qoldiradi.",
      prio3_t: "Xarita ruxsat berganda Turtle",
      prio3_p: "Vision va yaqin son ustunligi bo‘lsagina Turtle’ni boshlang.",
      prio4_t: "G‘alaba jangidan keyin Lord",
      prio4_p: "Eng yaxshi vaqt: dushman wipe yoki orqaga surilgan. Keyin Lord bilan suring.",
      back_roles: "← Rollar",
      play_now_arrow: "Hozir o‘ynash →",

      play_title: "Land of Dawn kutmoqda.",
      play_lead: "O‘yinni telefoningizga yuklab oling va birinchi jangni boshlang.",
      dl_google: "Google Play’dan yuklash",
      dl_apple: "App Store’dan yuklash",

      rank_warrior: "Warrior",
      rank_elite: "Elite",
      rank_master: "Master",
      rank_grandmaster: "Grandmaster",
      rank_epic: "Epic",
      rank_legend: "Legend",
      rank_mythic: "Mythic",
      rank_mythical_honor: "Mythical Honor",
      rank_mythical_glory: "Mythical Glory",
      rank_mythical_immortal: "Mythical Immortal",
      rank_warrior_tier: "Bo‘linmalar I–III",
      rank_warrior_desc:
        "Yangi ranked o‘yinchilar uchun boshlang‘ich reyting. Yo‘lak, objective va jamoani o‘rganish uchun ideal.",
      rank_warrior_f1: "Bo‘linma yulduzlari: ×3 gacha",
      rank_warrior_f2: "Warrior’da mag‘lubiyatda yulduz yo‘qolmaydi",
      rank_warrior_f3: "Diqqat: last-hit, xarita, rollar",
      rank_elite_tier: "Bo‘linmalar I–III",
      rank_elite_desc:
        "Rollar aniqroq shakllanadi. G‘alaba yulduz beradi; mag‘lubiyat olishi mumkin — barqarorlik muhim.",
      rank_elite_f1: "Bo‘linma yulduzlari: ×4 gacha",
      rank_elite_f2: "Wave control va asosiy rotate’ni o‘rganing",
      rank_elite_f3: "Warrior’dan yuqori mavsum mukofoti",
      rank_master_tier: "Bo‘linmalar I–IV",
      rank_master_desc:
        "O‘rta raqobat. Draft va qahramon pooli sof mexanikadan ko‘proq o‘yin hal qila boshlaydi.",
      rank_master_f1: "4 bo‘linma (I–IV)",
      rank_master_f2: "Bo‘linma yulduzlari: ×4 gacha",
      rank_master_f3: "Har rol uchun 2–3 qulay qahramon mashq qiling",
      rank_grandmaster_tier: "Bo‘linmalar I–V",
      rank_grandmaster_desc:
        "Kuchli asoslar kutiladi: objective vaqti, roam yo‘llari, noto‘g‘ri pozitsiyani jazolash.",
      rank_grandmaster_f1: "5 bo‘linma (I–V)",
      rank_grandmaster_f2: "Bo‘linma yulduzlari: ×5 gacha",
      rank_grandmaster_f3: "Teamfight pozitsiyasi juda muhim",
      rank_epic_tier: "Bo‘linmalar I–V",
      rank_epic_desc:
        "Yuqori mahorat: draft, counter va makro. Road-to-Mythic mukofotlari shu yerda boshlanadi.",
      rank_epic_f1: "5 bo‘linma (I–V)",
      rank_epic_f2: "Bo‘linma yulduzlari: ×5 gacha",
      rank_epic_f3: "Road to Mythic’da Rank Protection Card ochiladi",
      rank_legend_tier: "Bo‘linmalar I–V",
      rank_legend_desc:
        "Jadvalning yuqori qismi. Bitta yomon jang snowball qilishi mumkin — vision, Lord vaqtı Legendni Mythic’dan ajratadi.",
      rank_legend_f1: "5 bo‘linma (I–V)",
      rank_legend_f2: "Bo‘linma yulduzlari: ×5 gacha",
      rank_legend_f3: "Epic’ga nisbatan qo‘shimcha Rank Protection",
      rank_mythic_tier: "×0 – ×24",
      rank_mythic_desc:
        "Eng yuqori medalga kirish. Honor, Glory va Immortal uchun yulduz yig‘ing.",
      rank_mythic_f1: "Yulduzlar: ×0–×24",
      rank_mythic_f2: "Mavsumiy Mythic mukofotlari shu yerda",
      rank_mythic_f3: "Ko‘p o‘yinni draft va makro hal qiladi",
      rank_honor_tier: "×25 – ×49",
      rank_honor_desc:
        "Oddiy Mythic’dan yuqori. Barqaror ranked va yuqori MMR lobbilar.",
      rank_honor_f1: "Yulduzlar: ×25–×49",
      rank_honor_f2: "Profil / namecard mukofot bosqichlari",
      rank_honor_f3: "Qiyinroq draft, kamroq bepul g‘alaba",
      rank_glory_tier: "×50 – ×99",
      rank_glory_desc:
        "Elita Mythic. Juda yuqori mahorat — bitta xato yulduzga qimmat. Prestij shu yerda.",
      rank_glory_f1: "Yulduzlar: ×50–×99",
      rank_glory_f2: "Yangilangan mavsumiy profil mukofotlari",
      rank_glory_f3: "Immortal chegarasiga yaqin",
      rank_immortal_tier: "×100+",
      rank_immortal_desc:
        "Ranked cho‘qqisi. Eng kuchli raqobatchi va pro’lar shu braketda.",
      rank_immortal_f1: "Yulduzlar: ×100 va undan yuqori",
      rank_immortal_f2: "Maxsus loading border mukofoti",
      rank_immortal_f3: "Ranked’dagi eng yuqori nufuz",
      rank_emblem: "{name} reyting nishoni",
    },

    ru: {
      nav_about: "Об игре",
      nav_heroes: "Герои",
      nav_roles: "Роли",
      nav_equip: "Снаряжение",
      nav_play: "Играть",
      nav_home: "Главная",
      menu: "Меню",
      close: "Закрыть",
      lang_label: "Язык",
      footer: "— фан-сайт. Официальная игра Moonton / Mobile Legends: Bang Bang.",

      eyebrow: "Боевая арена 5V5",
      lead_before:
        "Присоединяйтесь к миллионам игроков по всему миру на лучшей боевой арене 5v5. Играйте в команде. Думайте стратегически.",
      lead_em: "Станьте легендой.",
      btn_play: "Играть сейчас",
      btn_about: "Об игре",
      explore_eyebrow: "Разделы",
      explore_title: "Выберите путь",
      card_about_p: "Карта, ранги и правила игры.",
      card_heroes_p: "Состав, скиллы и советы по стилю.",
      card_roles_p: "Gold, EXP, Mid, Roam и Jungle.",
      card_equip_p: "Предметы, пассивы и фарм.",
      card_play_p: "Скачайте и зайдите в матч.",

      about_eyebrow: "Об игре",
      about_lead:
        "Mobile Legends: Bang Bang (MLBB) — это 5v5 MOBA, где две команды сражаются, чтобы уничтожить базу врага и защитить свою. Ключ к победе — командная игра, стратегия и навык!",
      fact_dev: "Разработчик",
      fact_release: "Дата выхода",
      fact_mode: "Режим",
      fact_platform: "Платформа",
      fact_release_val: "14 июля 2016",
      how_eyebrow: "Как играть",
      how_title: "5 шагов к победе",
      how1_t: "Выберите героя",
      how1_p: "Выберите героя под свою роль и стратегию.",
      how2_t: "Фармите и качайтесь",
      how2_p: "Убивайте миньонов и монстров джунглей, зарабатывайте золото.",
      how3_t: "Ломайте башни",
      how3_p: "Пушьте линии и уничтожайте башни врага.",
      how4_t: "Командный бой",
      how4_p: "Действуйте вместе с командой против врагов.",
      how5_t: "Уничтожьте базу",
      how5_p: "Разрушьте базу врага и выиграйте матч!",
      map_eyebrow: "Обзор игры",
      map_title: "Карта Land of Dawn",
      map_lead: "Три линии, джунгли, Turtle, Lord — знайте поле боя.",
      map1_t: "База (спавн)",
      map1_p: "Герои возрождаются.",
      map2_t: "Верхняя линия (EXP)",
      map2_p: "Обычно для бойцов/танков.",
      map3_t: "Центральная линия",
      map3_p: "Короткая линия, быстрее EXP.",
      map4_t: "Нижняя линия (Gold)",
      map4_p: "Для стрелков.",
      map5_t: "Джунгли",
      map5_p: "Монстры дают баффы и золото.",
      map6_t: "Turtle",
      map6_p: "Даёт команде золото и EXP.",
      map7_t: "Lord",
      map7_p: "Сильный союзник, пушащий линии.",
      map8_t: "Башни",
      map8_p: "Защищают ваши линии.",
      map9_t: "Башня ингибитора",
      map9_p: "Уничтожьте, чтобы открыть базу.",
      map10_t: "База (враг)",
      map10_p: "Уничтожьте, чтобы победить!",
      modes_eyebrow: "Режимы игры",
      modes_title: "Выберите матч",
      mode_classic_t: "Classic",
      mode_classic_p: "Для отдыха и практики.",
      mode_ranked_t: "Ranked",
      mode_ranked_p: "Поднимайтесь в ранге и докажите навык.",
      mode_brawl_t: "Brawl",
      mode_brawl_p: "5v5 на одной линии. Быстро и весело.",
      mode_custom_t: "Custom",
      mode_custom_p: "Создавайте матчи с друзьями.",
      ranks_eyebrow: "Система рангов",
      ranks_title: "Дойдите до Mythic",
      ranks_lead: "Нажмите на ранг, чтобы увидеть значок и описание.",
      ranks_hint: "Выберите ранг выше, чтобы увидеть детали.",
      roles_eyebrow: "Роли",
      roles_title: "Каждая роль важна",
      role_tank_p: "Защищает союзников и начинает бои.",
      role_fighter_p: "Баланс урона и защиты.",
      role_assassin_p: "Высокий урон, отлично убивает врагов.",
      role_marksman_p: "Дальний физический урон.",
      role_mage_p: "Магический урон с дистанции.",
      role_support_p: "Помогает и защищает союзников.",
      obj_eyebrow: "Ключевые цели",
      obj_title: "Что приносит победу",
      obj_turrets_t: "Ломайте башни",
      obj_turrets_p: "Пушьте линии и сносите башни врага.",
      obj_lord_t: "Берите Lord",
      obj_lord_p: "Призовите Lord для пуша.",
      obj_turtle_t: "Берите Turtle",
      obj_turtle_p: "Даёт золото и опыт.",
      obj_base_t: "Защищайте базу",
      obj_base_p: "Охраняйте базу и выиграйте игру.",
      tips_eyebrow: "Советы новичкам",
      tips_title: "Начните сильно",
      tip1: "Выучите хотя бы 2–3 героев.",
      tip2: "Фокусируйтесь на фарме и уровнях.",
      tip3: "Смотрите на карту и помогайте команде.",
      tip4: "Не деритесь в одиночку — играйте вместе!",
      tip5: "Практика ведёт к мастерству!",
      quote: "«Победа приходит к тем, кто верит в командную игру.» — MLBB",
      stat_downloads: "Загрузок",
      stat_heroes: "Героев",
      stat_countries: "Стран",
      stat_community: "Активное сообщество",
      about_cta: "Присоединяйтесь к миллионам игроков и станьте легендой!",
      btn_download: "Скачать",

      heroes_eyebrow: "Герои",
      heroes_title: "Избранные бойцы",
      heroes_lead: "Выбранные герои с ролью, стилем и кратким обзором.",
      label_role: "Роль",
      label_style: "Стиль",
      label_tip: "Совет",
      skin_prefix: "Скин:",
      h_melissa_skin: "Скин: Sparkle (ALLSTAR)",
      h_melissa_p:
        "Стрелок на Gold Lane. Стабильный дальний урон и керри в лейте за счёт мобильности и скорости атаки. В скине Sparkle она хозяйка сцены — гитара, энергия и стиль на поле.",
      h_melissa_style: "Дальний DPS / кайтинг",
      h_melissa_tip: "Хорошо фармите и деритесь с командой.",
      h_gusion_skin: "Скин: K' (MLBB × The King of Fighters)",
      h_gusion_p:
        "Ассасин джунглей/мида, известный комбо кинжалов и высоким бёрстом. Скин K' даёт огненный вид KOF — тот же герой: ныряй в скваши, ресет и уходи.",
      h_gusion_style: "Бёрст / преследование",
      h_gusion_tip: "Целитесь в скваши и не переигрывайте.",
      h_cecilion_skin: "Обычный / Embrace of Night",
      h_cecilion_p:
        "Мид-маг, набирающий магическую силу в матче. Дальний пок, сильный лейт-бёрст и давление в тимфайтах — особенно с Carmilla.",
      h_cecilion_style: "Пок / скейл / тимфайт",
      h_cecilion_tip: "Копите стаки — позже он намного сильнее.",
      h_belerick_skin: "Меха / особый скин",
      h_belerick_p:
        "Танк с высоким HP на фронтлайне. Наказывает атакующих, щитует союзников и держит тимфайты за счёт сустейна.",
      h_belerick_style: "Фронтлайн / пил / сустейн",
      h_belerick_tip: "Копите HP и стойте перед керри.",
      h_carmilla_skin: "Готика / Abyssal",
      h_carmilla_p:
        "Роум-саппорт, связывающий врагов и разносящий контроль проклятием. Сильный сетап — особенно опасна с Cecilion.",
      h_carmilla_style: "Энгейдж / связь / тимфайт",
      h_carmilla_tip: "Накладывайте проклятие на скопление врагов.",
      h_johnson_skin: "Скин: The Mustang (Transformers)",
      h_johnson_p:
        "Превращается в машину, подбирает союзника и врезается во врагов. Ульт даёт быстрые энгейджи по карте — один из культовых роум-танков.",
      h_johnson_style: "Энгейдж / пил / роум",
      h_johnson_tip: "Выбирайте хороший угол и тайминг ульты.",
      heroes_more_label: "127 героев",
      heroes_more_hint: "Открыть полный список",
      roster_eyebrow: "Полный список",
      roster_title: "Все герои",
      roster_loading: "Загрузка списка…",
      roster_loading_full: "Загрузка полного списка…",
      roster_count:
        "{n} героев — у каждого роль, стиль и совет. Нажмите для скиллов.",
      roster_fail:
        "Не удалось загрузить all-heroes.json. Откройте сайт через OCHISH.bat / локальный сервер.",
      skills_title: "Скиллы",
      skills_loading: "Загрузка скиллов…",
      skills_none: "Нет данных о скиллах.",
      skills_fail: "Не удалось загрузить скиллы.",
      skill_passive: "Пассивка",
      skill_n: "Скилл {n}",
      skill_ultimate: "Ульта",
      tip_prefix: "Совет:",
      style_marksman: "Дальний DPS / кайтинг",
      style_mage: "Пок / бёрст / тимфайт",
      style_assassin: "Бёрст / преследование / пик",
      style_fighter: "Дуэль / стычки / сустейн",
      style_tank: "Фронтлайн / инициирование / пил",
      style_support: "Хил / щит / утилита",
      tip_marksman: "Хорошо фармите и деритесь с безопасной дистанции.",
      tip_mage: "Стойте в тылу и кидайте скиллы по группам.",
      tip_assassin: "Целитесь в скваши и не переигрывайте.",
      tip_fighter: "Умно трейдитесь и контролируйте боковые линии или джунгли.",
      tip_tank: "Начинайте бои за команду и защищайте керри.",
      tip_support: "Роумьте с виженом и держите союзников в живых.",
      tip_default: "Изучите скиллы и играйте с командой.",
      back_about: "← Об игре",
      to_roles: "Роли →",

      roles_page_eyebrow: "Роли",
      roles_page_title: "Выберите линию",
      roles_page_lead:
        "Нажмите на линию, чтобы увидеть героев. Нажмите на героя, чтобы открыть скиллы.",
      lane_gold: "Gold Lane",
      lane_exp: "EXP Lane",
      lane_mid: "Mid Lane",
      lane_roam: "Roamer",
      lane_jungle: "Jungler",
      lane_gold_desc: "Стрелки — фарм и керри в лейтате.",
      lane_exp_desc: "Бойцы / танки — дуэли и удержание боковой линии.",
      lane_mid_desc: "Маги / ассасины — контроль мида и ротации.",
      lane_roam_desc: "Саппорты / танки — защита, вижен и сетап.",
      lane_jungle_desc: "Лесники — кемпы, ганки и объекты.",
      lane_hint: "Выберите линию выше, чтобы начать.",
      lane_fail:
        "Не удалось загрузить данные. Откройте сайт через локальный сервер (http://127.0.0.1:8765/rollar.html).",
      gameplay_title: "Геймплей",
      gameplay_lead: "Смотрите геймплей этого героя на YouTube.",
      gameplay_loading: "Загрузка видео геймплея {name}…",
      gameplay_watch: "Смотрите геймплей {name} на YouTube.",
      gameplay_fail:
        "Не удалось встроить видео. Используйте кнопки ниже, чтобы смотреть геймплей {name} на YouTube.",
      gameplay_open: "Открыть на YouTube",
      gameplay_open_name: "Открыть геймплей {name}",
      gameplay_open_video: "Открыть это видео",
      gameplay_guides: "Гайды и советы",
      gameplay_guides_name: "Гайды {name}",
      no_desc: "Описание недоступно.",
      no_skills: "Данных о скиллах пока нет.",

      eq_eyebrow: "Снаряжение",
      eq_title: "Снаряжение и фарм",
      eq_lead:
        "У каждого предмета — иконка, название и эффект в бою. Далее: как фармить золото, EXP и объекты карты.",
      shop_eyebrow: "Предметы магазина",
      shop_title: "Снаряжение — картинка, имя и функция",
      shop_lead:
        "Фильтр по типу. Иконки и пассивки из официальных данных Mobile Legends.",
      item_loading: "Загрузка снаряжения…",
      item_empty: "В этой категории нет предметов.",
      item_fail:
        "Не удалось загрузить снаряжение. Откройте сайт через локальный сервер (OCHISH.bat).",
      cat_all: "Все",
      cat_attack: "Атака",
      cat_magic: "Магия",
      cat_defense: "Защита",
      cat_boots: "Сапоги",
      cat_jungle: "Джунгли / Роум",
      farm_lane_eyebrow: "Фарм на линии",
      farm_lane_title: "Миньоны и башни",
      melee_t: "Ближние миньоны",
      melee_p: "Передняя линия. Дают золото/EXP. Добивайте для полного золота.",
      ranged_t: "Дальние миньоны",
      ranged_p: "Хрупкий задний ряд. Легко добивать; важны для темпа клира волны.",
      siege_t: "Осадный / пушечный миньон",
      siege_p: "Танковее на крупных волнах. Много золота — приоритет добивания.",
      enemy_tur_t: "Вражеские башни",
      enemy_tur_p:
        "Снос башен даёт золото и контроль карты. Внешняя → средняя → ингибитор → база.",
      jungle_eyebrow: "Кемпы джунглей",
      jungle_title: "Кемпы для фарма",
      orange_t: "Оранжевый бафф (Fiend)",
      orange_role: "Физ. лесники / бойцы",
      orange_p:
        "Даёт доп. урон и сустейн в стиле вампиризма. Ключевой кемп для AD-лесников.",
      blue_t: "Синий бафф (Spirit)",
      blue_role: "Маги / пользователи маны",
      blue_p:
        "Улучшает реген маны и КД. Мидер часто берёт после клира лесника.",
      small_t: "Малые крипы джунглей",
      small_role: "Все лесники",
      small_p:
        "Базовые кемпы за золото и EXP. Чистите джунгли по КД, чтобы не отставать.",
      litho_t: "Lithowanderer",
      litho_role: "Помощь давлению линии",
      litho_p:
        "После убийства идёт по линии и помогает пушу. Удобно переводить фарм в давление на башни.",
      crab_t: "Краб / речной кемп",
      crab_role: "Темп и вижен",
      crab_p:
        "Золото и контроль у реки. Спорно рано — деритесь, если команда поддержит.",
      special_t: "Особые / inverted кемпы",
      special_role: "Ситуативно",
      special_p:
        "В патчах бывают особые монстры. Смотрите подсказку в игре по текущему баффу.",
      major_eyebrow: "Главные объекты",
      major_title: "Turtle и Lord",
      turtle_t: "Turtle",
      turtle_p:
        "Ранний–средний объект. Золото и EXP. Спавнится до Lord — берите, когда сильнее рядом.",
      lord_t: "Lord",
      lord_p:
        "Поздний объект. После убийства призывает сильного союзника на пуш. Часто решает игру.",
      basecore_t: "База (ядро)",
      basecore_p:
        "Финальная цель. Уничтожьте базу врага. Идите только при открытых ингибиторах и слабом враге.",
      inhib_t: "Башня ингибитора",
      inhib_p:
        "Последняя защита перед базой. Снос открывает хайграунд и упрощает осаду.",
      tools_eyebrow: "Инструменты фарма",
      tools_title: "Заклинания и предметы для фарма",
      retri_t: "Retribution",
      retri_p:
        "Боевое заклинание лесника. Сильный урон по монстрам и сейв Turtle/Lord. Нужно большинству лесников.",
      exec_t: "Execute",
      exec_p:
        "Заклинание Gold Lane. Добивает героев с низким HP и помогает снеболлить.",
      jungle_eq_t: "Снаряжение джунглей",
      jungle_eq_p:
        "Покупается с Retribution. Ускоряет клир и улучшается в более сильные предметы.",
      wave_t: "Предметы на клир волны",
      wave_p:
        "Предметы с AoE или эффектами атаки помогают безопаснее и быстрее фармить линии.",
      prio_eyebrow: "Приоритет фарма",
      prio_title: "Что брать первым",
      prio1_t: "Своя линия / свои джунгли",
      prio1_p:
        "Не воруйте фарм союзника, если он жив или волна не пропадёт под башней.",
      prio2_t: "Баффы по кулдауну",
      prio2_p: "Оранжевый/синий — темп. Пропуск бесплатно отбрасывает назад.",
      prio3_t: "Turtle, когда позволяет карта",
      prio3_p: "Начинайте Turtle только с виженом и численным преимуществом рядом.",
      prio4_t: "Lord после выигранного боя",
      prio4_p: "Лучшее время: враг вайпнут или отжат. Затем пушьте с Lord.",
      back_roles: "← Роли",
      play_now_arrow: "Играть сейчас →",

      play_title: "Land of Dawn ждёт.",
      play_lead: "Скачайте игру на телефон и начните первый бой.",
      dl_google: "Скачать в Google Play",
      dl_apple: "Скачать в App Store",

      rank_warrior: "Warrior",
      rank_elite: "Elite",
      rank_master: "Master",
      rank_grandmaster: "Grandmaster",
      rank_epic: "Epic",
      rank_legend: "Legend",
      rank_mythic: "Mythic",
      rank_mythical_honor: "Mythical Honor",
      rank_mythical_glory: "Mythical Glory",
      rank_mythical_immortal: "Mythical Immortal",
      rank_warrior_tier: "Дивизионы I–III",
      rank_warrior_desc:
        "Стартовый ранг для новичков в ranked. Идеально учить линии, объекты и командную игру.",
      rank_warrior_f1: "Звёзд в дивизионе: до ×3",
      rank_warrior_f2: "В Warrior нет потери звезды при поражении",
      rank_warrior_f3: "Фокус: добивание, карта, роли",
      rank_elite_tier: "Дивизионы I–III",
      rank_elite_desc:
        "Роли становятся яснее. Победы дают звёзды; поражения могут забирать — важна стабильность.",
      rank_elite_f1: "Звёзд в дивизионе: до ×4",
      rank_elite_f2: "Учите контроль волны и базовые ротации",
      rank_elite_f3: "Сезонная награда выше Warrior",
      rank_master_tier: "Дивизионы I–IV",
      rank_master_desc:
        "Средний конкурентный уровень. Драфт и пул героев решают больше, чем только механика.",
      rank_master_f1: "4 дивизиона (I–IV)",
      rank_master_f2: "Звёзд в дивизионе: до ×4",
      rank_master_f3: "Практикуйте 2–3 комфортных героя на роль",
      rank_grandmaster_tier: "Дивизионы I–V",
      rank_grandmaster_desc:
        "Ждут сильные основы: тайминг объектов, пути роума, наказание ошибок позиции.",
      rank_grandmaster_f1: "5 дивизионов (I–V)",
      rank_grandmaster_f2: "Звёзд в дивизионе: до ×5",
      rank_grandmaster_f3: "Позиционирование в тимфайтах критично",
      rank_epic_tier: "Дивизионы I–V",
      rank_epic_desc:
        "Высокий скилл: драфт, контры и макро. Здесь начинаются награды Road to Mythic.",
      rank_epic_f1: "5 дивизионов (I–V)",
      rank_epic_f2: "Звёзд в дивизионе: до ×5",
      rank_epic_f3: "Открывает Rank Protection Card на пути к Mythic",
      rank_legend_tier: "Дивизионы I–V",
      rank_legend_desc:
        "Близко к вершине. Один плохой бой может решить многое — вижен и тайминг Lord отделяют Legend от Mythic.",
      rank_legend_f1: "5 дивизионов (I–V)",
      rank_legend_f2: "Звёзд в дивизионе: до ×5",
      rank_legend_f3: "Доп. Rank Protection относительно Epic",
      rank_mythic_tier: "×0 – ×24",
      rank_mythic_desc:
        "Вход в высшую медаль. Копите звёзды до Honor, Glory и Immortal.",
      rank_mythic_f1: "Звёзды: ×0–×24",
      rank_mythic_f2: "Сезонные награды Mythic открываются здесь",
      rank_mythic_f3: "Большинство игр решают драфт и макро",
      rank_honor_tier: "×25 – ×49",
      rank_honor_desc:
        "Выше базового Mythic. Сильные игроки со стабильным ranked и более высоким MMR.",
      rank_honor_f1: "Звёзды: ×25–×49",
      rank_honor_f2: "Награды профиля / неймкарты",
      rank_honor_f3: "Жёстче драфты и меньше бесплатных побед",
      rank_glory_tier: "×50 – ×99",
      rank_glory_desc:
        "Элитный Mythic. Очень высокий скилл — одна ошибка стоит звезды. Престиж сезона здесь.",
      rank_glory_f1: "Звёзды: ×50–×99",
      rank_glory_f2: "Улучшенные сезонные награды профиля",
      rank_glory_f3: "Близко к порогу Immortal",
      rank_immortal_tier: "×100+",
      rank_immortal_desc:
        "Вершина ranked. Топ конкурентных игроков и про доминируют здесь.",
      rank_immortal_f1: "Звёзды: ×100 и выше",
      rank_immortal_f2: "Уникальная рамка загрузки",
      rank_immortal_f3: "Высший престиж в Ranked",
      rank_emblem: "Эмблема ранга {name}",
    },
  };

  function getLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && dict[saved]) return saved;
    return "en";
  }

  function t(key, vars) {
    const lang = getLang();
    let s = (dict[lang] && dict[lang][key]) || dict.en[key] || key;
    if (vars) {
      Object.keys(vars).forEach((k) => {
        s = s.replace(new RegExp("\\{" + k + "\\}", "g"), String(vars[k]));
      });
    }
    return s;
  }

  function applyLang(lang) {
    const pack = dict[lang] || dict.en;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (!key || pack[key] == null) return;
      if (el.childElementCount && el.querySelector("[data-i18n-keep]")) {
        const keep = el.querySelector("[data-i18n-keep]");
        el.childNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) node.textContent = "";
        });
        el.insertBefore(document.createTextNode(pack[key] + " "), keep);
        return;
      }
      el.textContent = pack[key];
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      if (!key || pack[key] == null) return;
      el.innerHTML = pack[key];
    });

    const lead = document.querySelector("[data-i18n-lead]");
    if (lead) {
      lead.innerHTML =
        pack.lead_before + " <em data-i18n-keep>" + pack.lead_em + "</em>";
    }

    const menuBtn = document.getElementById("menuBtn");
    if (menuBtn && pack.menu) menuBtn.setAttribute("aria-label", pack.menu);

    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria");
      if (key && pack[key] != null) el.setAttribute("aria-label", pack[key]);
    });

    const langLabel = document.querySelector(".lang-switch-label");
    if (langLabel) langLabel.textContent = pack.lang_label;

    // Footer: keep brand span, translate rest
    document.querySelectorAll(".site-footer p").forEach((p) => {
      const brand = p.querySelector("span");
      if (!brand) return;
      p.innerHTML = "";
      p.appendChild(brand);
      p.appendChild(document.createTextNode(" " + pack.footer));
    });

    document.documentElement.lang = lang === "uz" ? "uz" : lang;
  }

  function syncButtons(lang) {
    document.querySelectorAll(".lang-switch [data-lang]").forEach((btn) => {
      const on = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  function setLang(lang) {
    if (!dict[lang]) lang = "en";
    localStorage.setItem(STORAGE_KEY, lang);
    applyLang(lang);
    syncButtons(lang);
    window.dispatchEvent(new CustomEvent("mlbb:lang", { detail: { lang } }));
  }

  function ensureSwitcher() {
    if (document.querySelector(".lang-switch")) return;
    const header = document.querySelector(".site-header");
    if (!header) return;

    const box = document.createElement("div");
    box.className = "lang-switch";
    box.setAttribute("role", "group");
    box.setAttribute("aria-label", "Language");

    const label = document.createElement("span");
    label.className = "lang-switch-label";
    label.textContent = "Language";
    box.appendChild(label);

    [
      ["en", "ENG"],
      ["uz", "UZB"],
      ["ru", "RUS"],
    ].forEach(([code, text]) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "lang-btn";
      b.dataset.lang = code;
      b.textContent = text;
      box.appendChild(b);
    });

    const menuBtn = document.getElementById("menuBtn");
    if (menuBtn) header.insertBefore(box, menuBtn);
    else header.appendChild(box);
  }

  function ensureAdminLink() {
    if (document.querySelector(".admin-entry")) return;
    if (document.body.classList.contains("admin-body")) return;
    const header = document.querySelector(".site-header");
    const lang = document.querySelector(".lang-switch");
    if (!header || !lang) return;

    const a = document.createElement("a");
    a.className = "admin-entry";
    a.href = "admin.html";
    a.setAttribute("aria-label", "Admin");
    a.title = "Admin";
    a.innerHTML =
      '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';

    const menuBtn = document.getElementById("menuBtn");
    if (menuBtn && lang.nextElementSibling === menuBtn) {
      header.insertBefore(a, menuBtn);
    } else {
      lang.insertAdjacentElement("afterend", a);
    }
  }

  function bindSwitcher() {
    document.querySelectorAll(".lang-switch [data-lang]").forEach((btn) => {
      btn.addEventListener("click", () => setLang(btn.getAttribute("data-lang")));
    });
  }

  function tagNav() {
    const map = [
      ["oyun.html", "nav_about"],
      ["qahramonlar.html", "nav_heroes"],
      ["rollar.html", "nav_roles"],
      ["guide.html", "nav_equip"],
      ["boshlash.html", "nav_play"],
      ["index.html", "nav_home"],
    ];
    document.querySelectorAll(".nav a, .home-links a").forEach((a) => {
      const href = (a.getAttribute("href") || "").split("?")[0];
      const hit = map.find(([file]) => href.endsWith(file));
      if (hit && !a.hasAttribute("data-i18n")) {
        a.setAttribute("data-i18n", hit[1]);
      }
    });
  }

  window.MLBB = window.MLBB || {};
  window.MLBB.t = t;
  window.MLBB.getLang = getLang;
  window.MLBB.setLang = setLang;
  window.MLBB.dict = dict;

  ensureSwitcher();
  ensureAdminLink();
  bindSwitcher();
  tagNav();
  setLang(getLang());
})();

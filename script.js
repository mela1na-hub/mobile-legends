const header = document.querySelector(".site-header");
const menuBtn = document.getElementById("menuBtn");

if (menuBtn && header) {
  menuBtn.addEventListener("click", () => {
    const open = header.classList.toggle("nav-open");
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

window.addEventListener(
  "scroll",
  () => {
    if (!header || header.classList.contains("solid")) return;
    if (window.scrollY > 40) {
      header.style.background = "rgba(7, 11, 18, 0.92)";
    } else {
      header.style.background =
        "linear-gradient(180deg, rgba(7, 11, 18, 0.95), rgba(7, 11, 18, 0))";
    }
  },
  { passive: true }
);

const homeRail = document.getElementById("homeHeroRail");
const homeDots = document.getElementById("homeHeroDots");
if (homeRail && homeDots) {
  const dots = [...homeDots.querySelectorAll("span")];
  homeRail.addEventListener(
    "scroll",
    () => {
      const max = homeRail.scrollWidth - homeRail.clientWidth;
      const i = max <= 0 ? 0 : Math.round((homeRail.scrollLeft / max) * (dots.length - 1));
      dots.forEach((dot, n) => dot.classList.toggle("is-on", n === i));
    },
    { passive: true }
  );
}

document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", () => {
    if (header) {
      header.classList.remove("nav-open");
      if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
    }
  });
});

const homePaths = document.querySelectorAll(".home-path");
if (homePaths.length) {
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-open");
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );
    homePaths.forEach((el) => io.observe(el));
  } else {
    homePaths.forEach((el) => el.classList.add("is-open"));
  }
}

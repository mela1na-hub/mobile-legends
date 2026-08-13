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

const hamburger = document.getElementById("hamburger");
const sideMenu = document.getElementById("sideMenu");
const closeBtn = document.getElementById("closeBtn");
const overlay = document.getElementById("overlay");

hamburger.addEventListener("click", () => {
  sideMenu.classList.add("active");
  overlay.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  sideMenu.classList.remove("active");
  overlay.style.display = "none";
});

overlay.addEventListener("click", () => {
  sideMenu.classList.remove("active");
  overlay.style.display = "none";
});

window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 0) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

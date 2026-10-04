const $ = s => document.querySelector(s);

const menuBtn = $("#menuBtn");
const navLinks = $("#navLinks");
menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

const progress = $("#progress");
const topBtn = $("#topBtn");
window.addEventListener("scroll", () => {
  const h = document.documentElement;
  progress.style.width = `${(h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100}%`;
  topBtn.classList.toggle("show", window.scrollY > 600);
});
topBtn.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add("visible");
  });
}, {threshold:.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

$("#year").textContent = new Date().getFullYear();

const modal = $("#modal");
const modalTitle = $("#modalTitle");
document.querySelectorAll("[data-demo]").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    modalTitle.textContent = link.dataset.demo;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden","false");
  });
});
const closeModal = () => { modal.classList.remove("open"); modal.setAttribute("aria-hidden","true"); };
$("#modalClose").addEventListener("click", closeModal);
$("#modalOk").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if(e.target === modal) closeModal(); });
document.addEventListener("keydown", e => { if(e.key === "Escape") closeModal(); });

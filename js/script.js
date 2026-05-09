// ---------------------------
// Smooth Scrolling
// ---------------------------
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (!href || href === "#") return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });

    // Close mobile menu after click
    closeMobileMenu();
  });
});

// ---------------------------
// Navbar background on scroll
// ---------------------------
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (!navbar) return;

  if (window.scrollY > 90) {
    navbar.style.boxShadow = "0 14px 30px rgba(2, 6, 23, 0.10)";
  } else {
    navbar.style.boxShadow = "none";
  }
});

// ---------------------------
// Mobile Menu Toggle
// ---------------------------
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

function openMobileMenu() {
  if (!mobileMenu) return;
  mobileMenu.classList.add("open");
  mobileMenu.setAttribute("aria-hidden", "false");
}

function closeMobileMenu() {
  if (!mobileMenu) return;
  mobileMenu.classList.remove("open");
  mobileMenu.setAttribute("aria-hidden", "true");
}

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    if (!mobileMenu) return;
    const isOpen = mobileMenu.classList.contains("open");
    isOpen ? closeMobileMenu() : openMobileMenu();
  });
}

// Close menu if user clicks outside
document.addEventListener("click", (e) => {
  if (!mobileMenu || !menuToggle) return;
  const clickedMenu = mobileMenu.contains(e.target);
  const clickedBtn = menuToggle.contains(e.target);
  if (!clickedMenu && !clickedBtn) closeMobileMenu();
});

// ---------------------------
// Active nav link on scroll
// ---------------------------
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function setActiveLink() {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 130;
    if (window.scrollY >= sectionTop) current = section.getAttribute("id");
  });

  navLinks.forEach((a) => {
    a.classList.remove("active");
    if (a.getAttribute("href") === `#${current}`) a.classList.add("active");
  });
}

window.addEventListener("scroll", setActiveLink);
setActiveLink();

// ---------------------------
// Reveal animations
// ---------------------------
const revealEls = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach((el) => revealObserver.observe(el));

// ---------------------------
// Typing effect
// ---------------------------
const typingText = document.getElementById("typingText");
const roles = [
  "Computer Science Student",
  "Aspiring Full-Stack Developer",
  "AI & Data Enthusiast",
  "Building clean, modern UIs",
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  if (!typingText) return;

  const currentRole = roles[roleIndex];

  if (!deleting) {
    typingText.textContent = currentRole.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentRole.length) {
      deleting = true;
      setTimeout(typeLoop, 1200);
      return;
    }
  } else {
    typingText.textContent = currentRole.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeLoop, deleting ? 45 : 70);
}
typeLoop();

// ---------------------------
// Theme Toggle (Dark/Light) with LocalStorage
// ---------------------------
const themeToggle = document.getElementById("themeToggle");

function setThemeIcon() {
  if (!themeToggle) return;
  const icon = themeToggle.querySelector("i");
  if (!icon) return;

  if (document.body.classList.contains("dark")) {
    icon.className = "fa-solid fa-sun";
  } else {
    icon.className = "fa-solid fa-moon";
  }
}

function loadTheme() {
  const saved = localStorage.getItem("portfolio_theme");
  if (saved === "dark") document.body.classList.add("dark");
  setThemeIcon();
}
loadTheme();

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem(
      "portfolio_theme",
      document.body.classList.contains("dark") ? "dark" : "light"
    );
    setThemeIcon();
  });
}

// ---------------------------
// Project Modal
// ---------------------------
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalTech = document.getElementById("modalTech");
const modalGithub = document.getElementById("modalGithub");
const modalDemo = document.getElementById("modalDemo");

function openModalFromCard(card) {
  if (!modal || !card) return;

  const title = card.dataset.title || "Project";
  const desc = card.dataset.desc || "No description provided.";
  const tech = card.dataset.tech || "";
  const github = card.dataset.github || "#";
  const demo = card.dataset.demo || "#";

  if (modalTitle) modalTitle.textContent = title;
  if (modalDesc) modalDesc.textContent = desc;

  if (modalTech) {
    modalTech.innerHTML = "";
    tech.split(",").map((t) => t.trim()).filter(Boolean).forEach((t) => {
      const span = document.createElement("span");
      span.textContent = t;
      modalTech.appendChild(span);
    });
  }

  if (modalGithub) modalGithub.href = github;
  if (modalDemo) modalDemo.href = demo;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll(".open-modal").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const card = e.target.closest(".project-card");
    openModalFromCard(card);
  });
});

if (modal) {
  modal.addEventListener("click", (e) => {
    const close = e.target.dataset.close === "true";
    if (close) closeModal();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// ---------------------------
// Contact Form (Frontend Only)
// ---------------------------
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (formNote) {
      formNote.textContent =
        "✅ Message prepared! (This is a frontend demo. Connect it to a backend or Formspree to actually send.)";
    }

    contactForm.reset();
  });
}


  // ---------------------------
  // Highlights Tabs (NEW)
  // ---------------------------
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  function activateTab(tabName) {
    // Buttons
    tabButtons.forEach((btn) => {
      const isActive = btn.dataset.tab === tabName;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
      btn.setAttribute("tabindex", isActive ? "0" : "-1");
    });

    // Panels
    tabPanels.forEach((panel) => {
      const panelId = panel.id || "";
      const matches = panelId === `tab-${tabName}`;
      panel.classList.toggle("active", matches);

      // Accessibility
      panel.setAttribute("aria-hidden", matches ? "false" : "true");
    });
  }

  // Click to switch
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      activateTab(btn.dataset.tab);
    });

    // Keyboard support: left/right arrows
    btn.addEventListener("keydown", (e) => {
      const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
      if (!keys.includes(e.key)) return;

      e.preventDefault();
      const btns = Array.from(tabButtons);
      const idx = btns.indexOf(btn);

      let nextIdx = idx;
      if (e.key === "ArrowRight") nextIdx = (idx + 1) % btns.length;
      if (e.key === "ArrowLeft") nextIdx = (idx - 1 + btns.length) % btns.length;
      if (e.key === "Home") nextIdx = 0;
      if (e.key === "End") nextIdx = btns.length - 1;

      btns[nextIdx].focus();
      activateTab(btns[nextIdx].dataset.tab);
    });
  });

  // Default tab on load (Certificates)
  if (tabButtons.length && tabPanels.length) {
    const defaultTab = document.querySelector(".tab-btn.active")?.dataset.tab || "certificates";
    activateTab(defaultTab);
  }

// ---------------------------
// Projects Filter
// ---------------------------
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

function matchesFilter(card, filter) {
  if (filter === "all") return true;

  const cats = (card.dataset.category || "").toLowerCase().split(/\s+/).filter(Boolean);
  return cats.includes(filter);
}

function applyFilter(filter) {
  projectCards.forEach((card) => {
    const show = matchesFilter(card, filter);

    if (show) {
      card.classList.remove("is-gone");
      requestAnimationFrame(() => card.classList.remove("is-hidden"));
    } else {
      card.classList.add("is-hidden");
      setTimeout(() => card.classList.add("is-gone"), 180);
    }
  });

  filterButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.filter === filter);
    btn.setAttribute("aria-selected", btn.dataset.filter === filter ? "true" : "false");
  });
}

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => applyFilter(btn.dataset.filter));
});

// default
if (filterButtons.length) applyFilter("all");

// ---------------------------
// Profile Image Modal
// ---------------------------
const heroImage = document.querySelector(".hero-image");
const imageModal = document.getElementById("imageModal");
const imageOverlay = document.getElementById("imageOverlay");

if (heroImage && imageModal) {
  heroImage.addEventListener("click", () => {
    imageModal.classList.add("open");
    document.body.style.overflow = "hidden";
  });
}

if (imageOverlay) {
  imageOverlay.addEventListener("click", () => {
    imageModal.classList.remove("open");
    document.body.style.overflow = "";
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && imageModal.classList.contains("open")) {
    imageModal.classList.remove("open");
    document.body.style.overflow = "";
  }
});

console.log("Portfolio loaded successfully ✅");
/* ── Typing Animation ────────────────────────────────────────────────────── */
const phrases = [
  "M.S. Computer Science Graduate.",
  "Python & Backend Developer.",
  "AI Application Builder.",
  "Machine Learning Engineer.",
  "Problem Solver.",
];

const typedEl = document.querySelector(".typed");
let phraseIdx = 0;
let charIdx   = 0;
let deleting  = false;
let typingTimer;

function type() {
  const current = phrases[phraseIdx];

  if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      // pause at end before deleting
      typingTimer = setTimeout(() => { deleting = true; type(); }, 2000);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting  = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      typingTimer = setTimeout(type, 400);
      return;
    }
  }

  typingTimer = setTimeout(type, deleting ? 45 : 80);
}

// Start after hero animation delay
setTimeout(type, 1200);


/* ── Intersection Observer — fade-in on scroll ───────────────────────────── */
const fadeEls = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger siblings inside the same parent
        const siblings = [...entry.target.parentElement.querySelectorAll(".fade-in")];
        const delay    = siblings.indexOf(entry.target) * 80;
        setTimeout(() => entry.target.classList.add("visible"), delay);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

fadeEls.forEach((el) => observer.observe(el));


/* ── Skill Bars — animate width when visible ─────────────────────────────── */
const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target
          .querySelectorAll(".skill-bar-fill")
          .forEach((bar) => {
            bar.style.width = bar.dataset.width + "%";
          });
        barObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll(".skill-card").forEach((c) => barObserver.observe(c));


/* ── Active Nav Link on Scroll ───────────────────────────────────────────── */
const sections  = document.querySelectorAll("section[id]");
const navLinks  = document.querySelectorAll(".nav-links a");
const NAV_H     = 80;

function updateActiveNav() {
  let current = "";
  sections.forEach((sec) => {
    if (window.scrollY >= sec.offsetTop - NAV_H - 40) {
      current = sec.getAttribute("id");
    }
  });
  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`
    );
  });
}

window.addEventListener("scroll", updateActiveNav, { passive: true });
updateActiveNav();


/* ── Nav shadow on scroll ────────────────────────────────────────────────── */
const nav = document.getElementById("nav");

window.addEventListener(
  "scroll",
  () => {
    if (window.scrollY > 10) {
      nav.style.boxShadow = "0 4px 24px rgba(0,0,0,0.4)";
    } else {
      nav.style.boxShadow = "none";
    }
  },
  { passive: true }
);


/* ── Smooth scroll for all anchor links ─────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      e.preventDefault();
      const top = target.offsetTop - NAV_H + 1;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});


/* ── Cursor blink fix (CSS handles it, just ensure element exists) ───────── */
// cursor element is already in the HTML with CSS animation


/* ── Easter egg: Konami Code ────────────────────────────────────────────── */
const konami = [38,38,40,40,37,39,37,39,66,65];
let konamiIdx = 0;
document.addEventListener("keydown", (e) => {
  if (e.keyCode === konami[konamiIdx]) {
    konamiIdx++;
    if (konamiIdx === konami.length) {
      konamiIdx = 0;
      document.body.style.transition = "filter 0.5s";
      document.body.style.filter = "hue-rotate(180deg)";
      setTimeout(() => { document.body.style.filter = ""; }, 3000);
    }
  } else {
    konamiIdx = 0;
  }
});

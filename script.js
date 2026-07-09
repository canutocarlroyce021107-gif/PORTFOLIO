/* ==========================================================================
   DATA — swap these out with your own projects / skills
   ========================================================================== */
const PROJECTS = [
  {
    code: 'CAT. NO. 011',
    title: 'Northbound',
    role: 'Design system, fintech startup',
    desc: 'A component library and token system built for a five-person team shipping three products at once. Cut design-to-dev handoff time by half.',
    tags: ['Figma', 'React', 'Design Tokens'],
  },
  {
    code: 'CAT. NO. 012',
    title: 'Fieldnote',
    role: 'iOS app, personal project',
    desc: 'A minimal journaling app for naturalists — offline-first, with a hand-tuned typewriter font and zero social features by design.',
    tags: ['Swift', 'SwiftUI', 'Product'],
  },
  {
    code: 'CAT. NO. 013',
    title: 'Lumen Analytics',
    role: 'Dashboard redesign, B2B SaaS',
    desc: 'Reworked a dense reporting dashboard used by ops teams. Reduced average time-to-insight from four minutes to under ninety seconds.',
    tags: ['Data Viz', 'React', 'UX Research'],
  },
  {
    code: 'CAT. NO. 014',
    title: 'Radio Static',
    role: 'Generative art, side project',
    desc: 'A browser-based tool that turns AM radio noise into printable patterns. Built as an excuse to learn WebGL shaders.',
    tags: ['WebGL', 'Creative Code'],
  },
  {
    code: 'CAT. NO. 015',
    title: 'Harbor',
    role: 'Onboarding flow, logistics platform',
    desc: 'Redesigned a seven-step onboarding wizard into a single guided flow. Completion rate rose from 61% to 89%.',
    tags: ['UX Design', 'Prototyping'],
  },
  {
    code: 'CAT. NO. 016',
    title: 'Plainspoken',
    role: 'Open-source component kit',
    desc: 'A no-frills accessible component library for teams who want sensible defaults instead of another design system to maintain.',
    tags: ['Open Source', 'A11y', 'CSS'],
  },
];

const SKILL_INDEX = [
  {
    heading: 'Design',
    items: [
      { name: 'Interaction Design', tag: 'core' },
      { name: 'Design Systems', tag: 'core' },
      { name: 'Prototyping', tag: 'core' },
      { name: 'User Research', tag: 'applied' },
    ],
  },
  {
    heading: 'Engineering',
    items: [
      { name: 'JavaScript / TypeScript', tag: 'core' },
      { name: 'React', tag: 'core' },
      { name: 'CSS / Motion', tag: 'core' },
      { name: 'Accessibility', tag: 'applied' },
    ],
  },
  {
    heading: 'Tools',
    items: [
      { name: 'Figma', tag: 'daily' },
      { name: 'Git / GitHub', tag: 'daily' },
      { name: 'Framer', tag: 'occasional' },
      { name: 'Blender', tag: 'hobby' },
    ],
  },
];

/* ==========================================================================
   RENDER — build cards & index from data above
   ========================================================================== */
function renderCards() {
  const grid = document.getElementById('cardGrid');
  grid.innerHTML = PROJECTS.map((p, i) => `
    <article class="index-card" tabindex="0" role="button"
              aria-label="View details for ${p.title}" data-index="${i}">
      <span class="card-code">${p.code}</span>
      <h3>${p.title}</h3>
      <p class="card-role">${p.role}</p>
      <div class="card-tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</div>
      <div class="card-perforation" aria-hidden="true"></div>
    </article>
  `).join('');
}

function renderIndex() {
  const cols = document.getElementById('indexColumns');
  cols.innerHTML = SKILL_INDEX.map(col => `
    <div class="index-column">
      <h4>${col.heading}</h4>
      <ul>
        ${col.items.map(item => `<li>${item.name}<span class="tag">${item.tag}</span></li>`).join('')}
      </ul>
    </div>
  `).join('');
}

/* ==========================================================================
   MODAL
   ========================================================================== */
const modal = document.getElementById('cardModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');
let lastFocused = null;

function openModal(index) {
  const p = PROJECTS[index];
  modalBody.innerHTML = `
    <span class="card-code">${p.code}</span>
    <h3>${p.title}</h3>
    <p class="card-role">${p.role}</p>
    <p class="card-desc">${p.desc}</p>
    <div class="card-tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</div>
  `;
  lastFocused = document.activeElement;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  modalClose.focus();
  document.addEventListener('keydown', onModalKeydown);
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.removeEventListener('keydown', onModalKeydown);
  if (lastFocused) lastFocused.focus();
}

function onModalKeydown(e) {
  if (e.key === 'Escape') closeModal();
}

function bindCardEvents() {
  document.getElementById('cardGrid').addEventListener('click', (e) => {
    const card = e.target.closest('.index-card');
    if (card) openModal(Number(card.dataset.index));
  });
  document.getElementById('cardGrid').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const card = e.target.closest('.index-card');
      if (card) {
        e.preventDefault();
        openModal(Number(card.dataset.index));
      }
    }
  });
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

/* ==========================================================================
   NAV — active tab tracking + smooth scroll + mobile menu
   ========================================================================== */
function bindNav() {
  const tabs = document.querySelectorAll('.nav-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = document.querySelector(tab.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const sections = ['#work', '#about', '#skills', '#contact']
    .map(id => document.querySelector(id))
    .filter(Boolean);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = `#${entry.target.id}`;
        tabs.forEach(t => t.classList.toggle('active', t.dataset.target === id));
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

  sections.forEach(s => observer.observe(s));

  const menuToggle = document.querySelector('.menu-toggle');
  const headerInner = document.querySelector('.header-inner');
  menuToggle.addEventListener('click', () => {
    const isOpen = headerInner.classList.toggle('menu-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
  tabs.forEach(tab => tab.addEventListener('click', () => {
    headerInner.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));
}

/* ==========================================================================
   CONTACT FORM (front-end only — wire up to your own backend/service)
   ========================================================================== */
function bindForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      status.textContent = 'Please fill in every field before submitting.';
      status.style.color = 'var(--rust)';
      return;
    }
    status.textContent = 'Filed. Thanks — I\u2019ll get back to you shortly.';
    status.style.color = 'var(--rust)';
    form.reset();
  });
}

/* ==========================================================================
   INIT
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  renderCards();
  renderIndex();
  bindCardEvents();
  bindNav();
  bindForm();
  document.getElementById('year').textContent = new Date().getFullYear();
});

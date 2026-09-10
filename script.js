const projects = [
    {
        emoji: '🛒', cat: 'Full Stack',
        title: 'E-Commerce Platform',
        desc: 'A complete e-commerce solution with user authentication, product catalog, shopping cart, order management, and an admin dashboard for inventory control.',
        features: 'JWT authentication, product search & filters, cart management, order tracking, admin panel, payment integration gateway, responsive mobile UI.',
        stack: ['React', 'Spring Boot', 'MySQL', 'JWT Auth', 'REST API', 'Tailwind CSS'],
        github: '#', live: '#'
    },
    {
        emoji: '💬', cat: 'Full Stack',
        title: 'Real-Time Chat App',
        desc: 'A full-featured messaging application with real-time updates using WebSockets, supporting group rooms, direct messages, and online presence indicators.',
        features: 'Real-time messaging via Socket.io, multiple chat rooms, user online/offline status, message history, emoji reactions, responsive layout.',
        stack: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express.js'],
        github: '#', live: '#'
    },
    {
        emoji: '📊', cat: 'Frontend',
        title: 'Analytics Dashboard',
        desc: 'A rich data visualization dashboard that presents complex datasets with interactive charts, date-range filters, and exportable reports.',
        features: 'Bar, line, pie charts, date filtering, data export (CSV/PDF), responsive grid, dark/light mode, real-time data refresh.',
        stack: ['React', 'Tailwind CSS', 'Chart.js', 'JavaScript'],
        github: '#', live: '#'
    },
    {
        emoji: '🔐', cat: 'Backend',
        title: 'Auth Microservice',
        desc: 'A production-ready authentication microservice with JWT tokens, refresh token rotation, OAuth 2.0 integration, and role-based access control.',
        features: 'JWT & refresh tokens, OAuth 2.0 (Google), RBAC, rate limiting, brute-force protection, Docker deployment, Swagger API docs.',
        stack: ['Spring Boot', 'PostgreSQL', 'JWT', 'Docker', 'Spring Security'],
        github: '#', live: null
    },
    {
        emoji: '📝', cat: 'Full Stack',
        title: 'Task Manager App',
        desc: 'A collaborative project management tool with Kanban boards, drag-and-drop task management, deadlines, and team member assignments.',
        features: 'Kanban & list views, drag-and-drop (DnD), deadline reminders, team collaboration, priority labels, task comments, progress tracking.',
        stack: ['React', 'Express.js', 'MongoDB', 'Socket.io'],
        github: '#', live: '#'
    },
    {
        emoji: '🌤️', cat: 'Frontend',
        title: 'Weather Dashboard',
        desc: 'A visually stunning weather application with 7-day forecast, city search, animated weather icons, and hourly breakdown using OpenWeather API.',
        features: 'City search with autocomplete, 7-day forecast, hourly breakdown, animated weather states, UV index, humidity & wind speed, geolocation.',
        stack: ['React', 'OpenWeather API', 'CSS Animations', 'Geolocation API'],
        github: '#', live: '#'
    }
];

function openModal(idx) {
    const p = projects[idx];
    document.getElementById('modalThumb').style.fontSize = '4rem';
    document.getElementById('modalThumb').firstElementChild && null;
    const closeBtn = document.getElementById('modalThumb').querySelector('.modal-close');
    document.getElementById('modalThumb').innerHTML = p.emoji;
    document.getElementById('modalThumb').insertAdjacentHTML('beforeend', '<button class="modal-close" onclick="closeModal(null)">✕</button>');
    document.getElementById('modalCat').textContent = p.cat;
    document.getElementById('modalTitle').textContent = p.title;
    document.getElementById('modalDesc').textContent = p.desc;
    document.getElementById('modalFeatures').textContent = p.features;
    const stack = document.getElementById('modalStack');
    stack.innerHTML = p.stack.map(t => `<span class="stack-chip">${t}</span>`).join('');
    const links = document.getElementById('modalLinks');
    links.innerHTML = `<a href="${p.github}" class="btn btn-outline" style="font-size:0.85rem;padding:9px 18px;" target="_blank" rel="noopener">GitHub →</a>`;
    if (p.live) links.innerHTML += `<a href="${p.live}" class="btn btn-primary" style="font-size:0.85rem;padding:9px 18px;" target="_blank" rel="noopener">Live Demo ↗</a>`;
    document.getElementById('modalOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closeModal(e) {
    if (e === null || e.target === document.getElementById('modalOverlay')) {
        document.getElementById('modalOverlay').classList.remove('open');
        document.body.style.overflow = '';
    }
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(null); });

// ── SKILL FILTER ──
function filterSkills(cat) {
    document.querySelectorAll('.skills-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    document.querySelectorAll('.skill-card').forEach(c => {
        c.classList.toggle('visible', cat === 'all' || c.dataset.cat === cat);
    });
}

// ── PROJECT FILTER ──
function filterProjects(cat) {
    document.querySelectorAll('.proj-filter').forEach(f => f.classList.remove('active'));
    event.target.classList.add('active');
    document.querySelectorAll('.proj-card').forEach(c => {
        const show = cat === 'all' || c.dataset.cat === cat;
        c.style.display = show ? 'block' : 'none';
    });
}

// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
    document.getElementById('back-top').classList.toggle('visible', window.scrollY > 400);
    updateActiveNav();
});

// ── ACTIVE NAV ──
const sections = ['home', 'about', 'skills', 'experience', 'projects', 'education', 'certifications', 'contact'];
function updateActiveNav() {
    const scrollY = window.scrollY + 100;
    let cur = 'home';
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) cur = id;
    });
    document.querySelectorAll('.nav-links a').forEach(a => {
        const href = a.getAttribute('href').replace('#', '');
        a.classList.toggle('active', href === cur);
    });
}

// ── MOBILE MENU ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;
function closeMobile() { menuOpen = false; mobileMenu.classList.remove('open'); }
hamburger.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('open', menuOpen);
});

// ── TYPED EFFECT ──
const roles = ['Full Stack Developer', 'Java Developer', 'React Specialist', 'Backend Engineer', 'Problem Solver'];
let roleIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typedText');
function type() {
    const cur = roles[roleIdx];
    typedEl.textContent = deleting ? cur.slice(0, charIdx--) : cur.slice(0, charIdx++);
    if (!deleting && charIdx > cur.length) { deleting = true; setTimeout(type, 1800); return; }
    if (deleting && charIdx < 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; charIdx = 0; }
    setTimeout(type, deleting ? 50 : 80);
}
type();

// ── INTERSECTION OBSERVER ──
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); observer.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ── COPY EMAIL ──
function copyEmail() {
    navigator.clipboard.writeText('vikashgiri88040@gmail.com').then(() => {
        const btn = document.getElementById('copyBtn');
        btn.textContent = '✓ Copied!';
        btn.style.color = 'var(--green)';
        setTimeout(() => { btn.textContent = 'Copy'; btn.style.color = 'var(--accent)'; }, 2000);
    });
}

// ── CONTACT FORM ──
function submitForm(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const label = document.getElementById('submitLabel');
    const status = document.getElementById('formStatus');
    btn.disabled = true; label.textContent = 'Sending...';
    status.className = 'form-status'; status.style.display = 'none';
    // Simulate (replace with EmailJS or Formspree)
    setTimeout(() => {
        btn.disabled = false; label.textContent = 'Send Message';
        status.className = 'form-status success';
        status.textContent = '✓ Message sent successfully! I will get back to you soon.';
        document.getElementById('contactForm').reset();
    }, 1600);
}
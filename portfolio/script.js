/* ══════════════════════════════════════════ DATA ══════════════════════════════════════════ */
const skills = [
    { emoji: "💻", category: "Langages", tags: ["Java", "Python", "C/C++", "JavaScript", "PHP", "HTML", "CSS", "PL/SQL", "VHDL"] },
    { emoji: "⚛️", category: "Frameworks & Libs", tags: ["React", "Next.js", "Node.js", "Express.js", "Symfony", "Twig", "LangChain4j", "TensorFlow Java", "DJL"] },
    { emoji: "☁️", category: "Cloud & DevOps", tags: ["Azure", "AWS", "Oracle OCI", "Docker", "GitHub Actions", "Sentry", "UptimeRobot", "VMware"] },
    { emoji: "🗄️", category: "Bases de données", tags: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"] },
    { emoji: "🌐", category: "Réseau & Administration", tags: ["Cisco", "Huawei eNSP", "Wi-Fi Architecture", "VLAN", "STP", "CSMA/CD"] },
    { emoji: "🛠️", category: "Outils & Méthodes", tags: ["VSCode", "Git/GitHub", "UML", "MVC", "Eclipse", "PyCharm", "MATLAB", "Android Studio"] }
];

const experience = [
    { period: "Fév – Mai 2025", role: "Stagiaire PFE", org: "TMI", desc: "Configuration d'une architecture Wi-Fi disponible, redondante et hautement sécurisée." },
    { period: "Juil – Août 2024", role: "Stagiaire", org: "WeReBase", desc: "Développement d'une mini application web de suivi des activités marketing." }
];

const education = [
    { period: "2025 – 2028", role: "Diplôme d'Ingénierie Informatique", org: "Université SESAME", desc: "Formation d'ingénieur spécialisé en informatique." },
    { period: "2022 – 2025", role: "Licence Computer Engineering", org: "Faculté des Sciences de Tunis", desc: "Diplôme en ingénierie des systèmes informatiques." },
    { period: "2021 – 2022", role: "Baccalauréat Sciences Exp.", org: "Lycée les Berges du Lac", desc: "Diplôme de baccalauréat en sciences expérimentales." }
];

const certifications = [
    { ico: "☁️", name: "Azure Cloud Fundamentals AZ-900", issuer: "Microsoft" },
    { ico: "📊", name: "Azure Data Fundamentals DP-900", issuer: "Microsoft" },
    { ico: "🏗️", name: "OCI Architect Associate", issuer: "Oracle Cloud" },
    { ico: "⚙️", name: "OCI DevOps Professional", issuer: "Oracle Cloud" },
    { ico: "🌐", name: "OCI Multicloud Architect Associate", issuer: "Oracle Cloud" },
    { ico: "🗃️", name: "Oracle Data Platform Foundation", issuer: "Oracle" }
];

/* ══════════════════════════════════════════ OBSERVERS ══════════════════════════════════════════ */
function makeObserver(threshold = 0.1) {
    return new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                entry.target._obs && entry.target._obs.unobserve(entry.target);
            }
        });
    }, { threshold });
}

const revealObs   = makeObserver(0.08);
const timelineObs = makeObserver(0.1);

/* ══════════════════════════════════════════ RENDER FUNCTIONS ══════════════════════════════════════════ */
function renderSkills() {
    const grid = document.getElementById("skillsGrid");
    if (!grid) return;
    grid.innerHTML = "";
    skills.forEach((s, i) => {
        const card = document.createElement("div");
        card.className = "skill-card";
        card.style.transitionDelay = `${i * 70}ms`;
        card._obs = revealObs;
        card.innerHTML = `
            <div class="skill-card-top">
                <div class="skill-emoji">${s.emoji}</div>
                <h4>${s.category}</h4>
            </div>
            <div class="skill-tags">${s.tags.map(t => `<span class="skill-tag">${t}</span>`).join("")}</div>
        `;
        grid.appendChild(card);
        revealObs.observe(card);
    });
}

function renderTimeline(data, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = "";
    data.forEach((item, i) => {
        const el = document.createElement("div");
        el.className = "tl-item";
        el.style.transitionDelay = `${i * 130}ms`;
        el._obs = timelineObs;
        el.innerHTML = `
            <div class="tl-period">${item.period}</div>
            <div class="tl-role">${item.role}</div>
            <div class="tl-org">${item.org}</div>
            <div class="tl-desc">${item.desc}</div>
        `;
        container.appendChild(el);
        timelineObs.observe(el);
    });
}

function renderCerts() {
    const grid = document.getElementById("certsList");
    if (!grid) return;
    grid.innerHTML = "";
    certifications.forEach((c, i) => {
        const card = document.createElement("div");
        card.className = "cert-card";
        card.style.transitionDelay = `${i * 70}ms`;
        card._obs = revealObs;
        card.innerHTML = `
            <span class="cert-ico">${c.ico}</span>
            <div>
                <div class="cert-name">${c.name}</div>
                <div class="cert-issuer">${c.issuer}</div>
            </div>
        `;
        grid.appendChild(card);
        revealObs.observe(card);
    });
}

/* ══════════════════════════════════════════ GITHUB PROJECTS ══════════════════════════════════════════ */
async function fetchGitHubProjects() {
    const container = document.getElementById("projectsGrid");
    if (!container) return;
    container.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:var(--text3);font-family:var(--ff-mono);font-size:0.78rem;">Chargement des projets depuis GitHub...</p>`;

    try {
        const res = await fetch("https://api.github.com/users/rania435/repos?sort=updated&per_page=9");
        if (!res.ok) throw new Error("API error");
        const repos = await res.json();
        container.innerHTML = "";

        repos.forEach((repo, i) => {
            const card = document.createElement("div");
            card.className = "project-card";
            card.style.transitionDelay = `${i * 90}ms`;
            card._obs = revealObs;
            card.innerHTML = `
                <div class="proj-head">
                    <div class="proj-emoji">📦</div>
                    <a href="${repo.html_url}" target="_blank" class="proj-link" title="Voir sur GitHub">↗</a>
                </div>
                <h3 class="proj-title">${repo.name}</h3>
                <p class="proj-desc">${repo.description || "Aucune description fournie."}</p>
                <div class="proj-stack">
                    ${repo.language ? `<span class="proj-tech">${repo.language}</span>` : ""}
                    <span class="proj-tech">★ ${repo.stargazers_count}</span>
                </div>
                <span class="proj-date">Mis à jour : ${new Date(repo.updated_at).toLocaleDateString("fr-FR")}</span>
            `;
            container.appendChild(card);
            revealObs.observe(card);
        });
    } catch (err) {
        container.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:#f472b6;font-family:var(--ff-mono);font-size:0.78rem;">
            Impossible de charger les projets GitHub pour le moment.
        </p>`;
    }
}

/* ══════════════════════════════════════════ INIT ══════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
    /* --- Custom cursor --- */
    const cursor = document.getElementById("cursor");
    const follower = document.getElementById("cursorFollower");
    let mx = 0, my = 0, fx = 0, fy = 0;

    document.addEventListener("mousemove", e => {
        mx = e.clientX; my = e.clientY;
        cursor.style.left = mx + "px";
        cursor.style.top  = my + "px";
    });

    function animFollower() {
        fx += (mx - fx) * 0.12;
        fy += (my - fy) * 0.12;
        follower.style.left = fx + "px";
        follower.style.top  = fy + "px";
        requestAnimationFrame(animFollower);
    }
    animFollower();

    document.querySelectorAll("a, button, .skill-card, .project-card, .cert-card, input, textarea").forEach(el => {
        el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
        el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
    });

    /* --- Navbar scroll --- */
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 60);
        // active link highlight
        const sections = document.querySelectorAll("section[id]");
        let current = "";
        sections.forEach(s => {
            if (window.scrollY >= s.offsetTop - 120) current = s.id;
        });
        document.querySelectorAll(".nav-a").forEach(a => {
            a.classList.toggle("active", a.getAttribute("href") === `#${current}`);
        });
    }, { passive: true });

    /* --- Hamburger --- */
    document.getElementById("hamburger").addEventListener("click", () => {
        document.getElementById("navLinks").classList.toggle("open");
    });

    /* --- Theme toggle --- */
    const html = document.documentElement;
    const themeBtn = document.getElementById("themeBtn");
    const savedTheme = localStorage.getItem("rania-theme") || "dark";
    html.setAttribute("data-theme", savedTheme);
    themeBtn.querySelector(".theme-icon").textContent = savedTheme === "dark" ? "◑" : "●";

    themeBtn.addEventListener("click", () => {
        const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", next);
        localStorage.setItem("rania-theme", next);
        themeBtn.querySelector(".theme-icon").textContent = next === "dark" ? "◑" : "●";
    });

    /* --- Contact form --- */
    document.getElementById("contactForm").addEventListener("submit", e => {
        e.preventDefault();
        const name  = document.getElementById("fname").value.trim();
        const email = document.getElementById("femail").value.trim();
        const msg   = document.getElementById("fmsg").value.trim();
        if (!name || !email || !msg) return;

        const messages = JSON.parse(localStorage.getItem("rania-messages") || "[]");
        messages.push({ name, email, msg, date: new Date().toISOString() });
        localStorage.setItem("rania-messages", JSON.stringify(messages));

        const note = document.getElementById("formMsg");
        note.textContent = `✓ Merci ${name} ! Message sauvegardé.`;
        e.target.reset();
        setTimeout(() => note.textContent = "", 5000);
    });

    /* --- Render all --- */
    renderSkills();
    renderTimeline(experience, "expList");
    renderTimeline(education, "eduList");
    renderCerts();
    fetchGitHubProjects();
});
const STORAGE = {
  profile: "mr_profile",
  projects: "mr_projects",
  services: "mr_services",
  gallery: "mr_gallery",
  blogs: "mr_blogs",
  messages: "mr_messages",
  language: "mr_language"
};

const defaults = {
  profile: {
    name: "MONORANJON",
    role: "Creative Digital Creator",
    description: "আমি নতুন আইডিয়া, প্রযুক্তি এবং সৃজনশীলতার মাধ্যমে ডিজিটাল জগতে নতুন কিছু তৈরি করতে ভালোবাসি।",
    aboutTitle: "Building Ideas Into Reality.",
    aboutText: "আমি একজন Creative Digital Creator। Technology, Web Development, Design এবং Digital Innovation নিয়ে কাজ করতে আগ্রহী।",
    email: "hello@example.com",
    photo: "",
    facebook: "https://facebook.com/",
    youtube: "https://youtube.com/",
    tiktok: "https://tiktok.com/"
  },
  projects: [
    {title:"MONORANJON Website",category:"WEB DEVELOPMENT",description:"A personal brand website with modern digital experience.",link:"#",image:""},
    {title:"Digital Platform",category:"DIGITAL PROJECT",description:"A creative digital platform project.",link:"#",image:""},
    {title:"Creative Design",category:"UI / UX DESIGN",description:"Modern visual and interface design concept.",link:"#",image:""}
  ],
  services: [
    {icon:"✦",title:"Web Development",description:"Modern responsive website development."},
    {icon:"◈",title:"UI / UX Design",description:"Creative and professional user interfaces."},
    {icon:"⌘",title:"Digital Projects",description:"Digital product and platform development."},
    {icon:"◎",title:"Creative Solutions",description:"Ideas and creative digital solutions."}
  ],
  gallery: [],
  blogs: []
};

function read(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function renderProfile() {
  const p = read(STORAGE.profile, defaults.profile);

  document.getElementById("heroName").textContent = p.name;
  document.getElementById("heroRole").textContent = p.role;
  document.getElementById("heroDescription").textContent = p.description;
  document.getElementById("aboutTitle").textContent = p.aboutTitle;
  document.getElementById("aboutText").textContent = p.aboutText;
  document.getElementById("emailLink").textContent = p.email + " ↗";
  document.getElementById("emailLink").href = "mailto:" + p.email;

  if (p.photo) {
    document.getElementById("profileImage").style.backgroundImage =
      `url("${p.photo}")`;
    document.getElementById("profileImage").querySelector("span").style.display = "none";
  }

  document.getElementById("socialLinks").innerHTML = `
    <a href="${safeURL(p.facebook)}" target="_blank" rel="noopener">Facebook ↗</a>
    <a href="${safeURL(p.youtube)}" target="_blank" rel="noopener">YouTube ↗</a>
    <a href="${safeURL(p.tiktok)}" target="_blank" rel="noopener">TikTok ↗</a>
  `;
}

function safeURL(value) {
  try {
    const url = new URL(value, location.href);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "#";
  } catch {
    return "#";
  }
}

function renderProjects() {
  const items = read(STORAGE.projects, defaults.projects);
  const container = document.getElementById("projectGrid");

  container.innerHTML = items.map(p => `
    <article class="project-card">
      <div class="project-image"
        style="${p.image ? `background-image:url('${p.image}')` : ""}">
        ${p.image ? "" : "✦"}
      </div>
      <div class="project-info">
        <small>${escapeHTML(p.category || "PROJECT")}</small>
        <h3>${escapeHTML(p.title)}</h3>
        <p>${escapeHTML(p.description)}</p>
        <a href="${safeURL(p.link || "#")}" target="_blank" rel="noopener">Explore Project ↗</a>
      </div>
    </article>
  `).join("");
}

function renderServices() {
  const items = read(STORAGE.services, defaults.services);
  document.getElementById("servicesGrid").innerHTML = items.map(s => `
    <article class="service-card">
      <div class="service-icon">${escapeHTML(s.icon || "✦")}</div>
      <h3>${escapeHTML(s.title)}</h3>
      <p>${escapeHTML(s.description)}</p>
    </article>
  `).join("");
}

function renderGallery() {
  const items = read(STORAGE.gallery, []);
  const container = document.getElementById("galleryGrid");

  if (!items.length) {
    container.innerHTML = '<div class="gallery-empty">Your gallery will appear here.</div>';
    return;
  }

  container.innerHTML = items.map(item => `
    <div class="gallery-item" role="img"
      aria-label="${escapeHTML(item.title || "Gallery image")}"
      style="background-image:url('${item.image}')"></div>
  `).join("");
}

function renderBlogs() {
  const items = read(STORAGE.blogs, []);
  document.getElementById("blogGrid").innerHTML = items.map(b => `
    <article class="blog-card">
      <div class="blog-image"
        style="${b.image ? `background-image:url('${b.image}')` : ""}">
        ${b.image ? "" : "✧"}
      </div>
      <div class="blog-info">
        <small>MONORANJON JOURNAL</small>
        <h3>${escapeHTML(b.title)}</h3>
        <p>${escapeHTML(b.description)}</p>
      </div>
    </article>
  `).join("");
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",
    '"':"&quot;","'":"&#39;"
  })[char]);
}

function renderAll() {
  renderProfile();
  renderProjects();
  renderServices();
  renderGallery();
  renderBlogs();
}

const translations = {
  bn: {
    "হোম":"Home",
    "পরিচিতি":"About",
    "প্রজেক্ট":"Projects",
    "সার্ভিস":"Services",
    "গ্যালারি":"Gallery",
    "যোগাযোগ":"Contact",
    "স্বাগতম আমার ডিজিটাল জগতে":"WELCOME TO MY DIGITAL WORLD",
    "আমার সম্পর্কে":"About Me",
    "আমার প্রজেক্ট":"My Projects",
    "আমার সার্ভিস":"My Services",
    "যোগাযোগ করুন":"Contact Me",
    "আমার কাজ দেখুন ↗":"Explore My Work ↗",
    "চলো কথা বলি":"Let's Connect"
  }
};

let currentLanguage = read(STORAGE.language, "bn");

function setLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem(STORAGE.language, lang);
  document.body.classList.toggle("bn", lang === "bn");

  document.querySelectorAll("[data-bn][data-en]").forEach(el => {
    el.textContent = lang === "bn" ? el.dataset.bn : el.dataset.en;
  });

  document.getElementById("languageBtn").textContent =
    lang === "bn" ? "EN" : "BN";
}

document.getElementById("languageBtn").addEventListener("click", () => {
  setLanguage(currentLanguage === "bn" ? "en" : "bn");
});

document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("navMenu").classList.toggle("show");
});

document.querySelectorAll("#navMenu a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("navMenu").classList.remove("show");
  });
});

document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();

  const message = {
    id: Date.now(),
    name: document.getElementById("contactName").value.trim(),
    email: document.getElementById("contactEmail").value.trim(),
    subject: document.getElementById("contactSubject").value.trim(),
    message: document.getElementById("contactMessage").value.trim(),
    date: new Date().toLocaleString()
  };

  if (!message.name || !message.email || !message.subject || !message.message) {
    return;
  }

  const messages = read(STORAGE.messages, []);
  messages.unshift(message);
  localStorage.setItem(STORAGE.messages, JSON.stringify(messages));

  document.getElementById("formStatus").textContent =
    "Message saved in this browser's demo storage.";
  e.target.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();

renderAll();
setLanguage(currentLanguage);

window.addEventListener("load", () => {
  setTimeout(() => document.getElementById("loader").classList.add("hide"), 700);
});

window.addEventListener("storage", renderAll);

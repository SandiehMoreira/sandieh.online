/* =========================================================
   CONFIGURAÇÃO — edite aqui seus contatos
   ========================================================= */
const CONFIG = {
  // Somente números, com DDI + DDD. Ex: "5541999998888"
  whatsapp: "5541996411706",
  email: "sandiehmoreira@gmail.com",
  // Só o @ do usuário, sem o "@". Ex: "sandieh.dev"
  instagram: "sandiehoficial",
  // Só o usuário. Ex: "sandiehmoreira"
  github: "SandiehMoreira",
  birth: new Date(1998, 1, 1), // fevereiro de 1998
};

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

/* ---------- Intro: invasão simulada no CMD ----------
   Tudo aqui é só efeito visual: são textos na tela, nenhum comando é executado. */
(function intro() {
  const el = $("#intro");
  const reveal = () => {
    document.body.classList.remove("is-loading");
    startReveals();
  };
  if (reduceMotion) { el.remove(); reveal(); return; }

  const body = $("#cmd-body");
  let done = false;
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const rand = (a, b) => Math.floor(a + Math.random() * (b - a));
  const hex = (n) => Array.from({ length: n }, () => "0123456789abcdef"[rand(0, 16)]).join("");
  const esc = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const PROMPT = '<span class="c-dim">C:\\Users\\visitante&gt;</span>';

  const cursor = document.createElement("span");
  cursor.className = "cmd-cursor";
  const scroll = () => { body.scrollTop = body.scrollHeight; };
  const line = (html = "") => {
    cursor.remove();
    body.insertAdjacentHTML("beforeend", html + "\n");
    body.append(cursor);
    scroll();
  };
  const type = async (text, speed = 16) => {
    cursor.remove();
    const span = document.createElement("span");
    span.className = "c-w";
    body.insertAdjacentHTML("beforeend", PROMPT);
    body.append(span, cursor);
    for (const ch of text) {
      if (done) return;
      span.textContent += ch;
      scroll();
      await sleep(speed);
    }
    await sleep(160);
    cursor.remove();
    body.insertAdjacentText("beforeend", "\n");
    body.append(cursor);
  };
  const progress = async (label, dur) => {
    cursor.remove();
    const span = document.createElement("span");
    body.insertAdjacentHTML("beforeend", label + " ");
    body.append(span, document.createTextNode("\n"), cursor);
    const steps = 20;
    for (let i = 0; i <= steps && !done; i++) {
      span.innerHTML = `<span class="c-bar">[${"█".repeat(i)}${"░".repeat(steps - i)}]</span> ${Math.round((i / steps) * 100)}%`;
      scroll();
      await sleep(dur / steps);
    }
  };

  async function run() {
    line('<span class="c-dim">Microsoft Windows [versão 10.0.22631.4317]</span>');
    line('<span class="c-dim">(c) Sandieh Corporation. Todos os direitos reservados.</span>');
    line();
    await sleep(350);
    await type("sandieh.exe --target sandieh.online --mode stealth");
    if (done) return;
    line('<span class="c-y">[*]</span> Resolvendo host sandieh.online ........ <span class="c-c">10.0.13.37</span>');
    await sleep(220);
    line('<span class="c-y">[*]</span> Varrendo portas...');
    const ports = [["21/tcp", "closed", "ftp", "c-dim"], ["22/tcp", "open", "ssh", "c-g"], ["80/tcp", "open", "http", "c-g"], ["443/tcp", "open", "https", "c-g"], ["3306/tcp", "filtered", "mysql", "c-y"]];
    for (const [port, state, svc, cls] of ports) {
      if (done) return;
      line(`    ${port.padEnd(10)}<span class="${cls}">${state.padEnd(10)}</span>${svc}`);
      await sleep(75);
    }
    await progress('<span class="c-y">[*]</span> Bypass do firewall', 800);
    if (done) return;
    line('<span class="c-y">[*]</span> Quebrando hash SHA-256 da senha root...');
    for (let i = 0; i < 22 && !done; i++) {
      line(`    <span class="c-dim">0x${hex(4)}</span> ${hex(32)}  <span class="c-r">✗ falhou</span>`);
      await sleep(i < 5 ? 70 : 24);
    }
    if (done) return;
    line(`    <span class="c-dim">0x${hex(4)}</span> ${hex(32)}  <span class="c-g">✓ MATCH</span>`);
    await sleep(250);
    line('<span class="c-g">[+]</span> Credenciais obtidas: <span class="c-w">root</span> / <span class="c-w">••••••••••</span>');
    await progress('<span class="c-y">[*]</span> Descriptografando portfólio', 650);
    if (done) return;
    line('<span class="c-g">[+] ACESSO ROOT CONCEDIDO</span>');
    line();
    await sleep(300);
    await type("start portfolio.exe", 28);
    if (done) return;
    await sleep(150);

    // Pausa clássica do Windows: o site só abre quando a pessoa aperta algo
    await sleep(350);
    await type("pause", 45);
    if (done) return;
    const touch = window.matchMedia("(hover: none)").matches;
    cursor.remove();
    body.insertAdjacentHTML("beforeend", `<span class="cmd-pause">${touch ? "Toque na tela" : "Pressione qualquer tecla"} para continuar. . .</span>`);
    body.append(cursor);
    scroll();
    el.classList.add("waiting");
  }

  /* ---- Saída: a tela se abre em fatias ---- */
  function finish() {
    if (done) return;
    done = true;
    el.classList.add("exit");
    reveal();
    setTimeout(() => el.remove(), 1400);
  }

  // Qualquer tecla, botão do mouse ou toque libera o site (também serve para pular)
  $("#intro-skip").addEventListener("click", finish);
  window.addEventListener("keydown", finish, { once: true });
  el.addEventListener("pointerdown", finish);
  el.addEventListener("contextmenu", (e) => e.preventDefault());
  run();
})();

/* ---------- Matrix rain ---------- */
(function matrix() {
  const canvas = $("#matrix");
  const ctx = canvas.getContext("2d");
  const chars = "アイウエオカキクケコサシスセソ0123456789ABCDEF<>/{}#$@";
  const size = 16;
  let cols, drops, w, h;

  const resize = () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    cols = Math.ceil(w / size);
    drops = Array.from({ length: cols }, () => Math.random() * -h / size);
  };
  resize();
  window.addEventListener("resize", resize);

  if (reduceMotion) return;

  let last = 0;
  const draw = (t) => {
    requestAnimationFrame(draw);
    if (t - last < 50 / (window.gameSpeed || 1)) return; // ~20fps, leve para a bateria
    last = t;
    ctx.fillStyle = "rgba(5, 7, 10, 0.12)";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = getComputedStyle(document.body).getPropertyValue("--green").trim() || "#00ff9c";
    ctx.font = size + "px JetBrains Mono, monospace";
    for (let c = 0; c < cols; c++) {
      const ch = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(ch, c * size, drops[c] * size);
      if (drops[c] * size > h && Math.random() > 0.975) drops[c] = 0;
      drops[c]++;
    }
  };
  requestAnimationFrame(draw);
})();

/* ---------- Typed text ---------- */
(function typed() {
  const el = $("#typed");
  const words = [
    "especialista em iPhone",
    "técnico Android",
    "desenvolvedor web",
    "criador de apps",
    "entusiasta de cibersegurança",
    "guitarrista & gamer",
  ];
  if (reduceMotion) { el.textContent = words[0]; return; }
  let w = 0, c = 0, del = false;
  const loop = () => {
    const word = words[w];
    el.textContent = word.slice(0, c);
    if (!del && c < word.length) { c++; setTimeout(loop, 70); }
    else if (!del) { del = true; setTimeout(loop, 1600); }
    else if (c > 0) { c--; setTimeout(loop, 35); }
    else { del = false; w = (w + 1) % words.length; setTimeout(loop, 300); }
  };
  loop();
})();

/* ---------- Nível = idade ---------- */
(function level() {
  const now = new Date();
  let age = now.getFullYear() - CONFIG.birth.getFullYear();
  if (now < new Date(now.getFullYear(), CONFIG.birth.getMonth(), CONFIG.birth.getDate())) age--;
  $("#level").textContent = "LV " + age;
  $("#year").textContent = now.getFullYear();
})();

/* ---------- Contatos ---------- */
(function contacts() {
  const set = (key, href, label) => {
    const a = $(`[data-link="${key}"]`);
    if (!href) { a.classList.add("disabled"); return; }
    a.href = href;
    $(`[data-label="${key}"]`).textContent = label;
  };
  set("whatsapp", CONFIG.whatsapp && `https://wa.me/${CONFIG.whatsapp}`, CONFIG.whatsapp && formatPhone(CONFIG.whatsapp));
  set("email", CONFIG.email && `mailto:${CONFIG.email}`, CONFIG.email);
  set("instagram", CONFIG.instagram && `https://instagram.com/${CONFIG.instagram}`, "@" + CONFIG.instagram);
  set("github", CONFIG.github && `https://github.com/${CONFIG.github}`, "github.com/" + CONFIG.github);
  if (!CONFIG.whatsapp) $("#form-note").textContent = "Sua mensagem abre no seu app de e-mail.";
})();

function formatPhone(n) {
  const m = n.match(/^55(\d{2})(\d{4,5})(\d{4})$/);
  return m ? `(${m[1]}) ${m[2]}-${m[3]}` : "+" + n;
}

/* ---------- Formulário -> WhatsApp / e-mail ---------- */
$("#contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const text =
    `Olá Sandieh! Me chamo ${data.get("nome")}.\n` +
    `Serviço: ${data.get("servico")}\n\n` +
    `${data.get("mensagem")}`;
  const url = CONFIG.whatsapp
    ? `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`
    : `mailto:${CONFIG.email}?subject=${encodeURIComponent("Orçamento: " + data.get("servico"))}&body=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener");
  unlock("Primeiro contato: missão aceita!");
});

// Botões "Aceitar missão" já selecionam o serviço no formulário
$$(".mission-cta").forEach((a) =>
  a.addEventListener("click", () => { $("#servico").value = a.dataset.service; })
);

/* ---------- Projetos (GitHub) ---------- */
(function projects() {
  const grid = $("#projects-grid");
  const LANG_COLORS = {
    HTML: "#e34c26", CSS: "#563d7c", JavaScript: "#f1e05a", TypeScript: "#3178c6",
    Java: "#b07219", Python: "#3572A5", Kotlin: "#A97BFF", Swift: "#F05138",
    Dart: "#00B4AB", PHP: "#4F5D95", "C#": "#178600",
  };
  // Usado se a API do GitHub não responder (sem internet, limite de requisições etc.)
  const FALLBACK = [
    { name: "portfolio", description: "Principal Portfólio", language: "HTML" },
    { name: "lampada", description: "Projeto HTML, CSS e JavaScript", language: "HTML" },
    { name: "fabula-html-css", description: "Um website com 5 fábulas usando o básico de HTML e CSS.", language: "HTML" },
    { name: "javatrabalho", description: "Início trabalho Java", language: "Java" },
    { name: "sandiehmoreira.github.io", description: "", language: null },
    { name: "DesenvolvimentoAvan-adoAula3", description: "", language: null },
  ].map((r) => ({ ...r, html_url: `https://github.com/${CONFIG.github}/${r.name}` }));

  grid.innerHTML = '<div class="project skeleton"></div>'.repeat(3);

  const render = (repos) => {
    grid.innerHTML = "";
    repos.slice(0, 3).forEach((r, i) => {
      const a = document.createElement("a");
      a.className = "project reveal visible";
      a.href = r.html_url;
      a.target = "_blank";
      a.rel = "noopener";

      const slot = document.createElement("p");
      slot.className = "project-slot";
      slot.innerHTML = `SLOT ${String(i + 1).padStart(2, "0")}<span>● SAVE</span>`;

      const h3 = document.createElement("h3");
      h3.textContent = r.name;

      const desc = document.createElement("p");
      desc.className = "project-desc";
      desc.textContent = r.description || "Projeto em desenvolvimento. Abra no GitHub para ver o código.";

      const meta = document.createElement("div");
      meta.className = "project-meta";
      const lang = document.createElement("span");
      lang.className = "lang";
      lang.style.setProperty("--c", LANG_COLORS[r.language] || "#7d938b");
      lang.innerHTML = "<i></i>";
      lang.append(r.language || "Código");
      const open = document.createElement("span");
      open.className = "project-open";
      open.textContent = "abrir →";
      meta.append(lang, open);

      a.append(slot, h3, desc, meta);
      grid.append(a);
    });
  };

  fetch(`https://api.github.com/users/${CONFIG.github}/repos?sort=updated&per_page=30`)
    .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
    .then((repos) => {
      // o OS-App já aparece no card de destaque acima da grade
      const list = repos.filter((r) => !r.fork && r.name !== "os-app");
      render(list.length ? list : FALLBACK);
    })
    .catch(() => render(FALLBACK));
})();

/* ---------- Menu mobile ---------- */
(function menu() {
  const btn = $("#menu-toggle");
  const links = $("#nav-links");
  const toggle = (open) => {
    links.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", open);
  };
  btn.addEventListener("click", () => toggle(!links.classList.contains("open")));
  $$("a", links).forEach((a) => a.addEventListener("click", () => toggle(false)));
})();

/* ---------- Reveal on scroll ---------- */
function startReveals() {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
    }),
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  $$(".reveal").forEach((el) => io.observe(el));
}

/* ---------- Links ativos na nav ---------- */
(function activeNav() {
  const links = $$(".nav-links a[href^='#']");
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + en.target.id));
    }),
    { rootMargin: "-45% 0px -50% 0px" }
  );
  $$("main section[id]").forEach((s) => io.observe(s));
})();

/* ---------- Scroll: progresso, nav, serviços, timeline ---------- */
(function onScroll() {
  const nav = $(".nav");
  const progress = $(".scroll-progress span");
  const services = $("#servicos");
  const track = $("#services-track");
  const servicesBar = $("#services-bar");
  const timeline = $(".timeline");
  const timelineFill = $("#timeline-fill");
  const isDesktop = window.matchMedia("(min-width: 861px)");
  let achievedBottom = false;

  // Conquista "Explorador": só vale depois de passar por TODAS as seções.
  // A cada 0,5s vê qual seção está no meio da tela; se for a mesma da checagem
  // anterior, a pessoa parou pra ver (passar voando pelo menu não conta).
  const sections = $$("main section[id]");
  const seen = new Set();
  let lastCenter = null;
  const seenTimer = setInterval(() => {
    if (document.body.classList.contains("is-loading")) return;
    const mid = window.innerHeight / 2;
    const current = sections.find((sec) => {
      const r = sec.getBoundingClientRect();
      return r.top <= mid && r.bottom >= mid;
    });
    if (current && current === lastCenter && !seen.has(current.id)) {
      seen.add(current.id);
      update();
    }
    lastCenter = current;
    if (achievedBottom) clearInterval(seenTimer);
  }, 500);
  let ticking = false;

  const update = () => {
    ticking = false;
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? y / max : 0;
    progress.style.transform = `scaleX(${p})`;
    nav.classList.toggle("scrolled", y > 40);

    // Serviços: scroll vertical vira movimento horizontal
    if (isDesktop.matches) {
      const rect = services.getBoundingClientRect();
      const total = services.offsetHeight - window.innerHeight;
      const sp = Math.min(Math.max(-rect.top / total, 0), 1);
      const distance = track.scrollWidth - window.innerWidth;
      track.style.transform = `translate3d(${-sp * Math.max(distance, 0)}px,0,0)`;
      servicesBar.style.transform = `scaleX(${sp})`;
    }

    // Linha da jornada vai enchendo
    const tr = timeline.getBoundingClientRect();
    const tp = Math.min(Math.max((window.innerHeight * 0.6 - tr.top) / tr.height, 0), 1);
    timelineFill.style.transform = `scaleY(${tp})`;

    if (!achievedBottom && p > 0.98 && seen.size === sections.length) {
      achievedBottom = true;
      unlock("Explorador: viu o portfólio inteiro!");
    }
  };

  window.addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener("resize", update);
  update();
})();

/* ---------- Tilt 3D nos cards ---------- */
(function tilt() {
  if (reduceMotion || !window.matchMedia("(hover: hover)").matches) return;
  $$("[data-tilt]").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateZ(0)`;
    });
    el.addEventListener("mouseleave", () => { el.style.transform = ""; });
  });
})();

/* ---------- Brilho que segue o mouse ---------- */
(function glow() {
  const g = $(".cursor-glow");
  window.addEventListener("pointermove", (e) => {
    g.style.transform = `translate(${e.clientX - 260}px, ${e.clientY - 260}px)`;
  }, { passive: true });
})();

/* ---------- Conquistas ---------- */
let achTimer;
function unlock(text) {
  const box = $("#achievement");
  $("#ach-text").textContent = text;
  box.classList.add("show");
  clearTimeout(achTimer);
  achTimer = setTimeout(() => box.classList.remove("show"), 3800);
}

/* ---------- Cheats do GTA San Andreas (PC + PS2) ---------- */
(function cheats() {
  const body = document.body;
  const hud = $("#sa-hud");
  const toast = $("#sa-toast");
  const moneyEl = $("#sa-money");
  const stars = $("#sa-stars");
  const starEls = $$("i", stars);
  const armorBar = $(".sa-armor i", hud);
  const healthBar = $(".sa-health i", hud);
  const weather = $("#sa-weather");
  const timers = {};
  let cash = 0, hp = 45, armor = 0, wanted = 0, moneyTimer;

  /* ---- Helpers de efeito ---- */
  const later = (key, ms, fn) => { clearTimeout(timers[key]); timers[key] = setTimeout(fn, ms); };
  const showToast = (text) => {
    toast.textContent = text;
    toast.classList.add("show");
    later("toast", 2400, () => toast.classList.remove("show"));
  };
  const renderHud = () => {
    armorBar.style.setProperty("--w", armor + "%");
    healthBar.style.setProperty("--w", hp + "%");
    starEls.forEach((s, i) => s.classList.toggle("off", i >= wanted));
  };
  const showHud = (ms = 5000) => {
    renderHud();
    hud.classList.add("show");
    later("hud", ms, () => hud.classList.remove("show"));
  };
  const setMoney = (value) => {
    const from = cash, start = performance.now();
    cash = Math.max(0, value);
    clearInterval(moneyTimer);
    moneyTimer = setInterval(() => {
      const p = Math.min((performance.now() - start) / 1400, 1);
      moneyEl.textContent = "$" + String(Math.round(from + (cash - from) * p)).padStart(8, "0");
      if (p >= 1) clearInterval(moneyTimer);
    }, 30);
  };
  const setWanted = (n, flash = true) => {
    wanted = Math.max(0, Math.min(6, n));
    showHud(4500);
    if (flash) { stars.classList.add("flash"); later("stars", 1600, () => stars.classList.remove("flash")); }
  };
  const clearWanted = () => {
    if (!wanted) wanted = 6;
    showHud(4500);
    stars.classList.add("flash");
    later("stars", 1200, () => {
      stars.classList.remove("flash");
      const n = wanted;
      for (let i = 0; i < n; i++) setTimeout(() => { wanted--; renderHud(); }, i * 200);
    });
  };
  const setWeapon = (icon, ammo = "") => {
    $("#sa-wicon").textContent = icon;
    $("#sa-ammo").textContent = ammo;
    showHud(5000);
  };
  const pulse = (cls, ms) => {
    body.classList.remove(cls);
    void body.offsetWidth;
    body.classList.add(cls);
    later(cls, ms, () => body.classList.remove(cls));
  };
  const swap = (prefix, cls) => {
    const had = body.classList.contains(cls);
    [...body.classList].filter((c) => c.startsWith(prefix)).forEach((c) => body.classList.remove(c));
    if (!had && cls) body.classList.add(cls);
  };
  const setWeather = (type) => { weather.className = "sa-weather " + type; };
  const rain = (chars, n = 30, dir = "down") => {
    const list = [...chars];
    for (let i = 0; i < n; i++) {
      const d = document.createElement("span");
      d.className = "sa-drop " + (dir === "up" ? "up" : "");
      d.textContent = list[(Math.random() * list.length) | 0];
      d.style.left = Math.random() * 100 + "vw";
      d.style.fontSize = 20 + Math.random() * 26 + "px";
      d.style.animationDelay = Math.random() * 1.4 + "s";
      d.style.setProperty("--d", 2.2 + Math.random() * 2 + "s");
      d.style.setProperty("--r", (Math.random() * 720 - 360) + "deg");
      d.style.setProperty("--x", (Math.random() * 120 - 60) + "px");
      body.append(d);
      setTimeout(() => d.remove(), 6000);
    }
  };
  const booms = (n = 10) => {
    for (let i = 0; i < n; i++) {
      setTimeout(() => {
        const b = document.createElement("span");
        b.className = "sa-boom";
        b.textContent = "💥";
        b.style.left = 10 + Math.random() * 80 + "vw";
        b.style.top = 15 + Math.random() * 70 + "vh";
        body.append(b);
        pulse("fx-punch", 600);
        setTimeout(() => b.remove(), 1000);
      }, i * 180);
    }
  };
  const TANK = '<svg viewBox="0 0 130 64" width="150" height="74" aria-hidden="true"><rect x="8" y="34" width="104" height="22" rx="11" fill="#2f3a24" stroke="#000" stroke-width="3"/><g fill="#141414"><circle cx="24" cy="45" r="6"/><circle cx="44" cy="45" r="6"/><circle cx="64" cy="45" r="6"/><circle cx="84" cy="45" r="6"/><circle cx="100" cy="45" r="6"/></g><rect x="30" y="16" width="54" height="20" rx="5" fill="#4d6135" stroke="#000" stroke-width="3"/><rect x="82" y="21" width="44" height="7" fill="#4d6135" stroke="#000" stroke-width="3"/></svg>';
  const vehicle = (label, icon, { air = false, flip = 1, rot = 0 } = {}) => {
    const v = document.createElement("div");
    v.className = "sa-vehicle" + (air ? " air" : "");
    v.innerHTML = icon.startsWith("<") ? icon : `<span>${icon}</span>`;
    v.style.setProperty("--flip", flip);
    v.style.setProperty("--rot", rot + "deg");
    body.append(v);
    setTimeout(() => v.remove(), 3600);
    const n = $("#sa-vname");
    n.textContent = label;
    n.classList.add("show");
    later("vname", 3000, () => n.classList.remove("show"));
  };
  const rocket = (mode) => {
    const r = $("#sa-rocket");
    r.textContent = mode === "chute" ? "🪂" : "🚀";
    r.className = "sa-rocket";
    void r.offsetWidth;
    r.classList.add(mode);
  };
  const speed = (mult, cls) => {
    window.gameSpeed = mult;
    body.classList.remove("fx-fast", "fx-slow");
    body.classList.add(cls);
    later("speed", 15000, () => { window.gameSpeed = 1; body.classList.remove(cls); });
  };
  const wasted = () => {
    hp = 0; armor = 0; showHud(4200);
    const w = $("#sa-wasted");
    w.classList.remove("show");
    void w.offsetWidth;
    w.classList.add("show");
    setTimeout(() => {
      w.classList.remove("show");
      hp = 100; setMoney(cash - 100); // conta do hospital 🏥
      renderHud();
    }, 4200);
  };
  const stat = (text) => setTimeout(() => showToast(text), 1600);

  /* ---- Lista de cheats ----
     PS2: X ✕ · O ○ · S □ · T △ · U D L R direcional · L1 L2 R1 R2 */
  const CHEATS = [
    // Vida, dinheiro e armas
    { pc: "HESOYAM", ps2: "R1 R2 L1 X L D R U L D R U", cat: "vida", name: "Vida, colete e $250.000",
      fx() { hp = 100; armor = 100; setMoney(cash + 250000); showHud(5000); } },
    { pc: "BAGUVIX", ps2: "D X R L R R1 R D U T", cat: "vida", name: "Vida infinita",
      fx() { hp = 100; $(".sa-health").classList.add("infinite"); showHud(6000); } },
    { pc: "FULLCLIP", ps2: "L1 R1 S R1 L R2 R1 L S D L1 L1", cat: "armas", name: "Munição infinita",
      fx() { setWeapon("🔫", "∞"); pulse("fx-aim", 15000); } },
    { pc: "LXGIWYL", ps2: "R1 R2 L1 R2 L D R U L D R U", cat: "armas", name: "Armas: pacote 1 (Thug)",
      fx() { setWeapon("🔪", "9999"); pulse("fx-aim", 12000); } },
    { pc: "KJKSZPJ", ps2: "R1 R2 L1 R2 L D R U L D D L", cat: "armas", name: "Armas: pacote 2 (Profissional)",
      fx() { setWeapon("🔫", "9999"); pulse("fx-aim", 12000); } },
    { pc: "UZUMYMW", ps2: "R1 R2 L1 R2 L D R U L D D D", cat: "armas", name: "Armas: pacote 3 (Nutter)",
      fx() { setWeapon("💣", "9999"); pulse("fx-aim", 12000); } },
    { pc: "PROFESSIONALKILLER", ps2: "D S X L R1 R2 L D D L1 L1 L1", cat: "armas", name: "Nível Hitman em todas as armas",
      fx() { setWeapon("🎯", "HITMAN"); pulse("fx-aim", 12000); stat("Weapon skill +"); } },
    { pc: "OUIQDMW", ps2: "U U S L2 R X R1 D R2 O", cat: "armas", name: "Mirar dirigindo",
      fx() { pulse("fx-aim", 15000); } },

    // Polícia
    { pc: "AEZAKMI", ps2: "O R O R L S T U", cat: "polícia", name: "Nunca procurado", fx: clearWanted },
    { pc: "ASNAEB", ps2: "R1 R1 O R2 U D U D U D", cat: "polícia", name: "Limpar nível de procurado", fx: clearWanted },
    { pc: "OSRBLHH", ps2: "R1 R1 O R2 L R L R L R", cat: "polícia", name: "Aumentar procurado (+2 estrelas)",
      fx() { setWanted(wanted + 2); } },
    { pc: "BRINGITON", ps2: "O R O R L S X D", cat: "polícia", name: "Seis estrelas de procurado",
      fx() { setWanted(6); } },
    { pc: "STATEOFEMERGENCY", ps2: "L2 R L1 T R R R1 L1 R L1 L1 L1", cat: "polícia", name: "Caos na cidade",
      fx() { pulse("fx-chaos", 8000); setWanted(6); } },

    // Veículos
    { pc: "AIWPRTON", ps2: "O O L1 O O O L1 L2 R1 T O T", cat: "veículo", name: "Spawnar tanque Rhino",
      fx() { vehicle("Rhino", TANK); } },
    { pc: "JUMPJET", ps2: "T T S O X L1 L1 D U", cat: "veículo", name: "Spawnar jato Hydra",
      fx() { vehicle("Hydra", "✈️", { air: true, rot: 45 }); } },
    { pc: "OHDUDE", ps2: "O X L1 O O L1 O R1 R2 L2 L1 L1", cat: "veículo", name: "Spawnar helicóptero Hunter",
      fx() { vehicle("Hunter", "🚁", { air: true, flip: -1 }); } },
    { pc: "MONSTERMASH", ps2: "R U R1 R1 R1 D T T X O L1 L1", cat: "veículo", name: "Spawnar Monster Truck",
      fx() { vehicle("Monster", "🛻", { flip: -1 }); } },
    { pc: "ROCKETMAN", ps2: "L R L1 L2 R1 R2 U D L R", cat: "veículo", name: "Jetpack (volta ao topo)",
      fx() { rocket("fly"); setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 250); } },
    { pc: "AIYPWZQP", ps2: "L R L1 L2 R1 R2 R2 U D R L1", cat: "veículo", name: "Paraquedas (desce ao contato)",
      fx() { rocket("chute"); setTimeout(() => $("#contato").scrollIntoView({ behavior: "smooth" }), 400); } },

    // Trânsito
    { pc: "RIPAZHA", ps2: "S D L2 U L1 O U X L", cat: "trânsito", name: "Carros voadores",
      fx() { pulse("fx-fly", 12000); } },
    { pc: "AFSNMSMW", ps2: "R2 O U L1 R R1 R U S T", cat: "trânsito", name: "Barcos voadores",
      fx() { pulse("fx-fly", 12000); rain("🚤⛵", 12, "up"); } },
    { pc: "WHEELSONLYPLEASE", ps2: "T L1 T R2 S L1 L1", cat: "trânsito", name: "Carros invisíveis",
      fx() { pulse("fx-invisible", 10000); } },
    { pc: "CPKTNWT", ps2: "R2 L2 R1 L1 L2 R2 S T O T L2 L1", cat: "trânsito", name: "Explodir todos os carros",
      fx() { booms(12); } },
    { pc: "SPEEDFREAK", ps2: "L T R1 L1 U S T D O L2 L1 L1", cat: "trânsito", name: "Nitro em todos os carros",
      fx() { pulse("fx-nitro", 1400); window.scrollBy({ top: window.innerHeight, behavior: "smooth" }); } },
    { pc: "LLQPFBN", ps2: "O L1 D L2 L X R1 L1 R O", cat: "trânsito", name: "Trânsito rosa (tema rosa)",
      fx() { swap("t-", "t-pink"); } },
    { pc: "IOWDLAC", ps2: "O L2 U R1 L X R1 L1 L O", cat: "trânsito", name: "Trânsito preto (tema preto)",
      fx() { swap("t-", "t-black"); } },

    // Clima e tempo
    { pc: "AFZLLQLL", ps2: "R2 X L1 L1 L2 L2 L2 D", cat: "clima", name: "Tempo ensolarado",
      fx() { setWeather("sunny"); } },
    { pc: "MGHXYRM", ps2: "R2 X L1 L1 L2 L2 L2 O", cat: "clima", name: "Tempestade",
      fx() { setWeather("storm"); } },
    { pc: "CFVFGMJ", ps2: "R2 X L1 L1 L2 L2 L2 X", cat: "clima", name: "Neblina",
      fx() { setWeather("fog"); } },
    { pc: "XJVSNAJ", ps2: "S L1 R1 R X U L1 L L", cat: "clima", name: "Sempre meia-noite",
      fx() { setWeather("midnight"); } },
    { pc: "OFVIAC", ps2: "L L L2 R1 R S S L1 L2 X", cat: "clima", name: "Céu laranja (21h)",
      fx() { setWeather("orange"); } },
    { pc: "SPEEDITUP", ps2: "T U R D L2 L1 S", cat: "clima", name: "Jogo mais rápido",
      fx() { speed(3, "fx-fast"); } },
    { pc: "SLOWITDOWN", ps2: "T U R D S R2 R1", cat: "clima", name: "Jogo mais lento",
      fx() { speed(0.3, "fx-slow"); } },

    // CJ
    { pc: "BUFFMEUP", ps2: "T U U L R S O L", cat: "CJ", name: "Músculo máximo",
      fx() { swap("av-", "av-buff"); stat("Muscle +"); } },
    { pc: "BTCDBCB", ps2: "T U U L R S O D", cat: "CJ", name: "Gordura máxima",
      fx() { swap("av-", "av-fat"); rain("🍔🍟", 14); stat("Fat +"); } },
    { pc: "KVGYZQK", ps2: "T U U L R S O R", cat: "CJ", name: "Magro",
      fx() { swap("av-", "av-skinny"); stat("Fat -"); } },
    { pc: "WORSHIPME", ps2: "L1 R1 T D R2 X L1 U L2 L2 L1 L1", cat: "CJ", name: "Respeito máximo",
      fx() { rain("⭐👑", 18); stat("Respect +"); } },
    { pc: "HELLOLADIES", ps2: "O T T U O R1 L2 U T L1 L1 L1", cat: "CJ", name: "Sex appeal máximo",
      fx() { rain("💖💘💕", 28, "up"); stat("Sex appeal +"); } },
    { pc: "KANGAROO", ps2: "U U T T U U L R S R2 R2", cat: "CJ", name: "Super pulo",
      fx() { pulse("fx-jump", 1000); } },
    { pc: "STINGLIKEABEE", ps2: "U L X T R1 O O O L2", cat: "CJ", name: "Soco poderoso",
      fx() { pulse("fx-punch", 600); booms(1); } },
    { pc: "CVWKXAM", ps2: "D L L1 D D R2 D L2 D", cat: "CJ", name: "Oxigênio infinito",
      fx() { rain("🫧◯○", 30, "up"); } },
    { pc: "AEDUWNV", ps2: "S L2 R1 T U S L2 U X", cat: "CJ", name: "Nunca sentir fome",
      fx() { rain("🍗🍕🥤🍔", 24); } },
    { pc: "SZCMAWO", ps2: "R L2 D R1 L L R1 L1 L2 L1", cat: "CJ", name: "Suicídio (WASTED)", fx: wasted },

    // Diversão
    { pc: "CIKGCGX", ps2: "U U D D S O L1 R1 T D", cat: "festa", name: "Festa na praia",
      fx() { setWeather("sunny"); rain("🏖️🌴🍹☀️🩴", 36); } },
    { pc: "CRAZYTOWN", ps2: "T T L1 S S O S D O", cat: "festa", name: "Modo funhouse",
      fx() { pulse("fx-funhouse", 8000); } },
  ];

  const run = (c) => {
    showToast("Cheat activated");
    c.fx();
    unlock(`${c.pc}: ${c.name}`);
  };

  /* ---- PC: digitar o código em qualquer lugar (fora dos campos) ---- */
  let typed = "";
  const isField = (t) => t.closest?.("input, textarea, select");
  window.addEventListener("keydown", (e) => {
    if (isField(e.target) || e.key.length !== 1 || !/[a-z]/i.test(e.key)) return;
    typed = (typed + e.key.toUpperCase()).slice(-20);
    const hit = CHEATS.find((c) => typed.endsWith(c.pc));
    if (hit) { typed = ""; run(hit); }
  });

  /* ---- PS2: combo no controle ou no teclado ---- */
  let pad = [];
  const padInput = (token) => {
    pad = [...pad, token].slice(-16);
    const seq = " " + pad.join(" ");
    const hit = CHEATS.find((c) => seq.endsWith(" " + c.ps2));
    if (hit) { pad = []; run(hit); }
  };
  const KEY_TO_PAD = {
    ArrowUp: "U", ArrowDown: "D", ArrowLeft: "L", ArrowRight: "R",
    o: "O", q: "S", t: "T", x: "X", 1: "L1", 2: "L2", 3: "R1", 4: "R2",
  };
  window.addEventListener("keydown", (e) => {
    if (isField(e.target)) return;
    const token = KEY_TO_PAD[e.key.length === 1 ? e.key.toLowerCase() : e.key];
    if (token) padInput(token);
  });

  // Controle: mapeamento padrão do navegador
  const BTN_TO_PAD = { 0: "X", 1: "O", 2: "S", 3: "T", 4: "L1", 5: "R1", 6: "L2", 7: "R2", 12: "U", 13: "D", 14: "L", 15: "R" };
  let polling = false;
  const prev = {};
  const poll = () => {
    const pads = [...(navigator.getGamepads?.() || [])].filter(Boolean);
    if (!pads.length) { polling = false; return; }
    pads.forEach((gp) => {
      for (const [i, token] of Object.entries(BTN_TO_PAD)) {
        const down = !!gp.buttons[i]?.pressed;
        const key = gp.index + ":" + i;
        if (down && !prev[key]) padInput(token);
        prev[key] = down;
      }
    });
    requestAnimationFrame(poll);
  };
  window.addEventListener("gamepadconnected", () => {
    if (!polling) { polling = true; requestAnimationFrame(poll); }
  });

  /* ---- Lista (modal) ---- */
  const modal = $("#sa-modal");
  const list = $("#sa-list");
  const search = $("#sa-search");
  const PS_ICON = { X: ["✕", "x"], O: ["○", "o"], S: ["□", "s"], T: ["△", "t"], U: ["↑", ""], D: ["↓", ""], L: ["←", ""], R: ["→", ""] };
  CHEATS.forEach((c) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    const buttons = c.ps2.split(" ").map((t) => {
      const [sym, cls] = PS_ICON[t] || [t, ""];
      return `<span class="ps ${cls} ${PS_ICON[t] ? "" : "sh"}">${sym}</span>`;
    }).join("");
    btn.innerHTML = `<span class="c-name"><span class="c-cat">${c.cat}</span>${c.name}</span><span class="c-pc">${c.pc}</span><span class="c-ps2">${buttons}</span>`;
    btn.addEventListener("click", () => { closeModal(); setTimeout(() => run(c), 200); });
    li.dataset.search = `${c.pc} ${c.name} ${c.cat}`.toLowerCase();
    li.append(btn);
    list.append(li);
  });
  search.addEventListener("input", () => {
    const q = search.value.trim().toLowerCase();
    $$("li", list).forEach((li) => { li.hidden = q && !li.dataset.search.includes(q); });
  });
  let lastFocus;
  const openModal = () => {
    lastFocus = document.activeElement;
    modal.hidden = false;
    body.style.overflow = "hidden";
    search.value = ""; search.dispatchEvent(new Event("input"));
    setTimeout(() => search.focus({ preventScroll: true }), 50);
  };
  function closeModal() {
    modal.hidden = true;
    body.style.overflow = "";
    lastFocus?.focus?.({ preventScroll: true });
  }
  $("#open-cheats").addEventListener("click", openModal);
  $("#sa-close").addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  window.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) closeModal(); });

  // Celular: 5 toques rápidos no logo = HESOYAM
  let taps = 0, tapTimer;
  $(".logo").addEventListener("click", () => {
    taps++;
    clearTimeout(tapTimer);
    tapTimer = setTimeout(() => (taps = 0), 1500);
    if (taps >= 5) { taps = 0; run(CHEATS[0]); }
  });
})();

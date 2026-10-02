/* =========================================================
   OS-App — página do projeto (sandieh.online/os-app/)
   ========================================================= */
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

$("#year").textContent = new Date().getFullYear();

/* ---------- Reveal on scroll ---------- */
(function reveals() {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
    }),
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  $$(".reveal").forEach((el) => io.observe(el));
})();

/* ---------- Nav, barra de progresso e menu mobile ---------- */
(function nav() {
  const navEl = $(".nav");
  const progress = $(".scroll-progress span");
  let ticking = false;
  const update = () => {
    ticking = false;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    navEl.classList.toggle("scrolled", window.scrollY > 40);
  };
  window.addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  update();

  const btn = $("#menu-toggle");
  const links = $("#nav-links");
  const toggle = (open) => { links.classList.toggle("open", open); btn.setAttribute("aria-expanded", open); };
  btn.addEventListener("click", () => toggle(!links.classList.contains("open")));
  $$("a", links).forEach((a) => a.addEventListener("click", () => toggle(false)));
})();

/* ---------- Downloads ---------- */
(function downloads() {
  // Destaca o download certo para o sistema de quem está visitando
  const ua = navigator.userAgent;
  const os = /Android/i.test(ua) ? "android"
    : /Windows/i.test(ua) ? "windows"
    : /Linux|X11/i.test(ua) && !/CrOS/i.test(ua) ? "linux"
    : null;
  if (os) $(`.dl[data-os="${os}"]`)?.classList.add("recommended");

  // Tamanho e data da última versão direto da release do GitHub
  fetch("https://api.github.com/repos/SandiehMoreira/os-app/releases/tags/latest")
    .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
    .then((rel) => {
      rel.assets.forEach((a) => {
        const el = $(`[data-size="${a.name}"]`);
        if (el) el.textContent = Math.round(a.size / 1048576) + " MB";
      });
      // A release "latest" é atualizada no lugar (não recriada), então a data que vale
      // é a do instalador mais recente, e não a de publicação da release.
      const updated = rel.assets.reduce((max, a) => (a.updated_at > max ? a.updated_at : max), rel.published_at);
      const date = new Date(updated).toLocaleDateString("pt-BR");
      $("#app-version").textContent = `Última versão: ${date} · atualiza sozinha`;
    })
    .catch(() => {});
})();

/* ---------- Tour (telas reais) ----------
   Passa sozinho o tempo todo (inclusive com o mouse em cima).
   Clicar numa etapa mostra ela e a contagem continua a partir dali. */
(function tour() {
  const root = $("#tour");
  if (!root) return;
  const shots = $$(".tour-shot", root);
  const steps = $$(".tour-step", root);
  const caption = $("#tour-caption");
  const count = $("#tour-count");
  const playBtn = $("#tour-play");
  const DURATION = 4500;
  root.style.setProperty("--tour-ms", DURATION + "ms");
  let index = 0, timer = null, visible = false;
  let playing = !reduceMotion;

  const show = (i) => {
    index = (i + shots.length) % shots.length;
    shots.forEach((img, k) => img.classList.toggle("is-active", k === index));
    steps.forEach((st, k) => {
      st.classList.remove("is-active");
      st.setAttribute("aria-current", k === index ? "step" : "false");
    });
    void root.offsetWidth; // reinicia a barrinha de progresso
    steps[index].classList.add("is-active");
    const strong = document.createElement("b");
    strong.textContent = $("b", steps[index]).textContent;
    caption.replaceChildren(strong, $("small", steps[index]).textContent);
    count.textContent = `${String(index + 1).padStart(2, "0")} / ${String(shots.length).padStart(2, "0")}`;
    const next = shots[(index + 1) % shots.length]; // pré-carrega a próxima tela
    if (next.loading === "lazy") next.loading = "eager";
    schedule();
  };

  const schedule = () => {
    clearTimeout(timer);
    const running = playing && visible;
    root.classList.toggle("paused", !running);
    if (running) timer = setTimeout(() => show(index + 1), DURATION);
  };

  const setPlaying = (on) => {
    playing = on;
    playBtn.textContent = on ? "❚❚" : "▶";
    playBtn.setAttribute("aria-label", on ? "Pausar apresentação" : "Continuar apresentação");
    if (on) show(index); else schedule();
  };

  steps.forEach((st) => st.addEventListener("click", () => show(Number(st.dataset.i))));
  $("#tour-prev").addEventListener("click", () => show(index - 1));
  $("#tour-next").addEventListener("click", () => show(index + 1));
  playBtn.addEventListener("click", () => setPlaying(!playing));
  if (!playing) setPlaying(false);

  // Deslizar o dedo na tela do celular
  let startX = null;
  const screen = $(".phone-screen", root);
  screen.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; }, { passive: true });
  screen.addEventListener("touchend", (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) show(index + (dx < 0 ? 1 : -1));
    startX = null;
  });

  // Só roda sozinho quando a apresentação está na tela
  new IntersectionObserver((entries) => {
    const was = visible;
    visible = entries[0].isIntersecting;
    if (visible && !was) show(index); else schedule();
  }, { threshold: 0.35 }).observe(root);
})();

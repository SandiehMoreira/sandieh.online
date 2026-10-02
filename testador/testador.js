/* =========================================================
   Testador Mobile — página de download (sandieh.online/testador/)
   ========================================================= */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

$("#year").textContent = new Date().getFullYear();

/* ---------- Reveal on scroll ---------- */
(function reveals() {
  if (!("IntersectionObserver" in window)) { $$(".reveal").forEach((el) => el.classList.add("visible")); return; }
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

  // "Ajuda para instalar" abre o passo a passo.
  $("#btn-instalar").addEventListener("click", () => { $("#instalar").open = true; });
})();

/* ---------- Destaca a marca do celular de quem visita ---------- */
function brandFromModel(text) {
  const t = (text || "").toLowerCase();
  if (/iphone|ipad/.test(t)) return "iphone";
  if (/\bsm-[a-z]\d|samsung|galaxy/.test(t)) return "samsung";
  if (/moto|motorola|\bxt\d{4}/.test(t)) return "motorola";
  if (/redmi|poco|xiaomi|\bmi \d|\b2\d{3}[0-9a-z]{4,6}\b/.test(t)) return "xiaomi";
  return null;
}

(async function recommend() {
  let brand = brandFromModel(navigator.userAgent);
  // Chrome no Android esconde o modelo no user agent; pede direto ao navegador.
  if (!brand && navigator.userAgentData?.getHighEntropyValues) {
    try {
      const { model } = await navigator.userAgentData.getHighEntropyValues(["model"]);
      brand = brandFromModel(model);
    } catch (_) { /* sem a informação, nenhum destaque */ }
  }
  if (!brand) return;
  const el = $(`.dl[data-brand="${brand}"]`);
  if (el) {
    el.classList.add("recommended");
    $("#app-version").textContent = "Destacamos o app do seu celular ↓";
  }
})();

/* ---------- Tamanho e SHA-256 dos APKs (gerados pelo scripts/gerar-apks.sh) ---------- */
fetch("apks.json", { cache: "no-store" })
  .then((r) => (r.ok ? r.json() : Promise.reject()))
  .then((apks) => {
    const list = $("#sha-list");
    list.innerHTML = "";
    Object.entries(apks).forEach(([name, info]) => {
      const size = $(`[data-size="${name}"]`);
      if (size) size.textContent = `${String(info.mb).replace(".", ",")} MB`;
      const li = document.createElement("li");
      li.innerHTML = `<b>${name}</b><br><span class="sha">${info.sha256}</span>`;
      list.appendChild(li);
    });
  })
  .catch(() => { $("#sha-list").innerHTML = '<li class="sha">Veja o arquivo SHA256SUMS.txt nesta pasta.</li>'; });

/* ============================================================
   BrindleWood site settings. Change things here once and every
   page updates. Everything else is plain text in the .html files.
   ============================================================ */
const BW = {
  name: "BrindleWood",
  javaIp: "rpg.brindlewood.net",
  bedrockIp: "rpg.brindlewood.net",
  bedrockPort: "19132",              // TODO: confirm your Bedrock port
  discord: "https://discord.gg/aCjzjkNV7F",
  store: "https://brindlewood.tebex.io",
  tagline: "A Kingdoms RPG survival adventure. Four kingdoms. One world. Your story."
};

/* ---------- Header and footer (shared on every page) ---------- */
(function () {
  const page = location.pathname.split("/").pop() || "index.html";
  const links = [
    ["index.html", "Home"],
    ["play.html", "How to Play"],
    ["kingdoms.html", "Kingdoms"],
    ["rules.html", "Rules"],
    ["store.html", "Store"]
  ];
  const nav = links.map(([href, label]) =>
    `<a href="${href}" class="${page === href ? "active" : ""}">${label}</a>`).join("") +
    `<a href="${BW.discord}" class="nav-cta" target="_blank" rel="noopener">Join Discord</a>`;

  const header = document.getElementById("site-header");
  if (header) header.outerHTML = `
    <header class="site-header"><div class="wrap">
      <a class="brand" href="index.html"><img src="assets/logo.png" alt="BrindleWood logo">${BW.name}</a>
      <button class="menu-btn" aria-label="Menu" id="menuBtn">&#9776;</button>
      <nav class="nav" id="nav">${nav}</nav>
    </div></header>`;

  const footer = document.getElementById("site-footer");
  if (footer) footer.outerHTML = `
    <footer class="site-footer"><div class="wrap">
      <img src="assets/logo.png" alt="">
      <div class="footer-links">
        <a href="${BW.discord}" target="_blank" rel="noopener">Discord</a>
        <a href="${BW.store}" target="_blank" rel="noopener">Store</a>
        <a href="rules.html">Rules</a>
        <a href="play.html">How to Play</a>
      </div>
      <div>&copy; ${new Date().getFullYear()} ${BW.name}. Not affiliated with Mojang or Microsoft.</div>
    </div></footer>`;

  const btn = document.getElementById("menuBtn");
  if (btn) btn.addEventListener("click", () => document.getElementById("nav").classList.toggle("open"));
})();

/* ---------- Fill in any [data-bw="..."] text from the settings above ---------- */
document.querySelectorAll("[data-bw]").forEach(el => { el.textContent = BW[el.dataset.bw] ?? ""; });
document.querySelectorAll("[data-bw-href]").forEach(el => { el.href = BW[el.dataset.bwHref] ?? "#"; });

/* ---------- Copy-IP buttons ---------- */
function toast(msg) {
  let t = document.querySelector(".toast");
  if (!t) { t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); }
  t.textContent = msg; t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 1800);
}
document.querySelectorAll("[data-copy]").forEach(btn => {
  btn.addEventListener("click", async () => {
    const text = BW[btn.dataset.copy];
    try { await navigator.clipboard.writeText(text); toast("Copied " + text); }
    catch (e) { toast("Copy failed. Please copy it manually."); }
  });
});

/* ---------- Live server status (free mcstatus.io API; fails quietly) ---------- */
const statusEl = document.getElementById("server-status");
if (statusEl) {
  fetch(`https://api.mcstatus.io/v2/status/java/${BW.javaIp}`)
    .then(r => r.json())
    .then(d => {
      const dot = statusEl.querySelector(".dot");
      const txt = statusEl.querySelector(".status-text");
      if (d.online) {
        dot.classList.add("on");
        txt.textContent = `Online: ${d.players.online} player${d.players.online === 1 ? "" : "s"} adventuring`;
      } else {
        dot.classList.add("off");
        txt.textContent = "Server is currently offline";
      }
    })
    .catch(() => { statusEl.style.display = "none"; });
}

/* Stand IAgora · Fabriquer ses outils numériques avec l'IA
   Les usages et leurs démos : pour ajouter une démo, ajoute une entrée dans `demos`. */
const USAGES = [
  {
    titre: "Créer mon site web",
    texte: "Le site de son activité, de son asso, d'un lieu… avec une mise en page sur mesure, sans passer par un modèle tout fait.",
    demos: [
      { id: "amuseurs", nom: "amuseurs.fr", url: "https://www.amuseurs.fr/", img: "amuseurs",
        notes: ["Le site d'une activité de formation et d'événementiel.", "Sorti de Notion et reconstruit sur mesure (Next.js + Sanity pour modifier facilement les contenus)."] },
      { id: "grainetiere", nom: "Abbaye de la Grainetière", url: "https://www.abbayedelagrainetiere.fr/", img: "grainetiere",
        notes: ["Le site d'une abbaye, monument historique classé en Vendée.", "Montrer les rubriques : vie monastique, histoire, photos, projet 2030, infos pratiques."] }
    ]
  },
  {
    titre: "Créer ses outils de travail",
    texte: "Une appli pour son asso ou son entreprise, taillée pour ses propres besoins plutôt qu'un logiciel générique.",
    demos: [
      { id: "eat", nom: "Eat PFP", url: "https://eat-pfp.vercel.app/", img: "eat",
        notes: ["L'appli au service des bénévoles d'une association.", "Connexion par lien envoyé par e-mail : on entre dans la zone « exigeante » (données, comptes utilisateurs).", "Astuce : se connecter avant le passage des visiteurs pour montrer l'intérieur de l'appli."] }
    ]
  },
  {
    titre: "Créer des jeux",
    texte: "Jeux de cartes, quiz, jeux d'atelier… pour apprendre, animer un groupe ou juste s'amuser.",
    demos: [
      { id: "ideotron", nom: "Idéotron", url: "https://ideotron.lovable.app/", img: "ideotron",
        notes: ["Un jeu de cartes pour atelier de vibecoding, fait avec Lovable.", "Tirer 3 cartes : un ODD, une approche, une cible.", "Le jeu génère un pitch et un prompt prêt à coller dans Lovable : idéal pour lancer le visiteur."] }
    ]
  },
  {
    titre: "Créer des présentations",
    texte: "Des supports vivants, consultables sur le web, imprimables en PDF, qui ressemblent à son identité.",
    demos: [
      { id: "sgia", nom: "Ressources IA · Nantes Digital Week", url: "https://sgia26.vercel.app/", img: "sgia",
        notes: ["Un mini-site qui rassemble les supports de conférences et d'atelier d'un événement.", "Chaque support se consulte en ligne ou s'enregistre en PDF.", "Les slides « Comprendre » plus bas sur cette page viennent de là."] },
      { id: "carnet", nom: "Carnet de défis IA", url: "https://amuseursportolio.vercel.app/projets/carnet-defis-amuseurs/", img: "carnet",
        notes: ["Plus de 50 défis pour apprivoiser l'IA en s'amusant, sur 3 niveaux.", "Un livret pensé pour le web et pour l'impression."] }
    ]
  },
  {
    titre: "Créer des cartes interactives",
    texte: "Raconter un territoire, un événement ou un lieu sur une carte qu'on explore, en 2D comme en 3D.",
    demos: [
      { id: "carte24h", nom: "Carte des 24 Heures du Mans", url: "https://carte24h.vercel.app/", img: "carte24h",
        notes: ["Le circuit de la Sarthe et les grands événements des 24 Heures du Mans.", "Filtres par catégorie, frise chronologique, vue satellite et vue 3D.", "Plus de 100 événements à explorer, de la frise à la carte."] },
      { id: "grainetiere3d", nom: "L'abbaye de la Grainetière en 3D", url: "https://grainetiere3d.vercel.app/", img: "grainetiere3d",
        notes: ["Visite guidée ou libre de l'abbaye dans 2 milliards de points, issus d'un relevé au scanner laser.", "Le tout tourne dans un simple navigateur.", "Lancer la visite guidée : effet garanti. Prévoir un ordinateur récent."] }
    ]
  },
  {
    titre: "Modéliser en 3D ses travaux",
    texte: "Visualiser un aménagement avant de prendre la scie : surfaces, hauteurs, scénarios à comparer.",
    demos: [
      { id: "grenier", nom: "Aménager un grenier", url: "https://grenier11r.vercel.app/", img: "grenier",
        notes: ["La maquette 3D d'un grenier à aménager, recalée sur un scan LiDAR.", "Comparer plusieurs scénarios d'aménagement (lit, salle d'eau, douche…).", "Le panneau de droite calcule surfaces, hauteurs sous plafond et surfaces habitables."] }
    ]
  },
  {
    titre: "Ressusciter ses vieux outils",
    texte: "Redonner vie à un vieil appareil ou un logiciel que plus aucun ordinateur ne sait lire.",
    demos: [
      { id: "mp3", nom: "Le lecteur MP3 de mes 15 ans", url: "demos/mp3.html", img: null,
        notes: ["Un baladeur MP3 de 2003 que plus aucun ordinateur ne reconnaissait.", "Avec l'IA : décortiquer l'ancien pilote Mac OS 9, puis réécrire un petit outil pour un Mac récent.", "L'article LinkedIn et le code s'ouvrent dans un nouvel onglet."] }
    ]
  }
];

/* Outils pour se lancer (carte « À vous de jouer ») */
const OUTILS = [
  { nom: "Claude", url: "https://claude.ai/" },
  { nom: "Gemini Canvas", url: "https://gemini.google.com/" },
  { nom: "Lovable", url: "https://lovable.dev/" }
];

const ALL = [];
USAGES.forEach((u, i) => u.demos.forEach(d => ALL.push({ ...d, usage: u.titre, n: i + 1 })));
const byId = id => ALL.find(d => d.id === id);
const pad = n => String(n).padStart(2, "0");
const host = url => url.startsWith("http") ? url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "") : "démo locale";
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* ---------- Cartes d'usage ---------- */
function vignette(d) {
  if (d.img) return `<img src="assets/demos/${d.img}.webp" width="800" height="500" alt="" loading="lazy">`;
  return `<span class="vignette-mp3" aria-hidden="true"><b>MP3</b><small>2003 → 2026</small></span>`;
}

function renderUsages() {
  const html = USAGES.map((u, i) => {
    const pile = u.demos.slice(0, 2);
    return `
    <article class="usage">
      <button class="pile${pile.length > 1 ? " double" : ""}" type="button" data-demo="${pile[0].id}" aria-label="Ouvrir la démo : ${esc(pile[0].nom)}">
        ${pile.slice().reverse().map(d => `<span class="ecran">${vignette(d)}</span>`).join("")}
        <span class="play" aria-hidden="true">▶</span>
      </button>
      <div class="num">Usage <b>${pad(i + 1)}</b></div>
      <h2>${esc(u.titre)}</h2>
      <p>${esc(u.texte)}</p>
      <ul class="demo-list">
        ${u.demos.map(d => `
          <li><button class="demo-btn" type="button" data-demo="${d.id}">
            <span class="demo-nom">${esc(d.nom)}</span><span class="demo-go">Voir ➭</span>
          </button><span class="url">${esc(host(d.url))}</span></li>`).join("")}
      </ul>
    </article>`;
  }).join("") + `
    <article class="usage extra">
      <div class="num">À vous <b>✎</b></div>
      <h2>À vous de jouer&nbsp;!</h2>
      <p>Pas d'idée&nbsp;? Tirez 3 cartes et repartez avec un pitch et un prompt prêt à coller.</p>
      <ul class="demo-list">
        <li><button class="demo-btn pink" type="button" data-demo="ideotron"><span class="demo-nom">🎲 Tirer une idée</span><span class="demo-go">➭</span></button></li>
      </ul>
      <p class="extra-label">Pour démarrer gratuitement</p>
      <div class="outils">${OUTILS.map(o => `<a class="chip" href="${o.url}" target="_blank" rel="noopener">${o.nom} ↗</a>`).join("")}</div>
    </article>`;
  document.getElementById("usages").innerHTML = html;
}

/* ---------- Modale plein écran ---------- */
const viewer = document.getElementById("viewer");
const frame = document.getElementById("viewer-frame");
const notesBox = document.getElementById("viewer-notes");
const notesBtn = document.getElementById("viewer-notes-btn");
let current = -1;

function show(idx) {
  current = (idx + ALL.length) % ALL.length;
  const d = ALL[current];
  document.getElementById("viewer-usage").textContent = `Usage ${pad(d.n)} · ${d.usage}`;
  document.getElementById("viewer-title").textContent = d.nom;
  document.getElementById("viewer-open").href = d.url;
  document.getElementById("viewer-url").textContent = host(d.url);
  document.getElementById("viewer-notes-list").innerHTML = d.notes.map(n => `<li>${esc(n)}</li>`).join("");
  viewer.classList.remove("loaded");
  frame.src = d.url;
  history.replaceState(null, "", "#" + d.id);
}

function openDemo(id) {
  const idx = ALL.findIndex(d => d.id === id);
  if (idx < 0) return;
  if (!viewer.open) {
    viewer.showModal();
    document.documentElement.classList.add("modal-open");
  }
  show(idx);
}

function closeDemo() {
  if (viewer.open) viewer.close();
}

viewer.addEventListener("close", () => {
  frame.src = "about:blank"; /* coupe le son, la 3D, etc. */
  document.documentElement.classList.remove("modal-open");
  history.replaceState(null, "", location.pathname + location.search);
});
frame.addEventListener("load", () => viewer.classList.add("loaded"));
document.getElementById("viewer-close").addEventListener("click", closeDemo);
document.getElementById("viewer-prev").addEventListener("click", () => show(current - 1));
document.getElementById("viewer-next").addEventListener("click", () => show(current + 1));
notesBtn.addEventListener("click", () => {
  const open = notesBox.hidden;
  notesBox.hidden = !open;
  notesBtn.setAttribute("aria-expanded", String(open));
});
viewer.addEventListener("keydown", e => {
  if (e.target.closest("iframe")) return;
  if (e.key === "ArrowLeft") show(current - 1);
  if (e.key === "ArrowRight") show(current + 1);
});

document.addEventListener("click", e => {
  const b = e.target.closest("[data-demo]");
  if (b) openDemo(b.dataset.demo);
});

/* ---------- Diaporama ---------- */
const deck = document.getElementById("deck");
const slides = [...deck.querySelectorAll(".slide")];
const chips = document.getElementById("deck-chips");
let slide = 0;

chips.innerHTML = slides.map((s, i) =>
  `<li><button type="button" data-slide="${i}">${pad(i + 1)} · ${esc(s.dataset.title)}</button></li>`).join("");

function go(i) {
  slide = Math.max(0, Math.min(slides.length - 1, i));
  slides.forEach((s, k) => s.classList.toggle("active", k === slide));
  chips.querySelectorAll("button").forEach((b, k) => b.setAttribute("aria-current", k === slide ? "true" : "false"));
  document.getElementById("deck-count").textContent = `${slide + 1} / ${slides.length}`;
}
chips.addEventListener("click", e => { const b = e.target.closest("[data-slide]"); if (b) go(+b.dataset.slide); });
document.getElementById("deck-prev").addEventListener("click", () => go(slide - 1));
document.getElementById("deck-next").addEventListener("click", () => go(slide + 1));

function toggleFs() {
  if (document.fullscreenElement) document.exitFullscreen();
  else if (deck.requestFullscreen) deck.requestFullscreen();
  else deck.classList.toggle("pseudo-fs");
}
document.getElementById("deck-fs").addEventListener("click", toggleFs);
document.getElementById("deck-exit").addEventListener("click", () => {
  if (document.fullscreenElement) document.exitFullscreen(); else deck.classList.remove("pseudo-fs");
});
deck.querySelector(".deck-stage").addEventListener("click", e => {
  if (!document.fullscreenElement && !deck.classList.contains("pseudo-fs")) return;
  const r = e.currentTarget.getBoundingClientRect();
  go(slide + (e.clientX - r.left > r.width / 3 ? 1 : -1));
});
document.addEventListener("keydown", e => {
  if (viewer.open) return;
  const inDeck = document.fullscreenElement === deck || deck.classList.contains("pseudo-fs") || deck.contains(document.activeElement);
  if (!inDeck) return;
  if (["ArrowRight", "PageDown", " "].includes(e.key)) { e.preventDefault(); go(slide + 1); }
  if (["ArrowLeft", "PageUp"].includes(e.key)) { e.preventDefault(); go(slide - 1); }
  if (e.key === "Escape") deck.classList.remove("pseudo-fs");
});

/* ---------- Démarrage ---------- */
renderUsages();
go(0);
const fromHash = location.hash.slice(1);
if (fromHash && byId(fromHash)) openDemo(fromHash);

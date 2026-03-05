// --- LOGIQUE DE L'HORLOGE ---
const hands = document.querySelectorAll(".hand");
let isDragging = false;
let currentHand = null;

hands.forEach((hand) => {
  hand.addEventListener("mousedown", (e) => {
    isDragging = true;
    currentHand = hand;
  });
});

window.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const clock = document.getElementById("clock").getBoundingClientRect();
  const centerX = clock.left + clock.width / 2;
  const centerY = clock.top + clock.height / 2;
  const angle =
    (Math.atan2(e.clientY - centerY, e.clientX - centerX) * 180) / Math.PI + 90;
  currentHand.style.transform = `rotate(${angle}deg)`;
  updateTimeDisplay();
});

window.addEventListener("mouseup", () => (isDragging = false));

function updateTimeDisplay() {
  // Calcul inverse de l'angle pour obtenir l'heure (simplifié)
  const hAngle = getRotation(document.getElementById("hand-hour"));
  const mAngle = getRotation(document.getElementById("hand-min"));
  const h = Math.floor(((hAngle + 360) % 360) / 30);
  const m = Math.floor(((mAngle + 360) % 360) / 6);
  document.getElementById("time-val").innerText =
    `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

function getRotation(el) {
  const st = window.getComputedStyle(el, null);
  const tr = st.getPropertyValue("transform");
  if (tr === "none") return 0;
  const values = tr.split("(")[1].split(")")[0].split(",");
  return Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI));
}

// --- LOGIQUE CALENDRIER ---
function createStack(id, start, end) {
  const container = document.querySelector(`#${id} .paper-stack`);
  const range =
    start > end
      ? Array.from({ length: start - end + 1 }, (_, i) => start - i)
      : Array.from({ length: end - start + 1 }, (_, i) => start + i);

  range.forEach((val) => {
    const page = document.createElement("div");
    page.className = "page";
    page.innerText = val;
    container.appendChild(page);
  });

  container.addEventListener("mousedown", () => {
    const pages = container.querySelectorAll(".page:not(.torn)");
    if (pages.length > 1) {
      pages[pages.length - 1].classList.add("torn");
    }
  });
}

// Initialisation des piles
createStack("cal-day", 31, 1); // Jours de 31 à 1
createStack("cal-month", 12, 1); // Mois de 12 à 1
createStack("cal-year", 2026, 2010); // Années de 2026 à 2010

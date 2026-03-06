const canvas = document.getElementById("sig-canvas");
const ctx = canvas.getContext("2d");
let writing = false;

const downloadButton = document.querySelector(".download-btn")
const sigantureNextButton = document.querySelector(".signatureNextButton")
const signatureCurrentSection = document.querySelector(".signature-container")

// Paramètres du réservoir d'encre
let inkLevel = 100; // Capacité max par trait
const inkConsumption = 0.5; // Vitesse d'épuisement
const inkLevelDisplay = document.getElementById("ink-level");

ctx.lineJoin = "round";
ctx.lineCap = "round";

function startPosition(e) {
  writing = true;
  // On simule le fait de secouer/recharger le stylo en cliquant
  inkLevel = 100;
  draw(e);
}

function finishedPosition() {
  writing = false;
  ctx.beginPath();
}

function draw(e) {
  if (!writing) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // --- CALCUL DE LA DÉGRADATION DE L'ENCRE ---

  // 1. L'opacité diminue avec le niveau d'encre (de 1.0 à 0)
  let opacity = inkLevel / 100;

  // 2. On ajoute un "bruit" aléatoire pour l'effet stylo qui gratte
  // Plus l'encre est basse, plus le stylo a de chances de rater le papier
  let skipChance = (100 - inkLevel) / 100;
  if (Math.random() < skipChance * 0.5) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    // On consomme quand même un peu de patience
    inkLevel = Math.max(0, inkLevel - inkConsumption);
    return;
  }

  // 3. Configuration dynamique du tracé
  ctx.strokeStyle = `rgba(0, 10, 18, ${opacity})`;
  ctx.lineWidth = Math.max(0.2, (inkLevel / 100) * 1.5);

  // Dessin
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);

  // 4. Consommation de l'encre
  inkLevel = Math.max(0, inkLevel - inkConsumption);
}

// Event Listeners
canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", finishedPosition);
canvas.addEventListener("mousemove", draw);

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  inkLevel = 0;
}

sigantureNextButton.addEventListener("click", () => {
  downloadButton.classList.remove("inactive")
  signatureCurrentSection.classList.add("closed")

  console.log("click")
})

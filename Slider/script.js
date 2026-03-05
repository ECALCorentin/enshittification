const rail = document.getElementById("slider-rail");
const ball = document.getElementById("ball");
const valueDisplay = document.getElementById("value-display");

let angle = 0;
let ballPos = 50; // Pourcentage (0 à 100)
let ballVelocity = 0;
let isGrabbing = false;

// --- GESTION DE LA ROTATION ---
window.addEventListener("mousedown", (e) => {
  if (e.target === rail) isGrabbing = true;
});
window.addEventListener("mouseup", () => {
  isGrabbing = false;
});

window.addEventListener("mousemove", (e) => {
  if (!isGrabbing) return;

  const rect = rail.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // Calcul de l'angle entre la souris et le centre du pivot
  const deltaX = e.clientX - centerX;
  const deltaY = e.clientY - centerY;
  angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

  rail.style.transform = `rotate(${angle}deg)`;
});

// --- MOTEUR DE PHYSIQUE (GRAVITÉ) ---
function updatePhysics() {
  // La gravité dépend du sinus de l'angle
  // Si angle = 0, pas de mouvement. Si angle > 0 (penche à droite), force positive.
  const gravityForce = Math.sin((angle * Math.PI) / 180) * 0.15;

  ballVelocity += gravityForce;
  ballVelocity *= 0.95; // Friction pour éviter que ça devienne incontrôlable
  ballPos += ballVelocity;

  // Limites du rail
  if (ballPos < 2) {
    ballPos = 2;
    ballVelocity *= -0.5;
  } // Rebond léger
  if (ballPos > 98) {
    ballPos = 98;
    ballVelocity *= -0.5;
  }

  // Mise à jour visuelle
  ball.style.left = `${ballPos}%`;
  valueDisplay.innerText = Math.round(ballPos);

  requestAnimationFrame(updatePhysics);
}

updatePhysics();

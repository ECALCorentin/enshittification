const grid = document.getElementById("puzzle-grid");
const verifyBtn = document.getElementById("verify-btn");

// L'ordre correct (de 0 à 8)
const correctOrder = [0, 1, 2, 3, 4, 5, 6, 7, 8];
// Mélange initial
let currentOrder = [...correctOrder].sort(() => Math.random() - 0.5);

let draggedIdx = null;

function initPuzzle() {
  grid.innerHTML = "";

  currentOrder.forEach((posValue, i) => {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.draggable = true;
    tile.dataset.index = i; // Position dans la grille

    // Calcul du morceau d'image à afficher
    const row = Math.floor(posValue / 3);
    const col = posValue % 3;
    tile.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;

    // --- Drag Events ---
    tile.addEventListener("dragstart", function () {
      draggedIdx = i;
      setTimeout(() => this.classList.add("dragging"), 0);
    });

    tile.addEventListener("dragend", function () {
      this.classList.remove("dragging");
      document
        .querySelectorAll(".tile")
        .forEach((t) => t.classList.remove("drag-over"));
    });

    tile.addEventListener("dragover", (e) => e.preventDefault());

    tile.addEventListener("dragenter", function () {
      if (i !== draggedIdx) this.classList.add("drag-over");
    });

    tile.addEventListener("dragleave", function () {
      this.classList.remove("drag-over");
    });

    tile.addEventListener("drop", function () {
      handleSwap(draggedIdx, i);
    });

    grid.appendChild(tile);
  });
}

function handleSwap(fromIdx, toIdx) {
  if (fromIdx === toIdx) return;

  // Animation de transition "artisanale"
  const tiles = document.querySelectorAll(".tile");
  tiles[toIdx].style.transform = "scale(0.8)";

  setTimeout(() => {
    // Interversion des valeurs dans le tableau
    const temp = currentOrder[fromIdx];
    currentOrder[fromIdx] = currentOrder[toIdx];
    currentOrder[toIdx] = temp;

    initPuzzle();
    checkResult();
  }, 150);
}

function checkResult() {
  const isCorrect = currentOrder.every((val, i) => val === correctOrder[i]);

  if (isCorrect) {
    verifyBtn.disabled = false;
    verifyBtn.classList.add("ready");
    verifyBtn.innerText = "Vérification réussie";
    verifyBtn.style.background = "var(--success)";
  } else {
    verifyBtn.disabled = true;
    verifyBtn.classList.remove("ready");
    verifyBtn.innerText = "Vérifier";
  }
}

// Lancement
initPuzzle();

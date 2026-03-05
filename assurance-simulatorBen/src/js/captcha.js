const grid = document.getElementById("puzzle-grid");
const verifyBtn = document.getElementById("verify-btn");

// L'ordre correct (correspond aux noms de vos fichiers 0.jpg à 8.jpg)
const correctOrder = [0, 1, 2, 3, 4, 5, 6, 7, 8];
// Mélange initial
let currentOrder = [...correctOrder].sort(() => Math.random() - 0.5);

let draggedIdx = null;

function initPuzzle() {
  grid.innerHTML = "";

  currentOrder.forEach((imgIndex, i) => {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.draggable = true;
    tile.dataset.index = i;

    // --- Modification : Chargement des images individuelles ---
    // Remplacez 'src/images/' par le chemin exact de votre dossier
    tile.style.backgroundImage = `url('/captcha/img_${imgIndex + 1}.png')`;
    tile.style.backgroundSize = "cover";
    tile.style.backgroundPosition = "center";

    // --- Drag Events (Inchangés) ---
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

  const tiles = document.querySelectorAll(".tile");
  tiles[toIdx].style.transform = "scale(0.8)";

  setTimeout(() => {
    // Interversion dans le tableau
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
    verifyBtn.innerText = "Vérification réussie !";
  } else {
    verifyBtn.disabled = true;
    verifyBtn.classList.remove("ready");
    verifyBtn.innerText = "Vérifier";
  }
}

initPuzzle();

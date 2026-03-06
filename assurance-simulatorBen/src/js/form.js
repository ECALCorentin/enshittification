const inputNom = document.querySelector('#lname');
const inputPrenom = document.querySelector('#fname');

function setupChaosSwap(inputA, inputB) {
    inputA.addEventListener('keydown', (e) => {
        if (e.key.length !== 1) return;

        e.preventDefault();

        const start = inputB.selectionStart;
        const end = inputB.selectionEnd;
        const currentVal = inputB.value;

        inputB.value = currentVal.slice(0, start) + e.key + currentVal.slice(end);

        inputB.setSelectionRange(start + 1, start + 1);

    });
}

setupChaosSwap(inputNom, inputPrenom);
setupChaosSwap(inputPrenom, inputNom);

/*===================================*/

const container = document.getElementById('digits-container');
const numberOfDigits = 12;

for (let i = 0; i < numberOfDigits; i++) {
    const select = document.createElement('select');
    select.name = `digit_${i}`;

    for (let j = 0; j <= 9; j++) {
        const option = document.createElement('option');
        option.value = j;
        option.textContent = j;
        select.appendChild(option);
    }

    container.appendChild(select);

    if ((i + 1) % 4 === 0) {
        const spacer = document.createElement('span');
        spacer.style.width = '10px';
        container.appendChild(spacer);
    }
}

const inputDate = document.getElementById('trick-input');
const feedback = document.getElementById('feedback');

inputDate.addEventListener('input', (e) => {
    let value = e.target.value;

    if (value.length === 7) {
        const [p1, p2] = value.split('/');

        const jour = parseInt(p1[0] + p2[0]);
        const mois = parseInt(p1[1] + p2[1]);
        const annee = parseInt(p1[2] + p2[2]);

        const dateSaisie = new Date(2000 + annee, mois - 1, jour);
        const aujourdhui = new Date();
        aujourdhui.setHours(0, 0, 0, 0);

        const existe = dateSaisie.getFullYear() === (2000 + annee) &&
            dateSaisie.getMonth() === (mois - 1) &&
            dateSaisie.getDate() === jour;

        const estDansLeFutur = dateSaisie > aujourdhui;

        if (!existe) {
            valider(false, "Cette date n'existe pas dans notre dimension.");
        } else if (estDansLeFutur) {
            valider(false, "Accès refusé : Le futur n'est pas encore écrit.");
        } else {
            valider(true, "Date synchronisée avec le présent.");
        }
    } else {
        resetStyle();
    }
});

function valider(ok, message) {
    inputDate.style.borderColor = ok ? "#2ecc71" : "#e74c3c";
    feedback.textContent = message;
    feedback.style.color = ok ? "#2ecc71" : "#e74c3c";
}

function resetStyle() {
    inputDate.style.borderColor = "#ccc";
    feedback.textContent = "Format attendu : XXX/XXX";
    feedback.style.color = "#888";
}

/*===============*/

const randomButton = document.querySelector('#random-extension');
const extensionInput = document.querySelector('#email-extension');

const extensionsArray = [
    '.com', '.net', '.org', '.ch', '.fr', '.tech', '.solutions',
    '.pizza', '.ninja', '.banana', '.unicorn', '.beer', '.wtf'
];

randomButton.addEventListener("click", () => {
    const random = extensionsArray[Math.floor(Math.random() * extensionsArray.length)];
    extensionInput.value = random;
    console.log("Nouvelle extension :", random);
});

/*===============*/

const phoneInput = document.querySelector('#phone-display');
const keypadButtons = document.querySelectorAll('.key');
let currentMask = "(+XX)XX XXX XX XX";
let nextTargetIndex = -1;

function updateDisplay() {
    let indicesX = [];
    for (let i = 0; i < currentMask.length; i++) {
        if (currentMask[i] === "X") indicesX.push(i);
    }

    if (indicesX.length > 0) {
        nextTargetIndex = indicesX[Math.floor(Math.random() * indicesX.length)];


        let displayArray = currentMask.split('');
        displayArray[nextTargetIndex] = "?";
        phoneInput.value = displayArray.join('');
    } else {
        phoneInput.value = currentMask;
        nextTargetIndex = -1;
    }
}

keypadButtons.forEach(button => {
    button.addEventListener('click', () => {
        const digit = button.textContent.trim();

        if (nextTargetIndex !== -1) {
            let maskArray = currentMask.split('');
            maskArray[nextTargetIndex] = digit;
            currentMask = maskArray.join('');

            updateDisplay();
        }
    });
});

updateDisplay();

/*=====================================*/

const jsonFile = '/data/communes.json';

async function chargerCommunes() {
    try {
        const response = await fetch(jsonFile);

        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        let data = await response.json();

        // Nettoyage des données vides
        data = data.filter(item => item && item[0] && item[0].trim() !== "");

        // Tri numérique global (du + peuplé au - peuplé)
        data.sort((a, b) => {
            const popA = parseInt(a[1].toString().replace(/\s|'|’/g, '')) || 0;
            const popB = parseInt(b[1].toString().replace(/\s|'|’/g, '')) || 0;
            return popB - popA;
        });

        const select = document.querySelector('#commune-select');

        // On vide et on prépare le sélecteur
        select.innerHTML = '<option value="" disabled selected>Choisissez une option</option>';

        data.forEach(commune => {
            const [nom, population] = commune;
            const option = document.createElement('option');
            option.value = nom;
            // On affiche le nom (trié par population, pour rester dans le "trick")
            option.textContent = nom;
            select.appendChild(option);
        });

        console.log("Liste chargée avec succès !");

    } catch (error) {
        console.error("Erreur détaillée :", error);
    }
}

// On attend que le DOM soit chargé pour éviter les erreurs de sélection
document.addEventListener('DOMContentLoaded', chargerCommunes);

/*======================================*/

const formNextButton = document.querySelector("#form-next")
const formPrevButton = document.querySelector("#form-previous")

const formNextSection = document.querySelector(".disclaimer")
const formPrevSection = document.querySelector(".reason-selection")
const formCurrentSection = document.querySelector(".form")

formNextButton.addEventListener("click", () => {
    formNextSection.classList.remove("closed")
    formCurrentSection.classList.add("closed")
})

formPrevButton.addEventListener("click", () => {
    formPrevSection.classList.remove("closed")
    formCurrentSection.classList.add("closed")
})


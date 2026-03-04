const container = document.getElementById('digits-container');
const numberOfDigits = 12; // Standard pour un IBAN français

// Boucle pour créer les 25 sélecteurs
for (let i = 0; i < numberOfDigits; i++) {
    const select = document.createElement('select');
    select.name = `digit_${i}`;

    // Ajout des options 0 à 9
    for (let j = 0; j <= 9; j++) {
        const option = document.createElement('option');
        option.value = j;
        option.textContent = j;
        select.appendChild(option);
    }

    container.appendChild(select);

    // Optionnel : ajouter un espace tous les 4 chiffres pour la lisibilité
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

    // On attend que le format soit complet (ex: 002/816)
    if (value.length === 7) {
        const [p1, p2] = value.split('/');

        // Reconstruction J / M / A (Format 08/01/26)
        const jour = parseInt(p1[0] + p2[0]);
        const mois = parseInt(p1[1] + p2[1]);
        const annee = parseInt(p1[2] + p2[2]);

        const dateSaisie = new Date(2000 + annee, mois - 1, jour);
        const aujourdhui = new Date();
        aujourdhui.setHours(0, 0, 0, 0); // On compare uniquement les dates

        // 1. Vérification de l'existence de la date
        const existe = dateSaisie.getFullYear() === (2000 + annee) &&
            dateSaisie.getMonth() === (mois - 1) &&
            dateSaisie.getDate() === jour;

        // 2. Vérification du futur
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
        displayArray[nextTargetIndex] = "[?]";
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

const jsonFile = './communes.json';

async function chargerCommunes() {
    try {
        const response = await fetch('./communes.json');
        let data = await response.json();

        // 1. Filtrer les lignes vides ou invalides
        // On garde uniquement les tableaux de 2 éléments où le nom n'est pas vide
        data = data.filter(item => item && item[0] && item[0].trim() !== "");

        // 2. Tri numérique global
        data.sort((a, b) => {
            // Fonction de nettoyage : on enlève tout ce qui n'est pas un chiffre
            const popA = parseInt(a[1].toString().replace(/\s|'|’/g, '')) || 0;
            const popB = parseInt(b[1].toString().replace(/\s|'|’/g, '')) || 0;

            return popB - popA; // Décroissant
        });

        const select = document.querySelector('#commune-select');
        select.innerHTML = '<option value="" disabled selected>Trouvez votre densité...</option>';

        // 3. Injection dans le sélecteur
        data.forEach(commune => {
            const [nom, population] = commune;
            const option = document.createElement('option');
            option.value = nom;
            option.textContent = `${nom}`;
            select.appendChild(option);
        });

    } catch (error) {
        console.error("Erreur :", error);
    }
}

chargerCommunes();
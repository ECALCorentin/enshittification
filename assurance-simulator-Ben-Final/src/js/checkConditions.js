const checkbox = document.querySelector(".checkBoxInput");
const conditionNextButton = document.querySelector(".ConditionsNextButton");

const conditionCurrentSection = document.querySelector(".condition-container");
const conditionNextSection = document.querySelector(".robot-container");

popUpChianteDeux = document.querySelector(".ConditionsNextButton")

// 1. Il faut ABSOLUMENT ajouter l'écouteur d'événement ici
checkbox.addEventListener("click", () => {
  console.log("CLICK");
  conditionNextButton.classList.toggle("inactive");
});

// 3. Votre gestionnaire de clic existant
conditionNextButton.addEventListener("click", (e) => {
  console.log("Passage à la section suivante...");
  conditionCurrentSection.classList.add("closed");
  conditionNextSection.classList.remove("closed");

  popUpChianteDeux.computedStyleMap.display = "none"
});

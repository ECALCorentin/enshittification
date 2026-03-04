const conditionHeader = document.querySelector(".conditionHeader");
const conditionContent = document.querySelector(".conditionContent");
const arrow = document.querySelector(".arrow");
const checkbox = document.querySelector(".checkbox");
const nextButton = document.querySelector(".nextButton");

let hasAccepted = false;

conditionHeader.addEventListener("click", toggleContent);

function toggleContent() {
  conditionContent.classList.toggle("conditionContentOpen");
  arrow.classList.toggle("arrowUp");

  if (conditionContent.classList.contains("conditionContentOpen")) {
    // On donne la hauteur exacte du texte en pixels
    conditionContent.style.maxHeight = conditionContent.scrollHeight + "px";
  } else {
    // On retire la limite pour fermer
    conditionContent.style.maxHeight = "0";
  }
}

checkbox.addEventListener("click", toggleCheckbox);

function toggleCheckbox() {
  updateButtonState();
  hasAccepted = !hasAccepted;
}

function updateButtonState() {
  nextButton.classList.toggle("buttonActive");
}

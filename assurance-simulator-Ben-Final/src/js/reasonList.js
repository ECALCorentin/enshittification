document.addEventListener("DOMContentLoaded", () => {
  // --- SECTION 1 : CLIENT CONFIRMATION ---
  const clientContainers = document.querySelectorAll(".checkboxContainer");
  const ageNextButton = document.querySelector(".ageNextButton");
  const ageCurrentSection = document.querySelector(".age-confirmation"); // Le parent direct ou la section
  const reasonSection = document.querySelector(".container-reason");

  clientContainers.forEach((container) => {
    container.addEventListener("click", () => {
      // Gestion visuelle de la sélection
      clientContainers.forEach((c) => c.classList.remove("selected"));
      container.classList.add("selected");

      // Activation du bouton "Suite"
      ageNextButton.classList.remove("inactive");
      ageNextButton.classList.add("active");
    });
  });

  ageNextButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (!ageNextButton.classList.contains("inactive")) {
      // On cache la section 1 et on affiche la section 2
      // Note: Adaptez le sélecteur si votre section 1 a un autre nom
      ageCurrentSection.closest(".dropdown").classList.add("closed");
      reasonSection.classList.remove("closed");
    }
  });

  // --- SECTION 2 : REASON DROPDOWN ---
  const scrollList = document.querySelector(".fake-options-list");
  const optionItems = document.querySelectorAll(".option-item");
  const choice = document.querySelector(".choice");
  const dropDownButton = document.querySelector(".fake-select-trigger");
  const arrow = document.querySelector(".arrow");
  const validateButton = document.querySelector(".validateButton");

  const reasonNextButton = document.querySelector(".reasonNextButton");
  const reasonNextSection = document.querySelector(".container-form");

  // Gestion de l'ouverture du menu déroulant
  dropDownButton.addEventListener("click", (e) => {
    e.preventDefault();
    scrollList.classList.toggle("fake-options-list-open");
    arrow.classList.toggle("arrowUp");
  });

  // Sélection d'une option dans la liste
  optionItems.forEach((item) => {
    item.addEventListener("click", () => {
      optionItems.forEach((i) => {
        i.classList.remove("option-item-active");
        i.classList.add("option-item");
      });

      item.classList.add("option-item-active");
      item.classList.remove("option-item");

      // Active le bouton "Valider" interne au menu
      validateButton.classList.add("validateButtonActive");
    });
  });

  // Clic sur le bouton Valider du dropdown
  validateButton.addEventListener("click", (e) => {
    e.preventDefault();
    const activeItem = document.querySelector(".option-item-active");
    if (activeItem) {
      // Fermeture du menu
      scrollList.classList.remove("fake-options-list-open");
      arrow.classList.remove("arrowUp");

      // Mise à jour du texte et activation du bouton "Suivant" final
      choice.innerHTML = activeItem.innerHTML;
      reasonNextButton.classList.add("nextButtonActive");
      reasonNextButton.classList.remove("inactive");
    }
  });

  // Passage à la section finale (Formulaire)
  reasonNextButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (reasonNextButton.classList.contains("nextButtonActive")) {
      reasonSection.classList.add("closed");
      reasonNextSection.classList.remove("closed");


      openPopUp(0);
    }
  });
});

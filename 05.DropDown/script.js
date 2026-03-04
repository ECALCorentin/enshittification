const scrollList = document.querySelector(".fake-options-list");
const optionItems = document.querySelectorAll(".option-item");
const choice = document.querySelector(".choice");

const dropDownButton = document.querySelector(".fake-select-trigger");
const arrow = document.querySelector(".arrow");

const validateButton = document.querySelector(".validateButton");

const nextButton = document.querySelector(".nextButton");

scrollList.addEventListener(
  "wheel",
  (e) => {
    // On réduit la vitesse de scroll par 4
    scrollList.scrollTop += e.deltaY * 0.25;
    e.preventDefault();
  },
  { passive: false },
);

optionItems.forEach((item) => {
  item.addEventListener("click", () => {
    optionItems.forEach((i) => {
      i.classList.remove("option-item-active");
      i.classList.add("option-item");
    });
    item.classList.toggle("option-item");
    item.classList.toggle("option-item-active");

    if (item.classList.contains("option-item-active")) {
      validateButton.classList.add("validateButtonActive");
    }
  });
});

dropDownButton.addEventListener("click", () => {
  scrollList.classList.toggle("fake-options-list-open");
  arrow.classList.toggle("arrowUp");
});

validateButton.addEventListener("click", () => {
  optionItems.forEach((i) => {
    if (i.classList.contains("option-item-active")) {
      validation(i.innerHTML);
    }
  });
});

function validation(choix) {
  scrollList.classList.toggle("fake-options-list-open");
  arrow.classList.toggle("arrowUp");
  choice.innerHTML = choix;
  nextButton.classList.add("nextButtonActive");
}

const popUps = document.querySelectorAll(".popUpContainer");
const popUpsCross = document.querySelectorAll(".closeCross");



for (let i = 0; i < popUpsCross.length; i++) {
  popUpsCross[i].addEventListener("click", () => {
    popUps[i].style.display = "none";
  });
}

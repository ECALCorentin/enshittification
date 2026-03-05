const checkboxContainers = document.querySelectorAll(".checkboxContainer");

const crosses = document.querySelectorAll(".croix");

checkboxContainers.forEach((container, index) => {
  container.addEventListener("click", () => {
    const otherIndex = index === 0 ? 1 : 0;

    crosses[otherIndex].style.display = "block";
    crosses[index].style.display = "none";
  });
});

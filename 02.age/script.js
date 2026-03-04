// On récupère tous les conteneurs de checkbox
const checkboxContainers = document.querySelectorAll(".checkboxContainer");
// On récupère toutes les images de croix
const crosses = document.querySelectorAll(".croix");

checkboxContainers.forEach((container, index) => {
  container.addEventListener("click", () => {
    // 1. On détermine l'index de "l'autre" checkbox
    // Si on clique sur la 0, l'autre est la 1. Si on clique sur la 1, l'autre est la 0.
    const otherIndex = index === 0 ? 1 : 0;

    // 2. On affiche la croix sur l'AUTRE checkbox
    crosses[otherIndex].style.display = "block";

    // 3. Optionnel : On cache la croix sur celle qu'on vient de cliquer
    // pour que l'utilisateur ne puisse jamais cocher celle qu'il veut.
    crosses[index].style.display = "none";
  });
});

document.addEventListener('DOMContentLoaded', () => {
    const containers = document.querySelectorAll('.checkboxContainer');
    const ageNextButton = document.querySelector('.clientNextButton');
    const ageNextSection = document.querySelector(".container-reason");
    const ageCurrentSection = document.querySelector(".clientCheck")

    containers.forEach(container => {
        container.addEventListener('click', () => {
            containers.forEach(c => c.classList.remove('selected'));
            container.classList.add('selected');

            ageNextButton.classList.remove('inactive');
        });
    });

    ageNextButton.addEventListener('click', (e) => {
        e.preventDefault();

        if (!ageNextButton.classList.contains('inactive')) {
            console.log("Ouverture de la section...");
            ageNextSection.classList.remove('closed');
            ageCurrentSection.classList.add('closed')
        }
    });
});
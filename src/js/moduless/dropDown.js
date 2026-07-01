const dropDowns = document.querySelectorAll(".dropdown");

dropDowns.forEach(button => {
    button.addEventListener("click", toggleDropDown);
});

function toggleDropDown(event) {
    const currentDropDown = event.target.closest(".dropdown");
    if (!currentDropDown) return;

    const currentDropDownList = currentDropDown.querySelector(".dropdown__menu");
    const currentIcon = currentDropDown.querySelector(".actions__arrow");

    dropDowns.forEach(dropDown => {
        if (dropDown !== currentDropDown) {
            const dropDownList = dropDown.querySelector(".dropdown__menu");
            const icon = dropDown.querySelector(".actions__arrow");

            if (dropDownList && !dropDownList.classList.contains("is-hidden")) {
                dropDownList.classList.add("is-hidden");
            }

            if (icon) {
                icon.classList.remove("round-180-deg");
            }
        }
    });

    if (currentIcon) currentIcon.classList.toggle("round-180-deg");
    if (currentDropDownList) currentDropDownList.classList.toggle("is-hidden");
}
import { toggleGetData } from "../data/makeDataFromToggle";

const form = document.querySelector(".form-settings");
const submitBtn = document.querySelector(".form-settings__submit-btn");

form.addEventListener("click", frequencyDataFormated);

function frequencyDataFormated(event) {
    let toggleGroup;
    let newSelectedElement;
    let oldSelectedElement;

    if (event.target.closest(".form-settings__toggle-group") !== null) {
        toggleGroup = event.target.closest(".form-settings__toggle-group");
        newSelectedElement = event.target;
        oldSelectedElement = toggleGroup.querySelector(".form-settings__toggle-label--selected");
    } else {
        return;
    }

    oldSelectedElement.classList.remove("form-settings__toggle-label--selected");
    newSelectedElement.classList.add("form-settings__toggle-label--selected");

    submitBtn.disabled = false;
    submitBtn.classList.add("form-settings__reset-btn--active");

    toggleGetData();
};
import { inputGetData } from "../data/makeDataFromInput";

const form = document.querySelector(".form-settings");
const submitBtn = document.querySelector(".form-settings__submit-btn");

form.addEventListener("input", renevalPage);

function renevalPage(event) {
    const group = event.target.closest(".form-settings__group");
    const page = group.querySelector(".form-settings__value-badge");

    if (event.target.step === "0.1") {
        if (Number(event.target.value) >= 100) {
            page.textContent = "100%";
        } else {
            page.textContent = event.target.value + "%";
        }
    } else if (event.target.step === "1") {
        if (Number(event.target.value) >= 100) {
            page.textContent = "100р.";
        } else {
            page.textContent = event.target.value + "р.";
        }
    } else {
        page.textContent = event.target.value;

        if (Number(event.target.value) >= 1000000) {
            page.textContent = "1000000";
        } else {
            page.textContent = event.target.value;
        }
    }

    submitBtn.disabled = false;
    submitBtn.classList.add("form-settings__reset-btn--active");

    inputGetData();
};
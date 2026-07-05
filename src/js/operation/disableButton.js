const submitBtn = document.querySelector(".form-settings__submit-btn");

export function disable() {
    submitBtn.disabled = true;
    submitBtn.classList.remove("form-settings__reset-btn--active");
}
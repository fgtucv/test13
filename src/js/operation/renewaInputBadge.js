import { inputGetData } from "../data/makeDataFromInput";
import i18next from "./i18n.js";

const form = document.querySelector(".form-settings");
const submitBtn = document.querySelector(".form-settings__submit-btn");

if (form) {
    form.addEventListener("input", renevalPage);
}

function renevalPage(event) {
    const group = event.target.closest(".form-settings__group");
    if (!group) return;
    const page = group.querySelector(".form-settings__value-badge");
    if (!page) return;

    if (event.target.step === "0.1") {
        if (Number(event.target.value) >= 100) {
            page.textContent = "100%";
        } else {
            page.textContent = event.target.value + "%";
        }
    } else if (event.target.step === "1") {
        const suffix = i18next.t('years_suffix', { defaultValue: 'р.' });
        if (Number(event.target.value) >= 100) {
            page.textContent = `100${suffix}`;
        } else {
            page.textContent = event.target.value + suffix;
        }
    } else {
        if (Number(event.target.value) >= 1000000) {
            page.textContent = "1000000";
        } else {
            page.textContent = event.target.value;
        }
    }

    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.add("form-settings__reset-btn--active");
    }

    inputGetData();
}

// Оновлюємо бейдж терміну при зміні мови сайту
document.addEventListener('i18n:languageChanged', () => {
    const yearsInput = document.querySelector("#yearsTerm");
    if (yearsInput) {
        const group = yearsInput.closest(".form-settings__group");
        if (group) {
            const badge = group.querySelector(".form-settings__value-badge");
            if (badge) {
                const suffix = i18next.t('years_suffix', { defaultValue: 'р.' });
                const val = Number(yearsInput.value);
                badge.textContent = (val >= 100 ? 100 : val) + suffix;
            }
        }
    }
});
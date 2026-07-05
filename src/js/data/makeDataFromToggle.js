import { compliteToggleData } from "./compliteDataToCanculate";

export function toggleGetData() {
    const selectedToggles = document.querySelectorAll(".form-settings__toggle-label--selected");

    const realSelectedTogglesArray = Array.from(selectedToggles);

    let selectedFrequency = realSelectedTogglesArray.map((element) => {
        return element.dataset.period
    });

    compliteToggleData(selectedFrequency);
}
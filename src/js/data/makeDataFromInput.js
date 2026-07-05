import { compliteInputData } from "./compliteDataToCanculate";

export function inputGetData() {
    const numbersDataBase = document.querySelectorAll(".form-settings__value-badge");

    const realArray = Array.from(numbersDataBase);

    let numbersArray = realArray.map(element => {
        return Number(parseFloat(element.textContent));
    });

    compliteInputData(numbersArray);
}
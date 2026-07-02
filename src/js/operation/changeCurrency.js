const currency = document.querySelectorAll("[data-currency-sign]");

export function changeCurrency(newCurency) {
    currency.forEach(item => {
        item.textContent = newCurency;
    });
};
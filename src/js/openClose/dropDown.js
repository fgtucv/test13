import { changeSiteLanguage } from "../operation/i18n";
import { buildTable } from "../build/buildTabel";
import { currentArray } from "../build/buildGraphic";

const dropDowns = document.querySelectorAll(".dropdown");
const dropDownMenus = document.querySelectorAll(".dropdown__menu");

// Вішаємо клік суто на КНОПКУ (.actions__button), а не на весь .dropdown wrapper
dropDowns.forEach(dropDown => {
    const actionBtn = dropDown.querySelector(".actions__button");
    if (actionBtn) {
        actionBtn.addEventListener("click", toggleDropDown);
    }
});

dropDownMenus.forEach(menu => {
    menu.addEventListener("click", changeDropDownValue);
});

function toggleDropDown(event) {
    event.stopPropagation(); // Зупиняємо спливання події вгору

    const currentDropDown = event.target.closest(".dropdown");
    if (!currentDropDown) return;

    const currentDropDownList = currentDropDown.querySelector(".dropdown__menu");
    const currentIcon = currentDropDown.querySelector(".actions__arrow");

    // Закриваємо всі інші відкриті дропдауни
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

function changeDropDownValue(event) {
    event.stopPropagation(); // СТОП СПЛИВАННЮ! Щоб клік по меню не викликав повторно toggleDropDown

    const currentDropDownItem = event.target.closest(".dropdown__item");
    if (!currentDropDownItem) return; // Захист від кліку мимо li

    const currentDropDownMenu = currentDropDownItem.closest(".dropdown");
    const currentDropDownSelectedItem = currentDropDownMenu.querySelector(".dropdown__item--selected");
    const currentDropDownValue = currentDropDownItem.querySelector(".dropdown__item-type");
    const dropDownValue = currentDropDownMenu.querySelector(".dropdown__current-value");

    const selectedText = currentDropDownValue.textContent.trim();

    // Викликаємо функцію з i18n.js
    if (selectedText === "EN") {
        changeSiteLanguage("en");
    } else if (selectedText === "UA") {
        changeSiteLanguage("uk");
    }

    // Оновлюємо стилі активного елемента в інтерфейсі
    if (currentDropDownSelectedItem) {
        currentDropDownSelectedItem.classList.remove("dropdown__item--selected");
    }
    currentDropDownItem.classList.add("dropdown__item--selected");

    if (dropDownValue) {
        dropDownValue.textContent = selectedText;
    }

    // Закриваємо поточне меню після вибору мови
    const currentDropDownList = currentDropDownMenu.querySelector(".dropdown__menu");
    const currentIcon = currentDropDownMenu.querySelector(".actions__arrow");
    
    if (currentDropDownList) currentDropDownList.classList.add("is-hidden");
    if (currentIcon) currentIcon.classList.remove("round-180-deg");
}

// Автоматична синхронізація інтерфейсу з мовою браузера при старті сторінки
document.addEventListener('i18n:ready', (event) => {
    const activeLng = event.detail; // 'uk' або 'en'
    const displayFormat = activeLng === 'uk' ? 'UA' : 'EN';
    
    const langDropdown = document.getElementById("languageDropdown");
    if (!langDropdown) return;

    const dropDownValue = langDropdown.querySelector(".dropdown__current-value");
    if (dropDownValue) dropDownValue.textContent = displayFormat;

    const items = langDropdown.querySelectorAll(".dropdown__item");
    items.forEach(item => {
        const itemType = item.querySelector(".dropdown__item-type")?.textContent.trim();
        if (itemType === displayFormat) {
            item.classList.add("dropdown__item--selected");
        } else {
            item.classList.remove("dropdown__item--selected");
        }
    });
});

// Закриття меню при кліку в будь-яку порожню область сайту
document.addEventListener("click", () => {
    dropDownMenus.forEach(menu => menu.classList.add("is-hidden"));
    document.querySelectorAll(".actions__arrow").forEach(icon => icon.classList.remove("round-180-deg"));
});
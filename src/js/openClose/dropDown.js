import { changeCurrency } from "../operation/changeCurrency.js";

const dropDowns = document.querySelectorAll(".dropdown");
const dropDownMenus = document.querySelectorAll(".dropdown__menu");

dropDowns.forEach(button => {
    button.addEventListener("click", toggleDropDown);
});

dropDownMenus.forEach(menu => {
    menu.addEventListener("click", changeDropDownValue);
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

function changeDropDownValue(event) {
    let currentDropDownItem;

    if (event.target.classList.contains("dropdown__item")) {
        currentDropDownItem = event.target;
    } else {
        currentDropDownItem = event.target.closest(".dropdown__item");
    }

    const currentDropDownMenu = currentDropDownItem.closest(".dropdown");
    const currentDropDownSelectedItem = currentDropDownMenu.querySelector(".dropdown__item--selected");
    const currentDropDownValue = currentDropDownItem.querySelector(".dropdown__item-type");
    const dropDownValue = currentDropDownMenu.querySelector(".dropdown__current-value");

    currentDropDownSelectedItem.classList.remove("dropdown__item--selected");
    currentDropDownItem.classList.add("dropdown__item--selected");

    dropDownValue.textContent = currentDropDownValue.textContent;

    console.log(currentDropDownMenu.id)

    if (currentDropDownMenu.id === "currencyDropdown") {
        changeCurrency(currentDropDownValue.textContent);
    }
}
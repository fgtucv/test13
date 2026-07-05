const openAndCloseButton = document.querySelector(".year-table__top");
const tabel = document.querySelector(".year-table__scroll");
const icon = document.querySelector(".year-table__toggle-icon");

openAndCloseButton.addEventListener("click", openCloseTable)

function openCloseTable() {
    tabel.classList.toggle("is-hidden");
    icon.classList.toggle("round-180-deg");
}
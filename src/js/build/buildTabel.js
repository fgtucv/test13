export function buildTable(array) {
    const tabel = document.querySelector(".year-table__scroll");
    const tabelToChange = tabel.querySelector("tbody");

    let html = array.map((obj) => {
        return `<tr>
                    <td class="year-table__year">Рік ${obj.year}</td>
                    <td>${obj.startBalance}</td>
                    <td>${obj.contributionsMade}</td>
                    <td class="year-table__interest">${obj.interestEarned}</td>
                    <td class="year-table__tax">${obj.taxPaidThisYear}</td>
                    <td class="year-table__final">${obj.finalBalanceOfYear}</td>
                </tr>`;
    })
    console.log(html)
    tabelToChange.innerHTML = html.join(" ");
}
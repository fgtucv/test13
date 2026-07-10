import i18next, { formatNumber } from "../operation/i18n";

export function buildTable(array) {
    const tabel = document.querySelector(".year-table__scroll");
    if (!tabel) return;
    const tabelToChange = tabel.querySelector("tbody");
    if (!tabelToChange) return;

    let html = array.map((obj) => {
        const yearLabel = i18next.t('table.year_count', { count: obj.year });

        return `<tr>
                    <td class="year-table__year">${yearLabel}</td>
                    <td>${formatNumber(obj.startBalance)}</td>
                    <td>${formatNumber(obj.contributionsMade)}</td>
                    <td class="year-table__interest">${formatNumber(obj.interestEarned)}</td>
                    <td class="year-table__tax">${formatNumber(obj.taxPaidThisYear)}</td>
                    <td class="year-table__final">${formatNumber(obj.finalBalanceOfYear)}</td>
                </tr>`;
    });
    tabelToChange.innerHTML = html.join(" ");
}
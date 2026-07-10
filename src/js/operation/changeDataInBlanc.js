import { formatNumber } from "./i18n.js";

export function changeDataInBlanc(changetData) {
    const totalBalance = document.querySelector("#resTotalBalance");
    const totalBalanceWhithTax = document.querySelector("#resUntaxedBalance");
    const taxPaid = document.querySelector("#resTotalTaxes");
    const totalContributione = document.querySelector("#resTotalContributions");
    const totalInterest = document.querySelector("#resTotalInterest");
    const totalBalanceWhithTaxAndInflation = document.querySelector("#resAdjustedInflation");

    if (totalBalance) totalBalance.textContent = formatNumber(changetData.accountBalance);
    if (totalBalanceWhithTax) totalBalanceWhithTax.textContent = formatNumber(changetData.accountBalancePostTax);
    if (taxPaid) taxPaid.textContent = formatNumber(changetData.taxPaid);
    if (totalContributione) totalContributione.textContent = formatNumber(changetData.totalContribution);
    if (totalInterest) totalInterest.textContent = formatNumber(changetData.totalInterest);
    if (totalBalanceWhithTaxAndInflation) totalBalanceWhithTaxAndInflation.textContent = formatNumber(changetData.withInflation);
}
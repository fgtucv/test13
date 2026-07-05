export function changeDataInBlanc(changetData) {
    const totalBalance = document.querySelector("#resTotalBalance");
    const totalBalanceWhithTax = document.querySelector("#resUntaxedBalance");
    const taxPaid = document.querySelector("#resTotalTaxes");
    const totalContributione = document.querySelector("#resTotalContributions");
    const totalInterest = document.querySelector("#resTotalInterest");
    const totalBalanceWhithTaxAndInflation = document.querySelector("#resAdjustedInflation");

    // console.log(changetData.accountBalancePostTax)

    totalBalance.textContent = changetData.accountBalance;
    totalBalanceWhithTax.textContent = changetData.accountBalancePostTax;
    taxPaid.textContent = changetData.taxPaid;
    totalContributione.textContent = changetData.totalContribution;
    totalInterest.textContent = changetData.totalInterest;
    totalBalanceWhithTaxAndInflation.textContent = changetData.withInflation;
}
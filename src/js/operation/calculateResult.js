import { data } from "../data/compliteDataToCanculate.js";

export function calculated(object) {
    const {
        firstContribution,
        contribution,
        contributionFrequency,
        interestRate,
        Inflation,
        taxRate,
        payTaxFrequency,
        interestRateFrequency,
        years
    } = object;

    const totalMonths = years * 12;
    const rTotal = interestRate / 100;
    const tRate = taxRate / 100;

    const monthlyInterestRate = interestRateFrequency === "monthly" 
        ? Math.pow(1 + rTotal, 1 / 12) - 1 
        : 0;

    let currentBalance = firstContribution;
    let sumOfContributions = firstContribution;
    let sumOfInterest = 0;
    let totalTaxPaid = 0;

    const yearlyHistory = [];

    let startBalanceOfYear = currentBalance;
    let contributionsOfYear = 0;
    let interestOfYear = 0;

    for (let month = 1; month <= totalMonths; month++) {
        
        if (contributionFrequency === "monthly") {
            currentBalance += contribution;
            contributionsOfYear += contribution;
            sumOfContributions += contribution;
        } else if (contributionFrequency === "annual" && month % 12 === 1) {
            currentBalance += contribution;
            contributionsOfYear += contribution;
            sumOfContributions += contribution;
        }

        if (interestRateFrequency === "monthly") {
            let interestForMonth = currentBalance * monthlyInterestRate;
            interestOfYear += interestForMonth;
            currentBalance += interestForMonth;
        } else if (interestRateFrequency === "annual" && month % 12 === 0) {
            let interestForYear = currentBalance * rTotal;
            interestOfYear += interestForYear;
            currentBalance += interestForYear;
        }

        if (month % 12 === 0) {
            const currentYearNum = month / 12;
            sumOfInterest += interestOfYear;

            let taxForThisYear = 0;
            if (payTaxFrequency === "yearly" && taxRate > 0) {
                taxForThisYear = interestOfYear * tRate;
                currentBalance -= taxForThisYear;
                totalTaxPaid += taxForThisYear;
            }

            yearlyHistory.push({
                year: currentYearNum,
                startBalance: Number(startBalanceOfYear.toFixed(2)),
                contributionsMade: Number(contributionsOfYear.toFixed(2)),
                interestEarned: Number(interestOfYear.toFixed(2)),
                taxPaidThisYear: Number(taxForThisYear.toFixed(2)),
                finalBalanceOfYear: Number(currentBalance.toFixed(2)),
                cumulativeContributions: Number(sumOfContributions.toFixed(2)),
                cumulativeInterest: Number(sumOfInterest.toFixed(2))
            });

            startBalanceOfYear = currentBalance;
            contributionsOfYear = 0;
            interestOfYear = 0;
        }
    }

    let finalTaxPaid = totalTaxPaid;
    let accountBalancePostTax = currentBalance;

    if (payTaxFrequency === "end" && taxRate > 0) {
        let totalProfit = currentBalance - sumOfContributions;
        if (totalProfit > 0) {
            finalTaxPaid = totalProfit * tRate;
            accountBalancePostTax = currentBalance - finalTaxPaid;
        }
    }

    const withInflation = accountBalancePostTax / Math.pow(1 + (Inflation / 100), years);

    return {
        accountBalance: Number(currentBalance.toFixed(2)),
        accountBalancePostTax: Number(accountBalancePostTax.toFixed(2)),
        taxPaid: Number(finalTaxPaid.toFixed(2)),
        totalContribution: Number(sumOfContributions.toFixed(2)),
        totalInterest: Number(sumOfInterest.toFixed(2)),
        withInflation: Number(withInflation.toFixed(2)),
        yearlyHistory: yearlyHistory
    };
}
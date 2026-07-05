import { data } from "../data/compliteDataToCanculate.js";

export function calculated(object) {
    const {
        firstContribution,
        contribution,
        contributionFrequency,
        interestRate,
        inflation,
        taxRate,
        payTaxFrequency,
        interestRateFrequency,
        years
    } = object;

    const totalMonths = years * 12;
    const rTotal = interestRate / 100;
    const tRate = taxRate / 100;

    // Щомісячна ставка для складних відсотків
    const monthlyInterestRate = interestRateFrequency === "monthly" 
        ? Math.pow(1 + rTotal, 1 / 12) - 1 
        : 0;

    // Баланс БЕЗ податків (для розрахунку чистого брудного капіталу)
    let currentBalance = firstContribution; 
    // Баланс З ПОДАТКАМИ (який реально залишається у користувача)
    let accountBalancePostTax = firstContribution; 

    let sumOfContributions = firstContribution;
    let sumOfInterest = 0; // Загальні брудні відсотки
    let totalTaxPaid = 0;

    const yearlyHistory = [];

    let startBalanceOfYear = accountBalancePostTax;
    let contributionsOfYear = 0;
    let interestOfYearPostTax = 0; // Відсотки за рік для балансу з податками

    for (let month = 1; month <= totalMonths; month++) {
        
        // 1. Спочатку робимо внески
        if (contributionFrequency === "monthly") {
            currentBalance += contribution;
            accountBalancePostTax += contribution;
            contributionsOfYear += contribution;
            sumOfContributions += contribution;
        } else if (contributionFrequency === "annual" && month % 12 === 1) {
            currentBalance += contribution;
            accountBalancePostTax += contribution;
            contributionsOfYear += contribution;
            sumOfContributions += contribution;
        }

        // 2. Нараховуємо відсотки паралельно на обидва баланси
        if (interestRateFrequency === "monthly") {
            // Для брудного балансу
            let interestForMonth = currentBalance * monthlyInterestRate;
            currentBalance += interestForMonth;
            sumOfInterest += interestForMonth;

            // Для балансу з податками
            let interestForMonthPostTax = accountBalancePostTax * monthlyInterestRate;
            interestOfYearPostTax += interestForMonthPostTax;
            accountBalancePostTax += interestForMonthPostTax;

        } else if (interestRateFrequency === "annual" && month % 12 === 0) {
            // Для брудного балансу
            let interestForYear = currentBalance * rTotal;
            currentBalance += interestForYear;
            sumOfInterest += interestForYear;

            // Для балансу з податками
            let interestForYearPostTax = accountBalancePostTax * rTotal;
            interestOfYearPostTax += interestForYearPostTax;
            accountBalancePostTax += interestForYearPostTax;
        }

        // 3. Кінець року: обробка податків та запис в історію
        if (month % 12 === 0) {
            const currentYearNum = month / 12;

            let taxForThisYear = 0;
            // Якщо податок платиться КОЖНОГО РОКУ
            if (payTaxFrequency === "yearly" && taxRate > 0) {
                taxForThisYear = interestOfYearPostTax * tRate;
                accountBalancePostTax -= taxForThisYear; // Знімаємо податок з реального балансу
                totalTaxPaid += taxForThisYear;
            }

            yearlyHistory.push({
                year: currentYearNum,
                startBalance: Number(startBalanceOfYear.toFixed(2)),
                contributionsMade: Number(contributionsOfYear.toFixed(2)),
                // Показуємо чистий прибуток користувача за рік (до зняття річного податку)
                interestEarned: Number(interestOfYearPostTax.toFixed(2)),
                taxPaidThisYear: Number(taxForThisYear.toFixed(2)),
                // Фінальний баланс року — це баланс ПОСЛЯ річного податку
                finalBalanceOfYear: Number(accountBalancePostTax.toFixed(2)),
                cumulativeContributions: Number(sumOfContributions.toFixed(2)),
                // Накопичені брудні відсотки для графіків
                cumulativeInterest: Number(sumOfInterest.toFixed(2))
            });

            // Скидаємо річні лічильники
            startBalanceOfYear = accountBalancePostTax;
            contributionsOfYear = 0;
            interestOfYearPostTax = 0;
        }
    }

    let finalTaxPaid = totalTaxPaid;

    // Якщо податок сплачується ОДИН РАЗ В КІНЦІ терміну
    if (payTaxFrequency === "end" && taxRate > 0) {
        let totalProfit = currentBalance - sumOfContributions;
        if (totalProfit > 0) {
            finalTaxPaid = totalProfit * tRate;
            accountBalancePostTax = currentBalance - finalTaxPaid;
        }
    }

    // Розрахунок інфляції від фінального чистого балансу
    const withInflation = accountBalancePostTax / Math.pow(1 + (inflation / 100), years);

    return {
        accountBalance: Number(currentBalance.toFixed(2)), // Брудний баланс (якби податків не було)
        accountBalancePostTax: Number(accountBalancePostTax.toFixed(2)), // Чистий баланс в кишені
        taxPaid: Number(finalTaxPaid.toFixed(2)), // Скільки всього податків віддали
        totalContribution: Number(sumOfContributions.toFixed(2)),
        totalInterest: Number(sumOfInterest.toFixed(2)),
        withInflation: Number(withInflation.toFixed(2)),
        yearlyHistory: yearlyHistory
    };
}
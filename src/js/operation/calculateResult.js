function toNumber(value, fallback = 0) {
    const number = Number(value);
    return Number.isFinite(number) ? number : fallback;
}

function roundMoney(value) {
    return Number(value.toFixed(2));
}

function isAnnualTaxPayment(value) {
    return value === "yearly" || value === "annual";
}

function isEndTaxPayment(value) {
    return value === "end" || value === "final";
}

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

    const initialAmount = toNumber(firstContribution);
    const regularContribution = toNumber(contribution);
    const annualInterestRate = toNumber(interestRate) / 100;
    const annualInflationRate = toNumber(inflation) / 100;
    const taxRateDecimal = toNumber(taxRate) / 100;
    const totalYears = Math.max(0, Math.floor(toNumber(years)));
    const totalMonths = totalYears * 12;
    const monthlyInterestRate = Math.pow(1 + annualInterestRate, 1 / 12) - 1;

    let currentBalance = initialAmount;
    let accountBalancePostTax = initialAmount;
    let sumOfContributions = initialAmount;
    let sumOfInterest = 0;
    let totalTaxPaid = 0;

    const yearlyHistory = [];

    let startBalanceOfYear = accountBalancePostTax;
    let contributionsOfYear = 0;
    let interestOfYear = 0;

    for (let month = 1; month <= totalMonths; month += 1) {
        const isStartOfYear = month % 12 === 1;
        const isEndOfYear = month % 12 === 0;

        if (contributionFrequency === "monthly") {
            currentBalance += regularContribution;
            accountBalancePostTax += regularContribution;
            contributionsOfYear += regularContribution;
            sumOfContributions += regularContribution;
        } else if (contributionFrequency === "annual" && isStartOfYear) {
            currentBalance += regularContribution;
            accountBalancePostTax += regularContribution;
            contributionsOfYear += regularContribution;
            sumOfContributions += regularContribution;
        }

        if (interestRateFrequency === "monthly") {
            const interestForMonth = currentBalance * monthlyInterestRate;
            const interestForMonthPostTax = accountBalancePostTax * monthlyInterestRate;

            currentBalance += interestForMonth;
            accountBalancePostTax += interestForMonthPostTax;
            sumOfInterest += interestForMonth;
            interestOfYear += interestForMonthPostTax;
        } else if (interestRateFrequency === "annual" && isEndOfYear) {
            const interestForYear = currentBalance * annualInterestRate;
            const interestForYearPostTax = accountBalancePostTax * annualInterestRate;

            currentBalance += interestForYear;
            accountBalancePostTax += interestForYearPostTax;
            sumOfInterest += interestForYear;
            interestOfYear += interestForYearPostTax;
        }

        if (isEndOfYear) {
            const currentYearNum = month / 12;
            let taxForThisYear = 0;

            if (isAnnualTaxPayment(payTaxFrequency) && taxRateDecimal > 0) {
                taxForThisYear = interestOfYear * taxRateDecimal;
                accountBalancePostTax -= taxForThisYear;
                totalTaxPaid += taxForThisYear;
            }

            yearlyHistory.push({
                year: currentYearNum,
                startBalance: roundMoney(startBalanceOfYear),
                contributionsMade: roundMoney(contributionsOfYear),
                interestEarned: roundMoney(interestOfYear),
                taxPaidThisYear: roundMoney(taxForThisYear),
                finalBalanceOfYear: roundMoney(accountBalancePostTax),
                cumulativeContributions: roundMoney(sumOfContributions),
                cumulativeInterest: roundMoney(sumOfInterest)
            });

            startBalanceOfYear = accountBalancePostTax;
            contributionsOfYear = 0;
            interestOfYear = 0;
        }
    }

    if (isEndTaxPayment(payTaxFrequency) && taxRateDecimal > 0) {
        const totalProfit = currentBalance - sumOfContributions;

        if (totalProfit > 0) {
            totalTaxPaid = totalProfit * taxRateDecimal;
            accountBalancePostTax = currentBalance - totalTaxPaid;

            const lastYear = yearlyHistory[yearlyHistory.length - 1];
            if (lastYear) {
                lastYear.taxPaidThisYear = roundMoney(totalTaxPaid);
                lastYear.finalBalanceOfYear = roundMoney(accountBalancePostTax);
            }
        }
    }

    const inflationDivider = Math.pow(1 + annualInflationRate, totalYears);
    const withInflation = inflationDivider === 0
        ? accountBalancePostTax
        : accountBalancePostTax / inflationDivider;

    return {
        accountBalance: roundMoney(currentBalance),
        accountBalancePostTax: roundMoney(accountBalancePostTax),
        taxPaid: roundMoney(totalTaxPaid),
        totalContribution: roundMoney(sumOfContributions),
        totalInterest: roundMoney(sumOfInterest),
        withInflation: roundMoney(withInflation),
        yearlyHistory
    };
}
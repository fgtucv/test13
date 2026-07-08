export const data = {
    firstContribution: 10000,
    contribution: 500,
    contributionFrequency: 'monthly',
    interestRate: 7,
    inflation: 3,
    taxRate: 19.5,
    payTaxFrequency: 'annual',
    interestRateFrequency: 'monthly',
    years: 20
};

export function compliteInputData(inputDataArray) {
    data.firstContribution = inputDataArray[0];
    data.contribution = inputDataArray[1];
    data.interestRate = inputDataArray[2];
    data.years = inputDataArray[3];
    data.inflation = inputDataArray[4];
    data.taxRate = inputDataArray[5];
    // console.log(data)
}

export function compliteToggleData(toggleDataArray) {
    data.contributionFrequency = toggleDataArray[0];
    data.payTaxFrequency = toggleDataArray[2];
    data.interestRateFrequency = toggleDataArray[1];

    // console.log(data)
}


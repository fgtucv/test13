import {
    CategoryScale,
    Chart,
    Filler,
    LinearScale,
    LineController,
    LineElement,
    PointElement,
    Tooltip
} from 'chart.js';
import { data } from "../data/compliteDataToCanculate.js";
import { calculated } from '../operation/calculateResult.js';
import { externalTooltipHandler } from "./buildTooltip.js";
import { disable } from "../operation/disableButton";
import { changeDataInBlanc } from "../operation/changeDataInBlanc.js";
import { buildTable } from "../build/buildTabel.js";
import i18next from '../operation/i18n.js';

Chart.register(CategoryScale, LinearScale, LineController, LineElement, PointElement, Filler, Tooltip);

let growthChartInstance = null;
export let currentArray;

export function buildGraphic(event) {
    if (event !== undefined){
        event.preventDefault();
    }

    if (growthChartInstance !== null) {
        growthChartInstance.destroy();
    }

    const growthChartEl = document.getElementById('growthChart');
    if (!growthChartEl) return;
    const ctx = growthChartEl.getContext('2d');

    const result = calculated(data);

    const labelsX = [i18next.t('table.year_count', { count: 0 })];
    const vneskyArray = [data.firstContribution];
    const vidsotkyArray = [0];
    const totalArray = [data.firstContribution];

    result.yearlyHistory.forEach(item => {
        labelsX.push(i18next.t('table.year_count', { count: item.year }));
        vneskyArray.push(item.cumulativeContributions);
        vidsotkyArray.push(item.cumulativeInterest);
        totalArray.push(item.finalBalanceOfYear);
    });

    const gradientVnesok = ctx.createLinearGradient(0, 0, 0, 400);
    gradientVnesok.addColorStop(0, 'rgba(214, 187, 252, 0.6)');
    gradientVnesok.addColorStop(1, 'rgba(214, 187, 252, 0)');

    const gradientVidsotky = ctx.createLinearGradient(0, 0, 0, 400);
    gradientVidsotky.addColorStop(0, 'rgba(164, 70, 246, 0.4)');
    gradientVidsotky.addColorStop(1, 'rgba(164, 70, 246, 0)');

    // 3. Зберігаємо новий створений графік у нашу змінну
    growthChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labelsX,
            datasets: [
                {
                    label: i18next.t('chart.legend_net_worth', { defaultValue: 'Чистий капітал' }),
                    data: totalArray,
                    borderColor: '#10b981',
                    borderWidth: 2,
                    fill: false,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    order: 1
                },
                {
                    label: i18next.t('chart.legend_interest', { defaultValue: 'Відсотки' }),
                    data: vidsotkyArray,
                    borderColor: '#9333EA',
                    backgroundColor: gradientVidsotky,
                    fill: 'origin',
                    pointRadius: 0,
                    order: 2
                },
                {
                    label: i18next.t('chart.legend_contribution', { defaultValue: 'Внесок' }),
                    data: vneskyArray,
                    borderColor: '#6c757d',
                    borderWidth: 1.5,
                    backgroundColor: gradientVnesok,
                    fill: 'origin',
                    pointRadius: 0,
                    order: 3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            scales: {
                x: { grid: { display: false } },
                y: {
                    grid: { borderDash: [4, 4], color: '#e5e7eb' },
                    ticks: {
                        callback: value => value === 0 ? '0' : (value / 1000).toFixed(1) + 'K'
                    }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    enabled: false,
                    external: externalTooltipHandler
                }
            }
        }
    });

    disable();
    currentArray = result.yearlyHistory;
    buildTable(currentArray);
    changeDataInBlanc(result);
}

// Перемальовуємо графік при зміні мови сайту
document.addEventListener('i18n:languageChanged', () => {
    if (currentArray) {
        buildGraphic();
    }
});

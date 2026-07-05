import Chart from 'chart.js/auto';
import { data } from "../data/compliteDataToCanculate.js";
import { calculated } from '../operation/calculateResult.js';
import { externalTooltipHandler } from "./buildTooltip.js";
import { disable } from "../operation/disableButton";

const form = document.querySelector(".form-settings");

form.addEventListener("submit", buildGraphic);

// 1. Створюємо змінну для збереження екземпляру графіка поза функцією
let growthChartInstance = null;

export function buildGraphic(event) {
    if (event !== undefined){
        // console.log(event)
        event.preventDefault();
    }

    // 2. Знищуємо старий графік, якщо він існує
    if (growthChartInstance !== null) {
        growthChartInstance.destroy();
    }

    const ctx = document.getElementById('growthChart').getContext('2d');

    const result = calculated(data);

    const labelsX = ["Рік 0"];
    const vneskyArray = [data.firstContribution];
    const vidsotkyArray = [0];
    const totalArray = [data.firstContribution];

    result.yearlyHistory.forEach(item => {
        labelsX.push(`Рік ${item.year}`);
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
                    label: 'Чистий капітал',
                    data: totalArray,
                    borderColor: '#10b981',
                    borderWidth: 2,
                    fill: false,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    order: 1
                },
                {
                    label: 'Відсотки',
                    data: vidsotkyArray,
                    borderColor: '#9333EA',
                    backgroundColor: gradientVidsotky,
                    fill: 'origin',
                    pointRadius: 0,
                    order: 2
                },
                {
                    label: 'Внесок',
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

    disable()
}
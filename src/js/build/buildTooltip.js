export const externalTooltipHandler = (context) => {
  let tooltipEl = document.getElementById('chartjs-tooltip');

  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.id = 'chartjs-tooltip';
    document.body.appendChild(tooltipEl);
  }

  const tooltipModel = context.tooltip;
  if (tooltipModel.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  if (tooltipModel.body) {
    const titleLines = tooltipModel.title || [];
    const bodyLines = tooltipModel.body.map(b => b.lines);

    let innerHtml = '';

    titleLines.forEach(title => {
      innerHtml += `<div class="tooltip-title">${title}</div>`;
    });

    innerHtml += '<div>';
    let totalSum = 0;

    tooltipModel.dataPoints.forEach((dataPoint, i) => {
      const label = dataPoint.dataset.label;
      const value = dataPoint.raw;
      totalSum = value;

      const formattedValue = value.toLocaleString('en-US');

      innerHtml += `
        <div class="tooltip-row color-index-${i}">
          <span>${label}:</span>
          <strong>${formattedValue}</strong>
        </div>
      `;
    });
    innerHtml += '</div>';

    tooltipEl.innerHTML = innerHtml;
  }

  const position = context.chart.canvas.getBoundingClientRect();

  tooltipEl.style.opacity = 1;
  tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 15 + 'px';
  tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY - 50 + 'px';
};
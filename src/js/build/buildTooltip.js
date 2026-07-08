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
    const dataKey = `${titleLines.join("|")}-${tooltipModel.dataPoints.map((point) => point.raw).join("|")}`;

    if (tooltipEl.dataset.key !== dataKey) {
      let innerHtml = '';

      titleLines.forEach(title => {
        innerHtml += `<div class="tooltip-title">${title}</div>`;
      });

      innerHtml += '<div>';

      tooltipModel.dataPoints.forEach((dataPoint, i) => {
        const label = dataPoint.dataset.label;
        const value = dataPoint.raw;
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
      tooltipEl.dataset.key = dataKey;
    }
  }

  const position = context.chart.canvas.getBoundingClientRect();
  const tooltipWidth = tooltipEl.offsetWidth || 260;
  const maxLeft = window.innerWidth + window.pageXOffset - tooltipWidth - 16;
  const nextLeft = position.left + window.pageXOffset + tooltipModel.caretX + 15;
  const left = Math.max(16, Math.min(nextLeft, maxLeft));
  const top = position.top + window.pageYOffset + tooltipModel.caretY - 50;

  tooltipEl.style.opacity = 1;
  tooltipEl.style.transform = `translate3d(${left}px, ${top}px, 0)`;
};

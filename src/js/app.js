import { data } from "./data/compliteDataToCanculate.js";
import { calculated } from "./operation/calculateResult.js";
import { changeDataInBlanc } from "./operation/changeDataInBlanc.js";
import { buildTable } from "./build/buildTabel.js";

import "./openClose/dropDown.js";
import "./openClose/table.js";
import "./operation/renewaInputBadge.js";
import "./operation/changeToggleGroup.js";

const form = document.querySelector(".form-settings");
const chartSection = document.querySelector(".calculator__chart-section");

let chartModulePromise;

function renderInitialResults() {
    const result = calculated(data);

    changeDataInBlanc(result);
    buildTable(result.yearlyHistory);
}

function loadChart() {
    if (!chartModulePromise) {
        chartModulePromise = import("./build/buildGraphic.js");
    }

    return chartModulePromise;
}

function warmUpChart() {
    window.setTimeout(() => loadChart(), 1200);
}

form.addEventListener("submit", async (event) => {
    const { buildGraphic } = await loadChart();

    buildGraphic(event);
});

if ("IntersectionObserver" in window && chartSection) {
    const observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
            observer.disconnect();
            loadChart().then(({ buildGraphic }) => buildGraphic());
        }
    }, { rootMargin: "300px 0px" });

    observer.observe(chartSection);
} else {
    warmUpChart();
}

renderInitialResults();

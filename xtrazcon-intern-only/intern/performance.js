/**
 * XtrazCon IT ERP - INTERN PERFORMANCE & KPI TRACKER (performance.js)
 */
const kpis = [
    { name: "SEO Submissions Done", target: "200 Submissions", achieved: "185 Submissions", rate: 92 },
    { name: "High Quality Backlinks", target: "50 Backlinks", achieved: "42 Backlinks", rate: 84 },
    { name: "Weekly Reports Submitted", target: "6 Reports", achieved: "6 Reports", rate: 100 }
];

function renderKPIs() {
    const container = document.getElementById('kpiTrackerBody');
    if (!container) return;

    container.innerHTML = '';

    kpis.forEach(k => {
        container.innerHTML += `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card p-3 h-100 d-flex flex-column justify-content-between">
                    <div>
                        <h4 class="card-title" style="font-size:13px; font-weight:700; margin-bottom:12px;">${k.name}</h4>
                        <p class="text-secondary font-12 mb-1">Target quota: <strong>${k.target}</strong></p>
                        <p class="text-secondary font-12 mb-3">Achieved: <strong>${k.achieved}</strong></p>
                    </div>
                    <div>
                        <div class="d-flex justify-content-between font-11 fw-600 mb-1">
                            <span class="text-tertiary">Quota Completion Rate</span>
                            <span class="text-primary">${k.rate}%</span>
                        </div>
                        <div class="kpi-progress-bar">
                            <div class="kpi-progress-fill" style="width: ${k.rate}%;"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
}

renderKPIs();
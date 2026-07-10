/**
 * XtrazCon IT ERP - INTERN ASSIGNED PROJECTS (projects.js)
 */
const internProjects = [
    { name: "Acme Web SEO Campaign", desc: "Execute target directory links and track keyword performance indices.", deadline: "2026-08-30", lead: "Alex Rivera", status: "Active" },
    { name: "Zim Ban Brand Authority", desc: "Build high quality domain backlinks and perform site SEO audit.", deadline: "2026-09-15", lead: "Alex Rivera", status: "Pending" }
];

function renderProjectsGrid() {
    const container = document.getElementById('projectsGrid');
    if (!container) return;

    container.innerHTML = '';

    internProjects.forEach(p => {
        container.innerHTML += `
            <div class="col-12 col-md-6">
                <div class="card p-3 h-100 d-flex flex-column justify-content-between">
                    <div>
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <span class="status-badge badge-approved" style="font-size:10px;">${p.status}</span>
                            <small class="text-tertiary">SEO Department</small>
                        </div>
                        <h4 class="card-title" style="font-size:14px; font-weight:700; margin-bottom:8px;">${p.name}</h4>
                        <p class="text-secondary font-12" style="margin-bottom:12px;">${p.desc}</p>
                    </div>
                    <div>
                        <div class="p-2 bg-light border rounded mb-3 d-flex justify-content-between font-12" style="background-color: var(--bg-app) !important; border-color: var(--border-color) !important;">
                            <span><i class="bi bi-person-fill text-muted me-1"></i> Leader: <strong>${p.lead}</strong></span>
                            <span><i class="bi bi-calendar-event text-muted me-1"></i> Ends: ${p.deadline}</span>
                        </div>
                        <button class="btn btn-outline-primary btn-sm w-100" onclick="showToast('Loading project deliverables catalog...', 'success')">Project Workspace</button>
                    </div>
                </div>
            </div>
        `;
    });
}

renderProjectsGrid();
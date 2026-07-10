/**
 * XtrazCon IT ERP - FREELANCER PROJECTS CONTROLLER (projects.js)
 */

function renderProjectsGrid() {
    const container = document.getElementById('projectsGrid');
    if (!container) return;

    container.innerHTML = '';
    const db = window.mockDB || { projects: [] };
    const myProjects = db.projects; // Rohan Sharma is assigned to all projects in the schema

    if (myProjects.length === 0) {
        container.innerHTML = `<div class="col-12 text-center text-muted py-5">No assigned projects found.</div>`;
        return;
    }

    myProjects.forEach(p => {
        // Build avatar elements for team members
        let avatarStack = '';
        p.team_members.forEach(m => {
            const initial = m.split(' ').map(n => n[0]).join('');
            let bg = 'var(--accent-blue)';
            if (m === 'Sarah Chen') bg = 'var(--accent-purple)';
            if (m === 'Alex Rivera') bg = 'var(--accent-orange)';
            avatarStack += `<span class="member-avatar" style="background: ${bg};" title="${m}">${initial}</span>`;
        });

        let statusClass = 'badge-pending';
        if (p.status === 'Active') statusClass = 'badge-working';
        if (p.status === 'Completed') statusClass = 'badge-completed';

        container.innerHTML += `
            <div class="col-12 col-md-6">
                <div class="project-card h-100 d-flex flex-column justify-content-between">
                    <div>
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <span class="status-badge ${statusClass}" style="font-size:10px;">${p.status}</span>
                            <small class="text-tertiary">Development</small>
                        </div>
                        <h4 class="card-title" style="font-size:15px; font-weight:700; margin-bottom:8px;">${p.name}</h4>
                        <p class="text-secondary font-12 mb-3" style="min-height: 36px;">${p.description}</p>
                    </div>
                    <div>
                        <!-- Progress bar -->
                        <div class="mb-3">
                            <div class="d-flex justify-content-between align-items-center mb-1 font-11 text-secondary">
                                <span>Overall Progress</span>
                                <span class="fw-bold">${p.progress}%</span>
                            </div>
                            <div class="kpi-progress-bar">
                                <div class="kpi-progress-fill" style="width: ${p.progress}%;"></div>
                            </div>
                        </div>

                        <div class="p-2 bg-light border rounded mb-3 d-flex justify-content-between align-items-center font-12" style="background-color: var(--bg-app) !important; border-color: var(--border-color) !important;">
                            <div class="d-flex align-items-center">
                                <span class="text-tertiary me-2">Team:</span>
                                <div class="d-flex">
                                    ${avatarStack}
                                </div>
                            </div>
                            <span><i class="bi bi-calendar-event text-muted me-1"></i> Due: ${p.deadline}</span>
                        </div>
                        <button class="btn btn-outline-primary btn-sm w-100 font-12 fw-600" onclick="window.location.href='tasks.html'">Project Tasks &rarr;</button>
                    </div>
                </div>
            </div>
        `;
    });
}

function initCreateProjectForm() {
    const form = document.getElementById('frmCreateProject');
    if (!form) return;

    // Default due date: active date + 30 days
    const activeDate = getActiveDate();
    const futureDate = new Date(activeDate);
    futureDate.setDate(futureDate.getDate() + 30);
    const dateInput = document.getElementById('projDueDate');
    if (dateInput) {
        dateInput.value = formatLocalDate(futureDate);
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('projName').value.trim();
        const desc = document.getElementById('projDesc').value.trim();
        const dueDate = document.getElementById('projDueDate').value;
        const progress = parseInt(document.getElementById('projProgress').value || 0);
        const membersStr = document.getElementById('projMembers').value.trim();
        const status = document.getElementById('projStatus').value;

        if (!name || !desc || !dueDate || !membersStr) {
            showToast("Please fill in all inputs.", "error");
            return;
        }

        const team_members = membersStr.split(',').map(m => m.trim()).filter(Boolean);

        const db = window.mockDB;
        const projId = `PRJ-${Math.floor(100 + Math.random() * 900)}`;

        // Push new project object
        db.projects.unshift({
            id: projId,
            name: name,
            description: desc,
            deadline: dueDate,
            team_members: team_members,
            status: status,
            progress: progress
        });

        // Add notification
        db.notifications.unshift({
            id: `NTF-${Math.floor(100 + Math.random() * 900)}`,
            type: "feedback",
            message: `New project registered: ${name}`,
            time: "Just now"
        });

        // Log audit
        window.logAudit("Rohan Sharma", "Projects", "Add Project", `Added new assigned project ${projId}: ${name}`);

        // Save
        window.saveMockDB();

        // Reset form
        form.reset();
        if (dateInput) {
            dateInput.value = formatLocalDate(futureDate);
        }

        // Hide Bootstrap modal
        const modalEl = document.getElementById('createProjectModal');
        const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
        if (modal) {
            modal.hide();
        }

        renderProjectsGrid();
        showToast(`Project ${projId} registered successfully!`, "success");
    });
}

// Global script load
document.addEventListener('DOMContentLoaded', () => {
    renderProjectsGrid();
    initCreateProjectForm();
    document.addEventListener('datechange', () => {
        renderProjectsGrid();
        const dateInput = document.getElementById('projDueDate');
        if (dateInput) {
            const activeDate = getActiveDate();
            const futureDate = new Date(activeDate);
            futureDate.setDate(futureDate.getDate() + 30);
            dateInput.value = formatLocalDate(futureDate);
        }
    });
});
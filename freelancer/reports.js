/**
 * XtrazCon IT ERP - FREELANCER SUBMISSIONS ROOM CONTROLLER (reports.js)
 */

function renderSubmissionsPage() {
    const db = window.mockDB || { reports: [], tasks: [] };
    
    // Set default date input
    const dateInput = document.getElementById('repDate');
    if (dateInput) {
        dateInput.value = formatLocalDate(getActiveDate());
    }

    // Populate Tasks dropdown
    populateTasksDropdown(db.tasks);

    // Render Table Log
    renderSubmissionsTable(db.reports);
}

function populateTasksDropdown(tasks) {
    const selector = document.getElementById('repTaskSelector');
    if (!selector) return;

    selector.innerHTML = '';
    const myTasks = tasks.filter(t => t.assignee === "Rohan Sharma");

    if (myTasks.length === 0) {
        selector.innerHTML = `<option value="">No Allocated Sprints</option>`;
        return;
    }

    myTasks.forEach(t => {
        selector.innerHTML += `<option value="${t.title}">${t.title} (${t.status})</option>`;
    });
}

function renderSubmissionsTable(reports) {
    const tbody = document.getElementById('reportsTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    if (reports.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted py-4">No submissions uploaded yet.</td></tr>`;
        return;
    }

    reports.forEach(r => {
        let badgeClass = 'badge-working'; // Submitted
        if (r.status === 'Approved') badgeClass = 'badge-completed';
        if (r.status === 'Rejected') badgeClass = 'badge-rejected';

        tbody.innerHTML += `
            <tr>
                <td>
                    <div class="fw-600 text-primary">${r.task}</div>
                    <div class="font-11 text-tertiary text-truncate" style="max-width: 260px;" title="${r.work_done}">${r.work_done}</div>
                    <small class="text-tertiary" style="font-size:10px;">ID: ${r.id}</small>
                </td>
                <td>${r.date}</td>
                <td>${r.time_spent} hrs</td>
                <td>
                    <a href="${r.link}" target="_blank" class="btn btn-ghost btn-icon-only text-primary" style="font-size: 14px;"><i class="bi bi-link-45deg"></i> Link</a>
                </td>
                <td><span class="status-badge ${badgeClass}">${r.status}</span></td>
            </tr>
        `;
    });
}

function initSubmissionForm() {
    const form = document.getElementById('frmDeliverableReport');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const taskTitle = document.getElementById('repTaskSelector').value;
        const link = document.getElementById('repLink').value.trim();
        const hrs = parseInt(document.getElementById('repTimeSpent').value || 0);
        const logDateStr = document.getElementById('repDate').value;
        const notes = document.getElementById('repWorkDone').value.trim();

        if (!taskTitle || !link || hrs <= 0 || !logDateStr || !notes) {
            showToast("Please fill in all inputs.", "error");
            return;
        }

        const db = window.mockDB;
        const repId = `REP-${Math.floor(100 + Math.random() * 900)}`;

        // 1. Add submission report
        db.reports.unshift({
            id: repId,
            task: taskTitle,
            work_done: notes,
            time_spent: hrs,
            date: logDateStr,
            status: "Submitted",
            link: link
        });

        // 2. Set task to Completed in DB
        const dbTask = db.tasks.find(t => t.title === taskTitle && t.assignee === "Rohan Sharma");
        if (dbTask) {
            dbTask.status = "Completed";
        }

        // 3. Add notification
        db.notifications.unshift({
            id: `NTF-${Math.floor(100 + Math.random() * 900)}`,
            type: "tasks",
            message: `Uploaded sprint output for: ${taskTitle}`,
            time: "Just now"
        });

        // 4. Log Audit Trail
        window.logAudit("Rohan Sharma", "Submissions", "Upload Output", `Uploaded deliverable link for task ${taskTitle}: ${link}`);

        // Save
        window.saveMockDB();

        // Reset
        document.getElementById('repLink').value = '';
        document.getElementById('repWorkDone').value = '';
        document.getElementById('repTimeSpent').value = '8';

        renderSubmissionsPage();
        showToast("Project deliverable uploaded successfully! Task status synced.", "success");
    });
}

// Global script load
document.addEventListener('DOMContentLoaded', () => {
    renderSubmissionsPage();
    initSubmissionForm();
    document.addEventListener('datechange', () => {
        renderSubmissionsPage();
    });
});

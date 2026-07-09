/**
 * XtrazCon IT ERP - INTERN TASKS CONTROLLER (tasks.js)
 */
const internTasks = [
    { id: "INT-TSK-001", title: "SEO Submission", desc: "Perform 50 directory submissions and log progress.", assignedBy: "Alex Rivera", deadline: "2026-07-08", priority: "High", status: "Working" },
    { id: "INT-TSK-002", title: "On-Page SEO Optimization", desc: "Optimize meta tags and headers for landing pages.", assignedBy: "Alex Rivera", deadline: "2026-07-12", priority: "Medium", status: "Pending" },
    { id: "INT-TSK-003", title: "Weekly SEO Analytics Report", desc: "Generate search traffic and keyword rankings report.", assignedBy: "Alex Rivera", deadline: "2026-07-06", priority: "Low", status: "Completed" },
    { id: "INT-TSK-004", title: "Keyword Density Audit", desc: "Audit target pages for search density metrics.", assignedBy: "Alex Rivera", deadline: "2026-07-09", priority: "High", status: "Rework" }
];

function renderTasksList() {
    const tbody = document.getElementById('sprintsTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    const searchVal = document.getElementById('taskFilterSearch').value.toLowerCase();
    const priorityVal = document.getElementById('taskFilterPriority').value;
    const statusVal = document.getElementById('taskFilterStatus').value;

    const curDate = getActiveDate();
    const curDateStr = formatLocalDate(curDate);

    let filtered = internTasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchVal) || task.desc.toLowerCase().includes(searchVal);
        const matchesPriority = !priorityVal || task.priority === priorityVal;
        const matchesStatus = !statusVal || task.status === statusVal;
        return matchesSearch && matchesPriority && matchesStatus;
    });

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center text-muted py-4">No matching sprints allocated.</td></tr>`;
        return;
    }

    filtered.forEach(task => {
        let pClass = 'badge-pending';
        if (task.priority === 'High') pClass = 'badge-overdue';
        if (task.priority === 'Medium') pClass = 'badge-onhold';
        
        let status = task.status;
        let statusClass = 'badge-pending';
        if (status === 'Working') statusClass = 'badge-working';
        if (status === 'Completed') statusClass = 'badge-completed';
        if (status === 'Pending') statusClass = 'badge-onhold';
        if (status === 'Rework') statusClass = 'badge-rejected';

        let deadlineDisplay = task.deadline;
        if (task.deadline === curDateStr) {
            deadlineDisplay = `<span class="text-danger fw-600"><i class="bi bi-exclamation-triangle-fill me-1"></i> Today</span>`;
        }

        tbody.innerHTML += `
            <tr>
                <td>
                    <div class="fw-600 text-primary">${task.title}</div>
                    <div class="font-12 text-tertiary">${task.desc}</div>
                </td>
                <td><strong>${task.assignedBy}</strong></td>
                <td>${deadlineDisplay}</td>
                <td><span class="status-badge ${pClass}">${task.priority}</span></td>
                <td><span class="status-badge ${statusClass}">${status}</span></td>
                <td style="text-align:right;">
                    <a href="task-details.html?id=${task.id}" class="btn btn-outline-primary btn-sm">Workspace &rarr;</a>
                </td>
            </tr>
        `;
    });
}

function initFilters() {
    document.getElementById('taskFilterSearch').addEventListener('input', renderTasksList);
    document.getElementById('taskFilterPriority').addEventListener('change', renderTasksList);
    document.getElementById('taskFilterStatus').addEventListener('change', renderTasksList);
}

renderTasksList();
initFilters();
document.addEventListener('datechange', renderTasksList);
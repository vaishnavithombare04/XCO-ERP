/**
 * XtrazCon IT ERP - FREELANCER TASKS CONTROLLER (tasks.js)
 */

function renderTasksList() {
    const tbody = document.getElementById('sprintsTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    const db = window.mockDB || { tasks: [] };
    const freelancerTasks = db.tasks.filter(t => t.assignee === "Rohan Sharma");

    const searchVal = document.getElementById('taskFilterSearch').value.toLowerCase();
    const priorityVal = document.getElementById('taskFilterPriority').value;
    const statusVal = document.getElementById('taskFilterStatus').value;

    const curDate = getActiveDate();
    const curDateStr = formatLocalDate(curDate);

    let filtered = freelancerTasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchVal) || task.desc.toLowerCase().includes(searchVal) || task.id.toLowerCase().includes(searchVal);
        const matchesPriority = !priorityVal || task.priority === priorityVal;
        const matchesStatus = !statusVal || task.status === statusVal;
        return matchesSearch && matchesPriority && matchesStatus;
    });

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center text-muted py-4">No matching tasks allocated.</td></tr>`;
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
        if (status === 'Hold') statusClass = 'badge-rejected';
        if (status === 'Overdue') statusClass = 'badge-overdue';

        let deadlineDisplay = task.deadline;
        if (task.deadline === curDateStr) {
            deadlineDisplay = `<span class="text-danger fw-600"><i class="bi bi-exclamation-triangle-fill me-1"></i> Today</span>`;
        } else if (new Date(task.deadline) < curDate && status !== 'Completed') {
            deadlineDisplay = `<span class="text-danger fw-600">${task.deadline} (Overdue)</span>`;
            if (task.status !== 'Hold') {
                task.status = 'Overdue';
                statusClass = 'badge-overdue';
            }
        }

        tbody.innerHTML += `
            <tr style="cursor: pointer;" onclick="window.location.href='task-details.html?id=${task.id}'">
                <td>
                    <div class="fw-600 text-primary">${task.title}</div>
                    <div class="font-12 text-tertiary">${task.desc}</div>
                    <small class="text-tertiary" style="font-size:10px;">ID: ${task.id}</small>
                </td>
                <td><strong>${task.assignedBy}</strong></td>
                <td>${deadlineDisplay}</td>
                <td><span class="status-badge ${pClass}">${task.priority}</span></td>
                <td><span class="status-badge ${statusClass}">${task.status}</span></td>
                <td style="text-align:right;" onclick="event.stopPropagation();">
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

function initCreateTaskForm() {
    const form = document.getElementById('frmCreateTask');
    if (!form) return;

    // Set default date to active date + 3 days
    const activeDate = getActiveDate();
    const futureDate = new Date(activeDate);
    futureDate.setDate(futureDate.getDate() + 3);
    const dateInput = document.getElementById('taskDueDate');
    if (dateInput) {
        dateInput.value = formatLocalDate(futureDate);
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('taskTitle').value.trim();
        const desc = document.getElementById('taskDesc').value.trim();
        const priority = document.getElementById('taskPriority').value;
        const deadline = document.getElementById('taskDueDate').value;
        const status = document.getElementById('taskStatus').value;

        if (!title || !desc || !deadline) {
            showToast("Please fill in all inputs.", "error");
            return;
        }

        const db = window.mockDB;
        const taskId = `TSK-${Math.floor(100 + Math.random() * 900)}`;

        // Create new task structure
        db.tasks.unshift({
            id: taskId,
            title: title,
            desc: desc,
            assignee: "Rohan Sharma",
            assignedBy: "Sarah Chen",
            deadline: deadline,
            priority: priority,
            status: status,
            checkpoints: [
                { id: 1, text: "Initial Setup & Configuration", checked: false },
                { id: 2, text: "Core Logic Implementation", checked: false },
                { id: 3, text: "Code Quality Check & Review", checked: false }
            ],
            comments: []
        });

        // Add notification
        db.notifications.unshift({
            id: `NTF-${Math.floor(100 + Math.random() * 900)}`,
            type: "tasks",
            message: `New task added: ${title}`,
            time: "Just now"
        });

        // Log audit
        window.logAudit("Rohan Sharma", "Tasks", "Create Task", `Created new task ${taskId}: ${title}`);

        // Save
        window.saveMockDB();

        // Reset
        form.reset();
        if (dateInput) {
            dateInput.value = formatLocalDate(futureDate);
        }

        // Hide Bootstrap modal
        const modalEl = document.getElementById('createTaskModal');
        const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
        if (modal) {
            modal.hide();
        }

        renderTasksList();
        showToast(`Task ${taskId} created successfully!`, "success");
    });
}

// Global script load
document.addEventListener('DOMContentLoaded', () => {
    renderTasksList();
    initFilters();
    initCreateTaskForm();
    document.addEventListener('datechange', () => {
        renderTasksList();
        const dateInput = document.getElementById('taskDueDate');
        if (dateInput) {
            const activeDate = getActiveDate();
            const futureDate = new Date(activeDate);
            futureDate.setDate(futureDate.getDate() + 3);
            dateInput.value = formatLocalDate(futureDate);
        }
    });
});
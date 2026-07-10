/**
 * XtrazCon IT ERP - INTERN TASK DETAILS CONTROLLER (task-details.js)
 */
const internTasks = [
    { id: "INT-TSK-001", title: "SEO Submission", desc: "Perform 50 directory submissions and log progress.", assignedBy: "Alex Rivera", deadline: "2026-07-08", priority: "High", status: "Working" },
    { id: "INT-TSK-002", title: "On-Page SEO Optimization", desc: "Optimize meta tags and headers for landing pages.", assignedBy: "Alex Rivera", deadline: "2026-07-12", priority: "Medium", status: "Pending" },
    { id: "INT-TSK-003", title: "Weekly SEO Analytics Report", desc: "Generate search traffic and keyword rankings report.", assignedBy: "Alex Rivera", deadline: "2026-07-06", priority: "Low", status: "Completed" },
    { id: "INT-TSK-004", title: "Keyword Density Audit", desc: "Audit target pages for search density metrics.", assignedBy: "Alex Rivera", deadline: "2026-07-09", priority: "High", status: "Rework" }
];

function renderTaskDetails() {
    const params = new URLSearchParams(window.location.search);
    const taskId = params.get('id') || "INT-TSK-001";
    const task = internTasks.find(t => t.id === taskId);

    if (!task) {
        showToast("Task deliverable record not found.", "error");
        return;
    }

    document.getElementById('lblTaskTitle').innerText = task.title;
    document.getElementById('lblTaskDesc').innerText = task.desc;
    document.getElementById('lblTaskDeadline').innerText = task.deadline;
    document.getElementById('lblTaskPriority').innerText = task.priority;
    document.getElementById('lblTaskAssignedBy').innerText = task.assignedBy;
    
    const statusSelect = document.getElementById('taskStatusSelect');
    if (statusSelect) {
        statusSelect.value = task.status;
    }

    const curDateStr = formatLocalDate(getActiveDate());
    const warningLabel = document.getElementById('taskDeadlineWarning');
    if (warningLabel) {
        if (task.deadline === curDateStr) {
            warningLabel.style.display = 'block';
            warningLabel.innerText = "Task deadline is today! Please submit work deliverables immediately.";
        } else if (curDateStr > task.deadline) {
            warningLabel.style.display = 'block';
            warningLabel.className = "alert alert-danger font-12 p-2 mb-3";
            warningLabel.innerText = "Overdue: this task deadline has expired.";
        } else {
            warningLabel.style.display = 'none';
        }
    }
}

const statusForm = document.getElementById('taskStatusForm');
if (statusForm) {
    statusForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const select = document.getElementById('taskStatusSelect');
        showToast(`Task status successfully updated to: ${select.value}`, "success");
    });
}

const workForm = document.getElementById('taskWorkSubmissionForm');
if (workForm) {
    workForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast("Proof of work deliverable links submitted successfully!", "success");
        workForm.reset();
    });
}

renderTaskDetails();
document.addEventListener('datechange', renderTaskDetails);
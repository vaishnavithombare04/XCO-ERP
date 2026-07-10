/**
 * XtrazCon IT ERP - FREELANCER TASK DETAILS WORKSPACE CONTROLLER (task-details.js)
 */

let activeTaskId = "TSK-001";
let activeTask = null;

const defaultComments = {
    "TSK-001": [
        { author: "Sarah Chen", time: "1 day ago", body: "Please ensure the sidebar is collapsible and responds cleanly to screen size changes." },
        { author: "Rohan Sharma", time: "18 hrs ago", body: "Sure, Sarah! I am building it on Bootstrap 5 grids and testing for mobile screens today." }
    ],
    "TSK-002": [
        { author: "Sarah Chen", time: "2 days ago", body: "Ensure freelancers can insert arbitrary hours and descriptions when generating invoices." }
    ]
};

// Initialize comments in local storage if not already there
let taskComments = JSON.parse(localStorage.getItem('erp_task_comments')) || defaultComments;

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function loadTaskDetails() {
    const id = getQueryParam('id') || "TSK-001";
    activeTaskId = id;

    const db = window.mockDB || { tasks: [] };
    activeTask = db.tasks.find(t => t.id === id);

    if (!activeTask) {
        document.querySelector('.main-content').innerHTML = `
            <div class="alert alert-danger p-4 text-center">
                <h4>Task Not Found</h4>
                <p>The specified task ID does not exist or you do not have permission to access it.</p>
                <a href="tasks.html" class="btn btn-primary mt-2">Return to Tasks Workspace</a>
            </div>
        `;
        return;
    }

    // Set UI labels
    document.getElementById('taskTitleLabel').innerText = activeTask.title;
    document.getElementById('taskIdLabel').innerText = activeTask.id;
    document.getElementById('taskAssignerLabel').innerText = activeTask.assignedBy;
    document.getElementById('taskDescriptionLabel').innerText = activeTask.desc;
    document.getElementById('taskDueDateLabel').innerText = activeTask.deadline;
    
    // Priority badge
    let pBadge = `<span class="status-badge badge-pending">${activeTask.priority}</span>`;
    if (activeTask.priority === 'High') pBadge = `<span class="status-badge badge-overdue">${activeTask.priority}</span>`;
    if (activeTask.priority === 'Medium') pBadge = `<span class="status-badge badge-onhold">${activeTask.priority}</span>`;
    document.getElementById('taskPriorityLabel').innerHTML = pBadge;

    // Status badge
    let statusClass = 'badge-pending';
    if (activeTask.status === 'Working') statusClass = 'badge-working';
    if (activeTask.status === 'Completed') statusClass = 'badge-completed';
    if (activeTask.status === 'Pending') statusClass = 'badge-onhold';
    if (activeTask.status === 'Hold') statusClass = 'badge-rejected';
    if (activeTask.status === 'Overdue') statusClass = 'badge-overdue';
    
    document.getElementById('taskStatusLabel').innerHTML = `<span class="status-badge ${statusClass}">${activeTask.status}</span>`;

    // Render Checklist
    renderChecklist();

    // Render Comments
    renderComments();

    // Fill inputs if completed
    const submitForm = document.getElementById('frmSubmitTask');
    if (activeTask.status === 'Completed') {
        const submissionLinkInput = document.getElementById('txtSubmissionLink');
        const submissionNotesInput = document.getElementById('txtSubmissionNotes');
        const report = db.reports.find(r => r.task === activeTask.title);
        
        if (report) {
            submissionLinkInput.value = report.link;
            submissionNotesInput.value = report.work_done;
        }
        
        submissionLinkInput.disabled = true;
        submissionNotesInput.disabled = true;
        document.getElementById('btnSubmitWork').disabled = true;
        document.getElementById('btnSubmitWork').innerText = "Deliverable Submitted";
    }
}

function renderChecklist() {
    const listBody = document.getElementById('taskChecklistBody');
    if (!listBody) return;

    listBody.innerHTML = '';

    const checkStates = JSON.parse(localStorage.getItem(`chk_state_${activeTaskId}`)) || [
        { id: "step1", label: "Draft responsive mobile wireframe layouts", checked: true },
        { id: "step2", label: "Implement CSS classes for glassmorphism and grids", checked: false },
        { id: "step3", label: "Hook theme variables and listener functions in global controllers", checked: false },
        { id: "step4", label: "Submit Github Pull Request and update report room log", checked: false }
    ];

    checkStates.forEach((step, idx) => {
        const checkedAttr = step.checked ? 'checked' : '';
        const itemEl = document.createElement('div');
        itemEl.className = 'form-check d-flex align-items-center gap-2 p-2 border rounded';
        itemEl.innerHTML = `
            <input class="form-check-input ms-1" type="checkbox" id="chkStep_${idx}" ${checkedAttr}>
            <label class="form-check-label font-13 text-secondary" for="chkStep_${idx}">${step.label}</label>
        `;
        
        // Listen to changes
        itemEl.querySelector('input').addEventListener('change', (e) => {
            checkStates[idx].checked = e.target.checked;
            localStorage.setItem(`chk_state_${activeTaskId}`, JSON.stringify(checkStates));
            showToast(`Checklist step updated!`, "success");
        });

        listBody.appendChild(itemEl);
    });
}

function renderComments() {
    const container = document.getElementById('commentsHistoryList');
    if (!container) return;

    container.innerHTML = '';
    const list = taskComments[activeTaskId] || [];

    if (list.length === 0) {
        container.innerHTML = `<p class="font-12 text-muted text-center py-3 mb-0">No comments posted yet.</p>`;
        return;
    }

    list.forEach(c => {
        let avatarBg = 'var(--accent-blue)';
        if (c.author === 'Sarah Chen') avatarBg = 'var(--accent-purple)';
        const initial = c.author.split(' ').map(n => n[0]).join('');

        container.innerHTML += `
            <div class="timeline-comment mb-3">
                <div class="d-flex align-items-center gap-2 mb-1">
                    <div class="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold" style="width:24px; height:24px; font-size:10px; background:${avatarBg};">${initial}</div>
                    <strong class="font-12 text-primary">${c.author}</strong>
                    <span class="font-10 text-tertiary" style="margin-left:auto;">${c.time}</span>
                </div>
                <div class="font-12 text-secondary">${c.body}</div>
            </div>
        `;
    });
}

function initCommentForm() {
    const form = document.getElementById('frmComment');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('txtComment');
        const text = input.value.trim();
        if (!text) return;

        if (!taskComments[activeTaskId]) {
            taskComments[activeTaskId] = [];
        }

        taskComments[activeTaskId].push({
            author: "Rohan Sharma",
            time: "Just now",
            body: text
        });

        localStorage.setItem('erp_task_comments', JSON.stringify(taskComments));
        input.value = '';
        renderComments();
        showToast("Comment posted!", "success");
    });
}

function initSubmissionForm() {
    const form = document.getElementById('frmSubmitTask');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (activeTask.status === 'Completed') return;

        const link = document.getElementById('txtSubmissionLink').value.trim();
        const notes = document.getElementById('txtSubmissionNotes').value.trim();

        if (!link || !notes) return;

        const db = window.mockDB;
        
        // 1. Update task status
        const dbTask = db.tasks.find(t => t.id === activeTaskId);
        if (dbTask) {
            dbTask.status = "Completed";
        }

        // 2. Add report uploader log
        const reportId = `REP-${Math.floor(100 + Math.random() * 900)}`;
        const curDateStr = formatLocalDate(getActiveDate());
        db.reports.unshift({
            id: reportId,
            task: activeTask.title,
            work_done: notes,
            time_spent: 8,
            date: curDateStr,
            status: "Submitted",
            link: link
        });

        // 3. Add notification
        db.notifications.unshift({
            id: `NTF-${Math.floor(100 + Math.random() * 900)}`,
            type: "feedback",
            message: `Submitted deliverables for task: ${activeTask.title}`,
            time: "Just now"
        });

        // 4. Log Audit Log
        window.logAudit("Rohan Sharma", "Workspace", "Submit Deliverable", `Submitted staging link for task ${activeTaskId}: ${link}`);

        // Save
        window.saveMockDB();

        // Refresh details
        loadTaskDetails();
        showToast("Sprint deliverables submitted! Task marked as Completed.", "success");
    });
}

// Global script load
document.addEventListener('DOMContentLoaded', () => {
    loadTaskDetails();
    initCommentForm();
    initSubmissionForm();
    document.addEventListener('datechange', () => {
        loadTaskDetails();
    });
});
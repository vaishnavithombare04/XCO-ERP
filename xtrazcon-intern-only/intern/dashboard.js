/**
 * ==========================================================================
 * XtrazCon IT ERP - INTERN DASHBOARD OVERVIEW (dashboard.js)
 * ==========================================================================
 */

const activeUser = {
    name: "Karan",
    role: "Intern",
    team: "Team A → Group A1",
    department: "SEO",
    mentor: "Alex Rivera"
};

// Mock Intern data (No budgets/financial data)
const internTasks = [
    { id: "INT-TSK-001", title: "SEO Submission", desc: "Perform 50 directory submissions and log progress.", assignedBy: "Alex Rivera", deadline: "2026-07-08", priority: "High", status: "Working" },
    { id: "INT-TSK-002", title: "On-Page SEO Optimization", desc: "Optimize meta tags and headers for client site.", assignedBy: "Alex Rivera", deadline: "2026-07-12", priority: "Medium", status: "Pending" },
    { id: "INT-TSK-003", title: "Weekly SEO Analytics Report", desc: "Generate search traffic and keyword rankings report.", assignedBy: "Alex Rivera", deadline: "2026-07-06", priority: "Low", status: "Completed" },
    { id: "INT-TSK-004", title: "Keyword Density Audit", desc: "Audit target pages for search density metrics.", assignedBy: "Alex Rivera", deadline: "2026-07-09", priority: "High", status: "Rework" }
];

const internCourses = [
    { title: "SEO Link Building Techniques", progress: 75 },
    { title: "Advanced Keyword Research & Mapping", progress: 60 }
];

const notifications = [
    { id: "NTF-001", type: "tasks", message: "Mentor Alex Rivera assigned task: SEO Submission", time: "10m ago" },
    { id: "NTF-002", type: "system", message: "Late attendance recorded for July 6 (10:15 AM check-in)", time: "3d ago" },
    { id: "NTF-003", type: "feedback", message: "Weekly SEO report reviewed by Alex: 'Good work on Acme links!'", time: "4h ago" }
];
updateProfileHeaders();
    renderTasksSummary();
    renderCoursesProgress();
    renderNotifications();
    setupSecurityTester();

    // Listen to global datechange events
    document.addEventListener('datechange', () => {
        updateProfileHeaders();
        renderTasksSummary();
    });

function setupSecurityTester() {
    const btnVerify = document.getElementById('btnRunSecurityTests');
    if (!btnVerify) return;

    btnVerify.addEventListener('click', () => {
        btnVerify.disabled = true;
        btnVerify.innerHTML = '<span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span> Auditing...';
        
        // Clear previous states
        const keys = ['Tasks', 'Payroll', 'Delete', 'Reports'];
        keys.forEach(k => {
            const badge = document.getElementById(`testBadge${k}`);
            const desc = document.getElementById(`testDesc${k}`);
            if (badge) {
                badge.innerText = 'Testing...';
                badge.className = 'security-test-badge idle';
            }
        });
        
        setTimeout(() => {
            const results = window.runFrontendSecurityTests();
            
            setTimeout(() => {
                setTestResult('Tasks', results.viewTasks);
                setTimeout(() => {
                    setTestResult('Payroll', results.accessPayroll);
                    setTimeout(() => {
                        setTestResult('Delete', results.deleteRecord);
                        setTimeout(() => {
                            setTestResult('Reports', results.submitReport);
                            btnVerify.disabled = false;
                            btnVerify.innerHTML = '<i class="bi bi-shield-check text-success"></i> Audited';
                            showToast("Security audit passed! All permission restrictions validated.", "success");
                        }, 250);
                    }, 250);
                }, 250);
            }, 250);
        }, 800);
    });
}

function setTestResult(key, res) {
    const badge = document.getElementById(`testBadge${key}`);
    const desc = document.getElementById(`testDesc${key}`);
    if (badge && desc) {
        badge.innerText = res.status;
        badge.className = `security-test-badge ${res.status.toLowerCase()}`;
        desc.innerHTML = `<strong>${res.name}:</strong> ${res.details}`;
    }
}

function updateProfileHeaders() {
    const curDate = getActiveDate();
    const curDateStr = formatLocalDate(curDate);

    document.getElementById('headerUserName').innerText = activeUser.name;
    const headerAvatar = document.getElementById('headerUserAvatar');
    if (headerAvatar) {
        headerAvatar.innerText = activeUser.name.split(' ').map(n => n[0]).join('');
    }
    document.getElementById('sidebarRoleLabel').innerText = `${activeUser.role} (${activeUser.department})`;

    const welcomeSubtitle = document.getElementById('userWelcomeSubtitle');
    if (welcomeSubtitle) {
        welcomeSubtitle.innerHTML = `${activeUser.role} · ${activeUser.department} | Assigned Mentor: <strong>${activeUser.mentor}</strong>`;
    }

    // Check attendance status for the active selected date
    const db = window.mockDB || { attendance: [] };
    const dayAttendance = db.attendance.find(att => att.date === curDateStr);
    const lateAlert = document.getElementById('lateAttendanceAlertContainer');
    if (lateAlert) {
        if (dayAttendance && dayAttendance.status === 'Late') {
            lateAlert.style.display = 'block';
        } else {
            lateAlert.style.display = 'none';
        }
    }

    // Calculate internship program duration progress
    const startDate = new Date('2026-06-24');
    const diffTime = curDate - startDate;
    const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1);
    const totalDays = 90;
    const percent = Math.min(100, Math.max(0, Math.round((diffDays / totalDays) * 1000) / 10));
    const percentLabel = document.getElementById('durationPercentLabel');
    const percentFill = document.getElementById('durationPercentFill');
    if (percentLabel && percentFill) {
        percentLabel.innerText = `${percent}% (Day ${diffDays} of ${totalDays})`;
        percentFill.style.width = `${percent}%`;
    }

    // Calculate dynamic stats based on selected calendar date
    let doneCount = 0;
    let pendingCount = 0;

    internTasks.forEach(task => {
        if (task.status === 'Completed') {
            if (curDateStr >= task.deadline) {
                doneCount++;
            } else {
                pendingCount++; // Before its completed date, it counts as pending
            }
        } else {
            pendingCount++;
        }
    });

    document.getElementById('kpiTotalTasks').innerText = `${internTasks.length} Tasks`;
    document.getElementById('kpiDonePending').innerText = `${doneCount} / ${pendingCount} Tasks`;

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('serverDateLabel').innerHTML = `<i class="bi bi-calendar3 me-2"></i> ` + curDate.toLocaleDateString('en-US', options);
}

function renderTasksSummary() {
    const tbody = document.getElementById('myTasksTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';
    const curDateStr = formatLocalDate(getActiveDate());

    // Show exactly one active sprint record on the dashboard overview
    internTasks.slice(0, 1).forEach(task => {
        let pClass = 'badge-pending';
        if (task.priority === 'High') pClass = 'badge-overdue';
        if (task.priority === 'Medium') pClass = 'badge-onhold';
        
        let status = task.status;
        let statusClass = 'badge-pending';
        if (status === 'Working') statusClass = 'badge-working';
        if (status === 'Completed') statusClass = 'badge-completed';
        if (status === 'Pending') statusClass = 'badge-onhold';
        if (status === 'Rework') statusClass = 'badge-rejected';

        tbody.innerHTML += `
            <tr>
                <td>
                    <div class="fw-600 text-primary">${task.title}</div>
                    <div class="font-12 text-tertiary">${task.desc}</div>
                </td>
                <td>${task.deadline}</td>
                <td><span class="status-badge ${pClass}">${task.priority}</span></td>
                <td><span class="status-badge ${statusClass}">${status}</span></td>
            </tr>
        `;
    });
}

function renderCoursesProgress() {
    const container = document.getElementById('courseProgressBody');
    if (!container) return;

    container.innerHTML = '';

    // Show exactly one course progress record on the dashboard overview
    internCourses.slice(0, 1).forEach(c => {
        container.innerHTML += `
            <div class="col-12">
                <div class="p-3 border rounded bg-card">
                    <div class="d-flex justify-content-between font-12 fw-600 mb-1">
                        <span class="text-primary">${c.title}</span>
                        <span style="color:var(--accent-orange);">${c.progress}%</span>
                    </div>
                    <div class="kpi-progress-bar">
                        <div class="kpi-progress-fill" style="width: ${c.progress}%;"></div>
                    </div>
                </div>
            </div>
        `;
    });
}

function renderNotifications() {
    const container = document.getElementById('notificationsQueueBody');
    const badge = document.getElementById('notifBadge');
    if (!container) return;

    container.innerHTML = '';

    if (badge) {
        badge.innerText = notifications.length;
        badge.style.display = notifications.length > 0 ? 'inline-block' : 'none';
    }

    notifications.forEach(n => {
        let iconClass = 'bi-bell-fill text-primary';
        if (n.type === 'tasks') iconClass = 'bi-check-square-fill text-warning';
        if (n.type === 'feedback') iconClass = 'bi-chat-left-heart-fill text-success';

        container.innerHTML += `
            <div class="d-flex align-items-start gap-2" style="font-size:12px; border-bottom: 1px solid var(--border-color); padding-bottom:8px;">
                <i class="bi ${iconClass}" style="margin-top:2px;"></i>
                <div style="flex:1;">
                    <div class="text-secondary">${n.message}</div>
                    <small class="text-tertiary" style="font-size:10px;">${n.time}</small>
                </div>
            </div>
        `;
    });
}
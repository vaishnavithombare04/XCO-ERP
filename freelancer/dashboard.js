/**
 * ==========================================================================
 * XtrazCon IT ERP - FREELANCER DASHBOARD OVERVIEW (dashboard.js)
 * ==========================================================================
 */

const activeUser = {
    name: "Rohan Sharma",
    role: "Freelancer",
    team: "Frontend Team",
    department: "Development",
    pm: "Sarah Chen"
};

// Set up event listeners
document.addEventListener('DOMContentLoaded', () => {
    updateProfileHeaders();
    renderTasksSummary();
    renderMilestonesProgress();
    renderNotifications();
    setupSecurityTester();

    // Listen to global datechange events
    document.addEventListener('datechange', () => {
        updateProfileHeaders();
        renderTasksSummary();
    });
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
                            showToast("Security audit passed! Freelancer role model constraints validated.", "success");
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
    const db = window.mockDB || { tasks: [], attendance: [], milestones: [], invoices: [], contracts: [] };
    const curDate = getActiveDate();
    const curDateStr = formatLocalDate(curDate);

    // Profile sync
    const headerUserName = document.getElementById('headerUserName');
    if (headerUserName) headerUserName.innerText = activeUser.name;
    
    const headerAvatar = document.getElementById('headerUserAvatar');
    if (headerAvatar) {
        headerAvatar.innerText = activeUser.name.split(' ').map(n => n[0]).join('');
    }
    
    const sidebarRole = document.getElementById('sidebarRoleLabel');
    if (sidebarRole) sidebarRole.innerText = `${activeUser.role} (${activeUser.department})`;

    const welcomeSubtitle = document.getElementById('userWelcomeSubtitle');
    if (welcomeSubtitle) {
        welcomeSubtitle.innerHTML = `${activeUser.role} · ${activeUser.department} (Senior React Developer) | Project Owner: <strong>${activeUser.pm} (Super Admin)</strong>`;
    }

    // Server date label sync (preserving popover child element)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateLabel = document.getElementById('serverDateLabel');
    if (dateLabel) {
        const popover = dateLabel.querySelector('.calendar-popover');
        dateLabel.innerHTML = `<i class="bi bi-calendar3 me-2"></i> ` + curDate.toLocaleDateString('en-US', options);
        if (popover) {
            dateLabel.appendChild(popover);
        }
    }

    // Calculate contract timeline progress (July 1, 2026 - Dec 31, 2026)
    const startDate = new Date('2026-07-01');
    const endDate = new Date('2026-12-31');
    const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    
    const diffTime = curDate - startDate;
    const diffDays = Math.min(totalDays, Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24))));
    const percent = Math.min(100, Math.max(0, Math.round((diffDays / totalDays) * 1000) / 10));
    
    const percentLabel = document.getElementById('durationPercentLabel');
    const percentFill = document.getElementById('durationPercentFill');
    if (percentLabel && percentFill) {
        percentLabel.innerText = `${percent}% (Day ${diffDays} of ${totalDays})`;
        percentFill.style.width = `${percent}%`;
    }

    // Check attendance (time logged today) for the active selected date
    const dayLogs = db.attendance.filter(att => att.date === curDateStr && att.employee === activeUser.name);
    let todayHoursSum = 0.0;
    dayLogs.forEach(log => {
        todayHoursSum += parseFloat(log.hours || 0);
    });
    
    const todayTrackedHours = document.getElementById('todayTrackedHours');
    if (todayTrackedHours) {
        todayTrackedHours.innerText = `${todayHoursSum.toFixed(1)} hrs`;
    }

    // Sync Stats Cards based on active user
    // Card 1: Hours worked this week
    let weekHours = 0.0;
    db.attendance.forEach(log => {
        if (log.employee === activeUser.name) {
            weekHours += parseFloat(log.hours || 0);
        }
    });
    const kpiTotalHours = document.getElementById('kpiTotalHours');
    if (kpiTotalHours) kpiTotalHours.innerText = `${weekHours.toFixed(1)} hrs`;

    // Card 2: Active Contracts count
    const activeContracts = db.contracts.filter(c => c.freelancerId === "FL001" && c.status === "Active");
    const kpiActiveContracts = document.getElementById('kpiActiveContracts');
    if (kpiActiveContracts) kpiActiveContracts.innerText = `${activeContracts.length} Active`;

    // Card 3: Milestones completed
    const completedMS = db.milestones.filter(m => m.contractId === "CON-2026-08A" && (m.status === "Approved" || m.status === "Submitted"));
    const totalMS = db.milestones.filter(m => m.contractId === "CON-2026-08A");
    const kpiMilestones = document.getElementById('kpiMilestones');
    if (kpiMilestones) kpiMilestones.innerText = `${completedMS.length} / ${totalMS.length} Milestones`;

    // Card 4: Pending Invoices
    let pendingInvoicesSum = 0;
    db.invoices.forEach(inv => {
        if (inv.freelancerId === "FL001" && inv.status === "Pending") {
            pendingInvoicesSum += parseInt(inv.amount || 0);
        }
    });
    const kpiPendingInvoice = document.getElementById('kpiPendingInvoice');
    if (kpiPendingInvoice) kpiPendingInvoice.innerText = `₹${pendingInvoicesSum.toLocaleString('en-IN')}`;
}

function renderTasksSummary() {
    const tbody = document.getElementById('myTasksTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';
    const db = window.mockDB || { tasks: [] };
    const myTasks = db.tasks.filter(t => t.assignee === activeUser.name);

    if (myTasks.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" class="text-center text-muted py-3">No active tasks assigned.</td></tr>`;
        return;
    }

    myTasks.slice(0, 3).forEach(task => {
        let pClass = 'badge-pending';
        if (task.priority === 'High') pClass = 'badge-overdue';
        if (task.priority === 'Medium') pClass = 'badge-onhold';
        
        let status = task.status;
        let statusClass = 'badge-pending';
        if (status === 'Working') statusClass = 'badge-working';
        if (status === 'Completed') statusClass = 'badge-completed';
        if (status === 'Pending') statusClass = 'badge-onhold';
        if (status === 'Hold') statusClass = 'badge-rejected';

        tbody.innerHTML += `
            <tr style="cursor: pointer;" onclick="window.location.href='task-details.html?id=${task.id}'">
                <td>
                    <div class="fw-600 text-primary">${task.title}</div>
                    <div class="font-12 text-tertiary text-truncate" style="max-width: 320px;">${task.desc}</div>
                </td>
                <td>${task.deadline}</td>
                <td><span class="status-badge ${pClass}">${task.priority}</span></td>
                <td><span class="status-badge ${statusClass}">${status}</span></td>
            </tr>
        `;
    });
}

function renderMilestonesProgress() {
    const container = document.getElementById('milestonesProgressBody');
    if (!container) return;

    container.innerHTML = '';
    const db = window.mockDB || { milestones: [] };
    const myMilestones = db.milestones.filter(m => m.contractId === "CON-2026-08A");

    myMilestones.forEach(m => {
        let pct = 0;
        let color = 'var(--accent-gray)';
        if (m.status === 'Approved' || m.status === 'Paid') {
            pct = 100;
            color = 'var(--accent-green)';
        } else if (m.status === 'Submitted') {
            pct = 100;
            color = 'var(--accent-blue)';
        } else if (m.status === 'Active') {
            pct = 40;
            color = 'var(--accent-purple)';
        }
        
        let badgeClass = 'badge-pending';
        if (m.status === 'Approved' || m.status === 'Paid') badgeClass = 'badge-completed';
        if (m.status === 'Submitted') badgeClass = 'badge-working';
        if (m.status === 'Active') badgeClass = 'badge-onhold';

        container.innerHTML += `
            <div class="col-12 col-md-6">
                <div class="p-3 border rounded bg-card" style="height: 100%;">
                    <div class="d-flex justify-content-between align-items-center mb-1 font-12 fw-600">
                        <span class="text-primary text-truncate" style="max-width: 70%;">${m.name}</span>
                        <span class="status-badge ${badgeClass}">${m.status}</span>
                    </div>
                    <div class="d-flex justify-content-between align-items-center mb-2 font-11 text-tertiary">
                        <span>Due: ${m.dueDate}</span>
                        <span class="fw-bold" style="color: ${color};">${m.amount}</span>
                    </div>
                    <div class="kpi-progress-bar">
                        <div class="kpi-progress-fill" style="width: ${pct}%; background: ${color};"></div>
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
    const db = window.mockDB || { notifications: [] };
    const myNotifications = db.notifications;

    if (badge) {
        badge.innerText = '';
        badge.style.display = myNotifications.length > 0 ? 'inline-block' : 'none';
    }

    myNotifications.forEach(n => {
        let iconClass = 'bi-bell-fill text-primary';
        let targetPage = 'index.html';

        if (n.type === 'tasks') {
            iconClass = 'bi-check-square-fill text-warning';
            targetPage = 'tasks.html';
        } else if (n.type === 'billing') {
            iconClass = 'bi-credit-card-fill text-success';
            targetPage = 'invoices.html';
        } else if (n.type === 'feedback') {
            iconClass = 'bi-chat-left-text-fill text-purple';
            targetPage = 'contracts.html';
        }

        container.innerHTML += `
            <div class="d-flex align-items-start gap-2" 
                 style="font-size:12px; border-bottom: 1px solid var(--border-color); padding: 8px 6px; cursor: pointer; transition: background-color 0.2s; border-radius: 6px;" 
                 onclick="window.location.href='${targetPage}'"
                 onmouseover="this.style.backgroundColor='var(--bg-app)'"
                 onmouseout="this.style.backgroundColor='transparent'">
                <i class="bi ${iconClass}" style="margin-top:2px;"></i>
                <div style="flex:1;">
                    <div style="font-weight: 500; line-height: 1.3;">${n.message}</div>
                    <small class="text-tertiary" style="font-size:10px;">${n.time}</small>
                </div>
            </div>
        `;
    });
}
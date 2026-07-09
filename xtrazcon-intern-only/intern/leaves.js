/**
 * XtrazCon IT ERP - INTERN LEAVES CONTROLLER (leaves.js)
 */
let myLeaves = JSON.parse(localStorage.getItem('intern_leaves')) || [
    { id: "LEV001", type: "Sick Leave", start: "2026-07-18", end: "2026-07-18", reason: "Regular health checkup", status: "Pending" }
];

function saveLeavesData() {
    localStorage.setItem('intern_leaves', JSON.stringify(myLeaves));
}

function initDefaultDates() {
    const todayStr = typeof formatLocalDate === 'function' ? formatLocalDate(new Date()) : new Date().toISOString().split('T')[0];
    const startInput = document.getElementById('leaveStart');
    const endInput = document.getElementById('leaveEnd');
    if (startInput) startInput.value = todayStr;
    if (endInput) endInput.value = todayStr;
}

function renderLeavesList() {
    const tbody = document.getElementById('leavesLogsBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    myLeaves.forEach(log => {
        let statusBadge = 'badge-pending';
        if (log.status === 'Approved') statusBadge = 'badge-approved';
        if (log.status === 'Rejected') statusBadge = 'badge-overdue';

        tbody.innerHTML += `
            <tr>
                <td><strong>${log.type}</strong></td>
                <td>${log.start}</td>
                <td>${log.end}</td>
                <td><small class="text-secondary">${log.reason}</small></td>
                <td><span class="status-badge ${statusBadge}">${log.status}</span></td>
            </tr>
        `;
    });
}

function handleLeaveRequest(e) {
    e.preventDefault();

    const type = document.getElementById('leaveType').value;
    const start = document.getElementById('leaveStart').value;
    const end = document.getElementById('leaveEnd').value;
    const reason = document.getElementById('leaveReason').value;

    if (!type || !start || !end || !reason) {
        showToast("Please fill in all leave request fields.", "error");
        return;
    }

    const newRequest = {
        id: `LEV00${myLeaves.length + 1}`,
        type,
        start,
        end,
        reason,
        status: 'Pending'
    };

    myLeaves.push(newRequest);
    saveLeavesData();
    showToast("Leave request submitted successfully! Pending review.", "success");
    document.getElementById('applyLeaveForm').reset();
    initDefaultDates();
    renderLeavesList();
}

initDefaultDates();
renderLeavesList();
const leaveForm = document.getElementById('applyLeaveForm');
if (leaveForm) {
    leaveForm.addEventListener('submit', handleLeaveRequest);
}
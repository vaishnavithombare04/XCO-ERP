/**
 * XtrazCon IT ERP - INTERN DAILY & WEEKLY REPORTS (reports.js)
 */
const defaultReports = [
    { type: 'Daily Work Report', date: '2026-07-08', task: 'SEO Submission', hours: '3.5', summary: 'Performed directory backlink creations and logged rankings progress.', status: 'Submitted' }
];

function loadReportsData() {
    const saved = JSON.parse(localStorage.getItem('intern_reports') || 'null');
    if (Array.isArray(saved) && saved.length) return saved;

    if (window.mockDB?.reports?.length) {
        return window.mockDB.reports.map(report => ({
            type: 'Daily Work Report',
            date: report.date,
            task: report.task,
            hours: report.time_spent,
            summary: report.work_done,
            status: report.status || 'Submitted'
        }));
    }

    return defaultReports;
}

let myReports = loadReportsData();

function saveReportsData() {
    localStorage.setItem('intern_reports', JSON.stringify(myReports));
}

function syncMockReport(report) {
    if (!window.mockDB?.reports) return;

    window.mockDB.reports.unshift({
        id: 'REP' + String(Date.now()).slice(-6),
        task: report.task || report.type,
        work_done: report.summary,
        time_spent: report.hours || '--',
        date: report.date,
        status: report.status || 'Submitted',
        link: ''
    });

    if (typeof window.saveMockDB === 'function') {
        window.saveMockDB();
    }
}

function initReportDates() {
    const todayStr = formatLocalDate(getActiveDate());
    const dateInput = document.getElementById('dwrDate');
    if (dateInput && !dateInput.value) dateInput.value = todayStr;
}

function getStatusClass(status) {
    if (status === 'Approved') return 'badge-approved';
    if (status === 'Pending Review') return 'badge-pending';
    return 'badge-approved';
}

function renderReportsHistory() {
    const tbody = document.getElementById('submissionsTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    if (!myReports.length) {
        tbody.innerHTML = '<tr><td colspan="3" class="text-center text-tertiary">No submissions found.</td></tr>';
        return;
    }

    myReports.forEach(report => {
        const type = report.type || 'Daily Work Report';
        const status = report.status || 'Submitted';
        tbody.innerHTML += '<tr>'
            + '<td><strong>' + type + '</strong><br><small class="text-secondary">' + (report.task || report.summary || '') + '</small></td>'
            + '<td>' + report.date + '</td>'
            + '<td><span class="status-badge ' + getStatusClass(status) + '">' + status + '</span></td>'
            + '</tr>';
    });
}

function handleDWRSubmit(e) {
    e.preventDefault();
    const date = document.getElementById('dwrDate').value;
    const task = document.getElementById('dwrTaskSelect').value;
    const hours = document.getElementById('dwrHours').value;
    const issues = document.getElementById('dwrIssues').value;
    const summary = document.getElementById('dwrSummary').value;

    if (!date || !task || !hours || !issues || !summary) {
        showToast('Please fill in all Daily Work Report fields.', 'error');
        return;
    }

    const report = {
        type: 'Daily Work Report',
        date,
        task,
        hours,
        issues,
        summary,
        status: 'Submitted'
    };

    myReports.unshift(report);
    saveReportsData();
    syncMockReport(report);
    showToast('Daily Work Report submitted successfully!', 'success');
    document.getElementById('submitDWRForm').reset();
    initReportDates();
    renderReportsHistory();
}

function handleWeeklySubmit(e) {
    e.preventDefault();
    const week = document.getElementById('weeklyWeekNum').value;
    const tasks = document.getElementById('weeklyTasksCompleted').value;
    const learnings = document.getElementById('weeklyLearnings').value;
    const challenges = document.getElementById('weeklyChallenges').value;
    const date = formatLocalDate(getActiveDate());

    if (!week || !tasks || !learnings || !challenges) {
        showToast('Please fill in all Weekly Report fields.', 'error');
        return;
    }

    const report = {
        type: 'Weekly Internship Report',
        date,
        task: 'Week ' + week,
        hours: '--',
        summary: tasks + ' | Learnings: ' + learnings + ' | Challenges: ' + challenges,
        status: 'Submitted'
    };

    myReports.unshift(report);
    saveReportsData();
    syncMockReport(report);
    showToast('Weekly Internship Report submitted successfully to Alex Rivera!', 'success');
    document.getElementById('submitWeeklyForm').reset();
    renderReportsHistory();
}

const dwrForm = document.getElementById('submitDWRForm');
if (dwrForm) {
    dwrForm.addEventListener('submit', handleDWRSubmit);
}

const weeklyForm = document.getElementById('submitWeeklyForm');
if (weeklyForm) {
    weeklyForm.addEventListener('submit', handleWeeklySubmit);
}

initReportDates();
renderReportsHistory();
document.addEventListener('datechange', () => {
    initReportDates();
});

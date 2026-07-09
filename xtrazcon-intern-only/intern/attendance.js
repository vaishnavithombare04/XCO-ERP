/**
 * XtrazCon IT ERP - INTERN ATTENDANCE & SHIFTS (attendance.js)
 */
const defaultAttendance = [
    { date: "2026-07-06", checkin: "10:15 AM", checkout: "07:05 PM", hours: "8.8h", status: "Late" },
    { date: "2026-07-07", checkin: "09:55 AM", checkout: "07:02 PM", hours: "9.1h", status: "Present" },
    { date: "2026-07-08", checkin: "10:02 AM", checkout: "07:01 PM", hours: "9.0h", status: "Present" }
];

const defaultWorklogs = [
    { date: "2026-07-08", task: "SEO Submission", hours: "3.5", desc: "Completed 50 directory submissions and logged progress." }
];

function loadAttendanceData() {
    const saved = JSON.parse(localStorage.getItem('intern_attendance') || 'null');
    if (Array.isArray(saved) && saved.length) return saved;

    if (window.mockDB?.attendance?.length) {
        return window.mockDB.attendance
            .filter(att => !att.employee || att.employee === 'Karan')
            .map(att => ({
                date: att.date,
                checkin: att.checkin || att.check_in,
                checkout: att.checkout || att.check_out || null,
                hours: att.hours || '--',
                status: att.status || 'Present'
            }));
    }

    return defaultAttendance;
}

function loadWorklogsData() {
    const saved = JSON.parse(localStorage.getItem('intern_worklogs') || 'null');
    if (Array.isArray(saved) && saved.length) return saved;

    if (window.mockDB?.reports?.length) {
        return window.mockDB.reports.map(report => ({
            date: report.date,
            task: report.task,
            hours: report.time_spent,
            desc: report.work_done
        }));
    }

    return defaultWorklogs;
}

let myAttendance = loadAttendanceData();
let myWorklogs = loadWorklogsData();

function saveAttendanceData() {
    localStorage.setItem('intern_attendance', JSON.stringify(myAttendance));
}
function saveWorklogsData() {
    localStorage.setItem('intern_worklogs', JSON.stringify(myWorklogs));
}

function calculateHours(checkin, checkout) {
    if (!checkin || !checkout) return '--';
    const start = new Date('2000-01-01 ' + checkin);
    const end = new Date('2000-01-01 ' + checkout);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return '--';
    const diffHours = Math.max(0, (end - start) / 36e5);
    return diffHours.toFixed(1) + 'h';
}

function initClock() {
    const clockLabel = document.getElementById('attendanceLiveTime');
    if (clockLabel) {
        const updateClock = () => {
            const now = new Date();
            clockLabel.innerText = now.toLocaleTimeString('en-US');
        };
        updateClock();
        setInterval(updateClock, 1000);
    }
    updateClockButtonState();
}

function updateClockButtonState() {
    const curDateStr = formatLocalDate(getActiveDate());
    const dayRecord = myAttendance.find(att => att.date === curDateStr);
    const clockBtn = document.getElementById('btnClockAction');
    const statusText = document.getElementById('todayCheckinStatusText');

    if (!clockBtn) return;

    clockBtn.disabled = false;
    if (!dayRecord) {
        clockBtn.innerText = 'Clock-in Shift Access';
        clockBtn.className = 'btn btn-warning btn-clock-in w-100 py-3 fw-bold';
        if (statusText) {
            statusText.innerText = 'Not Checked-In';
            statusText.className = 'status-badge badge-pending';
        }
    } else if (!dayRecord.checkout) {
        clockBtn.innerText = 'Clock-out Shift Access';
        clockBtn.className = 'btn btn-danger btn-clock-out w-100 py-3 fw-bold';
        if (statusText) {
            statusText.innerText = 'Checked-in (' + dayRecord.checkin + ') - ' + dayRecord.status;
            statusText.className = dayRecord.status === 'Late' ? 'status-badge badge-overdue' : 'status-badge badge-approved';
        }
    } else {
        clockBtn.innerText = 'Shift Completed';
        clockBtn.className = 'btn btn-secondary w-100 py-3 fw-bold';
        clockBtn.disabled = true;
        if (statusText) {
            statusText.innerText = 'Completed (' + dayRecord.checkin + ' - ' + dayRecord.checkout + ')';
            statusText.className = 'status-badge badge-completed';
        }
    }
}

function handleClockToggle() {
    const curDate = getActiveDate();
    const curDateStr = formatLocalDate(curDate);
    let dayRecord = myAttendance.find(att => att.date === curDateStr);

    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    if (!dayRecord) {
        const shiftStart = new Date(curDate);
        shiftStart.setHours(10, 15, 0, 0);

        const checkinTime = new Date(curDate);
        checkinTime.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());

        const isLate = checkinTime > shiftStart;
        const status = isLate ? 'Late' : 'Present';

        myAttendance.push({
            date: curDateStr,
            checkin: timeStr,
            checkout: null,
            hours: '--',
            status: status
        });
        saveAttendanceData();
        showToast('Clocked-in successfully at ' + timeStr + '. Status: ' + status, 'success');
        if (isLate) {
            showToast('Late warning logged: check-in was after the 10:15 AM grace threshold.', 'warning');
        }
    } else if (!dayRecord.checkout) {
        dayRecord.checkout = timeStr;
        dayRecord.hours = calculateHours(dayRecord.checkin, dayRecord.checkout);
        saveAttendanceData();
        showToast('Clocked-out successfully at ' + timeStr + '.', 'success');
    }

    updateClockButtonState();
    renderAttendanceHistory();
    document.dispatchEvent(new CustomEvent('datechange'));
}

function renderAttendanceHistory() {
    const tbody = document.getElementById('attendanceLogsBody');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (!myAttendance.length) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center text-tertiary">No attendance records found.</td></tr>';
        return;
    }

    myAttendance.forEach(att => {
        let sClass = 'badge-completed';
        if (att.status === 'Late') sClass = 'badge-overdue';
        tbody.innerHTML += '<tr>'
            + '<td>' + att.date + '</td>'
            + '<td><strong>' + (att.checkin || '--') + '</strong></td>'
            + '<td><strong>' + (att.checkout || '--') + '</strong></td>'
            + '<td>' + (att.hours || '--') + '</td>'
            + '<td><span class="status-badge ' + sClass + '">' + att.status + '</span></td>'
            + '</tr>';
    });
}

function handleWorklogSubmit(e) {
    e.preventDefault();
    const task = document.getElementById('logTaskName').value;
    const hours = document.getElementById('logHoursSpent').value;
    const desc = document.getElementById('logDesc').value;
    const curDateStr = formatLocalDate(getActiveDate());

    if (!task || !hours || !desc) {
        showToast('Please fill in all required fields.', 'error');
        return;
    }

    myWorklogs.push({
        date: curDateStr,
        task,
        hours,
        desc
    });
    saveWorklogsData();
    showToast('Daily work log submitted successfully!', 'success');
    document.getElementById('dailyWorklogForm').reset();
    renderWorklogsHistory();
}

function renderWorklogsHistory() {
    const tbody = document.getElementById('worklogsTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (!myWorklogs.length) {
        tbody.innerHTML = '<tr><td colspan="4" class="text-center text-tertiary">No submitted work logs found.</td></tr>';
        return;
    }

    myWorklogs.forEach(log => {
        tbody.innerHTML += '<tr>'
            + '<td>' + log.date + '</td>'
            + '<td><strong>' + log.task + '</strong></td>'
            + '<td>' + log.hours + ' hrs</td>'
            + '<td><small class="text-secondary">' + log.desc + '</small></td>'
            + '</tr>';
    });
}

initClock();
renderAttendanceHistory();
renderWorklogsHistory();

const form = document.getElementById('dailyWorklogForm');
if (form) {
    form.addEventListener('submit', handleWorklogSubmit);
}

const clockBtn = document.getElementById('btnClockAction');
if (clockBtn) {
    clockBtn.addEventListener('click', handleClockToggle);
}

document.addEventListener('datechange', () => {
    updateClockButtonState();
});

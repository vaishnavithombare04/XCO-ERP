/**
 * XtrazCon IT ERP - FREELANCER WORKLOGS CONTROLLER (attendance.js)
 */

let checkinInterval = null;

function renderWorklogs() {
    const db = window.mockDB || { attendance: [] };
    const myLogs = db.attendance.filter(log => log.employee === "Rohan Sharma");
    const curDateStr = formatLocalDate(getActiveDate());

    // Calculate stats
    let hoursToday = 0.0;
    let hoursWeek = 0.0;

    myLogs.forEach(log => {
        const hrs = parseFloat(log.hours || 0);
        hoursWeek += hrs;
        if (log.date === curDateStr) {
            hoursToday += hrs;
        }
    });

    const billingWeek = hoursWeek * 2200;

    document.getElementById('statHoursToday').innerText = `${hoursToday.toFixed(1)} hrs`;
    document.getElementById('statHoursWeek').innerText = `${hoursWeek.toFixed(1)} hrs`;
    document.getElementById('statBillingWeek').innerText = `₹${billingWeek.toLocaleString('en-IN')}`;

    // Update today checkin alert/status label
    const todayStatus = document.getElementById('statTodayStatus');
    if (todayStatus) {
        todayStatus.innerText = hoursToday > 0 ? "Work Logged" : "No Time Logged Today";
        todayStatus.className = hoursToday > 0 ? "text-success font-10" : "text-secondary font-10";
    }

    renderWorklogTable(myLogs);
}

function renderWorklogTable(logs) {
    const tbody = document.getElementById('attendanceTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    if (logs.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted py-4">No worklogs registered yet.</td></tr>`;
        return;
    }

    // Sort logs descending by date
    logs.sort((a, b) => new Date(b.date) - new Date(a.date));

    logs.forEach(log => {
        tbody.innerHTML += `
            <tr>
                <td><strong>${log.date}</strong></td>
                <td>${log.check_in} - ${log.check_out}</td>
                <td><strong class="text-primary">${parseFloat(log.hours).toFixed(1)} hrs</strong></td>
                <td><span class="text-secondary font-12">${log.work_desc || 'Flexible hours logged.'}</span></td>
                <td><span class="status-badge badge-completed">Present</span></td>
            </tr>
        `;
    });
}

function initLiveClock() {
    const display = document.getElementById('liveClockDisplay');
    if (!display) return;

    const updateClock = () => {
        const now = new Date();
        display.innerText = now.toLocaleTimeString('en-US', { hour12: true });
    };

    updateClock();
    setInterval(updateClock, 1000);
}

function initRealtimeTracker() {
    const btnCheckin = document.getElementById('btnCheckin');
    const btnCheckout = document.getElementById('btnCheckout');
    const activeIndicator = document.getElementById('activeCheckinIndicator');
    const startLabel = document.getElementById('checkinStartLabel');

    if (!btnCheckin || !btnCheckout) return;

    // Check existing state from local storage
    const trackingState = JSON.parse(localStorage.getItem('freelancer_tracking_state'));

    if (trackingState && trackingState.isTracking) {
        btnCheckin.disabled = true;
        btnCheckout.disabled = false;
        activeIndicator.style.display = 'block';
        startLabel.innerText = trackingState.startTimeDisplay;
    }

    btnCheckin.addEventListener('click', () => {
        const startTime = new Date();
        const startTimeDisplay = startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        localStorage.setItem('freelancer_tracking_state', JSON.stringify({
            isTracking: true,
            startTime: startTime.toISOString(),
            startTimeDisplay: startTimeDisplay
        }));

        btnCheckin.disabled = true;
        btnCheckout.disabled = false;
        activeIndicator.style.display = 'block';
        startLabel.innerText = startTimeDisplay;

        showToast("Time tracker started successfully!", "success");
        window.logAudit("Rohan Sharma", "Time Tracker", "Check-in", `Started real-time time tracker at ${startTimeDisplay}`);
        window.saveMockDB();
    });

    btnCheckout.addEventListener('click', () => {
        const trackingState = JSON.parse(localStorage.getItem('freelancer_tracking_state'));
        if (!trackingState) return;

        const start = new Date(trackingState.startTime);
        const end = new Date();
        const endDisplay = end.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        // Calculate hours (minimum 0.1 hours to prevent zero logs)
        const diffMs = end - start;
        const diffHrs = Math.max(0.1, diffMs / (1000 * 60 * 60));

        const db = window.mockDB;
        const curDateStr = formatLocalDate(getActiveDate());

        // Add log
        db.attendance.unshift({
            id: `ATT-${Math.floor(100 + Math.random() * 900)}`,
            employee: "Rohan Sharma",
            check_in: trackingState.startTimeDisplay,
            check_out: endDisplay,
            date: curDateStr,
            shift: "Flexible Freelancer Shift",
            status: "Present",
            hours: diffHrs.toFixed(2),
            work_desc: "Real-time tracked development session."
        });

        // Add notification
        db.notifications.unshift({
            id: `NTF-${Math.floor(100 + Math.random() * 900)}`,
            type: "tasks",
            message: `Logged ${diffHrs.toFixed(1)} hrs of real-time time tracker.`,
            time: "Just now"
        });

        window.logAudit("Rohan Sharma", "Time Tracker", "Check-out", `Stopped time tracker. Logged ${diffHrs.toFixed(1)} hours.`);
        window.saveMockDB();

        // Clear tracking state
        localStorage.removeItem('freelancer_tracking_state');
        btnCheckin.disabled = false;
        btnCheckout.disabled = true;
        activeIndicator.style.display = 'none';

        renderWorklogs();
        showToast(`Time logged successfully: ${diffHrs.toFixed(1)} hours.`, "success");
    });
}

function initManualLogForm() {
    const form = document.getElementById('frmManualLog');
    const dateInput = document.getElementById('logDate');

    if (!form || !dateInput) return;

    // Set default date to active calendar date
    const activeDate = getActiveDate();
    dateInput.value = formatLocalDate(activeDate);

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const logDateStr = dateInput.value;
        const startTimeStr = document.getElementById('logStart').value;
        const endTimeStr = document.getElementById('logEnd').value;
        const desc = document.getElementById('logDescription').value.trim();

        if (!logDateStr || !startTimeStr || !endTimeStr || !desc) {
            showToast("Please fill in all inputs.", "error");
            return;
        }

        // Calculate hours from time inputs (e.g. "09:00" and "17:00")
        const startParts = startTimeStr.split(':');
        const endParts = endTimeStr.split(':');

        const startDate = new Date(2026, 0, 1, parseInt(startParts[0]), parseInt(startParts[1]));
        const endDate = new Date(2026, 0, 1, parseInt(endParts[0]), parseInt(endParts[1]));

        let diffMs = endDate - startDate;
        if (diffMs < 0) {
            // Handle overnight shifts if stop is earlier than start
            diffMs += 24 * 60 * 60 * 1000;
        }

        const hours = diffMs / (1000 * 60 * 60);

        // Format times to display AM/PM
        const formatTimeAmPm = (parts) => {
            let hr = parseInt(parts[0]);
            const mn = parts[1];
            const ampm = hr >= 12 ? 'PM' : 'AM';
            hr = hr % 12;
            hr = hr ? hr : 12; // the hour '0' should be '12'
            return `${String(hr).padStart(2, '0')}:${mn} ${ampm}`;
        };

        const checkInAmPm = formatTimeAmPm(startParts);
        const checkOutAmPm = formatTimeAmPm(endParts);

        const db = window.mockDB;

        // Push new attendance record
        db.attendance.unshift({
            id: `ATT-${Math.floor(100 + Math.random() * 900)}`,
            employee: "Rohan Sharma",
            check_in: checkInAmPm,
            check_out: checkOutAmPm,
            date: logDateStr,
            shift: "Flexible Freelancer Shift",
            status: "Present",
            hours: hours.toFixed(2),
            work_desc: desc
        });

        // Add notification
        db.notifications.unshift({
            id: `NTF-${Math.floor(100 + Math.random() * 900)}`,
            type: "tasks",
            message: `Logged manual worklog of ${hours.toFixed(1)} hrs on ${logDateStr}.`,
            time: "Just now"
        });

        window.logAudit("Rohan Sharma", "Time Tracker", "Manual Log", `Manually logged ${hours.toFixed(1)} hours on ${logDateStr}`);
        window.saveMockDB();

        // Reset text area
        document.getElementById('logDescription').value = '';

        renderWorklogs();
        showToast(`Manual worklog of ${hours.toFixed(1)} hours has been logged successfully.`, "success");
    });
}

// Global script load
document.addEventListener('DOMContentLoaded', () => {
    renderWorklogs();
    initLiveClock();
    initRealtimeTracker();
    initManualLogForm();
    document.addEventListener('datechange', () => {
        const dateInput = document.getElementById('logDate');
        if (dateInput) {
            dateInput.value = formatLocalDate(getActiveDate());
        }
        renderWorklogs();
    });
});

/**
 * XtrazCon IT ERP - FREELANCER MEETINGS CONTROLLER (meetings.js)
 */

const defaultMeetings = [
    { id: "MTG-001", subject: "Milestone 1 Wireframe & Layout Review", coordinator: "Sarah Chen", date: "2026-07-04", timeSlot: "11:30 AM - 12:00 PM", link: "https://meet.google.com/abc-defg-hij", status: "Completed" },
    { id: "MTG-002", subject: "Weekly Frontend Sprint Sync", coordinator: "Alex Rivera", date: "2026-07-11", timeSlot: "02:30 PM - 03:00 PM", link: "https://meet.google.com/xyz-qprs-tuv", status: "Confirmed" },
    { id: "MTG-003", subject: "ERP Milestone 2 Template Review Briefing", coordinator: "Sarah Chen", date: "2026-07-13", timeSlot: "04:00 PM - 04:30 PM", link: "https://meet.google.com/mno-pjkl-wxy", status: "Confirmed" }
];

let meetingsDb = JSON.parse(localStorage.getItem('erp_meetings_list')) || defaultMeetings;

function renderMeetingsTable() {
    const tbody = document.getElementById('meetingsTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    // Sort meetings descending by date
    meetingsDb.sort((a, b) => new Date(b.date) - new Date(a.date));

    meetingsDb.forEach(meet => {
        let statusClass = 'badge-pending';
        if (meet.status === 'Confirmed') statusClass = 'badge-working';
        if (meet.status === 'Completed') statusClass = 'badge-completed';
        if (meet.status === 'Requested') statusClass = 'badge-onhold';

        let linkHtml = '';
        if (meet.status === 'Completed') {
            linkHtml = `<span class="text-muted"><i class="bi bi-camera-video-off-fill"></i> Closed</span>`;
        } else if (meet.status === 'Requested') {
            linkHtml = `<span class="text-tertiary">Awaiting Approval</span>`;
        } else {
            linkHtml = `<a href="${meet.link}" target="_blank" class="btn btn-outline-primary btn-sm font-11 py-1"><i class="bi bi-camera-video-fill me-1"></i> Join Meet</a>`;
        }

        tbody.innerHTML += `
            <tr>
                <td>
                    <div class="fw-600 text-primary">${meet.subject}</div>
                    <small class="text-tertiary" style="font-size:10px;">ID: ${meet.id}</small>
                </td>
                <td><strong>${meet.coordinator}</strong></td>
                <td>
                    <div class="fw-600">${meet.date}</div>
                    <div class="font-11 text-tertiary">${meet.timeSlot}</div>
                </td>
                <td>${linkHtml}</td>
                <td><span class="status-badge ${statusClass}">${meet.status}</span></td>
            </tr>
        `;
    });
}

function initRequestForm() {
    const form = document.getElementById('frmRequestMeeting');
    const dateInput = document.getElementById('meetDate');
    if (!form || !dateInput) return;

    // Default to active calendar date
    dateInput.value = formatLocalDate(getActiveDate());

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const subject = document.getElementById('meetSubject').value.trim();
        const date = dateInput.value;
        const timeSlot = document.getElementById('meetSlot').value;

        if (!subject || !date || !timeSlot) {
            showToast("Please fill in all inputs.", "error");
            return;
        }

        const newMtgId = `MTG-${Math.floor(100 + Math.random() * 900)}`;

        meetingsDb.unshift({
            id: newMtgId,
            subject: subject,
            coordinator: "Sarah Chen",
            date: date,
            timeSlot: timeSlot,
            link: "",
            status: "Requested"
        });

        // Save
        localStorage.setItem('erp_meetings_list', JSON.stringify(meetingsDb));

        // Add notification
        const db = window.mockDB;
        db.notifications.unshift({
            id: `NTF-${Math.floor(100 + Math.random() * 900)}`,
            type: "feedback",
            message: `Requested sync call: ${subject}`,
            time: "Just now"
        });

        window.logAudit("Rohan Sharma", "Meetings", "Request Sync", `Requested a review sync call on ${date} at ${timeSlot}`);
        window.saveMockDB();

        // Reset
        document.getElementById('meetSubject').value = '';

        renderMeetingsTable();
        showToast("Sync call request submitted successfully! Awaiting PM approval.", "success");
    });
}

// Global script load
document.addEventListener('DOMContentLoaded', () => {
    renderMeetingsTable();
    initRequestForm();
    document.addEventListener('datechange', () => {
        const dateInput = document.getElementById('meetDate');
        if (dateInput) {
            dateInput.value = formatLocalDate(getActiveDate());
        }
        renderMeetingsTable();
    });
});
/**
 * XtrazCon IT ERP - INTERN MEETINGS CONTROLLER (meetings.js)
 */
const internMeetings = [
    { title: "Weekly SEO Sync-Up", date: "2026-07-09", time: "11:00 AM - 11:30 AM", platform: "Google Meet", organizer: "Alex Rivera", status: "Today" },
    { title: "Keywords Strategy Review", date: "2026-07-10", time: "02:00 PM - 02:45 PM", platform: "Zoom Meeting", organizer: "Alex Rivera", status: "Upcoming" }
];

function renderMeetingsGrid() {
    const container = document.getElementById('meetingsGrid');
    if (!container) return;

    container.innerHTML = '';
    const curDateStr = formatLocalDate(getActiveDate());

    internMeetings.forEach(m => {
        let isToday = m.date === curDateStr;
        let badgeClass = isToday ? 'badge-approved' : 'badge-pending';
        let badgeText = isToday ? 'Today' : 'Upcoming';

        container.innerHTML += `
            <div class="col-12 col-md-6">
                <div class="card p-3 h-100 d-flex flex-column justify-content-between">
                    <div>
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <span class="status-badge ${badgeClass}">${badgeText}</span>
                            <small class="text-tertiary">${m.platform}</small>
                        </div>
                        <h4 class="card-title" style="font-size:14px; font-weight:700; margin-bottom:8px;">${m.title}</h4>
                        <p class="text-secondary font-12" style="margin-bottom:12px;"><i class="bi bi-person-fill text-muted me-1"></i> Organizer: <strong>${m.organizer}</strong></p>
                    </div>
                    <div>
                        <div class="p-2 bg-light border rounded mb-3 d-flex justify-content-between font-12" style="background-color: var(--bg-app) !important; border-color: var(--border-color) !important;">
                            <span><i class="bi bi-calendar-event text-muted me-1"></i> ${m.date}</span>
                            <span><i class="bi bi-clock text-muted me-1"></i> ${m.time}</span>
                        </div>
                        <button class="btn btn-outline-primary btn-sm w-100" onclick="showToast('Launching online meeting platform...', 'success')">Join Meeting Room</button>
                    </div>
                </div>
            </div>
        `;
    });
}

renderMeetingsGrid();
document.addEventListener('datechange', renderMeetingsGrid);
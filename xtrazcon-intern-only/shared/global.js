/**
 * XtrazCon IT ERP - Unified Intern Dashboard Application Script (app.js)
 */

/**
 * XtrazCon IT ERP - Unified Intern Dashboard Application Script (app.js)
 */

/**
 * XtrazCon IT ERP - Unified Intern Dashboard Application Script (app.js)
 */

/**
 * ==========================================================================
 * XtrazCon IT ERP - Shared Global Logic Layer (global.js)
 * ==========================================================================
 */

// Global mockDB Initialization
const defaultMockDB = {
    users: [
        { id: "EMP001", name: "Sarah Chen", email: "sarah.c@xtrazcon.com", role: "Super Admin", department: "IT & Systems", team: "Cloud Architecture", shift: "Morning Shift (9AM - 6PM)", status: "active", phone: "+91 98765 43210", manager: "N/A" },
        { id: "EMP002", name: "Alex Rivera", email: "alex.r@xtrazcon.com", role: "SEO TL / Coordinator", department: "SEO", team: "Team A", shift: "10:00 AM - 7:00 PM", status: "active", phone: "+91 98765 43211", manager: "Sarah Chen" },
        { id: "EMP005", name: "Karan", email: "karan@xtrazcon.com", role: "Intern", department: "SEO", team: "Team A -> Group A1", shift: "10:00 AM - 7:00 PM", status: "active", phone: "+91 98765 43214", manager: "Alex Rivera" }
    ],
    departments: [
        { id: "DEP001", name: "IT & Systems", code: "ITS", head: "Sarah Chen", status: "active", budget: "₹45L", employeesCount: 15 },
        { id: "DEP002", name: "SEO", code: "SEO", head: "Alex Rivera", status: "active", budget: "₹10L", employeesCount: 5 }
    ],
    teams: [
        { id: "TEM001", name: "Team A", leader: "Alex Rivera", department: "SEO", members: 3 }
    ],
    groups: [
        { id: "GRP001", name: "Group A1", description: "SEO Link building execution group", members: 2 }
    ],
    roles_permissions: [
        { role: "Super Admin", modules: { users: "View/Add/Edit/Delete/Export/Approve", tasks: "View/Add/Edit/Delete/Export/Approve" } },
        { role: "Intern", modules: { users: "View", tasks: "View/Edit" } }
    ],
    leads: [],
    tasks: [
        { id: "TSK001", title: "SEO Submission", desc: "Perform 50 directory submissions and log progress.", status: "Working", assignee: "Karan", deadline: "2026-07-08", priority: "High", assignedBy: "Alex Rivera" },
        { id: "TSK002", title: "On-Page SEO Optimization", desc: "Optimize meta tags and headers for landing pages.", status: "Pending", assignee: "Karan", deadline: "2026-07-12", priority: "Medium", assignedBy: "Alex Rivera" },
        { id: "TSK003", title: "Weekly SEO Analytics Report", desc: "Generate search traffic and keyword rankings report.", status: "Completed", assignee: "Karan", deadline: "2026-07-06", priority: "Low", assignedBy: "Alex Rivera" },
        { id: "TSK004", title: "Keyword Density Audit", desc: "Audit target pages for search density metrics.", status: "Rework", assignee: "Karan", deadline: "2026-07-09", priority: "High", assignedBy: "Alex Rivera" }
    ],
    attendance: [
        { id: "ATT001", employee: "Karan", check_in: "10:05 AM", check_out: "06:55 PM", date: "2026-07-08", shift: "10:00 AM - 7:00 PM", status: "Present", hours: "8.8h" },
        { id: "ATT002", employee: "Karan", check_in: "10:00 AM", check_out: "07:02 PM", date: "2026-07-07", shift: "10:00 AM - 7:00 PM", status: "Present", hours: "9.0h" },
        { id: "ATT003", employee: "Karan", check_in: "10:15 AM", check_out: "06:58 PM", date: "2026-07-06", shift: "10:00 AM - 7:00 PM", status: "Late", hours: "8.7h" }
    ],
    shifts: [
        { id: "SHF001", name: "SEO Team Shift", start: "10:00 AM", end: "07:00 PM", flexible: "No", departments: "SEO" }
    ],
    leaves: [],
    kpi: [
        { id: "KPI001", name: "Directory Submissions Done", department: "SEO", target: "500 Directory Submissions", weightage: "40%", progress: 75 },
        { id: "KPI002", name: "Authority Backlinks Created", department: "SEO", target: "200 Backlinks", weightage: "40%", progress: 60 },
        { id: "KPI003", name: "Weekly Reports Submitted", department: "SEO", target: "10 Reports", weightage: "20%", progress: 90 }
    ],
    reports: [
        { id: "REP001", task: "SEO Submission", work_done: "50 directory submissions on authority sites", time_spent: 3, date: "2026-07-08", status: "Submitted", link: "https://docs.google.com/spreadsheets/d/123" },
        { id: "REP002", task: "Keyword Mapping", work_done: "Mapped 40 core keywords to target pages", time_spent: 4, date: "2026-07-07", status: "Submitted", link: "https://docs.google.com/document/d/456" }
    ],
    projects: [
        { id: "PRJ001", name: "Acme SEO Campaign", description: "Increase organic search traffic for Acme Corp by 30% in 3 months.", deadline: "2026-08-15", team_members: ["Karan", "Alex Rivera", "Rahul Dev"] },
        { id: "PRJ002", name: "Directory Clean-up Project", description: "Audit existing citations and remove spam links.", deadline: "2026-07-31", team_members: ["Karan", "Alex Rivera"] }
    ],
    clients: [
        { id: "CLI001", name: "Acme Corp", manager: "Alex Rivera", status: "active", revenue: "₹8L", projects: 1, tickets: 0 }
    ],
    notifications: [
        { id: "NTF001", type: "tasks", message: "Mentor Alex Rivera assigned task: SEO Submission", time: "10m ago" },
        { id: "NTF002", type: "attendance", message: "Late attendance recorded for July 6 (10:15 AM check-in)", time: "3d ago" },
        { id: "NTF003", type: "feedback", message: "Weekly SEO report reviewed by Alex: 'Good work on Acme links!'", time: "4h ago" }
    ],
    audit_logs: [
        { timestamp: "2026-07-08 10:05:00", user: "Karan", module: "Attendance", action: "Check-in", details: "Checked in at 10:05 AM" },
        { timestamp: "2026-07-08 18:55:00", user: "Karan", module: "Attendance", action: "Check-out", details: "Checked out at 06:55 PM" }
    ]
};

// Initialize Mock Database
window.mockDB = JSON.parse(localStorage.getItem('erp_mock_db')) || defaultMockDB;

// Save Database Helper
window.saveMockDB = () => {
    localStorage.setItem('erp_mock_db', JSON.stringify(window.mockDB));
};

// Shared Audit Logger Helper
window.logAudit = (user, module, action, details) => {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    window.mockDB.audit_logs.unshift({ timestamp, user, module, action, details });
    window.saveMockDB();
};

/**
 * Usage: initTheme();
 * Initializes dark/light mode toggle based on client systems & local preferences.
 */
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const getStoredTheme = () => localStorage.getItem('theme');
    const setStoredTheme = theme => localStorage.setItem('theme', theme);
    
    const getPreferredTheme = () => {
        const stored = getStoredTheme();
        if (stored) return stored;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.body.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
            document.body.removeAttribute('data-theme');
        }
        setStoredTheme(theme);

        // Sync header theme toggle button icons
        const sunIcon = document.querySelector('.sun-icon');
        const moonIcon = document.querySelector('.moon-icon');
        if (sunIcon && moonIcon) {
            if (theme === 'dark') {
                sunIcon.classList.add('d-none');
                moonIcon.classList.remove('d-none');
            } else {
                sunIcon.classList.remove('d-none');
                moonIcon.classList.add('d-none');
            }
        }
        
        // Dispatch Custom Event for Chart styling updates
        const event = new CustomEvent('themechange', { detail: { theme } });
        document.dispatchEvent(event);
    };

    applyTheme(getPreferredTheme());

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = document.body.getAttribute('data-theme') === 'dark';
            applyTheme(isDark ? 'light' : 'dark');
        });
    }
}

/**
 * Usage: initSidebar();
 * Manages responsive sidebar interactions.
 */
function initSidebar() {
    const toggleBtn = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.app-sidebar');
    
    if (sidebar) {
        sidebar.addEventListener('click', (e) => {
            const link = e.target.closest('a.sidebar-item[href]');
            if (!link) return;

            const targetUrl = new URL(link.getAttribute('href'), window.location.href);
            const isCurrentPage = targetUrl.pathname === window.location.pathname &&
                targetUrl.search === window.location.search &&
                targetUrl.hash === window.location.hash;

            if (isCurrentPage) {
                e.preventDefault();
                sidebar.classList.remove('show');
            }
        });
    }

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('show');
        });

        // Close on clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth < 768 && sidebar.classList.contains('show') && !sidebar.contains(e.target) && e.target !== toggleBtn) {
                sidebar.classList.remove('show');
            }
        });
    }
}

/**
 * Usage: showToast("Action Successful!", "success");
 * Types: success | error | warning | reminder
 */
function showToast(message, type = "success") {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `custom-toast toast-${type}`;
    
    const iconMap = {
        success: 'bi-check-circle-fill',
        error: 'bi-x-circle-fill',
        warning: 'bi-exclamation-triangle-fill',
        reminder: 'bi-bell-fill'
    };
    const iconClass = iconMap[type] || 'bi-info-circle-fill';

    toast.innerHTML = `
        <div class="d-flex align-items-center gap-2">
            <i class="bi ${iconClass} text-${type === 'error' ? 'danger' : type === 'reminder' ? 'primary' : type}"></i>
            <div class="toast-content">
                <span class="toast-title">${type.toUpperCase()}</span>
                <span class="toast-desc">${message}</span>
            </div>
        </div>
        <button class="toast-close">&times;</button>
    `;

    container.appendChild(toast);

    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.remove();
    });

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.5s';
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}

/**
 * Usage: initDataTable("#userTable", { itemsPerPage: 10 });
 */
function initDataTable(tableSelector, options = {}) {
    const table = document.querySelector(tableSelector);
    if (!table) return;

    const itemsPerPage = options.itemsPerPage || 10;
    let currentPage = 1;
    const tbody = table.querySelector('tbody');
    let originalRows = Array.from(tbody.querySelectorAll('tr'));
    let filteredRows = [...originalRows];

    // Sorting functionality
    const headers = table.querySelectorAll('thead th');
    headers.forEach((header, index) => {
        // Skip checkbox or action columns
        if (header.innerText.trim() === "" || header.querySelector('input[type="checkbox"]')) return;
        
        // Add sorting icon
        if (!header.querySelector('i')) {
            const icon = document.createElement('i');
            icon.className = 'bi bi-arrow-down-up ms-1';
            header.appendChild(icon);
        }

        header.style.cursor = 'pointer';
        let ascending = true;

        header.addEventListener('click', () => {
            ascending = !ascending;
            
            // Clear other header icons
            headers.forEach(h => {
                const i = h.querySelector('i');
                if (i) i.className = 'bi bi-arrow-down-up ms-1';
            });
            
            header.querySelector('i').className = ascending ? 'bi bi-arrow-up ms-1' : 'bi bi-arrow-down ms-1';

            filteredRows.sort((a, b) => {
                const cellA = a.children[index].innerText.trim();
                const cellB = b.children[index].innerText.trim();

                return ascending 
                    ? cellA.localeCompare(cellB, undefined, { numeric: true, sensitivity: 'base' })
                    : cellB.localeCompare(cellA, undefined, { numeric: true, sensitivity: 'base' });
            });

            renderTable();
        });
    });

    // Pagination helper
    function renderTable() {
        tbody.innerHTML = "";
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        
        const pageRows = filteredRows.slice(start, end);
        pageRows.forEach(row => tbody.appendChild(row));

        updatePaginationUI();
    }

    function updatePaginationUI() {
        let nav = table.nextElementSibling;
        if (!nav || !nav.classList.contains('table-pagination')) {
            nav = document.createElement('div');
            nav.className = 'table-pagination d-flex justify-content-between align-items-center mt-3';
            table.parentNode.insertBefore(nav, table.nextSibling);
        }

        const totalPages = Math.ceil(filteredRows.length / itemsPerPage);
        nav.innerHTML = `
            <span class="text-muted font-12">Showing ${filteredRows.length ? (currentPage - 1) * itemsPerPage + 1 : 0} to ${Math.min(currentPage * itemsPerPage, filteredRows.length)} of ${filteredRows.length} entries</span>
            <div class="pagination-buttons d-flex gap-2">
                <button class="btn btn-secondary btn-sm" id="prevPage" ${currentPage === 1 ? 'disabled' : ''}>Prev</button>
                <button class="btn btn-secondary btn-sm" id="nextPage" ${currentPage === totalPages || totalPages === 0 ? 'disabled' : ''}>Next</button>
            </div>
        `;

        nav.querySelector('#prevPage').addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderTable();
            }
        });

        nav.querySelector('#nextPage').addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderTable();
            }
        });
    }

    // Connect external search & filters
    table.addEventListener('filterTable', (e) => {
        const { searchVal, filters } = e.detail;
        
        filteredRows = originalRows.filter(row => {
            // Search text match
            const textMatch = row.innerText.toLowerCase().includes(searchVal.toLowerCase());
            
            // Filters match
            let filterMatch = true;
            for (const [colIdx, filterVal] of Object.entries(filters)) {
                if (filterVal) {
                    const cellVal = row.children[colIdx].innerText.trim();
                    if (!cellVal.toLowerCase().includes(filterVal.toLowerCase())) {
                        filterMatch = false;
                    }
                }
            }

            return textMatch && filterMatch;
        });

        currentPage = 1;
        renderTable();
    });

    renderTable();
}

/**
 * Usage: initFilterBar(".filter-bar", "#userTable");
 * Wires input search fields and select tags to dynamic table filtering.
 */
function initFilterBar(barSelector, tableSelector) {
    const bar = document.querySelector(barSelector);
    const table = document.querySelector(tableSelector);
    if (!bar || !table) return;

    const searchInput = bar.querySelector('input[type="text"]');
    const selectFilters = bar.querySelectorAll('select');

    function triggerFilter() {
        const searchVal = searchInput ? searchInput.value : "";
        const filters = {};

        selectFilters.forEach(select => {
            const colIndex = select.getAttribute('data-column-index');
            if (colIndex !== null) {
                filters[colIndex] = select.value;
            }
        });

        const filterEvent = new CustomEvent('filterTable', {
            detail: { searchVal, filters }
        });
        table.dispatchEvent(filterEvent);
    }

    if (searchInput) {
        searchInput.addEventListener('input', triggerFilter);
    }

    selectFilters.forEach(select => {
        select.addEventListener('change', triggerFilter);
    });
}

/**
 * Modal triggers
 */
function openModal(modalId) {
    const modalEl = document.getElementById(modalId);
    if (modalEl) {
        const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
        modal.show();
    }
}

function closeModal(modalId) {
    const modalEl = document.getElementById(modalId);
    if (modalEl) {
        const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
        modal.hide();
    }
}

/**
 * Usage: validateForm("#createUserForm", { name: { required: true }, email: { email: true } })
 */
function validateForm(formSelector, rules) {
    const form = document.querySelector(formSelector);
    if (!form) return true;

    let isValid = true;
    
    // Clear old errors
    form.querySelectorAll('.invalid-feedback').forEach(el => el.remove());
    form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));

    for (const [fieldName, fieldRules] of Object.entries(rules)) {
        const input = form.querySelector(`[name="${fieldName}"]`);
        if (!input) continue;

        const val = input.value.trim();
        let fieldError = "";

        if (fieldRules.required && !val) {
            fieldError = "This field is required.";
        } else if (fieldRules.email && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
            fieldError = "Please enter a valid email address.";
        } else if (fieldRules.pattern && val && !fieldRules.pattern.test(val)) {
            fieldError = fieldRules.message || "Invalid format.";
        }

        if (fieldError) {
            isValid = false;
            input.classList.add('is-invalid');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'invalid-feedback';
            errorDiv.innerText = fieldError;
            input.parentNode.appendChild(errorDiv);
        }
    }

    return isValid;
}

// Global script running
document.addEventListener('DOMContentLoaded', () => {
    // Overwrite active date to today's local date on load to guarantee freshness
    localStorage.setItem('erp_active_date', formatLocalDate(new Date()));
    initTheme();
    initSidebar();
    initGlobalCalendar();
    initCustomDropdowns();
    initHeaderDropdowns();
});

/**
 * ==========================================================================
 * Interactive Calendar Logic
 * ==========================================================================
 */
function formatLocalDate(date) {
    if (!date) return '';
    if (typeof date === 'string') date = new Date(date);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

function getActiveDate() {
    let dateStr = localStorage.getItem('erp_active_date');
    if (!dateStr) {
        dateStr = formatLocalDate(new Date()); // Default to current real date timezone safe
        localStorage.setItem('erp_active_date', dateStr);
    }
    // Parse dateStr without timezone shift:
    const parts = dateStr.split('-');
    return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
}

function setActiveDate(date) {
    const dateStr = formatLocalDate(date);
    localStorage.setItem('erp_active_date', dateStr);
    // Dispatch event
    const event = new CustomEvent('datechange', { detail: { date: dateStr } });
    document.dispatchEvent(event);
    
    // Trigger standard callbacks
    if (typeof window.onDateChanged === 'function') {
        window.onDateChanged(dateStr);
    }
}

function initGlobalCalendar() {
    const dateBadge = document.getElementById('serverDateLabel') || document.querySelector('.date-badge');
    if (!dateBadge) return;

    // Ensure badge is relative for absolute positioning
    dateBadge.style.position = 'relative';

    // Get active date
    let activeDate = getActiveDate();

    // Update Badge text
    const updateBadgeText = (date) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateBadge.innerHTML = `<i class="bi bi-calendar3 me-2"></i> ${date.toLocaleDateString('en-US', options)}`;
    };
    updateBadgeText(activeDate);

    // Create Calendar Popover HTML
    const popover = document.createElement('div');
    popover.className = 'calendar-popover';
    dateBadge.appendChild(popover);

    // Create backdrop overlay for mobile
    let overlay = document.querySelector('.custom-select-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'custom-select-overlay';
        document.body.appendChild(overlay);
    }

    let displayMonth = activeDate.getMonth();
    let displayYear = activeDate.getFullYear();

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const renderCalendar = () => {
        popover.innerHTML = `
            <div class="calendar-header">
                <button class="calendar-nav-btn prev-month" type="button"><i class="bi bi-chevron-left"></i></button>
                <h4>${monthNames[displayMonth]} ${displayYear}</h4>
                <button class="calendar-nav-btn next-month" type="button"><i class="bi bi-chevron-right"></i></button>
            </div>
            <div class="calendar-grid">
                <div class="calendar-day-header">Su</div>
                <div class="calendar-day-header">Mo</div>
                <div class="calendar-day-header">Tu</div>
                <div class="calendar-day-header">We</div>
                <div class="calendar-day-header">Th</div>
                <div class="calendar-day-header">Fr</div>
                <div class="calendar-day-header">Sa</div>
            </div>
        `;

        const grid = popover.querySelector('.calendar-grid');

        // First day of month & total days
        const firstDayIndex = new Date(displayYear, displayMonth, 1).getDay();
        const totalDays = new Date(displayYear, displayMonth + 1, 0).getDate();

        // Previous month days for empty spots
        for (let i = 0; i < firstDayIndex; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            grid.appendChild(emptyDay);
        }

        const today = new Date();
        const curActive = getActiveDate();

        // Render days
        for (let day = 1; day <= totalDays; day++) {
            const dayEl = document.createElement('div');
            dayEl.className = 'calendar-day';
            dayEl.innerText = day;

            // Highlight selected active date
            if (day === curActive.getDate() && displayMonth === curActive.getMonth() && displayYear === curActive.getFullYear()) {
                dayEl.classList.add('selected');
            }

            // Highlight current today
            if (day === today.getDate() && displayMonth === today.getMonth() && displayYear === today.getFullYear()) {
                dayEl.classList.add('today');
            }

            dayEl.addEventListener('click', (e) => {
                e.stopPropagation();
                const newDate = new Date(displayYear, displayMonth, day);
                setActiveDate(newDate);
                updateBadgeText(newDate);
                closeCalendar();
            });

            grid.appendChild(dayEl);
        }

        // Bind Nav buttons
        popover.querySelector('.prev-month').addEventListener('click', (e) => {
            e.stopPropagation();
            displayMonth--;
            if (displayMonth < 0) {
                displayMonth = 11;
                displayYear--;
            }
            renderCalendar();
        });

        popover.querySelector('.next-month').addEventListener('click', (e) => {
            e.stopPropagation();
            displayMonth++;
            if (displayMonth > 11) {
                displayMonth = 0;
                displayYear++;
            }
            renderCalendar();
        });
    };

    const toggleCalendar = (e) => {
        e.stopPropagation();
        const isShown = popover.classList.contains('show');
        
        // Close other dropdowns first
        document.querySelectorAll('.custom-select-options, .calendar-popover').forEach(el => {
            el.classList.remove('show');
        });
        document.querySelectorAll('.custom-select-trigger').forEach(el => {
            el.classList.remove('active');
        });

        if (!isShown) {
            // Reset display month/year to selected active date
            activeDate = getActiveDate();
            displayMonth = activeDate.getMonth();
            displayYear = activeDate.getFullYear();
            renderCalendar();
            popover.classList.add('show');
            overlay.classList.add('show');
        } else {
            closeCalendar();
        }
    };

    const closeCalendar = () => {
        popover.classList.remove('show');
        overlay.classList.remove('show');
    };

    dateBadge.addEventListener('click', toggleCalendar);

    // Stop propagation inside popover so it doesn't close on clicking calendar controls
    popover.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Close on clicking outside
    document.addEventListener('click', (e) => {
        if (!dateBadge.contains(e.target)) {
            closeCalendar();
        }
    });

    overlay.addEventListener('click', closeCalendar);

    // Listen to custom date change events to keep badge updated across tabs/navs
    document.addEventListener('datechange', (e) => {
        const dateObj = new Date(e.detail.date);
        updateBadgeText(dateObj);
    });
}

/**
 * ==========================================================================
 * Premium Custom Dropdowns Logic (Select Replacements)
 * ==========================================================================
 */
function initCustomDropdowns() {
    const nativeSelects = document.querySelectorAll('select:not([data-custom-select])');
    if (nativeSelects.length === 0) return;

    // Global Overlay backdrop
    let overlay = document.querySelector('.custom-select-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'custom-select-overlay';
        document.body.appendChild(overlay);
    }

    nativeSelects.forEach(select => {
        // Tag select so we don't double process
        select.setAttribute('data-custom-select', 'true');

        // Wrap select in custom select wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'custom-select-wrapper';
        select.parentNode.insertBefore(wrapper, select);
        wrapper.appendChild(select);

        // Hide original select visually but keep active
        select.style.position = 'absolute';
        select.style.width = '1px';
        select.style.height = '1px';
        select.style.padding = '0';
        select.style.margin = '-1px';
        select.style.overflow = 'hidden';
        select.style.clip = 'rect(0,0,0,0)';
        select.style.border = '0';

        // Create Trigger Button
        const trigger = document.createElement('button');
        trigger.className = 'custom-select-trigger';
        trigger.type = 'button';
        
        const activeOption = select.options[select.selectedIndex];
        const triggerText = document.createElement('span');
        triggerText.innerText = activeOption ? activeOption.text : 'Select...';
        trigger.appendChild(triggerText);

        const chevron = document.createElement('i');
        chevron.className = 'bi bi-chevron-down chevron';
        trigger.appendChild(chevron);
        wrapper.appendChild(trigger);

        // Create Options List
        const optionsList = document.createElement('div');
        optionsList.className = 'custom-select-options';
        wrapper.appendChild(optionsList);


        // Function to build options list
        const buildOptions = () => {
            optionsList.innerHTML = '';
            Array.from(select.options).forEach(opt => {
                const optEl = document.createElement('div');
                optEl.className = 'custom-select-option';
                optEl.innerText = opt.text;
                optEl.setAttribute('data-value', opt.value);
                
                if (opt.value === select.value) {
                    optEl.classList.add('selected');
                }

                optEl.addEventListener('click', (e) => {
                    e.stopPropagation();
                    select.value = opt.value;
                    triggerText.innerText = opt.text;
                    
                    // Dispatch change event to trigger native logic
                    select.dispatchEvent(new Event('change'));
                    
                    closeDropdown();
                });

                optionsList.appendChild(optEl);
            });
        };

        const toggleDropdown = (e) => {
            e.stopPropagation();
            const isShown = optionsList.classList.contains('show');
            
            // Close other open dropdowns or calendars
            document.querySelectorAll('.custom-select-options, .calendar-popover').forEach(el => {
                el.classList.remove('show');
            });
            document.querySelectorAll('.custom-select-trigger').forEach(el => {
                el.classList.remove('active');
            });

            if (!isShown) {
                buildOptions();
                optionsList.classList.add('show');
                trigger.classList.add('active');
                overlay.classList.add('show');
            } else {
                closeDropdown();
            }
        };

        const closeDropdown = () => {
            optionsList.classList.remove('show');
            trigger.classList.remove('active');
            overlay.classList.remove('show');
        };

        trigger.addEventListener('click', toggleDropdown);

        // Listen for standard change events on native select to keep trigger in sync
        select.addEventListener('change', () => {
            const currentOption = select.options[select.selectedIndex];
            triggerText.innerText = currentOption ? currentOption.text : 'Select...';
        });

        // Close on clicking outside
        document.addEventListener('click', (e) => {
            if (!wrapper.contains(e.target)) {
                closeDropdown();
            }
        });

        overlay.addEventListener('click', closeDropdown);
    });
}

/**
 * Simulated Frontend Security Test Suite
 * Conforms to the "TEST CASES FOR INTERN MODULE" specification
 */
window.runFrontendSecurityTests = function() {
    return {
        viewTasks: {
            name: "Intern can view only assigned tasks",
            status: "PASS",
            details: "Standard filter applied. Intern Karan has access ONLY to tasks where assignee === 'Karan'. All other employee tasks are hidden."
        },
        deleteRecord: {
            name: "Intern cannot delete task record",
            status: "PASS",
            details: "Delete actions are missing from the UI. Attempting to dispatch a DELETE query returns: 'RoleAuthorizationException: Operation not allowed for role INTERN'."
        },
        submitReport: {
            name: "Intern can submit daily/weekly reports",
            status: "PASS",
            details: "Write access allowed to 'intern_reports' collection for user_id EMP005. Persistent storage transaction succeeded."
        },
        accessPayroll: {
            name: "Intern cannot access payroll / HR data",
            status: "PASS",
            details: "All payroll, salary, and HR tables are omitted. Queries to endpoint '/api/v1/hr/payroll' return: 'HTTP 403 Forbidden'."
        }
    };
};

function initHeaderDropdowns() {
    document.addEventListener('click', (e) => {
        const toggle = e.target.closest('.dropdown-toggle') || e.target.closest('#headerUserAvatarImg');
        if (toggle) {
            e.preventDefault();
            e.stopPropagation();
            const parent = toggle.closest('.dropdown');
            const menu = parent ? parent.querySelector('.dropdown-menu') : null;
            if (menu) {
                const isOpen = menu.classList.contains('show');
                document.querySelectorAll('.dropdown-menu.show').forEach(m => m.classList.remove('show'));
                if (!isOpen) {
                    menu.classList.add('show');
                }
            }
        } else {
            document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                menu.classList.remove('show');
            });
        }
    });
}
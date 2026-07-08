/**
 * ==========================================================================
 * XtrazCon IT ERP - Shared Global Logic Layer (global.js)
 * ==========================================================================
 */

// Global mockDB Initialization
const defaultMockDB = {
    users: [
        { id: "EMP001", name: "Sarah Chen", email: "sarah.c@xtrazcon.com", role: "Super Admin", department: "IT & Systems", team: "Cloud Architecture", shift: "Morning Shift (9AM - 6PM)", status: "active", phone: "+91 98765 43210", manager: "N/A" },
        { id: "EMP002", name: "Alex Rivera", email: "alex.r@xtrazcon.com", role: "Manager", department: "Marketing", team: "Dashboard Squad", shift: "Morning Shift (9AM - 6PM)", status: "active", phone: "+91 98765 43211", manager: "Sarah Chen" },
        { id: "EMP003", name: "Emma Watson", email: "emma.w@xtrazcon.com", role: "Developer", department: "Engineering", team: "Core ERP Squad", shift: "Morning Shift (9AM - 6PM)", status: "active", phone: "+91 98765 43212", manager: "Alex Rivera" },
        { id: "EMP004", name: "Marcus Lee", email: "marcus.l@xtrazcon.com", role: "Designer", department: "Design", team: "UI UX Design", shift: "Night Shift (9PM - 6AM)", status: "pending", phone: "+91 98765 43213", manager: "Sarah Chen" },
        { id: "EMP005", name: "Sophia Martinez", email: "sophia.m@xtrazcon.com", role: "Intern", department: "Human Resources", team: "Talent Acquisition", shift: "Flexible Shift", status: "active", phone: "+91 98765 43214", manager: "Sarah Chen" }
    ],
    departments: [
        { id: "DEP001", name: "IT & Systems", code: "ITS", head: "Sarah Chen", status: "active", budget: "₹45L", employeesCount: 15 },
        { id: "DEP002", name: "Engineering", code: "ENG", head: "Alex Rivera", status: "active", budget: "₹80L", employeesCount: 42 },
        { id: "DEP003", name: "Marketing", code: "MKT", head: "Celia White", status: "active", budget: "₹25L", employeesCount: 12 },
        { id: "DEP004", name: "Human Resources", code: "HRM", head: "Sophia Martinez", status: "active", budget: "₹15L", employeesCount: 8 }
    ],
    teams: [
        { id: "TEM001", name: "Cloud Architecture", leader: "Sarah Chen", department: "IT & Systems", members: 8 },
        { id: "TEM002", name: "Dashboard Squad", leader: "Alex Rivera", department: "Marketing", members: 6 },
        { id: "TEM003", name: "Core ERP Squad", leader: "Emma Watson", department: "Engineering", members: 14 }
    ],
    groups: [
        { id: "GRP001", name: "All Hands Group", description: "Company-wide communication group", members: 245 },
        { id: "GRP002", name: "Dev Board", description: "Technical discussion team board", members: 42 }
    ],
    roles_permissions: [
        { role: "Super Admin", modules: { users: "View/Add/Edit/Delete/Export/Approve", tasks: "View/Add/Edit/Delete/Export/Approve", leads: "View/Add/Edit/Delete/Export/Approve" } },
        { role: "Admin", modules: { users: "View/Add/Edit/Export/Approve", tasks: "View/Add/Edit/Delete/Approve", leads: "View/Add/Edit/Export/Approve" } },
        { role: "Department Manager", modules: { users: "View/Export", tasks: "View/Add/Edit/Delete/Approve", leads: "View/Add/Edit/Export" } },
        { role: "Team Leader", modules: { users: "View", tasks: "View/Add/Edit/Approve", leads: "View/Edit" } },
        { role: "Coordinator", modules: { users: "View", tasks: "View/Edit", leads: "View/Edit" } },
        { role: "Employee/Member", modules: { users: "View", tasks: "View/Edit", leads: "View" } },
        { role: "Intern", modules: { users: "View", tasks: "View", leads: "View" } },
        { role: "Client", modules: { users: "View", tasks: "View", leads: "View" } },
        { role: "Vendor", modules: { users: "View", tasks: "View", leads: "View" } }
    ],
    leads: [
        { id: "LED001", name: "Mango Tech", contact: "John Doe", email: "john@mangotech.com", status: "Fresh", value: "₹12,00,000", phone: "+1 555-0199", date: "2026-07-01", next_followup: "2026-07-10" },
        { id: "LED002", name: "Acme Corp", contact: "Jane Smith", email: "jane@acmecorp.com", status: "Interested", value: "₹8,50,000", phone: "+1 555-0144", date: "2026-07-02", next_followup: "2026-07-12" },
        { id: "LED003", name: "Zylker Ltd", contact: "Tom Wilson", email: "tom@zylker.com", status: "Follow-up", value: "₹15,00,000", phone: "+1 555-0177", date: "2026-07-03", next_followup: "2026-07-15" }
    ],
    tasks: [
        { id: "TSK001", title: "Complete Telemetry Pipeline Setup", desc: "Configure endpoints and logs storage architecture.", status: "Working", assignee: "Emma Watson", deadline: "2026-07-12", priority: "High" },
        { id: "TSK002", title: "Design Premium UI Animations", desc: "Build mockups and CSS animations for standard transitions.", status: "Pending", assignee: "Marcus Lee", deadline: "2026-07-18", priority: "Medium" },
        { id: "TSK003", title: "Review Leads Follow-up API", desc: "Analyze the lead status updates workflow endpoint.", status: "Completed", assignee: "Sarah Chen", deadline: "2026-07-05", priority: "Low" },
        { id: "TSK004", title: "Refactor Dashboard Charts Component", desc: "Upgrade chart sizing and responsive canvas resizing.", status: "Hold", assignee: "Alex Rivera", deadline: "2026-07-22", priority: "High" }
    ],
    attendance: [
        { id: "ATT001", employee: "Sarah Chen", check_in: "08:55 AM", check_out: "06:05 PM", date: "2026-07-08", shift: "Morning Shift (9AM - 6PM)", status: "Present", hours: "9.1h" },
        { id: "ATT002", employee: "Alex Rivera", check_in: "09:02 AM", check_out: "05:58 PM", date: "2026-07-08", shift: "Morning Shift (9AM - 6PM)", status: "Late", hours: "8.9h" },
        { id: "ATT003", employee: "Emma Watson", check_in: "09:15 AM", check_out: "06:12 PM", date: "2026-07-08", shift: "Morning Shift (9AM - 6PM)", status: "Late", hours: "9.0h" },
        { id: "ATT004", employee: "Marcus Lee", check_in: "N/A", check_out: "N/A", date: "2026-07-08", shift: "Night Shift (9PM - 6AM)", status: "Absent", hours: "0h" }
    ],
    shifts: [
        { id: "SHF001", name: "Morning Shift", start: "09:00 AM", end: "06:00 PM", flexible: "No", departments: "Engineering, Marketing, HR" },
        { id: "SHF002", name: "Night Shift", start: "09:00 PM", end: "06:00 AM", flexible: "No", departments: "IT & Systems, Support" },
        { id: "SHF003", name: "Flexible Shift", start: "Flexible", end: "Flexible", flexible: "Yes", departments: "All Departments" }
    ],
    leaves: [
        { id: "LEV001", employee: "Emma Watson", type: "Sick Leave", start: "2026-07-15", end: "2026-07-16", reason: "Medical checkup", status: "Pending" },
        { id: "LEV002", employee: "Marcus Lee", type: "Casual Leave", start: "2026-07-20", end: "2026-07-22", reason: "Family event", status: "Approved" }
    ],
    kpi: [
        { id: "KPI001", name: "Code Coverage", department: "Engineering", target: "85%", weightage: "30%", progress: 80 },
        { id: "KPI002", name: "SLA Resolution Rate", department: "IT & Systems", target: "99%", weightage: "40%", progress: 97 },
        { id: "KPI003", name: "Lead Response Time", department: "Marketing", target: "< 4h", weightage: "25%", progress: 65 }
    ],
    clients: [
        { id: "CLI001", name: "Vapor Technologies", manager: "Alex Rivera", status: "active", revenue: "₹18,00,000", projects: 3, tickets: 2 },
        { id: "CLI002", name: "Nexa Logistics", manager: "Sarah Chen", status: "active", revenue: "₹24,00,000", projects: 4, tickets: 0 }
    ],
    notifications: [
        { id: "NTF001", type: "tasks", message: "New task assigned to you: Complete Telemetry Pipeline Setup", time: "10m ago" },
        { id: "NTF002", type: "attendance", message: "Employee Alex Rivera checked in late today", time: "1h ago" },
        { id: "NTF003", type: "leaves", message: "Emma Watson submitted a new Sick Leave request", time: "2h ago" }
    ],
    audit_logs: [
        { timestamp: "2026-07-08 14:32:10", user: "Sarah Chen", module: "Users", action: "Create", details: "Added employee EMP005 Sophia Martinez" },
        { timestamp: "2026-07-08 14:40:15", user: "Alex Rivera", module: "Tasks", action: "Update", details: "Changed status of TSK003 to Completed" }
    ]
};

// Initialize Mock Database
window.mockDB = JSON.parse(localStorage.getItem('erp_mock_db')) || defaultMockDB;

// Upgrade Database if roles list is stale
if (!window.mockDB.roles_permissions || window.mockDB.roles_permissions.length < 9) {
    window.mockDB = defaultMockDB;
    localStorage.setItem('erp_mock_db', JSON.stringify(window.mockDB));
}

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
    initTheme();
    initSidebar();
});

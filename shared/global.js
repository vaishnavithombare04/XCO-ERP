/**
 * ==========================================================================
 * XtrazCon IT ERP - Shared Global Logic Layer (global.js)
 * ==========================================================================
 */

// Global mockDB Initialization
const defaultMockDB = {
    users: [
        { id: "EMP001", name: "Sarah Chen", email: "sarah.c@xtrazcon.com", role: "Super Admin", department: "Engineering", team: "Core ERP Squad", group: "Core Backend Group", shift: "Morning Shift (9AM - 6PM)", status: "active", phone: "+91 98765 43210", manager: "N/A" },
        { id: "EMP002", name: "Alex Rivera", email: "alex.r@xtrazcon.com", role: "Manager", department: "Engineering", team: "Core ERP Squad", group: "Core Backend Group", shift: "Morning Shift (9AM - 6PM)", status: "active", phone: "+91 98765 43211", manager: "Sarah Chen" },
        { id: "EMP003", name: "Emma Watson", email: "emma.w@xtrazcon.com", role: "Developer", department: "Engineering", team: "Core ERP Squad", group: "Core Backend Group", shift: "Morning Shift (9AM - 6PM)", status: "active", phone: "+91 98765 43212", manager: "Alex Rivera" },
        { id: "EMP004", name: "Marcus Lee", email: "marcus.l@xtrazcon.com", role: "Designer", department: "Engineering", team: "Core ERP Squad", group: "Design Frontend Group", shift: "Night Shift (9PM - 6AM)", status: "pending", phone: "+91 98765 43213", manager: "Sarah Chen" },
        { id: "EMP005", name: "Sophia Martinez", email: "sophia.m@xtrazcon.com", role: "Intern", department: "Engineering", team: "Cloud Platform Squad", group: "Cloud Infra Group", shift: "Flexible Shift", status: "active", phone: "+91 98765 43214", manager: "Sarah Chen" },
        { id: "EMP006", name: "Raj Patel", email: "raj.p@xtrazcon.com", role: "Developer", department: "Engineering", team: "Core ERP Squad", group: "Core Backend Group", shift: "Morning Shift (9AM - 6PM)", status: "active", phone: "+91 98765 43215", manager: "Emma Watson" },
        { id: "EMP007", name: "Nisha Rao", email: "nisha.r@xtrazcon.com", role: "Developer", department: "Engineering", team: "Core ERP Squad", group: "Design Frontend Group", shift: "Morning Shift (9AM - 6PM)", status: "active", phone: "+91 98765 43216", manager: "Marcus Lee" },
        { id: "EMP008", name: "Kabir Singh", email: "kabir.s@xtrazcon.com", role: "Developer", department: "Engineering", team: "Cloud Platform Squad", group: "Cloud Infra Group", shift: "Morning Shift (9AM - 6PM)", status: "active", phone: "+91 98765 43217", manager: "Sophia Martinez" }
    ],
    departments: [
        { id: "DEP001", name: "Engineering", code: "ENG", head: "Alex Rivera", status: "active", budget: "₹80L", employeesCount: 42 },
        { id: "DEP002", name: "Marketing", code: "MKT", head: "Celia White", status: "active", budget: "₹25L", employeesCount: 12 }
    ],
    teams: [
        { id: "TEM001", name: "Core ERP Squad", leader: "Emma Watson", department: "Engineering", members: 6 },
        { id: "TEM002", name: "Cloud Platform Squad", leader: "Sophia Martinez", department: "Engineering", members: 2 }
    ],
    groups: [
        { id: "GRP001", name: "Core Backend Group", description: "Backend APIs and DB optimizations", members: 4 },
        { id: "GRP002", name: "Design Frontend Group", description: "UI Components & Responsive Design", members: 2 },
        { id: "GRP003", name: "Cloud Infra Group", description: "AWS/GCP Deployment automation", members: 2 }
    ],
    roles_permissions: [
        { role: "Super Admin", modules: { users: "View/Add/Edit/Delete/Export/Approve", tasks: "View/Add/Edit/Delete/Export/Approve", leads: "View/Add/Edit/Delete/Export/Approve" } },
        { role: "Admin", modules: { users: "View/Add/Edit/Export/Approve", tasks: "View/Add/Edit/Delete/Approve", leads: "View/Add/Edit/Export/Approve" } },
        { role: "Department Manager", modules: { users: "View/Export", tasks: "View/Add/Edit/Delete/Approve", leads: "View/Add/Edit/Export" } },
        { role: "Team Leader", modules: { users: "View", tasks: "View/Add/Edit/Approve", leads: "View/Edit" } },
        { role: "Coordinator", modules: { users: "View", tasks: "View/Edit", leads: "View/Edit" } }
    ],
    leads: [
        { id: "LED001", name: "Mango Tech", contact: "John Doe", email: "john@mangotech.com", status: "Fresh", value: "₹12,0,000", phone: "+1 555-0199", date: "2026-07-01", next_followup: "2026-07-10", assigned_to: "Raj Patel" },
        { id: "LED002", name: "Acme Corp", contact: "Jane Smith", email: "jane@acmecorp.com", status: "Interested", value: "₹8,50,000", phone: "+1 555-0144", date: "2026-07-02", next_followup: "2026-07-12", assigned_to: "Nisha Rao" },
        { id: "LED003", name: "Zylker Ltd", contact: "Tom Wilson", email: "tom@zylker.com", status: "Follow-up", value: "₹15,0,000", phone: "+1 555-0177", date: "2026-07-03", next_followup: "2026-07-15", assigned_to: "Emma Watson" },
        { id: "LED004", name: "Nova Soft", contact: "Liam Neeson", email: "liam@novasoft.com", status: "Converted", value: "₹25,0,000", phone: "+1 555-0188", date: "2026-07-04", next_followup: "2026-07-18", assigned_to: "Kabir Singh" }
    ],
    tasks: [
        { id: "TSK001", title: "Complete Telemetry Pipeline Setup", desc: "Configure endpoints and logs storage architecture.", status: "Working", assignee: "Emma Watson", deadline: "2026-07-12", priority: "High" },
        { id: "TSK002", title: "Design Premium UI Animations", desc: "Build mockups and CSS animations for standard transitions.", status: "Pending", assignee: "Marcus Lee", deadline: "2026-07-18", priority: "Medium" },
        { id: "TSK003", title: "Review Leads Follow-up API", desc: "Analyze the lead status updates workflow endpoint.", status: "Completed", assignee: "Sarah Chen", deadline: "2026-07-05", priority: "Low" },
        { id: "TSK004", title: "Refactor Dashboard Charts Component", desc: "Upgrade chart sizing and responsive canvas resizing.", status: "Hold", assignee: "Alex Rivera", deadline: "2026-07-22", priority: "High" },
        { id: "TSK005", title: "Write API Documentation", desc: "Document the backend REST endpoints.", status: "Working", assignee: "Raj Patel", deadline: "2026-07-14", priority: "Medium" },
        { id: "TSK006", title: "Fix Button Accessibility", desc: "Improve screen reader compatibility.", status: "Pending", assignee: "Nisha Rao", deadline: "2026-07-19", priority: "Low" },
        { id: "TSK007", title: "Deploy Kubernetes Pods", desc: "Scale the web containers using Helm.", status: "Working", assignee: "Kabir Singh", deadline: "2026-07-13", priority: "High" }
    ],
    attendance: [
        { id: "ATT001", employee: "Sarah Chen", check_in: "08:55 AM", check_out: "06:05 PM", date: "2026-07-08", shift: "Morning Shift (9AM - 6PM)", status: "Present", hours: "9.1h" },
        { id: "ATT002", employee: "Alex Rivera", check_in: "09:02 AM", check_out: "05:58 PM", date: "2026-07-08", shift: "Morning Shift (9AM - 6PM)", status: "Late", hours: "8.9h" },
        { id: "ATT003", employee: "Emma Watson", check_in: "09:15 AM", check_out: "06:12 PM", date: "2026-07-08", shift: "Morning Shift (9AM - 6PM)", status: "Late", hours: "9.0h" },
        { id: "ATT004", employee: "Marcus Lee", check_in: "N/A", check_out: "N/A", date: "2026-07-08", shift: "Night Shift (9PM - 6AM)", status: "Absent", hours: "0h" },
        { id: "ATT005", employee: "Raj Patel", check_in: "08:58 AM", check_out: "06:01 PM", date: "2026-07-08", shift: "Morning Shift (9AM - 6PM)", status: "Present", hours: "9.0h" },
        { id: "ATT006", employee: "Nisha Rao", check_in: "09:30 AM", check_out: "06:00 PM", date: "2026-07-08", shift: "Morning Shift (9AM - 6PM)", status: "Late", hours: "8.5h" },
        { id: "ATT007", employee: "Kabir Singh", check_in: "08:50 AM", check_out: "05:55 PM", date: "2026-07-08", shift: "Morning Shift (9AM - 6PM)", status: "Present", hours: "9.1h" },
        { id: "ATT008", employee: "Sophia Martinez", check_in: "N/A", check_out: "N/A", date: "2026-07-08", shift: "Flexible Shift", status: "Absent", hours: "0h" }
    ],
    shifts: [
        { id: "SHF001", name: "Morning Shift", start: "09:00 AM", end: "06:00 PM", flexible: "No", departments: "Engineering" },
        { id: "SHF002", name: "Night Shift", start: "09:00 PM", end: "06:00 AM", flexible: "No", departments: "Engineering" },
        { id: "SHF003", name: "Flexible Shift", start: "Flexible", end: "Flexible", flexible: "Yes", departments: "Engineering" }
    ],
    leaves: [
        { id: "LEV001", employee: "Emma Watson", type: "Sick Leave", start: "2026-07-15", end: "2026-07-16", reason: "Medical checkup", status: "Pending" },
        { id: "LEV002", employee: "Marcus Lee", type: "Casual Leave", start: "2026-07-20", end: "2026-07-22", reason: "Family event", status: "Approved" },
        { id: "LEV003", employee: "Raj Patel", type: "Sick Leave", start: "2026-07-18", end: "2026-07-19", reason: "Fever", status: "Pending" },
        { id: "LEV004", employee: "Nisha Rao", type: "Casual Leave", start: "2026-07-25", end: "2026-07-26", reason: "Personal work", status: "Pending" }
    ],
    kpi: [
        { id: "KPI001", name: "Code Coverage", department: "Engineering", target: "85%", weightage: "30%", progress: 80, employee: "Emma Watson" },
        { id: "KPI002", name: "SLA Resolution Rate", department: "Engineering", target: "99%", weightage: "40%", progress: 97, employee: "Raj Patel" },
        { id: "KPI003", name: "Lead Response Time", department: "Engineering", target: "< 4h", weightage: "25%", progress: 65, employee: "Marcus Lee" },
        { id: "KPI004", name: "Deployment Success Rate", department: "Engineering", target: "100%", weightage: "20%", progress: 95, employee: "Kabir Singh" }
    ],
    clients: [
        { id: "CLI001", name: "Vapor Technologies", manager: "Alex Rivera", status: "active", revenue: "₹18,00,000", projects: 3, tickets: 2 },
        { id: "CLI002", name: "Nexa Logistics", manager: "Sarah Chen", status: "active", revenue: "₹24,00,000", projects: 4, tickets: 0 }
    ],
    notifications: [
        { id: "NTF001", type: "tasks", message: "New task assigned to you: Complete Telemetry Pipeline Setup", time: "10m ago" },
        { id: "NTF002", type: "attendance", message: "Employee Alex Rivera checked in late today", time: "1h ago" },
        { id: "NTF003", type: "leaves", message: "Emma Watson submitted a new Sick Leave request", time: "2h ago" },
        { id: "NTF004", type: "approvals", message: "Raj Patel requested a task hold approval", time: "5m ago" }
    ],
    audit_logs: [
        { timestamp: "2026-07-08 14:32:10", user: "Sarah Chen", module: "Users", action: "Create", details: "Added employee EMP005 Sophia Martinez" },
        { timestamp: "2026-07-08 14:40:15", user: "Alex Rivera", module: "Tasks", action: "Update", details: "Changed status of TSK003 to Completed" }
    ]
};

// Initialize Mock Database
// For this demo, let's force reinitialization if users count is not matching the expanded structure
const storedDB = localStorage.getItem('erp_mock_db');
if (!storedDB || JSON.parse(storedDB).users.length < 8) {
    window.mockDB = defaultMockDB;
    localStorage.setItem('erp_mock_db', JSON.stringify(defaultMockDB));
} else {
    window.mockDB = JSON.parse(storedDB);
}

// Save Database Helper
window.saveMockDB = () => {
    localStorage.setItem('erp_mock_db', JSON.stringify(window.mockDB));
};

// Scoped Data Retriever
window.getScopedData = (collectionName, currentRole, currentUserId) => {
    const user = window.mockDB.users.find(u => u.id === currentUserId || u.name === currentUserId) || window.mockDB.users.find(u => u.id === "EMP002");
    const dept = user.department;
    const team = user.team;
    const group = user.group;

    const filteredUsers = window.mockDB.users.filter(u => {
        if (currentRole === "Manager") {
            return u.department === dept;
        } else if (currentRole === "TL") {
            return u.department === dept && u.team === team;
        } else if (currentRole === "Coordinator") {
            return u.department === dept && u.team === team && u.group === group;
        }
        return false;
    });

    const userNames = filteredUsers.map(u => u.name);

    if (collectionName === "users") {
        return filteredUsers;
    }

    const rawData = window.mockDB[collectionName] || [];

    if (collectionName === "tasks") {
        return rawData.filter(t => userNames.includes(t.assignee));
    }
    if (collectionName === "leads") {
        return rawData.filter(l => userNames.includes(l.assigned_to));
    }
    if (collectionName === "attendance") {
        return rawData.filter(a => userNames.includes(a.employee));
    }
    if (collectionName === "leaves") {
        return rawData.filter(l => userNames.includes(l.employee));
    }
    if (collectionName === "kpi") {
        return rawData.filter(k => userNames.includes(k.employee));
    }
    if (collectionName === "notifications") {
        // Scoped by notification types or content relevance
        return rawData.filter(n => {
            if (currentRole === "Coordinator") return n.type === "tasks";
            if (currentRole === "TL") return n.type === "tasks" || n.type === "approvals";
            return true;
        });
    }

    return rawData;
};

// Permissions checks
window.canApprove = (action, role) => {
    return role === "Manager";
};

window.canExport = (role) => {
    return role === "Manager" || role === "TL";
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

function initManagerHeader() {
    if (!window.location.pathname.includes('/manager/')) return;
    
    if (!localStorage.getItem('currentRole')) {
        localStorage.setItem('currentRole', 'Manager');
        localStorage.setItem('currentUserId', 'EMP002');
    }
    
    const currentRole = localStorage.getItem('currentRole');
    const headerActions = document.querySelector('.header-actions');
    if (headerActions) {
        const switcherDiv = document.createElement('div');
        switcherDiv.className = 'd-flex align-items-center gap-2 me-3';
        switcherDiv.innerHTML = `
            <span class="text-muted font-12 font-weight-600 text-nowrap d-none d-sm-inline">Viewing as:</span>
            <select id="managerRoleSwitcher" class="form-select form-select-sm" style="width: auto;">
                <option value="Manager" ${currentRole === 'Manager' ? 'selected' : ''}>Manager (Alex)</option>
                <option value="TL" ${currentRole === 'TL' ? 'selected' : ''}>Team Leader (Emma)</option>
                <option value="Coordinator" ${currentRole === 'Coordinator' ? 'selected' : ''}>Coordinator (Marcus)</option>
            </select>
        `;
        headerActions.insertBefore(switcherDiv, headerActions.firstChild);
        
        document.getElementById('managerRoleSwitcher').addEventListener('change', (e) => {
            const val = e.target.value;
            localStorage.setItem('currentRole', val);
            if (val === 'Manager') {
                localStorage.setItem('currentUserId', 'EMP002');
            } else if (val === 'TL') {
                localStorage.setItem('currentUserId', 'EMP003');
            } else if (val === 'Coordinator') {
                localStorage.setItem('currentUserId', 'EMP004');
            }
            window.location.reload();
        });
    }
}

// Global script running
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSidebar();
    initManagerHeader();
});

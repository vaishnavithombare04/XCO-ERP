# XtrazCon IT ERP & CRM System (XCO-ERP)

A comprehensive Enterprise Resource Planning (ERP) and Customer Relationship Management (CRM) system designed for organizational hierarchy management, task delegation, project tracking, employee attendance, and client communication.

---

## 🚀 Key Features

* **Role-Based Access Control (RBAC)**: Comprehensive hierarchy from Super Admin down to Intern, with external views for Clients and Freelancers.
* **Organizational Structure**: Supports grouping by Department → Team → Group → User.
* **Unified Theme Synchronizer**: Smooth Dark/Light mode switching dynamically across all dashboard panels and charts.
* **Interactive Calendar & Custom Selects**: Timezone-safe global date selector and premium dropdown controls.
* **Simulated Security Audits**: Built-in test panels for confirming security and permission constraints.

---

## 📂 Directory Layout

```text
XCO-ERP/
├── admin/                     # Admin Dashboard and management portals
│   ├── attendance.html        # Employee attendance tracking
│   ├── audit-logs.html        # System activity and audit logs
│   ├── clients.html           # Client management page
│   ├── crm-leads.html         # CRM lead tracking and pipeline
│   ├── departments.html       # Department management
│   ├── freelancers-interns.html # Freelancer and intern directory
│   ├── index.html             # Admin dashboard homepage
│   ├── kpi.html               # Key Performance Indicators / analytics
│   ├── leaves.html            # Leave and time-off request management
│   ├── notifications.html     # Notifications panel
│   ├── reports.html           # Reports and analytics generation
│   ├── roles-permissions.html # User role-based access control configurations
│   ├── settings.html          # Portal settings
│   ├── shifts.html            # Employee shift schedule management
│   ├── tasks.html             # Task delegation and tracking
│   ├── teams-groups.html      # Team/group setups
│   └── users.html             # User/employee management
├── client/                    # Client Portal
│   ├── index.html             # Client dashboard
│   ├── projects.html          # Scoped project list & milestones
│   ├── tickets.html           # Scoped support ticket thread
│   ├── invoices.html          # Scoped invoice lists & previews
│   ├── subscription.html      # Plan details & billing records
│   ├── documents.html         # Shared client deliverables
│   ├── profile.html           # Client corporate profile editor
│   └── notifications.html     # Scoped client notifications
├── employee/                  # Employee / Member Portal
│   ├── index.html             # Personal dashboard
│   ├── tasks.html             # Scoped personal tasks Kanban board
│   ├── attendance.html        # Personal check-in / check-out log
│   ├── leaves.html            # Personal leaves application portal
│   ├── kpi.html               # Read-only personal KPI progress
│   ├── documents.html         # Personal payslips & documentation
│   ├── profile.html           # Personal profile view & contact update
│   └── notifications.html     # Scoped personal notifications
├── freelancer/                # Freelancer Portal
│   ├── index.html             # Freelancer dashboard overview
│   ├── tasks.html             # Assigned tasks
│   ├── contracts.html         # Scoped contract terms and progress
│   └── invoices.html          # Invoice billing registry
├── manager/                   # Manager / TL / Coordinator Portal
│   ├── approvals.html         # Consolidated pending approvals inbox
│   ├── attendance.html        # Scoped employee attendance logs
│   ├── crm-leads.html         # Scoped CRM leads pipeline
│   ├── index.html             # Scoped manager dashboard homepage
│   ├── kpi.html               # Scoped member KPI metrics
│   ├── leaves.html            # Scoped leave request management
│   ├── notifications.html     # Scoped notifications hub
│   ├── reports.html           # Scoped productivity and attendance reports
│   ├── tasks.html             # Scoped task Kanban board
│   └── team-overview.html     # Team roster and reporting hierarchy
├── pages/                     # Public and authentication pages
│   ├── login.html             # Login page
│   ├── signup.html            # Registration page
│   └── forgot-password.html   # Password recovery page
├── shared/                    # Shared assets across portals
│   ├── global.css             # Main styling stylesheet
│   └── global.js              # Global script files
└── xtrazcon-intern-only/      # Intern-specific portal files (SEO / Link building tasks)
    ├── intern/                # Intern dashboard HTML/JS views
    └── shared/                # Intern-only custom style & logic assets
```

---

## 👥 User Role Hierarchy & Reporting Flow

```text
Super Admin (SADMIN)
 │   Full system control — sees everything, creates roles/teams
 │
 └── Admin (ADMIN)
     │   Manages departments, templates, teams, reports
     │
     └── Manager (MANAGER)
         │   Oversees one department
         │
         └── Team Leader (TL)
             │   Leads a team, manages groups under it
             │
             └── Coordinator (COORD)
                 │   Oversees one group, assigns work
                 │
                 └── Member / Employee (MEMBER)
                     │   Handles own tasks and leads
                     │
                     └── Intern (INTERN)
                             Task-only, no financial/HR access

       ── EXTERNAL USERS (Scoped access only) ──
 Client (CLIENT)              Freelancer / Vendor (VENDOR)
   → Sees own projects,         → Sees only assigned
     invoices, tickets            projects, tasks, and files
```

---

## 🛠️ Technology Stack

* **Frontend**: HTML5, Vanilla JavaScript, CSS3 (Custom Design System with responsive variables)
* **CSS Framework**: Bootstrap 5 (CSS & JS Components)
* **Icons**: Bootstrap Icons (CDN)
* **Data Storage**: Client-side simulated database (`mockDB`) cached in `localStorage` for high performance persistence.

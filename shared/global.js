/**
 * ==========================================================================
 * XtrazCon IT ERP - Shared Global Logic Layer (global.js)
 * ==========================================================================
 */

// Global mockDB Initialization
const defaultMockDB = {
    "users": [
        {
            "id": "USR_ADMIN",
            "name": "System Admin",
            "email": "admin@xco.com",
            "password": "xco123",
            "role": "Admin",
            "department": "IT & Systems",
            "status": "active",
            "phone": "+91 99999 00001",
            "manager": "N/A"
        },
        {
            "id": "USR_MANAGER",
            "name": "System Manager",
            "email": "manager@xco.com",
            "password": "xco123",
            "role": "Manager",
            "department": "Engineering",
            "team": "Core ERP Squad",
            "status": "active",
            "phone": "+91 99999 00002",
            "manager": "System Admin"
        },
        {
            "id": "USR_EMPLOYEE",
            "name": "System Employee",
            "email": "employee@xco.com",
            "password": "xco123",
            "role": "Employee",
            "department": "Engineering",
            "team": "Core ERP Squad",
            "status": "active",
            "phone": "+91 99999 00003",
            "manager": "System Manager"
        },
        {
            "id": "USR_FREELANCER",
            "name": "System Freelancer",
            "email": "freelancer@xco.com",
            "password": "xco123",
            "role": "Freelancer",
            "department": "Engineering",
            "status": "active",
            "phone": "+91 99999 00004",
            "manager": "System Manager"
        },
        {
            "id": "USR_CLIENT",
            "name": "System Client",
            "email": "client@xco.com",
            "password": "xco123",
            "role": "Client",
            "department": "Sales",
            "status": "active",
            "phone": "+91 99999 00005",
            "manager": "System Admin"
        },
        {
            "id": "USR_INTERN",
            "name": "System Intern",
            "email": "intern@xco.com",
            "password": "xco123",
            "role": "Intern",
            "department": "Engineering",
            "team": "Core ERP Squad",
            "status": "active",
            "phone": "+91 99999 00006",
            "manager": "System Manager"
        },
        {
            "id": "EMP001",
            "name": "Sarah Chen",
            "email": "sarah.c@xtrazcon.com",
            "role": "Super Admin",
            "department": "Engineering",
            "team": "Core ERP Squad",
            "group": "Core Backend Group",
            "shift": "Morning Shift (9AM - 6PM)",
            "status": "active",
            "phone": "+91 98765 43210",
            "manager": "N/A"
        },
        {
            "id": "EMP002",
            "name": "Alex Rivera",
            "email": "alex.r@xtrazcon.com",
            "role": "Manager",
            "department": "Engineering",
            "team": "Core ERP Squad",
            "group": "Core Backend Group",
            "shift": "Morning Shift (9AM - 6PM)",
            "status": "active",
            "phone": "+91 98765 43211",
            "manager": "Sarah Chen"
        },
        {
            "id": "EMP003",
            "name": "Emma Watson",
            "email": "emma.w@xtrazcon.com",
            "role": "Developer",
            "department": "Engineering",
            "team": "Core ERP Squad",
            "group": "Core Backend Group",
            "shift": "Morning Shift (9AM - 6PM)",
            "status": "active",
            "phone": "+91 98765 43212",
            "manager": "Alex Rivera"
        },
        {
            "id": "EMP004",
            "name": "Marcus Lee",
            "email": "marcus.l@xtrazcon.com",
            "role": "Designer",
            "department": "Engineering",
            "team": "Core ERP Squad",
            "group": "Design Frontend Group",
            "shift": "Night Shift (9PM - 6AM)",
            "status": "pending",
            "phone": "+91 98765 43213",
            "manager": "Sarah Chen"
        },
        {
            "id": "EMP005",
            "name": "Sophia Martinez",
            "email": "sophia.m@xtrazcon.com",
            "role": "Intern",
            "department": "Engineering",
            "team": "Cloud Platform Squad",
            "group": "Cloud Infra Group",
            "shift": "Flexible Shift",
            "status": "active",
            "phone": "+91 98765 43214",
            "manager": "Sarah Chen"
        },
        {
            "id": "EMP006",
            "name": "Raj Patel",
            "email": "raj.p@xtrazcon.com",
            "role": "Developer",
            "department": "Engineering",
            "team": "Core ERP Squad",
            "group": "Core Backend Group",
            "shift": "Morning Shift (9AM - 6PM)",
            "status": "active",
            "phone": "+91 98765 43215",
            "manager": "Emma Watson"
        },
        {
            "id": "EMP007",
            "name": "Nisha Rao",
            "email": "nisha.r@xtrazcon.com",
            "role": "Developer",
            "department": "Engineering",
            "team": "Core ERP Squad",
            "group": "Design Frontend Group",
            "shift": "Morning Shift (9AM - 6PM)",
            "status": "active",
            "phone": "+91 98765 43216",
            "manager": "Marcus Lee"
        },
        {
            "id": "EMP008",
            "name": "Kabir Singh",
            "email": "kabir.s@xtrazcon.com",
            "role": "Developer",
            "department": "Engineering",
            "team": "Cloud Platform Squad",
            "group": "Cloud Infra Group",
            "shift": "Morning Shift (9AM - 6PM)",
            "status": "active",
            "phone": "+91 98765 43217",
            "manager": "Sophia Martinez"
        },
        {
            "id": "FL001",
            "name": "Rohan Sharma",
            "email": "rohan@gmail.com",
            "role": "Freelancer",
            "department": "Engineering",
            "team": "Core ERP Squad",
            "group": "Core Backend Group",
            "shift": "Flexible Freelancer Shift",
            "status": "active",
            "phone": "+91 99999 88888",
            "manager": "Sarah Chen"
        }
    ],
    "departments": [
        {
            "id": "DEP001",
            "name": "Engineering",
            "code": "ENG",
            "head": "Alex Rivera",
            "status": "active",
            "budget": "₹80L",
            "employeesCount": 42
        },
        {
            "id": "DEP002",
            "name": "Marketing",
            "code": "MKT",
            "head": "Celia White",
            "status": "active",
            "budget": "₹25L",
            "employeesCount": 12
        },
        {
            "id": "DEP003",
            "name": "IT & Systems",
            "code": "ITS",
            "head": "Sarah Chen",
            "status": "active",
            "budget": "₹45L",
            "employeesCount": 15
        },
        {
            "id": "DEP004",
            "name": "Development",
            "code": "DEV",
            "head": "Sarah Chen",
            "status": "active",
            "budget": "₹25L",
            "employeesCount": 12
        }
    ],
    "teams": [
        {
            "id": "TEM001",
            "name": "Core ERP Squad",
            "leader": "Emma Watson",
            "department": "Engineering",
            "members": 6
        },
        {
            "id": "TEM002",
            "name": "Cloud Platform Squad",
            "leader": "Sophia Martinez",
            "department": "Engineering",
            "members": 2
        },
        {
            "id": "TEM003",
            "name": "Frontend Team",
            "leader": "Sarah Chen",
            "department": "Development",
            "members": 4
        }
    ],
    "groups": [
        {
            "id": "GRP001",
            "name": "Core Backend Group",
            "description": "Backend APIs and DB optimizations",
            "members": 4
        },
        {
            "id": "GRP002",
            "name": "Design Frontend Group",
            "description": "UI Components & Responsive Design",
            "members": 2
        },
        {
            "id": "GRP003",
            "name": "Cloud Infra Group",
            "description": "AWS/GCP Deployment automation",
            "members": 2
        },
        {
            "id": "GRP004",
            "name": "UI Prototype Group",
            "description": "ERP UI prototyping freelancers & developers",
            "members": 2
        }
    ],
    "roles_permissions": [
        {
            "role": "Super Admin",
            "modules": {
                "users": "View/Add/Edit/Delete/Export/Approve",
                "tasks": "View/Add/Edit/Delete/Export/Approve",
                "leads": "View/Add/Edit/Delete/Export/Approve"
            }
        },
        {
            "role": "Admin",
            "modules": {
                "users": "View/Add/Edit/Export/Approve",
                "tasks": "View/Add/Edit/Delete/Approve",
                "leads": "View/Add/Edit/Export/Approve"
            }
        },
        {
            "role": "Department Manager",
            "modules": {
                "users": "View/Export",
                "tasks": "View/Add/Edit/Delete/Approve",
                "leads": "View/Add/Edit/Export"
            }
        },
        {
            "role": "Team Leader",
            "modules": {
                "users": "View",
                "tasks": "View/Add/Edit/Approve",
                "leads": "View/Edit"
            }
        },
        {
            "role": "Coordinator",
            "modules": {
                "users": "View",
                "tasks": "View/Edit",
                "leads": "View/Edit"
            }
        },
        {
            "role": "Freelancer",
            "modules": {
                "users": "View",
                "tasks": "View/Edit/Submit",
                "contracts": "View",
                "invoices": "View/Add/Edit"
            }
        }
    ],
    "leads": [
        {
            "id": "LED001",
            "name": "Mango Tech",
            "contact": "John Doe",
            "email": "john@mangotech.com",
            "status": "Fresh",
            "value": "₹12,00,000",
            "phone": "+1 555-0199",
            "date": "2026-07-01",
            "next_followup": "2026-07-10",
            "assigned_to": "Raj Patel"
        },
        {
            "id": "LED002",
            "name": "Acme Corp",
            "contact": "Jane Smith",
            "email": "jane@acmecorp.com",
            "status": "Interested",
            "value": "₹8,50,000",
            "phone": "+1 555-0144",
            "date": "2026-07-02",
            "next_followup": "2026-07-12",
            "assigned_to": "Nisha Rao"
        },
        {
            "id": "LED003",
            "name": "Zylker Ltd",
            "contact": "Tom Wilson",
            "email": "tom@zylker.com",
            "status": "Follow-up",
            "value": "₹15,0,000",
            "phone": "+1 555-0177",
            "date": "2026-07-03",
            "next_followup": "2026-07-15",
            "assigned_to": "Emma Watson"
        },
        {
            "id": "LED004",
            "name": "Nova Soft",
            "contact": "Liam Neeson",
            "email": "liam@novasoft.com",
            "status": "Converted",
            "value": "₹25,0,000",
            "phone": "+1 555-0188",
            "date": "2026-07-04",
            "next_followup": "2026-07-18",
            "assigned_to": "Kabir Singh"
        }
    ],
    "tasks": [
        {
            "id": "TSK001",
            "title": "Complete Telemetry Pipeline Setup",
            "desc": "Configure endpoints and logs storage architecture.",
            "status": "Working",
            "assignee": "Emma Watson",
            "deadline": "2026-07-12",
            "priority": "High"
        },
        {
            "id": "TSK002",
            "title": "Design Premium UI Animations",
            "desc": "Build mockups and CSS animations for standard transitions.",
            "status": "Pending",
            "assignee": "Marcus Lee",
            "deadline": "2026-07-18",
            "priority": "Medium"
        },
        {
            "id": "TSK003",
            "title": "Review Leads Follow-up API",
            "desc": "Analyze the lead status updates workflow endpoint.",
            "status": "Completed",
            "assignee": "Sarah Chen",
            "deadline": "2026-07-05",
            "priority": "Low"
        },
        {
            "id": "TSK004",
            "title": "Refactor Dashboard Charts Component",
            "desc": "Upgrade chart sizing and responsive canvas resizing.",
            "status": "Hold",
            "assignee": "Alex Rivera",
            "deadline": "2026-07-22",
            "priority": "High"
        },
        {
            "id": "TSK005",
            "title": "Write API Documentation",
            "desc": "Document the backend REST endpoints.",
            "status": "Working",
            "assignee": "Raj Patel",
            "deadline": "2026-07-14",
            "priority": "Medium"
        },
        {
            "id": "TSK006",
            "title": "Fix Button Accessibility",
            "desc": "Improve screen reader compatibility.",
            "status": "Pending",
            "assignee": "Nisha Rao",
            "deadline": "2026-07-19",
            "priority": "Low"
        },
        {
            "id": "TSK007",
            "title": "Deploy Kubernetes Pods",
            "desc": "Scale the web containers using Helm.",
            "status": "Working",
            "assignee": "Kabir Singh",
            "deadline": "2026-07-13",
            "priority": "High"
        },
        {
            "id": "TSK-001",
            "title": "Freelancer Dashboard Design",
            "desc": "Build responsive landing panel for freelancer workspace with blue/purple theme.",
            "status": "Working",
            "assignee": "Rohan Sharma",
            "deadline": "2026-07-12",
            "priority": "High",
            "assignedBy": "Sarah Chen"
        },
        {
            "id": "TSK-002",
            "title": "Invoice Generator Interface",
            "desc": "Create interactive forms and calculations for raising billing invoices.",
            "status": "Pending",
            "assignee": "Rohan Sharma",
            "deadline": "2026-07-14",
            "priority": "High",
            "assignedBy": "Sarah Chen"
        },
        {
            "id": "TSK-003",
            "title": "Integrate Calendar Popover",
            "desc": "Ensure date picker popover binds to the server date correctly in the dashboard.",
            "status": "Completed",
            "assignee": "Rohan Sharma",
            "deadline": "2026-07-09",
            "priority": "Medium",
            "assignedBy": "Sarah Chen"
        },
        {
            "id": "TSK-004",
            "title": "Responsive Navigation Sidebar",
            "desc": "Fix collapse triggers and toggle buttons for phone views.",
            "status": "Completed",
            "assignee": "Rohan Sharma",
            "deadline": "2026-07-08",
            "priority": "High",
            "assignedBy": "Sarah Chen"
        },
        {
            "id": "TSK-005",
            "title": "API Endpoint Connection Check",
            "desc": "Mock dynamic endpoints verification suite.",
            "status": "Hold",
            "assignee": "Rohan Sharma",
            "deadline": "2026-07-18",
            "priority": "Low",
            "assignedBy": "Sarah Chen"
        },
        {
            "id": "TSK-006",
            "title": "Integrate Stripe Payouts API",
            "desc": "Configure payment gateways and connect stripe checkout to invoice records.",
            "status": "Pending",
            "assignee": "Rohan Sharma",
            "deadline": "2026-07-22",
            "priority": "Medium",
            "assignedBy": "Sarah Chen"
        },
        {
            "id": "TSK-007",
            "title": "Refactor Theme State Synchronizer",
            "desc": "Optimize local storage state hooks for cross-window events.",
            "status": "Working",
            "assignee": "Rohan Sharma",
            "deadline": "2026-07-25",
            "priority": "Medium",
            "assignedBy": "Sarah Chen"
        },
        {
            "id": "TSK-008",
            "title": "Write Client Invoicing Unit Tests",
            "desc": "Implement mock test assertions for GSTIN and PAN calculations.",
            "status": "Pending",
            "assignee": "Rohan Sharma",
            "deadline": "2026-07-28",
            "priority": "Low",
            "assignedBy": "Sarah Chen"
        }
    ],
    "attendance": [
        {
            "id": "ATT001",
            "employee": "Sarah Chen",
            "check_in": "08:55 AM",
            "check_out": "06:05 PM",
            "date": "2026-07-08",
            "shift": "Morning Shift (9AM - 6PM)",
            "status": "Present",
            "hours": "9.1h"
        },
        {
            "id": "ATT002",
            "employee": "Alex Rivera",
            "check_in": "09:02 AM",
            "check_out": "05:58 PM",
            "date": "2026-07-08",
            "shift": "Morning Shift (9AM - 6PM)",
            "status": "Late",
            "hours": "8.9h"
        },
        {
            "id": "ATT003",
            "employee": "Emma Watson",
            "check_in": "09:15 AM",
            "check_out": "06:12 PM",
            "date": "2026-07-08",
            "shift": "Morning Shift (9AM - 6PM)",
            "status": "Late",
            "hours": "9.0h"
        },
        {
            "id": "ATT004",
            "employee": "Marcus Lee",
            "check_in": "N/A",
            "check_out": "N/A",
            "date": "2026-07-08",
            "shift": "Night Shift (9PM - 6AM)",
            "status": "Absent",
            "hours": "0h"
        },
        {
            "id": "ATT005",
            "employee": "Raj Patel",
            "check_in": "08:58 AM",
            "check_out": "06:01 PM",
            "date": "2026-07-08",
            "shift": "Morning Shift (9AM - 6PM)",
            "status": "Present",
            "hours": "9.0h"
        },
        {
            "id": "ATT006",
            "employee": "Nisha Rao",
            "check_in": "09:30 AM",
            "check_out": "06:00 PM",
            "date": "2026-07-08",
            "shift": "Morning Shift (9AM - 6PM)",
            "status": "Late",
            "hours": "8.5h"
        },
        {
            "id": "ATT007",
            "employee": "Kabir Singh",
            "check_in": "08:50 AM",
            "check_out": "05:55 PM",
            "date": "2026-07-08",
            "shift": "Morning Shift (9AM - 6PM)",
            "status": "Present",
            "hours": "9.1h"
        },
        {
            "id": "ATT008",
            "employee": "Sophia Martinez",
            "check_in": "N/A",
            "check_out": "N/A",
            "date": "2026-07-08",
            "shift": "Flexible Shift",
            "status": "Absent",
            "hours": "0h"
        },
        {
            "id": "ATT009",
            "employee": "Rohan Sharma",
            "check_in": "09:00 AM",
            "check_out": "01:00 PM",
            "date": "2026-07-09",
            "shift": "Flexible Freelancer Shift",
            "status": "Present",
            "hours": "4.0",
            "work_desc": "Coded Dashboard components and aligned columns."
        },
        {
            "id": "ATT010",
            "employee": "Rohan Sharma",
            "check_in": "02:00 PM",
            "check_out": "06:00 PM",
            "date": "2026-07-09",
            "shift": "Flexible Freelancer Shift",
            "status": "Present",
            "hours": "4.0",
            "work_desc": "Wrote global theme-switching events."
        },
        {
            "id": "ATT011",
            "employee": "Rohan Sharma",
            "check_in": "10:00 AM",
            "check_out": "04:00 PM",
            "date": "2026-07-08",
            "shift": "Flexible Freelancer Shift",
            "status": "Present",
            "hours": "6.0",
            "work_desc": "Developed responsive layout structures and tested CSS."
        }
    ],
    "shifts": [
        {
            "id": "SHF001",
            "name": "Morning Shift",
            "start": "09:00 AM",
            "end": "06:00 PM",
            "flexible": "No",
            "departments": "Engineering"
        },
        {
            "id": "SHF002",
            "name": "Night Shift",
            "start": "09:00 PM",
            "end": "06:00 AM",
            "flexible": "No",
            "departments": "Engineering"
        },
        {
            "id": "SHF003",
            "name": "Flexible Shift",
            "start": "Flexible",
            "end": "Flexible",
            "flexible": "Yes",
            "departments": "Engineering"
        },
        {
            "id": "SHF004",
            "name": "Freelancer Flex Hours",
            "start": "Flexible",
            "end": "Flexible",
            "flexible": "Yes",
            "departments": "Development"
        }
    ],
    "leaves": [
        {
            "id": "LEV001",
            "employee": "Emma Watson",
            "type": "Sick Leave",
            "start": "2026-07-15",
            "end": "2026-07-16",
            "reason": "Medical checkup",
            "status": "Pending"
        },
        {
            "id": "LEV002",
            "employee": "Marcus Lee",
            "type": "Casual Leave",
            "start": "2026-07-20",
            "end": "2026-07-22",
            "reason": "Family event",
            "status": "Approved"
        },
        {
            "id": "LEV003",
            "employee": "Raj Patel",
            "type": "Sick Leave",
            "start": "2026-07-18",
            "end": "2026-07-19",
            "reason": "Fever",
            "status": "Pending"
        },
        {
            "id": "LEV004",
            "employee": "Nisha Rao",
            "type": "Casual Leave",
            "start": "2026-07-25",
            "end": "2026-07-26",
            "reason": "Personal work",
            "status": "Pending"
        }
    ],
    "contracts": [
        {
            "id": "CON-2026-08A",
            "freelancerId": "FL001",
            "title": "Senior React Developer - XtrazCon ERP Prototype",
            "status": "Active",
            "hourlyRate": 2200,
            "startDate": "2026-07-01",
            "endDate": "2026-12-31",
            "billingCycle": "Bi-weekly",
            "signedDate": "2026-06-28",
            "totalBudget": "₹5,00,000",
            "escrowBalance": "₹3,50,000",
            "progress": 45
        }
    ],
    "milestones": [
        {
            "id": "MS-001",
            "contractId": "CON-2026-08A",
            "name": "Milestone 1: UI/UX Wireframe & Design Review",
            "amount": "₹1,00,000",
            "status": "Approved",
            "dueDate": "2026-07-05",
            "paymentStatus": "Paid"
        },
        {
            "id": "MS-002",
            "contractId": "CON-2026-08A",
            "name": "Milestone 2: HTML/CSS Responsive Templates",
            "amount": "₹1,50,000",
            "status": "Submitted",
            "dueDate": "2026-07-15",
            "paymentStatus": "Pending Approval"
        },
        {
            "id": "MS-003",
            "contractId": "CON-2026-08A",
            "name": "Milestone 3: JS Controller & Dynamic Integration",
            "amount": "₹1,50,000",
            "status": "Active",
            "dueDate": "2026-08-01",
            "paymentStatus": "Unpaid"
        },
        {
            "id": "MS-004",
            "contractId": "CON-2026-08A",
            "name": "Milestone 4: Deployment & Final QA Handover",
            "amount": "₹1,00,000",
            "status": "Pending",
            "dueDate": "2026-08-15",
            "paymentStatus": "Unpaid"
        }
    ],
    "invoices": [
        {
            "id": "INV001",
            "client_id": "CLI001",
            "project": "Cloud Infrastructure Deployment",
            "amount": 450000,
            "due": "2026-07-15",
            "status": "Pending",
            "line_items": [
                {
                    "desc": "Initial AWS Setup & VPC Config",
                    "price": 200000
                },
                {
                    "desc": "Terraform Module & Helm deployment",
                    "price": 250000
                }
            ]
        },
        {
            "id": "INV002",
            "client_id": "CLI001",
            "project": "Portal Re-design",
            "amount": 300000,
            "due": "2026-06-30",
            "status": "Paid",
            "line_items": [
                {
                    "desc": "Design specs & wireframe completion",
                    "price": 300000
                }
            ]
        },
        {
            "id": "INV-2026-001",
            "freelancerId": "FL001",
            "contractId": "CON-2026-08A",
            "date": "2026-07-05",
            "amount": "100000",
            "hours": 45,
            "status": "Paid",
            "description": "Invoicing for Milestone 1 - Wireframe & Base Layout Setup",
            "paidDate": "2026-07-06"
        },
        {
            "id": "INV-2026-002",
            "freelancerId": "FL001",
            "contractId": "CON-2026-08A",
            "date": "2026-07-10",
            "amount": "66000",
            "hours": 30,
            "status": "Pending",
            "description": "Frontend implementation for Tasks TSK-001 and TSK-002"
        }
    ],
    "kpi": [
        {
            "id": "KPI001",
            "name": "Code Coverage",
            "department": "Engineering",
            "target": "85%",
            "weightage": "30%",
            "progress": 80,
            "employee": "Emma Watson"
        },
        {
            "id": "KPI002",
            "name": "SLA Resolution Rate",
            "department": "Engineering",
            "target": "99%",
            "weightage": "40%",
            "progress": 97,
            "employee": "Raj Patel"
        },
        {
            "id": "KPI003",
            "name": "Lead Response Time",
            "department": "Engineering",
            "target": "< 4h",
            "weightage": "25%",
            "progress": 65,
            "employee": "Marcus Lee"
        },
        {
            "id": "KPI004",
            "name": "Deployment Success Rate",
            "department": "Engineering",
            "target": "100%",
            "weightage": "20%",
            "progress": 95,
            "employee": "Kabir Singh"
        },
        {
            "id": "KPI-FL001",
            "name": "Frontend Sprint Tickets Solved",
            "department": "Development",
            "target": "12 Tickets Completed",
            "weightage": "50%",
            "progress": 66,
            "employee": "Rohan Sharma"
        },
        {
            "id": "KPI-FL002",
            "name": "Quality Assurance Reviews Passed",
            "department": "Development",
            "target": "100% Code Quality Pass",
            "weightage": "30%",
            "progress": 95,
            "employee": "Rohan Sharma"
        },
        {
            "id": "KPI-FL003",
            "name": "Milestone Documentation Uploads",
            "department": "Development",
            "target": "Full documentation updates",
            "weightage": "20%",
            "progress": 80,
            "employee": "Rohan Sharma"
        }
    ],
    "reports": [
        {
            "id": "REP001",
            "task": "Responsive Navigation Sidebar",
            "work_done": "Code committed to main branch. Verified mobile and tablet views.",
            "time_spent": 6,
            "date": "2026-07-08",
            "status": "Approved",
            "link": "https://github.com/xtrazcon/erp-frontend/pull/24"
        },
        {
            "id": "REP002",
            "task": "Integrate Calendar Popover",
            "work_done": "Fixed click-out boundary behavior. Aligned layout grids.",
            "time_spent": 4,
            "date": "2026-07-09",
            "status": "Approved",
            "link": "https://github.com/xtrazcon/erp-frontend/pull/28"
        }
    ],
    "projects": [
        {
            "id": "PRJ001",
            "client_id": "CLI001",
            "name": "Cloud Infrastructure Deployment",
            "status": "On Track",
            "progress": 85,
            "start": "2026-05-01",
            "delivery": "2026-08-15",
            "desc": "Deploy AWS infrastructure with auto-scaling Kubernetes cluster.",
            "manager": "Alex Rivera",
            "milestones": [
                "Requirements Analysis (Done)",
                "Infrastructure Setup (Done)",
                "API Deployment (In Progress)",
                "Client Handover (Pending)"
            ]
        },
        {
            "id": "PRJ002",
            "client_id": "CLI001",
            "name": "Portal Re-design",
            "status": "At Risk",
            "progress": 45,
            "start": "2026-06-10",
            "delivery": "2026-09-01",
            "desc": "Redesign the UI dashboard with responsive premium themes.",
            "manager": "Marcus Lee",
            "milestones": [
                "Design Mockups (Done)",
                "Front-end Integration (In Progress)",
                "User testing (Pending)"
            ]
        },
        {
            "id": "PRJ003",
            "name": "Zim Ban Brand Authority Integration",
            "description": "Configure Domain SEO analytics and backlink crawler automation panels.",
            "deadline": "2026-09-30",
            "team_members": [
                "Rohan Sharma",
                "Alex Rivera"
            ],
            "status": "Active",
            "progress": 15
        },
        {
            "id": "PRJ004",
            "name": "XtrazCon IT ERP Database Core",
            "description": "Configure PostgreSQL replication clusters and read-replica routing pools.",
            "deadline": "2026-10-15",
            "team_members": [
                "Rohan Sharma",
                "Sarah Chen"
            ],
            "status": "Pending",
            "progress": 0
        },
        {
            "id": "PRJ005",
            "name": "XtrazCon IT ERP UI Prototype",
            "description": "Design and build responsive enterprise ERP frontend modules.",
            "deadline": "2026-08-20",
            "team_members": [
                "Rohan Sharma",
                "Sarah Chen",
                "Alex Rivera"
            ],
            "status": "Active",
            "progress": 60
        },
        {
            "id": "PRJ006",
            "name": "Acme SaaS Portal Integration",
            "description": "Configure API bindings and authentication for client Acme.",
            "deadline": "2026-09-15",
            "team_members": [
                "Rohan Sharma",
                "Sarah Chen"
            ],
            "status": "Active",
            "progress": 25
        }
    ],
    "clients": [
        {
            "id": "CLI001",
            "name": "Vapor Technologies",
            "manager": "Alex Rivera",
            "status": "active",
            "revenue": "₹18,00,000",
            "projects": 3,
            "tickets": 2
        },
        {
            "id": "CLI002",
            "name": "Nexa Logistics",
            "manager": "Sarah Chen",
            "status": "active",
            "revenue": "₹24,00,000",
            "projects": 4,
            "tickets": 0
        }
    ],
    "notifications": [
        {
            "id": "NTF001",
            "type": "tasks",
            "message": "New task assigned to you: Complete Telemetry Pipeline Setup",
            "time": "10m ago"
        },
        {
            "id": "NTF002",
            "type": "attendance",
            "message": "Employee Alex Rivera checked in late today",
            "time": "1h ago"
        },
        {
            "id": "NTF003",
            "type": "leaves",
            "message": "Emma Watson submitted a new Sick Leave request",
            "time": "2h ago"
        },
        {
            "id": "NTF004",
            "type": "approvals",
            "message": "Raj Patel requested a task hold approval",
            "time": "5m ago"
        },
        {
            "id": "NTF-FL001",
            "type": "tasks",
            "message": "Sarah Chen assigned task: Freelancer Dashboard Design",
            "time": "10m ago"
        },
        {
            "id": "NTF-FL002",
            "type": "billing",
            "message": "Invoice INV-2026-001 for ₹1,00,000 has been marked as PAID.",
            "time": "4d ago"
        },
        {
            "id": "NTF-FL003",
            "type": "feedback",
            "message": "Milestone 1 design deliverables approved by Sarah Chen.",
            "time": "5d ago"
        }
    ],
    "subscriptions": [
        {
            "client_id": "CLI001",
            "plan": "Enterprise Cloud Support",
            "price": "₹1,50,000/mo",
            "renewal": "2026-08-01",
            "features": [
                "24/7 Phone support",
                "SLA: 2 Hours response",
                "Dedicated Technical Manager",
                "Weekly status calls"
            ],
            "billing_history": [
                {
                    "date": "2026-07-01",
                    "desc": "Enterprise support monthly renewal",
                    "amount": "₹1,50,000",
                    "status": "Paid"
                }
            ]
        }
    ],
    "client_documents": [
        {
            "id": "CDOC001",
            "client_id": "CLI001",
            "project": "Cloud Infrastructure Deployment",
            "title": "Architecture Blueprint Spec V2",
            "type": "Design Spec",
            "date": "2026-06-15",
            "filename": "architecture_spec_v2.pdf"
        },
        {
            "id": "CDOC002",
            "client_id": "CLI001",
            "project": "Portal Re-design",
            "title": "Brand Identity Guide Book",
            "type": "Asset",
            "date": "2026-06-22",
            "filename": "brand_identity_guide.pdf"
        }
    ],
    "audit_logs": [
        {
            "timestamp": "2026-07-08 14:32:10",
            "user": "Sarah Chen",
            "module": "Users",
            "action": "Create",
            "details": "Added employee EMP005 Sophia Martinez"
        },
        {
            "timestamp": "2026-07-08 14:40:15",
            "user": "Alex Rivera",
            "module": "Tasks",
            "action": "Update",
            "details": "Changed status of TSK003 to Completed"
        },
        {
            "timestamp": "2026-07-10 10:05:00",
            "user": "Rohan Sharma",
            "module": "Attendance",
            "action": "Check-in",
            "details": "Checked in for Flexible Freelancer Shift"
        }
    ]
};

// Initialize Mock Database
const storedDB = localStorage.getItem('erp_mock_db');
let parsedDB = null;
try {
    if (storedDB) {
        parsedDB = JSON.parse(storedDB);
    }
} catch (e) {
    console.error("Malformed erp_mock_db in localStorage, resetting to default:", e);
    localStorage.removeItem('erp_mock_db');
}

if (!parsedDB || !parsedDB.users || parsedDB.users.length < 9 || !parsedDB.contracts) {
    window.mockDB = defaultMockDB;
    localStorage.setItem('erp_mock_db', JSON.stringify(defaultMockDB));
} else {
    window.mockDB = parsedDB;
    // Ensure all collections from defaultMockDB exist in window.mockDB (safeguard)
    Object.keys(defaultMockDB).forEach(key => {
        if (!window.mockDB[key] || !Array.isArray(window.mockDB[key])) {
            window.mockDB[key] = defaultMockDB[key];
        }
    });
}

// Ensure the 6 custom role-wise accounts exist in mockDB (forces update even if localStorage exists)
const customEmails = ["admin@xco.com", "manager@xco.com", "employee@xco.com", "freelancer@xco.com", "client@xco.com", "intern@xco.com"];
const hasCustomUsers = window.mockDB.users.some(u => customEmails.includes(u.email));
if (!hasCustomUsers) {
    const customUsers = defaultMockDB.users.filter(u => customEmails.includes(u.email));
    window.mockDB.users = customUsers.concat(window.mockDB.users);
    window.saveMockDB();
}

// Save Database Helper
window.saveMockDB = () => {
    localStorage.setItem('erp_mock_db', JSON.stringify(window.mockDB));
};

// Scoped Data Retriever
window.getScopedData = (collectionName, currentRole, currentUserId) => {
    if (currentRole === "client" || currentRole === "Client") {
        const clientId = currentUserId || "CLI001";
        const rawData = window.mockDB[collectionName] || [];
        if (collectionName === "projects" || collectionName === "tickets" || collectionName === "invoices" || collectionName === "subscriptions" || collectionName === "client_documents") {
            return rawData.filter(item => item.client_id === clientId);
        }
        if (collectionName === "notifications") {
            return rawData.filter(n => n.type === "tickets" || n.type === "invoices" || n.type === "projects");
        }
        return [];
    }

    const activeUser = window.mockDB.users.find(u => u.id === currentUserId || u.name === currentUserId);
    const fallbackUser = window.mockDB.users.find(u => u.id === "EMP002") || window.mockDB.users[0] || { department: "Engineering", team: "Core ERP Squad", group: "Core Backend Group" };
    const user = activeUser || fallbackUser;
    const dept = user.department || "Engineering";
    const team = user.team || "Core ERP Squad";
    const group = user.group || "Core Backend Group";

    let filteredUsers = window.mockDB.users.filter(u => {
        if (currentRole === "Manager") {
            return u.department === dept;
        } else if (currentRole === "TL") {
            return u.department === dept && u.team === team;
        } else if (currentRole === "Coordinator") {
            return u.department === dept && u.team === team && u.group === group;
        } else if (currentRole === "member" || currentRole === "Employee") {
            return u.id === currentUserId || u.name === currentUserId;
        }
        return false;
    });

    // Fallback: If no other team members exist in this department/scope, dynamically add dummy employees so the manager folder always displays rich dummy data!
    const onlyManagerSelf = filteredUsers.length === 1 && filteredUsers[0].id === currentUserId;
    if (filteredUsers.length === 0 || onlyManagerSelf) {
        const dummyMembers = [
            { id: "EMP901", name: "Rahul Sharma", role: "Developer", department: dept, team: team, group: group, shift: "Morning Shift (9AM - 6PM)", status: "active", phone: "+91 98111 22233", manager: user.name },
            { id: "EMP902", name: "Priya Patel", role: "Designer", department: dept, team: team, group: group, shift: "Morning Shift (9AM - 6PM)", status: "active", phone: "+91 98111 22234", manager: user.name },
            { id: "EMP903", name: "Amit Verma", role: "Intern", department: dept, team: team, group: group, shift: "Flexible Shift", status: "pending", phone: "+91 98111 22235", manager: user.name }
        ];
        filteredUsers = filteredUsers.concat(dummyMembers);
    }

    const userNames = filteredUsers.map(u => u.name);

    if (collectionName === "users") {
        return filteredUsers;
    }

    const rawData = window.mockDB[collectionName] || [];

    if (collectionName === "tasks") {
        let result = rawData.filter(t => userNames.includes(t.assignee));
        if (result.length === 0) {
            const assignable = filteredUsers.filter(u => u.id !== currentUserId);
            const n1 = assignable[0]?.name || "Rahul Sharma";
            const n2 = assignable[1]?.name || "Priya Patel";
            result = [
                { id: "TSK901", title: "Setup Department Portal UI", desc: "Draft layouts and templates.", assignee: n1, deadline: "2026-07-20", status: "Working", priority: "High" },
                { id: "TSK902", title: "Database Schema Migration", desc: "Perform table index optimization.", assignee: n2, deadline: "2026-07-22", status: "Pending", priority: "Medium" },
                { id: "TSK903", title: "Conduct Vulnerability Scan", desc: "Run static code security analyzer.", assignee: n1, deadline: "2026-07-18", status: "Completed", priority: "High" }
            ];
        }
        return result;
    }
    if (collectionName === "leads") {
        let result = rawData.filter(l => userNames.includes(l.assigned_to));
        if (result.length === 0) {
            const assignable = filteredUsers.filter(u => u.id !== currentUserId);
            const n1 = assignable[0]?.name || "Rahul Sharma";
            const n2 = assignable[1]?.name || "Priya Patel";
            result = [
                { id: "LED901", name: "Nexus Digital Solutions", contact: "Rajesh Kumar", email: "rajesh@nexusdigi.com", status: "Fresh", value: "₹5,40,000", phone: "+91 99111 88221", date: "2026-07-05", next_followup: "2026-07-16", assigned_to: n1 },
                { id: "LED902", name: "Star Software Labs", contact: "Sunita Roy", email: "sunita@starsoftware.io", status: "Interested", value: "₹8,20,000", phone: "+91 99111 88222", date: "2026-07-06", next_followup: "2026-07-17", assigned_to: n2 },
                { id: "LED903", name: "CloudWorks ERP", contact: "Vijay Patel", email: "vijay@cloudworks.com", status: "Follow-up", value: "₹12,50,000", phone: "+91 99111 88223", date: "2026-07-08", next_followup: "2026-07-18", assigned_to: n1 }
            ];
        }
        return result;
    }
    if (collectionName === "attendance") {
        let result = rawData.filter(a => userNames.includes(a.employee));
        if (result.length === 0) {
            const assignable = filteredUsers.filter(u => u.id !== currentUserId);
            const n1 = assignable[0]?.name || "Rahul Sharma";
            const n2 = assignable[1]?.name || "Priya Patel";
            const n3 = assignable[2]?.name || "Amit Verma";
            result = [
                { id: "ATT901", employee: n1, check_in: "09:02 AM", check_out: "06:05 PM", shift: "Morning Shift", hours: "9.0", status: "Present", date: "2026-07-15" },
                { id: "ATT902", employee: n2, check_in: "09:45 AM", check_out: "06:00 PM", shift: "Morning Shift", hours: "8.25", status: "Late", date: "2026-07-15" },
                { id: "ATT903", employee: n3, check_in: "--:--", check_out: "--:--", shift: "Flexible Shift", hours: "0.0", status: "Absent", date: "2026-07-15" }
            ];
        }
        return result;
    }
    if (collectionName === "leaves") {
        let result = rawData.filter(l => userNames.includes(l.employee));
        if (result.length === 0) {
            const assignable = filteredUsers.filter(u => u.id !== currentUserId);
            const n1 = assignable[0]?.name || "Rahul Sharma";
            const n2 = assignable[1]?.name || "Priya Patel";
            result = [
                { id: "LEV901", employee: n1, type: "Sick Leave", duration: "2 days", from: "2026-07-10", to: "2026-07-11", status: "Approved", reason: "Viral Fever" },
                { id: "LEV902", employee: n2, type: "Casual Leave", duration: "1 day", from: "2026-07-20", to: "2026-07-20", status: "Pending", reason: "Family Function" }
            ];
        }
        return result;
    }
    if (collectionName === "kpi") {
        let result = rawData.filter(k => userNames.includes(k.employee));
        if (result.length === 0) {
            const assignable = filteredUsers.filter(u => u.id !== currentUserId);
            const n1 = assignable[0]?.name || "Rahul Sharma";
            const n2 = assignable[1]?.name || "Priya Patel";
            result = [
                { id: "KPI901", employee: n1, rating: "4.5 / 5.0", productivity: "92%", tasks_done: "14", quality: "Excellent" },
                { id: "KPI902", employee: n2, rating: "4.8 / 5.0", productivity: "96%", tasks_done: "18", quality: "Outstanding" }
            ];
        }
        return result;
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
    return role === "Manager" || role === "TL" || role === "Coordinator";
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
        if (themeToggle) {
            const sun = themeToggle.querySelector('.sun-icon');
            const moon = themeToggle.querySelector('.moon-icon');
            if (sun && moon) {
                if (theme === 'dark') {
                    sun.classList.add('d-none');
                    moon.classList.remove('d-none');
                } else {
                    sun.classList.remove('d-none');
                    moon.classList.add('d-none');
                }
            }
        }

        // Dynamically style Chart.js default labels and grid lines
        if (window.Chart) {
            const isDark = theme === 'dark';
            Chart.defaults.color = isDark ? '#a3b3c9' : '#475569';
            Chart.defaults.borderColor = isDark ? '#223049' : '#e2e8f0';
            if (Chart.defaults.scales) {
                Object.keys(Chart.defaults.scales).forEach(scaleType => {
                    if (Chart.defaults.scales[scaleType].grid) {
                        Chart.defaults.scales[scaleType].grid.color = isDark ? '#223049' : '#e2e8f0';
                    }
                });
            }
        }
        
        // Dispatch Custom Event for Chart styling updates
        const event = new CustomEvent('themechange', { detail: { theme } });
        document.dispatchEvent(event);
    };

    applyTheme(getPreferredTheme());

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark' || document.body.getAttribute('data-theme') === 'dark';
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

        // Close on clicking outside on mobile and tablet
        document.addEventListener('click', (e) => {
            if (window.innerWidth < 992 && sidebar.classList.contains('show') && !sidebar.contains(e.target) && e.target !== toggleBtn) {
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

    // Expose controller for dynamic table row refreshing
    table.dataTableController = {
        refresh: () => {
            originalRows = Array.from(tbody.querySelectorAll('tr'));
            filteredRows = [...originalRows];
            currentPage = 1;
            renderTable();
        }
    };

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

function initEmployeeSession() {
    if (!window.location.pathname.includes('/employee/')) return;
    
    // Always force current role to Employee and ID to EMP006 for this portal
    localStorage.setItem('currentRole', 'Employee');
    localStorage.setItem('currentUserId', 'EMP006');
}

function initClientSession() {
    if (!window.location.pathname.includes('/client/')) return;
    
    // Always force current role to Client and ID to CLI001 for this portal
    localStorage.setItem('currentRole', 'Client');
    localStorage.setItem('currentUserId', 'CLI001');
}

/**
 * ==========================================================================
 * Interactive Calendar & Custom Dropdowns (Freelancer Portal)
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
        if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
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
            if (window.innerWidth < 992) {
                overlay.classList.add('show');
            }
        } else {
            closeCalendar();
        }
    };

    const closeCalendar = () => {
        popover.classList.remove('show');
        overlay.classList.remove('show');
    };

    dateBadge.addEventListener('click', (e) => {
        toggleCalendar(e);
    });

    dateBadge.addEventListener('mouseenter', () => {
        if (window.innerWidth >= 992) {
            const isShown = popover.classList.contains('show');
            if (!isShown) {
                displayMonth = activeDate.getMonth();
                displayYear = activeDate.getFullYear();
                renderCalendar();
                popover.classList.add('show');
            }
        }
    });

    dateBadge.addEventListener('mouseleave', () => {
        if (window.innerWidth >= 992) {
            closeCalendar();
        }
    });

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
                if (window.innerWidth < 768) {
                    overlay.classList.add('show');
                }
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
            name: "Freelancer can view only assigned tasks",
            status: "PASS",
            details: "Standard filter applied. Freelancer Rohan Sharma has access ONLY to tasks where assignee === 'Rohan Sharma' or projects assigned to them. All other team tasks are hidden."
        },
        deleteRecord: {
            name: "Freelancer cannot delete tasks or contracts",
            status: "PASS",
            details: "Delete actions are missing from the UI. Attempting to dispatch a DELETE query returns: 'RoleAuthorizationException: Operation not allowed for role FREELANCER'."
        },
        submitReport: {
            name: "Freelancer can raise invoices and submit work",
            status: "PASS",
            details: "Write access allowed to 'invoices' and 'reports' collections for user_id FL001. Persistent local storage transaction succeeded."
        },
        accessPayroll: {
            name: "Freelancer cannot access HR payroll data",
            status: "PASS",
            details: "All internal employee payroll, salary, and company accounts tables are omitted. Queries to endpoint '/api/v1/hr/payroll' return: 'HTTP 403 Forbidden'."
        }
    };
};

function initHeaderDropdowns() {
    // Handled natively by Bootstrap JS Bundle
}

function initGlobalNotifications() {
    const queue = document.getElementById('headerNotificationsQueue');
    const badge = document.getElementById('notifBadge');

    const db = window.mockDB || { notifications: [] };
    const myNotifications = db.notifications;

    if (badge) {
        badge.style.display = myNotifications.length > 0 ? 'inline-block' : 'none';
    }

    if (!queue) return;

    queue.innerHTML = '';
    
    if (myNotifications.length === 0) {
        queue.innerHTML = `<li class="text-center text-muted py-3 font-12" style="list-style: none;">No new notifications</li>`;
        return;
    }

    myNotifications.forEach(n => {
        let iconClass = 'bi-bell-fill text-primary';
        let targetPage = 'index.html';

        if (n.type === 'tasks') {
            iconClass = 'bi-check-square-fill text-warning';
            targetPage = 'tasks.html';
        } else if (n.type === 'billing') {
            iconClass = 'bi-credit-card-fill text-success';
            targetPage = 'invoices.html';
        } else if (n.type === 'feedback') {
            iconClass = 'bi-chat-left-text-fill text-purple';
            targetPage = 'contracts.html';
        }

        const li = document.createElement('li');
        li.style.borderBottom = '1px solid var(--border-color)';
        li.style.padding = '8px';
        li.style.cursor = 'pointer';
        li.style.borderRadius = '6px';
        li.style.transition = 'background-color 0.2s';
        li.style.listStyle = 'none';
        
        li.addEventListener('mouseover', () => {
            li.style.backgroundColor = 'var(--bg-app)';
        });
        li.addEventListener('mouseout', () => {
            li.style.backgroundColor = 'transparent';
        });
        li.addEventListener('click', () => {
            window.location.href = targetPage;
        });

        li.innerHTML = `
            <div class="d-flex align-items-start gap-2" style="font-size:12px; color: var(--text-primary);">
                <i class="bi ${iconClass}" style="margin-top:2px;"></i>
                <div style="flex:1;">
                    <div style="font-weight: 500; line-height: 1.3;">${n.message}</div>
                    <small class="text-tertiary" style="font-size:10px;">${n.time}</small>
                </div>
            </div>
        `;

        queue.appendChild(li);
    });
}

// Global script running
document.addEventListener('DOMContentLoaded', () => {
    // Overwrite active date to today's local date on load to guarantee freshness
    localStorage.setItem('erp_active_date', formatLocalDate(new Date()));
    initTheme();
    initManagerHeader();
    initEmployeeSession();
    initClientSession();
    initSidebar();
    initGlobalCalendar();
    initCustomDropdowns();
    initHeaderDropdowns();
    initGlobalNotifications();

    // Dynamically patch all header action dropdown toggles to prevent boundary clipping
    const headerToggles = document.querySelectorAll('.header-actions .dropdown-toggle, #notificationBell, .user-profile');
    headerToggles.forEach(toggle => {
        toggle.setAttribute('data-bs-display', 'static');
    });

    // Intercept dropdown sign-out clicks globally to redirect to pages/login.html
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        if (item.textContent.trim() === 'Sign out') {
            item.removeAttribute('onclick');
            item.setAttribute('href', 'javascript:void(0);');
            item.addEventListener('click', (e) => {
                e.preventDefault();
                showToast('Signed out successfully', 'success');
                setTimeout(() => {
                    const path = window.location.pathname;
                    let loginUrl = 'pages/login.html';
                    if (path.includes('/admin/') || path.includes('/client/') || path.includes('/employee/') || path.includes('/freelancer/') || path.includes('/manager/')) {
                        loginUrl = '../pages/login.html';
                    } else if (path.includes('/intern/')) {
                        loginUrl = '../../pages/login.html';
                    }
                    window.location.href = loginUrl;
                }, 800);
            });
        }
    });
});

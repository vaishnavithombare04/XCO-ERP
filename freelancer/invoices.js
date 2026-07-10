/**
 * XtrazCon IT ERP - FREELANCER INVOICES CONTROLLER (invoices.js)
 */

function renderInvoicesPage() {
    const db = window.mockDB || { invoices: [], contracts: [] };
    const myInvoices = db.invoices.filter(i => i.freelancerId === "FL001");

    // Calculate sums
    let paidSum = 0;
    let pendingSum = 0;

    myInvoices.forEach(inv => {
        const amt = parseInt(inv.amount || 0);
        if (inv.status === 'Paid') {
            paidSum += amt;
        } else if (inv.status === 'Pending') {
            pendingSum += amt;
        }
    });

    document.getElementById('totalPaidSum').innerText = `₹${paidSum.toLocaleString('en-IN')}`;
    document.getElementById('totalPendingSum').innerText = `₹${pendingSum.toLocaleString('en-IN')}`;

    // Populate Contracts Dropdown
    populateContractsDropdown(db.contracts);

    // Render Table Ledger
    renderInvoicesTable(myInvoices);
}

function populateContractsDropdown(contracts) {
    const selector = document.getElementById('invContractSelector');
    if (!selector) return;

    selector.innerHTML = '';
    const myContracts = contracts.filter(c => c.freelancerId === "FL001");

    if (myContracts.length === 0) {
        selector.innerHTML = `<option value="">No Active Contracts</option>`;
        return;
    }

    myContracts.forEach(c => {
        selector.innerHTML += `<option value="${c.id}">${c.title} (${c.id})</option>`;
    });
}

function renderInvoicesTable(invoices) {
    const tbody = document.getElementById('invoicesTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    if (invoices.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center text-muted py-4">No invoices raised yet.</td></tr>`;
        return;
    }

    invoices.forEach(inv => {
        let statusClass = 'badge-pending';
        if (inv.status === 'Paid') statusClass = 'badge-completed';
        if (inv.status === 'Pending') statusClass = 'badge-onhold';
        if (inv.status === 'Draft') statusClass = 'badge-pending';

        const rate = 2200; // Locked contract rate
        const dateFormatted = inv.date;

        tbody.innerHTML += `
            <tr>
                <td>
                    <div class="fw-600 text-primary">${inv.id}</div>
                    <div class="font-11 text-tertiary text-truncate" style="max-width: 200px;" title="${inv.description}">${inv.description}</div>
                </td>
                <td>${dateFormatted}</td>
                <td>${inv.hours} hrs</td>
                <td style="text-align:right;" class="fw-bold">₹${parseInt(inv.amount).toLocaleString('en-IN')}</td>
                <td><span class="status-badge ${statusClass}">${inv.status}</span></td>
                <td style="text-align:right;">
                    <button class="btn btn-outline-secondary btn-sm font-11 py-1" onclick="showToast('Downloading invoice ${inv.id} PDF...', 'success')"><i class="bi bi-download"></i></button>
                </td>
            </tr>
        `;
    });
}

function initInvoiceForm() {
    const form = document.getElementById('frmCreateInvoice');
    const hoursInput = document.getElementById('invHours');
    const totalCalc = document.getElementById('invTotalCalc');

    if (!form || !hoursInput || !totalCalc) return;

    const rate = 2200;

    const updateCalculatedValue = () => {
        const hrs = parseInt(hoursInput.value || 0);
        const total = hrs * rate;
        totalCalc.innerText = `₹${total.toLocaleString('en-IN')}`;
    };

    hoursInput.addEventListener('input', updateCalculatedValue);
    hoursInput.addEventListener('change', updateCalculatedValue);

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const contractId = document.getElementById('invContractSelector').value;
        const description = document.getElementById('invDescription').value.trim();
        const hours = parseInt(hoursInput.value || 0);

        if (!contractId || !description || hours <= 0) {
            showToast("Invalid inputs provided.", "error");
            return;
        }

        const db = window.mockDB;
        const invId = `INV-2026-${Math.floor(100 + Math.random() * 900)}`;
        const amount = hours * rate;
        const curDateStr = formatLocalDate(getActiveDate());

        // Create new invoice object
        db.invoices.unshift({
            id: invId,
            freelancerId: "FL001",
            contractId: contractId,
            date: curDateStr,
            amount: amount.toString(),
            hours: hours,
            status: "Pending",
            description: description
        });

        // Add notification
        db.notifications.unshift({
            id: `NTF-${Math.floor(100 + Math.random() * 900)}`,
            type: "billing",
            message: `Invoice ${invId} for ₹${amount.toLocaleString('en-IN')} raised successfully.`,
            time: "Just now"
        });

        // Log Audit log
        window.logAudit("Rohan Sharma", "Billing", "Raise Invoice", `Raised invoice ${invId} for contract ${contractId} with ${hours} hours (₹${amount})`);

        // Save
        window.saveMockDB();

        // Reset inputs and redraw
        document.getElementById('invDescription').value = '';
        hoursInput.value = '10';
        updateCalculatedValue();

        renderInvoicesPage();
        showToast(`Invoice ${invId} has been successfully raised.`, "success");
    });
}

// Global script load
document.addEventListener('DOMContentLoaded', () => {
    renderInvoicesPage();
    initInvoiceForm();
    document.addEventListener('datechange', renderInvoicesPage);
});

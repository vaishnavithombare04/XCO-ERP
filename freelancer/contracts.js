/**
 * XtrazCon IT ERP - FREELANCER CONTRACTS & MILESTONES CONTROLLER (contracts.js)
 */

function renderContractDetails() {
    const db = window.mockDB || { contracts: [], milestones: [] };
    const myContract = db.contracts.find(c => c.freelancerId === "FL001");
    if (!myContract) return;

    // Render overview stats
    document.getElementById('cntTitle').innerText = myContract.title;
    document.getElementById('cntId').innerText = myContract.id;
    document.getElementById('cntTotalBudget').innerText = myContract.totalBudget;
    document.getElementById('cntEscrow').innerText = myContract.escrowBalance;

    const myMilestones = db.milestones.filter(m => m.contractId === myContract.id);
    const completedMS = myMilestones.filter(m => m.status === 'Approved' || m.status === 'Paid');
    document.getElementById('cntMilestonesRatio').innerText = `${completedMS.length} / ${myMilestones.length}`;

    // Render status badge
    const badge = document.getElementById('cntStatusBadge');
    if (badge) {
        badge.innerText = myContract.status;
        badge.className = `status-badge ${myContract.status === 'Active' ? 'badge-completed' : 'badge-pending'}`;
    }

    renderMilestonesTable(myMilestones);
}

function renderMilestonesTable(milestones) {
    const tbody = document.getElementById('milestonesTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    if (milestones.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center text-muted py-4">No milestones allocated.</td></tr>`;
        return;
    }

    milestones.forEach(m => {
        let statusClass = 'badge-pending';
        if (m.status === 'Approved' || m.status === 'Paid') statusClass = 'badge-completed';
        if (m.status === 'Submitted') statusClass = 'badge-working';
        if (m.status === 'Active') statusClass = 'badge-onhold';

        let payClass = 'text-muted';
        if (m.paymentStatus === 'Paid') payClass = 'text-success fw-bold';
        if (m.paymentStatus === 'Pending Approval') payClass = 'text-warning fw-600';

        let actionHtml = '';
        if (m.status === 'Active') {
            actionHtml = `<button class="btn btn-outline-primary btn-sm font-11 py-1 px-2 fw-600" onclick="window.location.href='reports.html'">Submit Work</button>`;
        } else if (m.status === 'Approved' || m.status === 'Paid') {
            actionHtml = `<button class="btn btn-outline-secondary btn-sm font-11 py-1 px-2 fw-600" onclick="window.location.href='invoices.html'">View Invoice</button>`;
        } else {
            actionHtml = `<button class="btn btn-outline-secondary btn-sm font-11 py-1 px-2 fw-600" onclick="showToast('Milestone details are locked.', 'warning')">Details</button>`;
        }

        tbody.innerHTML += `
            <tr>
                <td>
                    <div class="fw-600 text-primary">${m.name}</div>
                    <small class="text-tertiary" style="font-size:10px;">ID: ${m.id}</small>
                </td>
                <td>${m.dueDate}</td>
                <td style="text-align:right;" class="fw-bold">${m.amount}</td>
                <td><span class="status-badge ${statusClass}">${m.status}</span></td>
                <td><span class="${payClass}">${m.paymentStatus}</span></td>
                <td style="text-align:right;">${actionHtml}</td>
            </tr>
        `;
    });
}

// Global script load
document.addEventListener('DOMContentLoaded', () => {
    renderContractDetails();
    document.addEventListener('datechange', renderContractDetails);
});

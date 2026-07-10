/**
 * XtrazCon IT ERP - FREELANCER PROFILE CONTROLLER (profile.js)
 */

const defaultProfile = {
    name: "Rohan Sharma",
    email: "rohan@gmail.com",
    phone: "+91 99999 88888",
    pan: "ABCDE1234F",
    gstin: "27ABCDE1234F1Z5",
    bankHolder: "Rohan Sharma",
    bankIfsc: "HDFC0000123",
    bankAccount: "50100234567890",
    bankName: "HDFC Bank Ltd, Mumbai Branch",
    skills: ["React", "Node.js", "Bootstrap 5", "CSS Grids", "Firebase"]
};

let profileDb = JSON.parse(localStorage.getItem('freelancer_profile_settings')) || defaultProfile;

function loadProfileFields() {
    document.getElementById('profName').value = profileDb.name;
    document.getElementById('profEmail').value = profileDb.email;
    document.getElementById('profPhone').value = profileDb.phone;
    document.getElementById('profPan').value = profileDb.pan;
    document.getElementById('profGst').value = profileDb.gstin;

    document.getElementById('bankHolder').value = profileDb.bankHolder;
    document.getElementById('bankIfsc').value = profileDb.bankIfsc;
    document.getElementById('bankAccount').value = profileDb.bankAccount;
    document.getElementById('bankName').value = profileDb.bankName;

    renderSkillsTags();
}

function renderSkillsTags() {
    const container = document.getElementById('skillsTagContainer');
    if (!container) return;

    container.innerHTML = '';

    if (profileDb.skills.length === 0) {
        container.innerHTML = `<span class="text-muted font-11">No skill tags added.</span>`;
        return;
    }

    profileDb.skills.forEach((skill, idx) => {
        container.innerHTML += `
            <span class="skill-tag">
                ${skill}
                <i class="bi bi-x-circle-fill btn-close-skill" onclick="removeSkill(${idx})"></i>
            </span>
        `;
    });
}

function removeSkill(idx) {
    profileDb.skills.splice(idx, 1);
    localStorage.setItem('freelancer_profile_settings', JSON.stringify(profileDb));
    renderSkillsTags();
    showToast("Skill tag removed.", "warning");
}

function initSkillsActions() {
    const btnAdd = document.getElementById('btnAddSkill');
    const input = document.getElementById('txtAddSkill');

    if (!btnAdd || !input) return;

    const handleAdd = () => {
        const val = input.value.trim();
        if (!val) return;

        if (profileDb.skills.includes(val)) {
            showToast("Skill tag already exists.", "warning");
            return;
        }

        profileDb.skills.push(val);
        localStorage.setItem('freelancer_profile_settings', JSON.stringify(profileDb));
        input.value = '';

        renderSkillsTags();
        showToast("Skill tag added successfully!", "success");
    };

    btnAdd.addEventListener('click', handleAdd);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAdd();
        }
    });
}

function initProfileFormSubmit() {
    const form = document.getElementById('frmProfileSettings');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Bind fields
        profileDb.name = document.getElementById('profName').value.trim();
        profileDb.email = document.getElementById('profEmail').value.trim();
        profileDb.phone = document.getElementById('profPhone').value.trim();
        profileDb.pan = document.getElementById('profPan').value.trim();
        profileDb.gstin = document.getElementById('profGst').value.trim();

        profileDb.bankHolder = document.getElementById('bankHolder').value.trim();
        profileDb.bankIfsc = document.getElementById('bankIfsc').value.trim();
        profileDb.bankAccount = document.getElementById('bankAccount').value.trim();
        profileDb.bankName = document.getElementById('bankName').value.trim();

        // Save
        localStorage.setItem('freelancer_profile_settings', JSON.stringify(profileDb));

        // Sync with mockDB users list
        const db = window.mockDB;
        const dbUser = db.users.find(u => u.id === "FL001");
        if (dbUser) {
            dbUser.name = profileDb.name;
            dbUser.email = profileDb.email;
            dbUser.phone = profileDb.phone;
        }

        // Add notification
        db.notifications.unshift({
            id: `NTF-${Math.floor(100 + Math.random() * 900)}`,
            type: "feedback",
            message: "Workspace profile and payout bank routing details updated.",
            time: "Just now"
        });

        // Log audit log
        window.logAudit("Rohan Sharma", "Profile Settings", "Update Settings", "Updated email, phone, PAN, bank details, and technical skill lists.");
        window.saveMockDB();

        // Sync Header Name
        const headerUserName = document.getElementById('headerUserName');
        if (headerUserName) headerUserName.innerText = profileDb.name;

        showToast("Profile settings saved successfully!", "success");
    });
}

// Global script load
document.addEventListener('DOMContentLoaded', () => {
    loadProfileFields();
    initSkillsActions();
    initProfileFormSubmit();
});
window.removeSkill = removeSkill; // Bind to window scope for HTML click handler
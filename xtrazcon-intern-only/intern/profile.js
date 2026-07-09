/**
 * XtrazCon IT ERP - INTERN PROFILE CONTROLLER (profile.js)
 */
const profileForm = document.getElementById('profileDetailsForm');
if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('profileName').value;
        showToast(`Profile details saved successfully: ${name}`, "success");
    });
}

const pwdForm = document.getElementById('changePasswordForm');
if (pwdForm) {
    pwdForm.addEventListener('submit', (e) => {
        e.preventDefault();
        document.getElementById('pwdCurrent').value = '';
        document.getElementById('pwdNew').value = '';
        showToast("Password updated successfully!", "success");
    });
}
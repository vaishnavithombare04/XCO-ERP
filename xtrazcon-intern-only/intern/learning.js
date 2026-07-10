/**
 * XtrazCon IT ERP - INTERN COURSE CURRICULUM (learning.js)
 */
const defaultInternCourses = [
    { id: "CSE001", title: "SEO Link Building Techniques", progress: 75, duration: "4 Weeks", instructor: "Alex Rivera", status: "Ongoing" },
    { id: "CSE002", title: "Advanced Keyword Research & Mapping", progress: 60, duration: "3 Weeks", instructor: "Alex Rivera", status: "Ongoing" },
    { id: "CSE003", title: "On-Page SEO Audit Fundamentals", progress: 45, duration: "2 Weeks", instructor: "Meera Nair", status: "Ongoing" },
    { id: "CSE004", title: "Technical SEO Basics", progress: 30, duration: "3 Weeks", instructor: "Alex Rivera", status: "Ongoing" },
    { id: "CSE005", title: "Google Search Console Reporting", progress: 55, duration: "1 Week", instructor: "Rahul Dev", status: "Ongoing" },
    { id: "CSE006", title: "Content Optimization Workflow", progress: 20, duration: "2 Weeks", instructor: "Meera Nair", status: "Assigned" },
    { id: "CSE007", title: "Backlink Quality & Spam Review", progress: 85, duration: "1 Week", instructor: "Alex Rivera", status: "Ongoing" },
    { id: "CSE008", title: "Weekly SEO Analytics Dashboard", progress: 40, duration: "2 Weeks", instructor: "Rahul Dev", status: "Ongoing" },
    { id: "CSE009", title: "Local SEO Citations Training", progress: 10, duration: "1 Week", instructor: "Alex Rivera", status: "Assigned" },
    { id: "CSE010", title: "Meta Tags & SERP Snippet Writing", progress: 100, duration: "1 Week", instructor: "Meera Nair", status: "Completed" }
]

function loadCoursesData() {
    const saved = JSON.parse(localStorage.getItem('intern_courses') || 'null');
    if (Array.isArray(saved) && saved.length) return saved;
    return defaultInternCourses;
}

let internCourses = loadCoursesData();

function saveCoursesData() {
    localStorage.setItem('intern_courses', JSON.stringify(internCourses));
}

function renderCoursesGrid() {
    const container = document.getElementById('coursesGridContainer');
    if (!container) return;

    container.innerHTML = '';

    if (!internCourses.length) {
        container.innerHTML = '<div class="col-12"><div class="card p-3 text-center text-tertiary">No learning modules assigned yet.</div></div>';
        return;
    }

    internCourses.forEach(m => {
        let actionBtnText = "Continue Study";
        if (m.progress === 100) {
            actionBtnText = "Completed ✔";
        }
        
        container.innerHTML += `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card p-3 h-100 d-flex flex-column justify-content-between">
                    <div>
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <span class="status-badge badge-approved" style="font-size:10px;">${m.duration}</span>
                            <span class="status-badge badge-pending" style="font-size:10px;">${m.status}</span>
                        </div>
                        <h4 class="card-title" style="font-size:14px; font-weight:700; margin-bottom:8px;">${m.title}</h4>
                        <p class="text-secondary font-12" style="margin-bottom:16px;">Mentor: <strong>${m.instructor}</strong></p>
                    </div>
                    <div>
                        <div class="d-flex justify-content-between font-11 fw-600 mb-1">
                            <span class="text-tertiary">Progress</span>
                            <span class="text-primary">${m.progress}%</span>
                        </div>
                        <div class="kpi-progress-bar mb-3">
                            <div class="kpi-progress-fill" style="width:${m.progress}%;"></div>
                        </div>
                        <button class="btn btn-outline-primary btn-sm w-100 btn-study" data-id="${m.id}" ${m.progress === 100 ? 'disabled' : ''}>${actionBtnText}</button>
                    </div>
                </div>
            </div>
        `;
    });

    document.querySelectorAll('.btn-study').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const cid = e.target.getAttribute('data-id');
            const course = internCourses.find(c => c.id === cid);
            if (course && course.progress < 100) {
                course.progress = Math.min(100, course.progress + 10);
                if (course.progress === 100) {
                    course.status = "Completed";
                }
                saveCoursesData();
                showToast(`Advanced training module progress updated: ${course.progress}%`, "success");
                renderCoursesGrid();
            }
        });
    });
}

renderCoursesGrid();
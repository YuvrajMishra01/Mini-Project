// ====== THEME MANAGEMENT ======
function initTheme() {
    const savedTheme = localStorage.getItem("guidedTheme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
    updateThemeIcon();
}

function updateThemeIcon() {
    const isDarkMode = document.body.classList.contains("dark-mode");
    const icons = document.querySelectorAll(".theme-toggle i");
    icons.forEach(icon => {
        if (isDarkMode) {
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
        } else {
            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");
        }
    });
}

function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    const isDarkMode = document.body.classList.contains("dark-mode");
    localStorage.setItem("guidedTheme", isDarkMode ? "dark" : "light");
    updateThemeIcon();
}

// ====== CURRENT PAGE ======
let currentPage = 'home';

// ====== INITIALIZATION ======
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    loadStudentInfo();
    loadStudentPage();
    loadStudentNotifications();
});

// ====== LOAD STUDENT INFO ======
function loadStudentInfo() {
    const studentName = localStorage.getItem('guidedUser');
    const studentBranch = localStorage.getItem('guidedBranch');
    const studentYear = localStorage.getItem('guidedYear');

    if (studentName) {
        document.getElementById('studentName').textContent = studentName;
    }

    if (studentBranch && studentYear) {
        const branchNames = {
            'cse': 'Computer Science',
            'ece': 'Electronics & Communication',
            'ee': 'Electrical Engineering',
            'me': 'Mechanical Engineering',
            'ce': 'Civil Engineering'
        };
        const yearNames = {
            '1': '1st Year',
            '2': '2nd Year',
            '3': '3rd Year',
            '4': '4th Year'
        };

        document.getElementById('displayBranch').textContent = branchNames[studentBranch] || studentBranch;
        document.getElementById('displayYear').textContent = yearNames[studentYear] || studentYear;
    }
}

// ====== LOAD PAGE ======
function loadStudentPage() {
    // Hide all sections
    document.querySelectorAll('.dashboard-section').forEach(section => {
        section.classList.add('hidden');
    });

    // Show the requested page
    const pageMap = {
        'home': 'studentHome',
        'materials': 'studentMaterials',
        'mentors': 'studentMentors',
        'progress': 'studentProgress'
    };

    const pageId = pageMap[currentPage] || 'studentHome';
    const page = document.getElementById(pageId);
    if (page) {
        page.classList.remove('hidden');
    }
}

// ====== NAVIGATE FUNCTION ======
function navigateStudentPage(page) {
    if (currentPage === page) {
        showNotification(`You are already in the ${page.charAt(0).toUpperCase() + page.slice(1)} tab`, 'warning');
        return;
    }
    currentPage = page;
    loadStudentPage();
}

// ====== NOTIFICATIONS ======
function showNotification(message, type = 'info') {
    const toast = document.getElementById('notificationToast');
    if (toast) {
        toast.textContent = message;
        toast.className = `notification-toast show ${type}`;

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// ====== LOGOUT ======
function studentLogout() {
    // Clear all student data
    localStorage.removeItem('guidedUser');
    localStorage.removeItem('guidedEmail');
    localStorage.removeItem('guidedUserType');
    localStorage.removeItem('guidedUserId');
    localStorage.removeItem('guidedCollege');
    localStorage.removeItem('guidedBranch');
    localStorage.removeItem('guidedYear');
    localStorage.removeItem('guidedLoginTime');

    // Redirect to login immediately
    window.location.href = 'login.html';
    window.location.href = 'login.html';
}

// ====== NOTIFICATION FUNCTIONS ======
function loadStudentNotifications() {
    const studentId = localStorage.getItem('guidedUserId');
    if (!studentId) return;
    
    // const notifications = getStudentNotifications(studentId);
    let notifications = getStudentNotifications(studentId);

// mark all as read
notifications = notifications.map(n => ({ ...n, read: true }));
localStorage.setItem(`notifications_${studentId}`, JSON.stringify(notifications));

    updateNotificationBadge(notifications);
}

function showStudentNotifications() {
    const studentId = localStorage.getItem('guidedUserId');
    if (!studentId) return;
    
    // const notifications = getStudentNotifications(studentId);
    let notifications = getStudentNotifications(studentId);

// mark all as read
notifications = notifications.map(n => ({ ...n, read: true }));
localStorage.setItem(`notifications_${studentId}`, JSON.stringify(notifications));

    const popup = document.getElementById('notificationsPopup');
    const list = document.getElementById('notificationsList');
    
    if (notifications.length === 0) {
        list.innerHTML = '<p class="empty-state">No notifications yet</p>';
    } else {
        list.innerHTML = notifications.map(notif => `
            <div class="notification-item ${notif.type}">
                <div class="notification-icon">
                    ${notif.type === 'session' ? '<i class="fas fa-calendar-check"></i>' : '<i class="fas fa-info-circle"></i>'}
                </div>
                <div class="notification-content">
                    <h4>${notif.title}</h4>
                    <p>${notif.message}</p>
                    <small class="notification-time">${notif.timestamp}</small>
                </div>
                <button class="delete-notif" onclick="deleteStudentNotification('${notif.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }
    
    popup.classList.remove('hidden');
}

function closeStudentNotifications() {
    document.getElementById('notificationsPopup').classList.add('hidden');
}

function updateNotificationBadge(notifications) {
    const badge = document.getElementById('notificationBadge');
    const unreadCount = notifications.filter(n => !n.read).length;
    
    if (unreadCount > 0) {
        badge.textContent = unreadCount;
        badge.style.display = 'flex';
    } else {
        badge.style.display = 'none';
    }
}

function deleteStudentNotification(notifId) {
    const studentId = localStorage.getItem('guidedUserId');
    let notifications = getStudentNotifications(studentId);
    notifications = notifications.filter(n => n.id !== notifId);
    localStorage.setItem(`notifications_${studentId}`, JSON.stringify(notifications));
    showStudentNotifications();
    updateNotificationBadge(notifications);
}
function getStudentNotifications(studentId) {
    const data = localStorage.getItem(`notifications_${studentId}`);
    return data ? JSON.parse(data) : [];
}
function bookSession(mentorName, topic) {
    const studentId = localStorage.getItem("guidedUserId");
    const studentName = localStorage.getItem("guidedUser");

    if (!studentId) {
        showNotification("Please login again", "error");
        return;
    }

    // Temporary mini-project behavior
    showNotification(
        `Request sent to ${mentorName} for ${topic} session`,
        "info"
    );

    // OPTIONAL: send notification to mentor (for demo)
    const mentorNotif = {
        id: Date.now().toString(),
        type: "request",
        title: "New Session Request",
        message: `${studentName} requested a session on ${topic}`,
        timestamp: new Date().toLocaleString(),
        read: false
    };

    const key = `mentor_notifications_${mentorName}`;
    const notifications = JSON.parse(localStorage.getItem(key)) || [];
    notifications.push(mentorNotif);
    localStorage.setItem(key, JSON.stringify(notifications));
}
function bookSession(mentorName, topic) {
    const studentName = localStorage.getItem("guidedUser");
    const studentId = localStorage.getItem("guidedUserId");

    if (!studentId) {
        showNotification("Please login again", "error");
        return;
    }

    // Demo behavior for mini project
    showNotification(
        `Session request sent to ${mentorName} for ${topic}`,
        "info"
    );

    // (Optional) Save request for mentor
    const request = {
        id: Date.now().toString(),
        studentName: studentName,
        mentorName: mentorName,
        topic: topic,
        timestamp: new Date().toLocaleString(),
        status: "pending"
    };

    let requests = JSON.parse(localStorage.getItem("sessionRequests")) || [];
    requests.push(request);
    localStorage.setItem("sessionRequests", JSON.stringify(requests));
}



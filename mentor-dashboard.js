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
    loadMentorInfo();
    loadMentorPage();
});

// ====== LOAD MENTOR INFO ======
function loadMentorInfo() {
    const mentorName = localStorage.getItem('guidedMentor');
    const mentorExpertise = localStorage.getItem('guidedMentorExpertise');
    const mentorExperience = localStorage.getItem('guidedMentorExperience');

    if (mentorName) {
        document.getElementById('mentorName').textContent = mentorName;
    }

    if (mentorExpertise) {
        const expertiseNames = {
            'webdev': 'Web Development',
            'aiml': 'AI & Machine Learning',
            'dsa': 'Data Structures & Algorithms',
            'blockchain': 'Blockchain Development',
            'other': 'Other'
        };
        const expertise = expertiseNames[mentorExpertise] || mentorExpertise;

        // Populate form fields if they exist
        const expertiseInput = document.getElementById('mentorExpertiseInput');
        if (expertiseInput) {
            expertiseInput.value = expertise;
        }
    }

    if (mentorExperience) {
        const experienceInput = document.getElementById('mentorExperienceInput');
        if (experienceInput) {
            experienceInput.value = mentorExperience;
        }
    }

    // Populate form name field if exists
    if (mentorName) {
        const nameInput = document.getElementById('mentorNameInput');
        if (nameInput) {
            nameInput.value = mentorName;
        }
    }

    const mentorEmail = localStorage.getItem('guidedMentorEmail');
    if (mentorEmail) {
        const emailInput = document.getElementById('mentorEmailInput');
        if (emailInput) {
            emailInput.value = mentorEmail;
        }
    }
}

// ====== LOAD PAGE ======
function loadMentorPage() {
    // Hide all sections
    document.querySelectorAll('.dashboard-section').forEach(section => {
        section.classList.add('hidden');
    });

    // Show the requested page
    const pageMap = {
        'home': 'mentorHome',
        'students': 'mentorStudents',
        'schedule': 'mentorSchedule',
        'profile': 'mentorProfile'
    };

    const pageId = pageMap[currentPage] || 'mentorHome';
    const page = document.getElementById(pageId);
    if (page) {
        page.classList.remove('hidden');
    }
}

// ====== NAVIGATE FUNCTION ======
function navigateMentorPage(page) {
    if (currentPage === page) {
        const pageNames = {
            'home': 'Home',
            'students': 'My Students',
            'schedule': 'Schedule',
            'profile': 'My Profile'
        };
        showNotification(`You are already in the ${pageNames[page]} tab`, 'warning');
        return;
    }
    currentPage = page;
    loadMentorPage();
}

// ====== SAVE MENTOR PROFILE ======
function saveMentorProfile() {
    const mentorName = document.getElementById('mentorNameInput').value;
    const mentorEmail = document.getElementById('mentorEmailInput').value;

    if (!mentorName || !mentorEmail) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    // Update localStorage
    localStorage.setItem('guidedMentor', mentorName);
    localStorage.setItem('guidedMentorEmail', mentorEmail);

    showNotification('Profile updated successfully!', 'success');
}

// ====== SCHEDULE MANAGEMENT ======
function filterSchedule() {
    const filterValue = document.getElementById('scheduleFilter').value;
    const sessionItems = document.querySelectorAll('.session-item');
    
    // For now, show all sessions
    // In a real app, this would filter based on date/time
    sessionItems.forEach(item => {
        item.style.display = 'grid';
    });
    
    showNotification(`Showing: ${filterValue === 'all' ? 'All Sessions' : filterValue}`, 'info');
}

function addNewSession() {
    showNotification('Session creation feature coming soon!', 'info');
    // In a real app, this would open a modal to create a new session
}

function joinSession(studentName) {
    showNotification(`Joining session with ${studentName}...`, 'info');
    // In a real app, this would open a video call interface
}

function rescheduleSession(studentName) {
    showNotification(`Rescheduling session with ${studentName}...`, 'info');
    // In a real app, this would open a date/time picker
}

function cancelSession(studentName) {
    if (confirm(`Are you sure you want to cancel the session with ${studentName}?`)) {
        showNotification(`Session with ${studentName} has been cancelled`, 'success');
        // In a real app, this would remove the session from the list
    }
}

// ====== SESSION DETAIL MODAL ======
function showSessionDetail(day, time, studentName, studentInfo, topic, duration, type, status, meetingLink, password, platform, notes) {
    // Populate modal with session details
    document.getElementById('detailDay').textContent = day;
    document.getElementById('detailTime').textContent = time;
    document.getElementById('detailStudentName').textContent = studentName;
    document.getElementById('detailStudentInfo').textContent = studentInfo;
    document.getElementById('detailTopic').textContent = topic;
    document.getElementById('detailDuration').textContent = duration;
    document.getElementById('detailType').textContent = type;
    document.getElementById('detailStatus').textContent = status;
    document.getElementById('meetingLink').textContent = meetingLink;
    document.getElementById('meetingPassword').textContent = password;
    document.getElementById('meetingPlatform').textContent = platform;
    document.getElementById('studentNotes').textContent = notes;
    
    // Show modal
    const modal = document.getElementById('sessionModal');
    modal.classList.remove('hidden');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeSessionModal() {
    const modal = document.getElementById('sessionModal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function joinSessionDetail() {
    const studentName = document.getElementById('detailStudentName').textContent;
    const meetingLink = document.getElementById('meetingLink').textContent;
    showNotification(`Opening meeting with ${studentName}...`, 'success');
    // In a real app, this would open the meeting link
    closeSessionModal();
}

function rescheduleSessionDetail() {
    const studentName = document.getElementById('detailStudentName').textContent;
    showNotification(`Rescheduling session with ${studentName}...`, 'info');
    // In a real app, this would open a date/time picker
    closeSessionModal();
}

function cancelSessionDetail() {
    const studentName = document.getElementById('detailStudentName').textContent;
    if (confirm(`Are you sure you want to cancel the session with ${studentName}?`)) {
        showNotification(`Session with ${studentName} has been cancelled`, 'success');
        closeSessionModal();
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('sessionModal');
    if (event.target === modal) {
        closeSessionModal();
    }
});

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
function mentorLogout() {
    // Clear all mentor data
    localStorage.removeItem('guidedMentor');
    localStorage.removeItem('guidedMentorEmail');
    localStorage.removeItem('guidedMentorExpertise');
    localStorage.removeItem('guidedMentorExperience');
    localStorage.removeItem('guidedMentorCollege');
    localStorage.removeItem('guidedMentorId');
    localStorage.removeItem('guidedUserType');
    localStorage.removeItem('guidedLoginTime');

    // Redirect to login immediately
    window.location.href = 'login.html';
}

// ====== SCHEDULE SESSION MODAL ======
function openScheduleSessionModal() {
    document.getElementById('scheduleSessionModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeScheduleSessionModal() {
    document.getElementById('scheduleSessionModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('scheduleSessionModal');
    if (event.target === modal) {
        closeScheduleSessionModal();
    }
});

// Handle schedule session form submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('scheduleSessionForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const studentSelectValue = document.getElementById('scheduleStudentSelect').value;
            const [studentId, studentName] = studentSelectValue.split('|');
            const date = document.getElementById('scheduleDate').value;
            const time = document.getElementById('scheduleTime').value;
            const topic = document.getElementById('scheduleTopic').value;
            const duration = document.getElementById('scheduleDuration').value;
            
            if (!studentId || !date || !time || !topic || !duration) {
                showNotification('Please fill all required fields', 'error');
                return;
            }

            const mentorName = localStorage.getItem('guidedMentor');
            
            // Send notification to student
            const sessionDetails = {
                date: formatDate(date),
                time: time,
                topic: topic,
                duration: duration
            };
            
            scheduleSessionForStudent(studentId, mentorName, sessionDetails);
            
            // Show success message
            showNotification(`✅ Session scheduled with ${studentName}!`, 'success');
            
            // Close modal and reset form
            closeScheduleSessionModal();
            form.reset();
        });
    }
});

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}
function scheduleSession(studentId, topic, date, time, duration) {
    const newNotification = {
        id: Date.now().toString(),
        type: "session",
        title: "Session Scheduled",
        message: `${topic} on ${date} at ${time} (${duration})`,
        timestamp: new Date().toLocaleString(),
        read: false
    };

    const key = `notifications_${studentId}`;
    const notifications = JSON.parse(localStorage.getItem(key)) || [];
    notifications.push(newNotification);

    localStorage.setItem(key, JSON.stringify(notifications));

    alert("Session scheduled successfully!");
}
function acceptSession(studentId, topic) {
    const mentorName = localStorage.getItem('guidedMentor');

    const notification = {
        id: Date.now().toString(),
        type: "session",
        title: "Session Approved",
        message: `${mentorName} approved your ${topic} session request`,
        timestamp: new Date().toLocaleString(),
        read: false
    };

    const key = `notifications_${studentId}`;
    const notifications = JSON.parse(localStorage.getItem(key)) || [];
    notifications.push(notification);
    localStorage.setItem(key, JSON.stringify(notifications));

    showNotification("Session accepted & student notified", "success");
}

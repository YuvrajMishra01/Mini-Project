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

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
});

// ====== NAVIGATION FUNCTIONS ======
function goToMainLogin() {
    document.getElementById("mainLogin").classList.remove("hidden");
    document.getElementById("studentAuth").classList.add("hidden");
    document.getElementById("mentorAuth").classList.add("hidden");
}

function goToStudentLogin() {
    document.getElementById("mainLogin").classList.add("hidden");
    document.getElementById("studentAuth").classList.remove("hidden");
    document.getElementById("mentorAuth").classList.add("hidden");
}

function goToMentorLogin() {
    document.getElementById("mainLogin").classList.add("hidden");
    document.getElementById("studentAuth").classList.add("hidden");
    document.getElementById("mentorAuth").classList.remove("hidden");
}

// ====== NOTIFICATION SYSTEM ======
function showNotification(message, type = "info") {
    const toast = document.getElementById("notificationToast");
    if (toast) {
        toast.textContent = message;
        toast.className = `notification-toast show ${type}`;
        
        setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }
}

// ====== FORM VALIDATION ======
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function clearFormErrors(formId) {
    const form = document.getElementById(formId);
    const errorMessages = form.querySelectorAll(".error-message");
    errorMessages.forEach(msg => {
        msg.textContent = "";
    });
}

function showFormError(inputId, errorId, message) {
    const errorElement = document.querySelector(`#${inputId}`).parentElement.querySelector(".error-message");
    if (errorElement) {
        errorElement.textContent = message;
    }
}

// ====== STUDENT LOGIN ======
document.getElementById("studentLoginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    clearFormErrors("studentLoginForm");

    const college = document.getElementById("studentCollege").value.trim();
    const email = document.getElementById("studentEmail").value.trim();
    const password = document.getElementById("studentPassword").value;

    let hasError = false;

    // Validation
    if (!college) {
        showFormError("studentCollege", "studentCollegeError", "Please select your college");
        hasError = true;
    }

    if (!email) {
        showFormError("studentEmail", "studentEmailError", "Please enter your email");
        hasError = true;
    } else if (!validateEmail(email)) {
        showFormError("studentEmail", "studentEmailError", "Please enter a valid email");
        hasError = true;
    }

    if (!password) {
        showFormError("studentPassword", "studentPasswordError", "Please enter your password");
        hasError = true;
    } else if (!validatePassword(password)) {
        showFormError("studentPassword", "studentPasswordError", "Password must be at least 6 characters");
        hasError = true;
    }

    if (hasError) {
        showNotification("Please fill all fields correctly", "error");
        return;
    }

    // Validate against dataset
    const validStudent = validateStudentLogin(email, password, college);
    
    if (!validStudent) {
        showNotification("❌ Data Not Found! Invalid College, Email, or Password", "error");
        return;
    }

    // Save to localStorage
    localStorage.setItem("guidedUser", validStudent.name);
    localStorage.setItem("guidedEmail", validStudent.email);
    localStorage.setItem("guidedUserType", "student");
    localStorage.setItem("guidedUserId", validStudent.id);
    localStorage.setItem("guidedCollege", validStudent.college);
    localStorage.setItem("guidedBranch", validStudent.branch);
    localStorage.setItem("guidedYear", validStudent.year);
    localStorage.setItem("guidedLoginTime", new Date().toLocaleString());

    // Redirect to student dashboard immediately
    window.location.href = "student-dashboard.html";
});

// ====== MENTOR LOGIN ======
document.getElementById("mentorLoginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    clearFormErrors("mentorLoginForm");

    const college = document.getElementById("mentorCollege").value.trim();
    const email = document.getElementById("mentorEmail").value.trim();
    const password = document.getElementById("mentorPassword").value;

    let hasError = false;

    // Validation
    if (!college) {
        showFormError("mentorCollege", "mentorCollegeError", "Please select your college");
        hasError = true;
    }

    if (!email) {
        showFormError("mentorEmail", "mentorEmailError", "Please enter your email");
        hasError = true;
    } else if (!validateEmail(email)) {
        showFormError("mentorEmail", "mentorEmailError", "Please enter a valid email");
        hasError = true;
    }

    if (!password) {
        showFormError("mentorPassword", "mentorPasswordError", "Please enter your password");
        hasError = true;
    } else if (!validatePassword(password)) {
        showFormError("mentorPassword", "mentorPasswordError", "Password must be at least 6 characters");
        hasError = true;
    }

    if (hasError) {
        showNotification("Please fill all fields correctly", "error");
        return;
    }

    // Validate against dataset
    const validMentor = validateMentorLogin(email, password, college);
    
    if (!validMentor) {
        showNotification("❌ Data Not Found! Invalid College, Email, or Password", "error");
        return;
    }

    // Save to localStorage
    localStorage.setItem("guidedMentor", validMentor.name);
    localStorage.setItem("guidedMentorEmail", validMentor.email);
    localStorage.setItem("guidedMentorExpertise", validMentor.expertise);
    localStorage.setItem("guidedMentorExperience", validMentor.experience);
    localStorage.setItem("guidedMentorCollege", validMentor.college);
    localStorage.setItem("guidedMentorId", validMentor.id);
    localStorage.setItem("guidedUserType", "mentor");
    localStorage.setItem("guidedLoginTime", new Date().toLocaleString());

    // Redirect to mentor dashboard immediately
    window.location.href = "mentor-dashboard.html";
});

// ====== AUTO-LOAD LOGIN PAGE ======
document.addEventListener("DOMContentLoaded", () => {
    // Check if user is already logged in
    const userType = localStorage.getItem("guidedUserType");
    if (userType === "student") {
        window.location.href = "student-dashboard.html";
    } else if (userType === "mentor") {
        window.location.href = "mentor-dashboard.html";
    } else {
        // Show main login page
        goToMainLogin();
    }
});
﻿// ====== THEME MANAGEMENT ======
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

initTheme();

// ====== HAMBURGER MENU ======
function initHamburgerMenu() {
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");
    
    if (hamburger) {
        hamburger.addEventListener("click", function() {
            hamburger.classList.toggle("active");
            if (navLinks) {
                navLinks.classList.toggle("active");
            }
        });

        // Close menu when a link is clicked
        if (navLinks) {
            const links = navLinks.querySelectorAll("a");
            links.forEach(link => {
                link.addEventListener("click", function() {
                    hamburger.classList.remove("active");
                    navLinks.classList.remove("active");
                });
            });
        }
    }
}

// Initialize hamburger menu when DOM is loaded
document.addEventListener("DOMContentLoaded", initHamburgerMenu);

// ====== NAVIGATION FUNCTION ======
function navigateTo(page) {
    const userType = localStorage.getItem("guidedUserType");
    
    if (!userType && page !== "home" && page !== "features") {
        // Redirect to login if not authenticated
        window.location.href = "login.html";
        return;
    }

    // Hide all sections
    const sections = document.querySelectorAll("section");
    sections.forEach(section => {
        section.classList.add("hidden");
    });

    // Show the requested section
    const targetSection = document.getElementById(page);
    if (targetSection) {
        targetSection.classList.remove("hidden");
    }

    // Scroll to top
    window.scrollTo(0, 0);
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

// ====== STUDENT LOGIN ======
const authForm = document.getElementById("studentLoginForm");
if (authForm) {
    authForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("studentName").value || "User";
        const email = document.getElementById("studentEmail").value;
        const password = document.getElementById("studentPassword").value;
        const branch = document.getElementById("studentBranch").value;
        const year = document.getElementById("studentYear").value;

        if (!name || !email || !password || !branch || !year) {
            showNotification("Please fill all required fields", "error");
            return;
        }

        localStorage.setItem("guidedUser", name);
        localStorage.setItem("guidedEmail", email);
        localStorage.setItem("guidedUserType", "student");
        localStorage.setItem("guidedBranch", branch);
        localStorage.setItem("guidedYear", year);

        const branchNames = {
            "cse": "Computer Science",
            "ece": "Electronics & Communication",
            "ee": "Electrical Engineering",
            "me": "Mechanical Engineering",
            "ce": "Civil Engineering"
        };
        const yearNames = {
            "1": "1st Year",
            "2": "2nd Year",
            "3": "3rd Year",
            "4": "4th Year"
        };

        const branchName = branchNames[branch];
        const yearName = yearNames[year];

        const userGreetingEl = document.getElementById("userName");
        if (userGreetingEl) {
            userGreetingEl.textContent = name;
        }
        
        const dashboardSection = document.getElementById("dashboard");
        if (dashboardSection) {
            dashboardSection.classList.remove("hidden");
        }
        
        showNotification(`Welcome back, ${name}! `, "success");
    });
}

// ====== MENTOR LOGIN ======
mentorLoginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("mentorName").value || "Mentor";
    const email = document.getElementById("mentorEmail").value;
    const password = document.getElementById("mentorPassword").value;
    const expertise = document.getElementById("expertise").value;
    const experience = document.getElementById("experience").value;

    if (!name || !email || !password || !expertise || !experience) {
        showNotification("Please fill all required fields", "error");
        return;
    }

    localStorage.setItem("guidedMentor", name);
    localStorage.setItem("guidedMentorEmail", email);
    localStorage.setItem("guidedMentorExpertise", expertise);
    localStorage.setItem("guidedMentorExperience", experience);
    localStorage.setItem("guidedUserType", "mentor");

    const expertiseNames = {
        "cse": "Computer Science",
        "ece": "Electronics & Communication",
        "ee": "Electrical Engineering",
        "me": "Mechanical Engineering",
        "ce": "Civil Engineering"
    };

    const expertiseName = expertiseNames[expertise];

    document.getElementById("mentorGreeting").textContent = `Hi, ${name}! (${expertiseName} - ${experience} years)`;

    mentorAuthSection.classList.add("hidden");
    authSection.classList.add("hidden");
    dashboardSection.classList.add("hidden");
    mentorDashboardSection.classList.remove("hidden");
    mainLoginSection.classList.add("hidden");
    studentLandingSection.classList.add("hidden");
    mentorLandingSection.classList.add("hidden");

    showNotification(`Welcome back, ${name}! `, "success");
});

// ====== LOGOUT ======
function logout() {
    localStorage.removeItem("guidedUser");
    localStorage.removeItem("guidedEmail");
    localStorage.removeItem("guidedUserType");
    localStorage.removeItem("guidedBranch");
    localStorage.removeItem("guidedYear");
    localStorage.removeItem("guidedLoginTime");
    
    showNotification("You have been logged out", "info");
    setTimeout(() => {
        window.location.href = "login.html";
    }, 1000);
}

function mentorLogout() {
    localStorage.removeItem("guidedMentor");
    localStorage.removeItem("guidedMentorEmail");
    localStorage.removeItem("guidedMentorExpertise");
    localStorage.removeItem("guidedMentorExperience");
    localStorage.removeItem("guidedUserType");
    localStorage.removeItem("guidedLoginTime");
    
    showNotification("You have been logged out", "info");
    setTimeout(() => {
        window.location.href = "login.html";
    }, 1000);
}

// ====== AUTO LOGIN & DASHBOARD INITIALIZATION ======
document.addEventListener("DOMContentLoaded", () => {
    const savedUser = localStorage.getItem("guidedUser");
    const savedUserType = localStorage.getItem("guidedUserType");
    const dashboardSection = document.getElementById("dashboard");
    const userNameEl = document.getElementById("userName");

    // Populate dashboard with user info
    if (savedUser && savedUserType === "student") {
        if (userNameEl) {
            userNameEl.textContent = savedUser;
        }
        // Show dashboard section if on index.html
        const currentPage = window.location.hash || "#home";
        if (currentPage === "#dashboard" && dashboardSection) {
            // Hide other sections and show dashboard
            document.querySelectorAll("section").forEach(s => s.classList.add("hidden"));
            dashboardSection.classList.remove("hidden");
        }
    }

    // Handle mentor dashboard
    const savedMentor = localStorage.getItem("guidedMentor");
    if (savedMentor && savedUserType === "mentor") {
        const currentPage = window.location.hash || "#home";
        if (currentPage === "#mentorDashboard") {
            // Hide other sections and show mentor dashboard if it exists
            const mentorDash = document.getElementById("mentorDashboard");
            if (mentorDash) {
                document.querySelectorAll("section").forEach(s => s.classList.add("hidden"));
                mentorDash.classList.remove("hidden");
            }
        }
    }

    // Handle hash changes for navigation
    window.addEventListener("hashchange", () => {
        const currentPage = window.location.hash.slice(1) || "home";
        const userType = localStorage.getItem("guidedUserType");

        // Check authentication for protected pages
        if ((currentPage === "dashboard" || currentPage === "mentorDashboard" || 
             currentPage === "study-material" || currentPage === "roadmap" || currentPage === "placement" ||
             currentPage === "mentors") && !userType) {
            window.location.href = "login.html";
            return;
        }

        navigateTo(currentPage);
    });
});

// ====== TAB SWITCHING ======
function switchTab(tabName) {
    document.querySelectorAll(".tab-content").forEach(tab => {
        tab.classList.remove("active");
    });
    
    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.classList.remove("active");
    });
    
    const tabElement = document.getElementById(tabName);
    if (tabElement) tabElement.classList.add("active");
    
    if (event && event.target) {
        const btn = event.target.closest(".tab-btn");
        if (btn) btn.classList.add("active");
    }
}

function switchMentorTab(tabName) {
    const tabs = document.querySelectorAll("#mentorDashboard .tab-content");
    tabs.forEach(tab => {
        tab.classList.remove("active");
    });
    
    const buttons = document.querySelectorAll("#mentorDashboard .tab-button");
    buttons.forEach(btn => {
        btn.classList.remove("active");
    });
    
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add("active");
    }
    
    if (event && event.target) {
        event.target.classList.add("active");
    }
}

function saveMentorProfile() {
    const name = document.getElementById("mentorProfileName").value;
    const email = document.getElementById("mentorProfileEmail").value;
    const expertise = document.getElementById("mentorProfileExpertise").value;
    
    if (!name || !email || !expertise) {
        showNotification("Please fill in all required fields", "error");
        return;
    }
    
    localStorage.setItem("guidedMentor", name);
    localStorage.setItem("guidedMentorEmail", email);
    localStorage.setItem("guidedMentorExpertise", expertise);
    
    showNotification("Profile updated successfully! ", "success");
}

function saveProfile() {
    const name = document.getElementById("settingsName").value;
    const email = document.getElementById("settingsEmail").value;
    
    if (name && email) {
        localStorage.setItem("guidedUser", name);
        localStorage.setItem("guidedEmail", email);
        showNotification("Profile updated successfully! ", "success");
    } else {
        showNotification("Please fill all fields", "error");
    }
}
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
function goToMainSignup() {
    document.getElementById("mainSignup").classList.remove("hidden");
    document.getElementById("studentSignup").classList.add("hidden");
    document.getElementById("mentorSignup").classList.add("hidden");
}

function goToStudentSignup() {
    document.getElementById("mainSignup").classList.add("hidden");
    document.getElementById("studentSignup").classList.remove("hidden");
    document.getElementById("mentorSignup").classList.add("hidden");
}

function goToMentorSignup() {
    document.getElementById("mainSignup").classList.add("hidden");
    document.getElementById("studentSignup").classList.add("hidden");
    document.getElementById("mentorSignup").classList.remove("hidden");
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

function showFormError(inputId, message) {
    const input = document.getElementById(inputId);
    if (input) {
        const errorElement = input.parentElement.querySelector(".error-message");
        if (errorElement) {
            errorElement.textContent = message;
        }
    }
}

// ====== STUDENT SIGNUP ======
document.addEventListener("DOMContentLoaded", function() {
    const studentSignupForm = document.getElementById("studentSignupForm");
    if (studentSignupForm) {
        studentSignupForm.addEventListener("submit", function(e) {
            e.preventDefault();
            clearFormErrors("studentSignupForm");

            const name = document.getElementById("signupStudentName").value.trim();
            const email = document.getElementById("signupStudentEmail").value.trim();
            const college = document.getElementById("signupStudentCollege").value;
            const branch = document.getElementById("signupStudentBranch").value;
            const year = document.getElementById("signupStudentYear").value;
            const password = document.getElementById("signupStudentPassword").value;
            const confirmPassword = document.getElementById("signupStudentConfirmPassword").value;
            const termsChecked = document.getElementById("studentTerms").checked;

            let hasError = false;

            // Validation
            if (!name) {
                showFormError("signupStudentName", "Please enter your full name");
                hasError = true;
            }

            if (!email) {
                showFormError("signupStudentEmail", "Please enter your email");
                hasError = true;
            } else if (!validateEmail(email)) {
                showFormError("signupStudentEmail", "Please enter a valid email");
                hasError = true;
            }

            // Check if email already exists in GUIDED_DATA
            const emailExists = GUIDED_DATA.students.some(s => s.email === email);
            if (emailExists) {
                showFormError("signupStudentEmail", "This email is already registered");
                hasError = true;
            }

            if (!college) {
                showFormError("signupStudentCollege", "Please select your college");
                hasError = true;
            }

            if (!branch) {
                showFormError("signupStudentBranch", "Please select your branch");
                hasError = true;
            }

            if (!year) {
                showFormError("signupStudentYear", "Please select your year");
                hasError = true;
            }

            if (!password) {
                showFormError("signupStudentPassword", "Please create a password");
                hasError = true;
            } else if (!validatePassword(password)) {
                showFormError("signupStudentPassword", "Password must be at least 6 characters");
                hasError = true;
            }

            if (password !== confirmPassword) {
                showFormError("signupStudentConfirmPassword", "Passwords do not match");
                hasError = true;
            }

            if (!termsChecked) {
                showFormError("studentTerms", "Please agree to the terms and conditions");
                hasError = true;
            }

            if (hasError) {
                showNotification("Please fill all fields correctly", "error");
                return;
            }

            // Add new student to GUIDED_DATA
            const newStudent = {
                id: "STU" + (GUIDED_DATA.students.length + 1).toString().padStart(3, '0'),
                name: name,
                email: email,
                password: password,
                college: college,
                branch: branch,
                year: year,
                phone: "",
                notifications: []
            };

            GUIDED_DATA.students.push(newStudent);

            // Save to localStorage (for demo purposes)
            localStorage.setItem("newStudents", JSON.stringify(GUIDED_DATA.students));

            showNotification(`✅ Account created successfully! Welcome, ${name}!`, "success");

            // Redirect to login after 2 seconds
            setTimeout(() => {
                window.location.href = "login.html";
            }, 2000);
        });
    }
});

// ====== MENTOR SIGNUP ======
document.addEventListener("DOMContentLoaded", function() {
    const mentorSignupForm = document.getElementById("mentorSignupForm");
    if (mentorSignupForm) {
        mentorSignupForm.addEventListener("submit", function(e) {
            e.preventDefault();
            clearFormErrors("mentorSignupForm");

            const name = document.getElementById("signupMentorName").value.trim();
            const email = document.getElementById("signupMentorEmail").value.trim();
            const college = document.getElementById("signupMentorCollege").value;
            const expertise = document.getElementById("signupMentorExpertise").value;
            const experience = document.getElementById("signupMentorExperience").value;
            const qualifications = document.getElementById("signupMentorQualifications").value.trim();
            const password = document.getElementById("signupMentorPassword").value;
            const confirmPassword = document.getElementById("signupMentorConfirmPassword").value;
            const termsChecked = document.getElementById("mentorTerms").checked;

            let hasError = false;

            // Validation
            if (!name) {
                showFormError("signupMentorName", "Please enter your full name");
                hasError = true;
            }

            if (!email) {
                showFormError("signupMentorEmail", "Please enter your email");
                hasError = true;
            } else if (!validateEmail(email)) {
                showFormError("signupMentorEmail", "Please enter a valid email");
                hasError = true;
            }

            // Check if email already exists in GUIDED_DATA
            const emailExists = GUIDED_DATA.mentors.some(m => m.email === email);
            if (emailExists) {
                showFormError("signupMentorEmail", "This email is already registered");
                hasError = true;
            }

            if (!college) {
                showFormError("signupMentorCollege", "Please select your college");
                hasError = true;
            }

            if (!expertise) {
                showFormError("signupMentorExpertise", "Please select your expertise");
                hasError = true;
            }

            if (!experience || experience < 0) {
                showFormError("signupMentorExperience", "Please enter valid experience");
                hasError = true;
            }

            if (!qualifications) {
                showFormError("signupMentorQualifications", "Please enter your qualifications");
                hasError = true;
            }

            if (!password) {
                showFormError("signupMentorPassword", "Please create a password");
                hasError = true;
            } else if (!validatePassword(password)) {
                showFormError("signupMentorPassword", "Password must be at least 6 characters");
                hasError = true;
            }

            if (password !== confirmPassword) {
                showFormError("signupMentorConfirmPassword", "Passwords do not match");
                hasError = true;
            }

            if (!termsChecked) {
                showFormError("mentorTerms", "Please agree to the terms and conditions");
                hasError = true;
            }

            if (hasError) {
                showNotification("Please fill all fields correctly", "error");
                return;
            }

            // Add new mentor to GUIDED_DATA
            const newMentor = {
                id: "MEN" + (GUIDED_DATA.mentors.length + 1).toString().padStart(3, '0'),
                name: name,
                email: email,
                password: password,
                college: college,
                expertise: expertise,
                experience: experience,
                phone: "",
                qualifications: qualifications,
                notifications: []
            };

            GUIDED_DATA.mentors.push(newMentor);

            // Save to localStorage (for demo purposes)
            localStorage.setItem("newMentors", JSON.stringify(GUIDED_DATA.mentors));

            showNotification(`✅ Account created successfully! Welcome, ${name}!`, "success");

            // Redirect to login after 2 seconds
            setTimeout(() => {
                window.location.href = "login.html";
            }, 2000);
        });
    }
});

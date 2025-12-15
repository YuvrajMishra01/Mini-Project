// ====== GUIDED PLATFORM DATA ======
// This file contains all predefined users and their credentials

const GUIDED_DATA = {
    // ====== STUDENTS ======
    students: [
        {
            id: "STU001",
            name: "Yash Patel",
            email: "arjun.patel@college.edu",
            password: "Arjun@123",
            college: "IITD",
            branch: "cse",
            year: "2",
            phone: "+91 98765 43210",
            notifications: []
        },
        {
            id: "STU002",
            name: "Priya Singh",
            email: "priya.singh@college.edu",
            password: "Priya@123",
            college: "BITS Pilani",
            branch: "ece",
            year: "3",
            phone: "+91 98765 43211",
            notifications: []
        },
        {
            id: "STU003",
            name: "Rahul Sharma",
            email: "rahul.sharma@college.edu",
            password: "Rahul@123",
            college: "NIT Delhi",
            branch: "me",
            year: "1",
            phone: "+91 98765 43212",
            notifications: []
        },
        {
            id: "STU004",
            name: "Neha Gupta",
            email: "neha.gupta@college.edu",
            password: "Neha@123",
            college: "Delhi University",
            branch: "ce",
            year: "4",
            phone: "+91 98765 43213",
            notifications: []
        },
        {
            id: "STU005",
            name: "Vikram Kumar",
            email: "vikram.kumar@college.edu",
            password: "Vikram@123",
            college: "IITK",
            branch: "cse",
            year: "2",
            phone: "+91 98765 43214",
            notifications: []
        }
    ],

    // ====== MENTORS ======
    mentors: [
        {
            id: "MEN001",
            name: "Mr. Yatharth Srivastava",
            email: "yatharth.srivastava@guided.com",
            password: "Yatharth@123",
            college: "IITD",
            expertise: "aiml",
            experience: "2",
            phone: "+91 00000000000",
            qualifications: "B.Tech CSE, M.Tech",
            notifications: []
        },
        {
            id: "MEN002",
            name: "Prof. Ananya Patel",
            email: "ananya.patel@guided.com",
            password: "Ananya@123",
            college: "BITS Pilani",
            expertise: "aiml",
            experience: "6",
            phone: "+91 99999 00002",
            qualifications: "B.Tech ECE, M.Tech AI",
            notifications: []
        },
        {
            id: "MEN003",
            name: "Mohit Verma",
            email: "mohit.verma@guided.com",
            password: "Mohit@123",
            college: "IITB",
            expertise: "dsa",
            experience: "5",
            phone: "+91 99999 00003",
            qualifications: "B.Tech CSE, Competitive Programmer",
            notifications: []
        },
        {
            id: "MEN004",
            name: "Simran Negi",
            email: "simran.negi@guided.com",
            password: "Simran@123",
            college: "Delhi University",
            expertise: "blockchain",
            experience: "4",
            phone: "+91 99999 00004",
            qualifications: "B.Tech IT, Blockchain Expert",
            notifications: []
        },
        {
            id: "MEN005",
            name: "Aditya Singh",
            email: "aditya.singh@guided.com",
            password: "Aditya@123",
            college: "NIT Delhi",
            expertise: "webdev",
            experience: "7",
            phone: "+91 99999 00005",
            qualifications: "B.Tech CSE, Full Stack Developer",
            notifications: []
        }
    ]
};

// ====== VALIDATION FUNCTIONS ======
function validateStudentLogin(email, password, college) {
    const student = GUIDED_DATA.students.find(s => 
        s.email === email && s.password === password && s.college === college
    );
    return student || null;
}

function validateMentorLogin(email, password, college) {
    const mentor = GUIDED_DATA.mentors.find(m => 
        m.email === email && m.password === password && m.college === college
    );
    return mentor || null;
}

// ====== NOTIFICATION FUNCTIONS ======
function addStudentNotification(studentId, notification) {
    const student = GUIDED_DATA.students.find(s => s.id === studentId);
    if (student) {
        student.notifications.push({
            id: Date.now(),
            title: notification.title,
            message: notification.message,
            type: notification.type || 'info',
            timestamp: new Date().toLocaleString(),
            read: false
        });
        // Save to localStorage for persistence
        localStorage.setItem(`notifications_${studentId}`, JSON.stringify(student.notifications));
    }
}

function addMentorNotification(mentorId, notification) {
    const mentor = GUIDED_DATA.mentors.find(m => m.id === mentorId);
    if (mentor) {
        mentor.notifications.push({
            id: Date.now(),
            title: notification.title,
            message: notification.message,
            type: notification.type || 'info',
            timestamp: new Date().toLocaleString(),
            read: false
        });
        // Save to localStorage for persistence
        localStorage.setItem(`notifications_${mentorId}`, JSON.stringify(mentor.notifications));
    }
}

function getStudentNotifications(studentId) {
    const saved = localStorage.getItem(`notifications_${studentId}`);
    if (saved) {
        return JSON.parse(saved);
    }
    const student = GUIDED_DATA.students.find(s => s.id === studentId);
    return student ? student.notifications : [];
}

function getMentorNotifications(mentorId) {
    const saved = localStorage.getItem(`notifications_${mentorId}`);
    if (saved) {
        return JSON.parse(saved);
    }
    const mentor = GUIDED_DATA.mentors.find(m => m.id === mentorId);
    return mentor ? mentor.notifications : [];
}

// ====== SCHEDULE SESSION FUNCTION ======
function scheduleSessionForStudent(studentId, mentorName, sessionDetails) {
    const notification = {
        title: `Session Scheduled with ${mentorName}`,
        message: `You have a new session scheduled on ${sessionDetails.date} at ${sessionDetails.time} for ${sessionDetails.topic}. Duration: ${sessionDetails.duration}`,
        type: 'session'
    };
    addStudentNotification(studentId, notification);
}

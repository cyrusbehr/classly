const LoginCardData = [
  {
    URL: "../assets/student-card-picture.jpg",
    title: "Student",
    redirectRoute: "/student/signup",
    thisClass: "student-class",
  },
  {
    URL: "../assets/teacher-card-picture.jpg",
    title: "Professor",
    redirectRoute: "/professor/signup",
    thisClass: "professor-class",
  },
  {
    URL: "../assets/ta-card-picture.jpg",
    title: "TA",
    redirectRoute: "/ta/signup",
    thisClass: "TA-class",
  },
]

const ProfessorSignupData = {
  URL: "logo/image URL",
  title: "Enter information here to create a room",
  redirectRoute: '/professor/main'
}

const StudentSignupData = {
  URL: "logo/image URL",
  title: "Enter information here to create a room",
  redirectRoute: '/student/main'
}

const taSignupData = {
  URL: "logo/image URL",
  title: "Enter information here to create a room",
  redirectRoute: '/ta/main'
}

module.exports = {
  LoginCardData,
  taSignupData,
  StudentSignupData,
  ProfessorSignupData
}

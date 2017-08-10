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

const colorArray = [
  '#feafa0',
  '#fc616f',
  '#26739d',
  '#ffd248',
  '#25100b',
  '#e72d2d',
  '#4b0916',
  '#9f1b33',
  '#ff663f',
  '#00aebd',
  '#1d0d20',
  '#01012a',
  '#3a0032',
  '#e20163',
  '#cc3082',
  '#b2ffce',
  '#ff7575',
  '#fffa80',
  '#d29dff',
  '#a5f2f9'
]

module.exports = {
  LoginCardData,
  taSignupData,
  StudentSignupData,
  ProfessorSignupData,
  colorArray
}

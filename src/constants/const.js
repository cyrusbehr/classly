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
  '#FF6900',
  '#FCB900',
  '#7BDCB5',
  '#8ED1FC',
  '#0693E3',
  '#ABB8C3',
  '#EB144C',
  '#F78DA7',
  '#9900EF'
]

module.exports = {
  LoginCardData,
  taSignupData,
  StudentSignupData,
  ProfessorSignupData,
  colorArray
}

const LoginCardData = [
  {
    URL: "https://res.cloudinary.com/dxih0rp6w/image/upload/v1503639178/student-card-picture_lkfv2q.png",
    title: "Student",
    redirectRoute: "/student/signup",
    thisClass: "student-class",
  },
  {
    URL: "https://res.cloudinary.com/dxih0rp6w/image/upload/v1503639177/teacher-card-picture_gmmujs.jpg",
    title: "Professor",
    redirectRoute: "/professor/signup",
    thisClass: "professor-class",
  },
  {
    URL: "https://res.cloudinary.com/dxih0rp6w/image/upload/v1503639177/ta-card-picture_vkjlru.jpg",
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

var baseDomain;
if(window.location.hostname === "localhost") {
  baseDomain = "http://localhost:8080/"
} else {
  baseDomain = "https://" + window.location.hostname + "/";
}

const colorArray = [
  '#FDA1FF',
  '#FA28FF',
  '#AB149E',
  '#AEA1FF',
  '#7B64FF',
  '#73D8FF',
  '#009CE0',
  '#0062B1',
  '#68CCCA',
  '#16A5A5',
  '#0C797D',
  '#A4DD00',
  '#68BC00',
  '#194D33',
  '#DBDF00',
  '#B0BC00',
  '#FB9E00',
  '#FE9200',
  '#C45100',
  '#F44E3B',
]

module.exports = {
  LoginCardData,
  taSignupData,
  StudentSignupData,
  ProfessorSignupData,
  colorArray,
  baseDomain
}

import React, {Component} from 'react';
import { connect } from 'react-redux';
import {loading, notLoading, populateCourse} from '../actions/Actions'
import DashboardCourseCard from './DashboardCourseCard';
import axios from 'axios'
import {baseDomain} from '../constants/const'
import {addCourse} from '../actions/Actions';
import Modal from 'react-modal';

class DashboardContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      showCreateCourseModal: false,
      professorName: "",
      courseTitle: "",
      courseCode: "",
    }
  }

  componentDidMount() {
    this.props.setLoadingAction();
    axios.get(baseDomain + 'api/dashboard')
    .then({data} => {
      if(data.error) {
        console.log("there was an error loading the dashboard : ", data.error);
      } else {
        this.props.populateCourseAction(data.response);
        this.props.setNotLoadingAction();
      }
    })
    .catch((err) => console.log("there was an error: ", err))
}

  onCreateCourseClick(e) {
    //open modal
    this.setState({showCreateCourseModal: true});
    //information is filled out and saved in this.state
  }

  onNameChange(e){
    this.setState({professorName: e.target.value});
  }

  onCourseTitleChange(e){
    this.setState({courseTitle: e.target.value});
  }

  onCourseCodeChange(e){
    this.setState({courseCode: e.target.value});
  }

  onCardClick() {
    //get classes
    //Re render dashboard with classes inside the Course
  }

  onSubmitModal(e){
    //create course object from what is saved in this.state
    e.preventDefault();
    var data = {
      professorName: this.state.professorName,
      courseTitle: this.state.courseTitle,
      courseCode: this.state.courseCode,
      accessCode: "",
      classes: [],
    };
    //axios post request to backend with that object
    //use baseDomain in axios request and import it from the constants file
    //on the .then of this action dispatch action to the reducer
    //to add the course to the course reducer. need to write this action. courses is an array in reducer
    //immutable --> splice array to make deep copy then resave
    axios.post(baseDomain + 'dashboard', {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      passwordRepeat: this.state.passwordRepeat,
      userType: "student"
    })
    .then((r) => {
      if(r.data.error) {
        this.props.setNotLoadingAction();
        console.log("Error encountered while creating new course: ", r.data);
      } else {
        this.props.setNotLoadingAction();
        //dispatch action to reducer to add coures to course reduver
        this.props.addCourseAction(r.data.response);
      }
    })
    .catch((err) => {
      console.log("there was an error with the request : ", err);
    });
    //close modal
    this.setState({showCreateCourseModal: false});
  }

  onCloseModal(){
    this.setState({showCreateCourseModal: false});
  }

  onCardClick() {
    //Re render dashboard with classes inside the Course
  }

  onCreateClassClick(){
    //open class modal
    //information is filloud out and saved in this.state
    //create new class modal
  }


  render() {
    var isProfessor = (this.props.userType === "Professor");

    return(
      <div className="dashboard">
        <div className="dashboard-header">
          <span>Class.ly</span>
          <span>This is Dashboard Container</span>
          <span>UserType: {this.props.userType}</span>
          <div>
            <span>Icon</span>
            <span>  Icon</span>
          </div>
        </div>
        {this.props.isLoading
          ?
          <div className="loader-dashboard">
            <svg className="circular-dashboard" viewBox="25 25 50 50">
              <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
            </svg>
          </div>
          :
          <div>
          <div className="dashboardBody-container">
            <div className="dashboardBody-container-header">
              <h1>Dashboard</h1>
              <button className="dashboardBody-button">Join a course</button>
              <button className="dashboardBody-button" onClick={(e) => this.onCreateCourseClick(e)}>Create a Course</button>
            </div>
            <div className="dashboardBody-container-body">
              {this.props.courses.map((course) => {
                return (
                  <DashboardCourseCard
                    professorName={course.professorName}
                    courseTitle={course.courseTitle}
                    courseCode={course.courseCode}
                    classID={course._id}
                  />
                )
              })}
            </div>
          </div>
          <Modal
          isOpen={this.state.showCreateCourseModal}
          contentLabel="Create a Course"
          >
            <h2>Fill out the following information to create a new course</h2>
            <div>I am a modal</div>
            <form>
              <input
                type="text"
                value={this.state.professorName}
                placeholder="Professor Name"
                onChange={(e) => this.onNameChange(e)}
              />
              <input
                type="text"
                value={this.state.courseTitle}
                placeholder="Course Title"
                onChange={(e) => this.onCourseTitleChange(e)}
              />
              <input
                type="text"
                value={this.state.courseCode}
                placeholder="Course Code"
                onChange={(e) => this.onCourseCodeChange(e)}
              />
              <button
                onClick={(e) => this.onSubmitModal(e)}
                >Create Course</button>
              <button
                onClick={() => this.onCloseModal()}
                >Close</button>
            </form>
          </Modal>
        </div>
        }
    </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    user: state.userReducer,
    isLoading: state.pageReducer.isLoading,
    courses: state.courseReducer,
    isLoading: state.pageReducer.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    populateCourseAction: (courseArray) => {
      dispatch(populateCourse(courseArray))
    },
    setLoadingAction: () => {
      dispatch(loading())
    },
    setNotLoadingAction: () => {
      dispatch(notLoading())
    },
    addCourseAction: (courseObj) => {
      dispatch(addCourse(courseObj))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer);

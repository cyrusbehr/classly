import React, {Component} from 'react';
import { connect } from 'react-redux';
import {loading, notLoading, populateCourse} from '../actions/Actions'
import DashboardCourseCard from './DashboardCourseCard';
import axios from 'axios'
import {baseDomain} from '../constants/const'
import {addCourse, ADD_CLASS_TO_ARRAY} from '../actions/Actions';
import Modal from 'react-modal';

class DashboardContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      showCreateCourseModal: false,
      courseTitle: "",
      courseCode: "",
      showCreateClassModal: false,
      classTitle: "",
    }
  }

  componentDidMount() {
    this.props.setLoadingAction();
    axios.get(baseDomain + 'api/dashboard')
    .then((r) => {
      if(r.data.error) {
        console.log("there was an error loading the dashboard : ", r.data.error);
      } else {
        this.props.populateCourseAction(r.data.response);
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

  onCourseTitleChange(e){
    this.setState({courseTitle: e.target.value});
  }

  onCourseCodeChange(e){
    this.setState({courseCode: e.target.value});
  }

  onSubmitModal(e){
    //create course object from what is saved in this.state
    e.preventDefault();
    var data = {
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
    axios.post(baseDomain + 'api/create/course', {
      data: data
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
    //get classes
    //Re render dashboard with classes inside the Course
  }

  onCreateClassClick(){
    //open class modal
    this.setState({showCreateClassModal: true})
    //information is filloud out and saved in this.state
  }

  onClassTitleChange(e){
    this.setState({classTitle: e.target.value});
  }

  onSubmitClassModal(e){
    e.preventDefault();
    var data = {
      classTitle: this.state.classTitle,
      courseReference: this.props.courseReference, //TODO: Make sure this gets passed in to props
    };
    //axios post request to backend with that object
    //use baseDomain in axios request and import it from the constants file
    //on the .then of this action dispatch action to the reducer
    //to add the course to the course reducer. need to write this action. courses is an array in reducer
    //immutable --> splice array to make deep copy then resave
    axios.post(baseDomain + '/api/create/class', {
      data: data
    })
    .then((r) => {
      if(r.data.error) {
        this.props.setNotLoadingAction();
        console.log("Error encountered while creating new class: ", r.data);
      } else {
        this.props.setNotLoadingAction();
        //dispatch action to reducer to add coures to course reduver
        this.props.addClassToArrayAction(r.data.response);
      }
    })
    .catch((err) => {
      console.log("there was an error with the request : ", err);
    });
    //close modal
    this.setState({showCreateClassModal: false});
  }

  onCloseClassModal(){
    this.setState({showCreateClassModal: false});
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
              <button className="dashboardBody-button"
                onClick={() => this.onCreateClassClick()}
                >Create a class</button>
                <button className="dashboardBody-button"
                  >Join a course</button>
              <button className="dashboardBody-button"
                onClick={(e) => this.onCreateCourseClick(e)}
                >Create a Course</button>
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
          <Modal
          isOpen={this.state.showCreateClassModal}
          contentLabel="Create a Course"
          >
            <h2>Fill out the following information to create a new Class!!!!</h2>
            <form>
              <input
                type="text"
                value={this.state.classTitle}
                placeholder="Class Title"
                onChange={(e) => this.onClassTitleChange(e)}
              />
              <button
                onClick={(e) => this.onSubmitClassModal(e)}
                >Create Course</button>
              <button
                onClick={() => this.onCloseClassModal()}
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
    //pass in courseId
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
    },
    addClassToArrayAction: (classObj) => {
      dispatch(addClassToArray(classObj))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer);

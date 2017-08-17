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
      className: "",
      classTitle: "",
      showAddClassModal: false,
      accessCode: "",
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
    e.preventDefault();
    //open modal
    this.setState({showCreateCourseModal: true});
    //information is filled out and saved in this.state
  }

  handleAddCourseClick(e) {
    e.preventDefault();
    this.setState({showAddClassModal: true});
  }

  onCloseAddCourseModal(e) {
    e.preventDefault();
    this.setState({showAddClassModal: false})
  }

  onCourseTitleChange(e){
    this.setState({courseTitle: e.target.value});
  }

  onAccessCodeChange(e) {
    this.setState({accessCode: e.target.value});
  }

  onCourseCodeChange(e){
    this.setState({courseCode: e.target.value});
  }

  onSubmitAddCourseModal(e) {
    console.log("we made it to this fucking point in time");
    e.preventDefault();
    console.log("point 2");
    axios.post(baseDomain + 'api/addclass', {
      accessCode: this.state.accessCode
    })
    .then((r) => {
      console.log("point 3");

      if(r.data.error) {
        console.log("there was an error: ", r.data.error);
      } else {
        console.log("we actually made it to this point in time : ", r.data.response);
        this.props.addCourseAction(r.data.response);
      }
    })
    .catch((err) => console.log("There was an error : ", err))
    this.setState({showAddClassModal: false});
  }

  onSubmitModal(e){
    //create course object from what is saved in this.state
    e.preventDefault();

    axios.post(baseDomain + 'api/create/course', {
      courseTitle: this.state.courseTitle,
      courseCode: this.state.courseCode,
    })
    .then((r) => {
      this.setState({
        courseTitle: "",
        courseCode: "",
      })
      if(r.data.error) {
        console.log("Error encountered while creating new course: ", r.data);
      } else {
        this.props.addCourseAction(r.data.response);
      }
    })
    .catch((err) => {
      console.log("there was an error with the request : ", err);
    });
    //close modal
    this.setState({showCreateCourseModal: false});
  }

  onCloseModal(e){
    e.preventDefault()
    this.setState({showCreateCourseModal: false});
  }

  onCreateClassClick(){
    //open class modal
    this.setState({showCreateClassModal: true})
    //information is filloud out and saved in this.state
  }

  onclassNameChange(e){
    this.setState({className: e.target.value});
  }

  onSubmitClassModal(e){
    e.preventDefault();
    //axios post request to backend with that object
    //use baseDomain in axios request and import it from the constants file
    //on the .then of this action dispatch action to the reducer
    //to add the course to the course reducer. need to write this action. courses is an array in reducer
    //immutable --> splice array to make deep copy then resave
    axios.post(baseDomain + 'api/create/class', {
        className: this.state.className,
        courseReference: this.props.courseReference, //TODO: Make sure this gets passed in to props
    })
    .then((r) => {
      if(r.data.error) {
        this.props.setNotLoadingAction();
        console.log("Error encountered while creating new class: ", r.data);
      } else {
        this.props.setNotLoadingAction();
        this.props.addClassToArrayAction(r.data.response);
        console.log("We actually hit this route!");

      }
    })
    .catch((err) => {
      console.log("there was an error with the request : ", err);
    });
    //close modal
    this.setState({showCreateClassModal: false});
  }

  onCloseClassModal(e){
    e.preventDefault()
    this.setState({showCreateClassModal: false});
  }


  render() {
    var isProfessor = (this.props.userType === "Professor");

    return(
      <div className="dashboard">
        <div className="dashboard-header">
          <text className="dashboard-header-name">Class.ly</text>
          <div className="dashboard-navbar">
            <text className="dashboard-profile">Profile</text>
            <text className="dashboard-logout">Log out</text>
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
            <div className="dashboardBody-container-header-container">
              <div className="dashboardBody-container-header">
                <text className="dashboardBody-container-dashboard-name">Dashboard</text>
                <div className="dashboardBody-container-buttons">
                  <button className="dashboardBody-button hvr-fade"
                    onClick={(e) => this.onCreateCourseClick(e)}
                    >Create a Course</button>

                    <button className="dashboardBody-button hvr-fade"
                      onClick={(e) => this.handleAddCourseClick(e)}
                      >Add a New Course</button>
                </div>
              </div>
            </div>
            <div className="dashboardBody-container-body">
              {this.props.courses.map((course) => {
                return (
                  <DashboardCourseCard
                    key={course._id}
                    professorName={course.professorName}
                    courseTitle={course.courseTitle}
                    courseCode={course.courseCode}
                    courseID={course._id}
                    {...this.props}
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
                onClick={(e) => this.onCloseModal(e)}
                >Close</button>
            </form>
          </Modal>
          <Modal
          isOpen={this.state.showAddClassModal}
          contentLabel="Add a new course"
          >
            <h2>Fill out the following information to add a new Class!!!!</h2>
            <form>
              <input
                type="text"
                value={this.state.accessCode}
                placeholder="Access Code"
                onChange={(e) => this.onAccessCodeChange(e)}
              />
              <button
                onClick={(e) => this.onSubmitAddCourseModal(e)}
                >Add Course</button>
              <button
                onClick={(e) => this.onCloseAddCourseModal(e)}
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

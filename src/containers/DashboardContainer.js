import React, {Component} from 'react';
import { connect } from 'react-redux';
import {loading, notLoading, populateCourse, setUser} from '../actions/Actions'
import DashboardCourseCard from './DashboardCourseCard';
import axios from 'axios'
import {baseDomain} from '../constants/const'
import {addCourse, ADD_CLASS_TO_ARRAY} from '../actions/Actions';
import Modal from 'react-modal';
import {TextField} from 'material-ui';

class DashboardContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      showCreateCourseModal: false,
      courseTitle: "",
      courseCode: "",
      courseTitleError: "",
      courseCodeError: "",
      showCreateClassModal: false,
      className: "",
      classTitle: "",
      showAddClassModal: false,
      accessCode: "",
      accessCodeError: ""
    }
  }

  componentDidMount() {
    var self = this;
    axios.get(baseDomain + 'checkLogin')
    .then((r) => {
      if(r.data.loggedIn) {
        self.props.setUserAction(r.data.user);
      } else {
        self.props.history.push('/')
      }
    })

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
    e.preventDefault();
    axios.post(baseDomain + 'api/addclass', {
      accessCode: this.state.accessCode
    })
    .then((r) => {
      if(r.data.error) {
        this.setState({accessCodeError: r.data.error})
        console.log("there was an error: ", r.data.error);
      } else {
        console.log("we actually made it to this point in time : ", r.data.response);
        this.setState({showAddClassModal: false});
        this.props.addCourseAction(r.data.response);
      }
    })
    .catch((err) => console.log("There was an error : ", err))
  }

  onSubmitModal(e){
    if(e){
      e.preventDefault();
    }

    axios.post(baseDomain + 'api/create/course', {
      courseTitle: this.state.courseTitle,
      courseCode: this.state.courseCode,
    })
    .then((r) => {
      if(r.data.error) {
        console.log("Error encountered while creating new course: ", r.data);
        this.setState({
          courseTitleError: "",
          courseCodeError: ""
        })
        r.data.error.forEach(err=>{
          switch(err.param){
            case "courseTitle": this.setState({courseTitleError: err.msg}); break;
            case "courseCode": this.setState({courseCodeError: err.msg}); break;
            default: break;
          }
        })
      } else {
        this.setState({
          courseTitle: "",
          courseCode: "",
        })
        this.props.addCourseAction(r.data.response);
        this.setState({showCreateCourseModal: false});
      }
    })
    .catch((err) => {
      console.log("there was an error with the request : ", err);
    });
  }

  onCloseModal(e){
    if(e){
      e.preventDefault();
    }
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

  onCloseClassModal(e){
    e.preventDefault()
    this.setState({showCreateClassModal: false});
  }

  handleLogout(e) {
    var self = this;
    axios.get(baseDomain + 'logout')
    .then(() => {
      self.props.history.push('/');
    })
  }

  render() {
    var isProfessor = (this.props.user.userType === 'professor')
    return(
      <div className="dashboard">
        <div className="dashboard-header">
          <text className="dashboard-header-name">Classly</text>
          <div className="dashboard-navbar">
            <text className="dashboard-profile">Profile</text>
            <text onClick={(e) => this.handleLogout(e)} className="dashboard-logout">Log out</text>
          </div>
        </div>
        {this.props.isLoading
          ?
          <div className="dashboardBody-container">
          <div className="loader-dashboard">
            <svg className="circular-dashboard" viewBox="25 25 50 50">
              <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
            </svg>
          </div>
        </div>
          :
          <div>
            <div className="dashboardBody-container">
              <div className="dashboardBody-container-header-container">
                <div className="dashboardBody-container-header">
                  <text className="dashboardBody-container-dashboard-name">Course Dashboard</text>
                  <div className="dashboardBody-container-buttons">
                    {isProfessor
                      ?
                      <button className="dashboardBody-button hvr-grow"
                        onClick={(e) => this.onCreateCourseClick(e)}
                        >Create a Course</button>
                        :
                        <button className="dashboardBody-button hvr-grow"
                          onClick={(e) => this.handleAddCourseClick(e)}
                          >Join a Course</button>
                        }
                      </div>
                    </div>
                  </div>
                  <div className={this.props.courses.length === 0 ? "dashboardBody-container-body-empty" : "dashboardBody-container-body"}>
                    {this.props.courses.length === 0 ? <div className="no-courses">You don't have any courses~</div> : null}
                    {this.props.courses.map((course) => {
                      return (
                        <DashboardCourseCard
                          key={course._id}
                          professorName={course.professorName}
                          courseTitle={course.courseTitle}
                          courseCode={course.courseCode}
                          courseID={course._id}
                          accessCode={course.accessCode}
                          {...this.props}
                        />
                      )
                    })}
                  </div>
                </div>
                <Modal
                  isOpen={this.state.showCreateCourseModal}
                  contentLabel="Create a Course"
                  className="guide-modal-create-class"
                  overlayClassName="guide-modal-overlay"
                  >
                    <div className="modal-header">
                      Create Course
                    </div>
                    <div className="modal-body-create-course">
                      <TextField
                        errorText={this.state.courseTitleError}
                        hintText="Course Title"
                        underlineFocusStyle={{'borderColor': '#00c993'}}
                        value={this.state.courseTitle}
                        onChange={(e) => this.onCourseTitleChange(e)}
                        onKeyPress={(ev) => {
                          if (ev.key === 'Enter') {
                            this.onSubmitModal()
                            ev.preventDefault();
                          }
                        }}
                      />
                      <TextField
                        errorText={this.state.courseCodeError}
                        onKeyPress={(ev) => {
                          if (ev.key === 'Enter') {
                            this.onSubmitModal()
                            ev.preventDefault();
                          }
                        }}
                        hintText="Course Code"
                        underlineFocusStyle={{'borderColor': '#00c993'}}
                        value={this.state.courseCode}
                        onChange={(e) => this.onCourseCodeChange(e)}
                      />
                    </div>
                    <div className="modal-footer">
                      <button
                        className="dashboardBody-create-class-button hvr-grow"
                        onClick={(e) => this.onSubmitModal(e)}
                        >Create Course</button>
                        <button
                          className="dashboardBody-close-button hvr-grow"
                          onClick={(e) => this.onCloseModal(e)}
                          >Close</button>
                        </div>
                      </Modal>

                      <Modal
                        className="guide-modal"
                        overlayClassName="guide-modal-overlay"
                        isOpen={this.state.showAddClassModal}
                        contentLabel="Add a new course"
                        >
                          <div className="modal-header">
                            Join Course
                          </div>
                          <TextField
                            hintText="Access Code"
                            errorText={this.state.accessCodeError}
                            underlineFocusStyle={{'borderColor': '#00c993'}}
                            value={this.state.accessCode}
                            onChange={(e) => this.onAccessCodeChange(e)}
                          />
                          <div className="modal-footer">
                            <button
                              className="dashboardBody-create-class-button hvr-grow"
                              onClick={(e) => this.onSubmitAddCourseModal(e)}
                              >Add Course</button>
                              <button
                                className="dashboardBody-close-button hvr-grow"
                                onClick={(e) => this.onCloseAddCourseModal(e)}
                                >Close</button>
                              </div>
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
                    isLoading: state.pageReducer.isLoading,
                    user: state.userReducer.user
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
                    },
                    setUserAction: (user) => {
                      dispatch(setUser(user))
                    },
                  }
                }

                export default connect(
                  mapStateToProps,
                  mapDispatchToProps
                )(DashboardContainer);

import React, {Component} from 'react';
import { connect } from 'react-redux';
import {loading, notLoading} from '../actions/Actions'
import StudentDashboardCard from './StudentDashboardCard';
import axios from 'axios'
import {baseDomain} from '../constants/const'

import Modal from 'react-modal';

class DashboardContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      showModal: false,
      professorName: "",
      courseTitle: "",
    };
  }

  componentDidMount() {
    this.props.setLoadingAction();
    axios.get(baseDomain + 'dashboard')
    .then((r) => {
      if(r.data.error) {
        console.log("there was an error loading the dashboard");
      } else {
        // TODO: update the state here
      }
    })
    .catch((err) => console.log("there was an error: ", err))
  }

  onCardClick() {
    //Re render dashboard with classes inside the Course
  }
  
  //TODO: Axios get request for user classes
  onNameChange( e){
    this.setState({professorName: e.target.value});
  }

  onCreateCourseClick(e) {
    //open modal
    this.setState({showModal: true});
    //information is filled out and saved in this.state
  }

  onSubmitModal(e){
    //create course object from what is saved in this.state
    //axios post request to backend with that object
        //use baseDomain in axios request and import it from the constants file
        //on the .then of this action dispatch action to the reducer
        //to add the course to the course reducer. need to write this action. courses is an array in reducer
        //immutable --> splice array to make deep copy then resave
    //close modal
    this.setState({showModal: false});
  }

  onCloseModal(e){
    this.setSTate({showModal: false});
  }

  onCardClick() {
    //Re render dashboard with classes inside the Course
  }

  onCreateClassClick(){

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
        <div className="dashboardBody-container">
          <div className="dashboardBody-container-header">
            <h1>Dashboard</h1>
            <button className="dashboardBody-button">Join a course</button>
            <button className="dashboardBody-button" onClick={(e) => this.onCreateCourseClick(e)}>Create a Course</button>
          </div>
          <Modal
          isOpen={this.state.showModal}
          contentLabel="Create a Course"
          >
            <h2>Fill out the following information to create a new course</h2>
            <button onClick={this.onCloseModal}>close</button>
            <div>I am a modal</div>
            <form>
              <input
                type="text"
                value={this.state.professorName}
                placeholder="Professor Name"
                onChange={(event) => this.handleChange(professorName, event)}
              />
              <input
                type="text"
                value={this.state.professorName}
                placeholder="Course Title"
                onChange={(event) => this.handleChange(professorName, event)}
              />
              <button>Create Course</button>
            </form>
          </Modal>
          <div className="dashboardBody-container-body">
            <StudentDashboardCard/>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    user: state.userReducer,
    isLoading: state.pageReducer.isLoading

  }
}

const mapDispatchToProps = dispatch => {
  return {
    setLoadingAction: () => {
      dispatch(loading())
    },
    setNotLoadingAction: () => {
      dispatch(notLoading())
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer);

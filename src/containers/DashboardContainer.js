import React, {Component} from 'react';
import { connect } from 'react-redux';
import {loading, notLoading} from '../actions/Actions'
import StudentDashboardCard from './StudentDashboardCard';
import axios from 'axios'

class DashboardContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
    };
  }

  componentDidMount() {
    this.props.setLoadingAction();

  }

  onCardClick() {
    //Re render dashboard with classes inside the Course
  }

  onCreateCourseClick(e) {
    //open modal
    //fill information out, save to temp state
  }

  onSubmitModal(){

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
              <button className="dashboardBody-button">Create a Course</button>
            </div>
            <div className="dashboardBody-container-body">
              <StudentDashboardCard/>
            </div>
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

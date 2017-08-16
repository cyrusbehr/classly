import React, {Component} from 'react';
import { connect } from 'react-redux';
import {loading, notLoading} from '../actions/Actions'
import StudentDashboardCard from './StudentDashboardCard';

class DashboardContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
    };
  }

  componenetDidMount() {

  }

  //TODO: Axios get request for user classes

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
          <span>This is DashboardContainer</span>
          <span>UserType: {this.props.userType}</span>
          <div>
            <span>Icon</span>
            <span>  Icon</span>
          </div>
        </div>
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

import React, {Component} from 'react'
import { connect } from 'react-redux';
import {loading, notLoading, populateClass} from '../actions/Actions'
import axios from 'axios'
import {baseDomain} from '../constants/const'
import {FlatButton} from 'material-ui';


class DashboardCourseCard extends Component {
  constructor(props){
    super(props)
  }

  handleClick(e) {
    e.preventDefault();
    this.props.setLoadingAction();
    axios.get(baseDomain + 'api/class/' + this.props.courseID)
    .then((r) => {
      if(r.data.error) {
        console.log("there was an error loading the class ", r.data);
      } else {
        this.props.populateClassAction(r.data.response.classes);
        this.props.setNotLoadingAction();
        this.props.history.push('/dashboard/class/' + this.props.courseID);

      }
    }).catch((err) => console.log("there was an error: ", err))
  }

  render() {
    var isProfessor = (this.props.user.userType === "professor")
    return(
      <div className="dashboard-card hvr-grow-cards" onClick={(e) => this.handleClick(e)}>

        <div className="card-name">course</div>
        <div className="dashboard-course-title">
          {this.props.courseTitle}
        </div>
        <div className="dashboard-course-code">
          {this.props.courseCode}
        </div>
        <div className="dashboard-card-professor">
          {this.props.professorName}
        </div>
          {isProfessor
          ?
          <div className="dashboard-card-access-code">Sharable Code: {this.props.accessCode}</div>
          :null}

      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    isLoading: state.pageReducer.isLoading,
    user: state.userReducer.user
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
    populateClassAction: (classArray) => {
      dispatch(populateClass(classArray))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardCourseCard);

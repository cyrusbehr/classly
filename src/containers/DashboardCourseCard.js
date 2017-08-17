import React, {Component} from 'react'
import { connect } from 'react-redux';
import {loading, notLoading} from '../actions/Actions'
import axios from 'axios'
import {baseDomain} from '../constants/const'


class DashboardCourseCard extends Component {
  constructor(props){
    super(props)
  }

  handleClick(e) {
    e.preventDefault();
    this.props.setLoadingAction();
    axios.get(baseDomain + 'api/class/:' + this.props.classID)
    .then((r) => {
      if(r.data.error) {
        console.log("there was an error loading the class");
      } else {

        this.props.setNotLoadingAction();
      }
    }).catch((err) => console.log("there was an error: ", err))
  }

  render() {
    return(
      <div onClick={(e) => this.handleClick(e)} className="dashboard-card hvr-grow">
        <div className="dashboard-card-title">
          {this.props.courseTitle}
          <br/>
          {this.props.courseCode}
        </div>
        <br></br>
        <div className="dashboard-card-professor">
          {this.props.professorName}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    isLoading: state.pageReducer.isLoading,
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
)(DashboardCourseCard);

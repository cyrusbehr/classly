import React, { Component } from 'react';
import { connect } from 'react-redux';
import StudentTopicsContainer from './StudentTopicsContainer';
import StudentQuestionsContainer from './StudentQuestionsContainer';

class StudentMainViewContainer extends Component {
  constructor(props){
    super(props)
    if(this.props.userType === ""){
      this.props.history.push('/')
    }
  }

  render() {
    if(this.props.professorName){
      var proffArr = this.props.professorName.split(" ");
      var profname = proffArr[1] || proffArr[0];
    }

    return (
      <div className="body-parent">
        {
          this.props.userType
          ?
          <div className="body-container">
            <div className="questions-container-header">
              {/* <span>This is {this.props.userType} view</span> */}
              <span className="course">{this.props.className}</span>
              <span className="lecturer">Prof {profname}</span>
              <span className="date">1st Aug 2017</span>
            </div>
            <StudentTopicsContainer />
            <StudentQuestionsContainer />
          </div>
          :null
        }

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userType: state.userReducer.userType,
    professorName: state.classReducer.classState.professorName,
    userType: state.userReducer.userType,
    className: state.classReducer.classState.className,
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentMainViewContainer);

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
    return (
      <div className="body-container">
        {
          this.props.userType
          ?
          <div>
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

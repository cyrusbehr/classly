import React, {Component} from 'react';
import { connect } from 'react-redux';
import ProfessorTopicsContainer from './ProfessorTopicsContainer';
import ProfessorQuestionsContainer from './ProfessorQuestionsContainer';

export default class ProfessorMainViewContainer extends Component {
  constructor(props){
    super(props)
    if(this.props.userType === ""){
      this.props.history.push('/')
    }
  }

  render() {
    return(
      <div className="body-parent">
        <div className="body-container">
          <ProfessorTopicsContainer />
          <ProfessorQuestionsContainer />
        </div>
      </div>
    )
  }
};

const mapStateToProps = state => {
  return {
    userType: state.userReducer.userType,
  }
}

const mapDispatchToProps = dispatch => {
  return {
  };
}

connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfessorMainViewContainer);

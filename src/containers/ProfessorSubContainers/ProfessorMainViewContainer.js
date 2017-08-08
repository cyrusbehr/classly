import React, {Component} from 'react';
import { connect } from 'react-redux';
import ProfessorTopicsContainer from './ProfessorTopicsContainer';
import ProfessorQuestionsContainer from './ProfessorQuestionsContainer';

class ProfessorMainViewContainer extends Component {
  constructor(props){
    super(props)
    if(this.props.userType === ""){
      this.props.history.push('/')
    }
  }

  render() {
    console.log("the userTpye is: ", this.props);
    return(
      <div className="body-parent">
        {
          this.props.userType
          ?
          <div className="body-container">
            <ProfessorTopicsContainer />
            <ProfessorQuestionsContainer />
          </div>
          :null
        }

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfessorMainViewContainer);

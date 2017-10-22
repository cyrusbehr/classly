import React, {Component} from 'react';
import ProfessorSignupCard from '../../components/ProfessorSignupCard';
import {ProfessorSignupData} from '../../constants/const';
import { connect } from 'react-redux';


class ProfessorSignupContainer extends Component {
  render() {
    return(
      <div className="student-signup-cards-container">
        {this.props.isLoading
        ?
        <div className="loader">
          <svg className="circular" viewBox="25 25 50 50">
            <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
          </svg>
        </div>
      :
      <div className="middle-professor-cards-container">
        <div className="professor-signup-slogan-container">
          <div className="professor-signup-slogan">
        Welcome to Classly,<br></br><text className="professor-word">professor</text>! Let's help you get started!
      </div>
      </div>
        <ProfessorSignupCard
          URL={ProfessorSignupData.URL}
          title={ProfessorSignupData.title}
          redirectRoute={ProfessorSignupData.redirectRoute}
          {...this.props}
          />
      </div>
    }

    </div>
    )
  }
};

const mapStateToProps = state => {
  return{
    isLoading: state.pageReducer.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfessorSignupContainer);

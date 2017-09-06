import React, {Component} from 'react';
import StudentSignupCard from '../../components/StudentSignupCard'
import {StudentSignupData} from '../../constants/const'
import { connect } from 'react-redux';

class StudentSignupContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wrongAccessCode: true,
    }
  }

  updateWrongAccessCode(value){
    this.setState({wrongAccessCode: value})
  }

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
          <div className="middle-student-cards-container">
            <div className="student-signup-slogan-container">
              <div className="student-signup-slogan">
                Welcome to Classly,<br></br><text className="student-word">student</text>! Let's help you<br></br>get started!
              </div>
            </div>
            <StudentSignupCard
              wrongAccessCode={this.state.wrongAccessCode}
              updateWrongAccessCode={(value) => this.updateWrongAccessCode(value)}
              URL={StudentSignupData.URL}
              title={StudentSignupData.title}
              redirectRoute={StudentSignupData.redirectRoute}
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
)(StudentSignupContainer);

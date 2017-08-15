import React, {Component} from 'react';
import TASignupCard from '../../components/TASignupCard'
import {taSignupData} from '../../constants/const'
import { connect } from 'react-redux';


class TASignupContainer extends Component {
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
                Welcome to class.ly,<br></br><text className="student-word">TA</text>! Let's help you<br></br>get started!
              </div>
            </div>
            <TASignupCard
              URL={taSignupData.URL}
              title={taSignupData.title}
              redirectRoute={taSignupData.redirectRoute}
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
)(TASignupContainer);

import React, {Component} from 'react';
import StudentSignupCard from '../../components/StudentSignupCard'
import {StudentSignupData} from '../../constants/const'

export default class StudentSignupContainer extends Component {
  render() {
    return(
      <div>
        This is the StudentSignupContainer container
        <StudentSignupCard
          URL={StudentSignupData.URL}
          title={StudentSignupData.title}
          redirectRoute={StudentSignupData.redirectRoute}
          {...this.props}
        />
      </div>
    )
  }
};

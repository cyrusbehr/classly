import React, {Component} from 'react';
import ProfessorSignupCard from '../../components/ProfessorSignupCard';
import {ProfessorSignupData} from '../../constants/const';

export default class ProfessorSignupContainer extends Component {
  render() {
    return(
      <div>
        <h3>This is the ProfessorSignupContainer</h3>
        <ProfessorSignupCard
          URL={ProfessorSignupData.URL}
          title={ProfessorSignupData.title}
          redirectRoute={ProfessorSignupData.redirectRoute}
          {...this.props}
          />
      </div>
    )
  }
};

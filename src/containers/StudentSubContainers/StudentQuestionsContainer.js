import React, {Component} from 'react'
import StudentQuestion from '../../components/StudentQuestion'
import AddQuestion from '../../components/AddQuestion'

export default class StudentQuestionsContainer extends Component {

  render() {
    return(
      <div>
        This is the student Questions Container
        <AddQuestion />
        <StudentQuestion />
      </div>
    )
  }
}

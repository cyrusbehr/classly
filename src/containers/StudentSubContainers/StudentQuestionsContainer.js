import React, {Component} from 'react'
import StudentQuestion from '../../components/StudentQuestion'
import AddQuestion from '../../components/AddQuestion'

class StudentQuestionsContainer extends Component {

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

const mapStateToProps = state => {
  return{
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentQuestionsContainer);

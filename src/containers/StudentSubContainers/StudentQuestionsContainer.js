import React, {Component} from 'react'
import StudentQuestion from '../../components/StudentQuestion'
import AddQuestion from '../../components/AddQuestion'
import { connect } from 'react-redux';

class StudentQuestionsContainer extends Component {

  render() {
    return(
      <div>
        This is the student Questions Container
        <AddQuestion />
        <StudentQuestion
          //TODO: Pass in question ID and currentUpVotes as props
        />
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

import React, {Component} from 'react'
import { connect } from 'react-redux';

class StudentDashboardContainer extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return(
      <div>
        this is the ProfessorDashboardContainer
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
)(StudentDashboardContainer);

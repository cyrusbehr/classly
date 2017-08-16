import React, {Component} from 'react'
import { connect } from 'react-redux';
//import Card from './classroomCard'

class StudentDashboardContainer extends Component {
  constructor(props){
    super(props)
  }

  ComponentDidMount() {
    //return user data
  }

  render() {
    return(
      <div>
        <div>
        </div>
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

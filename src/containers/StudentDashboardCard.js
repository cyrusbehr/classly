import React, {Component} from 'react'
import { connect } from 'react-redux';

class StudentDashboardCard extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return(
      <div className="dashboard-card hvr-grow">
        <div className="dashboard-card-title">
          Asian Ancient Text from 1960 to 2000
        </div>
        <br></br>
        <div className="dashboard-card-professor">
          Professor
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
)(StudentDashboardCard);

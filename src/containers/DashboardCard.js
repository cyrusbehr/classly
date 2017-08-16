import React, {Component} from 'react'
import { connect } from 'react-redux';

class DashboardCard extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return(
      <div className="dashboard-card hvr-grow">
        <div className="dashboard-card-title">
          {this.props.courseTitle}
          <br/>
          {this.props.courseCode}
        </div>
        <br></br>
        <div className="dashboard-card-professor">
          {this.props.professorName}
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
)(DashboardCard);

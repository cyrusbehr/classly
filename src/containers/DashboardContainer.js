import React, {Component} from 'react';
import { connect } from 'react-redux';
import DashboardBodyContainer from './DashboardBodyContainer';

class DashboardContainer extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return(
      <div className="dashboard">
        <div className="dashboard-header">
          <span>Class.ly</span>
          <span>This is DashboardContainer</span>
          <span>UserType: {this.props.userType}</span>
          <div>
            <span>Icon</span>
            <span>  Icon</span>
          </div>
        </div>
        <DashboardBodyContainer/>
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
)(DashboardContainer);

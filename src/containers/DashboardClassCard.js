import React, {Component} from 'react'
import { connect } from 'react-redux';
import {loading, notLoading} from '../actions/Actions'
import axios from 'axios'
import {baseDomain} from '../constants/const'


class DashboardClassCard extends Component {
  constructor(props){
    super(props)
  }

  handleClick(e) {
    e.preventDefault();

  }

  render() {
    return(
      <div onClick={(e) => this.handleClick(e)} className="dashboard-card hvr-grow">
        <div className="dashboard-card-title">
          {this.props.className}
          <br/>
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
    isLoading: state.pageReducer.isLoading,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setLoadingAction: () => {
      dispatch(loading())
    },
    setNotLoadingAction: () => {
      dispatch(notLoading())
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardClassCard);

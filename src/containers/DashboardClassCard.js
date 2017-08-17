import React, {Component} from 'react'
import { connect } from 'react-redux';
import {loading, notLoading, addClass} from '../actions/Actions'
import axios from 'axios'
import {baseDomain} from '../constants/const'


class DashboardClassCard extends Component {
  constructor(props){
    super(props)
  }

  handleClick(e) {
    this.props.setLoadingAction()
    e.preventDefault();
    this.props.socket.emit('join', this.props.classID);
    axios.get(baseDomain + 'api/getclass/' + this.state.classID)
    .then((r) => {
      if(r.data.error) => {
        this.props.setNotLoadingAction()
        console.log("there was an error : ", r.data.error);
      } else {
          this.props.addClassAction(classObj)
          this.props.setNotLoadingAction()
          this.props.history.push('/' + this.props.user.userType + '/main');
      }
    })

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
    socket: state.socketReducer.socket,
    user: state.userReducer.user
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
    addClassAction: (newClass) => {
      dispatch(addClass(newClass))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardClassCard);

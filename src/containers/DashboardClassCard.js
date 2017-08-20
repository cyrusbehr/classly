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

    axios.get(baseDomain + 'api/getclass/' + this.props.classID)
    .then((r) => {
      console.log("this is the returned class : ", r.data.response);
      if(r.data.error) {
        this.props.setNotLoadingAction()
      } else {
          this.props.addClassAction(r.data.response)
          this.props.setNotLoadingAction()
          this.props.history.push('/' + this.props.user.userType + '/main');
      }
    })

  }

  render() {
    return(
      <div onClick={(e) => this.handleClick(e)} className="dashboard-class-card hvr-grow-cards">
        <div className="card-name">class</div>
        <div className="dashboard-class-name">
          {this.props.className}
        </div>
        <div className="dashboard-class-date">
          8/17/2017
        </div>
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

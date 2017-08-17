import React, {Component} from 'react';
import { connect } from 'react-redux';
import {loading, notLoading, populateCourse} from '../actions/Actions'
import DashboardClassCard from './DashboardClassCard';
import axios from 'axios'
import {baseDomain} from '../constants/const'
import {addCourse, addClassToArray} from '../actions/Actions';
import Modal from 'react-modal';

class DashboardClassContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      showCreateClassModal: false,
      classTitle: "",
    }
  }

  onCardClick() {
    //get classes
    //Re render dashboard with classes inside the Course
  }

  onCreateClassClick(){
    //open class modal
    this.setState({showCreateClassModal: true})
    //information is filloud out and saved in this.state
  }

  onClassTitleChange(e){
    this.setState({classTitle: e.target.value});
  }

  onSubmitClassModal(e){
    console.log("Entering onSubmitClassModal");
    e.preventDefault();

    axios.post(baseDomain + 'api/create/class', {
      classTitle: this.state.classTitle,
      courseReference: this.props.match.params.coursereference, //TODO: Make sure this gets passed in to props
    })
    .then((r) => {
      this.setState({classTitle: ""});
      if(r.data.error) {
        this.props.setNotLoadingAction();
        console.log("Error encountered while creating new class: ", r.data);
      } else {
        this.props.setNotLoadingAction();
        //dispatch action to reducer to add coures to course reduver
        console.log("adding Class to array reducer");
        this.props.addClassToArrayAction(r.data.response);
      }
    })
    .catch((err) => {
      console.log("there was an error with the request : ", err);
    });
    //close modal
    this.setState({showCreateClassModal: false});
  }

  onCloseClassModal(){
    this.setState({showCreateClassModal: false});
  }

  render() {
    var isProfessor = (this.props.user.userType === "professor");
    console.log("the classes are: ", this.props);
    return(
      <div className="dashboard">
        <div className="dashboard-header">
          <text className="dashboard-header-name">Class.ly</text>
          <div className="dashboard-navbar">
            <text className="dashboard-profile">Profile</text>
            <text className="dashboard-logout">Log out</text>
          </div>
        </div>
        {this.props.isLoading
          ?
          <div className="loader-dashboard">
            <svg className="circular-dashboard" viewBox="25 25 50 50">
              <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
            </svg>
          </div>
          :
          <div>
          <div className="dashboardBody-container">
            <div className="dashboardBody-container-header-container">
              <div className="dashboardBody-container-header-class">
                <text className="dashboardBody-container-dashboard-name">Dashboard</text>
                <div className="dashboardBody-container-buttons">
                  {isProfessor
                    ?
                    <button className="dashboardBody-button hvr-fade"
                      onClick={() => this.onCreateClassClick()}
                      >Create a class</button>
                  :null
                }
                </div>
              </div>
            </div>
            <div className="dashboardBody-container-card-body-container">
              <div className="dashboardBody-container-card-body">
                {this.props.classes.map((thisClass) => {
                  return (
                    <DashboardClassCard
                      key={thisClass._id}
                      professorName={thisClass.professorName}
                      className={thisClass.className}
                      courseReference={thisClass.courseReference}
                      classID={thisClass._id}
                      {...this.props}
                    />
                  )
                })}
              </div>
            </div>
          </div>
          <Modal
          isOpen={this.state.showCreateClassModal}
          contentLabel="Create a Course"
          >
            <h2>Fill out the following information to create a new Class!!!!</h2>
            <form>
              <input
                type="text"
                value={this.state.classTitle}
                placeholder="Class Title"
                onChange={(e) => this.onClassTitleChange(e)}
              />
              <button className="dashboardBody-button"
                onClick={(e) => this.onSubmitClassModal(e)}
                >Create class!</button>
              <button
                onClick={() => this.onCloseClassModal()}
                >Close</button>
            </form>
          </Modal>
        </div>
        }
    </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    user: state.userReducer,
    isLoading: state.pageReducer.isLoading,
    classes: state.classArrayReducer,
    isLoading: state.pageReducer.isLoading,
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
    addClassToArrayAction: (classObj) => {
      dispatch(addClassToArray(classObj))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardClassContainer);

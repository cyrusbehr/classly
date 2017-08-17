import React, {Component} from 'react';
import { connect } from 'react-redux';
import {loading, notLoading, populateCourse} from '../actions/Actions'
import DashboardCourseCard from './DashboardCourseCard';
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

//   componentDidMount() {
//     this.props.setLoadingAction();
//     axios.get(baseDomain + 'api/dashboard')
//     .then((r) => {
//       if(r.data.error) {
//         console.log("there was an error loading the dashboard : ", r.data.error);
//       } else {
//         this.props.populateCourseAction(data.response);
//         this.props.setNotLoadingAction();
//       }
//     })
//     .catch((err) => console.log("there was an error: ", err))
// }

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
    // console.log("courseReference from url", this.props.match);
    //axios post request to backend with that object
    //use baseDomain in axios request and import it from the constants file
    //on the .then of this action dispatch action to the reducer
    //to add the course to the course reducer. need to write this action. courses is an array in reducer
    //immutable --> splice array to make deep copy then resave
    axios.post(baseDomain + 'api/create/class', {
      classTitle: this.state.classTitle,
      courseReference: this.props.match.params.coursereference, //TODO: Make sure this gets passed in to props
    })
    .then((r) => {
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
    var isProfessor = (this.props.userType === "Professor");

    return(
      <div className="dashboard">
        <div className="dashboard-header">
          <span>Class.ly</span>
          <span>This is Dashboard CLASS Container</span>
          <span>UserType: {this.props.userType}</span>
          <div>
            <span>Icon</span>
            <span>  Icon</span>
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
            <div className="dashboardBody-container-header">
              <h1>Class Dashboard</h1>
              <button className="dashboardBody-button"
                onClick={() => this.onCreateClassClick()}
                >Create a class</button>
            </div>
            <div className="dashboardBody-container-body">
              {this.props.courses.map((course) => {
                return (
                  <DashboardCourseCard
                    professorName={course.professorName}
                    courseTitle={course.courseTitle}
                    courseCode={course.courseCode}
                    classID={course._id}
                  />
                )
              })}
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
    courses: state.courseReducer,
    isLoading: state.pageReducer.isLoading
    //pass in courseId
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import StudentTopicsContainer from './StudentTopicsContainer';
import StudentQuestionsContainer from './StudentQuestionsContainer';
import {close} from '../../actions/Actions';
import ReactModal from 'react-modal';
import axios from 'axios'
import {baseDomain} from '../../constants/const'



class StudentMainViewContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      hasLoaded: false
    }
  }

  componentDidMount() {
    var self = this;
    axios.get(baseDomain + 'checkLogin')
    .then((r) => {
      if(r.data.loggedIn) {
        if(!this.props.user.userType){
          self.props.history.push('/dashboard')
        }
      } else {
        self.props.history.push('/')
      }
    })
    axios.get(baseDomain + 'showModal')
    .then((r) => {
      if(r.data.isModal) {
        this.props.close();
        this.setState({hasLoaded: true});
      } else {
        this.setState({hasLoaded: true});
      }
    })
  }

  render() {
    if(this.props.professorName){
      var proffArr = this.props.professorName.split(" ");
      var profname = proffArr[1] || proffArr[0];
    }

    return (
      <div className="body-parent">
        {this.state.hasLoaded
        ?
        <div className="body-container">
          <div>
            <ReactModal
              isOpen={this.props.showModal}
              contentLabel="Minimal Modal Example"
              onRequestClose={() => this.props.close()}
              className="guide-modal"
              overlayClassName="guide-modal-overlay"
              >
                Welcome to the live lecture room, Student.
                On the right hand side, you will find a list of all the questions aksed by the Students and TAs.
                Each question will display the number of votes it has recieved, with the most upvoted questions being shown at the top.
                To upvote a question, simply click on the up icon the the right of the question.
                Once your question is answered, click on the checkmark to resolve the question.
                 Comments can be added directly to the questions by clicking the comment icon.

                 On the left hand side, you will find a list of all the topics used to tag similar questions.
                 These topics can be used to to sort the questions, and the toggle button uptop is used to display
                 resolved question.

                 When asking a quesiton, you identity will remain anonymous to other peers, but visible to the Professor and TAs.

                 To show this message again, click the question icon at the bottom right.
                 <button className="dashboardBody-close-button hvr-grow"
                   onClick={() => this.props.close()}
                   >Dismiss</button>
              </ReactModal>
            </div>
          <StudentTopicsContainer />
          <StudentQuestionsContainer />
        </div>
      :null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userType: state.userReducer.userType,
    professorName: state.classReducer.professorName,
    userType: state.userReducer.userType,
    className: state.classReducer.className,
    showModal: state.modalReducer,
    user: state.userReducer.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    close: () => {
      dispatch(close())
  },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentMainViewContainer);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import StudentTopicsContainer from './StudentTopicsContainer';
import StudentQuestionsContainer from './StudentQuestionsContainer';
import {close} from '../../actions/Actions';
import ReactModal from 'react-modal';

class StudentMainViewContainer extends Component {
  constructor(props){
    super(props)
    if(this.props.userType === ""){
      this.props.history.push('/')
    }
  }

  render() {
    if(this.props.professorName){
      var proffArr = this.props.professorName.split(" ");
      var profname = proffArr[1] || proffArr[0];
    }

    return (
      <div className="body-parent">
          <div className="body-container">
            <div>
              <ReactModal
                isOpen={this.props.showModal}
                contentLabel="Minimal Modal Example"
                onRequestClose={() => this.props.close()}
                className="guide-modal"
                overlayClassName="guide-modal-overlay"
                >
                <button onClick={() => this.props.close()}>Close Modal</button>
                </ReactModal>
              </div>
            <StudentTopicsContainer />
            <StudentQuestionsContainer />
          </div>
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

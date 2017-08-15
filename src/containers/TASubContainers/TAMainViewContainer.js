import React, { Component } from 'react';
import { connect } from 'react-redux';
import TATopicsContainer from './TATopicsContainer';
import TAQuestionsContainer from './TAQuestionsContainer';
import {close} from '../../actions/Actions';
import ReactModal from 'react-modal';

class TAMainViewContainer extends Component {
  constructor(props){
    super(props)
    if(this.props.userType === ""){
      this.props.history.push('/')
    }
  }

  render() {
    return (
      <div className="body-parent">
        {
          this.props.userType
          ?
          <div  className="body-container">
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
            <TATopicsContainer />
            <TAQuestionsContainer />
          </div>
          :null
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userType: state.userReducer.userType,
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
)(TAMainViewContainer);

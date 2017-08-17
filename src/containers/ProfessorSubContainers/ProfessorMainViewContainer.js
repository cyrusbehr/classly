import React, {Component} from 'react';
import { connect } from 'react-redux';
import ProfessorTopicsContainer from './ProfessorTopicsContainer';
import ProfessorQuestionsContainer from './ProfessorQuestionsContainer';
import {close} from '../../actions/Actions';
import ReactModal from 'react-modal';
import axios from 'axios'
import {baseDomain} from '../../constants/const'

class ProfessorMainViewContainer extends Component {
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
      console.log("the response in the container is : ", r.data);
      if(r.data.loggedIn) {
        if(!this.props.user.userType){
          self.props.history.push('/dashboard')
        }
        this.setState({hasLoaded: true});
      } else {
        self.props.history.push('/')
      }
    })
  }

  render() {
    console.log("the userTpye is: ", this.props);
    return(
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
                <button onClick={() => this.props.close()}>Close Modal</button>
                </ReactModal>
              </div>
            <ProfessorTopicsContainer />
            <ProfessorQuestionsContainer />
          </div>
          :null}
      </div>
    )
  }
};

const mapStateToProps = state => {
  return {
    userType: state.userReducer.userType,
    showModal: state.modalReducer,
    user: state.userReducer.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    close: () => {
      dispatch(close())
  },
}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfessorMainViewContainer);

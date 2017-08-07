import React, { Component } from 'react';
import { connect } from 'react-redux';
import TATopicsContainer from './TATopicsContainer';
import TAQuestionsContainer from './TAQuestionsContainer';

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
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TAMainViewContainer);

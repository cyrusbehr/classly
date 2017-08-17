import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class AboutUs extends Component {
  constructor(props) {
    super(props)
  }

  redirect() {
    this.props.history.push(this.props.redirectRoute);
  }

  render() {
    return(
      <div className>
        <h1>About Us</h1>
        <h3>The Problem</h3>
        <p>Large college lectures are not conducive to an interactive educational experience.</p>
        <ul>
          <li>Offer little opportunity for discussion</li>
          <li>Move at pace dictated by professor, who is unable to diagnose and address students weak points in real time</li>
        </ul>
        <h3>The Team!!</h3>
        <img src={require('../assets/RyanClyde.png')}/>
        <h3>Our Mission</h3>
        <p>Apply what we learned at Horizons to facilitate learning by improving live-lecture communication between Professors, TA’s, and Students</p>
        <h3></h3>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AboutUs);

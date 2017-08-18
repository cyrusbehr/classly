import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class AboutUs extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
  }

  redirect() {
    this.props.history.push(this.props.redirectRoute);
  }

  render() {
    return(
      <div className="about-page">
        <h1>About Us</h1>
        <h3>The Problem</h3>
        <p>Large college lectures are not conducive to an interactive educational experience.</p>
        <ul>
          <li>Offer little opportunity for discussion</li>
          <li>Move at pace dictated by professor, who is unable to diagnose and address students weak points in real time</li>
        </ul>
        <h3>The Team</h3>
        <div>
          <img className="headshot" src={'http://res.cloudinary.com/dvtvyyivk/image/upload/v1503015374/Screen_Shot_2017-08-17_at_5.15.11_PM_df1ajy.png'}/>
        </div>
        <div>
          <img className="headshot" src={'http://res.cloudinary.com/dvtvyyivk/image/upload/v1503015374/Screen_Shot_2017-08-17_at_5.15.18_PM_txqnwz.png'}/>
        </div>
        <div>
          <img className="headshot" src={('http://res.cloudinary.com/dvtvyyivk/image/upload/v1503015374/Screen_Shot_2017-08-17_at_5.15.26_PM_z67kak.png')}/>
        </div>
        <div>
          <img className="headshot" src={'http://res.cloudinary.com/dvtvyyivk/image/upload/v1503015374/Screen_Shot_2017-08-17_at_5.15.39_PM_esowxe.png'}/>
        </div>
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

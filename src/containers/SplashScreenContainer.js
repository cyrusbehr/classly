import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loading, notLoading} from "../actions/Actions"



class SplashScreenContainer extends Component {
  constructor(props){
    super(props)
  }

  //here we can put our handleclick functions and so on...

  render() {
    return(
      <div>
        <div className="splash-header">
          <text className="splash-header-name">Classly</text>
          <div className="dashboard-navbar">
            <span className="navbar-signup">Sign Up</span>
            <span className="navbar-login">Login</span>
          </div>
        </div>
        <div className="spashCont">
          <div className="splashImageContainer">
            <div className="splashText">
              <div className="splashText-title">Classly </div>
              <div className="splashText-main">
                A live Q&A and discussion forum for the future classroom
              </div>
              <img className="customImage demoImagehidden" src={"https://res.cloudinary.com/dxih0rp6w/image/upload/v1508040858/Macbook-PNG-Picture_sueqhy.png"}></img>
              <div className="splashText-sub">
                Beta testing in progress now!
                <br/>
                Sign up for your class right now.
              </div>
              <div className="navbar-signup-2">Sign Up</div>
            </div>
            <span className="splashImage">
              <img className="customImage demoImage" src={"https://res.cloudinary.com/dxih0rp6w/image/upload/v1508040858/Macbook-PNG-Picture_sueqhy.png"}></img>
            </span>
          </div>
        </div>
        <div className="splash-page2-container">
          <div className="splash-page2-container-green-filter">
            <div className="splash-page2-header">
              In a large classroom setting, it is difficult to ask
              questions, and asking questions is the main form of
              communication between the teacher and students.
            </div>
            <div className="splash-page2-subheader">
              How do we solve these problems?
            </div>
            <div className="row">
              <div className="row1col1"></div>
              <div className="row1col2">
                <img className="customImage splash-page2-img1" src={"https://res.cloudinary.com/dxih0rp6w/image/upload/v1508121468/noun_977868_cc_s1nuxi.png"}></img>
              </div>
              <div className="row1col3">Anonymity for<br/>students to ask<br/>questions</div>
              <div className="row1col4">
                <img className="customImage splash-page2-img2" src={"https://res.cloudinary.com/dxih0rp6w/image/upload/v1508121603/noun_961730_cc_asc63b.png"}></img>
              </div>
              <div className="row1col5">Students and<br/>TAs can answer<br/>question</div>
              <div className="row1col6"></div>
            </div>
            <div className="row">
              <div className="row1col1"></div>
              <div className="row1col2">
                <img className="customImage splash-page2-img1" src={"https://res.cloudinary.com/dxih0rp6w/image/upload/v1508166186/noun_1206100_cc_pgrstp.png"}></img>
              </div>
              <div className="row1col3">An in-classroom<br/>learning managment<br/>system</div>
              <div className="row1col4">
                <img className="customImage splash-page2-img2" src={"https://res.cloudinary.com/dxih0rp6w/image/upload/v1508166155/noun_1079413_cc_copy_bzbpau.png"}></img>
              </div>
              <div className="row1col5">Realtime<br/>feedback for<br/>the students</div>
              <div className="row1col6"></div>
            </div>
            <div className="mobile_size">
              <div className="outer">
                <div className="row_inner1">
                  <img className="customImage splash-page2-img1" src={"https://res.cloudinary.com/dxih0rp6w/image/upload/v1508121468/noun_977868_cc_s1nuxi.png"}></img>
                </div>
                <div className="row_inner2">Anonymity for<br/>students to ask<br/>questions</div>
              </div>
              <div className="outer">
                <div className="row_inner1">
                  <img className="customImage splash-page2-img2" src={"https://res.cloudinary.com/dxih0rp6w/image/upload/v1508121603/noun_961730_cc_asc63b.png"}></img>
                </div>
                <div className="row_inner2">Students and<br/>TAs can answer<br/>question</div>
              </div>
              <div className="outer">
                <div className="row_inner1">
                  <img className="customImage splash-page2-img1" src={"https://res.cloudinary.com/dxih0rp6w/image/upload/v1508166186/noun_1206100_cc_pgrstp.png"}></img>
                </div>
                <div className="row_inner2">An in-classroom<br/>learning managment<br/>system</div>
              </div>
              <div className="outer">
                <div className="row_inner1">
                  <img className="customImage splash-page2-img2" src={"https://res.cloudinary.com/dxih0rp6w/image/upload/v1508166155/noun_1079413_cc_copy_bzbpau.png"}></img>
                </div>
                <div className="row_inner2">Realtime<br/>feedback for<br/>the students</div>
              </div>
            </div>
          </div>
        </div>
      <div className="splash-page3-container">
      <div className="splash-page3-main-pic-container">
        <img className="customImage splash-page3-main-pic" src={"https://res.cloudinary.com/dxih0rp6w/image/upload/v1508185590/noun_898450_cc_a5ppwx.png"}></img>
      </div>
      <div className="text page3-header">
        Additional Features
      </div>
      <div className="text page3-subHeader">
        We also offer other features which help the professor manage the classroom
      </div>
      <div className="row">
        <div className="row1col1"></div>
        <div className="row1col2">
          <img className="customImage splash-page2-img1 pad1" src={"https://res.cloudinary.com/dxih0rp6w/image/upload/v1508215970/noun_798715_cc_jqlfoy.png"}></img>
        </div>
        <div className="r1c3">Clicker<br/>functionality<br/>that doesn't<br/>cost money</div>
        <div className="row1col4">
          <img className="customImage splash-page2-img2 pad2" src={"https://res.cloudinary.com/dxih0rp6w/image/upload/v1508215949/noun_966235_cc_feqzd0.png"}></img>
        </div>
        <div className="r1c5">Attendance<br/>has never<br/>been easier<br/>with Classly</div>
        <div className="row1col6"></div>
      </div>
      <div className="mobile_size">
        <div className="outer">
          <div className="row_inner1">
            <img className="customImage splash-page2-img1 pad1" src={"https://res.cloudinary.com/dxih0rp6w/image/upload/v1508215970/noun_798715_cc_jqlfoy.png"}></img>
          </div>
          <div className="row_inner2">Clicker<br/>functionality<br/>that doesn't<br/>cost money</div>
        </div>
        <div className="outer">
          <div className="row_inner1">
            <img className="customImage splash-page2-img2 pad2" src={"https://res.cloudinary.com/dxih0rp6w/image/upload/v1508215949/noun_966235_cc_feqzd0.png"}></img>
          </div>
          <div className="row_inner2">Attendance<br/>has never<br/>been easier<br/>with Classly</div>
        </div>
      </div>
      </div>
      <div className="splash-screen4">
        <div className="screen4-title text">Meet the Team
        </div>
        <div className="outer">
          <div className="row_inner1">
            <img className="customImage splash-page2-img1" src={"https://res.cloudinary.com/dxih0rp6w/image/upload/v1508215970/noun_798715_cc_jqlfoy.png"}></img>
          </div>
          <div className="text member-name">
            Cyrus Behroozi
            <div className="member-profession text">
              Mechatronics Engineering
            </div>
            <div className="member-school text">
              University of British Columbia
            </div>
          </div>
        </div>
        <div className="outer">
          <div className="row_inner1">
            <img className="customImage splash-page2-img1" src={"https://res.cloudinary.com/dxih0rp6w/image/upload/v1508215970/noun_798715_cc_jqlfoy.png"}></img>
          </div>
          <div className="text member-name">
            Ryan Clyde
            <div className="member-profession text">
              Finance and Statistics
            </div>
            <div className="member-school text">
              Wharton School of Buisness<br/>
              University of Pennsylvannia
            </div>
          </div>
        </div>
        <div className="outer">
          <div className="row_inner1">
            <img className="customImage splash-page2-img1" src={"https://res.cloudinary.com/dxih0rp6w/image/upload/v1508215970/noun_798715_cc_jqlfoy.png"}></img>
          </div>
          <div className="text member-name">
            Donovan So
            <div className="member-profession text">
              Computer Engineering
            </div>
            <div className="member-school text">
              Hong Kong University of<br/>Science and Technology
            </div>
          </div>
        </div>
        <div className="outer">
          <div className="row_inner1">
            <img className="customImage splash-page2-img1" src={"https://res.cloudinary.com/dxih0rp6w/image/upload/v1508215970/noun_798715_cc_jqlfoy.png"}></img>
          </div>
          <div className="text member-name">
            Spike Lu
            <div className="member-profession text">
              Physics
            </div>
            <div className="member-school text">
              Emory University
            </div>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{

  }
}

const mapDispatchToProps = dispatch => {
  return{

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SplashScreenContainer);

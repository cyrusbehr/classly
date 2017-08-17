import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import {colorArray} from '../constants/const';
import {randomColor} from '../constants/algorithmicos';
import {setUser, loading, notLoading} from '../actions/Actions'
import $ from 'jquery'
import {baseDomain} from '../constants/const'
import axios from 'axios'


class ProfessorSignupCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      nameEmpty: true,
      lectureEmpty: true
    }
    if(this.props.userType === ""){
      this.props.history.push('/')
    }
  }

  componentDidMount() {
    let self = this;
    $("input").on('keyup', function (e) {
      if (e.keyCode == 13) {
        self.onSubmit(e)
      }
    });

    // this.props.socket.on('classCreated', newClass => {
    //   // this.props.socket.emit('')
    //   // var thisColor = randomColor(colorArray);
    //   // var thisColor2 = randomColor(colorArray);
    //
    //   this.props.addClassAction(newClass);
    //   this.props.setUsernameAction(this.state.name);
    //   //TODO: Create a resolvedQuestions topic when a new class is created
    //
    //   // const newTopic2 = {
    //   //   text: "All",
    //   //   votes: 0,
    //   //   timestamp: Date.now(),
    //   //   referenceClass: newClass._id,
    //   //   username: this.props.username,
    //   //   color: thisColor2,
    //   // }
    //   // this.props.socket.emit('generateTopic', newTopic2);
    //
    //   // const newTopic = {
    //   //   text: "ResolvedQuestions",
    //   //   votes: 0,
    //   //   timestamp: Date.now(),
    //   //   referenceClass: newClass._id,
    //   //   username: this.props.username,
    //   //   isDefault: true,
    //   //   color: thisColor,
    //   // }
    //   // this.props.socket.emit('generateTopic', newTopic);
    //   this.redirect();
    // });
  }

  redirect() {
    this.props.history.push('/dashboard');
  }

  handleEmailChange(event, stateProp) {
    this.setState({email: event.target.value});
    // this.setState({nameEmpty: true});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value})
    // this.setState({codeEmpty: true});
    // this.props.updateWrongAccessCode(true);
  }

  onSubmit(e) {
    e.preventDefault();
    // if(this.state.name.trim() === ''){
    //   this.setState({nameEmpty: false});
    // }
    //
    // if(this.state.title.trim() === ''){
    //   this.setState({lectureEmpty: false});
    // }
    //
    // if(this.state.name.trim() !== '' && this.state.title.trim() !== '') {
    //   this.props.socket.emit('createClass', this.state);
    //   this.props.setLoadingAction();
    // }
    axios.post(baseDomain + 'login', {
      email: this.state.email,
      password: this.state.password,
      userType: 'professor'
    })
    .then((r) => {
      if(r.data.error) {
        this.props.setNotLoadingAction();
        // TODO: handle the errors here and give feedback to the user
      }else {
        this.props.setUserAction(r.data.response);
        this.props.setNotLoadingAction();
        this.redirect();
      }
    })
    .catch((err) => {
      console.log("there was an error with the request : ", err);
    })
  }

  register(e) {
    e.preventDefault();
    this.props.history.push('/professor/register')
  }

  render() {
    return(
      <div className="professor-signup-card">
            <form>
              <label>
                <input
                  type="text"
                  value={this.state.email}
                  placeholder="Email"
                  className={this.state.nameEmpty ? "professor-signup-firstname-input" : "professor-signup-empty-firstname-input"}
                  onChange={(event) => this.handleEmailChange(event)}
                />
                {this.state.nameEmpty ?
                  <div>
                  </div> :
                  <div className="empty-name-alert">
                    Email can't be empty!
                  </div>}
              </label>
              <br></br>
              <label>
                <input
                  type="password"
                   value={this.state.password}
                   placeholder="Password"
                   className={this.state.nameEmpty ? "professor-signup-lecture-input" : "professor-signup-empty-firstname-input"}
                   onChange={(event) => this.handlePasswordChange(event)}
                />
                {this.state.lectureEmpty ?
                  <div>
                  </div> :
                  <div className="empty-lecture-alert">
                    Lecture title can't be empty!
                  </div>}
              </label>
              <br></br>
              {/* <input type="submit"
                value="Create Class"
                onClick={(e) => this.onSubmit(e)}/> */}
                <button
                  type="button"
                  onClick={(e) => this.onSubmit(e)}
                  className="student-signup-submit hvr-grow"
                >Create Class</button>
                <button
                  type="button"
                  onClick={(e) => this.register(e)}
                  className="student-signup-register hvr-grow"
                  >Register</button>
            </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    socket: state.socketReducer.socket,
    userType: state.userReducer.userType,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUserAction: (user) => {
      dispatch(setUser(user))
    },
    setLoadingAction: () => {
      dispatch(loading())
    },
    setNotLoadingAction: () => {
      dispatch(notLoading())
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(ProfessorSignupCard);

import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import {colorArray} from '../constants/const';
import {randomColor} from '../constants/algorithmicos';
import {setUser, loading, notLoading} from '../actions/Actions'
import $ from 'jquery'
import {baseDomain} from '../constants/const'
import axios from 'axios'
import {TextField} from 'material-ui';


class ProfessorSignupCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      nameEmpty: true,
      lectureEmpty: true,
      emailFieldErrorText: "",
      passwordFieldErrorText: ""
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

    if(this.state.email.trim() === ''){
      // this.setState({nameEmpty: false});
      this.setState({
        emailFieldErrorText: "Email cannot be empty"
      })
    }

    if(this.state.password.trim() === ''){
      // this.setState({codeEmpty: false});
      this.setState({
        passwordFieldErrorText: "Password cannot be empty"
      })
    }

    if(this.state.password.trim() === '' || this.state.email.trim() === ''){
      return;
    } else {
      // this.props.setLoadingAction() //note: commented out the loading cuz rerendering the form is messing with the display of error messages
      // this.props.socket.emit('join', this.state.password);
      axios.post(baseDomain + 'login', {
        email: this.state.email,
        password: this.state.password,
        userType: 'professor'
      })
      .then((r) => {
        if(r.data.error) {
          // this.props.setNotLoadingAction();
          this.setState({
            emailFieldErrorText: r.data.error,
            passwordFieldErrorText: r.data.error
          })
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
  }

  register(e) {
    e.preventDefault();
    this.props.history.push('/professor/register')
  }

  render() {
    return (
      <div className="student-signup-card">
        <TextField
          errorText={this.state.emailFieldErrorText}
          hintText="Email"
          hintStyle={{'color':'#555555'}}
          underlineFocusStyle={{borderColor:'#00C993'}}
          inputStyle={{'color':'white'}}
          value={this.state.email}
          onChange={(event) => this.handleEmailChange(event)}
        />

        <TextField
          errorText={this.state.passwordFieldErrorText}
          hintText="Password"
          hintStyle={{'color':'#555555'}}
          underlineFocusStyle={{borderColor:'#00C993'}}
          inputStyle={{'color':'white'}}
          value={this.state.password}
          onChange={(event) => this.handlePasswordChange(event)}
        />
        <button
          type="button"
          onClick={(e) => this.onSubmit(e)}
          className="student-signup-submit hvr-grow"
          >Login</button>
        <button
          type="button"
          onClick={(e) => this.register(e)}
          className="student-signup-register hvr-grow"
          >Register</button>
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

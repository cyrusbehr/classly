import React, {Component} from 'react'
import _ from 'underscore'
import { connect } from 'react-redux';
import {setUser, loading, notLoading} from '../actions/Actions'
import $ from 'jquery'
import axios from 'axios'
import {baseDomain} from '../constants/const'
import {TextField} from 'material-ui';

class StudentRegisterCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      passwordRepeat: "",
      firstnameErrorMessage: "",
      lastnameErrorMessage: "",
      emailErrorMessage: "",
      passwordErrorMessage: "",
      passwordRepeatErrorMessage: "",
      wrongAccessCode: true,
      nameEmpty: true,
      codeEmpty: true,
    }
  }

  componentDidMount() {
    let self = this;
    $("input").on('keyup', function (e) {
      if (e.keyCode == 13) {
        self.handleRegister(e)
      }
    });
  }

  redirect() {
    this.props.history.push('/dashboard');
  }


  handleFirstNameChange(event, stateProp) {
    this.setState({firstname: event.target.value});
    this.setState({nameEmpty: true});
  }

  handleLastNameChange(e) {
    this.setState({lastname: e.target.value});
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handlePasswordRepeatChange(e) {
    this.setState({passwordRepeat: e.target.value});
  }

  handleRegister(e) {
    e.preventDefault();
    // TODO: Do some propper validation here to make sure fields are not empty
    //or just use a form that has built in validation from codepen

      // this.props.setLoadingAction() //note: commented out the loading cuz rerendering the form is messing with the display of error messages
      axios.post(baseDomain + 'register', {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        password: this.state.password,
        passwordRepeat: this.state.passwordRepeat,
        userType: "student"
      })
      .then((r) => {
        console.log('r.data.error', r.data.error);
        if(r.data.error) {
          // this.props.setNotLoadingAction();
          // TODO: alert the user that there was an error, and do the corresponding action
          r.data.error.forEach((err) => {
            switch(err.param){
              case 'firstname':
                this.setState({
                  firstnameErrorMessage: err.msg
                })
                break;
              case 'lastname':
                this.setState({
                  lastnameErrorMessage: err.msg
                })
                break;
              case 'email':
                this.setState({
                  emailErrorMessage: err.msg
                })
                break;
              case 'password':
                this.setState({
                  passwordErrorMessage: err.msg
                })
                break;
              case 'passwordRepeat':
                this.setState({
                  passwordRepeatErrorMessage: err.msg
                })
                break;
            }
          })
          console.log("there was an error registering: ", r.data);
          console.log("r.data.error", r.data.error);
        }else{
          this.props.setUserAction(r.data.response);
          this.props.setNotLoadingAction();
          this.redirect();
        }
      })
      .catch((err) => {
        console.log("there was an error with the request : ", err);
      })
    // }
  }

  handleback(e) {
    e.preventDefault();
    this.props.history.push('/student/signup')
  }

  render() {
    return (
      <div className="student-signup-card">
        <TextField
          errorText={this.state.firstnameErrorMessage}
          hintText="Firstname"
          hintStyle={{'color':'#555555'}}
          underlineFocusStyle={{borderColor:'#00C993'}}
          inputStyle={{'color':'white'}}
          value={this.state.firstname}
          onChange={(event) => this.handleFirstNameChange(event)}
        />
        <TextField
          errorText={this.state.lastnameErrorMessage}
          hintText="Lastname"
          hintStyle={{'color':'#555555'}}
          underlineFocusStyle={{borderColor:'#00C993'}}
          inputStyle={{'color':'white'}}
          value={this.state.lastname}
          onChange={(event) => this.handleLastNameChange(event)}
        />
          <TextField
            errorText={this.state.emailErrorMessage}
            hintText="Email"
            hintStyle={{'color':'#555555'}}
            underlineFocusStyle={{borderColor:'#00C993'}}
            inputStyle={{'color':'white'}}
            value={this.state.email}
            onChange={(event) => this.handleEmailChange(event)}
          />
          <TextField
            errorText={this.state.passwordErrorMessage}
            hintText="Password"
            hintStyle={{'color':'#555555'}}
            underlineFocusStyle={{borderColor:'#00C993'}}
            inputStyle={{'color':'white'}}
            value={this.state.password}
            onChange={(event) => this.handlePasswordChange(event)}
          />
          <TextField
            errorText={this.state.passwordRepeatErrorMessage}
            hintText="Password Repeat"
            hintStyle={{'color':'#555555'}}
            underlineFocusStyle={{borderColor:'#00C993'}}
            inputStyle={{'color':'white'}}
            value={this.state.passwordRepeat}
            onChange={(event) => this.handlePasswordRepeatChange(event)}
          />
          <button
            type="button"
            onClick={(e) => this.handleRegister(e)}
            className="student-signup-submit hvr-grow"
            >Register</button>
          <button
          type="button"
          onClick={(e) => this.handleback(e)}
          className="student-signup-register hvr-grow"
          >Back</button>
        </div>
    )
  }
}

          const mapStateToProps = state => {
            return{
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
            mapDispatchToProps
          )(StudentRegisterCard);

import React, {Component} from 'react'
import _ from 'underscore'
import { connect } from 'react-redux';
import {setUser, loading, notLoading} from '../actions/Actions'
import $ from 'jquery'
import axios from 'axios'
import {baseDomain} from '../constants/const'


class StudentRegisterCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      passwordRepeat: "",
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

    // if(this.state.name.trim() === ''){
    //   this.setState({nameEmpty: false});
    // }
    //
    // if(this.state.accessCode.trim() === ''){
    //   this.setState({codeEmpty: false});
    // }

    // if(!this.state.accessCode || !this.state.name) return;

    // if(this.state.name.trim() !== '' && this.state.accessCode.trim() !== '') {
      this.props.setLoadingAction()
      axios.post(baseDomain + 'register', {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        password: this.state.password,
        passwordRepeat: this.state.passwordRepeat,
        userType: "student"
      })
      .then((r) => {
        if(r.data.error) {
          this.props.setNotLoadingAction();
          // TODO: alert the user that there was an error, and do the corresponding action
          // this.props.updateWrongAccessCode(false);
          console.log("there was an error registering: ", r.data);
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
        <form>
          <label>
            <input
              type="text"
              value={this.state.firstname}
              placeholder="First Name"
              onChange={(event) => this.handleFirstNameChange(event)}
              className= {this.state.nameEmpty ? "student-signup-firstname-input" : "student-signup-empty-firstname-input"}
            />
            <div>
              {this.state.nameEmpty ?
                <div>
                </div> :
                <div className="empty-name-alert">
                  Name can't be empty!
                </div>}
              </div>
            </label>
            <label>
              <input
                type="text"
                value={this.state.lastname}
                placeholder="Last Name"
                onChange={(event) => this.handleLastNameChange(event)}
                className= {this.state.nameEmpty ? "student-signup-firstname-input" : "student-signup-empty-firstname-input"}
              />
              <div>
                {this.state.nameEmpty ?
                  <div>
                  </div> :
                  <div className="empty-name-alert">
                    Name can't be empty!
                  </div>}
                </div>
              </label>
            <br></br>
            <label>
              <input
                type="text"
                value={this.state.email}
                placeholder="Email"
                onChange={(event) => this.handleEmailChange(event)}
                className= {this.state.codeEmpty ? this.props.wrongAccessCode ?
                  "student-signup-acesscode-input" : "student-signup-wrongacesscode-input" : "student-signup-wrongacesscode-input"}
                />
                <div>
                  {this.state.codeEmpty ? this.props.wrongAccessCode ?
                    <div>
                    </div> :
                    <div className="wrong-access-alert">
                      Wrong access code!
                    </div> :
                    <div className="empty-access-alert">
                      Access code can't be empty!
                    </div> }
                  </div>
                </label>
                <br></br>
                <input
                  type="password"
                  value={this.state.password}
                  placeholder="Password"
                  onChange={(e) => this.handlePasswordChange(e)}
                  className= {this.state.codeEmpty ? this.props.wrongAccessCode ?
                    "student-signup-acesscode-input" : "student-signup-wrongacesscode-input" : "student-signup-wrongacesscode-input"}
                />
                <br></br>
                <input
                  type="password"
                  value={this.state.repeatPassword}
                  placeholder="Repeat Password"
                  onChange={(e) => this.handlePasswordRepeatChange(e)}
                  className= {this.state.codeEmpty ? this.props.wrongAccessCode ?
                    "student-signup-acesscode-input" : "student-signup-wrongacesscode-input" : "student-signup-wrongacesscode-input"}
                />
                <br></br>
                <button
                  type="button"
                  onClick={(e) => this.handleRegister(e)}
                  className="student-signup-submit hvr-grow"
                  >Register</button>
                  <br></br>
                  <button
                    type="button"
                    onClick={(e) => this.handleback(e)}
                    className="student-signup-register hvr-grow"
                    >Back</button>
                  </form>
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

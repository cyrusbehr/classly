import React, {Component} from 'react'
import _ from 'underscore'
import { connect } from 'react-redux';
import {setUser, loading, notLoading} from '../actions/Actions'
import $ from 'jquery'
import axios from 'axios'
import {baseDomain} from '../constants/const'

class StudentSignupCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      wrongAccessCode: true,
      nameEmpty: true,
      codeEmpty: true,
    }
  }

  componentDidMount() {
    let self = this;
    $("input").on('keyup', function (e) {
      if (e.keyCode == 13) {
        self.onSubmit(e)
      }
    });

    // this.props.socket.on('Joined', () => {
    //   this.props.socket.emit('getStudentState', this.state.password)
    // })

    // this.props.socket.on('error1', () => {
    //   console.log("this error1 was hit for some fucking reason!");
    //   this.props.updateWrongAccessCode(false);
    //   this.props.setNotLoadingAction();
    // })

    // this.props.socket.on('getStudentState', (classObj) => {
    //   //sort the questions by upvotes
    //   let questionsArray = classObj.questions.slice()
    //   if(questionsArray.length > 0) {
    //     let sortedArray = _.sortBy(questionsArray, (question) => {
    //       return -1 * question.upVotes; //negative changes to descending order
    //     })
    //     classObj.questions = sortedArray;
    //   }
    //   //update the state with the class and the username
    //   this.props.addClassAction(classObj)
    //   this.props.setUsernameAction(this.state.email);
    //   this.redirect()
    // })
  }

  redirect() {
    this.props.history.push('/student/dashboard');
  }

  handleEmailChange(event, stateProp) {
    this.setState({email: event.target.value});
    this.setState({nameEmpty: true});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value})
    this.setState({codeEmpty: true});
    this.props.updateWrongAccessCode(true);
  }

  onSubmit(e) {
    e.preventDefault();
    if(this.state.email.trim() === ''){
      this.setState({nameEmpty: false});
    }

    if(this.state.password.trim() === ''){
      this.setState({codeEmpty: false});
    }

    if(!this.state.password || !this.state.email) return;

    if(this.state.email.trim() !== '' && this.state.password.trim() !== '') {
      this.props.setLoadingAction()
      // this.props.socket.emit('join', this.state.password);
      axios.post(baseDomain + 'login', {
        email: this.state.email,
        password: this.state.password,
        userType: 'student'
      })
      .then((r) => {
        if(r.error) {
          this.props.setNotLoadingAction();
          // TODO: handle the errors here and give feedback to the user
        }else {
          this.props.setUserAction(r.response);
          this.props.setNotLoadingAction();
          this.redirect();
        }
      })
    }
  }

  register(e) {
    e.preventDefault();
    this.props.history.push('/student/register')
  }

  render() {
    return (
      <div className="student-signup-card">
        <form>
          <label>
            <input
              type="text"
              value={this.state.email}
              placeholder="Email"
              onChange={(event) => this.handleEmailChange(event)}
              className= {this.state.emailEmpty ? "student-signup-firstname-input" : "student-signup-empty-firstname-input"}
            />
            <div>
              {this.state.emailEmpty ?
                <div>
                </div> :
                <div className="empty-name-alert">
                  Email can't be empty!
                </div>}
              </div>
            </label>
            <br></br>
            <label>
              <input
                type="password"
                value={this.state.title}
                placeholder="Password"
                onChange={(event) => this.handlePasswordChange(event)}
                className= {this.state.codeEmpty ? this.props.wrongAccessCode ?
                  "student-signup-acesscode-input" : "student-signup-wrongacesscode-input" : "student-signup-wrongacesscode-input"}
              />
              <div>
                {this.state.codeEmpty ? this.props.wrongAccessCode ?
                  <div>
                  </div> :
                  <div className="wrong-access-alert">
                    Wrong password!
                  </div> :
                  <div className="empty-access-alert">
                    Password can't be empty!
                  </div> }
                </div>
              </label>
              <br></br>
              <button
                type="button"
                onClick={(e) => this.onSubmit(e)}
                className="student-signup-submit hvr-grow"
                >Login</button>
                <br></br>
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
      )(StudentSignupCard);

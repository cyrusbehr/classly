import React, {Component} from 'react'
import _ from 'underscore'
import { connect } from 'react-redux';
import {addClass, setUsername, loading, notLoading} from '../actions/Actions'
import $ from 'jquery'


class StudentSignupCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      accessCode: "",
      wrongAccessCode: true,
      nameEmpty: true,
      codeEmpty: true,
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

    this.props.socket.on('Joined', () => {
      this.props.socket.emit('getStudentState', this.state.accessCode)
    })

    this.props.socket.on('error1', () => {
      console.log("this error1 was hit for some fucking reason!");
      this.props.updateWrongAccessCode(false);
      this.props.setNotLoadingAction();
    })

    this.props.socket.on('getStudentState', (classObj) => {
      //sort the questions by upvotes
      let questionsArray = classObj.questions.slice()
      if(questionsArray.length > 0) {
        let sortedArray = _.sortBy(questionsArray, (question) => {
          return -1 * question.upVotes; //negative changes to descending order
        })
        classObj.questions = sortedArray;
      }
      //update the state with the class and the username
      this.props.addClassAction(classObj)
      this.props.setUsernameAction(this.state.name);
      this.redirect()
    })
  }

  redirect() {
    this.props.history.push(this.props.redirectRoute);
  }


  handleNameChange(event, stateProp) {
    this.setState({name: event.target.value});
    this.setState({nameEmpty: true});
  }

  handleAccessCodeChange(event) {
    this.setState({accessCode: event.target.value})
    this.setState({codeEmpty: true});
    this.props.updateWrongAccessCode(true);
  }

  onSubmit(e) {
    e.preventDefault();
    if(this.state.name.trim() === ''){
      this.setState({nameEmpty: false});
    }

    if(this.state.accessCode.trim() === ''){
      this.setState({codeEmpty: false});
    }

    if(!this.state.accessCode || !this.state.name) return;

    if(this.state.name.trim() !== '' && this.state.accessCode.trim() !== '') {
      this.props.setLoadingAction()
      this.props.socket.emit('join', this.state.accessCode);
    }
  }

  render() {
    return (
      <div className="student-signup-card">
        <form>
          <label>
            <input
              type="text"
              value={this.state.name}
              placeholder="Full Name"
              onChange={(event) => this.handleNameChange(event)}
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
                value={this.state.title}
                placeholder="Access Code"
                onChange={(event) => this.handleAccessCodeChange(event)}
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
              <button
                type="button"
                onClick={(e) => this.onSubmit(e)}
                className="student-signup-submit hvr-grow"
                >Join Class</button>
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
          addClassAction: (newClass) => {
            dispatch(addClass(newClass));
          },
          setUsernameAction: (username) => {
            dispatch(setUsername(username))
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

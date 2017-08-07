import React, {Component} from 'react'
import _ from 'underscore'
import { connect } from 'react-redux';
import {addClass, setUsername} from '../actions/Actions'


class TASignupCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      accessCode: "",
    }
  }

  componentDidMount() {
    this.props.socket.on('Joined', () => {
      this.props.socket.emit('getStudentState', this.state.accessCode)
    })

    this.props.socket.on('error1', () => {
      console.log("Access Code not found");
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
    this.setState({name: event.target.value})
  }

  handleAccessCodeChange(event) {
    this.setState({accessCode: event.target.value})
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.socket.emit('join', this.state.accessCode);
  }

  render() {
    return (
          <div className="student-signup-card">
            <form>
              <label>
                <input
                  type="text"
                  value={this.state.name}
                  placeholder="firstname"
                  onChange={(event) => this.handleNameChange(event)}
                  className="student-signup-firstname-input"
                />
              </label>
              <br></br>
              <label>
                <input
                  type="text"
                  value={this.state.title}
                  placeholder="access code"
                  onChange={(event) => this.handleAccessCodeChange(event)}
                  className="student-signup-acesscode-input"
                />
              </label>
              <br></br>
              <button
                type="button"
                onClick={(e) => this.onSubmit(e)}
                className="student-signup-submit"
              >Join Class</button>
              </form>
            </div>
      )
    }
  }

  const mapStateToProps = state => {
    return{
      socket: state.socketReducer.socket
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      addClassAction: (newClass) => {
        dispatch(addClass(newClass));
      },
      setUsernameAction: (username) => {
        dispatch(setUsername(username))
      }
    }
  }

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(TASignupCard);

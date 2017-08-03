import React, {Component} from 'react'
import _ from 'underscore'
import { connect } from 'react-redux';
import {addClass, setUsername} from '../actions/Actions'


class StudentSignupCard extends Component {
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
      // TODO: alert the user that we couldnt find their access code
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
      <div>
        <br/>
        imageURL: {this.props.URL}
        <br/>
        title: {this.props.title}
        <div>
          <div>
            <form>
              <label>
                Student name:
                <input type="text"
                  value={this.state.name}
                  onChange={(event) => this.handleNameChange(event)}
                />
              </label>
              <label>
                Access Code:
                <input type="text"
                  value={this.state.title}
                  onChange={(event) => this.handleAccessCodeChange(event)}
                />
              </label>
              <input type="submit"
                value="Join Class"
                onClick={(e) => this.onSubmit(e)}/>
              </form>
            </div>
          </div>
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
  )(StudentSignupCard);

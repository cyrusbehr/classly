import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import {addClass} from '../actions/Actions'

class ProfessorSignupCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      title: ''
    }
  }

  componentDidMount() {
    this.props.socket.on('Joined', room => {
      this.props.socket.emit('createClass', this.state);
    });
    this.props.socket.on('classCreated', newClass => {
      this.props.addClassAction(newClass);
      this.redirect();
    });
  }

  redirect() {
    this.props.history.push(this.props.redirectRoute);
  }

  handleNameChange(event) {
    this.setState({name: event.target.value})
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value})
  }

  onSubmit(e) {
    e.preventDefault();
    let nameArr = this.state.name.split(" ")
    let str = nameArr[0].concat(this.state.title.replace(/ /g,''));
    this.props.socket.emit('join', str.toLowerCase());
  }

  render() {
    return(
      <div>
        <br/>
        imageURL: {this.props.URL}
        <br/>
        title: {this.props.title}
        <div>
          <div>
            <form>
              <label>
                Professor Name (As it will appear in lecture chat):
                <input type="text"
                  name="professorName"
                  value={this.state.name}
                  onChange={(event) => this.handleNameChange(event)}
                />
              </label>
              <label>
                Lecture Title:
                <input type="text"
                   name="lectureTitle"
                   value={this.state.title}
                   onChange={(event) => this.handleTitleChange(event)}
                />
              </label>
              <input type="submit"
                value="Create Class"
                onClick={(e) => this.onSubmit(e)}/>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    socket: state.socketReducer.socket
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addClassAction: (newClass) => {
      dispatch(addClass(newClass))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(ProfessorSignupCard);
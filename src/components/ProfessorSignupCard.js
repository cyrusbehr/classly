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
      <div className="professor-signup-card">
            <form>
              <label>
                <input
                  type="text"
                  value={this.state.name}
                  placeholder="firstname"
                  className="professor-signup-firstname-input"
                  onChange={(event) => this.handleNameChange(event)}
                />
              </label>
              <br></br>
              <label>
                <input
                  type="text"
                   value={this.state.title}
                   placeholder="lecture title"
                   className="professor-signup-lecture-input"
                   onChange={(event) => this.handleTitleChange(event)}
                />
              </label>
              <br></br>
              {/* <input type="submit"
                value="Create Class"
                onClick={(e) => this.onSubmit(e)}/> */}
                <button
                  type="button"
                  onClick={(e) => this.onSubmit(e)}
                  className="student-signup-submit"
                >Create Class</button>
            </form>
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

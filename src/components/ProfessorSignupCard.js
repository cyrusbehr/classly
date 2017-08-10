import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import {addClass, setUsername} from '../actions/Actions'
import $ from 'jquery'

class ProfessorSignupCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      title: '',
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


    this.props.socket.on('Joined', room => {
      this.props.socket.emit('createClass', this.state);
    });
    this.props.socket.on('classCreated', newClass => {
      this.props.addClassAction(newClass);
      this.props.setUsernameAction(this.state.name);
      this.redirect();
    });
  }

  redirect() {
    this.props.history.push(this.props.redirectRoute);
  }

  handleNameChange(event) {
    this.setState({name: event.target.value})
    this.setState({nameEmpty: true})
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value})
    this.setState({lectureEmpty: true})
  }

  onSubmit(e) {
    e.preventDefault();
    if(this.state.name.trim() === ''){
      this.setState({nameEmpty: false});
    }

    if(this.state.title.trim() === ''){
      this.setState({lectureEmpty: false});
    }

    if(this.state.name.trim() !== '' && this.state.title.trim() !== '') {
      let nameArr = this.state.name.split(" ")
      let str = nameArr[0].concat(this.state.title.replace(/ /g,''));
      this.props.socket.emit('join', str.toLowerCase());
    }
  }

  render() {
    return(
      <div className="professor-signup-card">
            <form>
              <label>
                <input
                  type="text"
                  value={this.state.name}
                  placeholder="Full Name"
                  className={this.state.nameEmpty ? "professor-signup-firstname-input" : "professor-signup-empty-firstname-input"}
                  onChange={(event) => this.handleNameChange(event)}
                />
                {this.state.nameEmpty ?
                  <div>
                  </div> :
                  <div className="empty-name-alert">
                    Name can't be empty!
                  </div>}
              </label>
              <br></br>
              <label>
                <input
                  type="text"
                   value={this.state.title}
                   placeholder="Lecture Title or Course Code"
                   className={this.state.nameEmpty ? "professor-signup-lecture-input" : "professor-signup-empty-firstname-input"}
                   onChange={(event) => this.handleTitleChange(event)}
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
    addClassAction: (newClass) => {
      dispatch(addClass(newClass))
    },
    setUsernameAction: (username) => {
      dispatch(setUsername(username))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(ProfessorSignupCard);

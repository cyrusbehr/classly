import React, {Component} from 'react'
import _ from 'underscore'
import { connect } from 'react-redux';
import {setUser, loading, notLoading} from '../actions/Actions'
import $ from 'jquery'
import axios from 'axios'
import {baseDomain} from '../constants/const'



class TASignupCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      nameEmpty: true,
      codeEmpty: true
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
    axios.post(baseDomain + 'login', {
      email: this.state.email,
      password: this.state.password,
      userType: 'ta'
    })
    .then((r) => {
      if(r.data.error) {
        this.props.setNotLoadingAction();
        // TODO: handle the errors here and give feedback to the user
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

  register(e) {
    e.preventDefault();
    this.props.history.push('/ta/register')
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
                  className= {this.state.nameEmpty ? "student-signup-firstname-input" : "student-signup-empty-firstname-input"}
                />
                <div>
                {this.state.nameEmpty ?
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
                  value={this.state.password}
                  placeholder="Password"
                  onChange={(event) => this.handlePasswordChange(event)}
                  className= {this.state.codeEmpty ? this.props.wrongAccessCode ? "student-signup-acesscode-input" : "student-signup-wrongacesscode-input" : "student-signup-wrongacesscode-input"}
                />
                <div>
                {this.state.codeEmpty ? this.props.wrongAccessCode ?
                  <div>
                  </div> :
                  <div className="wrong-access-alert">
                    Wrong password!
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
              >Login</button>
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
  )(TASignupCard);

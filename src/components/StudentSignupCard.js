import React, {Container} from 'react'

class StudentSignupCard extends Component {

  componentDidMount() {
    this.props.socket.on('getStudentState', (classObj) => {

    })
  }

  render() {
    return (
    <div>
      This is the student signup card
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

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentSignupCard);

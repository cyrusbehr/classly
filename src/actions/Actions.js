import { SET_USER_TYPE,
  SET_SOCKET, ADD_CLASS,
  SET_USERNAME, ADD_QUESTION,
  UPVOTE_QUESTION } from '../constants/ActionTypes';

export function setUserType(userType) {
  return {
    type: SET_USER_TYPE,
    userType
  };
}

export function setSocket(socket) {
  return {
    type: SET_SOCKET,
    socket,
  }
}

export function addClass(newClass) {
  return {
    type: ADD_CLASS,
    newClass
  }
}

export function setUsername(username) {
  return {
    type: SET_USERNAME,
    username
  }
}

export function addQuestion(newQuestion) {
  return {
    type: ADD_QUESTION,
    newQuestion
  }
}

export function upVoteQuestion(updatedQuestion) {
  return{
    type: UPVOTE_QUESTION,
    updatedQuestion
  }
}

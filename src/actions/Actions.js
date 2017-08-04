import { SET_USER_TYPE,
  SET_SOCKET, ADD_CLASS,
  SET_USERNAME, ADD_QUESTION,
  UPVOTE_QUESTION, VOTE_TOPIC,
  ADD_TOPIC, TOGGLE_FILTER } from '../constants/ActionTypes';

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

export function addTopic(newTopic) {
  return {
    type: ADD_TOPIC,
    newTopic
  }
}

export function upVoteQuestion(updatedQuestion) {
  return{
    type: UPVOTE_QUESTION,
    updatedQuestion
  }
}

export function voteTopic(updatedTopic) {
  return {
    type: VOTE_TOPIC,
    updatedTopic
  }
}

export function updateFilter(newFilter) {
  return {
    type: TOGGLE_FILTER,
    newFilter
  }
}

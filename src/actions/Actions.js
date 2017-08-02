import { SET_USER_TYPE, SET_SOCKET, NEW_CLASS } from '../constants/ActionTypes';

export function setUserType(userType) {
  return {
    type: SET_USER_TYPE,
    userType: userType
  };
}

export function setSocket(socket) {
  return {
    type: SET_SOCKET,
    socket: socket,
  }
}

export function newClassToReducer(newClass) {
  return {
    type: NEW_CLASS,
    newClass: newClass,
  }
}

import { SET_USER_TYPE, SET_SOCKET } from '../constants/ActionTypes';

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

import { SET_USER_TYPE, SET_USERNAME } from '../constants/ActionTypes';


const initialState = {
  userType: "",
  username: ""
}

export default function (state = initialState, action) {
  switch (action.type) {
  case SET_USER_TYPE:
  let newState = Object.assign({}, state, {userType: action.userType})
    return newState;
  case SET_USERNAME:
  let newState2 = Object.assign({}, state, {username: action.username})
    return newState2;
  default:
    return state;
  }
}

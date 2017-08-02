import { SET_USER_TYPE } from '../constants/ActionTypes';


const initialState = {
  userType: ""
}

export default function counter(state = initialState, action) {
  switch (action.type) {
  case SET_USER_TYPE:
  let newState = Object.assign({}, state, {userType: action.userType})
    return newState;
  default:
    return state;
  }
}

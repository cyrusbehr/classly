import { NEW_CLASS, ADD_QUESTION } from '../constants/ActionTypes';

const initialState = {
  classState: {},
}

export default function (state = initialState, action) {
  switch (action.type) {
  case NEW_CLASS:
  let newState = Object.assign({}, state, {classState: action.newClass})
    return newState;

  case ADD_QUESTION:
  let originaState = Object.assign({}, state);
    return state;
    
  default:
    return state;
  }
}

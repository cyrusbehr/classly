import { ADD_CLASS, ADD_QUESTION } from '../constants/ActionTypes';

const initialState = {
  classState: {},
}

export default function (state = initialState, action) {
  switch (action.type) {
  case ADD_CLASS:
  let newState = Object.assign({}, state, {classState: action.newClass})
    return newState;

  case ADD_QUESTION:
    let originalState = Object.assign({}, state);
    originalState.classState.questions = originalState.classState.questions.concat(action.newQuestion)
    return originalState;

  default:
    return state;
  }
}

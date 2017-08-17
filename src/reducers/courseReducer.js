import { POPULATE_COURSES, ADD_COURSE } from '../constants/ActionTypes';

var initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
  case POPULATE_COURSES:
  return action.courseArray || state;

    case ADD_COURSE:
    //slice deep copy
    var newState = [...state];
    newState.push(action.courseObject);
    return newState;

    default:
    return state;
  }
}

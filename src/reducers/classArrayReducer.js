import { POPULATE_CLASS, ADD_CLASS_TO_ARRAY } from '../constants/ActionTypes';

var initialState = [];
//action that gets passsed in will be of type TOGGLE_FILTER
//and have a string attached that is the new filter

export default function (state = initialState, action) {
  switch (action.type) {
  case POPULATE_CLASS:
  return action.classArray

  case ADD_CLASS_TO_ARRAY:
  var newState = [...state];
  newState.push(action.classObject);
  return newState;

  default:
    return state;
  }
}

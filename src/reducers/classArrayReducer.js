import { POPULATE_CLASS } from '../constants/ActionTypes';

var initialState = [];
//action that gets passsed in will be of type TOGGLE_FILTER
//and have a string attached that is the new filter

export default function (state = initialState, action) {
  switch (action.type) {
  case POPULATE_CLASS:
  return action.classArray

  default:
    return state;
  }
}

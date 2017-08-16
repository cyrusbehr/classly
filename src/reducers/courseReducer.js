import { POPULATE_COURSES } from '../constants/ActionTypes';

initialState = [];
//action that gets passsed in will be of type TOGGLE_FILTER
//and have a string attached that is the new filter

export default function (state = initialState, action) {
  switch (action.type) {
  case POPULATE_COURSES:
  return action.courseArray



  default:
    return state;
  }
}

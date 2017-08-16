var initialState = [];
import { ADD_COURSE } from '../constants/ActionTypes';

//action that gets passsed in will be of type TOGGLE_FILTER
//and have a string attached that is the new filter

export default function (state = initialState, action) {
  switch (action.type) {

    case ADD_COURSE:
    //slice deep copy
    var newState = state.slice(0, state.length);
    //push new course onto that array
    newState.push(action.courseObject);
    return newState;
  default:
    return state;
  }
}

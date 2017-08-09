import { TOGGLE_FILTER } from '../constants/ActionTypes';
import _ from 'underscore';

const initialState =  "";
//action that gets passsed in will be of type TOGGLE_FILTER
//and have a string attached that is the new filter

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_FILTER:
      let newState = action.newFilter;
      console.log("this is new filter: ", newState);
        return newState;

  default:
    return state;
  }
}

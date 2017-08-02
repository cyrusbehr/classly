import { NEW_CLASS } from '../constants/ActionTypes';

const initialState = {
  classState: {},
}

export default function (state = initialState, action) {
  switch (action.type) {
  case NEW_CLASS:
    let newState = action.newClass;
    return newState;
  default:
    return state;
  }
}

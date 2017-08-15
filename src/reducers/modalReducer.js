import { CLOSE, OPEN } from '../constants/ActionTypes';

const initialState =  true;

export default function (state = initialState, action) {
  switch (action.type) {
    case CLOSE:
      let newState = false;
        return newState;
    case OPEN:
      let newState1 = true;
        return newState1;
  default:
    return state;
  }
}

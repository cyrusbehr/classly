import { LOADING, NOT_LOADING } from '../constants/ActionTypes';


const initialState = {
  isLoading: false,
}

export default function (state = initialState, action) {
  switch (action.type) {
  case LOADING:
  var newState = {isLoading: true}
  return newState;

  case NOT_LOADING:
  var newState = {isLoading: false};
  return newState

  default:
    return state;
  }
}

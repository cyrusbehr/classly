import { SET_USER , LIKE_QUESTION, INITIALIZE, SET_LIKED_QUESTIONS } from '../constants/ActionTypes';


const initialState = {
  user: {},
  hasInitialized: false
}

export default function (state = initialState, action) {
  switch (action.type) {

  case INITIALIZE:
  var newState = Object.assign({}, state, {hasInitialized: true})
  return newState

  case SET_USER:
  var newState = Object.assign({}, state, {user: action.user})
  return newState

  case LIKE_QUESTION:
    //if already liked
    var newArr;
    if(action.direction === "DOWN"){
      newArr = state.user.likedQuestions;
      var index = newArr.indexOf(action.questionId);
      newArr.splice(index, 1);
    } else {
      newArr = state.user.likedQuestions;
      newArr.push(action.questionId);
    }
    var newState = Object.assign({}, state, {user: state.user});
    newState.user.likedQuestions = newArr
    return newState;

  default:
    return state;
  }
}

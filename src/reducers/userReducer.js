import { SET_USER , LIKE_QUESTION } from '../constants/ActionTypes';


const initialState = {
  user: {},
  likedQuestions: [],
}

export default function (state = initialState, action) {
  switch (action.type) {

  case SET_USER:
  var newState = Object.assign({}, state, {user: action.user})
  return newState

  case LIKE_QUESTION:
    var newState3;
    //if already liked
    if(action.direction === "DOWN"){
      var newArr = state.likedQuestions;
      var index = newArr.indexOf(action.questionId);
      newArr.splice(index, 1);
      newState3 = Object.assign({}, state, {likedQuestions: newArr})
    } else {
      var newArr = state.likedQuestions;
      newArr.push(action.questionId);
      // newArr[newArr.length] = action.questionId
      // state.likedQuestions.push(action.questionId);
      newState3 = Object.assign({}, state, {likedQuestions: newArr});
    }
    return newState3;

  default:
    return state;
  }
}

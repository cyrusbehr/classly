import { SET_USER_TYPE, SET_USERNAME, LIKE_QUESTION } from '../constants/ActionTypes';


const initialState = {
  userType: "",
  username: "",
  likedQuestions: [],
}

export default function (state = initialState, action) {
  switch (action.type) {
  case SET_USER_TYPE:
    let newState = Object.assign({}, state, {userType: action.userType})
      return newState;

  case SET_USERNAME:
    let newState2 = Object.assign({}, state, {username: action.username})
      return newState2;

  case LIKE_QUESTION:
    // console.log("entering LIKE_QUESTION")
    // console.log("state.likedQuestions:", state.likedQuestions);
    // console.log("ACTION:", action);
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

import { ADD_CLASS, ADD_QUESTION, UPVOTE_QUESTION, ADD_TOPIC } from '../constants/ActionTypes';
import _ from 'underscore';

const initialState =  {
  classState: {},
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_CLASS:
      let newState = Object.assign({}, state, {classState: action.newClass})
        return newState;

    case UPVOTE_QUESTION:
      let originalState = Object.assign({}, state);
      var index = _.findIndex(originalState.classState.questions, function(q){
        return q._id === action.updatedQuestion._id;
      });
      //destructure question array
      let questionArray = originalState.classState.questions;
      //replace old question with updated one
      questionArray[index] = action.updatedQuestion;
      //new state write over to ensure deep copy
      originalState.classState.questions = [...questionArray];
        return originalState;

    case ADD_QUESTION:
      let originalState1 = Object.assign({}, state);
      originalState1.classState.questions = originalState1.classState.questions.concat(action.newQuestion)
      return originalState1;

    case ADD_TOPIC:
      let originalState2 = Object.assign({}, state);
      originalState2.classState.topics = originalState1.classState.topics.concat(action.newTopic)
      return originalState2;

  default:
    return state;
  }
}

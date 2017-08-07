import { ADD_CLASS, ADD_QUESTION,
   UPVOTE_QUESTION, ADD_TOPIC,
   VOTE_TOPIC, DELETE_QUESTION,
   DELETE_TOPIC, TOGGLE_STAR, TOGGLE_RESOLVE } from '../constants/ActionTypes';
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

    case VOTE_TOPIC:
      let originalState4 = Object.assign({}, state);
      var index = _.findIndex(originalState4.classState.topics, function(q){
        return q._id === action.updatedTopic._id;
      });
      //destructure question array
      let topicsArray = originalState4.classState.topics;
      //replace old question with updated one
      topicsArray[index] = action.updatedTopic;
      //new state write over to ensure deep copy
      originalState4.classState.topics = [...topicsArray];
        return originalState4;

    case ADD_QUESTION:
      let originalState1 = Object.assign({}, state);
      originalState1.classState.questions = originalState1.classState.questions.concat(action.newQuestion)
      return originalState1;

    case ADD_TOPIC:
      let originalState7 = Object.assign({}, state);
      originalState7.classState.topics = originalState7.classState.topics.concat(action.newTopic)
      return originalState7;

    case DELETE_QUESTION:
    let originalState5 = Object.assign({}, state);
    let questionsArray = originalState5.classState.questions
    let index;

    for(var i = 0; i < questionsArray.length; i++) {
      if(questionsArray[i]._id === action.ID){
        index = i;
        break;
      }
    }
    questionsArray.splice(index,1);
    originalState5.classState.questions = [...questionsArray];
      return originalState5;

    case DELETE_TOPIC:
      let originalState8 = Object.assign({}, state);
      let topicsArr = originalState8.classState.topics
      let index1;

      for(var i = 0; i < topicsArr.length; i++) {
        if(topicsArr[i]._id === action.ID){
          index1 = i;
          break;
        }
      }
      topicsArr.splice(index1,1);
      originalState8.classState.topics = [...topicsArr];
        return originalState8;

    case TOGGLE_STAR:
      let originalState9 = Object.assign({}, state);
      var index2 = _.findIndex(originalState9.classState.questions, function(q){
        return q._id === action.questionId;
      });
      let questionArray2 = originalState9.classState.questions;
      console.log("questionArray2", questionArray2);
      questionArray2[index2].isStarred = !questionArray2[index2].isStarred;

      originalState9.classState.questions = [...questionArray2];
        return originalState9;
      //
      //
      // let index3 = 0;
      // let modifiedQuestion = {};
      // for(var i = 0; i < questionsArr3.length; i++){
      //   if (originalState9.classState.questions[i]._id === action.questionId){
      //     modifiedQuestion = originalState9.classState.questions[i];
      //     modifiedQuestion.isStarred = !modifiedQuestion.isStarred;
      //     index3 = i;
      //     break;
      //   }
      // }
      // originalState9.classState.questions[index3] = modifiedQuestion;
      // return originalState9;

    case TOGGLE_RESOLVE:
      let originalState10 = Object.assign({}, state);
      var index3 = _.findIndex(originalState10.classState.questions, function(q){
        return q._id === action.questionId;
      });
      let questionArray3 = originalState10.classState.questions;
      console.log("questionArray3", questionArray3);
      questionArray3[index3].isResolved = !questionArray3[index3].isResolved;

      originalState10.classState.questions = [...questionArray3];
        return originalState10;

  default:
    return state;
  }
}

import { ADD_CLASS, ADD_QUESTION,
  UPVOTE_QUESTION, ADD_TOPIC,
  VOTE_TOPIC, DELETE_QUESTION,
  DELETE_TOPIC, TOGGLE_STAR, TOGGLE_RESOLVE, NEW_COMMENT } from '../constants/ActionTypes';
  import _ from 'underscore';

  // STATE refers to a single quesiton in the questions array
  function handleQuestion(state, action) {
    switch (action.type) {
      case UPVOTE_QUESTION:
        if (state._id !== action.updatedQuestion._id) {
          return state;
        }

        return action.updatedQuestion;
      case NEW_COMMENT:
        if (state._id !== action.newCommentObj.questionId) {
          return state;
        }

        return Object.assign({}, state, {
          comments: [...state.comments, action.newCommentObj]
        });
      default:
        return state;
    }
  }

  export default function (state = {}, action) {
    switch (action.type) {
      case ADD_CLASS: {
        return Object.assign({}, state, action.newClass);
      }
      case UPVOTE_QUESTION:
      case NEW_COMMENT: {
        return Object.assign({}, state, {
          questions : state.questions.map(question => {
            return handleQuestion(question, action);
          })
        });
      }
      case VOTE_TOPIC: {
        let originalState4 = Object.assign({}, state);
        var index = _.findIndex(originalState4.topics, function(q){
          return q._id === action.updatedTopic._id;
        });
        //destructure question array
        let topicsArray = originalState4.topics;
        //replace old question with updated one
        topicsArray[index] = action.updatedTopic;
        //new state write over to ensure deep copy
        originalState4.topics = [...topicsArray];
        return originalState4;
      }
      case ADD_QUESTION: {
        return Object.assign({}, state, {
          questions: state.questions.concat(action.newQuestion)
        });
      }
      case ADD_TOPIC:
      let originalState7 = Object.assign({}, state);
      originalState7.topics = originalState7.topics.concat(action.newTopic)
      return originalState7;

      case DELETE_QUESTION: {
        return Object.assign({}, state, {
          questions: state.questions.filter(question => {
            return question._id !== action.ID;
          })
        });
      }

      case DELETE_TOPIC:
      let originalState8 = Object.assign({}, state);
      let topicsArr = originalState8.topics
      let index1;

      for(var i = 0; i < topicsArr.length; i++) {
        if(topicsArr[i]._id === action.ID){
          index1 = i;
          break;
        }
      }
      topicsArr.splice(index1,1);
      originalState8.topics = [...topicsArr];
      return originalState8;
  
      case TOGGLE_STAR:
      let originalState9 = Object.assign({}, state);
      var index2 = _.findIndex(originalState9.questions, function(q){
        return q._id === action.questionId;
      });
      let questionArray2 = originalState9.questions;
      console.log("action.questionId:", action.questionId);
      console.log("questionArray2", questionArray2);
      console.log("index2", index2);
      console.log(questionArray2[index2]);
      questionArray2[index2].isStarred = !questionArray2[index2].isStarred;

      originalState9.questions = [...questionArray2];
      return originalState9;

      case TOGGLE_RESOLVE:
      let originalState10 = Object.assign({}, state);
      var index3 = _.findIndex(originalState10.questions, function(q){
        return q._id === action.questionId;
      });
      let questionArray3 = originalState10.questions;
      console.log("questionArray3", questionArray3);
      questionArray3[index3].isResolved = !questionArray3[index3].isResolved;

      originalState10.questions = [...questionArray3];
      return originalState10;

      default:
      return state;
    }
  }

import { SET_USER_TYPE,
  SET_SOCKET, ADD_CLASS,
  SET_USERNAME, ADD_QUESTION,
  TOGGLE_FILTER,
  UPVOTE_QUESTION, ADD_TOPIC,
  VOTE_TOPIC, DELETE_QUESTION,
  DELETE_TOPIC, TOGGLE_STAR, TOGGLE_RESOLVE, NEW_COMMENT, SET_COLOR} from '../constants/ActionTypes';

  export function setUserType(userType) {
    return {
      type: SET_USER_TYPE,
      userType
    };
  }

  export function setSocket(socket) {
    return {
      type: SET_SOCKET,
      socket,
    }
  }

  export function addClass(newClass) {
    return {
      type: ADD_CLASS,
      newClass
    }
  }

  export function setUsername(username) {
    return {
      type: SET_USERNAME,
      username
    }
  }

  export function addQuestion(newQuestion) {
    return {
      type: ADD_QUESTION,
      newQuestion
    }
  }

  export function addTopic(newTopic) {
    return {
      type: ADD_TOPIC,
      newTopic
    }
  }

  export function upVoteQuestion(updatedQuestion) {
    return{
      type: UPVOTE_QUESTION,
      updatedQuestion
    }
  }

  export function voteTopic(updatedTopic) {
    return {
      type: VOTE_TOPIC,
      updatedTopic
    }
  }
  export function deleteQuestion(ID) {
    return {
      type: DELETE_QUESTION,
      ID
    }
  }
  export function deleteTopic(ID) {
    return {
      type: DELETE_TOPIC,
      ID
    }
  }

  export function updateFilter(newFilter) {
    return {
      type: TOGGLE_FILTER,
      newFilter
    }
  }


  export function addComment(newCommentObj) {
    return {
      type: NEW_COMMENT,
      newCommentObj
    }
  }

  export function toggleStar(questionId) {
    return {
      type: TOGGLE_STAR,
      questionId
    }
  }

  export function toggleResolve(questionId) {
    return {
      type: TOGGLE_RESOLVE,
      questionId
    }
  }

  export function setColor(questionId) {
    return {
      type: SET_COLOR
    }
  }

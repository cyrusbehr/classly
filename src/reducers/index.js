import { combineReducers } from 'redux';
import classReducer from './classReducer';
import userReducer from './userReducer';
import socketReducer from './socketReducer';
import filterReducer from './filterReducer';
import pageReducer from './pageReducer';
import modalReducer from './modalReducer';
import courseReducer from './courseReducer'


const rootReducer = combineReducers({
  classReducer,
  userReducer,
  filterReducer,
  socketReducer,
  pageReducer,
  modalReducer,
  courseReducer
});

export default rootReducer;

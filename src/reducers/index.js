import { combineReducers } from 'redux';
import classReducer from './classReducer';
import userReducer from './userReducer';
import socketReducer from './socketReducer';
import filterReducer from './filterReducer';
import pageReducer from './pageReducer';

const rootReducer = combineReducers({
  classReducer,
  userReducer,
  filterReducer,
  socketReducer,
  pageReducer
});

export default rootReducer;

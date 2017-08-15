import { combineReducers } from 'redux';
import classReducer from './classReducer';
import userReducer from './userReducer';
import socketReducer from './socketReducer';
import filterReducer from './filterReducer';
import pageReducer from './pageReducer';
import modalReducer from './modalReducer';


const rootReducer = combineReducers({
  classReducer,
  userReducer,
  filterReducer,
  socketReducer,
  pageReducer,
  modalReducer
});

export default rootReducer;

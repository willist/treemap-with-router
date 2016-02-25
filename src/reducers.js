import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { MOVE_DOWN, MOVE_UP } from './actions';

const initial = {
  path: [],
};

function app(state = initial, action) {
  switch (action.type) {
  case MOVE_DOWN:
    return { ...state, path: state.path.concat([action.payload]) };
  case MOVE_UP:
    return { ...state, paht: state.path.slice(0, -1) };
  default:
    return state;
  }
}

export default combineReducers(
  { app, routing: routerReducer }
);

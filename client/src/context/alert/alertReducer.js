import { SET_ALERT, REMOVE_ALERT } from '../types';

// eslint-disable-next-line
export default (state, action) => {
  switch(action.type) {
    case SET_ALERT:
      return {
        ...state, 
        msg: action.payload
      };
    case REMOVE_ALERT:
      return {
        ...state,
        msg: null
      }
    default: 
      return state;
  }
}
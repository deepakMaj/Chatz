import { SET_USERS } from '../types';

export default (state, action) => {
  switch(action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.payload
      }
    default:
      throw new Error(`Unknown action type: ${action.type}`)
  }
}
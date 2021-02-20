import React, { useReducer } from 'react';
import MessageContext from './messageContext';
import MessageReducer from './messageReducer';
import { SET_USERS } from '../types'; 

const MessageState = (props) => {

  const initialState = {users: null};
  const [state, dispatch] = useReducer(MessageReducer, initialState);

  const setUsers = (users) => {
    dispatch({
      type: SET_USERS,
      payload: users
    });
  }

  return (
    <MessageContext.Provider value={{
      users: state.users,
      setUsers
    }}>
      {props.children}
    </MessageContext.Provider>
  )
}

export default MessageState;

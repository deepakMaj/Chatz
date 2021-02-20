import React, { useReducer } from 'react';
import MessageContext from './messageContext';
import MessageReducer from './messageReducer';
import { SET_USERS, SET_SELECTED_USER, SET_USER_MESSAGES } from '../types'; 

const MessageState = (props) => {

  const initialState = {users: null};
  const [state, dispatch] = useReducer(MessageReducer, initialState);

  const setUsers = (users) => {
    dispatch({
      type: SET_USERS,
      payload: users
    });
  }

  const setSelectedUser = (user) => {
    dispatch({
      type: SET_SELECTED_USER,
      payload: user?.username
    })
  }

  const setUserMessages = (data) => {
    dispatch({
      type: SET_USER_MESSAGES,
      payload: data
    })
  }

  return (
    <MessageContext.Provider value={{
      users: state.users,
      setUsers,
      setSelectedUser,
      setUserMessages
    }}>
      {props.children}
    </MessageContext.Provider>
  )
}

export default MessageState;

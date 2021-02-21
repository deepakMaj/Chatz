import React, { useReducer } from 'react';
import MessageContext from './messageContext';
import MessageReducer from './messageReducer';
import { SET_USERS, SET_SELECTED_USER, SET_USER_MESSAGES, ADD_MESSAGE } from '../types'; 

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
      payload: user ? user.username : ""
    })
  }

  const setUserMessages = (data) => {
    dispatch({
      type: SET_USER_MESSAGES,
      payload: data
    })
  }

  const sendUserMessage = (data) => {
    dispatch({
      type: ADD_MESSAGE,
      payload: data
    });
  }


  return (
    <MessageContext.Provider value={{
      users: state.users,
      setUsers,
      setSelectedUser,
      setUserMessages,
      sendUserMessage
    }}>
      {props.children}
    </MessageContext.Provider>
  )
}

export default MessageState;

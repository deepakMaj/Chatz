import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = props => {

  const initialState = {
    msg: null
  };
  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const setAlert = msg => {
    dispatch({
      type: SET_ALERT,
      payload: msg
    });
  }

  const removeAlert = () => {
    dispatch({
      type: REMOVE_ALERT
    });
  }

  return (
    <AlertContext.Provider value={{
      msg: state.msg,
      setAlert,
      removeAlert
    }}>
      {props.children}
    </AlertContext.Provider>
  )
}

export default AlertState;

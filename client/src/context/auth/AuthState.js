import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import { LOGIN, LOGOUT } from '../types';
import jwtDecode from 'jwt-decode';

const AuthState = props => {

  const initialState = { user: null };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = jwtDecode(token);
    const expiresAt = new Date(decodedToken.exp * 1000);
    if (new Date() > expiresAt) {
      localStorage.removeItem('token');
    }
    else {
      initialState.user = decodedToken;
    }
  } else {
    console.log("No token found!");
  }

  const login = (data) => {
    dispatch({
      type: LOGIN,
      payload: data
    });
  }

  const logout = () => {
    dispatch({ type: LOGOUT });
  }

  return (
    <AuthContext.Provider value={{
      user: state.user,
      login,
      logout
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState;

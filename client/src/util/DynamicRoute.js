import React, { useContext } from 'react';
import AuthContext from '../context/auth/authContext';
import { Route, Redirect } from 'react-router-dom';

const DynamicRoute = (props) => {

  const authContext = useContext(AuthContext);
  const { user } = authContext;

  if(props.authenticated && !user){
    return <Redirect to="/login" />
  }
  else if(props.guest && user){
    return <Redirect to="/" />
  }
  else{
    return <Route component={props.component} {...props } />
  }
}

export default DynamicRoute;

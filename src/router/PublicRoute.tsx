import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const PublicRoute = ({ children }: any) => {

  const { authState } = useContext(AuthContext);
  console.log('token ::', authState)

  return authState?.token ? <Navigate to='/' /> : children;
};
export default PublicRoute;

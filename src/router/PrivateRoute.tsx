/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const PrivateRoute = ({ children }: any) => {
  const { authState } = useContext(AuthContext);
  console.log('token ::', authState)
  return authState?.token ? children : <Navigate to='/sign-in' />;
};
export default PrivateRoute;

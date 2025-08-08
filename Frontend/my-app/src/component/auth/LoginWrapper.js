import React from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './login';

const LoginWrapper = () => {
  const navigate = useNavigate();
  return <Login navigate={navigate} />;
};

export default LoginWrapper;
import React from 'react';
import PageTitle from '../components/PageTitle';
import Login from '../components/Login';
//import Register from '../components/Register';
import RegisterButton from '../components/RegisterButton';

const LoginPage = () =>
{
    return(
      <div>
        <PageTitle />
        <RegisterButton />
        <Login />
      </div>
    );
};

export default LoginPage;
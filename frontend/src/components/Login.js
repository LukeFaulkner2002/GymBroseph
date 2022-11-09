import React, { useState } from 'react';
//import { md5 } from './md5.js';
//import RegisterPage from '../pages/RegisterPage';

const app_name = 'gymbroseph'

function buildPath(route)
{
    if (process.env.NODE_ENV === 'production') 
    {
        return 'https://' + app_name +  '.herokuapp.com/' + route;
    }
    else
    {        
        return 'http://localhost:5000/' + route;
    }
}

function Login()
{
    var loginName;
    var loginPassword;
    const [message,setMessage] = useState('');

    const doLogin = async event => 
    {
        event.preventDefault();
        var obj = {login:loginName.value,password:loginPassword.value};
        var js = JSON.stringify(obj);
        try
        {    
            const response = await fetch(buildPath('api/login'), {method:'POST',body:js,headers:{'Content-Type':'application/json'}});

            var res = JSON.parse(await response.text());
          
            if( res.id <= 0 )
            {
                setMessage('User/Password combination incorrect');
            }
            else
            {
                var user = {firstName:res.firstName,lastName:res.lastName}
                localStorage.setItem('user_data', JSON.stringify(user));
                setMessage('');
                console.log(message);
                console.log(user);
               
                window.location.href = '/cards';
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
    };

// <form onSubmit={doLogin}>

    return(
      <div id="loginDiv">
        <form >
        <span id="inner-title">PLEASE LOG IN</span><br />
        <input type="text" id="loginName" placeholder="Username" 
          ref={(c) => loginName = c} /><br />
        <input type="password" id="loginPassword" placeholder="Password" 
          ref={(c) => loginPassword = c} /><br />
        <input type="submit" id="loginButton" className="buttons" value = "Do It"
          onClick={doLogin} />
        </form>
     </div>
    );
};

export default Login;
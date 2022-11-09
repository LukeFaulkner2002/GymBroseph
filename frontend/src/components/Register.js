import React, { useState } from 'react';
//import { md5 } from './md5.js';

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

function Register()
{
    var loginName;
    var loginPassword;
    var firstName;
    var lastName;
    const [message,setMessage] = useState('');

    const doRegister = async event => 
    {
        

        event.preventDefault();
        var obj = {login:loginName.value, password:loginPassword.value, firstName:firstName.value, lastName:lastName.value};
        var js = JSON.stringify(obj);
        try
        {    
            const response = await fetch(buildPath('api/register'), {method:'POST',body:js,headers:{'Content-Type':'application/json'}});

            var res = JSON.parse(await response.text());
          
            if( res.id <= 0 )
            {
                setMessage('User/Password combination incorrect');
            }
            else
            {
                // var user = {firstName:res.FirstName,lastName:res.LastName}
                // console.log(res);
                 console.log(JSON.stringify(res));
                // console.log(user.firstName);
                localStorage.setItem('user_data', JSON.stringify(res));
                setMessage('Usre accepted');
               
                window.location.href = '/cards';
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
    };
    //<form onSubmit={doRegister}>

    return(
      <div id="registerDiv">
        <form>
        <span id="inner-title">PLEASE REGISTER</span><br />
        <input type="text" id="loginName" placeholder="Username" 
          ref={(c) => loginName = c} /><br />
        <input type="password" id="loginPassword" placeholder="Password" 
          ref={(c) => loginPassword = c} /><br />
          <input type="text" id="firstName" placeholder="firstName" 
          ref={(c) => firstName = c} /><br />
          <input type="text" id="lastName" placeholder="lastName" 
          ref={(c) => lastName = c} /><br />
        <input type="submit" id="registerButton" className="buttons" value = "Do It"
          onClick={doRegister} />
        </form>
        <span id="registerResult">{message}</span>
     </div>
    );
};

export default Register;

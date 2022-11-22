import React from 'react';

function LoggedInName()
{
    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var firstName = ud.firstName;
    var lastName = ud.lastName;

  return(
    <div id="loggedInDiv">
      <span id="userName">Logged In As {firstName} {lastName}</span><br />
    </div>
  );
};

export default LoggedInName;
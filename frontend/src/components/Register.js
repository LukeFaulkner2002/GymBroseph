import React, { useState } from 'react';
import { Button, Form, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import image from "../pictures/weightsblurred.jpg";
import '../App.css'

const app_name = 'gymbroseph'

function buildPath(route) {
    if (process.env.NODE_ENV === 'production') {
        return 'https://' + app_name + '.herokuapp.com/' + route;
    }
    else {
        return 'http://localhost:5000/' + route;
    }
}

function Register() {
    var loginName;
    var loginPassword;
    var firstName;
    var lastName;
    const [message, setMessage] = useState('');

    const cancelRegister = async event => {
        event.preventDefault();
        window.location.href = '/';
    };

    const doRegister = async event => {
        event.preventDefault();
        var obj = { login: loginName.value, password: loginPassword.value, firstName: firstName.value, lastName: lastName.value };
        var js = JSON.stringify(obj);
        try {
            const response = await fetch(buildPath('api/register'), { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

            var res = JSON.parse(await response.text());

            if (res.id <= 0) {
                setMessage('User/Password combination incorrect');
            }
            else {
                console.log(JSON.stringify(res));
                localStorage.setItem('user_data', JSON.stringify(res));
                setMessage('User accepted');

                window.location.href = '/';
            }
        }
        catch (e) {
            alert(e.toString());
            return;
        }
    };

    return (
        <div
            className="fill-window"
            style={{
                backgroundImage: `url(${image})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                overflow: "scroll",
                whiteSpace: "nowrap"
            }}
        >
            <Container className="center w-25 p-3 bgwhite rounded-3">
                <form>
                    <span id="inner-title">Register</span><br />
                    <input type="text" id="loginName" placeholder="Username"
                        ref={(c) => loginName = c} /><br />
                    <input type="password" id="loginPassword" placeholder="Password"
                        ref={(c) => loginPassword = c} /><br />
                    <input type="text" id="firstName" placeholder="First Name"
                        ref={(c) => firstName = c} /><br />
                    <input type="text" id="lastName" placeholder="Last Name"
                        ref={(c) => lastName = c} /><br />
                    <input type="submit" id="registerButton" className="buttons" value="Submit"
                        onClick={doRegister} />
                </form>
                <span id="registerResult">{message}</span>
                <Form onSubmit={cancelRegister}>
                    <Button variant='danger' type="submit">Cancel</Button>
                </Form>
            </Container>
        </div>
    );
};

export default Register;
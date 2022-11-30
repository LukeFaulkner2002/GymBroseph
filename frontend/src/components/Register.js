import React, { useState, } from 'react';
import { Button, Form, Container, Card } from "react-bootstrap";
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

function ValidateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
        return (true);
    }
    return (false);
}

function Register() {
    var loginName;
    var loginPassword;
    var firstName;
    var lastName;
    var email;
    const [userNameError, setUserNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [message, setMessage] = useState('');
    const [passCode, setPassCode] = useState('');
    const [passCodeMessage, setPassCodeMessage] = useState('');

    const PassCodeChangeHandler = (event) => {
        setPassCode(event.target.value);
    };

    const goBackToLogin = async event => {
        event.preventDefault();
        window.location.href = '/';
    };

    const Verify = async event => {
        event.preventDefault();

        var obj = { passCode: passCode };
        var js = JSON.stringify(obj);
        try {
            console.log(js);
            const response = await fetch(buildPath('api/verify'), { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });
            var res = JSON.parse(await response.text());
            var sd = JSON.parse(JSON.stringify(res));
            console.log(sd.results.modifiedCount);

            if (sd.results.modifiedCount != 0) {
                setPassCodeMessage("Verification successful!");
                return;
            }

            console.log(res);
            setPassCodeMessage("Verification went wrong.");

            return;
        }
        catch (e) {
            alert(e.toString());
            return;
        }
    };

    const doRegister = async event => {
        event.preventDefault();

        setUserNameError("");
        setPasswordError("");
        setFirstNameError("");
        setLastNameError("");
        setEmailError("");
        setMessage("");

        let formIsValid = true;

        if (loginName.value.length < 3) {
            setUserNameError('Username must be at least 3 characters.');
            formIsValid = false;
        }
        if (loginPassword.value.length <= 7) {
            setPasswordError('Password must be at least 8 symbols.');
            formIsValid = false;
        }
        if (firstName.value.length == 0) {
            setFirstNameError('Please enter a first name.');
            formIsValid = false;
        }
        if (lastName.value.length == 0) {
            setLastNameError('Please enter a last name.');
            formIsValid = false;
        }
        if (ValidateEmail(email) == false) {
            setEmailError('Please enter a valid email.');
            formIsValid = false;
        }

        if (formIsValid == true) {
            var obj = { login: loginName.value, password: loginPassword.value, firstName: firstName.value, lastName: lastName.value, email: email.value };
            var js = JSON.stringify(obj);
            try {
                const response = await fetch(buildPath('api/register'), { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

                var res = JSON.parse(await response.text());

                //console.log(res);
                setMessage('Register Successful. Check email for verification.');
                return;
            }
            catch (e) {
                alert(e.toString());
                return;
            }
        }

        setMessage("One or more fields are not valid to register.");

        return;

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
            <h1>
                <Card className="text-center textwhite" bg="primary">
                    <Card.Header>Gymbroseph Exercise Manager and Randomizer</Card.Header>
                </Card>
            </h1>
            <Container className=" w-25 p-3 bggrey rounded-3">
                <Card className="bqwhite">
                    <Card.Header as="h5">Register:</Card.Header>
                    <Card.Body>
                        <Form onSubmit={doRegister}>
                            <br />
                            <input
                                className="form-control"
                                aria-describedby="userNameHelp"
                                type="text"
                                id="loginName"
                                placeholder="Username"
                                ref={(c) => loginName = c} />
                            <small id="userNameHelp" className="text-danger form-text">
                                {userNameError}
                            </small>
                            <br />
                            <br />
                            <input
                                className="form-control"
                                aria-describedby="passwordHelp"
                                type="password"
                                id="loginPassword"
                                placeholder="Password"
                                ref={(c) => loginPassword = c} />
                            <small id="passwordHelp" className="text-danger form-text">
                                {passwordError}
                            </small>
                            <br />
                            <br />
                            <input
                                className="form-control"
                                aria-describedby="firstNameHelp"
                                type="text"
                                id="firstName"
                                placeholder="First Name"
                                ref={(c) => firstName = c} />
                            <small id="firstNameHelp" className="text-danger form-text">
                                {firstNameError}
                            </small>
                            <br />
                            <br />
                            <input
                                className="form-control"
                                aria-describedby="lastNameHelp"
                                type="text"
                                id="lastName"
                                placeholder="Last Name"
                                ref={(c) => lastName = c} />
                            <small id="lastNameHelp" className="text-danger form-text">
                                {lastNameError}
                            </small>
                            <br />
                            <br />
                            <input
                                className="form-control"
                                aria-describedby="emailHelp"
                                type="text"
                                id="email"
                                placeholder="Email"
                                ref={(c) => email = c} />
                            <small id="emailHelp" className="text-danger form-text">
                                {emailError}
                            </small>
                            <br />
                            <br />
                            <Button variant='success' type="submit">Register</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <span id="registerResult" className="text-danger form-text">{message}</span>
                <br />
                <Card className="bqwhite">
                    <Card.Header as="h5">Verify Email:</Card.Header>
                    <Card.Body>
                        <Form.Group controlId="form.password">
                            <Form.Control type='password' value={passCode} onChange={PassCodeChangeHandler} placeholder="Verification Code" />
                        </Form.Group>

                        <br />
                        <br />
                        <Form onSubmit={Verify}>
                            <Button variant='success' type="submit">Verify Email</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <small id="verificationHelp" className="text-danger form-text">
                    {passCodeMessage}
                </small>
                <br />
                <br />
                <Form onSubmit={goBackToLogin}>
                    <Button variant='primary' type="submit">Go To Login</Button>
                </Form>
            </Container>
        </div>
    );
};

export default Register;
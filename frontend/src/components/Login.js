import React, { useState } from 'react';
import { Button, Form, Card, Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css'
import image from "../pictures/weightsblurred.jpg";

const app_name = 'gymbroseph'

function buildPath(route) {
    if (process.env.NODE_ENV === 'production') {
        return 'https://' + app_name + '.herokuapp.com/' + route;
    }
    else {
        return 'http://localhost:5000/' + route;
    }
}

function Login() {
    const [userName, setName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [userNameError, setUserNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const NameChangeHandler = (event) => {
        setName(event.target.value);
    };

    const PasswordChangeHandler = (event) => {
        setPassword(event.target.value);
    };

    const goToRegister = async event => {
        event.preventDefault();
        localStorage.removeItem("user_data");
        window.location.href = '/register';
    };

    const goToResetPassword = async event => {
        event.preventDefault();
    
        window.location.href = '/reset';
    };

    const doLogin = async event => {
        event.preventDefault();
        let formIsValid = true;

        setMessage("");
        setUserNameError('');
        setPasswordError('');

        if (userName.length < 3) {
            setUserNameError('Username must be at least 3 characters.');
            formIsValid = false;
        }
        if (password.length < 1) {
            setPasswordError("Don't forget your password");
            formIsValid = false;
        }

        if (formIsValid == true) {
            var obj = { login: userName, password: password };
            var js = JSON.stringify(obj);

            try {
                const response = await fetch(buildPath('api/login'), { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });
                var res = JSON.parse(await response.text());

                if (res.firstName === "") {
                    setMessage('Invalid Login.');
                }
                else {
                    var user = { firstName: res.firstName, lastName: res.lastName, id: res.id }
                    localStorage.setItem('user_data', JSON.stringify(user));
                    setMessage('');

                    window.location.href = '/home';
                }
            }
            catch (e) {
                alert(e.toString());
                return;
            }
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
            <h1>
                <Card className="text-center textwhite" bg="primary">
                    <Card.Header>Gymbroseph Exercise Manager and Randomizer</Card.Header>
                </Card>
            </h1>
            <Container className="center w-25 p-3 bggrey rounded-3">
                <Card className="bgwhite">
                    <Card.Header as="h5">Login:</Card.Header>
                    <Card.Body>
                        <Form onSubmit={doLogin}>
                            <Row>
                                <Col>
                                    <br />
                                    <Row>
                                        <Form.Group controlId="form.userName">
                                            <Form.Control type='userName' value={userName} onChange={NameChangeHandler} placeholder="Username" />
                                        </Form.Group>
                                        <small id="userNameHelp" className="text-danger form-text">
                                            {userNameError}
                                        </small>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Form.Group controlId='form.password'>
                                            <Form.Control type='password' value={password} onChange={PasswordChangeHandler} placeholder="Password" />
                                        </Form.Group>
                                        <small id="passwordHelp" className="text-danger form-text">
                                            {passwordError}
                                        </small>
                                    </Row>
                                    <br />
                                </Col>
                            </Row>
                            <Button variant='success' type="submit">Login</Button>
                            <br />
                        </Form>
                    </Card.Body>
                </Card>
                <span id="loginResult" className="text-danger form-text">{message}</span>
                <br />
                <br />
                <Form onSubmit={goToRegister}>
                    <Button variant='primary' type="submit">Go To Register</Button>
                </Form>
                <Form onSubmit={goToResetPassword}>
                    <Button variant='danger' type="submit">Reset Password</Button>
                </Form>
            </Container>
        </div>
    );
};

export default Login;
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
    //const [message, setMessage] = useState('');

    const NameChangeHandler = (event) => {
        setName(event.target.value);
    };

    const PasswordChangeHandler = (event) => {
        setPassword(event.target.value);
    };

    const goToRegister = async event => {
        event.preventDefault();
        localStorage.removeItem("user_data")
        window.location.href = '/register';
    };

    const doLogin = async event => {
        event.preventDefault();
        var obj = { login: userName, password: password };
        var js = JSON.stringify(obj);

        try {
            const response = await fetch(buildPath('api/login'), { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });
            var res = JSON.parse(await response.text());

            if (res.firstName === "") {
                //setMessage('User/Password combination incorrect');
            }
            else {
                var user = { firstName: res.firstName, lastName: res.lastName }
                localStorage.setItem('user_data', JSON.stringify(user));
                //setMessage('');

                window.location.href = '/home';
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
                <Card className="md-3" bg={'info'} text={'white'} style={{ color: "#000" }}>
                    <Form onSubmit={doLogin}>
                        <Row>
                            <Col>
                                <Row>
                                    <Form.Group controlId="form.userName">
                                        <Form.Control type='userName' value={userName} onChange={NameChangeHandler} placeholder="Username" />
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group controlId='form.password'>
                                        <Form.Control type='password' value={password} onChange={PasswordChangeHandler} placeholder="Password" />
                                    </Form.Group>
                                </Row>
                            </Col>
                        </Row>
                        <Button variant='success' type="submit">Login</Button>
                    </Form>
                </Card>
                <Form onSubmit={goToRegister}>
                    <Button variant='primary' type="submit">Register</Button>
                </Form>
            </Container>
        </div>
    );
};

export default Login;
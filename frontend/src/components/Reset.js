import React, { useState } from "react";
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

function Reset() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const EmailChangeHandler = (event) => {
        setEmail(event.target.value);
    };

    const cancelPasswordReset = async event => {
        event.preventDefault();
        window.location.href = '/';
    };

    const resetPassword = async event => {
        event.preventDefault();

        var obj = { email: email };
        var js = JSON.stringify(obj);

        const response = await fetch(buildPath('api/resetPassword'), { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });
        var res = JSON.parse(await response.text());

        if (res.results.matchedCount == 0) {
            console.log("ree");
            setMessage('Email not found. If you have not verified your email, check it so you can reset your password.');
            return;
        }

        setMessage('Password successfully reset. See your email for the details.');
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
            <Container className="center w-25 p-3 bggrey rounded-3">
                <Card className="bgwhite">
                    <Card.Header as="h5">Recover Password:</Card.Header>
                    <Card.Body>
                        <Form onSubmit={resetPassword}>
                            <Row>
                                <Col>
                                    <br />
                                    <Row>
                                        <Form.Group controlId="form.email">
                                            <Form.Control type='email' value={email} onChange={EmailChangeHandler} placeholder="Email" />
                                        </Form.Group>
                                    </Row>
                                    <br />
                                </Col>
                            </Row>
                            <Button variant='success' type="submit">Reset Password</Button>
                            <br />
                        </Form>
                    </Card.Body>
                </Card>
                <span id="resetResult" className="text-danger form-text">{message}</span>
                <br />
                <br />
                <Form onSubmit={cancelPasswordReset}>
                    <Button variant='danger' type="submit">Cancel</Button>
                </Form>
            </Container>
        </div>
    );
};

export default Reset;
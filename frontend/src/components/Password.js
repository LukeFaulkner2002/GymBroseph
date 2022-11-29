import React, { useEffect, useState } from "react";
import { Button, Form, Card, Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css'
import image from "../pictures/weightsblurred.jpg";
import LoginName from "./LoggedInName.js";

const app_name = 'gymbroseph'

function buildPath(route) {
    if (process.env.NODE_ENV === 'production') {
        return 'https://' + app_name + '.herokuapp.com/' + route;
    }
    else {
        return 'http://localhost:5000/' + route;
    }
}

function ResetPassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [oldPasswordError, setOldPasswordError] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    const [confirmNewPasswordError, setConfirmNewPasswordError] = useState('');
    const [message, setMessage] = useState('');
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        setIsValid(true);

        setOldPasswordError('');

        setConfirmNewPasswordError('');
        if (confirmNewPassword.length < 8) {
            setConfirmNewPasswordError('Password must be at least 8 symbols.');
            setIsValid(false);
        }
        if (newPassword != confirmNewPassword) {
            setConfirmNewPasswordError('Passwords do not match.');
            setIsValid(false);
        }

        setNewPasswordError("");
        if (newPassword.length < 8) {
            setNewPasswordError('Password must be at least 8 symbols.');
            setIsValid(false);
        }
    }, [oldPassword, newPassword, confirmNewPassword]);


    const OldPasswordChangeHandler = (event) => {
        setOldPassword(event.target.value);
    };

    const ConfirmNewPasswordChangeHandler = (event) => {
        setConfirmNewPassword(event.target.value);
    };

    const NewPasswordChangeHandler = (event) => {
        setNewPassword(event.target.value);
    };

    const cancelPasswordChange = async event => {
        event.preventDefault();
        window.location.href = '/home';
    };

    const resetPassword = async event => {
        event.preventDefault();

        console.log("changing pasword");
        console.log(isValid);

        if (isValid == true) {
            var _ud = localStorage.getItem('user_data');
            var ud = JSON.parse(_ud);
            var id = ud.id;
            var obj = { _id: id, oldPassword: oldPassword, newPassword: newPassword };
            var js = JSON.stringify(obj);

            const response = await fetch(buildPath('api/changePassword'), { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });
            var res = JSON.parse(await response.text());

            if (res.results.matchedCount == 0) {
                console.log("ree");
                setMessage('Old password invalid. Try again.');
                return;
            }

            setMessage('Password successfully reset.');
            return;
        }

        setMessage('At least one field is not valid.');
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
                    <Card.Header><Row className="text-center">Gymbroseph Exercise Manager</Row>
                        <Row><LoginName /></Row></Card.Header>
                </Card>
            </h1>
            <Container className="center w-25 p-3 bggrey rounded-3">
                <Card className="bgwhite">
                    <Card.Header as="h5">Reset Password:</Card.Header>
                    <Card.Body>
                        <Form onSubmit={resetPassword}>
                            <Row>
                                <Col>
                                    <br />
                                    <Row>
                                        <Form.Group controlId="form.oldPassword">
                                            <Form.Control type='password' value={oldPassword} onChange={OldPasswordChangeHandler} placeholder="Old Password" />
                                        </Form.Group>
                                        <small id="oldPasswordHelp" className="text-danger form-text">
                                            {oldPasswordError}
                                        </small>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Form.Group controlId='form.newPassword'>
                                            <Form.Control type='password' value={newPassword} onChange={NewPasswordChangeHandler} placeholder="New Password" />
                                        </Form.Group>
                                        <small id="newPasswordHelp" className="text-danger form-text">
                                            {newPasswordError}
                                        </small>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Form.Group controlId='form.confirmNewPassword'>
                                            <Form.Control type='password' value={confirmNewPassword} onChange={ConfirmNewPasswordChangeHandler} placeholder="Confirm New Password" />
                                        </Form.Group>
                                        <small id="confrimNewPasswordHelp" className="text-danger form-text">
                                            {confirmNewPasswordError}
                                        </small>
                                    </Row>
                                    <br />
                                </Col>
                            </Row>
                            <Button variant='success' type="submit">Reset Password</Button>
                            <br />
                        </Form>
                    </Card.Body>
                </Card>
                <span id="loginResult" className="text-danger form-text">{message}</span>
                <br />
                <br />
                <Form onSubmit={cancelPasswordChange}>
                    <Button variant='danger' type="submit">Go Back</Button>
                </Form>
            </Container>
        </div>
    );
};

export default ResetPassword;
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Row, Col, Card, Form } from "react-bootstrap";
import { Container, Table } from "react-bootstrap";
import image from "../pictures/equipmentblurred.jpg";
import '../App.css'
import data from "./data";
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

const Routines = () => {
    const [routine1, setRoutine1] = useState(data);
    const [routine2, setRoutine2] = useState(data);
    const [hasRoutine, setHasRoutine] = useState(0);

    useEffect(() => {
        const getRoutines = async event => {
            var _ud = localStorage.getItem('user_data');
            var ud = JSON.parse(_ud);
            var id = ud.id;
            var obj = { _id: id };
            var js = JSON.stringify(obj);

            try {
                const response = await fetch(buildPath('api/populateTable'), { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });
                var res = JSON.parse(await response.text());

                if (res.results !== "") {
                    setRoutine1(res.results[0]);
                    setRoutine2(res.results[1]);
                    setHasRoutine(1);
                }
            }
            catch (e) {
                alert(e.toString());
                return;
            }
        };

        getRoutines();
    }, []);

    const EditRoutineOne = (event, index) => {
        event.preventDefault();
        if (hasRoutine === 1) {
            localStorage.setItem('replacement_data', JSON.stringify(routine1[index]));
            localStorage.setItem('routine', 1);
            localStorage.setItem('index', index);
            window.location.href = '/search';
        }
    };

    const EditRoutineTwo = (event, index) => {
        event.preventDefault();
        if (hasRoutine === 1) {
            localStorage.setItem('replacement_data', JSON.stringify(routine2[index]));
            localStorage.setItem('routine', 2);
            localStorage.setItem('index', index);
            window.location.href = '/search';
        }
    };

    const logOut = async event => {
        event.preventDefault();
        localStorage.removeItem("user_data");
        localStorage.removeItem("replacement_data");
        localStorage.removeItem("index");
        localStorage.removeItem("routine");
        window.location.href = '/';
    };

    const changePassword = async event => {
        event.preventDefault();
        window.location.href = '/password';
    };

    const goToQuestionarre = async event => {
        event.preventDefault();
        window.location.href = '/questionarre';
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
            <Container className="w-50 h-75 p-3 bggrey rounded-3">
                <Card className="h-100 w-100 bgwhite">
                    <Card.Header as="h5">Routines:</Card.Header>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Complete?</th>
                                <th>Exercise</th>
                                <th>Warmup Required</th>
                                <th>Sets</th>
                                <th>Reps</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {routine1.map((exercise, index) => (
                                <tr key={index}>
                                    <td>{" "}
                                        <Form>
                                            {["checkbox"].map((type) => (
                                                <div key={`default-${type}`} className="mb-3">
                                                    <Form.Check type={type} id={`default-${type}`} />
                                                </div>
                                            ))}
                                        </Form></td>
                                    <td>{exercise.ExerciseName}</td>
                                    <td>{exercise.WarmUpReq}</td>
                                    <td>3</td>
                                    <td>8-12</td>
                                    <td><button type="button" onClick={(event) => EditRoutineOne(event, index)}>Replace</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Complete?</th>
                                <th>Exercise</th>
                                <th>Warmup Required</th>
                                <th>Sets</th>
                                <th>Reps</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {routine2.map((exercise, index) => (
                                <tr key={index}>
                                    <td>{" "}
                                        <Form>
                                            {["checkbox"].map((type) => (
                                                <div key={`default-${type}`} className="mb-3">
                                                    <Form.Check type={type} id={`default-${type}`} />
                                                </div>
                                            ))}
                                        </Form></td>
                                    <td>{exercise.ExerciseName}</td>
                                    <td>{exercise.WarmUpReq}</td>
                                    <td>3</td>
                                    <td>8-12</td>
                                    <td><button type="button" onClick={(event) => EditRoutineTwo(event, index)}>Replace</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <Row>
                        <Col>
                            <Form onSubmit={goToQuestionarre}>
                                <Button variant='primary' type="submit">Do Questionarre</Button>
                            </Form>
                        </Col>
                        <Col>
                            <Form onSubmit={changePassword}>
                                <Button variant='danger' type="submit">Change Password</Button>
                            </Form>
                        </Col>
                        <Col>
                            <Form onSubmit={logOut}>
                                <Button variant='danger' type="submit">Log Out</Button>
                            </Form>
                        </Col>
                    </Row>
                </Card>
            </Container>
        </div>
    );
};



export default Routines;

/*

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
            <Container className="center w-50 p-3 bgwhite rounded-3">
                <Col>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Complete?</th>
                                                <th>Exercise</th>
                                                <th>Warmup Required</th>
                                                <th>Sets</th>
                                                <th>Reps</th>
                                                <th>Edit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {routine1.map((exercise, index) => (
                                                <tr key={index}>
                                                    <td>{" "}
                                                        <Form>
                                                            {["checkbox"].map((type) => (
                                                                <div key={`default-${type}`} className="mb-3">
                                                                    <Form.Check type={type} id={`default-${type}`} />
                                                                </div>
                                                            ))}
                                                        </Form></td>
                                                    <td>{exercise.ExerciseName}</td>
                                                    <td>{exercise.WarmUpReq}</td>
                                                    <td>3</td>
                                                    <td>8-12</td>
                                                    <td><button type="button" onClick={(event) => EditRoutineOne(event, index)}>Replace</button></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Complete?</th>
                                                <th>Exercise</th>
                                                <th>Warmup Required</th>
                                                <th>Sets</th>
                                                <th>Reps</th>
                                                <th>Edit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {routine2.map((exercise, index) => (
                                                <tr key={index}>
                                                    <td>{" "}
                                                        <Form>
                                                            {["checkbox"].map((type) => (
                                                                <div key={`default-${type}`} className="mb-3">
                                                                    <Form.Check type={type} id={`default-${type}`} />
                                                                </div>
                                                            ))}
                                                        </Form></td>
                                                    <td>{exercise.ExerciseName}</td>
                                                    <td>{exercise.WarmUpReq}</td>
                                                    <td>3</td>
                                                    <td>8-12</td>
                                                    <td><button type="button" onClick={(event) => EditRoutineTwo(event, index)}>Replace</button></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Form onSubmit={goToQuestionarre}>
                        <Button variant='primary' type="submit">Do Questionarre</Button>
                    </Form>
                    <Form onSubmit={logOut}>
                        <Button variant='danger' type="submit">Log Out</Button>
                    </Form>
                </Col>
            </Container>
        </div>
    );

*/

/*
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
            <Container className="center w-50 p-3 bgwhite rounded-3">
                <Col>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Complete?</th>
                                                <th>Exercise</th>
                                                <th>Sets</th>
                                                <th>Reps</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    {" "}
                                                    <Form>
                                                        {["checkbox"].map((type) => (
                                                            <div key={`default-${type}`} className="mb-3">
                                                                <Form.Check type={type} id={`default-${type}`} />
                                                            </div>
                                                        ))}
                                                    </Form>
                                                </td>
                                                <td>
                                                </td>
                                                <td>3</td>
                                                <td>8-12</td>
                                                <td>
                                                    <Form onSubmit={goToSearch}>
                                                        <Button type='submit'>Replace</Button>
                                                    </Form>

                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {" "}
                                                    <Form>
                                                        {["checkbox"].map((type) => (
                                                            <div key={`default-${type}`} className="mb-3">
                                                                <Form.Check type={type} id={`default-${type}`} />
                                                            </div>
                                                        ))}
                                                    </Form>
                                                </td>
                                                <td></td>
                                                <td>3</td>
                                                <td>8-12</td>
                                                <td>
                                                    <Button>Replace</Button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {" "}
                                                    <Form>
                                                        {["checkbox"].map((type) => (
                                                            <div key={`default-${type}`} className="mb-3">
                                                                <Form.Check type={type} id={`default-${type}`} />
                                                            </div>
                                                        ))}
                                                    </Form>
                                                </td>
                                                <td></td>
                                                <td>3</td>
                                                <td>8-12</td>
                                                <td>
                                                    <Button>Replace</Button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {" "}
                                                    <Form>
                                                        {["checkbox"].map((type) => (
                                                            <div key={`default-${type}`} className="mb-3">
                                                                <Form.Check type={type} id={`default-${type}`} />
                                                            </div>
                                                        ))}
                                                    </Form>
                                                </td>
                                                <td>
                                                </td>
                                                <td>3</td>
                                                <td>8-12</td>
                                                <td>
                                                    <Button>Replace</Button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {" "}
                                                    <Form>
                                                        {["checkbox"].map((type) => (
                                                            <div key={`default-${type}`} className="mb-3">
                                                                <Form.Check type={type} id={`default-${type}`} />
                                                            </div>
                                                        ))}
                                                    </Form>
                                                </td>
                                                <td>
                                                </td>
                                                <td>3</td>
                                                <td>8-12</td>
                                                <td>
                                                    <Button>Replace</Button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {" "}
                                                    <Form>
                                                        {["checkbox"].map((type) => (
                                                            <div key={`default-${type}`} className="mb-3">
                                                                <Form.Check type={type} id={`default-${type}`} />
                                                            </div>
                                                        ))}
                                                    </Form>
                                                </td>
                                                <td>
                                                </td>
                                                <td>3</td>
                                                <td>8-12</td>
                                                <td>
                                                    <Button>Replace</Button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Complete?</th>
                                                <th>Exercise</th>
                                                <th>Sets</th>
                                                <th>Reps</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    {" "}
                                                    <Form>
                                                        {["checkbox"].map((type) => (
                                                            <div key={`default-${type}`} className="mb-3">
                                                                <Form.Check type={type} id={`default-${type}`} />
                                                            </div>
                                                        ))}
                                                    </Form>
                                                </td>
                                                <td></td>
                                                <td>3</td>
                                                <td>8-12</td>
                                                <td>
                                                    <Button>Replace</Button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {" "}
                                                    <Form>
                                                        {["checkbox"].map((type) => (
                                                            <div key={`default-${type}`} className="mb-3">
                                                                <Form.Check type={type} id={`default-${type}`} />
                                                            </div>
                                                        ))}
                                                    </Form>
                                                </td>
                                                <td></td>
                                                <td>3</td>
                                                <td>8-12</td>
                                                <td>
                                                    <Button>Replace</Button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {" "}
                                                    <Form>
                                                        {["checkbox"].map((type) => (
                                                            <div key={`default-${type}`} className="mb-3">
                                                                <Form.Check type={type} id={`default-${type}`} />
                                                            </div>
                                                        ))}
                                                    </Form>
                                                </td>
                                                <td></td>
                                                <td>3</td>
                                                <td>8-12</td>
                                                <td>
                                                    <Button>Replace</Button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {" "}
                                                    <Form>
                                                        {["checkbox"].map((type) => (
                                                            <div key={`default-${type}`} className="mb-3">
                                                                <Form.Check type={type} id={`default-${type}`} />
                                                            </div>
                                                        ))}
                                                    </Form>
                                                </td>
                                                <td></td>
                                                <td>3</td>
                                                <td>8-12</td>
                                                <td>
                                                    <Button>Replace</Button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {" "}
                                                    <Form>
                                                        {["checkbox"].map((type) => (
                                                            <div key={`default-${type}`} className="mb-3">
                                                                <Form.Check type={type} id={`default-${type}`} />
                                                            </div>
                                                        ))}
                                                    </Form>
                                                </td>
                                                <td></td>
                                                <td>3</td>
                                                <td>8-12</td>
                                                <td>
                                                    <Button>Replace</Button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {" "}
                                                    <Form>
                                                        {["checkbox"].map((type) => (
                                                            <div key={`default-${type}`} className="mb-3">
                                                                <Form.Check type={type} id={`default-${type}`} />
                                                            </div>
                                                        ))}
                                                    </Form>
                                                </td>
                                                <td></td>
                                                <td>3</td>
                                                <td>8-12</td>
                                                <td>
                                                    <Button>Replace</Button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Form onSubmit={goToQuestionarre}>
                        <Button variant='primary' type="submit">Do Questionarre</Button>
                    </Form>
                    <Form onSubmit={logOut}>
                        <Button variant='danger' type="submit">Log Out</Button>
                    </Form>
                </Col>
            </Container>
        </div>
    );
};

export default Routines;
*/

/*

</Table>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Complete?</th>
                                                <th>Exercise</th>
                                                <th>Sets</th>
                                                <th>Reps</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    {" "}
                                                    <Form>
                                                        {["checkbox"].map((type) => (
                                                            <div key={`default-${type}`} className="mb-3">
                                                                <Form.Check type={type} id={`default-${type}`} />
                                                            </div>
                                                        ))}
                                                    </Form>
                                                </td>
                                                <td>
                                                </td>
                                                <td>3</td>
                                                <td>8-12</td>
                                                <td>
                                                    <Form onSubmit={goToSearch}>
                                                        <Button type='submit'>Replace</Button>
                                                    </Form>

                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {" "}
                                                    <Form>
                                                        {["checkbox"].map((type) => (
                                                            <div key={`default-${type}`} className="mb-3">
                                                                <Form.Check type={type} id={`default-${type}`} />
                                                            </div>
                                                        ))}
                                                    </Form>
                                                </td>
                                                <td></td>
                                                <td>3</td>
                                                <td>8-12</td>
                                                <td>
                                                    <Button>Replace</Button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {" "}
                                                    <Form>
                                                        {["checkbox"].map((type) => (
                                                            <div key={`default-${type}`} className="mb-3">
                                                                <Form.Check type={type} id={`default-${type}`} />
                                                            </div>
                                                        ))}
                                                    </Form>
                                                </td>
                                                <td></td>
                                                <td>3</td>
                                                <td>8-12</td>
                                                <td>
                                                    <Button>Replace</Button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {" "}
                                                    <Form>
                                                        {["checkbox"].map((type) => (
                                                            <div key={`default-${type}`} className="mb-3">
                                                                <Form.Check type={type} id={`default-${type}`} />
                                                            </div>
                                                        ))}
                                                    </Form>
                                                </td>
                                                <td>
                                                </td>
                                                <td>3</td>
                                                <td>8-12</td>
                                                <td>
                                                    <Button>Replace</Button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {" "}
                                                    <Form>
                                                        {["checkbox"].map((type) => (
                                                            <div key={`default-${type}`} className="mb-3">
                                                                <Form.Check type={type} id={`default-${type}`} />
                                                            </div>
                                                        ))}
                                                    </Form>
                                                </td>
                                                <td>
                                                </td>
                                                <td>3</td>
                                                <td>8-12</td>
                                                <td>
                                                    <Button>Replace</Button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {" "}
                                                    <Form>
                                                        {["checkbox"].map((type) => (
                                                            <div key={`default-${type}`} className="mb-3">
                                                                <Form.Check type={type} id={`default-${type}`} />
                                                            </div>
                                                        ))}
                                                    </Form>
                                                </td>
                                                <td>
                                                </td>
                                                <td>3</td>
                                                <td>8-12</td>
                                                <td>
                                                    <Button>Replace</Button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>

    */

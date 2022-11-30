//pictures course: https://www.pexels.com/@goumbik/
import { React } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Row, Col, Form, ButtonGroup, Dropdown, Container, Card } from "react-bootstrap";
import { useState } from "react";
import image from "../pictures/glovesblurred.jpg";
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

const Questionarre = () => {
    const [theme, setTheme] = useState('');
    const [equipment, setEquipment] = useState('');
    const [time, setTime] = useState('');
    const [muscles, setMuscles] = useState('');

    const submitQuestionarre = async event => {
        event.preventDefault();

        var _ud = localStorage.getItem('user_data');
        var ud = JSON.parse(_ud);
        var warmup = "";

        if (time === "30+ Minutes") {
            warmup = "Y";
        }

        if (time === "10 Minutes") {
            warmup = "N";
        }

        console.log(ud);
        var obj = { equipment: equipment, time: warmup, muscleGroup: muscles, _id: ud.id };
        var js = JSON.stringify(obj);
        console.log(js);

        try {
            const response = await fetch(buildPath('api/autoFillRoutines'), { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });
            var res = JSON.parse(await response.text());
            console.log(res);
        }
        catch (e) {
            alert(e.toString());
            return;
        }

        setTheme("success");
        setTheme(null);
        setEquipment(null);
        setTime(null);
        setMuscles(null);
        window.location.href = '/home';
    };

    const cancelQuestionarre = async event => {
        event.preventDefault();
        setTheme("danger");
        setTheme(null);
        setEquipment(null);
        setTime(null);
        setMuscles(null);
        window.location.href = '/home';
    };

    // backgroundImage: `url(${process.env.PUBLIC_URL + '/image.png'})`
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
                        <Row><LoginName/></Row></Card.Header>
                </Card>
            </h1>
            <Container className="w-50 p-3 bggrey rounded-3">
                <Card className="bgwhite">
                    <Card.Header as="h5">Randomizer Questionnare:</Card.Header>
                    <Form onSubmit={submitQuestionarre}>
                        <br />
                        <Row>
                            <Dropdown as={ButtonGroup} size="lg">
                                <Button className="text-capitalize">
                                    {equipment ? equipment : "Equipment Availability"}
                                </Button>
                                <Dropdown.Toggle
                                    split
                                    variant={theme ? theme : "info"}
                                    id="dropdown-split-basic"
                                />
                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="1" onClick={() => setEquipment("Home Gym")}>
                                        Home Gym
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="2" onClick={() => setEquipment("Community Gym")}>
                                        Community Gym
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="3" onClick={() => setEquipment("Commercial Gym")}>
                                        Commercial Gym
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item
                                        eventKey="4"
                                        onClick={() => setEquipment("")}
                                    >
                                        Equipment Availability
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Row>
                        <br />
                        <Row>
                            <Dropdown as={ButtonGroup} size="lg">
                                <Button className="text-capitalize">
                                    {muscles ? muscles : "Muscle Group"}
                                </Button>
                                <Dropdown.Toggle
                                    split
                                    variant={theme ? theme : "info"}
                                    id="dropdown-split-basic"
                                />
                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        eventKey="1"
                                        onClick={() => setMuscles("Upper Body")}
                                    >
                                        Upper Body
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        eventKey="2"
                                        onClick={() => setMuscles("Lower Body")}
                                    >
                                        Lower Body
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item
                                        eventKey="3"
                                        onClick={() => setMuscles("")}
                                    >
                                        Muscle Group
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Row>
                        <br />
                        <Row>
                            <Dropdown as={ButtonGroup} size="lg">
                                <Button className="text-capitalize">
                                    {time ? time : "Workout Duration"}
                                </Button>
                                <Dropdown.Toggle
                                    split
                                    variant={theme ? theme : "info"}
                                    id="dropdown-custom-1"
                                />
                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        eventKey="1"
                                        onClick={() => setTime("10 Minutes")}
                                    >
                                        10 Minutes
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        eventKey="2"
                                        onClick={() => setTime("30+ Minutes")}
                                    >
                                        30+ Minutes
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item
                                        eventKey="3"
                                        onClick={() => setTime("")}
                                    >
                                        Workout Duration
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <Button
                                    className="text-capitalize"
                                    variant={theme ? theme : "success"}
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                        <br />
                    </Form>
                </Card>
                <br />
                <br />
                <Col>
                    <Form onSubmit={cancelQuestionarre}>
                        <Button variant='danger' type="submit">Cancel</Button>
                    </Form>
                </Col>
            </Container>
        </div>
    );
};

export default Questionarre;

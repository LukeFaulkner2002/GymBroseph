//pictures course: https://www.pexels.com/@goumbik/
import { React, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Row, Col, Form } from "react-bootstrap";
import { useState } from "react";
import { ButtonGroup, Dropdown, Container } from "react-bootstrap";
import image from "../pictures/glovesblurred.jpg";

const Questionarre = () => {
    const [theme, setTheme] = useState(null); //answer 1
    const [equipment, setEquipment] = useState(null);
    const [time, setTime] = useState(null);
    const [muscles, setMuscles] = useState(null);
    //answer 2
    //etc.

    useEffect(() => {
        // calls on page load
        console.log("loaded");
    });

    const submitQuestionarre = async event => {
        //Call api
        event.preventDefault();
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
                backgroundRepeat: "no-repeat"
            }}
        >
            <Container className="center w-50 p-3 bgwhite rounded-3">
                <Form onSubmit={submitQuestionarre}>
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
                                <Dropdown.Item
                                    eventKey="1"
                                    onClick={() => setEquipment("Home")}
                                >
                                    Home
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="2" onClick={() => setEquipment("Gym")}>
                                    Gym
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item
                                    eventKey="4"
                                    onClick={() => setEquipment("Equipment Availability")}
                                >
                                    Equipment Availability
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Row>
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
                                <Dropdown.Item eventKey="3" onClick={() => setMuscles("Core")}>
                                    Core
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item
                                    eventKey="4"
                                    onClick={() => setMuscles("Muscle Group")}
                                >
                                    Muscle Group
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Row>
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
                                    onClick={() => setTime("30 Minutes")}
                                >
                                    30 Minutes
                                </Dropdown.Item>
                                <Dropdown.Item
                                    eventKey="3"
                                    onClick={() => setTime("60 Minutes")}
                                >
                                    60 Minutes
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item
                                    eventKey="4"
                                    onClick={() => setTime("Workout Duration")}
                                >
                                    Workout Duration
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Row>
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
                </Form>
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

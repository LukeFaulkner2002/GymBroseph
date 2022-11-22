import { React } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Row, Col, Card, Form } from "react-bootstrap";
import { Container, Table } from "react-bootstrap";
import image from "../pictures/equipmentblurred.jpg";
import '../App.css'

const ThemeSwitcher = () => {
    // backgroundImage: `url(${process.env.PUBLIC_URL + '/image.png'})`

    const logOut = async event => {
        event.preventDefault();
        localStorage.removeItem("user_data")
        window.location.href = '/';
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
            <Container className="center w-50 p-3 bgwhite rounded-3">
                <Col>
                    <Row>
                        <Card>
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
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
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
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
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
                                        <td>Larry Bird</td>
                                        <td>Larry Bird</td>
                                        <td>@twitter</td>
                                        <td>
                                            <Button>Replace</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card>
                    </Row>
                    <Row>
                        <Card>
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
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
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
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
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
                                        <td>Larry Bird</td>
                                        <td>@twitter</td>
                                        <td>@twitter</td>
                                        <td>
                                            <Button>Replace</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card>
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

export default ThemeSwitcher;

/*
//import React, { useState } from 'react';
import { Button, Form, Card, Container, Row, Col, Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css'


const app_name = 'gymbroseph'

function buildPath(route)
{
    if (process.env.NODE_ENV === 'production') 
    {
        return 'https://' + app_name +  '.herokuapp.com/' + route;
    }
    else
    {        
        return 'http://localhost:5000/' + route;
    }
}


function Home()
{
    const logOut = async event => 
    {
        event.preventDefault();
        localStorage.removeItem("user_data")
        window.location.href = '/';
    };

    return(
        <div id="loginDiv">
            <Container>
                <Row>
                    <Col>
                        <Card className="md-3" text={'white'} style = {{color:"#000"}}>
                            <Table striped bordered hover>
                                <thead>
                                    <td colSpan={3}>Day 1</td>
                                    <tr>
                                    <th></th>
                                    <th>Exercise</th>
                                    <th>Sets</th>
                                    <th>Reps</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td></td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    </tr>
                                    <tr>
                                    <td></td>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                    </tr>
                                    <tr>
                                    <td></td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="md-3" text={'white'} style = {{color:"#000"}}>
                            <Table striped bordered hover>
                                <thead>
                                    <td colSpan={3}>Day 2</td>
                                    <tr>
                                    <th></th>
                                    <th>Exercise</th>
                                    <th>Sets</th>
                                    <th>Reps</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td></td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    </tr>
                                    <tr>
                                    <td></td>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                    </tr>
                                    <tr>
                                    <td></td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <footer className="text-center">
                <Form onSubmit={logOut}>
                    <Button variant='primary' type="submit">Log Out</Button>
                </Form>
            </footer>
        </div>
    );
}

export default Home;
*/
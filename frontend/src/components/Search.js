import defaultResults from "./defaultSearch";
import { Container, Row, Form, Card, Col, Dropdown, ButtonGroup, Button, Table, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import image from "../pictures/equipmentblurred.jpg";
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

const Search = () => {

    const [list, setList] = useState(defaultResults);
    const [oldExercise, setOldExercise] = useState({ _id: 0, ExerciseName: "Default" });
    const [equipment, setEquipment] = useState("");
    const [time, setTime] = useState("");
    const [muscles, setMuscles] = useState("");
    const [searchText, setSearchText] = useState('');
    const [pageNum, setPageNum] = useState(0);
    const [show, setShow] = useState(false);
    const [newIndex, setNewIndex] = useState(0);
    const [validSearch, setValidSearch] = useState(true);

    const SearchChangeHandler = (event) => {
        event.preventDefault();
        setPageNum(0);
        setSearchText(event.target.value);
    };

    const EquipmentChangeHandler = (event, string) => {
        event.preventDefault();
        setPageNum(0);
        setEquipment(string);
    };

    const MuscleChangeHandler = (event, string) => {
        event.preventDefault();
        setPageNum(0);
        setMuscles(string);
    };

    const TimeChangeHandler = (event, string) => {
        event.preventDefault();
        setPageNum(0);
        setTime(string);
    };

    const RightPageChangeHandler = (event, string) => {
        event.preventDefault();
        if (list.length === 10) {
            setPageNum(pageNum + 1);
        }
    };

    const LeftPageChangeHandler = (event, string) => {
        event.preventDefault();
        if (pageNum > 0) {
            setPageNum(pageNum - 1);
        }
    };

    const HandleReplace = (event, index) => {
        event.preventDefault();
        if (validSearch === true) {
            setNewIndex(index);
            setShow(true);
        }
    };

    const HandleClose = () => {
        setShow(false);
    };

    const cancelSearch = async event => {
        event.preventDefault();
        localStorage.removeItem("replacement_data");
        window.location.href = '/home';
    };

    const ReplaceExercise = async (event, index) => {
        event.preventDefault();

        //User ID
        var _ud = localStorage.getItem('user_data');
        var ud = JSON.parse(_ud);
        var _id = ud.id;

        //Old exercise index in old routine
        var oldIndex = localStorage.getItem('index');

        //User routine being modified
        var routineNum = localStorage.getItem('routine');

        //_id of the new exercise
        var newId = list[newIndex]._id;

        var obj = { _id: _id, routineNum: routineNum, routineIndex: oldIndex, newExerciseId: newId };
        var js = JSON.stringify(obj);

        localStorage.removeItem("index");
        localStorage.removeItem("routine");

        const response = await fetch(buildPath('api/replaceExercise'), { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });
        var res = JSON.parse(await response.text());
        console.log(res);
        window.location.href = '/home';
    };

    useEffect(() => {

        const createSearch = async event => {
            var _rd = localStorage.getItem('replacement_data');
            var rd = JSON.parse(_rd);
            setOldExercise(rd);

            var obj = {
                searchText: searchText,
                equipment: equipment,
                muscleGroup: muscles,
                warmUpReq: time,
                pageNum: pageNum
            }
            var js = JSON.stringify(obj);
            console.log(js);

            try {
                const response = await fetch(buildPath('api/searchExercises'), { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });
                var res = JSON.parse(await response.text());
                var sd = JSON.parse(JSON.stringify(res));

                if (sd.results.length === 0) {
                    setList(defaultResults);
                    setValidSearch(false);
                }
                else {
                    setList(sd.results);
                    setValidSearch(true);
                }
            }
            catch (e) {
                alert(e.toString());
                return;
            }
        };

        createSearch();
    }, [searchText, time, muscles, equipment, pageNum]);

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
            <Modal show={show} onHide={HandleClose}>
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title>Replace this exercise?</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Change "{oldExercise.ExerciseName}" to "{list[newIndex].ExerciseName}"?</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={HandleClose}>Cancel</Button>
                        <Button variant="primary" onClick={ReplaceExercise}>Replace</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
            <Container className="p-3 w-50 bggrey rounded-3">
                <Card className="bgwhite">
                    <Card.Header as="h5">Replace "{oldExercise.ExerciseName}" with what?</Card.Header>
                    <Card.Body>
                        <Row>
                            <br />
                            <Col>
                                <Form.Group>
                                    <Form.Control type='searchtext' value={searchText} onChange={SearchChangeHandler} placeholder="Search" />
                                </Form.Group>
                            </Col>
                            <br />
                            <br />
                            <Row>
                                <Dropdown as={ButtonGroup} size="lg">
                                    <Button className="text-capitalize">
                                        {equipment ? equipment : "Equipment Availability"}
                                    </Button>
                                    <Dropdown.Toggle split id="dropdown-split-basic" />
                                    <Dropdown.Menu>
                                        <Dropdown.Item eventKey="1" onClick={(event) => EquipmentChangeHandler(event, "Home Gym")}>
                                            Home Gym
                                        </Dropdown.Item>
                                        <Dropdown.Item eventKey="2" onClick={(event) => EquipmentChangeHandler(event, "Community Gym")}>
                                            Community Gym
                                        </Dropdown.Item>
                                        <Dropdown.Item eventKey="3" onClick={(event) => EquipmentChangeHandler(event, "Commercial Gym")}>
                                            Commercial Gym
                                        </Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item eventKey="4" onClick={(event) => EquipmentChangeHandler(event, "")}>
                                            Equipment Availability
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Dropdown as={ButtonGroup} size="lg">
                                    <Button className="text-capitalize">
                                        {muscles ? muscles : "Muscle Group"}
                                    </Button>
                                    <Dropdown.Toggle split id="dropdown-split-basic" />
                                    <Dropdown.Menu>
                                        <Dropdown.Item eventKey="1" onClick={(event) => MuscleChangeHandler(event, "Chest")}>
                                            Chest
                                        </Dropdown.Item>
                                        <Dropdown.Item eventKey="2" onClick={(event) => MuscleChangeHandler(event, "Triceps")}>
                                            Triceps
                                        </Dropdown.Item>
                                        <Dropdown.Item eventKey="3" onClick={(event) => MuscleChangeHandler(event, "Shoulders")}>
                                            Shoulders
                                        </Dropdown.Item>
                                        <Dropdown.Item eventKey="4" onClick={(event) => MuscleChangeHandler(event, "Back")}>
                                            Back
                                        </Dropdown.Item>
                                        <Dropdown.Item eventKey="5" onClick={(event) => MuscleChangeHandler(event, "Biceps")}>
                                            Biceps
                                        </Dropdown.Item>
                                        <Dropdown.Item eventKey="6" onClick={(event) => MuscleChangeHandler(event, "Traps")}>
                                            Traps
                                        </Dropdown.Item>
                                        <Dropdown.Item eventKey="7" onClick={(event) => MuscleChangeHandler(event, "Lats")}>
                                            Lats
                                        </Dropdown.Item>
                                        <Dropdown.Item eventKey="8" onClick={(event) => MuscleChangeHandler(event, "Quads")}>
                                            Quads
                                        </Dropdown.Item>
                                        <Dropdown.Item eventKey="9" onClick={(event) => MuscleChangeHandler(event, "Hamstrings")}>
                                            Hamstrings
                                        </Dropdown.Item>
                                        <Dropdown.Item eventKey="10" onClick={(event) => MuscleChangeHandler(event, "Glutes")}>
                                            Glutes
                                        </Dropdown.Item>
                                        <Dropdown.Item eventKey="11" onClick={(event) => MuscleChangeHandler(event, "Calves")}>
                                            Calves
                                        </Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item eventKey="12" onClick={(event) => MuscleChangeHandler(event, "")}>
                                            Muscle Group
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                                <Dropdown as={ButtonGroup} size="lg">
                                    <Button className="text-capitalize">
                                        {time ? time : "Warm Up Requirement"}
                                    </Button>
                                    <Dropdown.Toggle split id="dropdown-custom-1" />
                                    <Dropdown.Menu>
                                        <Dropdown.Item eventKey="1" onClick={(event) => TimeChangeHandler(event, "Y")}>
                                            Yes
                                        </Dropdown.Item>
                                        <Dropdown.Item eventKey="2" onClick={(event) => TimeChangeHandler(event, "N")}>
                                            No
                                        </Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item eventKey="3" onClick={(event) => TimeChangeHandler(event, "")}>
                                            Warm Up Requirement
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Row>
                        </Row>
                        <br />
                        <Card className="h-100 w-100">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Muscle</th>
                                        <th>Accessibility</th>
                                        <th>Warmup</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {list.map((exercise, index) => (
                                        <tr key={index}>
                                            <td><button type="button" onClick={(event) => HandleReplace(event, index)}>Replace</button></td>
                                            <td>{exercise.ExerciseName}</td>
                                            <td>{exercise.MuscleGroup}</td>
                                            <td>{exercise.Accessibility}</td>
                                            <td>{exercise.WarmUpReq}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Card.Footer>
                                <Button type='button' variant='primary' onClick={(event) => LeftPageChangeHandler(event)}>
                                    Back
                                </Button>
                                Page {pageNum + 1}
                                <Button type='button' variant='primary' onClick={(event) => RightPageChangeHandler(event)}>
                                    Next
                                </Button>
                            </Card.Footer>
                        </Card>
                        <br />
                        <br />
                        <Button type='button' variant='danger' onClick={(event) => cancelSearch(event)}>
                            Cancel
                        </Button>

                        <br />

                    </Card.Body>
                </Card>
            </Container>
        </div >
    );
};

export default Search;

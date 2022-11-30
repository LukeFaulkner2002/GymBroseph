import defaultResults from "./defaultSearch";
import { Container, Row, Form, Card, Col, Dropdown, ButtonGroup, Button, Table, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import image from "../pictures/equipmentblurred.jpg";
import LoginName from "./LoggedInName.js";
import useWindowDimensions from "./window";
const el = document.getElementsByTagName('path');

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

    const { height, width } = useWindowDimensions();
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

    var count = 0;

    const call1 = (event) => {
        console.log(event.target.getAttribute("id"));

        count = (count % 2) + 1;
        if (event.target.getAttribute("fill") === "green") {
            event.target.setAttribute("fill", "#D8D8D8");
            MuscleChangeHandler(event, "");
            return;
        }
        for (const item of el) {
            if (item.getAttribute("fill") === "green") {
                item.setAttribute("fill", "#D8D8D8");
            }
        }
        event.target.setAttribute("fill", "green");
        MuscleChangeHandler(event, event.target.getAttribute("id"));
    };

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

    /*
    const MuscleChangeHandler = (event, string) => {
        event.preventDefault();
        setPageNum(0);
        setMuscles(string);
    };
    */
   
    const MuscleChangeHandler = (event, string) => {
        event.preventDefault();
        var shape = document.getElementById(string);
        var clears = document.getElementsByTagName("path");
        for (const item of clears) {
              if(item.getAttribute("fill")==="green"){
            item.setAttribute("fill","#D8D8D8");
              }
        }
        if(shape!== null)
        shape.setAttribute("fill","green");
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
                <Container height={height}>
                    <div className="App" style={{ height: width }}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="81.42 -506.806 770.27 1340.287"
                        >
                            <g className="quads" stroke="#000" onClick={call1}>
                                <path
                                    id="Quads"
                                    fill="#D8D8D8"
                                    d="M328.576 356.879c-6.205-28.471-18.616-58.31-18.616-88.737 0-5.471-1.473-23.018-.62-32.268 1.189-12.886 2.714-41.192 4.964-57.71 1.366-10.03 1.566-19.91 4.344-29.166 2.51-8.365 3.089-19.677 5.585-27.304 3.018-9.223 7.747-23.851 8.066-25.441 1.452-7.242 7.446-22.333 9.308-29.166 1.16-4.259 7.447-14.783 7.447-22.96 24.865 23.049 40.612 33.442 59.572 57.09 3.491 4.355 9.801 16.298 16.134 22.339 7.53 7.182 15.977 25.443 25.442 31.648 2.964 5.925 2.58 19.954 3.724 27.924 1.144 7.97.129 14.93-1.242 22.339-2.943 15.902-7.057 48.748-9.928 64.536-1.93 10.611-1.329 20.832-4.964 31.648-2.65 7.884-6.082 31.205-10.55 39.094-3.677 6.492-4.148 18.419-8.688 26.063-3.047 5.13-1.506 34.75-4.964 34.75-4.235 4.236-12.749 2.428-18.616.62-5.463-1.684-15.325-4.155-17.375-6.205-6.143-6.143-15.54-8.093-21.098-13.652-4.78-4.779-22.56-21.719-27.925-25.442zM584.238 48.126c-5.594 11.188-25.424 19.84-35.991 30.406-15.35 15.349-27.058 31.899-38.474 49.023-3.76 5.641-21.719 20.632-21.719 24.822-13.626 9.083-5.944 35.964-5.584 48.402.27 9.313 3.09 23.991 4.964 31.027 2.574 9.662 3.313 20.984 5.585 27.304 2.437 6.78 1.536 14.739 1.861 21.098.593 11.607.713 14.498 3.104 27.303 2.462 13.185 6.904 24.079 9.927 34.13 4.08 13.567 8.517 22.453 11.791 35.371 1.649 6.507-3.678 24.245.621 28.544.5.501 9.446-2.161 11.79-3.102 5.185-2.082 18.511-4.068 26.062-6.826 16.288-5.95 47.481-20.654 49.643-38.474 2.088-17.207 11.247-40.583 11.17-53.987-.074-12.867 2.934-27.466 4.021-45.168 1.035-16.854.213-36.753-2.159-51.635-2.497-15.662-.315-20.359-3.723-35.991-2.595-11.903-3.611-21.469-4.344-24.822-3.299-15.09-4.194-25.967-9.929-40.336-5.224-13.089-9.496-28.998-14.892-42.196-2.391-5.849-.712-13.387-3.724-14.893z"
                                ></path>
                            </g>
                            <g className="calves" stroke="#000" onClick={call1}>
                                <path
                                    id="Calves"
                                    fill="#D8D8D8"
                                    d="M363.326 754.99c0-24.508-20.352-70.99-4.964-101.768 26.44-52.882 38.474-123.911 38.474-192.988 0-5.373-17.595 1.135-26.063-6.206-6.765-5.864-9.942-9.919-13.652-15.513-3.695-5.571 3.103-9.307-9.308-11.169-7.505-1.126-1.799.962-13.032 9.307-6.826 8.814-5.993 6.614-10.549 11.17-1.22 1.221-3.858 15.581-6.205 29.786-.833 5.044-3.723 20.796-6.205 32.268-1.739 10.147-6.161 23.928-8.688 36.543-1.812 9.047-.62 20.258-.62 23.58 0 24.806 2.632 46.993 8.067 68.26 4.079 15.961 2.154 11.858 5.585 30.406 2.525 13.65 1.989 35.006 4.343 39.715.367.734 3 1.534-3.103 9.928-8.063 11.09-4.839 19.485-6.825 20.478-5.836 2.919-1.585 7.934-6.826 17.996-3.289 6.314-3.993 14.717-7.447 20.478-3.841 6.408-8.157 17.465-14.893 24.201-.433.433-8.337 18.481-4.344 20.477 9.607 4.804 46.039 16.386 60.193 9.309 5.96-2.98 8.538-11.716 12.411-13.652 7.693-3.847-.406-25.656 4.344-35.991 4.532-9.86 9.307-14.65 9.307-26.615zM550.108 454.649c10.036-6.022 13.536-2.113 21.72-6.205 3.463-1.731 12.066-23.443 15.513-21.719 2.487 1.243 8.01 3.033 12.466 6.488 5.484 4.251 9.991 10.384 12.976 13.369 4.241 4.241-2.378 17.479 1.242 24.201 1.602 2.974 4.666 21.57 6.205 26.684 2.222 7.384 1.856 15.496 4.344 22.96 4.867 14.601 6.205 31.366 6.205 48.402 0 13.16-3.438 44.919-5.584 55.849-3.445 17.546-.902 11.731-3.103 19.856-2.489 9.191-2.443 23.64-4.965 31.648-2.853 9.059-5.824 35.973-3.102 44.058 2.286 6.791 8.266 18.398 11.789 27.304 5.483 13.863 10.714 42.75 23.581 52.746 6.36 4.941 17.878 19.296 10.55 22.96-3.731 1.865-21.352 4.964-24.822 4.964-12.744 0-34.612 5.356-43.438-3.723-9.612-9.887-6.751-25.829-7.446-35.991-.915-13.378-12.487-21.478-11.607-33.314 1.171-15.755 8.504-31.94 8.504-47.356 0-16.101 1.82-35.454-3.723-46.541-1.648-3.296-2.412-9.859-5.585-19.237-2.815-8.322-5.271-8.82-8.067-20.477-.313-1.307-6.136-14.816-8.068-19.237-4.548-10.406-3.739-14.7-8.066-27.304-2.463-7.175-.371-8.808-4.344-16.754-.838-1.677-1.719-13.314-2.482-23.581-.773-10.41-.546-14.004-1.242-19.237-2.497-18.781-3.102-41.137-3.102-58.951 0 3.202 13.653-5.397 13.651-1.862z"
                                ></path>
                            </g>
                            <g className="biceps" stroke="#000" onClick={call1}>
                                <path
                                    id="Biceps"
                                    fill="#D8D8D8"
                                    d="M598.511-189.541c0 29.634 5.508 59.258 13.031 80.051 1.195 3.304 4.099 19.236 14.273 27.923 12.885 7.645 9.071 2.266 19.236 8.067 6.154 3.512 11.941 4.237 18.617 8.687 1.375.917 15.901 6.439 16.134 6.206 2.877-2.877 3.757-18.912 4.964-26.062 1.489-8.825.482-31.199-1.241-37.233-2.728-9.554-2.548-13.979-4.962-24.322-2.03-8.692-7.424-17.182-8.69-20.978-2.042-6.125-4.81-11.403-10.501-14.948-7.154-4.457-17.486-6.897-20.526-12.976-3.46-6.919-14.545-9.034-23.299-7.563-9.739 1.636-17.036 7.561-17.036 13.148zM335.453-189.136c0 29.634-5.508 59.258-13.03 80.051-1.196 3.304-4.1 19.236-14.274 27.923-12.885 7.645-9.07 2.266-19.236 8.067-6.154 3.512-11.94 4.237-18.617 8.687-1.375.917-15.9 6.44-16.134 6.206-2.877-2.877-3.757-18.912-4.964-26.062-1.489-8.825-.482-31.199 1.241-37.233 2.728-9.554 2.548-13.979 4.962-24.322 2.03-8.692 7.424-17.182 8.69-20.978 2.042-6.125 4.81-11.403 10.501-14.948 7.154-4.457 17.486-6.897 20.526-12.976 3.46-6.919 14.545-9.034 23.3-7.563 9.738 1.636 17.035 7.561 17.035 13.148z"
                                ></path>
                            </g>
                            <g className="shoulders" stroke="#000" onClick={call1}>
                                <path
                                    id="Shoulders"
                                    fill="#D8D8D8"
                                    d="M538.939-291.93c18.752-18.752 60.033-11.45 84.947-1.271 13.529 5.528 14.376 7.718 21.786 14.303 10.678 9.49 8.662 16.729 13.652 28.545 2.825 6.69 3.971 25.539-.621 45.299-.696 2.995-.659 15.514-2.482 15.514-7.83-.003-17.582-10.151-22.34-13.032-10.678-6.464-18.846-3.838-22.339-5.585-4.461-2.23-7.109-14.386-9.929-18.616-4.069-6.103-7.63-12.418-13.352-20.785-5.294-7.741-10.843-17.686-15.813-20.171-3.023-1.512-6.092-10.005-13.179-14.558-8.212-5.277-20.33-6.754-20.33-9.643zM394.966-290.689c-18.752-18.752-60.033-11.45-84.947-1.27-13.529 5.527-14.376 7.717-21.786 14.302-10.678 9.49-8.662 16.73-13.652 28.545-2.825 6.69-3.97 25.54.621 45.3.696 2.994.66 15.513 2.482 15.513 7.83-.003 17.582-10.15 22.34-13.032 10.678-6.464 18.846-3.838 22.34-5.585 4.46-2.23 7.108-14.386 9.928-18.616 4.07-6.103 7.63-12.418 13.352-20.785 5.294-7.74 10.843-17.686 15.813-20.17 3.023-1.513 6.092-10.006 13.18-14.559 8.211-5.277 20.33-6.754 20.33-9.643z"
                                ></path>
                            </g>
                            <g className="traps" stroke="#000" onClick={call1}>
                                <path
                                    id="Traps"
                                    fill="#D8D8D8"
                                    d="M372.014-304.892c14.735-10.232 24.623-9.149 38.473-19.857 12.486-9.654 8.161-35.371 14.893-35.371 2.648 28.845 22.029 46.177 24.822 68.259-8.688-2.546-12.004-3.958-21.099-6.825-14.324-4.516-11.69-3.678-25.679-4.625-16.921-1.145-13.865.108-31.41-1.581zM562.52-304.892c-14.735-10.232-24.623-9.149-38.473-19.857-12.486-9.654-8.161-35.371-14.893-35.371-2.648 28.845-22.029 46.177-24.822 68.259 8.688-2.546 12.004-3.958 21.099-6.825 14.324-4.516 11.69-3.678 25.679-4.625 16.921-1.145 13.865.108 31.41-1.581z"
                                ></path>
                            </g>
                            <g className="chest" stroke="#000" onClick={call1}>
                                <path
                                    id="Chest"
                                    fill="#D8D8D8"
                                    d="M324.853-207.467c10.848-21.8 36.859-61.27 55.228-71.362 7.048-3.873 15.303-8.436 23.261-7.783 10.363.851 19.845 7.379 28.243 13.368 11.434 8.154 13.282 3.669 21.099 16.755 9.683 16.21 3.954 15.925 4.965 30.406 1.006 14.414 2.482 24.321 2.482 37.232 0 9.712-13.761 13.249-22.96 14.273-5.929.66-41.609 11.154-52.747 5.584-7.23-3.615-18.605-6.565-26.27-10.773-8.147-4.472-14.465-8.344-20.891-14.048-8.007-7.107-4.731-6.826-12.41-13.652zM609.681-208.088c-10.848-21.8-36.859-61.27-55.228-71.362-7.048-3.873-15.303-8.436-23.261-7.783-10.363.851-19.845 7.38-28.243 13.368-11.434 8.154-13.282 3.67-21.099 16.755-9.683 16.21-3.954 15.925-4.965 30.406-1.006 14.414-2.482 24.321-2.482 37.232 0 9.712 13.761 13.25 22.96 14.273 5.929.66 41.609 11.154 52.747 5.584 7.23-3.615 18.605-6.565 26.27-10.773 8.147-4.472 14.465-8.344 20.891-14.048 8.007-7.107 4.731-6.826 12.41-13.652z"
                                ></path>
                            </g>
                            <g fill="#AEAEAE" stroke="#000">
                                <path d="M245.424-94.805c-26.61 22.311-40.89 50.611-52.534 80.951-13.027 33.945-22.598 70.444-39.306 103.97-4.429 8.888-12.25 22.178-18.617 28.545-7.671 7.671-24.64 4.602-29.785 14.893-1.351 2.701-26.105 19.815-23.581 22.339 6.3 6.3 26.663-14.292 32.889-8.067 2.836 2.836-2.357 15.641-3.724 17.375-9.431 11.959-18.12 23.195-22.959 39.094-.273.896-2.762 7.789-.001 10.55 1.003 1.002 17.225-25.292 19.237-27.304 2.759-2.759 8.496-15.669 8.067-11.79-1.257 11.367-13.626 30.595-15.513 40.955-.412.87-3.14 15.419 3.102 9.377 5.97-5.778 14.926-50.585 26.683-44.058 4.513 2.506-9.308 26.064-10.549 28.545-.315.63-2.893 11.585-2.482 11.791 9.528 4.764 17.457-32.432 20.478-38.474.451-.903 7.56-3.611 9.308-1.862 6.814 6.813-11.553 27.733-4.964 31.027 9.759 4.879 14.136-19.945 17.375-26.683 5.17-10.756 3.103-18.77 6.826-26.063 4.458-8.733 2.156-24.469 5.585-34.129 4.587-12.924 8.696-21.108 16.754-29.166 11.562-11.561 19.329-34.731 30.407-46.54 33.125-35.311 85.292-59.053 85.634-124.108.023-4.364-15.955 6.736-19.857 8.688-5.376 2.687-29.079 12.453-32.889 10.548-2.753-1.376-2.288-10.063-2.996-19.05-.767-9.731-2.588-19.816-2.588-21.354zM687.686-94.185c26.61 22.311 40.89 50.611 52.534 80.951 13.027 33.945 22.598 70.444 39.306 103.97 4.43 8.888 12.25 22.178 18.617 28.545 7.671 7.671 24.64 4.602 29.785 14.893 1.351 2.701 26.105 19.815 23.581 22.34-6.3 6.3-26.663-14.293-32.889-8.068-2.836 2.836 2.357 15.641 3.724 17.375 9.431 11.96 18.12 23.195 22.96 39.094.272.896 2.761 7.79 0 10.55-1.003 1.002-17.225-25.292-19.237-27.304-2.759-2.759-8.496-15.669-8.067-11.79 1.257 11.367 13.626 30.595 15.513 40.955.412.87 3.14 15.42-3.102 9.377-5.97-5.778-14.926-50.585-26.683-44.058-4.513 2.506 9.308 26.064 10.55 28.545.314.63 2.892 11.585 2.481 11.791-9.528 4.764-17.457-32.432-20.478-38.474-.45-.903-7.56-3.61-9.308-1.862-6.814 6.813 11.553 27.733 4.964 31.027-9.759 4.88-14.136-19.945-17.375-26.683-5.17-10.756-3.103-18.77-6.826-26.063-4.458-8.733-2.156-24.469-5.585-34.129-4.587-12.924-8.696-21.108-16.754-29.166-11.562-11.56-19.329-34.73-30.407-46.54-33.125-35.31-85.292-59.053-85.634-124.108-.023-4.364 15.955 6.736 19.857 8.688 5.376 2.687 29.08 12.453 32.89 10.548 2.752-1.376 2.287-10.063 2.995-19.05.767-9.73 2.588-19.816 2.588-21.354z"></path>
                            </g>
                            <g fill="#AEAEAE" stroke="#000">
                                <path d="M418.554-438.859c-10.318-10.319-12.032 7.584-8.687 14.272 3.512 7.025 9.573 18.261 14.893 23.581 2.825 2.825 4.953 22.859 6.205 26.062 5.732 14.661 22.676 12.138 37.232 13.652 5.32.553 26.866-1.27 31.027-6.205 7.086-8.403 12.288-17.046 13.106-28.047.451-6.068 4.325-9.804 12.337-17.873 1.498-1.509 2.715-26.256.62-27.304-1.932-.966-5.24 3.793-6.205 1.862-1.738-3.476-2.491-12.912-2.482-17.375.004-2.089-1.214-23.969-3.103-30.407-2.052-6.993-3.305-14.155-11.791-19.857-11.789.238-28.054-.799-36.612 0-8.725.815-26.265.853-29.785 4.344-11.074 10.984-20.048 4.111-14.893 44.678.864 6.8-3.217 17.601-1.862 18.617z"></path>
                                <path d="M426.621-373.151c15.631 8.824 7.243 11.009 35.991 14.893 2.636.356 16.298-.643 18.617-1.241 11.853-3.057 17.072-5.077 17.995-5.585 4.279-2.355 9.929-8.218 9.929-5.585 0 17.257-15.048 45.806-22.34 60.192-1.225 2.416-8.358 25.771-7.446 26.683.738.738 3.042-1.298 15.514-6.205 17.703-6.965 12.144-5.146 25.442-8.067 8.773-1.927 9.142-.343 16.754-1.861 4.53-.903 9.314-1.317 7.447.62-8.025 8.329-12.185 4.768-16.755 9.308-2.883 2.864-8.832 2.771-14.893 6.205-3.346 1.896-24.577 18.184-32.267 24.822-4.909 4.238-3.546 12.737-6.206 19.857-3.662 9.8-1.241 45.713-3.723 62.054-.027.179-5.504-.386-6.206-.62-3.947-1.316 2.307-14.933 0-22.96-5.822-20.261 1.707-44.14-8.067-57.09-9.142-12.112-25.819-25.01-40.335-32.268-1.446-.723-30.23-6.885-22.96-9.308 6.893-2.298 38.019 3.434 48.402 9.308 1.531.866 18.497 5.657 16.755 4.343-3.146-2.374-3.919-12.537-4.966-14.892-7.323-16.465-19.783-35.675-21.718-47.161-3.281-10.548-2.014-15.045-3.723-16.755-.931-.931-1.241-9.151-1.241-8.687z"></path>
                            </g>
                            <g fill="#AEAEAE" stroke="#000">
                                <path d="M339.746-183.818c5.765 0 17.609 9.518 22.339 11.17 14.305 4.997 17.9 7.972 30.407 8.688 21.015 1.203 33.709-6.826 52.745-6.826 3.305 0 16.419-4.059 19.237-1.241 2.239 2.239-.62 6.653-1.241 23.58-.553 15.09 0 20.892 0 35.991 0 45.315.621 95.106.621 142.724 0 11.74-1.113 34.623-1.242 52.126-.016 2.134 0 12.521 0 14.893v41.576c0 2.273 1.127 13.766.621 14.272-1.732 1.732-16.253-4.849-22.96-14.272-15.456-21.713-23.905-29.555-38.474-49.022-14.419-19.266-41.4-30.515-49.644-47.782-10.446-21.881 4.1-60.038 3.104-86.256-.208-5.469 3.934-25.231 3.103-35.37-.343-4.181-1.02-19.346-2.482-22.96-2.518-6.224-3.014-16.416-5.585-19.857-10.913-14.61-14.79-22.542-11.791-43.438.588-4.931 1.242-13.598 1.242-17.996zM592.789-183.818c-5.765 0-17.61 9.518-22.34 11.17-14.304 4.997-17.9 7.972-30.406 8.688-21.015 1.203-33.71-6.826-52.745-6.826-3.305 0-16.42-4.06-19.237-1.241-2.24 2.239.62 6.653 1.24 23.58.554 15.09 0 20.892 0 35.99 0 45.316-.62 95.107-.62 142.725 0 11.74 1.113 34.623 1.242 52.126.016 2.134 0 12.52 0 14.893v41.576c0 2.273-1.127 13.766-.621 14.272 1.732 1.732 16.253-4.85 22.96-14.272 15.456-21.713 23.905-29.555 38.474-49.022 14.419-19.266 41.4-30.515 49.644-47.782 10.446-21.881-4.1-60.038-3.104-86.256.208-5.47-3.934-25.231-3.103-35.37.343-4.181 1.02-19.346 2.482-22.96 2.518-6.224 3.014-16.416 5.585-19.857 10.913-14.61 14.79-22.542 11.79-43.438-.587-4.931-1.241-13.598-1.241-17.996z"></path>
                            </g>
                            <g fill="#AEAEAE" stroke="#000">
                                <path d="M330.437 365.084c-2.441 9.768 2.839 15.778-1.861 29.786-1.163 3.467-.187 13.275-1.241 23.581-.644 6.297-2.922 11.723-1.241 21.099.82 4.575 14.904-20.783 27.924-14.273 8.847 4.423 11.254 16.839 18.616 24.201 3.905 3.905 9.576 2.616 14.273 4.964.596.299 9.911 1.548 10.549.621 5.808-8.444 9.043-21.088 14.272-33.51 1.533-3.642 4.776-10.022 1.241-11.79-3.017-1.508-21.955-2.829-24.821-4.344-15.799-8.353-22.136-6.622-33.509-17.995-3.502-3.502-8.068-5.398-13.032-11.17-7.029-5.066-10.228-11.17-11.17-11.17zM606.32 369.428c2.442 9.768-2.838 12.675 1.862 26.683 1.163 3.467.187 13.275 1.24 23.581.645 6.297 2.923 11.723 1.242 21.099-.82 4.575-14.904-20.783-27.924-14.273-8.847 4.423-8.151 12.496-15.513 19.858-3.905 3.905-11.438 2.615-16.135 4.963-.596.299-13.634 5.271-14.272 4.344-5.808-8.444-8.423-20.467-13.652-32.889-1.533-3.642-6.017-10.643-2.482-12.411 3.017-1.508 22.576-3.449 25.442-4.964 15.799-8.353 12.207-3.52 27.924-11.79 4.383-2.306 16.135-6.639 21.099-12.411 7.029-5.066 10.228-11.79 11.17-11.79z"></path>
                            </g>
                        </svg>
                    </div>
                </Container>
            </Container>

        </div >
    );
};

export default Search;

import React from "react";
import { Grid, Card, Button } from "semantic-ui-react";
import axios from 'axios';

import AddCourseModal from "./AddCourseModal";
import TeacherQuestion from "./TeacherQuestion";
import { faDice } from "@fortawesome/free-solid-svg-icons";

export default class StudentCourses extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            classes: [],
            crn: 0,
            class: "",
            sessionID: 0,
            isSessionOpen: 0
        }  
    }

    componentDidMount() {
        this.fetchClasses();
        
    }

    fetchClasses() {
        let url = "http://localhost:4000/api/classes/teachers/" + localStorage.getItem('netid');
        axios.get(url).then((res) => {
            this.setState({ classes: res.data.data });
        });
    }

    handleOpenSession = (crn) => {
        let body = {
            crn: crn,
     
        }
        this.fetchSessions(crn);
        let url = "http://localhost:4000/api/sessions";
        axios.post(url, body).then(res => {
            
            console.log(crn);
            this.setState({ show_success: true });
            setTimeout(
                function () {
                    this.setState({ show_success: false });
                }
                    .bind(this),
                3000
            );
        })
        this.state.isSessionOpen = 1;
    }


    fetchSessions(crn) {
        let url = `http://localhost:4000/api/sessions/class/live/${crn}`;
        axios.get(url).then((res) => {
            this.setState({ sessionID: res.data.data[0].sessionID });
            console.log("hi", this.state.sessionID)
        });
    }

    handleCloseSession = (sessionID) => {
        let body = {
            sessionID: sessionID
        }
        
        let url = `http://localhost:4000/api/sessions/${sessionID}`;
        axios.put(url, body).then(res => {
            console.log(sessionID);
            
            this.setState({ show_success: true });
            setTimeout(
                function () {
                    this.setState({ show_success: false });
                }
                    .bind(this),
                3000
            );
        })
        this.state.isSessionOpen = 0;
    }

    handleCountAttendance = (crn, attendancePresent, attendanceTotal) => {
        let body = {
            attendanceTotal: attendanceTotal + 1,
            attendancePresent: attendancePresent + 1
        }
        let url = `http://localhost:4000/api/enrollments/${localStorage.getItem('netid')}/${crn}`;
        axios.put(url, body).then(res => {
            this.fetchClasses();
        });
    }

    openAttendanceModal() {
        this.refs.attnchild.handleOpen();
    }

    openTeacherQuestion(className) {

        //localStorage.setItem("className", className);
        this.refs.questionchild.handleOpen();

    }

    openAddCourseModal() {
        this.refs.addcoursechild.handleOpen();
    }

    openPage(className, crn) {
        localStorage.setItem("className", className);
        localStorage.setItem("crn", crn);
        window.location.assign('/teacherAttendance');
    }

    render() {
        return (
            <div className={"collectionCont teacherCourses"}>
                <AddCourseModal ref="addcoursechild"></AddCourseModal>
                <TeacherQuestion ref="questionchild"></TeacherQuestion>
                <Grid columns={3}>
                    <Grid.Row>
                        <Grid.Column>
                            <Button onClick={() => this.openAddCourseModal()}>Add Course</Button>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        {this.state.classes.map((class_info) => (
                            <Grid.Column key={class_info.crn}>
                                <Card key={class_info.crn}>
                                    <Card.Content>
                                        <Card.Header>{class_info.className}</Card.Header>
                                        <Card.Meta>{class_info.teacherID}</Card.Meta>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <div className="ui two buttons">
                                            <Button basic color="green"
                                                onClick={() => this.openPage(class_info.className, class_info.crn)}>
                                                Attendance
                                            </Button>
                                            <Button basic color="red"
                                                onClick={() => this.openTeacherQuestion(class_info.className)}>
                                                Questions
                                        </Button>
                                            {this.state.isSessionOpen == 0
                                                ? <Button basic color="blue"
                                                    onClick={() => this.handleOpenSession(class_info.crn)}>
                                                    Start Session
                                                  </Button>
                                                : <Button basic color="blue"
                                                    onClick={() => this.handleCloseSession(this.state.sessionID)}>
                                                     Close Session
                                                    </Button>
                                            }

                                        </div>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        ))}
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

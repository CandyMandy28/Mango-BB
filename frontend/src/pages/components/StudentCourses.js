import React from "react";
import { Grid, Card, Button } from "semantic-ui-react";
import axios from 'axios';

import AttendanceModal from "./AttendanceModal";
import QuestionModal from "./QuestionModal";

export default class StudentCourses extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLive: [],
            classes: []
        }
        // this.isLive = [];
    }

    componentDidMount() {
        this.fetchClasses();
    }

    fetchClasses() {
        let url = "http://localhost:4000/api/enrollments/" + localStorage.getItem('netid');
        axios.get(url).then((res) => {
            this.setState({ classes: res.data.data });

            for (let i = 0; i < this.state.classes.length; i++) {
                let class_info = this.state.classes[i];
                let url1 = "http://localhost:4000/api/sessions/class/" + class_info.crn;
                axios.get(url1).then((res1) => {
                    console.log(i, res1.data.data.endTime == null);
                    console.log(i, res1.data.data);
                    if (res1.data.data.length > 0) {
                        let url2 = "http://localhost:4000/api/questions/session/" + res1.data.data[0].sessionID;
                        axios.get(url2).then((res2) => {
                            if (res2.data.data.length > 0) {
                                this.setState({ isLive: this.state.isLive.concat(true) });
                            } else {
                                this.setState({ isLive: this.state.isLive.concat(false) });
                            }
                        });
                    } else {
                        this.setState({ isLive: this.state.isLive.concat(false) });
                    }
                });
            }
        });
    }

    openAttendanceModal(crn) {
        this.refs.attnchild.handleOpen(crn);
    }

    openQuestionModal(crn, className) {
        localStorage.setItem("className", className);
        localStorage.setItem("crn", crn);
        this.refs.questionchild.handleOpen(crn, className);
    }

    render() {
        return (
            <div className={"collectionCont studentCourses"}>
                <AttendanceModal ref="attnchild"></AttendanceModal>
                <QuestionModal ref="questionchild"></QuestionModal>
                <Grid columns={3}>
                    <Grid.Row>
                        {this.state.classes.map((class_info, index) => (
                            <Grid.Column key={class_info.crn}>
                                <Card key={class_info.crn}>
                                    <Card.Content>
                                        <Card.Header>{class_info.className}</Card.Header>
                                        <Card.Meta>{class_info.teacherID}</Card.Meta>
                                        {/* <Card.Description>
                                            <p>Rank: <strong>{class_info.score}</strong></p>
                                            <p>
                                                Attendance:{" "}
                                                <strong>
                                                    {class_info.attendanceTotal == 0
                                                        ? 0 + "%"
                                                        : Math.round(
                                                            (class_info.attendancePresent /
                                                                class_info.attendanceTotal) *
                                                            100
                                                        ) + "%"}
                                                </strong>
                                            </p>
                                        </Card.Description> */}
                                    </Card.Content>
                                    <Card.Content extra>
                                        <div className="ui two buttons">
                                            <Button basic color="green"
                                                onClick={() => this.openAttendanceModal(class_info.crn)}>
                                                Attendance</Button>
                                            {this.state.isLive[index] ?
                                                <Button basic color="red"
                                                    onClick={() => this.openQuestionModal(class_info.crn, class_info.className)}>
                                                    Questions</Button>
                                                : ""}
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

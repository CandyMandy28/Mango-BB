import React from "react";
import { Grid, Card, Button } from "semantic-ui-react";
import axios from 'axios';

export default class StudentCourses extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            classes: [],
            crn: 0,
            class: ""
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

    openQuestionModal() {
        this.refs.questionchild.handleOpen();
    }

    openPage(className, crn) {
        localStorage.setItem("className", className);
        localStorage.setItem("crn", crn);
        window.location.assign('/teacherAttendance/');
    }

    render() {
        return (
            <div className={"collectionCont"}>
                <Grid columns={3}>
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
                                            // onClick={() => this.openQuestionModal()}
                                            >
                                                Questions
                            </Button>
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

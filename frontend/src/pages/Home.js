import React from "react";
import { Grid, Card, Icon, Divider, Button, Menu, Header } from "semantic-ui-react";
import Sidebar from "./components/Sidebar";
import axios from "axios";

import AttendanceModal from "./components/AttendanceModal";
import QuestionModal from "./components/QuestionModal";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: [],
    };
  }

  componentDidMount() {
    this.fetchClasses();
  }

  fetchClasses() {
    let url = "http://localhost:4000/api/enrollments/" + localStorage.getItem('netid');
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

  openAttendanceModal () {
    this.refs.attnchild.handleOpen();
  }

  openQuestionModal () {
    this.refs.questionchild.handleOpen();
  }

  render() {
    return (
      <div className={"pageCont"}>
        <AttendanceModal ref="attnchild"></AttendanceModal>
        <QuestionModal ref="questionchild"></QuestionModal>
        <div className={"sidebarCont"}>
          <Sidebar></Sidebar>
        </div>

        <div className={"mainCont"}>
          <Header as="h1">Course Page</Header>
          <Divider />
          <br></br>
          <div className={"container"}>
            <div className={"collectionCont"}>
              <Grid columns={3}>
                <Grid.Row>
                  {this.state.classes.map((class_info) => (
                    <Grid.Column key={class_info.crn}>
                      <Card key={class_info.crn}>
                        <Card.Content>
                          <Card.Header>{class_info.className}</Card.Header>
                          <Card.Meta>{class_info.teacherID}</Card.Meta>
                          <Card.Description>
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
                          </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                          <div className="ui two buttons">
                            <Button basic color="green" 
                              onClick={() => this.openAttendanceModal()}>
                              Attendance
                            </Button>
                            <Button basic color="red"
                              onClick={() => this.openQuestionModal()}>
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
          </div>
        </div>
      </div>
    );
  }
}

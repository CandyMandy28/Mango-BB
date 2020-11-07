import React from "react";
import { Grid, Card, Icon, Divider, Button, Menu, Header } from "semantic-ui-react";
import Sidebar from "./components/Sidebar";
import axios from "axios";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: ["sdfa", "sdfa"],
    };
  }

  componentDidMount() {
    this.fetchClasses();
  }

  fetchClasses() {
    let url = "http://localhost:4000/api/enrollments/b2";
    axios.get(url).then((res) => {
      this.setState({ classes: res.data.data });
    });
  }

  handleCountAttendance = (crn, attendancePresent, attendanceTotal) => {
    let body = {
      attendanceTotal: attendanceTotal + 1,
      attendancePresent: attendancePresent + 1
    }
    let url = `http://localhost:4000/api/enrollments/b2/${crn}`;
    axios.put(url, body).then(res => {
      this.fetchClasses();
    });
  }

  handleRemoveCourse = (crn) => {
    let url = `http://localhost:4000/api/enrollments/b2/${crn}`;
    axios.delete(url).then((res) => {
      this.fetchClasses();
    });
  }

  render() {
    return (
      <div className={"pageCont"}>
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
                          <Card.Content header={class_info.className} />
                          <Button basic color='red' primary onClick={() => this.handleRemoveCourse(class_info.crn)}><Icon name='minus' /></Button>
                          <Card.Content>
                            <p>Rank: {class_info.score}</p>
                            <p>Attendance: {(class_info.attendanceTotal == 0) ? 0 : Math.round((class_info.attendancePresent / class_info.attendanceTotal)*100) } %</p>
                            {/* <button class="ui primary right floated button" onClick={() => class_info.attendancePresent + 1}>Attendance</button> */}
                          </Card.Content>
                          <Card.Content extra>
                            <div className="cardInfo">
                              <Icon name='user' /> {class_info.teacherID}
                              <button class="ui primary right floated button" onClick={() => this.handleCountAttendance(class_info.crn, class_info.attendancePresent, class_info.attendanceTotal)}>Attendance</button>
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

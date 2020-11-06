import React from "react";
import { Grid, Card, Icon, Divider, Menu, Header } from "semantic-ui-react";
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
                          <Card.Content>
                            <p>Rank: {class_info.score}</p>
                            <p>Attendance: {(class_info.attendanceTotal == 0) ? 0 : Math.round((class_info.attendancePresent / class_info.attendanceTotal)*100) } %</p>
                          </Card.Content>
                          <Card.Content extra>
                            <Icon name='user' /> {class_info.teacherID}
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

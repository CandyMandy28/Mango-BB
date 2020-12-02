import React from "react";
import { Table, Divider, Header, Loader} from "semantic-ui-react";
import axios from 'axios';
import Sidebar from "./components/Sidebar";

export default class TeacherAttendance extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      sessions: [],
      students: {},
      isShowing: false
    }
  }

  componentDidMount() {
    this.fetchClass();
  }

  fetchClass() {
    let url = `http://localhost:4000/api/attendance/${localStorage.getItem("crn")}`;
    axios.get(url).then((res) => {
      this.setState({ sessions: res.data.session, students: res.data.data, isShowing: true });
      console.log(res.data.session);
    });
  }

  changeTime (timeString) {
    let date_str = new Date(timeString);
    let hour = date_str.toString().substring(16,18) - 6;
    let min = date_str.toString().substring(19,21);
    return date_str.toString().substring(0,16) + " " + hour + ":" + min;
  }

  render() {
    return (
      <div className={"pageCont"}>
        <div className={"sidebarCont"}>
          <Sidebar url="teacherAttendance"></Sidebar>
        </div>
        <div className={"mainCont"}>
            <Header as="h1"> {localStorage.getItem("className")}</Header>
          <Divider />
          <br></br>
          {this.state.isShowing ? (
            <Table celled className={"movieContModal"}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Names</Table.HeaderCell>
                  {this.state.sessions.map((session) => (
                    <Table.HeaderCell>{this.changeTime(session)}</Table.HeaderCell>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {Object.keys(this.state.students).map((netID) => (
                  <Table.Row>
                    <Table.Cell>{netID}</Table.Cell>
                    {this.state.students[netID].map((attendance) => 
                      <Table.Cell>{attendance == 1 ? "Present" : "Absent"}</Table.Cell>
                    )}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          ): (<Loader content='Loading' style={{display: "block"}}/>)}
          
        </div>

      </div>
    );
  }
}

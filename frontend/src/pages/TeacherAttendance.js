import React from "react";
import { Table, Divider, Header } from "semantic-ui-react";
import axios from 'axios';
import Sidebar from "./components/Sidebar";

export default class TeacherAttendance extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      modalOpen: false,
      classes: [],
      enrollments: [],
      class: ""
    }
  }

  componentDidMount() {
    this.fetchClass();
  }

  fetchClass() {
    let url = `http://localhost:4000/api/enrollments/teacher/courses/${localStorage.getItem("crn")}`;
    console.log(url);
    axios.get(url).then((res) => {
      this.setState({ enrollments: res.data.data });
      console.log(res.data.data);
    });
  }

  // fetchClasses() {
  //   let url = "http://localhost:4000/api/enrollments/" + localStorage.getItem('netid');
  //   axios.get(url).then((res) => {
  //     this.setState({ enrollments: res.data.data });
  //   });
  // }

  // fetchClassName() {
  //   let url = "http://localhost:4000/api/classes/teachers/" + localStorage.getItem('netid');
  //   axios.get(url).then((res) => {
  //     this.setState({ enrollments: res.data.data });
  //   });
  // }

  handleAddCourse = (crn) => {
    let body = {
      crn: crn,
      netID: localStorage.getItem('netid'),
      score: 0,
      attendanceTotal: 0,
      attendancePresent: 0
    }
    let url = "http://localhost:4000/api/enrollments";
    axios.post(url, body).then(res => {
      this.fetchClass();
      // this.fetchClasses();
      this.setState({ show_success: true });
      setTimeout(
        function () {
          this.setState({ show_success: false });
        }
          .bind(this),
        3000
      );
    })
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
          <Table celled className={"movieContModal"}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Names</Table.HeaderCell>
                <Table.HeaderCell>04/11/2020</Table.HeaderCell>
                <Table.HeaderCell>04/11/2020</Table.HeaderCell>
                <Table.HeaderCell>04/11/2020</Table.HeaderCell>
                <Table.HeaderCell>04/11/2020</Table.HeaderCell>
                <Table.HeaderCell>04/11/2020</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.state.enrollments.map((student) => (              
              <Table.Row>
                <Table.Cell>{student.netID}</Table.Cell>
                <Table.Cell>Present</Table.Cell>
                <Table.Cell>Present</Table.Cell>
                <Table.Cell>Present</Table.Cell>
                <Table.Cell>Present</Table.Cell>
                <Table.Cell>Present</Table.Cell>
              </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>

      </div>
    );
  }
}

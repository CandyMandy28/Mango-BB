import React from "react";
import { Divider, Input, Table, Header, Button } from "semantic-ui-react";
import Sidebar from "./components/Sidebar";
import axios from 'axios';

export default class Profile extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      profile: "",
    }
  }

  componentDidMount() {
    this.fetchProfile();
  }

  fetchProfile () {
    console.log(localStorage.getItem('acc_type'))
    if (localStorage.getItem('acc_type') == 1) {
      let url = `http://localhost:4000/api/profiles/${localStorage.getItem('netid')}/${localStorage.getItem('acc_type')}`;
      axios.get(url).then((res) => {
        console.log(res.data.data)
        this.setState({ profile: res.data.data[0].studentName });
      });
    }
    else {
      
      let url = `http://localhost:4000/api/profiles/${localStorage.getItem('netid')}/${localStorage.getItem('acc_type')}`;
      console.log(url)
      axios.get(url).then((res) => {
        this.setState({ profile: res.data.data[0].teacherName });
      });
    }
    
  }

  handleSubmit() {
    let body = {
      name: this.state.profile
    }
    let url = `http://localhost:4000/api/profiles/${localStorage.getItem('netid')}/${localStorage.getItem('acc_type')}`
    axios.put(url, body).then(res => {
        this.fetchProfile();
    });
  }

  handleOnChangeName = (e) => {
    this.setState({
      profile: e.target.value,
    });
  };
 
  render() {
    return (
      <div className={"pageCont"}>
        <div className={"sidebarCont"}>
          <Sidebar></Sidebar>
        </div>
        <div className={"mainCont"}>
          <Header as='h1'>Profile</Header>
          <Divider />
          <div className={"container profile_cont"}>
            <Table basic='very'>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Name:</Table.Cell>
                  <Table.Cell><Input onChange={this.handleOnChangeName} value={this.state.profile} /></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{localStorage.getItem("acc_type") == 1 ? "NetID:" : "TeacherID:"}</Table.Cell>
                  <Table.Cell><Input disabled value={localStorage.getItem("netid")} /></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Email:</Table.Cell>
                  <Table.Cell><Input disabled value={localStorage.getItem("email")} /></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Account Type:</Table.Cell>
                  <Table.Cell><Input disabled value={localStorage.getItem("acc_type") == 1 ? "Student" : "Teacher"} /></Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Button primary onClick={() => this.handleSubmit()}>Submit</Button>
          </div>
        </div>

      </div>
    );
  }
}

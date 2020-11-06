import React from "react";
import { Input, Button, Table, Icon, Header, Message } from 'semantic-ui-react';
import Sidebar from "./components/Sidebar";
import axios from 'axios';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      classes: [],
      show_success: false
    };
  }

  componentDidMount() {
  }

  fetchClass(query) {
    let url = `http://localhost:4000/api/classes/search/${query}/b2`;
    axios.get(url).then((res) => {
      this.setState({ classes: res.data.data });
    });
  }

  handleInputChange = e => {
    let query_local = e.target.value;
    this.setState({query : query_local});
    if (query_local.length != 0){
      this.fetchClass(query_local);
    }
  }

  handleAddCourse = (crn) => {
    let body = {
      crn: crn,
      netID: 'b2',
      score: 0,
      attendanceTotal: 0,
      attendancePresent: 0
    }
    let url = "http://localhost:4000/api/enrollments";
    axios.post(url, body).then(res => {
        this.fetchClass(this.state.query);
        this.setState({show_success: true});
        setTimeout(
          function() {
              this.setState({ show_success: false });
          }
          .bind(this),
          3000
        );
    })
  }

  render() {
    return (
      <div className={'pageCont'}>
        <div className={'sidebarCont'}>
          <Sidebar></Sidebar>
        </div>  
        <div className={'mainCont'}>
          <Header as='h1'>Search</Header>
          <div className={'container'}>
            <Input icon="search" placeholder="Search by class name..." value={this.state.query} onChange={this.handleInputChange} style={{marginBottom: !this.state.show_success ? '50px': ''}}/>
            {this.state.show_success ? <Message
              success
              header='Course has been added succesfully'
            /> : "" }
            <div className={'searchCont'}>
              {this.state.classes.length >= 1 ? <Table>
                <Table.Body>
                  {this.state.classes.map((class_info) => (
                     <Table.Row key={class_info.crn}>
                        <Table.Cell>{class_info.className}</Table.Cell>
                        <Table.Cell>{class_info.teacherID}</Table.Cell>
                        <Table.Cell collapsing><Button primary onClick={() => this.handleAddCourse(class_info.crn)}> <Icon name='book' /> Add Course </Button></Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table> : ""}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

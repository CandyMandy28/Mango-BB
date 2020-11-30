import React from "react";
import { Button, Modal, Table } from "semantic-ui-react";
import axios from 'axios';
import "../assets/Style.scss";

export default class AttendanceModal extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        modalOpen: false,
        attendance: [],
        class: [],
        crn: 0,
        show_class: false,
        attn_percent: ""
    }
  }

  fetchClass(crn) {
    console.log(crn)
    let url = `http://localhost:4000/api/classes/${crn}`
    axios.get(url).then((res) => {
        this.setState({ class: res.data.data, show_class: true });
        this.fetchAttendance(crn);
    });
  }

  fetchAttendance(crn) {
    let url = `http://localhost:4000/api/attendance/${crn}/${localStorage.getItem("netid")}`
    axios.get(url).then((res) => {
        this.setState({ attendance: res.data.data, attn_percent: (res.data.attn_percent ? res.data.attn_percent : 0) + "%" });
    });
  }

  handleOpen = (crn) => {
    this.setState({ modalOpen: true });
    this.fetchClass(crn);
  }

  handleClose = () => {
    this.setState({ 
        modalOpen: false,
    });
  }

  render () {
    return (
        <Modal open={this.state.modalOpen} onClose={this.handleClose} size="tiny">
            <Modal.Header>
                {this.state.show_class ? this.state.class[0].className : ""}
            </Modal.Header>
            <Modal.Content className={"modalCont"}>
                <p>By: <strong>{this.state.show_class ? this.state.class[0].teacherID : ""}</strong></p>
                <p>Attendace: <strong>{this.state.attn_percent}</strong></p>
                <Table celled className={"movieContModal"}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                            <Table.HeaderCell>Attendance</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.state.attendance.map(attn => (
                            <Table.Row>
                                <Table.Cell>{attn.session.substring(0,10)}</Table.Cell>
                                <Table.Cell>{attn.attendance == 1 ? "Present" : "Absent"}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </Modal.Content>
            <Modal.Actions>
                <Button color='blue' onClick={this.handleClose}>Close</Button>
            </Modal.Actions>
        </Modal>
    );
  }
}

import React from "react";
import { Button, Rating, Modal, Table } from "semantic-ui-react";
import axios from 'axios';

import "../assets/Style.scss";

export default class AttendanceModal extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        modalOpen: false,
        selCollection: {},
        ownerName: "",
        movies: [],
        isOwner: false
    }
  }

  handleOpen = () => {
    this.setState({ modalOpen: true });
    this.setState({options: []})
  }

  handleClose = () => {
    this.setState({ 
        modalOpen: false,
        movies: []
    });
  }

  render () {
    return (
        <Modal open={this.state.modalOpen} onClose={this.handleClose} size="tiny">
            <Modal.Header>
                CS 411: Database Systems
            </Modal.Header>
            <Modal.Content className={"modalCont"}>
                <p>By: <strong>Macleod8</strong></p>
                <p>Rank: <strong>2</strong></p>
                <p>Attendace: <strong>60%</strong></p>
                <Table celled className={"movieContModal"}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                            <Table.HeaderCell>Attendance</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>04/11/2020</Table.Cell>
                            <Table.Cell>Present</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>04/11/2020</Table.Cell>
                            <Table.Cell>Present</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>04/11/2020</Table.Cell>
                            <Table.Cell color="red">Absent</Table.Cell>
                        </Table.Row>
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

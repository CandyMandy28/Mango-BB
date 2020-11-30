import React from "react";
import { Button, Form, Modal, Checkbox, Icon, Grid, Progress, Table } from "semantic-ui-react";

import "../assets/Style.scss";

export default class QuestionModal extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        modalOpen: false,
        value: "",
        timePercent: 0,
        timeValue: 30
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  componentDidMount () {
    
  }

  handleOpen = () => {
    this.setState({ modalOpen: true });
    this.setState({options: []})
    this.startTimer();
  }

  handleClose = () => {
    this.setState({ 
        modalOpen: false,
        movies: []
    });
  }
  

  startTimer = () => {
    if (this.timer == 0 && this.state.timeValue > 0) {
        this.timer = setInterval(() => this.countDown(), 1000);
    }
  }

  countDown = () => {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.timeValue - 1;
    this.setState({
        timeValue: seconds,
        timePercent: Math.round((seconds / 30) * 100)
    });
    
    // Check if we're at zero.
    if (seconds == 0) {
      clearInterval(this.timer);
    }
  }

  handleChange = (e, { value }) => this.setState({ value })

  render () {
    return (
        <Modal open={this.state.modalOpen} onClose={this.handleClose} size="small">
            <Modal.Header>
                CS 411: asfd Systems
            </Modal.Header>
            <Modal.Content className={"modalCont questionModal"}>
                <Progress percent={this.state.timePercent} indicating>Time Remaining: {this.state.timeValue} secs</Progress>
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column width={12}>
                            <h3>Q: Which direction does the sun rise in?</h3>
                            <Form>
                                <Form.Field>
                                    Selected value: <b>{this.state.value}</b>
                                </Form.Field>
                                <Form.Field>
                                    <Checkbox
                                        radio
                                        label='Choose this'
                                        name='checkboxRadioGroup'
                                        value='Choose this'
                                        checked={this.state.value === 'Choose this'}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Checkbox
                                        radio
                                        label='Or that'
                                        name='checkboxRadioGroup'
                                        value='Or that'
                                        checked={this.state.value === 'Or that'}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Checkbox
                                        radio
                                        label='maybe this one'
                                        name='checkboxRadioGroup'
                                        value='maybe this one'
                                        checked={this.state.value === 'maybe this one'}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Checkbox
                                        radio
                                        label='okay this one'
                                        name='checkboxRadioGroup'
                                        value='okay this one'
                                        checked={this.state.value === 'okay this one'}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                            </Form> 
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Table>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Your Stats</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>Rank: 10</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>Correct: 5 / 7</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Top Students</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>1. Tom</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>2. Jeremy</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>3. Cho</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>4. Wayne</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>5. Patrick</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Modal.Content>
            <Modal.Actions>
                <Button color='red'>
                    <Icon name='chevron left' /> Previous
                </Button>
                <Button color='green'>
                    <Icon name='chevron right' /> Next
                </Button>
            </Modal.Actions>
        </Modal>
    );
  }
}

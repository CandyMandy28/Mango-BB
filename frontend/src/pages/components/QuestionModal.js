import { faThList } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Button, Form, Modal, Checkbox, Icon, Grid, Progress, Table } from "semantic-ui-react";
import axios from 'axios';

import "../assets/Style.scss";
import LivePolling from "./LivePolling";

export default class QuestionModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            modalOpen: false,
            value: "",
            timePercent: 0,
            timeValue: 30,
            answered: false,
            sessionID: 0,
            questions: []
        };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    componentDidMount() {

    }

    handleOpen = () => {
        this.setState({ modalOpen: true });
        this.setState({ options: [] });
        this.resetQuestion();
        this.fetchSessions();
    }

    fetchSessions() {
        let url = "http://localhost:4000/api/sessions/class/live/" + localStorage.getItem("crn");
        axios.get(url).then((res) => {
            this.setState({ sessionID: res.data.data[0].sessionID });
            this.fetchQuestion();
        });
    }

    fetchQuestion() {
        let url = "http://localhost:4000/api/questions/session/" + this.state.sessionID;
        axios.get(url).then((res) => {
            let url1 = "http://localhost:4000/api/responses/question/" + res.data.data[0]._id + "/" + localStorage.getItem('netid');

            axios.get(url1).then((res1) => {
                console.log("questions",res.data.data[0]);
                console.log("response",res1.data.data);
                if (res1.data.data.length == 0) {
                    console.log("123456789");
                    this.setState({ questions: res.data.data[0] });
                    this.startTimer();
                } else {
                    console.log("098765r4e3w2");
                    this.setState({answered: true});
                }
            });
        });
    }

    handleClose = () => {
        this.setState({
            modalOpen: false,
            movies: []
        });
    }

    startTimer = () => {
        if (!this.state.answered && this.timer == 0 && this.state.timeValue > 0) {
            this.timer = setInterval(() => this.countDown(), 1000);
        }
    }

    countDown = () => {
        // get time from question
        // console.log(this.state.questions);
        // this.setState({timeValue: this.state.questions.timer});

        // Remove one second, set state so a re-render happens.

        let seconds = this.state.timeValue - 1;
        this.setState({
            timeValue: seconds,
            timePercent: Math.round((seconds / 30) * 100)
        });

        // Check if we're at zero.
        if (seconds <= 0) {
            clearInterval(this.timer);
        }
    }

    handleChange = (e, { value }) => {
        this.setState({ value });
        this.setState({ answered: true });

        console.log(value);

        // update answer
        let body = {
            questionID: this.state.questions._id,
            answer: value,
            netID : localStorage.getItem('netid'),
            sessionID: this.state.sessionID
        }


        let url = "http://localhost:4000/api/responses";
        axios.post(url, body).then(res => {
            this.resetQuestion();
            this.openLivePolling();
        });
    }

    openLivePolling() {
        // livepollingchild
        
    }

    resetQuestion() {
        clearInterval(this.timer);
        this.setState({timeValue: 30, timePercent: 100});
        this.timer = 0;
    }

    render() {
        return (
            <Modal open={this.state.modalOpen} onClose={this.handleClose} size="small">
                <Modal.Header as="h1"> {localStorage.getItem("className")}</Modal.Header>
                <Modal.Content className={"modalCont questionModal"}>
                    <Progress percent={this.state.timePercent} indicating>Time Remaining: {this.state.timeValue} secs</Progress>
                    <Grid columns={2}>
                        <Grid.Row>
                            <Grid.Column width={12}>
                                <h3>{this.state.questions.question}</h3>

                                {this.state.answered ?

                                    <LivePolling ref="livepollingchild"> </LivePolling>
                                    :
                                    <Form>
                                        <Form.Field>
                                            Selected value: <b>{this.state.value}</b>
                                        </Form.Field>
                                        <Form.Field>
                                            <Checkbox
                                                radio
                                                label='A'
                                                name='checkboxRadioGroup'
                                                value='A'
                                                checked={this.state.value === 'A'}
                                                onChange={this.handleChange}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <Checkbox
                                                radio
                                                label='B'
                                                name='checkboxRadioGroup'
                                                value='B'
                                                checked={this.state.value === 'B'}
                                                onChange={this.handleChange}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <Checkbox
                                                radio
                                                label='C'
                                                name='checkboxRadioGroup'
                                                value='C'
                                                checked={this.state.value === 'C'}
                                                onChange={this.handleChange}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <Checkbox
                                                radio
                                                label='D'
                                                name='checkboxRadioGroup'
                                                value='D'
                                                checked={this.state.value === 'D'}
                                                onChange={this.handleChange}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <Checkbox
                                                radio
                                                label='E'
                                                name='checkboxRadioGroup'
                                                value='E'
                                                checked={this.state.value === 'E'}
                                                onChange={this.handleChange}
                                            />
                                        </Form.Field>
                                    </Form>}
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
                                            <Table.Cell>Correct: {/* this.state.*/}</Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>Top Students</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {/* {this.state.classes.map((class_info) => (
                                            <Table.Row key={class_info.crn}>
                                                <Table.Cell>{class_info.className}</Table.Cell>
                                            </Table.Row>
                                        ))} */}
                                    </Table.Body>
                                </Table>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Modal.Content>
                {/* <Modal.Actions>
                <Button color='red'>
                    <Icon name='chevron left' /> Previous
                </Button>
                <Button color='green'>
                    <Icon name='chevron right' /> Next
                </Button>
            </Modal.Actions> */}
            </Modal>
        );
    }
}

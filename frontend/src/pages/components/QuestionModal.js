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
        this.livePoll = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    componentDidMount() {

    }

    handleOpen = () => {
        this.setState({ modalOpen: true });
        this.setState({ options: [] });
        this.setState({ answered: false });
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
                this.setState({ questions: res.data.data[0] });
                localStorage.setItem('questionID', this.state.questions._id);

                if (res1.data.data.length == 0) {
                    this.setState({ questions: res.data.data[0] });
                    this.startTimer();
                } else {
                    this.setState({ answered: true });
                    this.openLivePolling();
                }
            });
        });
    }

    handleClose = () => {
        this.resetQuestion();
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

        // update answer
        let body = {
            questionID: this.state.questions._id,
            answer: value,
            netID: localStorage.getItem('netid'),
            sessionID: this.state.sessionID
        }

        let url = "http://localhost:4000/api/responses";
        axios.post(url, body).then(res => {
            this.resetQuestion();
            this.openLivePolling();
        });

    }

    submitAnswer() {

    }

    openLivePolling() {
        if (this.state.answered) {
            this.refs.livepollingchild.fetchAnswers(this.state.questions._id, this.state.questions.correctAnswer); 
            console.log(this.state.questions._id);
            this.livePoll = setInterval(() => this.refs.livepollingchild.fetchAnswers(this.state.questions._id, this.state.questions.correctAnswer), 1000);
        }
    }

    resetQuestion() {
        clearInterval(this.timer);
        clearInterval(this.livePoll);
        this.setState({ timeValue: 30, timePercent: 100 });
        this.timer = 0;
    }

    render() {
        return (
            <Modal open={this.state.modalOpen} onClose={this.handleClose} size="small">
                <Modal.Header as="h1"> {localStorage.getItem("className")}</Modal.Header>
                <Modal.Content className={"modalCont questionModal"}>
                    <Progress percent={this.state.timePercent} indicating>Time Remaining: {this.state.timeValue} secs</Progress>
                    <Grid columns={1}>
                        <Grid.Row>
                            <Grid.Column>
                                <h3>{this.state.questions.question}</h3>

                                {this.state.answered ?
                                    <LivePolling ref="livepollingchild"></LivePolling>
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
                                        <Button basic color="green"
                                            onClick={() => this.submitAnswer()}>
                                            Submit
                                                    </Button>
                                    </Form>
                                }
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

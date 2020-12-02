import React from "react";
import { Button, Form, Modal, Checkbox, Icon, Grid, Progress, Table, Input } from "semantic-ui-react";
import axios from 'axios';
import Sidebar from "./Sidebar";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import LivePolling from "./LivePolling";
import RankingforTeacher from "./RankingforTeacher";

export default class TeacherQuestion extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      sessionID: 0,
      students: {},
      isShowing: false,
      correctAnswer: "",
      question: "",
      allQuestions: [],
      viewAll: true,
      isPollingVisible: false,
      questionObject: {}
    }
    this.livePoll = 0;
  }

  componentDidMount() {
    this.fetchClass();
    //this.fetchAllQuestions();
  }

  fetchClass() {
    let url = `http://localhost:4000/api/attendance/${localStorage.getItem("crn")}`;
    axios.get(url).then((res) => {
      this.setState({ classes: res.data.session, students: res.data.data, isShowing: true });
      console.log(res.data.session);
    });
  }

  handleOpen = (sessionID) => {
    this.setState({ modalOpen: true });
    this.setState({ options: [] })
    this.setState({ sessionID: sessionID })
  }

  handleClose = () => {
    this.setState({
      modalOpen: false,
      isPollingVisible: false
    });
    clearInterval(this.livePoll);
  }

  fetchAllQuestions = () => {
    let url = `http://localhost:4000/api/questions/session/${this.state.sessionID}`;
    axios.get(url).then((res) => {

      this.setState({ allQuestions: res.data.data });
      //console.log(this.state.question);
    });
    this.setState({ viewAll: false });
  }


  handleOnChangeCorrectAnswer = (e, { value }) => {
    this.setState({
      correctAnswer: value,
      value,
      isShowing: false
    });
    console.log(typeof value);
    console.log(value);
    //handleChange = (e, { value }) => this.setState({ value })
  };

  handleOnChangeQuestion = (e) => {
    this.setState({
      question: e.target.value,
    });
  };


  handleAddQuestion = () => {
    let body = {
      correctAnswer: this.state.correctAnswer,
      question: this.state.question,
      sessionID: this.state.sessionID,
    }

    let url = "http://localhost:4000/api/questions";
    axios.post(url, body).then(res => {
      this.setState({
        isPollingVisible: true,
        isShowing: true,
        questionObject: res.data.data,
        question: "",
        value: ""
      });
      this.openLivePolling();
    });
  }

  openLivePolling() {
    if (this.state.isPollingVisible) {
      this.refs.livepollingchild.fetchAnswers(this.state.questionObject._id, this.state.questionObject.correctAnswer);
      this.refs.RankingforTeacherchildren.fetchAnswers(this.state.sessionID);
      console.log(this.state.questionObject._id);
      
      this.livePoll = setInterval(() => {
        this.refs.livepollingchild.fetchAnswers(this.state.questionObject._id,this.state.questionObject.correctAnswer);
        this.refs.RankingforTeacherchildren.fetchAnswers(this.state.sessionID);
        
      }, 1000);
    
    }
  }

  render() {
    return (
      <Modal open={this.state.modalOpen} onClose={this.handleClose} size="small">

        <Modal.Header as="h1"> {localStorage.getItem("className")}</Modal.Header>

        <Modal.Content className={"modalCont questionModal"}>

          {this.state.isPollingVisible

            ? <Grid columns={2}>
              <Grid.Row>
                <Grid.Column>
                  <LivePolling ref="livepollingchild"> </LivePolling>
                </Grid.Column>

                <Grid.Column width={4}>
                  <RankingforTeacher ref="RankingforTeacherchildren"></RankingforTeacher>
                </Grid.Column>
              </Grid.Row>
            </Grid>

            : <Grid columns={2}>
              <Grid.Row>
                <Grid.Column width={12}>
                  <h4>Question: <Input onChange={this.handleOnChangeQuestion} value={this.state.question} /></h4>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={12}>
                  <Checkbox
                    radio
                    label='A'
                    name='checkboxRadioGroup'
                    value='A'
                    checked={this.state.value === 'A'}
                    onChange={this.handleOnChangeCorrectAnswer}
                  />
                </Grid.Column>
                <Grid.Column width={12}>
                  <Checkbox
                    radio
                    label='B'
                    name='checkboxRadioGroup'
                    value='B'
                    checked={this.state.value === 'B'}
                    onChange={this.handleOnChangeCorrectAnswer}
                  />
                </Grid.Column>
                <Grid.Column width={12}>
                  <Checkbox
                    radio
                    label='C'
                    name='checkboxRadioGroup'
                    value='C'
                    checked={this.state.value === 'C'}
                    onChange={this.handleOnChangeCorrectAnswer}
                  />
                </Grid.Column>
                <Grid.Column width={12}>
                  <Checkbox
                    radio
                    label='D'
                    name='checkboxRadioGroup'
                    value='D'
                    checked={this.state.value === 'D'}
                    onChange={this.handleOnChangeCorrectAnswer}
                  />
                </Grid.Column>
                <Grid.Column width={12}>
                  <Checkbox
                    radio
                    label='E'
                    name='checkboxRadioGroup'
                    value='E'
                    checked={this.state.value === 'E'}
                    onChange={this.handleOnChangeCorrectAnswer}
                  />
                </Grid.Column>
                <Grid.Column></Grid.Column>
              </Grid.Row>
            </Grid>
          }
          <Grid columns={2}>
            {this.state.viewAll
              ? ""
              : <Grid.Row>
                <Table.Body>
                  {this.state.allQuestions.map(q => (
                    <Table.Row>
                      <Table.Cell>{q.question}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Grid.Row>
            }

            <Modal.Actions>
              <Button type='submit' color='blue' disabled={this.state.isShowing ? true : false} onClick={() => this.handleAddQuestion()}>
                Submit
                </Button>
              {this.state.viewAll
                ? < Button type='submit' color='blue' onClick={() => this.fetchAllQuestions()}>
                  View All Questions
                  </Button>
                : <Button type='submit' color='blue' onClick={() => this.setState({ viewAll: true })}>
                  Hide All Questions
                </Button>
              }

            </Modal.Actions>
          </Grid>
        </Modal.Content>

      </Modal >
    );
  }
}

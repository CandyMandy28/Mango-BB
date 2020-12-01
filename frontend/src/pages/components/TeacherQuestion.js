import React from "react";
import { Button, Form, Modal, Checkbox, Icon, Grid, Progress, Table, Input } from "semantic-ui-react";
import axios from 'axios';
import Sidebar from "./Sidebar";

export default class TeacherQuestion extends React.Component {

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

  handleOpen = () => {
    this.setState({ modalOpen: true });
    this.setState({ options: [] })
  }

  handleClose = () => {
    this.setState({
      modalOpen: false,
      movies: []
    });
  }

  handleAddQuestion = () => {
    // let body = {
    //     crn: this.state.crn,
    //     className: this.state.className,
    //     teacherID: localStorage.getItem("netid")
    // }
    // let url = "http://localhost:4000/api/classes";
    // axios.post(url, body).then(res => {
    //     this.fetchClass(this.state.query);
    //     this.fetchClasses();
    //     this.setState({ show_success: true });
    //     setTimeout(
    //         function () {
    //             this.setState({ show_success: false });
    //         }
    //             .bind(this),
    //         3000
    //     );
    // })
    // this.setState({
    //     modalOpen: false,
    //     movies: []
    // });
    // window.location.reload();
  }

  render() {
    return (
      <Modal open={this.state.modalOpen} onClose={this.handleClose} size="small">

        <Modal.Header as="h1"> {localStorage.getItem("className")}</Modal.Header>

        <Modal.Content className={"modalCont questionModal"}>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column width={12}>
                <h3>Question: <Input onChange={this.handleOnChangeName} value={this.state.profile} /></h3>

                {/* <h3>A: <Input onChange={this.handleOnChangeName} value={this.state.profile} /></h3>
                <h3>B: <Input onChange={this.handleOnChangeName} value={this.state.profile} /></h3>
                <h3>C: <Input onChange={this.handleOnChangeName} value={this.state.profile} /></h3>
                <h3>D: <Input onChange={this.handleOnChangeName} value={this.state.profile} /></h3>
                <h3>E: <Input onChange={this.handleOnChangeName} value={this.state.profile} /></h3> */}
                <Grid.Row>
                  <Checkbox
                    radio
                    label='A'
                    name='checkboxRadioGroup'
                    value='A'
                    checked={this.state.value === 'A'}
                    onChange={this.handleChange}
                  />
                  <Checkbox
                    radio
                    label='B'
                    name='checkboxRadioGroup'
                    value='B'
                    checked={this.state.value === 'B'}
                    onChange={this.handleChange}
                  />
                  <Checkbox
                    radio
                    label='C'
                    name='checkboxRadioGroup'
                    value='C'
                    checked={this.state.value === 'C'}
                    onChange={this.handleChange}
                  />
                  <Checkbox
                    radio
                    label='D'
                    name='checkboxRadioGroup'
                    value='D'
                    checked={this.state.value === 'D'}
                    onChange={this.handleChange}
                  />
                  <Checkbox
                    radio
                    label='E'
                    name='checkboxRadioGroup'
                    value='E'
                    checked={this.state.value === 'E'}
                    onChange={this.handleChange}
                  />
                </Grid.Row>


                <Modal.Actions>
                  <Button type='submit' color='blue' onClick={() => this.handleAddQuestion()}>
                    Submit
                    </Button>
                </Modal.Actions>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>

      </Modal>
    );
  }
}

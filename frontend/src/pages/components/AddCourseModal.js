import React from "react";
import { Button, Form, Modal, Input, Checkbox, Icon, Grid, Progress, Table } from "semantic-ui-react";
import axios from 'axios';

import "../assets/Style.scss";

export default class AddCourseModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            modalOpen: false,
            crn: 0,
            className: ""
        };
    }

    fetchClass(query) {
        let url = `http://localhost:4000/api/classes/search/${query}/${localStorage.getItem('netid')}`;
        axios.get(url).then((res) => {
            this.setState({ classes: res.data.data });
        });
    }

    fetchClasses() {
        let url = `http://localhost:4000/api/enrollments/${localStorage.getItem('netid')}`;
        axios.get(url).then((res) => {
            this.setState({ enrollments: res.data.data });
        });
    }

    handleOpen = () => {
        this.setState({ modalOpen: true });
        this.setState({ options: [] })
    }

    handleAddCourse = () => {
        let body = {
            crn: this.state.crn,
            className: this.state.className,
            teacherID: localStorage.getItem("netid")
        }
        let url = "http://localhost:4000/api/classes";
        axios.post(url, body).then(res => {
            this.fetchClass(this.state.query);
            this.fetchClasses();
            this.setState({ show_success: true });
            setTimeout(
                function () {
                    this.setState({ show_success: false });
                }
                    .bind(this),
                3000
            );
        })
        this.setState({
            modalOpen: false,
            movies: []
        });
        window.location.reload();
    }

    handleOnChangeCourseName = (e) => {
        this.setState({
            className: e.target.value,
        });
    };

    handleOnChangeCRN = (e) => {
        this.setState({
            crn: e.target.value,
        });
    };
    handleChange = (e, { value }) => this.setState({ value })

    render() {
        return (
            <Modal open={this.state.modalOpen} onClose={this.handleClose} size="small">
                <Modal.Header>
                    Add Course
            </Modal.Header>
                <Modal.Content className={"modalCont questionModal"}>
                    <Form>
                        <Form.Field>
                            <label>Course Name</label>
                            <Input placeholder="CS 411: Database Systems" onChange={this.handleOnChangeCourseName} />
                        </Form.Field>
                        <Form.Field>
                            <label>CRN</label>
                            <Input placeholder="1" onChange={this.handleOnChangeCRN} />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button type='submit' color='blue' onClick={() => this.handleAddCourse()}>
                        Confirm
                </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

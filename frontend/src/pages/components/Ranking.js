import React from "react";
import { Button, Form, Modal, Checkbox, Icon, Grid, Progress, Table } from "semantic-ui-react";
import Chart from "chart.js";
import axios from 'axios';

import "../assets/Style.scss";

export default class Ranking extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            scores: [],
            rank: 0,
            score: 0
        };
    }

    componentDidMount() {

    }

    fetchAnswers = (sessionID) => {

        let url = "http://localhost:4000/api/responses/scores/" + sessionID;
        axios.get(url).then((res) => {
            this.setState({ scores: res.data.data });
            console.log(res.data.data);
            
            for (let i = 0; i < this.state.scores.length; i++) {
                if (i < 5) {
                    console.log(this.state.scores[i]);
                }

                if(this.state.scores[i].netID == localStorage.getItem('netid')) {
                    console.log(this.state.scores[i].totalscore, i + 1);
                    this.setState({score: this.state.scores[i].totalscore, rank: i+1});
                    break;
                }
            }
        });
    }

    render() {
        return (
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Your Stats</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>Rank: {this.state.rank}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Score: {this.state.score}</Table.Cell>
                    </Table.Row>
                </Table.Body>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Top Students</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.state.scores.slice(0, 5).map((student) => (
                        <Table.Row key={student.netID}>
                            <Table.Cell>{student.netID}: {student.totalscore}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

        );
    }
}

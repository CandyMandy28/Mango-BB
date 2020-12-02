import React from "react";
import { Button, Form, Modal, Checkbox, Icon, Grid, Progress, Table } from "semantic-ui-react";
import Chart from "chart.js";
import axios from 'axios';

import "../assets/Style.scss";

export default class LivePolling extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            answers: [],
            graphData: {}
        };
    }

    chartRef = React.createRef();
    componentDidMount() {
        // this.fetchAnswers();

    }

    fetchAnswers = (questionID) => {
        console.log("aprt 2", questionID);
        let url = "http://localhost:4000/api/responses/live/" + questionID;
        axios.get(url).then((res) => {
            this.setState({ answer: res.data.data });
            console.log(res.data.data);
            this.renderGraph(res.data.data)
        });
    }

    renderGraph(answer_data) {
        let answer_labels = ['A', 'B', 'C', 'D', 'E']
        let answer_ratings = [0, 0, 0, 0, 0]

        for (let i = 0; i < answer_data.length; i++) {
            let answer = answer_data[i].answer;
            let total = answer_data[i].numAnswers;
            let index = answer_labels.indexOf(answer);
            answer_ratings[index] = total;
        }

        const myChartRef = this.chartRef.current.getContext("2d");
        new Chart(myChartRef, {
            type: "bar",
            data: {
                //Bring in data
                labels: answer_labels,
                datasets: [
                    {
                        backgroundColor: "rgba(231, 76, 60, 0.38)",
                        borderColor: "#e74c3c",
                        borderWidth: 2,
                        label: "Rating",
                        data: answer_ratings,
                    }
                ]
            },
            options: {
                //Customize chart options
                scales: {
                    yAxes: [{
                        ticks: {
                            min: 0
                        }
                    }]
                },
                responsive: true,
                legend: {
                    position: 'bottom',
                },
                animation: {
                    duration: 0
                }
            }
        });
    }

    render() {
        return (
            <div className={"graphContainer"}>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>

        );
    }
}

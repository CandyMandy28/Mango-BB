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
            graphData: {},
            chart: {}
        };
    }

    chartRef = React.createRef();
    componentDidMount() {
        // this.fetchAnswers();
        this.renderGraph();
    }

    fetchAnswers = (questionID, correctAnswer) => {
        let url = "http://localhost:4000/api/responses/live/" + questionID;
        axios.get(url).then((res) => {
            this.setState({ answer: res.data.data });
            this.updateData(res.data.data, correctAnswer);
        });
    }

    updateData(answer_data, correctAnswer) {
        let answer_labels = ['A', 'B', 'C', 'D', 'E'];
        
        for (let i = 0; i < answer_data.length; i++) {
            let answer = answer_data[i].answer;
            let total = answer_data[i].numAnswers;
            let index = answer_labels.indexOf(answer);
            let colorIndex = answer_labels.indexOf(correctAnswer);

            this.state.chart.data.datasets[0].data[index] = total;
            this.state.chart.data.labels[index] = answer;
            this.state.chart.data.datasets[0].backgroundColor[colorIndex] = "rgba(50,205,50,.38)";
            this.state.chart.data.datasets[0].borderColor[colorIndex] = "#32CD32";
            this.state.chart.update();
        }
    }

    renderGraph() {
        let answer_labels = ['A', 'B', 'C', 'D', 'E'];
        let answer_ratings = [0, 0, 0, 0, 0]

        const myChartRef = this.chartRef.current.getContext("2d");
        let chart = new Chart(myChartRef, {
            type: "bar",
            data: {
                //Bring in data
                labels: answer_labels,
                datasets: [
                    {
                        backgroundColor: ['rgba(231, 76, 60, 0.38)','rgba(231, 76, 60, 0.38)','rgba(231, 76, 60, 0.38)','rgba(231, 76, 60, 0.38)','rgba(231, 76, 60, 0.38)'],
                        borderColor: ["#e74c3c","#e74c3c","#e74c3c","#e74c3c","#e74c3c"],
                        borderWidth: 2
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
                    display: false,
                    position: 'bottom'
                }
            }
        });

        this.setState({ chart: chart });
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

import React from "react";
import { Button, Form, Modal, Checkbox, Icon, Grid, Progress, Table } from "semantic-ui-react";

import "../assets/Style.scss";

export default class LivePolling extends React.Component {

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

    componentDidMount() {

    }

    // fetchResponses() {
    //     let url = "http://localhost:4000/api/responses/" + localStorage.getItem('netid');
    //     axios.get(url).then((res) => {
    //         this.setState({ responses: res.data.data });
    //     });
    // }

    handleOpen = () => {
        this.setState({ modalOpen: true });
        this.setState({ options: [] })
        this.startTimer();

        // this.fetchResponses();
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

    render() {
        return (
            <Grid columns={1}>
                <Grid.Row>
                    <Grid.Column width={12}>
                        <h3>Q: Which direction does the sun rise in?</h3>
                    </Grid.Column>
                    {/* <Progress percent={this.state.timePercent} indicating>Time Remaining: {this.state.timeValue} secs</Progress> */}
                </Grid.Row>
            </Grid>
        );
    }
}

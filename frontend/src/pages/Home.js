import React from "react";
import { Grid, Reveal, Image, Checkbox, Menu, Header } from "semantic-ui-react";
import Sidebar from "./components/Sidebar";
import axios from 'axios';

export default class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  render() {
    return (
      <div className={"pageCont"}>
        <div className={"sidebarCont"}>
          <Sidebar></Sidebar>
        </div>

        <div className={"mainCont"}>
          <Header as='h1'>Course Page</Header>
          <div class="ui clearing divider"></div>    
          <div class="ui three column doubling stackable grid container">
            <div class="row">
              <div class="column">
                <p></p>
              </div>
              <div class="column">
                <p></p>
              </div>
              <div class="column">
                <button class="ui labeled icon right floated button">
                  <i class="add icon"></i>
                  Add Course
                </button>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <div className={"container"}>
                  <div class="ui raised very padded text segment"> 
                    <h1 class="ui header">CS 411</h1>
                    <h3 class="ui header">Rank: </h3>
                    <h3 class="ui header">Attendance: </h3>
                  </div>
                </div>
              </div>
              <div class="column">
                <div className={"container"}>
                  <div class="ui raised very padded text segment"> 
                    <h1 class="ui header">CS 411</h1>
                    <h3 class="ui header">Rank: </h3>
                    <h3 class="ui header">Attendance: </h3>
                  </div>
                </div>
              </div>
              <div class="column">
                <div className={"container"}>
                  <div class="ui raised very padded text segment">
                    <h1 class="ui header">CS 411</h1>
                    <h3 class="ui header">Rank: </h3>
                    <h3 class="ui header">Attendance: </h3>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <div className={"container"}>
                  <div class="ui raised very padded text segment">
                    <h1 class="ui header">CS 411</h1>
                    <h3 class="ui header">Rank: </h3>
                    <h3 class="ui header">Attendance: </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>

      </div>
    );
  }
}

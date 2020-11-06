import React from "react";
import { Grid, Reveal, Image, Checkbox, Menu, Header } from "semantic-ui-react";
import Sidebar from "./components/Sidebar";
import axios from 'axios';

export default class Search extends React.Component {

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
          <Header as='h1'>Add Course</Header>
          <div class="ui clearing divider"></div>   
          {/* <div className={"container"}> */}

            <div class="ui fluid category search">
              <div class="ui icon input">
                <input class="prompt" type="text" placeholder="Search courses..."></input>
                <i class="search icon"></i>
              </div>
              <div class="results"></div>
            </div>

            <div class="ui relaxed divided list">
              <div class="item">
                <div class="content">
                  <button class="ui labeled icon right floated negative button">
                    <i class="minus icon"></i>
                    Remove
                  </button>
                  <button class="ui labeled icon right floated positive button">
                    <i class="add icon"></i>
                    Add
                  </button>
                  <h3 class="header">CS 411: Database Systems</h3>
                  
                </div>
              </div>
              <div class="item">
                <div class="content">
                  <button class="ui labeled icon right floated negative button">
                    <i class="minus icon"></i>
                    Remove
                  </button>
                  <button class="ui labeled icon right floated positive button">
                    <i class="add icon"></i>
                    Add
                  </button>
                  <h3 class="header">CS 411: Database Systems</h3>
                  
                </div>
              </div>
            </div>

          {/* </div> */}
        </div>
      </div>
    );
  }
}

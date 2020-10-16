import React from "react";
import { Grid, Reveal, Image, Checkbox, Menu, Header } from "semantic-ui-react";
import Sidebar from "./components/Sidebar";
import axios from 'axios';

export default class Collection extends React.Component {

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
          <Header as='h1'>Collections</Header>
          <div className={"container"}>

          </div>
        </div>
      </div>
    );
  }
}

import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import { faHome, faSearch, faFilm, faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../assets/Style.scss";

export default class Sidebar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isSignedIn: true
    }
  }

  render () {
    return (
      <div className={"navCont"}>
        {this.state.isSignedIn ? "" : <Redirect to="/" push={true} />}
        <NavLink to={"/home"} exact >
          <FontAwesomeIcon icon={faHome} />
        </NavLink>
        <NavLink to={"/search"}>
          <FontAwesomeIcon icon={faSearch} />
        </NavLink>
        <NavLink to={"/collection"}>
          <FontAwesomeIcon icon={faFilm} />
        </NavLink>
        <NavLink to={"/profile"}>
          <FontAwesomeIcon icon={faUser} />
        </NavLink>
        <NavLink to={"/"} className={"btnSignOut"}>
          <FontAwesomeIcon icon={faLock} />
        </NavLink>
      </div>
    );
  }
}

import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import { faHome, faSearch, faFilm, faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../assets/Style.scss";

export default class Sidebar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isSignedIn: true,
      hideSearch: false
    }
  }

  componentDidMount () {
    if (!localStorage.getItem('email') || !localStorage.getItem('email').length > 0) {
      this.setState({isSignedIn: false})
    }
    if (localStorage.getItem('acc_type') == '2') {
      this.setState({hideSearch: true})
    }
  }

  handleSignOut () {
    localStorage.clear();
  }

  render () {
    return (
      <div className={"navCont"}>
        {this.state.isSignedIn ? "" : <Redirect to="/" push={true} />}
        <NavLink to={"/home"} exact className={this.props.url=="teacherAttendance" ? "active" : ""} >
          <FontAwesomeIcon icon={faHome} />
        </NavLink>
        
        {!this.state.hideSearch ? 
          <NavLink to={"/search"}>
            <FontAwesomeIcon icon={faSearch} /> 
          </NavLink>
        : ""}
        
        {/* <NavLink to={"/collection"}>
          <FontAwesomeIcon icon={faFilm} />
        </NavLink> */}
        <NavLink to={"/profile"}>
          <FontAwesomeIcon icon={faUser} />
        </NavLink>
        <NavLink to={"/"} onClick={this.handleSignOut} className={"btnSignOut"}>
          <FontAwesomeIcon icon={faLock} />
        </NavLink>
      </div>
    );
  }
}

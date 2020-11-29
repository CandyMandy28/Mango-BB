import React from "react";
import { Input, Button, Tab, Dropdown } from "semantic-ui-react";
import axios from 'axios';
import bcrypt from 'bcryptjs';

export default class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      name: "",
      netid: "",
      email: "",
      password: "",
      acc_type: 0,
      eemail_not_found: false,
      password_not_match: false,
      error: ""
    }
  }

  login() {
    let url = "http://localhost:4000/api/users/" + this.state.email;
    this.setState({ email_not_found: false, password_not_match: false });
    axios.get(url).then(res => {
      if (res != null) {
        let user_data = res.data.data[0];
        if (user_data == null) {
          this.setState({ email_not_found: true });
        }
        else {
          bcrypt.compare(this.state.password, user_data.password).then(isMatch => {
            if (isMatch) {
              localStorage.setItem('email', user_data.email);
              localStorage.setItem('netid', user_data.netid);
              localStorage.setItem('acc_type', user_data.acc_type);
              this.props.history.push('/home');
            }
            else {
              this.setState({ password_not_match: true });
            }
          });
        }
      }
    });
  }

  signup() {
    let url = "http://localhost:4000/api/users";
    bcrypt.hash(this.state.password, 10, (err, hash) => {
      let body = {
        name: this.state.name,
        netid: this.state.netid,
        email: this.state.email,
        password: hash,
        acc_type: this.state.acc_type
      }
      axios.post(url, body).then(res => {
        localStorage.setItem('email', this.state.email);
        localStorage.setItem('netid', this.state.netid);
        localStorage.setItem('acc_type', this.state.acc_type);
        this.props.history.push('/home');
      })
      .catch(err => {
        this.setState({ error: err.response.data.data.errors.email.message })
        if (err.response.data.data.errors.email.kind === "unique") {
          this.setState({ error: "Email has already been taken." })
        }
      });
    });
  }

  handleOnChangeName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  handleOnChangeNetid = (e) => {
    this.setState({
      netid: e.target.value,
    });
  };

  handleOnChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  handleOnChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleOnChangeType = (e, { value }) => {
    this.setState({
        acc_type: value,
    });
  }

  onClickLogin = async (e) => {
    this.login();
  };

  onClickSignup = async (e) => {
    this.signup();
  };

  options = [
    { key: 'Student', text: 'Student', value: 1 },
    { key: 'Teacher', text: 'Teacher', value: 2 }
  ]

  panes = [
    { menuItem: 'Login', render: () =>
      <Tab.Pane>
        <Input placeholder='Email' name="loginEmail" type='email' onChange={this.handleOnChangeEmail} />
        <Input placeholder='Password' name="loginPassword" type='password' onChange={this.handleOnChangePassword} />
        {this.state.email_not_found && <div className="ui red message">
          <p>Email is invalid or not found.</p>
        </div>}
        {this.state.password_not_match && <div className="ui red message">
          <p>Incorrect password.</p>
        </div>}
        <Button onClick={this.onClickLogin} primary>Login</Button>
      </Tab.Pane>
    },
    { menuItem: 'Signup', render: () => 
      <Tab.Pane>
        <Input placeholder='Name' name="signupName" onChange={this.handleOnChangeName} />
        <Input placeholder='Net Id' name="signupNetid" onChange={this.handleOnChangeNetid} />
        <Input placeholder='Email' name="signupEmail" type='email' onChange={this.handleOnChangeEmail} />
        <Input placeholder='Password' name="signupPassword" type='password' onChange={this.handleOnChangePassword} />
        <Dropdown placeholder='Type' selection options={this.options} onChange={this.handleOnChangeType}/>
        {this.state.error !== "" && <div className="ui red message">
          <p>{this.state.error}</p>
        </div>}
        <Button onClick={this.onClickSignup} primary>Signup</Button>
      </Tab.Pane> 
    }
  ]

  render() {
    return (
      <div className={"pageCont"}>
        <div className={"loginCont"}>
          <div className={"loginTab"}>
            <Tab panes={this.panes} />
          </div>
        </div>
      </div>
    );
  }
}

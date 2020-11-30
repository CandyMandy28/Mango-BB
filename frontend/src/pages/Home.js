import React from "react";
import { Divider, Header } from "semantic-ui-react";
import Sidebar from "./components/Sidebar";

import StudentCourses from "./components/StudentCourses";
import TeacherCourses from "./components/TeacherCourses";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className={"pageCont"}>
        
        <div className={"sidebarCont"}>
          <Sidebar></Sidebar>
        </div>

        <div className={"mainCont"}>
          <Header as="h1">Course Page</Header>
          <Divider />
          <div className={"container"}>
            {localStorage.getItem("acc_type") == 1
              ? <StudentCourses></StudentCourses>
              : <TeacherCourses></TeacherCourses>
            }
          </div>
        </div>
      </div>
    );
  }
}

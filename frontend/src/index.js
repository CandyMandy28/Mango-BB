import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { Route, BrowserRouter as Router } from "react-router-dom";

import 'semantic-ui/dist/semantic.min.css'

// Custom Components
import Home from "./pages/Home";
import Search from "./pages/Search";
import Collection from "./pages/Collection";
import Profile from "./pages/Profile";
import Login from "./pages/Login";


const routing = (
  <Router>
    <div>
      <Route exact path="/" component={Login} />
      <Route path="/home" component={Home} />
      <Route path="/search" component={Search} />
      <Route path="/collection" component={Collection} />
      <Route path="/profile" component={Profile} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

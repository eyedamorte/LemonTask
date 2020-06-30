import React from "react";
import { Route } from "react-router-dom";
import Login from "./containers/Login";
import News from "./containers/News";
import Profile from "./containers/Profile";
import Main from "./containers/Main";

const BaseRouter = () => (
  <div>
    <Route exact path="/" component={Main} />{" "}
    <Route exact path="/login" component={Login} />{" "}
    <Route exact path="/news/" component={News} />{" "}
    <Route exact path="/profile/" component={Profile} />{" "}

  </div>
);

export default BaseRouter;

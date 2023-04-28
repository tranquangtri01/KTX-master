import React from "react";
import { Switch, Route } from "react-router-dom";

import "../../assets/css-front/plugins.css";
import "../../assets/css-front/style.css";
import Header from "./common/Header";
import Home from "./home";
import Notficication from "./notification";
export const HomeLayout = ({ setAuth }) => {
  return (
    <div className="content-wrapper">
      <Header />
      <Switch>
        <Route path={`/notification`} component={Notficication} />
        <Route path={`/`} exact component={Home} />
      </Switch>
    </div>
  );
};

export default HomeLayout;

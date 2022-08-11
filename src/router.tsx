import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Home from "./examples/home";
import Custom from "./examples/custom";

import Layout from "./layout";

// import { links, linksApp } from "./links";

const NotFound = () => (
  <p>
    <i>Page Not Found</i>
  </p>
);

const AppRouter = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route exact path="/custom" component={Custom} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
};

export default () => {
  return (
    <Router>
      <Switch>
        <AppRouter />
      </Switch>
    </Router>
  );
};

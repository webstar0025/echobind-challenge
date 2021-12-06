import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";

import Layout from "components/Layout";
import HomePage from "pages/Home";
import ResidentPage from "pages/Resident";

const Routes = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/resident/:id" component={ResidentPage} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    </Router>
  );
};

export default Routes;

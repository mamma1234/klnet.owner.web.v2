/*!

=========================================================
* Material Dashboard PRO React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import AuthLayout from "layouts/Auth.js";
//import RtlLayout from "layouts/RTL.js";
import AdminLayout from "layouts/Admin.js";
import ServiceLayout from "layouts/Service.js";
import Landing from "views/Pages/Landing/LandingPage.js";
//import BoardTest from "components/Board/Board_test.js";

//import Service from "views/Pages/TermsOfService.js";
//import Policy from "views/Pages/PrivacyPolicy.js";
import Certify from 'views/Pages/phone_certify.js';


import "assets/scss/material-dashboard-pro-react.scss?v=1.8.0";

//import { Provider } from 'mobx-react';

//import userStore from './store/userStore';
//import trackStore from './store/trackStore';
// import { AsyncLocalStorage } from "async_hooks";
//console.log("index");
//const stores = { userStore, trackStore };
// onst hydrate = create({storage:AsyncLocalStorage})

const hist = createBrowserHistory();

const NoMatch = (arg) => {
  console.log(arg);
  return (
  <h3>Not Found Page</h3>
  );
}

ReactDOM.render(
  // <Provider>
  // <Provider rootStore={rootStore}>
  //<Provider { ...stores }>
    <Router history={hist}>
      <Switch>
        <Route path="/" exact component={Landing} /> 
        <Route path="/authpage" component={AuthLayout} />
        <Route path="/admin" component={AdminLayout} />
        <Route path="/svc" component={ServiceLayout} />
        <Route path="/landing" component={Landing} />
        <Route path="/return_certify" component={Certify} />
        <Route component={NoMatch} />
      </Switch>
    </Router>,
  //</Provider>,
  document.getElementById("root")
);

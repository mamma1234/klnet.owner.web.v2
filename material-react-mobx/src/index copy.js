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
// import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

// import AuthLayout from "layouts/Auth.js";
//import RtlLayout from "layouts/RTL.js";
// import AdminLayout from "layouts/Admin.js";
// import ServiceLayout from "layouts/Service.js";
// import Landing from "views/Pages/Landing/LandingPage.js";
//import BoardTest from "components/Board/Board_test.js";

//import Service from "views/Pages/TermsOfService.js";
//import Policy from "views/Pages/PrivacyPolicy.js";
// import Certify from 'views/Pages/phone_certify.js';

// import SampleLayout from "layouts/Sample.js";


// import "assets/scss/material-dashboard-pro-react.scss?v=1.8.0";

import { Provider } from 'mobx-react';

// import userStore from './store/userStore';
// import trackStore from './store/trackStore';
// import { AsyncLocalStorage } from "async_hooks";

// const stores = { userStore, trackStore };
// onst hydrate = create({storage:AsyncLocalStorage})

// const hist = createBrowserHistory();

// const NoMatch2 = ({ location2 }) => (
//   <h3>No match for <code>{location2.pathname}</code></h3>
// )

const NoMatch = (arg) => {
  console.log(arg);
  return (
  <h3>No match for </h3>
  );
}

const users = [
  {
    id: "1",
    name: "Nathan",
    role: "Web Developer"
  },
  {
    id: "2",
    name: "Johnson",
    role: "React Developer"
  },
  {
    id: "3",
    name: "Alex",
    role: "Ruby Developer"
  }
];

const Users = (arg) => {
  console.log('arg:', arg);
  const match = arg.match
  return (
    <>
      <ul>
        {users.map(({ name, id }) => (
          <li key={id}>
            <Link to={`${match.url}/${id}`}>{name}</Link>
          </li>
        ))}
      </ul>
      <Route path={`${match.url}/:id`} component={User} />
      <hr />
    </>
  );
};

const User = (arg) => {
  console.log('arg:', arg);
  const match = arg.match
  console.log('match:', match);
  const user = users.find(user => user.id === match.params.id);

  return (
    <div>
      Hello! I'm {user.name} and I'm a {user.role}
    </div>
  );
};


ReactDOM.render(
    <Router>
      <Switch>
        {/* <Route path="/" exact component={Landing} /> */}
        {/* <Route path="/sample" component={SampleLayout} /> */}
        <Route path="/users" component={Users} />
        {/* <Route path="/authpage" component={AuthLayout} />
        <Route path="/admin" component={AdminLayout} />
        <Route path="/svc" exact component={ServiceLayout} />
        <Route path="/landing" exact component={Landing} />
        <Route path="/return_certify" component={Certify} /> */}
        <Route component={NoMatch} />
      </Switch>
    </Router>,
  document.getElementById("root")
);

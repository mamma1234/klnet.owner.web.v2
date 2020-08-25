import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
// import "./styles.css";

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

class NavigationComponent extends React.Component {
  render() {
    return (
      <>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About page</Link>
          </li>
          <li>
            <Link to="/users">Users page</Link>
          </li>
        </ul>
        <hr />
      </>
    );
  }
}

const Home = () => {
  return <div>This is the home page</div>;
};

const About = () => {
  return <div>This is the about page</div>;
};

const Users = ({ match }) => {
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

const User = ({ match }) => {
  console.log(match.params.id);
  const user = users.find(user => user.id === match.params.id);

  return (
    <div>
      Hello! I'm {user.name} and I'm a {user.role}
    </div>
  );
};

class RouterNavigationSample extends React.Component {
  render() {
    return (
      <Router>
      <Switch>
          {/* <NavigationComponent /> */}
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/users" component={Users} />
      </Switch>
      </Router>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<RouterNavigationSample />, rootElement);

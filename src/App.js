import React, { Component } from "react";
import {
  Route,
  Redirect,
  Switch,
  NavLink,
  Link,
  withRouter
} from "react-router-dom";

const Privacy = () => <h4>Privacy Settings</h4>;
const Profile = () => <h4>Profile Settings</h4>;

function Settings() {
  return (
    <div>
      <h3>Settings Page</h3>
      <Link to="/settings/privacy">To Privacy</Link>
      <Link to="/settings/profile">To Profile</Link>
      <Switch>
        <Route path="/settings/privacy" component={Privacy} />
        <Route path="/settings/profile" component={Profile} />
      </Switch>
    </div>
  );
}

function Register() {
  return <h3>Register Page</h3>;
}

function Login() {
  return <h3>Login Page</h3>;
}

function TimeLine() {
  return <h3>Timeline Page</h3>;
}

function NotFound() {
  return <p>Ouch! Not found!</p>;
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { loggedIn: false };
    this.onLoginToggle = this.onLoginToggle.bind(this);
    this.toPrivacySettings = this.toPrivacySettings.bind(this);
  }

  onLoginToggle() {
    this.setState({ loggedIn: !this.state.loggedIn });
  }

  toPrivacySettings() {
    this.props.history.push("/settings/privacy");
  }

  render() {
    const { loggedIn } = this.state;

    return (
      <div>
        <h1>I am the app</h1>
        <NavLink to="/settings">To Settings</NavLink>
        <NavLink to="/login">To Login</NavLink>
        <Link to="/register">To Register</Link>
        <Link to="/timeline">To Timeline</Link>
        <button onClick={this.toPrivacySettings}>
          To Privacy Settings Programmatic
        </button>
        <button onClick={this.onLoginToggle}>
          {loggedIn ? "Log out" : "Log in"}
        </button>
        {loggedIn ? (
          <Switch>
            <Route path="/timeline" component={TimeLine} />
            <Route path="/settings" component={Settings} />
            <Redirect from="/(login|register)" to="/settings" exact />
            <Redirect from="/" to="/settings" exact />
            <Route component={NotFound} />
          </Switch>
        ) : (
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Redirect to="/login" />
          </Switch>
        )}
      </div>
    );
  }
}

export default withRouter(App);

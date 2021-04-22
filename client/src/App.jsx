import React, { Component } from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { signOut, verify } from './services/authentication';

import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/navbar';

import Home from './views/Home';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import Profile from './views/Profile';
import OrderForm from './views/OrderForm';
import OrderList from './views/OrderList';
import AnnouncementForm from './views/AnnouncementForm';
import './App.css';

class App extends Component {
  state = {
    user: null,
    loaded: false
  };

  // see if there is an authenticated user
  async componentDidMount() {
    const user = await verify();
    this.handleUserChange(user);
    this.setState({ loaded: true });
  }

  // set user object returned from authentication to state of app
  handleUserChange = (user) => {
    this.setState({ user });
  };

  // sign out user and remove user from state
  handleSignOut = async () => {
    await signOut();
    this.handleUserChange(null);
  };

  render() {
    const user = this.state.user;

    return (
      <BrowserRouter>
        <Navbar user={this.state.user} onSignOut={this.handleSignOut}></Navbar>
        <Switch>
          <Route
            path="/"
            render={(props) => <Home {...props} user={this.state.user} />}
            exact
          />

          <ProtectedRoute
            path="/sign-in"
            render={(props) => (
              <SignIn {...props} onUserChange={this.handleUserChange} />
            )}
            authorized={!user}
            redirect="/"
            exact
          />
          <ProtectedRoute
            path="/sign-up"
            render={(props) => (
              <SignUp {...props} onUserChange={this.handleUserChange} />
            )}
            authorized={!user}
            redirect="/"
            exact
          />
          <ProtectedRoute
            path="/order"
            render={(props) => (
              <OrderForm {...props} user={this.state.user}></OrderForm>
            )}
            //component={OrderForm}
            authorized={user}
            redirect="/sign-in"
            exact
          />
          <ProtectedRoute
            path="/announcement"
            component={AnnouncementForm}
            authorized={user}
            redirect="/sign-in"
            exact
          />
          <ProtectedRoute
            path="/list"
            component={OrderList}
            authorized={user && user.isAdministrator}
            redirect="/sign-in"
            exact
          />
          <ProtectedRoute
            path="/:id"
            component={Profile}
            authorized={user}
            redirect="/sign-in"
            exact
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

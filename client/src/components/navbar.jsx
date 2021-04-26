import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.scss';
import hamburger from './../views/photos/list.png';

class Navbar extends React.Component {
  state = {
    navDisplay: false
  };

  toggleNavbar = () => {
    this.setState({
      navDisplay: !this.state.navDisplay
    });
  };
  render() {
    return (
      <nav className="navbar">
        <div className="navHamburger">
          <button onClick={this.toggleNavbar}>
            {' '}
            <img src={hamburger} alt="ham" height="40" />
          </button>

          <Link to="/" className="navTitle link">
            <strong>Home</strong>
          </Link>
        </div>

        <div className="navLinkContainer">
          {(this.props.user && (
            <>
              <button onClick={this.toggleNavbar}>
                {' '}
                <Link
                  to={`/${this.props.user._id}`}
                  className={` ${
                    this.state.navDisplay ? 'navDisplay' : 'navLink'
                  }`}
                >
                  {this.props.user.name}
                </Link>
              </button>

              <button onClick={this.toggleNavbar}>
                <Link
                  to="/order"
                  className={` ${
                    this.state.navDisplay ? 'navDisplay' : 'navLink'
                  }`}
                >
                  Place an Order
                </Link>
              </button>
              <button onClick={this.toggleNavbar}>
                <Link
                  to="/announcement"
                  className={` ${
                    this.state.navDisplay ? 'navDisplay' : 'navLink'
                  }`}
                >
                  Create an announcement
                </Link>
              </button>

              {this.props.user.isAdministrator && (
                <button onClick={this.toggleNavbar}>
                  <Link
                    to="/list"
                    className={` ${
                      this.state.navDisplay ? 'navDisplay' : 'navLink'
                    }`}
                  >
                    See all Orders
                  </Link>
                </button>
              )}
              {this.props.user.isAdministrator && (
                <button onClick={this.toggleNavbar}>
                  <Link
                    to="/userlist"
                    className={` ${
                      this.state.navDisplay ? 'navDisplay' : 'navLink'
                    }`}
                  >
                    Users' size list
                  </Link>
                </button>
              )}

              <button
                onClick={this.props.onSignOut}
                className={` ${
                  this.state.navDisplay ? 'navDisplay' : 'navLink'
                }`}
              >
                Sign Out
              </button>
            </>
          )) || (
            <>
              <Link
                to="/sign-in"
                className={` ${
                  this.state.navDisplay ? 'navDisplay' : 'navLink'
                }`}
              >
                Sign In
              </Link>
              <Link
                to="/sign-up"
                className={` ${
                  this.state.navDisplay ? 'navDisplay' : 'navLink'
                }`}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    );
  }
}

export default Navbar;

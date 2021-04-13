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
          <Link to="/" className="navTitle">
            <strong>Ballet Company App</strong>
          </Link>
        </div>

        <div className="navLinkContainer">
          {(this.props.user && (
            <>
              <Link
                to={`/${this.props.user._id}`}
                className={` ${
                  this.state.navDisplay ? 'navDisplay' : 'navLink'
                }`}
              >
                {this.props.user.name}
              </Link>
              <Link
                to="/order"
                className={` ${
                  this.state.navDisplay ? 'navDisplay' : 'navLink'
                }`}
              >
                Place an Order
              </Link>

              <Link
                to="/announcement"
                className={` ${
                  this.state.navDisplay ? 'navDisplay' : 'navLink'
                }`}
              >
                Create an announcement
              </Link>
              {this.props.user.isAdministrator && (
                <Link
                  to="/list"
                  className={` ${
                    this.state.navDisplay ? 'navDisplay' : 'navLink'
                  }`}
                >
                  See all Orders
                </Link>
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

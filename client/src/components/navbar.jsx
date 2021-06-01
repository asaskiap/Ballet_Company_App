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
      <nav>
        <h1>The Ballet Company App</h1>
        <div className="navbar">
          <div className="navHamburger">
            <button onClick={this.toggleNavbar} className="navHamburger">
              {' '}
              <img src={hamburger} alt="ham" height="40" />
            </button>
          </div>

          <div
            className={`  ${
              this.state.navDisplay ? 'navDisplay' : 'navLinkContainer'
            }`}
          >
            <button>
              {' '}
              <Link to="/">
                <strong>Home</strong>
              </Link>
            </button>
            {(this.props.user && (
              <>
                <button onClick={this.toggleNavbar}>
                  {' '}
                  <Link to={`/${this.props.user._id}`}>
                    {this.props.user.name}
                  </Link>
                </button>

                <button onClick={this.toggleNavbar}>
                  <Link to="/order">Place an Order</Link>
                </button>
                
                {this.props.user.isAdministrator && 
                  (<button onClick={this.toggleNavbar}>
                  <Link to="/announcement">Create an announcement</Link>
                </button>)}

                {this.props.user.isAdministrator && (
                  <button onClick={this.toggleNavbar}>
                    <Link to="/list">See all Orders</Link>
                  </button>
                )}
                {this.props.user.isAdministrator && (
                  <button onClick={this.toggleNavbar}>
                    <Link to="/userlist">Users' size list</Link>
                  </button>
                )}


                <button onClick={this.props.onSignOut}>Sign Out</button>
              </>
            )) || (
              <>
                <button>
                  {' '}
                  <Link to="/sign-in">Sign In</Link>
                </button>
                <button>
                  <Link to="/sign-up">Sign Up</Link>
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;

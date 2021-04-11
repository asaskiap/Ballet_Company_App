import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.scss';
const Navbar = ({ user, onSignOut }) => {
  return (
    <nav className="navbar">
      <Link to="/" className="navLink">
        <strong>Ballet Company App</strong>
      </Link>

      <div>
        {(user && (
          <>
            <Link to={`/${user._id}`} className="navLink">
              {user.name}
            </Link>
            <Link to="/order" className="navLink">
              Place an Order
            </Link>
            {user.isAdministrator && (
              <Link to="/list" className="navLink">
                See all Orders
              </Link>
            )}

            <button onClick={onSignOut}>Sign Out</button>
          </>
        )) || (
          <>
            <Link to="/sign-in" className="navLink">
              Sign In
            </Link>
            <Link to="/sign-up" className="navLink">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

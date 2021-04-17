import React, { Component } from 'react';
import { signUp } from './../services/authentication';
import './authenticate.scss';
class SignUp extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    admin: false,
    picture:
      'https://res.cloudinary.com/dlrdquvjq/image/upload/v1618512395/e4leivcd2lhunmbkwu3q.png',
    adminPinInput: '',
    adminPin: 'Cab1Helm2Zen3Tilt'
  };

  handleFormSubmission = async (event) => {
    event.preventDefault();
    // if admin is checked, see if pin matches
    if (this.state.admin) {
      if (!(this.state.adminPin === this.state.adminPinInput)) {
        alert('Wrong Pin! You cannot sign up as ADMINISTRATOR. ');
        return;
      }
    }
    const { name, email, password, admin, picture } = this.state;
    // if you want to send file to the back end with the request body, we cannot send a simple object but it must be an object with the type FormData
    const data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('password', password);
    data.append('admin', admin);
    data.append('picture', picture);

    const user = await signUp(data);
    this.props.onUserChange(user);
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const { name } = event.target;
    this.setState({
      [name]: file
    });
  };

  handleCheckboxInputChange = (event) => {
    const { name, checked } = event.target;
    this.setState({
      [name]: checked
    });
  };

  render() {
    return (
      <main className="auth">
        <header>
          <h1>Sign Up</h1>
        </header>
        <form onSubmit={this.handleFormSubmission}>
          <label htmlFor="name-input">Name</label>
          <input
            id="name-input"
            type="text"
            placeholder="Enter your name"
            name="name"
            required
            value={this.state.name}
            onChange={this.handleInputChange}
          />

          <label htmlFor="email-input">Email</label>
          <input
            id="email-input"
            type="email"
            placeholder="Enter your email"
            name="email"
            required
            value={this.state.email}
            onChange={this.handleInputChange}
          />

          <label htmlFor="password-input">Password</label>
          <input
            id="password-input"
            type="password"
            placeholder="Choose a password"
            name="password"
            required
            value={this.state.password}
            onChange={this.handleInputChange}
          />

          <label htmlFor="profile-picture-input">Profile Picture</label>
          <input
            id="profile-picture-input"
            type="file"
            name="picture"
            onChange={this.handleFileInputChange}
          />
          <section className="adminInput">
            <label htmlFor="admin-input">Admin</label>
            <input
              id="admin-input"
              type="checkbox"
              name="admin"
              value={this.state.admin}
              onChange={this.handleCheckboxInputChange}
            />
          </section>
          <label htmlFor="admin-pin-input">Admin Pin </label>
          <input
            id="admin-pin-input"
            type="text"
            name="adminPinInput"
            value={this.state.adminPinInput}
            onChange={this.handleInputChange}
          />
          <button>Sign Up</button>
        </form>
      </main>
    );
  }
}

export default SignUp;

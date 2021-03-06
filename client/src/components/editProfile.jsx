import React, { Component } from 'react';
import './../views/profile.scss';
import { updateProfile } from '../services/profile';

class EditProfile extends Component {
  state = {
    name: '',
    email: '',
    picture: '',
    password: '',
    //pointe shoes
    pt_brand: '',
    pt_maker: '',
    pt_model: '',
    pt_size: 0,
    pt_width: '',
    pt_color: '',
    //soft shoes
    ss_brand: '',
    ss_size: 0,
    ss_width: '',
    ss_color: '',
    //
    dress_size: '',
    sock_size: '',
    shoe_size: 0
  };

  componentDidMount() {
    console.log(this.props.user);
    this.resetState(this.props.user);
  }

  handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const { name } = event.target;
    this.setState({
      [name]: file
    });
  };

  resetState = (user) => {
    this.setState({
      name: user.name,
      email: user.email,
      picture: user.profilePicture,
      pt_brand: user.pt_brand,
      pt_size: user.pt_size,
      pt_maker: user.pt_maker,
      pt_model: user.pt_model,
      pt_width: user.pt_width,
      pt_color: user.pt_color,
      ss_brand: user.ss_brand,
      ss_size: user.ss_size,
      ss_color: user.ss_color,
      ss_width: user.ss_width,
      dress_size: user.dress_size,
      sock_size: user.sock_size,
      shoe_size: user.shoe_size
    });
  };
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  handleFormSubmission = async (event) => {
    event.preventDefault();

    const {
      name,
      email,
      password,
      picture,
      pt_brand,
      pt_maker,
      pt_model,
      pt_size,
      pt_width,
      pt_color,
      ss_brand,
      ss_size,
      ss_width,
      ss_color,
      dress_size,
      sock_size,
      shoe_size
    } = this.state;

    const userRef = this.props.user._id
    const values = {
      name,
      email,
      password,
      picture,
      pt_brand,
      pt_maker,
      pt_model,
      pt_size,
      pt_width,
      pt_color,
      ss_brand,
      ss_size,
      ss_width,
      ss_color,
      dress_size,
      sock_size,
      shoe_size,
      userRef
    };

    // if you want to send file to the back end with the request body, we cannot send a simple object but it must be an object with the type FormData
    const data = new FormData();

    for (let key in values) {
      const val = values[key];
      data.append(key, val);
    }

    await updateProfile(data, this.props.user._id);

    this.props.onCompletedProfileEdit();
  };
  render() {
    return (
      <div className="wrapper profile editProfile">
        <h1>
          Edit Profile <small>and size preferences</small>
        </h1>

        <form onSubmit={this.handleFormSubmission}>
          <section>
            <h4>Profile Info</h4>
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
          </section>
          <section>
            {' '}
            <h4>Pointe Shoes</h4>
            <label htmlFor="pt-brand-select">Brand</label>
            <select
              name="pt_brand"
              value={this.state.pt_brand}
              id="pt-brand-select"
              onChange={this.handleInputChange}
            >
              <option value="">--Please choose a brand--</option>
              <option value="freed">Freed</option>
              <option value="bloch">Bloch</option>
              <option value="grishko">Grishko</option>
            </select>
            <label htmlFor="model-input">Model</label>
            <input
              id="model-input"
              type="string"
              placeholder="model name"
              name="pt_model"
              value={this.state.pt_model}
              onChange={this.handleInputChange}
            />
            <label htmlFor="maker-select">Maker</label>
            <select
              name="pt_maker"
              id="maker-select"
              value={this.state.pt_maker}
              onChange={this.handleInputChange}
            >
              <option value="">--Please choose a maker--</option>
              <option value="heart">???? (heart)</option>
              <option value="club">??? (club)</option>
              <option value="butterfly">&#129419; (butterfly)</option>
              <option value="fish">???? (fish)</option>
              <option value="maleteesecross">&#5869; (maleteese cross)</option>
              <option value="star">&#8902; (star)</option>
              <option value="diamond">&#9674; (diamond)</option>
              <option value="triangle">&#9651; (triangle)</option>
              <option value="clef">&#119070; (clef)</option>
              <option value="anchor">&#9875; (anchor)</option>
              <option value="crown">&#9819; (crown)</option>
              <option value="shield">&#128737; (shield)</option>
              <option value="wineglass">&#127864; (wineglass)</option>
              <option value="castle">&#9963; (castle) </option>
              <option value="squiggle">&#9137; (squiggle) </option>
              <option value="L">L</option>
              <option value="R">R</option>
              <option value="D">D</option>
              <option value="Z">Z</option>
              <option value="Q">Q</option>
              <option value="T">T</option>
              <option value="Y">Y</option>
              <option value="B">B</option>
              <option value="N">N</option>
            </select>
            <label htmlFor="pt-size-input">Size</label>
            <input
              id="pt-size-input"
              type="number"
              placeholder="size"
              name="pt_size"
              min="0"
              max="60"
              value={this.state.pt_size}
              onChange={this.handleInputChange}
            />
            <label htmlFor="pt-width-select">Width</label>
            <select
              name="pt_width"
              id="pt-width-select"
              value={this.state.pt_width}
              onChange={this.handleInputChange}
            >
              <option value="">--Please choose a width--</option>
              <option value="X">X</option>
              <option value="XX">XX</option>
              <option value="XXX">XXX</option>
            </select>

            <label htmlFor="pt_color-select">Color</label>
            <select
              name="pt_color"
              id="pt_color-select"
              value={this.state.pt_color}
              onChange={this.handleInputChange}
            >
              <option value="">--Please choose a color--</option>
              <option value="pink">Pink</option>
              <option value="bronze">Bronze</option>
              <option value="brown">Brown</option>
            </select>

          </section>

          
          <section>
            <h4>Soft Shoes </h4>

            <label htmlFor="ss_brand-select">Brand</label>
            <select
              name="ss_brand"
              id="ss_brand-select"
              value={this.state.ss_brand}
              onChange={this.handleInputChange}
            >
              <option value="">--Please choose a brand--</option>
              <option value="bloch">Bloch</option>
              <option value="sansha">Sansha</option>
            </select>
            <label htmlFor="size-input">Size</label>
            <input
              id="size-input"
              type="number"
              placeholder="size"
              name="ss_size"
              min="0"
              max="60"
              value={this.state.ss_size}
              onChange={this.handleInputChange}
            />
            <label htmlFor="width-select">Width</label>
            <select
              name="ss_width"
              id="width-select"
              value={this.state.ss_width}
              onChange={this.handleInputChange}
            >
              <option value="">--Please choose a width--</option>

              <option value="N">N</option>
              <option value="M">M</option>
              <option value="W">W</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="EE">EE</option>
              <option value="C">C</option>
            </select>

            <label htmlFor="color-select">Color</label>
            <select
              name="ss_color"
              id="color-select"
              value={this.state.ss_color}
              onChange={this.handleInputChange}
            >
              <option value="">--Please choose a color--</option>
              <option value="suntan">Sun Tan</option>
              <option value="black">Black</option>
              <option value="white">White</option>
              <option value="brown">Brown</option>
            </select>
          </section>
          <section>
            {' '}
            <h4>Other</h4>
            <label htmlFor="dress-size-select">Dress Size</label>
            <select
              name="dress_size"
              id="dress-size-select"
              value={this.state.dress_size}
              onChange={this.handleInputChange}
            >
              <option value="">--Please choose a size--</option>
              <option value="S">Small</option>
              <option value="M">Medium</option>
              <option value="L">Large</option>
            </select>
            <label htmlFor="sock_size-select">Sock Size</label>
            <select
              name="sock_size"
              id="sock_size-select"
              value={this.state.sock_size}
              onChange={this.handleInputChange}
            >
              <option value="">--Please choose a size--</option>
              <option value="S">Small</option>
              <option value="M">Medium</option>
              <option value="L">Large</option>
            </select>
            <label htmlFor="shoe-size-input">General Shoe Size</label>
            <input
              id="shoe-size-input"
              type="number"
              min="0"
              max="60"
              placeholder="shoe size"
              name="shoe_size"
              value={this.state.shoe_size}
              onChange={this.handleInputChange}
            />
            <button>Submit Changes</button>
          </section>
        </form>
      </div>
    );
  }
}

export default EditProfile;

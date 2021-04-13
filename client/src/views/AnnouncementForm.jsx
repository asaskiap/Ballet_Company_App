import React, { Component } from 'react';
import { createAnnouncement } from '../services/announcements';

export class OrderForm extends Component {
  state = {
    title: '',
    message: '',
    image: '',
    importantFlag: false
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

  handleAnnouncement = async (event) => {
    event.preventDefault();
    const { title, message, importantFlag, image } = this.state;

    const data = new FormData();
    data.append('title', title);
    data.append('message', message);
    data.append('importantFlag', importantFlag);
    data.append('image', image);

    await createAnnouncement(data);
    // redirect user to home page

    this.props.history.push('/');
  };
  render() {
    return (
      <div className="createAnnouncementForm">
        <h1>Create an Announcement</h1>
        <form onSubmit={this.handleAnnouncement}>
          {' '}
          <label htmlFor="name-input">Title</label>
          <input
            id="title-input"
            type="text"
            placeholder="Enter title"
            name="title"
            required
            value={this.state.title}
            onChange={this.handleInputChange}
          />
          <label htmlFor="message-input">Message (optional)</label>
          <input
            id="message-input"
            type="string"
            placeholder="Enter an optional message"
            name="message"
            value={this.state.message}
            onChange={this.handleInputChange}
          />
          <label htmlFor="image-input">Image (optional)</label>
          <input
            id="image-input"
            type="file"
            name="image"
            onChange={this.handleFileInputChange}
          />
          <label htmlFor="importantFlag-input">Important Flag</label>
          <input
            id="importantFlag-input"
            type="checkbox"
            name="importantFlag"
            value={this.state.importantFlag}
            onChange={this.handleCheckboxInputChange}
          />
          <button>Post Announcement!</button>
        </form>
      </div>
    );
  }
}

export default OrderForm;

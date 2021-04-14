import React, { Component } from 'react';
import { createAnnouncement } from '../services/announcements';
import './announcement.scss';

export class AnnouncementForm extends Component {
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
        <header>
          <h1>Create an Announcement</h1>
        </header>

        <form onSubmit={this.handleAnnouncement}>
          {' '}
          <section>
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
            <label htmlFor="message-input">
              Message <i>(optional)</i>
            </label>
            <textarea
              id="message-input"
              type="string"
              placeholder="Enter an optional message"
              name="message"
              value={this.state.message}
              onChange={this.handleInputChange}
            />
            <span>
              <label htmlFor="image-input">
                Image <i>(optional)</i>
              </label>
              <input
                id="image-input"
                type="file"
                name="image"
                onChange={this.handleFileInputChange}
              />
            </span>
            <span>
              <label htmlFor="importantFlag-input">Flag as important</label>
              <input
                id="importantFlag-input"
                type="checkbox"
                name="importantFlag"
                value={this.state.importantFlag}
                onChange={this.handleCheckboxInputChange}
              />
            </span>
          </section>
          <button>Post Announcement!</button>
        </form>
      </div>
    );
  }
}

export default AnnouncementForm;

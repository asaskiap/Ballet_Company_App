import React, { Component } from 'react';
import { editAnnouncement } from '../services/announcements';

export class EditAnnouncementForm extends Component {
  state = {
    title: '',
    message: '',
    importantFlag: false
  };

  componentDidMount() {
    const { title, message, importantFlag } = this.props.announcement;
    this.setState({
      title,
      message,
      importantFlag
    });
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleCheckboxInputChange = (event) => {
    const { name, checked } = event.target;
    this.setState({
      [name]: checked
    });
  };

  handleAnnouncementEdit = async (event) => {
    event.preventDefault();
    const { title, message, importantFlag } = this.state;

    await editAnnouncement(this.props.announcement._id, {
      title,
      message,
      importantFlag
    });

    this.props.onCompletedEdit();
  };
  render() {
    return (
      <div className=" editAnnouncementForm">
        <h2>Edit Announcement</h2>
        <form onSubmit={this.handleAnnouncementEdit}>
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
            <label htmlFor="importantFlag-input">Flag as important</label>
            <input
              id="importantFlag-input"
              type="checkbox"
              name="importantFlag"
              checked={this.state.importantFlag}
              value={this.state.importantFlag}
              onChange={this.handleCheckboxInputChange}
            />
          </span>
          <button>Edit Announcement</button>
        </form>
      </div>
    );
  }
}
export default EditAnnouncementForm;

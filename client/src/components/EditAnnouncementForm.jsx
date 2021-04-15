import React, { Component } from 'react';
import { editAnnouncement } from '../services/announcements';

export class EditAnnouncementForm extends Component {
  state = {
    title: '',
    message: '',
    importantFlag: false,
    image: ''
  };

  componentDidMount() {
    const { title, message, importantFlag, image } = this.props.announcement;
    this.setState({
      title,
      message,
      importantFlag,
      image
    });
  }

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

  handleAnnouncementEdit = async (event) => {
    event.preventDefault();
    const { title, message, importantFlag, image } = this.state;
    console.log(image);
    const data = new FormData();
    data.append('title', title);
    data.append('message', message);
    data.append('importantFlag', importantFlag);
    data.append('image', image);

    console.log(data);
    await editAnnouncement(this.props.announcement._id, data);

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

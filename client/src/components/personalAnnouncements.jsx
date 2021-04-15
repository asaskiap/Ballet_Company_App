import React, { Component } from 'react';
import './../views/announcement.scss';

class PersonalAnnouncements extends Component {
  render() {
    return (
      this.props.announcements && (
        <div className="personalAnnouncements">
          <h2>Announcements</h2>
          {this.props.announcements.map((announcement) => {
            return (
              <div key={announcement._id} className="single">
                <h4>{announcement.title}</h4>
                <p>{announcement.message}</p>

                <p>
                  <div>
                    <img
                      src={announcement.image}
                      alt="announcement_image"
                      height="100"
                    />
                  </div>
                  <div className="announcementButtons">
                    <button
                      onClick={() =>
                        this.props.editAnnouncement(announcement._id)
                      }
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        this.props.deleteAnnouncement(announcement._id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </p>
              </div>
            );
          })}
        </div>
      )
    );
  }
}

export default PersonalAnnouncements;

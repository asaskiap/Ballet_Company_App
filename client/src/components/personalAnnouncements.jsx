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
                  {announcement.image && (
                    <section>
                      <img
                        src={announcement.image}
                        alt="announcement_image"
                        height="100"
                      />
                    </section>
                  )}

                  <section className="announcementButtons">
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
                  </section>
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

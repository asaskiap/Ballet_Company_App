import React, { Component } from 'react';
import './home.scss';
import './announcement.scss';
import { loadAnnouncements } from '../services/announcements';
import SingleAnnouncement from '../components/SingleAnnouncement';

export class Home extends Component {
  state = {
    announcements: null,
  };
  async componentDidMount() {
    const announcements = await loadAnnouncements();
    this.setState({
      announcements,
    });
  }
  render() {
    const announcements = this.state.announcements;
    return (
      <div className="landingPage">
        <section className="homeView"></section>
            { announcements &&
              <section className="announcementView">
                        <main>
                          <h1>Announcements</h1>
              {announcements.map((a) => {
                return (
                  a.creator_isAdmin && (
                    <SingleAnnouncement
                      key={a._id}
                      announcement={a}
                      user={this.props.user}
                    ></SingleAnnouncement>
                  )
                );
              })
            }
              </main>
                </section>
              }
          
      </div>
    );
  }
}

export default Home;

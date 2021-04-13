import React, { Component } from 'react';
import './home.scss';
import { loadAnnouncements } from '../services/announcements';

export class Home extends Component {
  state = {
    announcements: null
  };
  async componentDidMount() {
    const announcements = await loadAnnouncements();
    this.setState({
      announcements
    });
  }
  render() {
    const announcements = this.state.announcements;
    return (
      <div className="landingPage">
        <section className="homeView">
          <h1>Welcome </h1>
          <h2>to BC-App</h2>
        </section>

        <section className="announcementView">
          <main>
            <h1>This is the main section</h1>
            {announcements &&
              announcements.map((a) => {
                if (a.creator_isAdmin) {
                  return (
                    <div key={a._id} className="singleAnnouncement main">
                      <h4>{a.title}</h4>
                      <p>{a.message}</p>
                      {a.image && <img src={a.image} alt=""></img>}
                    </div>
                  );
                }
              })}
          </main>
          <aside>
            <h2>This is the aside</h2>
            {announcements &&
              announcements.map((a) => {
                if (!a.creator_isAdmin) {
                  return (
                    <div key={a._id} className="singleAnnouncement aside">
                      <h4>{a.title}</h4>
                      <p>{a.message}</p>
                      {a.image && <img src={a.image} alt="" width="100"></img>}
                    </div>
                  );
                }
              })}
          </aside>
        </section>
      </div>
    );
  }
}

export default Home;

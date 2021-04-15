import React, { Component } from 'react';
import './home.scss';
import './announcement.scss';
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
            <h1>Official Announcements</h1>
            {announcements &&
              announcements.map((a) => {
                if (a.creator_isAdmin) {
                  return (
                    <div
                      key={a._id}
                      className={`singleAnnouncement main ${
                        a.importantFlag ? 'singleAnnouncement_important' : ''
                      }`}
                    >
                      <h4>{a.title}</h4>
                      <p>{a.message}</p>
                      {a.image && <img src={a.image} alt=""></img>}
                      <small>
                        {a.creator_name}{' '}
                        <img
                          src={a.creator_picture}
                          alt=""
                          height="50"
                          className="profilePicture_singleAnnouncement"
                        />{' '}
                        | {a.editDate.split('T')[0]}
                      </small>
                    </div>
                  );
                } else return <></>;
              })}
          </main>
          <aside>
            <h2>Private announcements</h2>
            {announcements &&
              announcements.map((a) => {
                if (!a.creator_isAdmin) {
                  return (
                    <div
                      key={a._id}
                      className={`singleAnnouncement aside ${
                        a.importantFlag ? 'singleAnnouncement_important' : ''
                      }`}
                    >
                      <h4>{a.title}</h4>
                      <p>{a.message}</p>
                      {a.image && <img src={a.image} alt="" width="100"></img>}
                      <small>
                        {a.creator_name}{' '}
                        <img
                          src={a.creator_picture}
                          alt=""
                          height="50"
                          className="profilePicture_singleAnnouncement"
                        />{' '}
                        | {a.editDate.split('T')[0]}
                      </small>
                    </div>
                  );
                } else return <></>;
              })}
          </aside>
        </section>
      </div>
    );
  }
}

export default Home;

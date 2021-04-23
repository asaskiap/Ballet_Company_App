import React, { Component } from 'react';
import Comments from './Comments';
import { loadCommentsByAnnouncement } from '../services/comments';
import './../views/announcement.scss';
export class SingleAnnouncement extends Component {
  state = {
    displayComments: false,
    commentsList: null
  };

  async componentDidMount() {
    await this.loadComments();
  }
  loadComments = async () => {
    const id = this.props.announcement._id;
    const commentsList = await loadCommentsByAnnouncement(id);
    console.log(commentsList);
    this.setState({
      commentsList
    });
  };
  toggleComments = () => {
    this.setState({
      displayComments: !this.state.displayComments
    });
  };

  onCreateComment = async () => {
    await this.loadComments();
  };
  render() {
    const a = this.props.announcement;
    return (
      <div
        className={`singleAnnouncement ${
          a.creator_isAdmin ? 'main' : 'aside'
        }  ${a.importantFlag ? 'singleAnnouncement_important' : ''}`}
      >
        <h4>{a.title}</h4>
        <p>{a.message}</p>
        {a.image && (
          <img
            src={a.image}
            alt=""
            width={a.creator_isAdmin ? '' : '100'}
          ></img>
        )}
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
        <button onClick={this.toggleComments} className="ToggleCommentsBtn">
          Show Comments
        </button>
        {this.state.displayComments && (
          <Comments
            announcement_id={a._id}
            commentsList={this.state.commentsList}
            onCreateComment={this.onCreateComment}
            user={this.props.user}
          ></Comments>
        )}
      </div>
    );
  }
}

export default SingleAnnouncement;

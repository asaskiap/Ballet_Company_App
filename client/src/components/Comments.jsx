import React, { Component } from 'react';
import { createComment } from '../services/comments';
import './comments.scss';
import SingleComment from './SingleComment';
export class Comments extends Component {
  state = {
    comment: ''
  };

  createComment = async (event) => {
    event.preventDefault();
    const content = this.state.comment;
    //refer to announcement you are commenting on
    const ref = this.props.announcement_id;
    await createComment({ content, ref });
    this.setState({
      comment: ''
    });
    await this.props.onCreateComment();
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  render() {
    return (
      <div className="Comments">
        {this.props.commentsList && (
          <section>
            {this.props.commentsList.map((single) => (
              <SingleComment
                key={single._id}
                content={single}
                user={this.props.user}
                reloadComments={this.props.onCreateComment}
              />
            ))}
          </section>
        )}

        <form onSubmit={this.createComment}>
          <label htmlFor="commentInput">Comment:</label>
          <input
            id="commentInput"
            type="textarea"
            name="comment"
            rows="3"
            cols="20"
            onChange={this.handleInputChange}
            value={this.state.comment}
          />
          <button>Post Comment</button>
        </form>
      </div>
    );
  }
}

export default Comments;

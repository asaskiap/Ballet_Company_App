import React, { Component } from 'react';
import { editComment, deleteComment } from '../services/comments';
import './comments.scss';

export class SingleComment extends Component {
  state = {
    displayEditForm: false,
    comment: ''
  };

  componentDidMount() {
    this.setState({
      comment: this.props.content.comment
    });
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  toggleEditForm = () => {
    this.setState({
      displayEditForm: !this.state.displayEditForm
    });
  };

  editComment = async (event) => {
    event.preventDefault();
    const content = this.state.comment;
    const id = this.props.content._id;
    console.log(content, id);
    await editComment(id, { content });
    this.setState({
      comment: ''
    });
    await this.props.reloadComments();
    this.toggleEditForm();
  };

  deleteComment = async (id) => {
    await deleteComment(id);
    //trigger rerender
    await this.props.reloadComments();
  };

  render() {
    console.log(this.props.content, this.props.content.creator, this.props.content.creator.name)

    return (
      <div className="SingleComment">
        {this.props.content.comment}{' '}
        <small>
          <i>{this.props.content.creator.name}</i>
          {this.props.content.creator._id === this.props.user._id && (
            <span className="CommentButtons">
              <button onClick={this.toggleEditForm}>Edit</button>
              <button
                onClick={() => this.deleteComment(this.props.content._id)}
              >
                Delete
              </button>
            </span>
          )}
        </small>
        {this.state.displayEditForm && (
          <form onSubmit={this.editComment} className="CommentEditForm">
            {' '}
            <label htmlFor="commentInput">Edit Comment:</label>
            <input
              id="commentInput"
              type="textarea"
              name="comment"
              rows="3"
              cols="20"
              onChange={this.handleInputChange}
              value={this.state.comment}
            />
            <button>Edit Comment</button>
          </form>
        )}
      </div>
    );
  }
}

export default SingleComment;

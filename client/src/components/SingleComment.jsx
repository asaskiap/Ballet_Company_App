import React, { Component } from 'react';
import { editComment, deleteComment } from '../services/comments';
import './comments.scss';

export class SingleComment extends Component {
  state = {
    displayEditForm: false,
    comment: '',
    creatorName: '',
    creatorId: null
  };

  componentDidMount() {
    this.setState({
      comment: this.props.content.comment,
      creatorName: this.props.content.creator.name,
      creatorId: this.props.content.creator._id
    });
    console.log('in cdm', this.state, this.props)
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

    return (
      <div className="SingleComment">
        {this.state.comment}{' '}
        <small>
          {console.log('in render', this.state.creatorName)}
          <i>{this.state.creatorName}</i>
          {this.state.creatorId === this.props.user._id && (
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

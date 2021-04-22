import React, { Component } from 'react';
import { loadUserList } from './../services/users';
import './userlist.scss';

export class UserList extends Component {
  state = {
    users: null
  };
  async componentDidMount() {
    const users = await loadUserList();
    this.setState({
      users
    });
  }
  render() {
    return (
      <div className="UserList">
        <header>
          <h1>Users' Size Preferences</h1>
        </header>
        {this.state.users &&
          this.state.users.map((user) => (
            <div className="SingleUser">
              <h6>{user.name}</h6>{' '}
              <p>
                <span>General Shoe Size: {user.shoe_size}</span>{' '}
                <span>Dress Size: {user.dress_size}</span>{' '}
                <span>Sock Size: {user.sock_size}</span> <span></span>
              </p>
              <p>
                {' '}
                <span>Soft Shoe Brand: {user.ss_brand}</span>{' '}
                <span>
                  Soft Shoe Size: {user.ss_size} | {user.ss_width}
                </span>{' '}
                <span>Preferred Soft Shoe color: {user.ss_color}</span>
                <span></span>
              </p>
              <p>
                <span>Pointe Shoe Brand: {user.pt_brand}</span>{' '}
                <span>
                  Pointe Shoe Size: {user.pt_size} | {user.pt_size}
                </span>{' '}
                <span>Pointe Shoe Model: </span>{' '}
                <span>Pointe Shoe Maker: {user.pt_maker}</span>{' '}
              </p>
            </div>
          ))}
      </div>
    );
  }
}

export default UserList;

import React, { Component } from 'react';
import { loadUser } from './../services/authentication';
import { loadPersonalOrders } from './../services/profile';
import { loadSingleOrder } from './../services/orders';
import PersonalOrderList from './PersonalOrderList';
import EditProfile from './editProfile';
import EditOrderForm from './orderForms/editOrderForm';

import { deleteOrder } from './../services/orders';

import './profile.scss';

export class Profile extends Component {
  state = {
    user: null,
    displayEditForm: false,
    displayEditOrderForm: false,
    orderToEdit: null,
    orders: null
  };

  toggleEditProfile = () => {
    this.setState({
      displayEditForm: !this.state.displayEditForm
    });
    console.log(this.state.displayEditForm);
  };

  async componentDidMount() {
    //load user
    const user = await loadUser(this.props.match.params.id);
    this.setState({ user });
    // load users' orders
    this.loadOrders();
  }
  async loadOrders() {
    const orders = await loadPersonalOrders(this.state.user._id);
    this.setState({
      orders
    });
  }

  deleteOrder = async (id) => {
    await deleteOrder(id);
    await this.loadOrders();
    alert('oder deleted');
    console.log('deleted');
  };

  editOrder = async (id) => {
    const orderToEdit = await loadSingleOrder(id);

    this.setState({
      orderToEdit: orderToEdit
    });
    this.toggleEditOrderForm();
  };

  toggleEditOrderForm = () => {
    this.setState({
      displayEditOrderForm: true
    });
  };

  render() {
    return (
      <div className="wrapper profile">
        {this.state.user && (
          <section>
            <header>
              <h2>{this.state.user.name}</h2>
              <img
                className="pictureInProfileView"
                src={this.state.user.profilePicture}
                alt={this.state.user.name}
              ></img>
            </header>

            <div className="profileInfo">
              <h2>Personal Size and Brand Preferences</h2>
              <div>
                <h5>Pointe Shoe Preferences</h5>
                <p>
                  {' '}
                  <span>Brand: {this.state.user.pt_brand} | </span>
                  <span>Maker: {this.state.user.pt_maker} | </span>
                  <span>
                    Size: {this.state.user.pt_size} - {this.state.user.pt_width}{' '}
                    |
                  </span>
                </p>
              </div>
              <div>
                <h5>Soft Shoe Preferences</h5>
                <p>
                  {' '}
                  <span>Brand: {this.state.user.ss_brand} | </span>
                  <span>Color: {this.state.user.ss_color} | </span>
                  <span>
                    Size: {this.state.user.ss_size} - {this.state.user.ss_width}{' '}
                    |
                  </span>
                </p>
              </div>
              <div>
                <p>
                  <bold>Dress Size:</bold> {this.state.user.dress_size}
                </p>
                <p>
                  <bold>Shoe Size:</bold> {this.state.user.shoe_size}
                </p>

                <p>
                  <bold>Sock Size:</bold> {this.state.user.sock_size}
                </p>
              </div>
            </div>
          </section>
        )}
        <div className="profileOrdersDisplay">
          {this.state.orders && (
            <PersonalOrderList
              orders={this.state.orders}
              deleteOrder={this.deleteOrder}
              editOrder={this.editOrder}
            ></PersonalOrderList>
          )}
        </div>
        <div className="editOrderDisplay">
          {this.state.displayEditOrderForm && (
            <EditOrderForm
              order={this.state.orderToEdit}
              onCompletedEdit={this.toggleEditOrderForm}
            ></EditOrderForm>
          )}
        </div>

        <div className="editProfileDisplay">
          <button onClick={this.toggleEditProfile}>Edit Profile</button>{' '}
          {this.state.displayEditForm && (
            <EditProfile
              toggleEditProfile={this.toggleEditProfile}
              user={this.state.user}
            ></EditProfile>
          )}
        </div>
      </div>
    );
  }
}

export default Profile;

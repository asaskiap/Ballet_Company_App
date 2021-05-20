import React, { Component } from 'react';
import { loadUser } from './../services/authentication';
import {
  loadPersonalOrders,
  loadPersonalAnnouncements
} from './../services/profile';
import { loadSingleOrder } from './../services/orders';
import {
  deleteAnnouncement,
  loadSingleAnnouncement
} from './../services/announcements';
import PersonalOrderList from './../components/PersonalOrderList';
import EditProfile from './../components/editProfile';
import EditOrderForm from './../components/orderForms/editOrderForm';
import PersonalAnnouncements from './../components/personalAnnouncements';
import EditAnnouncementForm from './../components/EditAnnouncementForm';

import { deleteOrder } from './../services/orders';

import './profile.scss';

export class Profile extends Component {
  state = {
    user: null,
    displayPreferences: false,
    displayOrders: false,
    displayAnnouncements: false,
    displayEditForm: false,
    displayEditOrderForm: false,
    orderToEdit: null,
    orders: null,
    announcements: null,
    announcementToEdit: null,
    displayEditAnnouncementForm: false
  };

  async componentDidMount() {
    //load user
    const user = await loadUser(this.props.match.params.id);
    this.setState({ user });
    // load users' orders
    this.loadOrders();
    //load announcements
    this.loadAnnouncements();
  }

  // toggle Forms

  toggleEditProfile = () => {
    this.setState({
      displayEditForm: !this.state.displayEditForm
    });
    console.log(this.state.displayEditForm);
  };

  toggleEditOrderForm = () => {
    this.setState({
      displayEditOrderForm: !this.state.displayEditOrderForm
    });
  };

  toggleEditAnnouncementForm = () => {
    this.setState({
      displayEditAnnouncementForm: !this.state.displayEditAnnouncementForm
    });
  };

  // load Elements for state
  async loadUser() {
    const user = await loadUser(this.props.match.params.id);
    this.setState({ user });
  }

  async loadOrders() {
    const orders = await loadPersonalOrders(this.state.user._id);
    this.setState({
      orders
    });
  }

  async loadAnnouncements() {
    const announcements = await loadPersonalAnnouncements(this.state.user._id);
    this.setState({
      announcements
    });
  }

  // delete functions

  deleteOrder = async (id) => {
    await deleteOrder(id);
    await this.loadOrders();
    alert('oder deleted');
  };

  deleteAnnouncement = async (id) => {
    await deleteAnnouncement(id);
    await this.loadAnnouncements();
    alert('announcement deleted');
  };

  // edit functions
  editOrder = async (id) => {
    const orderToEdit = await loadSingleOrder(id);
    this.setState({
      orderToEdit: orderToEdit
    });
    this.toggleEditOrderForm();
    if (this.state.displayEditOrderForm) {
      document.getElementById('EditOrderForm').scrollIntoView();
    }
  };

  editAnnouncement = async (id) => {
    const announcementToEdit = await loadSingleAnnouncement(id);
    this.setState({
      announcementToEdit: announcementToEdit
    });
    this.toggleEditAnnouncementForm();
    if (this.state.displayEditAnnouncementForm) {
      document.getElementById('EditAnnouncementForm').scrollIntoView();
    }
  };

  // reset state and toggle forms on completed edit
  onCompletedProfileEdit = () => {
    this.loadUser();
    this.toggleEditProfile();
  };
  onCompletedOrderEdit = () => {
    this.loadOrders();
    this.toggleEditOrderForm();
  };
  onCompletedAnnouncementEdit = () => {
    this.loadAnnouncements();
    this.toggleEditAnnouncementForm();
  };

  displaySection(val) {
    this.setState({
      displayPreferences: false,
      displayAnnouncements: false,
      displayOrders: false
    });
    this.setState({
      [val]: !this.state[val]
    });
  }
  // display
  render() {
    return (
      <div className="profile">
        {this.state.user && (
          <>
            <header>
              {' '}
              <h2>{this.state.user.name}</h2>
              <img
                className="pictureInProfileView"
                src={this.state.user.profilePicture}
                alt={this.state.user.name}
              ></img>{' '}
            </header>
            <section className="orderButtons profileButtons">
              <a href="#FormFocus">
                <button
                  onClick={() => this.displaySection('displayPreferences')}
                >
                  Preferences
                </button>
              </a>
              <a href="#FormFocus">
                <button onClick={() => this.displaySection('displayOrders')}>
                  Orders
                </button>
              </a>
              <a href="#FormFocus">
                <button
                  onClick={() => this.displaySection('displayAnnouncements')}
                >
                  Announcements
                </button>
              </a>
            </section>
          </>
        )}
        {this.state.displayPreferences && (
          <div className="profileInfo" id="FormFocus">
            <h2> Size and Brand Preferences</h2>
            <div>
              <h5>Pointe Shoe Preferences</h5>
              <p>
                {' '}
                <span>Brand: {this.state.user.pt_brand.toUpperCase()} | </span>
                <span>Maker: {this.state.user.pt_maker.toUpperCase()} | </span>
                <span>Model: {this.state.user.pt_model.toUpperCase()} | </span>
                <span>
                  Size: {this.state.user.pt_size} - {this.state.user.pt_width} |
                </span>
              </p>
            </div>
            <div>
              <h5>Soft Shoe Preferences</h5>
              <p>
                {' '}
                <span>Brand: {this.state.user.ss_brand.toUpperCase()} | </span>
                <span>Color: {this.state.user.ss_color.toUpperCase()} | </span>
                <span>
                  Size: {this.state.user.ss_size} - {this.state.user.ss_width} |
                </span>
              </p>
            </div>
            <div>
              <h5>Other</h5>
              <p>Dress Size: {this.state.user.dress_size}</p>
              <p>Shoe Size: {this.state.user.shoe_size}</p>

              <p>Sock Size: {this.state.user.sock_size}</p>
            </div>
            <div className="editProfileDisplay">
              <a href="#FocusEditProfile">
                <button onClick={this.toggleEditProfile}>Edit</button>{' '}
              </a>
              {this.state.displayEditForm && (
                <div id="FocusEditProfile">
                  <EditProfile
                    onCompletedProfileEdit={this.onCompletedProfileEdit}
                    user={this.state.user}
                  ></EditProfile>
                </div>
              )}
            </div>
          </div>
        )}

        {this.state.displayOrders && (
          <>
            <div className="profileOrdersDisplay" id="FormFocus">
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
                <div id="EditOrderForm">
                  <EditOrderForm
                    order={this.state.orderToEdit}
                    onCompletedEdit={this.onCompletedOrderEdit}
                  ></EditOrderForm>
                </div>
              )}
            </div>{' '}
          </>
        )}
        {this.state.displayAnnouncements && (
          <>
            <div className="profileAnnouncementsDisplay" id="FormFocus">
              {!this.state.announcements.length && <h5>You have no announcements to display!</h5> }
              {!!this.state.announcements.length && <PersonalAnnouncements
                announcements={this.state.announcements}
                editAnnouncement={this.editAnnouncement}
                deleteAnnouncement={this.deleteAnnouncement}
              ></PersonalAnnouncements>}
             
            </div>
            {this.state.displayEditAnnouncementForm && (
              <div id="EditAnnouncementForm">
                <EditAnnouncementForm
                  announcement={this.state.announcementToEdit}
                  onCompletedEdit={this.onCompletedAnnouncementEdit}
                ></EditAnnouncementForm>
              </div>
            )}{' '}
          </>
        )}
      </div>
    );
  }
}

export default Profile;

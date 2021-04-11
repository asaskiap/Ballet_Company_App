import React, { Component } from 'react';
import {
  deleteOrder,
  listOrders,
  statusUpdateOrder
} from './../services/orders';
import './order.scss';
class OrderList extends Component {
  state = {
    orders: null
  };

  componentDidMount = () => {
    this.loadOrders();
  };

  async loadOrders() {
    const orderList = await listOrders();
    this.setState({
      orders: orderList
    });
    console.log(this.state);
  }

  async markInProcess(id) {
    await statusUpdateOrder({ inProcess: true, received: false }, id);
    this.loadOrders();
    console.log('done');
  }
  async markReceived(id) {
    await statusUpdateOrder({ inProcess: false, received: true }, id);
    this.loadOrders();

    console.log('done');
  }
  async deleteOrder(id) {
    await deleteOrder(id);
    this.loadOrders();
    console.log('deleted');
  }
  render() {
    return (
      <div className="wrapper displayOrderList ">
        <h1> List of Orders</h1>
        <div>
          {this.state.orders && (
            <div>
              <p className="orderItem_inList">
                <span className="orderItem_inList_name">Name</span>
                <span className="orderItem_inList_item">Item</span>
                <span className="orderItem_inList_brand">Brand</span>{' '}
                <span className="orderItem_inList_size">Size|Width</span>
                <span className="orderItem_inList_quantity">Quantity</span>{' '}
                <span className="orderItem_inList_comments">Comments</span>
              </p>
              {this.state.orders.map((order) => {
                return (
                  <p
                    className={`orderItem_inList ${
                      order.inProcess ? 'blue' : order.received ? 'green' : ''
                    }`}
                  >
                    <span className="orderItem_inList_name">
                      {order.creator_name}
                    </span>
                    <span className="orderItem_inList_item">{order.item}</span>
                    <span className="orderItem_inList_brand">
                      {order.brand}
                    </span>{' '}
                    <span className="orderItem_inList_size">
                      {order.size} | {order.width}
                    </span>
                    <span className="orderItem_inList_quantity">
                      {order.quantity}
                    </span>{' '}
                    <span className="orderItem_inList_comments">
                      {order.comments}
                    </span>
                    <span className="orderItem_inList_buttons">
                      <button onClick={() => this.markInProcess(order._id)}>
                        In Process
                      </button>{' '}
                      <button onClick={() => this.markReceived(order._id)}>
                        Received
                      </button>{' '}
                      <button onClick={() => this.deleteOrder(order._id)}>
                        Delete
                      </button>
                    </span>
                  </p>
                );
              })}
              {!this.state.orders && <p>No Orders to display! </p>}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default OrderList;

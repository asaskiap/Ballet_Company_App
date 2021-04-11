import React, { Component } from 'react';
import './order.scss';

class PersonalOrderList extends Component {
  render() {
    return (
      <div className="personalOrderList">
        <h2>Orders</h2>
        {!!this.props.orders.length && (
          <p>
            <span className="blue colorExplanation">IN PROCESS |</span>{' '}
            <span className="green colorExplanation">RECEIVED</span>
          </p>
        )}
        {!this.props.orders.length && (
          <p> -- You currently have no orders to display -- </p>
        )}

        {this.props.orders.map((order) => {
          return (
            <p
              className={`orderItem_inList ${
                order.inProcess ? 'blue' : order.received ? 'green' : ''
              }`}
            >
              <span className="orderItem_inList_item">{order.item}</span>
              <span className="orderItem_inList_brand">{order.brand}</span>{' '}
              <span className="orderItem_inList_size">
                {order.size} | {order.width}
              </span>
              <span className="orderItem_inList_quantity">
                {order.quantity}
              </span>{' '}
              <span className="orderItem_inList_comments">
                {order.comments}
              </span>
              <span className="personalOrderList_buttons">
                <button
                  className="personalOrderList_button"
                  onClick={() => this.props.editOrder(order._id)}
                >
                  Edit
                </button>
                <button
                  className="personalOrderList_button"
                  onClick={() => this.props.deleteOrder(order._id)}
                >
                  Delete
                </button>
              </span>
            </p>
          );
        })}
      </div>
    );
  }
}

export default PersonalOrderList;

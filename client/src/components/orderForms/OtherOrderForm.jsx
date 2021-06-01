import React, { Component } from 'react';
import './../../views/order.scss';
import { createOrder } from './../../services/orders';

class OtherOrderForm extends Component {
  state = {
    item: '',
    brand: '',
    maker: '',
    model: '',
    size: 0,
    color: '',
    width: '',
    quantity: 0,
    comments: ''
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  handleOrder = async (event) => {
    event.preventDefault();
    const {
      item,
      color,
      brand,
      maker,
      model,
      size,
      width,
      quantity,
      comments
    } = this.state;

    await createOrder({
      item,
      color,
      brand,
      maker,
      model,
      size,
      width,
      quantity,
      comments
    });
    //reset state of parent component to make order form disappear
    this.props.onOrderSubmission();
  };
  render() {
    return (
      <div className="orderForm other">
        <h2>Other Orders</h2>
        <form onSubmit={this.handleOrder}>
          <section>
            <label htmlFor="item-select">Choose an item:</label>
            <select
              name="item"
              id="item-select"
              onChange={this.handleInputChange}
            >
              <option value="">--Please choose an item--</option>
              <option value="socks">Socks</option>
              <option value="dance belt">Dance Belt</option>
              <option value="ribbons">Ribbons</option>
              <option value="elastic">Elastic</option>
              <option value="shellack">Shellack</option>
              <option value="kinesiotape">Kinesio Tape</option>
            </select>

            <label htmlFor="size-select">
              Size{' '}
              <small>
                <i>if applicable</i>
              </small>
            </label>
            <select
              id="size-select"
              type="string"
              placeholder="size"
              name="size"
              value={this.state.size}
              onChange={this.handleInputChange}
            >
              <option value="S">Small</option>
              <option value="M">Medium</option>
              <option value="L">Large</option>
            </select>

            <label htmlFor="color-select">
              Color{' '}
              <small>
                <i>if applicable</i>
              </small>
            </label>
            <select
              name="color"
              id="color-select"
              value={this.state.color}
              onChange={this.handleInputChange}
            >
              <option value="">--Please choose a color--</option>
              <option value="sun-tan">Sun Tan</option>
              <option value="black">Black</option>
              <option value="white">White</option>
              <option value="brown">Brown</option>
            </select>
          </section>
          <section>
            {' '}
            <label htmlFor="quantity-input">Quantity</label>
            <input
              id="quantity-input"
              type="number"
              min="0"
              max="60"
              placeholder="quantity"
              name="quantity"
              value={this.state.quantity}
              onChange={this.handleInputChange}
            />
            <label htmlFor="comments">Comments:</label>
            <textarea
              id="comments"
              name="comments"
              rows="5"
              cols="33"
              onChange={this.handleInputChange}
              value={this.state.comments}
            />
            <button className='otherBtn'>Submit Order</button>
          </section>
        </form>
      </div>
    );
  }
}

export default OtherOrderForm;

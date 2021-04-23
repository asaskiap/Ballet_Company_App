import React, { Component } from 'react';
import './../../views/order.scss';
import { createOrder } from './../../services/orders';

class SoftShoeOrderForm extends Component {
  state = {
    item: 'soft shoes',
    brand: '',
    maker: '',
    model: '',
    size: 0,
    color: '',
    width: '',
    quantity: 0,
    comments: ''
  };

  componentDidMount() {
    const user = this.props.user;
    this.setState({
      brand: user.ss_brand,
      size: user.ss_size,
      color: user.ss_color,
      width: user.ss_width
    });
  }
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
    console.log('soft shoe order created');
    //reset state of parent component to make order form disappear
    this.props.onOrderSubmission();
  };

  render() {
    return (
      <div className="orderForm">
        <h2>Soft Shoes </h2>
        <form onSubmit={this.handleOrder}>
          <section>
            <label htmlFor="brand-select">Brand</label>
            <select
              name="brand"
              id="brand-select"
              value={this.state.brand}
              onChange={this.handleInputChange}
            >
              <option value="">--Please choose a brand--</option>
              <option value="bloch">Bloch</option>
              <option value="sansha">Sansha</option>
            </select>
            <label htmlFor="size-input">Size</label>
            <input
              id="size-input"
              type="number"
              placeholder="size"
              name="size"
              value={this.state.size}
              onChange={this.handleInputChange}
            />
            <label htmlFor="width-select">Width</label>
            <select
              name="width"
              id="width-select"
              value={this.state.width}
              onChange={this.handleInputChange}
            >
              <option value="">--Please choose a width--</option>
              <option value="N">N</option>
              <option value="M">M</option>
              <option value="W">W</option>
            </select>
            <label htmlFor="color-select">Color</label>
            <select
              name="color"
              id="color-select"
              value={this.state.color}
              onChange={this.handleInputChange}
            >
              <option value="">--Please choose a color--</option>
              <option value="suntan">Sun Tan</option>
              <option value="black">Black</option>
              <option value="white">White</option>
              <option value="brown">Brown</option>
            </select>{' '}
          </section>
          <section>
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

            <button>Submit Order</button>
          </section>
        </form>
      </div>
    );
  }
}

export default SoftShoeOrderForm;

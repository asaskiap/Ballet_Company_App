import React, { Component } from 'react';
import './orderForms.scss';
import { createOrder } from './../../services/orders';

class PointeShoeOrderForm extends Component {
  state = {
    item: 'pointe shoes',
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
    console.log('order created');
    //reset state of parent component to make order form disappear
    this.props.onOrderSubmission();
  };

  render() {
    return (
      <div className="orderForm">
        <h2>Pointe Shoes </h2>
        <form onSubmit={this.handleOrder}>
          <section>
            <label htmlFor="brand-select">Brand</label>
            <select
              name="brand"
              id="brand-select"
              onChange={this.handleInputChange}
            >
              <option value="">--Please choose a brand--</option>
              <option value="freed">Freed</option>
              <option value="bloch">Bloch</option>
              <option value="grishko">Grishko</option>
            </select>
            <label htmlFor="model-input">Model</label>
            <input
              id="model-input"
              type="string"
              placeholder="model name"
              name="model"
              value={this.state.model}
              onChange={this.handleInputChange}
            />
            <label htmlFor="maker-select">Maker</label>
            <select
              name="maker"
              id="maker-select"
              value={this.state.maker}
              onChange={this.handleInputChange}
            >
              <option value="">--Please choose a maker--</option>
              <option value="heart">🤍</option>
              <option value="club">⚜</option>
              <option value="butterfly">🦋</option>
              <option value="fish">🐟</option>
            </select>{' '}
          </section>

          <section>
            {' '}
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
              <option value="X">X</option>
              <option value="XX">XX</option>
              <option value="XXX">XXX</option>
            </select>
            <label htmlFor="quantity-input">Quantity</label>
            <input
              id="quantity-input"
              type="number"
              placeholder="quantity"
              name="quantity"
              value={this.state.quantity}
              onChange={this.handleInputChange}
            />
          </section>
          <section>
            <label htmlFor="comments">Comments:</label>
            <textarea
              id="comments"
              name="comments"
              rows="5"
              cols="33"
              onChange={this.handleInputChange}
              value={this.state.comments}
            />
          </section>

          <section>
            <button>Submit Order</button>
          </section>
        </form>
      </div>
    );
  }
}

export default PointeShoeOrderForm;

import React, { Component } from 'react';
import './../order.scss';
import { editOrder } from './../../services/orders';

class EditOrderForm extends Component {
  state = {
    item: '',
    brand: '',
    maker: '',
    model: '',
    size: '',
    width: '',
    color: '',
    quantity: 0,
    comments: ''
  };

  componentDidMount() {
    const {
      item,
      brand,
      maker,
      model,
      size,
      width,
      color,
      quantity,
      comments
    } = this.props.order;
    this.setState({
      item,
      brand,
      maker,
      model,
      size,
      width,
      color,
      quantity,
      comments
    });
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleOrderEdit = async () => {
    const {
      item,
      brand,
      maker,
      model,
      size,
      width,
      color,
      quantity,
      comments
    } = this.state;
    await editOrder(this.props.order._id, {
      item,
      brand,
      maker,
      model,
      size,
      width,
      color,
      quantity,
      comments
    });
    this.props.onCompletedOrderEdit();
  };

  render() {
    return (
      <div className="orderForm editOrderForm">
        <h2>Edit Order</h2>
        <form onSubmit={this.handleOrderEdit}>
          <section>
            <label htmlFor="item-select">Choose an item:</label>
            <select
              name="item"
              id="item-select"
              value={this.state.item}
              onChange={this.handleInputChange}
            >
              <option value="">--Please choose an item--</option>
              <option value="pointe shoes">Pointe Shoes</option>
              <option value="soft shoes">Soft Shoes</option>
              <option value="socks">Socks</option>
              <option value="dance belt">Dance Belt</option>
              <option value="ribbons">Ribbons</option>
              <option value="elastic">Elastic</option>
              <option value="shellack">Shellack</option>
              <option value="kinesiotape">Kinesio Tape</option>
            </select>
            <label htmlFor="brand-select">Brand</label>
            <select
              name="brand"
              id="brand-select"
              value={this.state.brand}
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

            <button>Submit Changes</button>
          </section>
        </form>
      </div>
    );
  }
}

export default EditOrderForm;

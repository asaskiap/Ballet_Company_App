import React, { Component } from 'react';
import './../../views/order.scss';
import { createOrder } from './../../services/orders';

class PointeShoeOrderForm extends Component {
  state = {
    item: 'pointe shoes',
    brand: '',
    maker: '',
    model: '',
    size: 0,
    width: '',
    color: '',
    quantity: 0,
    comments: ''
  };

  componentDidMount() {
    const user = this.props.user;
    this.setState({
      brand: user.pt_brand,
      maker: user.pt_maker,
      model: user.pt_model,
      size: user.pt_size,
      width: user.pt_width,
      color: user.pt_color,
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

    const userRef = this.props.user._id

    await createOrder({
      item,
      color,
      brand,
      maker,
      model,
      size,
      width,
      quantity,
      comments,
      userRef
    });
    //reset state of parent component to make order form disappear
    this.props.onOrderSubmission();
  };

  render() {
    return (
      <div className="orderForm pointe">
        <h2>Pointe Shoes </h2>
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
              <option value="heart">🤍 (heart)</option>
              <option value="club">⚜ (club)</option>
              <option value="butterfly">&#129419; (butterfly)</option>
              <option value="fish">🐟 (fish)</option>
              <option value="maleteesecross">&#5869; (maleteese cross)</option>
              <option value="star">&#8902; (star)</option>
              <option value="diamond">&#9674; (diamond)</option>
              <option value="triangle">&#9651; (triangle)</option>
              <option value="clef">&#119070; (clef)</option>
              <option value="anchor">&#9875; (anchor)</option>
              <option value="crown">&#9819; (crown)</option>
              <option value="shield">&#128737; (shield)</option>
              <option value="wineglass">&#127864; (wineglass)</option>
              <option value="castle">&#9963; (castle) </option>
              <option value="squiggle">&#9137; (squiggle) </option>
              <option value="L">L</option>
              <option value="R">R</option>
              <option value="D">D</option>
              <option value="Z">Z</option>
              <option value="Q">Q</option>
              <option value="T">T</option>
              <option value="Y">Y</option>
              <option value="B">B</option>
              <option value="N">N</option>
            </select>{' '}
            <label htmlFor="size-input">Size</label>
            <input
              id="size-input"
              type="number"
              min="0"
              max="60"
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
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="EE">EE</option>
              <option value="C">C</option>
            </select>
          </section>

          <section>
          <label htmlFor="color-select">Color</label>
            <select
              name="color"
              id="color-select"
              value={this.state.color}
              onChange={this.handleInputChange}
            >
              <option value="">--Please choose a color--</option>
              <option value="pink">Pink</option>
              <option value="bronze">Bronze</option>
              <option value="brown">Brown</option>
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
            <label htmlFor="comments">Comments:</label>
            <textarea
              id="comments"
              name="comments"
              rows="5"
              cols="33"
              onChange={this.handleInputChange}
              value={this.state.comments}
            />
            <button className='pointeBtn'>Submit Order</button>
          </section>
        </form>
      </div>
    );
  }
}

export default PointeShoeOrderForm;

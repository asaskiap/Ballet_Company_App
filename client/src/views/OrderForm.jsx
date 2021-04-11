import React, { Component } from 'react';
import OtherOrderForm from './orderForms/OtherOrderForm';
import PointeShoeOrderForm from './orderForms/PointeShoeOrderForm';
import SoftShoeOrderForm from './orderForms/SoftShoeOrderForm';
import './order.scss';

export class OrderForm extends Component {
  state = {
    pointeShoeOrder: false,
    softShoeOrder: false,
    otherOrder: false,
    displayThankYouMessage: false
  };

  onOrderSubmission = () => {
    this.setState({
      displayThankYouMessage: true
    });
    this.resetState();
  };
  resetState() {
    this.setState({
      pointeShoeOrder: false,
      softShoeOrder: false,
      otherOrder: false
    });
  }

  displayOrderForm(val) {
    this.setState({
      displayThankYouMessage: false
    });
    this.resetState();
    this.setState({
      [val]: true
    });
    console.log(this.state);
  }
  render() {
    return (
      <div className="wrapper orderPage">
        <header>
          <h1>Place an Order...</h1>
        </header>
        <section className="orderButtons">
          <button onClick={() => this.displayOrderForm('pointeShoeOrder')}>
            Order Pointe Shoes
          </button>
          <button onClick={() => this.displayOrderForm('softShoeOrder')}>
            Order Soft Shoes
          </button>
          <button onClick={() => this.displayOrderForm('otherOrder')}>
            Other Orders
          </button>
        </section>

        <section className="displayOrderForm">
          {this.state.pointeShoeOrder && (
            <PointeShoeOrderForm onOrderSubmission={this.onOrderSubmission} />
          )}
          {this.state.softShoeOrder && (
            <SoftShoeOrderForm onOrderSubmission={this.onOrderSubmission} />
          )}
          {this.state.otherOrder && (
            <OtherOrderForm onOrderSubmission={this.onOrderSubmission} />
          )}
        </section>
        {this.state.displayThankYouMessage && (
          <div className="orderThankYouMessage">
            <h4>Thank you! Your order has been submitted.</h4>
          </div>
        )}
      </div>
    );
  }
}

export default OrderForm;

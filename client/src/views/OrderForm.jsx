import React, { Component } from 'react';
import OtherOrderForm from './../components/orderForms/OtherOrderForm';
import PointeShoeOrderForm from './../components/orderForms/PointeShoeOrderForm';
import SoftShoeOrderForm from './../components/orderForms/SoftShoeOrderForm';
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
          <section className="orderButtons">
            <a href="#FormFocus">
              <button onClick={() => this.displayOrderForm('pointeShoeOrder')}>
                Order Pointe Shoes
              </button>
            </a>
            <a href="#FormFocus">
              <button onClick={() => this.displayOrderForm('softShoeOrder')}>
                Order Soft Shoes
              </button>
            </a>
            <a href="#FormFocus">
              <button onClick={() => this.displayOrderForm('otherOrder')}>
                Other Orders
              </button>
            </a>
          </section>
        </header>

        <section className="displayOrderForm">
          {this.state.pointeShoeOrder && (
            <div id="FormFocus">
              {' '}
              <PointeShoeOrderForm
                onOrderSubmission={this.onOrderSubmission}
                user={this.props.user}
              />
            </div>
          )}
          {this.state.softShoeOrder && (
            <div id="FormFocus">
              <SoftShoeOrderForm
                onOrderSubmission={this.onOrderSubmission}
                user={this.props.user}
              />
            </div>
          )}
          {this.state.otherOrder && (
            <div id="FormFocus">
              <OtherOrderForm
                onOrderSubmission={this.onOrderSubmission}
                user={this.props.user}
              />
            </div>
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

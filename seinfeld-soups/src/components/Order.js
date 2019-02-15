import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";

class Order extends React.Component {
  static propTypes = {
    soups: PropTypes.object,
    order: PropTypes.object,
    removeFromOrder: PropTypes.func
  };

  renderOrder = key => {
    const soup = this.props.soups[key];
    const count = this.props.order[key];
    const isAvailable = soup && soup.status === "available";
    const transitionOptions = {
      classNames: "order",
      key,
      timeout: { enter: 500, exit: 500 }
    };

    if (!soup) return null;

    if (!isAvailable) {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>No {soup ? soup.name : "soup"}!</li>;
        </CSSTransition>
      );
    }
    return (
      <CSSTransition {...transitionOptions}>
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition
                classNames="count"
                key={count}
                timeout={{ enter: 500, exit: 500 }}
              >
                <span> {count} </span>
              </CSSTransition>
            </TransitionGroup>
          </span>
          {soup.name}
          <span>{formatPrice(count * soup.price)}</span>
          <button className="remove-soup" onClick={() => this.props.removeFromOrder(key)}>
            &times;
            </button>
        </li>
      </CSSTransition>
    );
  };

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const soup = this.props.soups[key];
      const count = this.props.order[key];
      const isAvailable = soup && soup.status === "available";

      if (isAvailable) {
        return prevTotal + count * soup.price;
      }
      return prevTotal;
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Your Order</h2>
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}{" "}
        </TransitionGroup>
        <div className="total">
          Total:
          <strong> {formatPrice(total)} </strong>
        </div>
      </div>
    );
  }
}

export default Order;

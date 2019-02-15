import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";

class Soup extends React.Component {
  static propTypes = {
    details: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number
    }),
    addToOrder: PropTypes.func
  };

  render() {
    const { image, name, price, desc, status } = this.props.details;
    const isAvailable = status === "available";

    return (
      <li className="menu-soup">
        <img src={image} alt={name} />
        <h3 className="soup-name">
          {name}
          <span className="soup-name"> {formatPrice(price)} </span>
        </h3>
        <p className="desc">{desc}</p>
        <button
          disabled={!isAvailable}
          onClick={() => this.props.addToOrder(this.props.index)}
        >
          {isAvailable ? "+ Place Order" : "No soup for you!"}
        </button>
      </li>
    );
  }
}

export default Soup;

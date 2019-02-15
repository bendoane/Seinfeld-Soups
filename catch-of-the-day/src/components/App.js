import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import sampleFishes from "../sample-soups";
import Soup from "./Soup";
import firebase from "firebase";
import base, { firebaseApp } from "../base";

class App extends React.Component {
  state = {
    soups: {},
    order: {}
  };

  static propTypes = {
    match: PropTypes.object
  };

  componentDidMount() {
    const { params } = this.props.match;
    // first reinstate our localStorage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }

    this.ref = base.syncState(`${params.storeId}/soups`, {
      context: this,
      state: "soups"
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addSoup = soup => {
    // copy state
    const soups = { ...this.state.soups };
    // add soup to the made copy
    soups[`soup${Date.now()}`] = soup;
    // set the state
    this.setState({ soups });
  };

  updateSoup = (key, updatedSoup) => {
    const soups = { ...this.state.soups };
    soups[key] = updatedSoup;
    this.setState({ soups });
  };

  deleteSoup = key => {
    const soups = { ...this.state.soups };
    soups[key] = null;
    this.setState({ soups });
  };

  loadSampleSoups = () => {
    this.setState({ soups: sampleFishes });
  };

  addToOrder = key => {
    // copy state
    const order = { ...this.state.order };
    // Add to order or update
    order[key] = order[key] + 1 || 1;
    // set the order state
    this.setState({ order });
  };

  removeFromOrder = key => {
    const order = { ...this.state.order };
    delete order[key];
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="New York's Finest" />
          <ul className="soups">
            {Object.keys(this.state.soups).map(key => (
              <Soup
                key={key}
                index={key}
                details={this.state.soups[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          soups={this.state.soups}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addSoup={this.addSoup}
          updateSoup={this.updateSoup}
          deleteSoup={this.deleteSoup}
          loadSampleSoups={this.loadSampleSoups}
          soups={this.state.soups}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;

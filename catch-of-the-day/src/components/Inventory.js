import React from "react";
import PropTypes from "prop-types";
import AddSoupForm from "./AddSoupForm";
import EditSoupForm from "./EditSoupForm";
import Login from "./Login";

import firebase from "firebase";
import base, { firebaseApp } from "../base";

class Inventory extends React.Component {
  static propTypes = {
    soup: PropTypes.object,
    updateSoup: PropTypes.func,
    deleteSoup: PropTypes.func
  };

  state = {
    uid: null,
    owner: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  authHandler = async authData => {
    //Look up the current store
    const store = await base.fetch(this.props.storeId, { context: this });
    //Claim it if there is no owner
    if (!store.owner) {
      // save it as our own
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      });
    }
    //Set to reflect the current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    });
  };

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };

  render() {
    const logout = <button onClick={this.logout}>Clock out!</button>;

    // Check for login status
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }
    // check ownership
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p> Good try, but this ain't your kitchen.</p>
        </div>
      );
    }
    // Must be owner, must be logged in.
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {Object.keys(this.props.soups).map(key => (
          <EditSoupForm
            key={key}
            index={key}
            soup={this.props.soups[key]}
            updateSoup={this.props.updateSoup}
            deleteSoup={this.props.deleteSoup}
          />
        ))}
        <AddSoupForm addSoup={this.props.addSoup} />
        <button onClick={this.props.loadSampleSoups}>Load Basic Soups</button>
        <br />
        {logout}
      </div>
    );
  }
}

export default Inventory;

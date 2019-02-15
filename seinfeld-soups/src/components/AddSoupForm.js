import React from "react";
import PropTypes from "prop-types";

class AddSoupForm extends React.Component {
  nameRef = React.createRef();
  priceRef = React.createRef();
  statusRef = React.createRef();
  descRef = React.createRef();
  imageRef = React.createRef();

  static propType = {
    addSoup: PropTypes.func
  };

  createSoup = event => {
    event.preventDefault();
    const soup = {
      name: this.nameRef.current.value,
      price: parseFloat(this.priceRef.current.value),
      status: this.statusRef.current.value,
      desc: this.descRef.current.value,
      image: this.imageRef.current.value
    };
    this.props.addSoup(soup);
    event.currentTarget.reset();
  };

  render() {
    return (
      <div>
        <h2>Add a Soup</h2>
        <form className="soup-edit" onSubmit={this.createSoup}>
          <input
            name="name"
            ref={this.nameRef}
            type="text"
            placeholder="name "
          />
          <input
            name="price"
            ref={this.priceRef}
            type="text"
            placeholder="price"
          />
          <select name="status" ref={this.statusRef}>
            <option value="available">Fresh Batch!</option>
            <option value="unavailable">All gone!</option>
          </select>
          <textarea name="desc" ref={this.descRef} placeholder="desc" />
          <input
            name="image"
            ref={this.imageRef}
            type="text"
            placeholder="image"
          />
          <button type="submit">+ Add Soup</button>
        </form>
      </div>
    );
  }
}

export default AddSoupForm;

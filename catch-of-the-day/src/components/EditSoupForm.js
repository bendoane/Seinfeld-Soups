import React from "react";
import PropTypes from "prop-types";

class EditSoupForm extends React.Component {
  static propTypes = {
    soup: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number
    }),
    index: PropTypes.string,
    updateSoup: PropTypes.func
  };

  handleChange = event => {
    // update
    // copy current
    const updatedSoup = {
      ...this.props.soup,
      [event.currentTarget.name]: event.currentTarget.value
    };
    this.props.updateSoup(this.props.index, updatedSoup);
  };

  render() {
    return (
      <div className="soup-edit">
        <input
          type="text"
          name="name"
          onChange={this.handleChange}
          value={this.props.soup.name}
        />
        <input
          type="text"
          name="price"
          onChange={this.handleChange}
          value={this.props.soup.price}
        />
        <select
          type="text"
          name="status"
          onChange={this.handleChange}
          value={this.props.soup.status}
        >
          <option value="available">Fresh Batch!</option>
          <option value="unavailable">All gone!</option>
        </select>
        <textarea
          type="text"
          name="desc"
          onChange={this.handleChange}
          value={this.props.soup.desc}
        />
        <input
          type="text"
          name="image"
          onChange={this.handleChange}
          value={this.props.soup.image}
        />
        <button onClick={() => this.props.deleteSoup(this.props.index)}>
          Remove Soup
        </button>
      </div>
    );
  }
}

export default EditSoupForm;

import React, { Component } from "react";
import PropTypes from "prop-types";
import ManageItem from "./manageItem";

class ManageFeed extends Component {
  
  render() {
    const { manages = [], userId } = this.props;
    

    if (!Array.isArray(manages)) {
      console.error("Expected manages to be an array but got:", manages);
      return null;
    }

    return manages.map((manage) => (
      <ManageItem key={manage._id} manage={manage} userId={userId} />
    ));
  }
}

ManageFeed.propTypes = {
  manages: PropTypes.array.isRequired,
  userId: PropTypes.string.isRequired
};

export default ManageFeed;

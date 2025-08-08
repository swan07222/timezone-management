import React, { Component } from "react";
import PropTypes from "prop-types";
import TimezonItem from "./timezonItem";

class TimezonFeed extends Component {
  
  render() {
    const { timezons = [], userId } = this.props;
    

    if (!Array.isArray(timezons)) {
      console.error("Expected timezons to be an array but got:", timezons);
      return null;
    }

    return timezons.map((timezon) => (
      <TimezonItem key={timezon._id} timezon={timezon} userId={userId} />
    ));
  }
}

TimezonFeed.propTypes = {
  timezons: PropTypes.array.isRequired,
  userId: PropTypes.string.isRequired
};

export default TimezonFeed;

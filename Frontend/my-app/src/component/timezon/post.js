import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TimezonForm from './timezonForm';
import Spinner from '../common/Spinner';
import { getTime } from '../actions/timeactions';
import TimezonFeed from './timezonFeed';
import { withRouter } from '../common/withRouter';

class Post extends Component {
  componentDidMount() {
    const userId = this.props.auth?.user?.id;
    if (userId) {
      this.props.getTime(userId);
    } else {
      console.error("User ID is undefined");
    }
  }

  render() {
    const { user } = this.props.auth || {};
    const { time = [] } = this.props;
    if (!user || Object.keys(user).length === 0) {
      return <Spinner />;
    }

    return (
      <div>
        <TimezonForm userId={user.id} />
        <TimezonFeed userId={user.id} timezons={time} />
      </div>
    );
  }
}

Post.propTypes = {
  getTime: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  time: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    time: state.time.time
  };
};

export default connect(
  mapStateToProps,
  { getTime }
)(withRouter(Post));
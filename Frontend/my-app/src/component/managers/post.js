import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ManageForm from './manageForm';
import Spinner from '../common/Spinner';
import { getUser } from '../actions/manageractions';
import ManageFeed from './manageFeed';
import { withRouter } from '../common/withRouter';

class Post extends Component {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    const { person } = this.props.auth || {};
    const { user = [] } = this.props;
    if (!person || Object.keys(person).length === 0) {
      return <Spinner />;
    }

    return (
      <div>
        <ManageForm personId={person.id} />
        <ManageFeed personId={person.id} manages={user} />
      </div>
    );
  }
}

Post.propTypes = {
  getUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  user: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    user: state.user.user || []
  };
};

export default connect(
  mapStateToProps,
  { getUser }
)(withRouter(Post));
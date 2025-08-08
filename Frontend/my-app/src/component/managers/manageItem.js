import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteUser } from "../actions/manageractions";
import { editUser } from "../actions/manageractions";
import TextFieldGroup from '../common/TextFieldGroup';

class ManageItem extends Component {
  onDeleteClick(userId) {
    this.props.deleteUser(userId);
    this.setState(prevState => ({
      visibleDelete: !prevState.visibleDelete
    }));
  }

  constructor(props) {
    super(props);
    this.state = {
      visibleDelete: false,
      visibleEdit: false,
      errors: {},
      name: props.manage.name,
      email: props.manage.email,
    };
  }

  componentWillReceiveProps (nextprops) {
    if (nextprops.errors) {
      this.setState({ errors: nextprops.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const { userId,manage } = this.props;
    const newUser = {
      name: this.state.name,
      email: this.state.email,};
      this.props.editUser(userId, newUser );
      this.setState({ name: "", email: "" });
    };

    onChange = e => {
      this.setState({ [e.target.name]: e.target.value });
    };

  toggleVisibilityDelete = () => {
    this.setState(prevState => ({
      visibleDelete: !prevState.visibleDelete
    }));
  };
  toggleVisibilityEdit = () => {
    this.setState(prevState => ({
      visibleEdit: !prevState.visibleEdit
    }));
  };

  render() {
    const { errors } = this.state;
    const { manage, userId, auth } = this.props;
    const { visibleDelete } = this.state;
    const { visibleEdit } = this.state;
    const handleClick = () => {
      this.toggleVisibilityEdit();
      window.location.reload();
    };

    return (
      <div>
        <div className="delete-timezon" style={{ display: visibleDelete ? "block" : "none" }}>
                <button
                  className="button-timezon-delete"
                  onClick={this.toggleVisibilityDelete}
                  type="button"
                >
                  Cancle
                </button>
                <div style={{float:"left"}}>Are you sure?</div>
                <button
                  className="button-timezon-delete"
                  onClick={this.onDeleteClick.bind(this, userId )}
                  type="button"
                >
                  Delete 
                </button>
        </div>

        <div className="delete-timezon" style={{ display: visibleEdit ? "block" : "none" }}>
              <div style={{margin:"20px"}}>Edit Time</div>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder={manage.name}
                  name="name"
                  type="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder={manage.email}
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
              
              <button type="submit" className="button-create-time" onClick={handleClick}>
                Edit
              </button>
              </form>
          </div>

        <div className="item-timzon">
          <div className="col-md-10">
            <div className="texts-item">
              <div className="lead">{manage.name}</div>
              <div className="lead">{manage.email}</div>
              <button
                className="button-timezon-close"
                // onClick={this.onDeleteClick.bind(this, userId, timezon._id)}
                onClick={this.toggleVisibilityDelete}
                type="button"
              >
                Delete 
              </button>
              <button
                className="button-timezon-close"
                onClick={this.toggleVisibilityEdit}
                type="button"
              >
                Edit
              </button>
            </div>
            <div style={{ display: visibleEdit ? "block" : "none" }}>
            </div>
          </div>
        </div>
              
      </div>
    );
  }
}

ManageItem.propTypes = {
  deleteTime: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  manage: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteUser , editUser}
)(ManageItem);

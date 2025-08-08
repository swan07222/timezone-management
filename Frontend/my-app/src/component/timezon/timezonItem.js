import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteTime } from "../actions/timeactions";
import { editTime } from "../actions/timeactions";
import TextFieldGroup from '../common/TextFieldGroup';

class TimezonItem extends Component {
  onDeleteClick(userId, timeId) {
    this.props.deleteTime(userId, timeId);
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
      name: props.timezon.name,
      city: props.timezon.city,
      difference: props.timezon.difference
    };
  }

  componentWillReceiveProps (nextprops) {
    if (nextprops.errors) {
      this.setState({ errors: nextprops.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const { userId,timezon } = this.props;
    const newTime = {
      name: this.state.name,
      city: this.state.city,
      difference: this.state.difference.toString()};
      this.props.editTime(userId, newTime, timezon._id);
      this.setState({ name: "", city: "", difference: 0, });
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
    const { timezon, userId, auth } = this.props;
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
                  onClick={this.onDeleteClick.bind(this, userId, timezon._id)}
                  type="button"
                >
                  Delete 
                </button>
        </div>

        <div className="delete-timezon" style={{ display: visibleEdit ? "block" : "none" }}>
              <div style={{margin:"20px"}}>Edit Time</div>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder={timezon.name}
                  name="name"
                  type="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder={timezon.city}
                  name="city"
                  type="city"
                  value={this.state.city}
                  onChange={this.onChange}
                  error={errors.city}
                />
                <TextFieldGroup
                  placeholder={timezon.difference}
                  name="difference"
                  type="difference"
                  value={this.state.difference}
                  onChange={this.onChange}
                  error={errors.difference}
                />
              
              <button type="submit" className="button-create-time" onClick={handleClick}>
                Edit
              </button>
              </form>
          </div>

        <div className="item-timzon">
          <div className="col-md-10">
            <div className="texts-item">
              <div className="lead">{timezon.name}</div>
              <div className="lead">{timezon.city}</div>
              <div className="lead">{timezon.difference}</div>
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

TimezonItem.propTypes = {
  deleteTime: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  timezon: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteTime , editTime}
)(TimezonItem);

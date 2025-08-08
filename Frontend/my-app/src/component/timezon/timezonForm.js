import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addTime } from "../actions/timeactions";
import TextFieldGroup from '../common/TextFieldGroup';
import './style.css'

class TimezonForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: "",
        city: "",
        difference: 0,
        visibleCreate: false,
      errors: {}
    };
  }

  componentWillReceiveProps (nextprops) {
    if (nextprops.errors) {
      this.setState({ errors: nextprops.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const { user } = this.props.auth;
    const { userId } = this.props;

    const newTime = {
      name: this.state.name,
      city: this.state.city,
      difference: this.state.difference
    };
    this.props.addTime(userId, newTime);
    this.setState({ name: "", city: "", difference: 0, });
    };

    onChange = e => {
      this.setState({ [e.target.name]: e.target.value });
    };
    
    toggleVisibilityCreate = () => {
      this.setState(prevState => ({
        visibleCreate: !prevState.visibleCreate
      }));
    };
    

  render() {
    const { errors } = this.state;
    const { visibleCreate } = this.state;
    const handleClick = () => {
      this.toggleVisibilityCreate();
      window.location.reload();
    };
    return (
        <div>
          <div className="move-table">
            <div className="item-timzon">
                <button
                className="button-timezon-create"
                onClick={this.toggleVisibilityCreate}
                >
                  Create time
                </button>
                <div className="texts-item">
                  <div className="lead-table">Name</div>
                  <div className="lead-table">City</div>
                  <div className="lead-table">Difference</div>
                </div>
            </div>
          </div>
          <div className="delete-timezon" style={{ display: visibleCreate ? "block" : "none" }}>
              <div style={{margin:"20px"}}>Create Time</div>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="name"
                  name="name"
                  type="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder="city"
                  name="city"
                  type="city"
                  value={this.state.city}
                  onChange={this.onChange}
                  error={errors.city}
                />
                <TextFieldGroup
                  placeholder="time"
                  name="difference"
                  type="difference"
                  value={this.state.time}
                  onChange={this.onChange}
                  error={errors.difference}
                />
              <button type="submit" className="button-create-time" onClick={handleClick}>
                Create
              </button>
              </form>
          </div>
        </div>
    );
  }
}

TimezonForm.propTypes = {
  addTimezon: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addTime }
)(TimezonForm);

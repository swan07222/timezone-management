import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addTime } from "../actions/timeactions";
import TextFieldGroup from '../common/TextFieldGroup';
import './style.css'

class ManageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: "",
        email: "",
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

    const newUser = {
      name: this.state.name,
      email: this.state.email,
    };
    this.props.addUser(newUser);
    this.setState({ name: "", email: "" });
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
                  Create User
                </button>
                <div className="texts-item">
                  <div className="lead-table">Name</div>
                  <div className="lead-table">Email</div>
                </div>
            </div>
          </div>
          <div className="delete-timezon" style={{ display: visibleCreate ? "block" : "none" }}>
              <div style={{margin:"20px"}}>Create User</div>
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
                  placeholder="email"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
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

ManageForm.propTypes = {
  addUser: PropTypes.func.isRequired,
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
)(ManageForm);

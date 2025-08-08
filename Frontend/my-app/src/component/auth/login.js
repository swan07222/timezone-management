import React, { Component } from 'react';
import './style.css'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authactions';
import TextFieldGroup from '../common/TextFieldGroup';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

class Login extends Component {
    
    constructor() {
        super();
        this.state = {
        name: '',
        email: '',
        password: '',
        errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e)
    {
        this.setState({[e.target.name]: e.target.value });
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
          setTimeout(() => {
            this.props.navigate('/landing');
          }, 0);
        }
      }
      
      componentDidUpdate(prevProps) {
        if (!prevProps.auth.isAuthenticated && this.props.auth.isAuthenticated) {
          setTimeout(() => {
            this.props.navigate('/landing');
          }, 0);
        }
      }

    onSubmit(e) {
        e.preventDefault();
        
        const User = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
        }
        
        this.props.loginUser(User);
    }

    render() {
        const {errors} = this.state;
        return (
            <motion.div
            initial={{ opacity: 0, y: 0 }}   
            animate={{ opacity: 1, y: 0 }}    
            transition={{ duration: 0.4 }}      
            >
                <div className="login-bar">
                    <p className="text-login-register">Log in</p>
                    {/* <li>
                        <img src="resource/picture/avatar1.png" alt="Avatar" className="avatar-login">
                    </li> */}
                    <form onSubmit={this.onSubmit}>
                        <TextFieldGroup
                            placeholder="UserName"
                            name="name"
                            type="name"
                            value={this.state.name}
                            onChange={this.onChange}
                            error={errors.name}
                        />

                        <TextFieldGroup
                            placeholder="Email Address"
                            name="email"
                            type="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            error={errors.email}
                        />

                        <TextFieldGroup
                            placeholder="Password"
                            name="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.onChange}
                            error={errors.password}
                        />
                        <button type="submit" className="button-style-login">Login</button>
                        <div>
                            If you don't have account please <Link to="/register"> register </Link>
                        </div>
                        
                    </form>
                </div>
            </motion.div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})
function LoginWrapper(props) {
    const navigate = useNavigate();
    return <Login {...props} navigate={navigate} />;
}

export default connect(mapStateToProps, { loginUser })(LoginWrapper);
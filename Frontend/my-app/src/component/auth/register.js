import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../actions/authactions';
import TextFieldGroup from '../common/TextFieldGroup';
import { withRouter } from '../common/withRouter';
import './style.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

class Register extends Component {
    constructor() {
        super();
        this.state = {
        name: '',
        email: '',
        password: '',
        password2: '',
        errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount()
    {
        if(this.props.auth.isAuthenticated) 
        {
            this.props.router.navigate('/');
        }
    }

    // componentWillReceiveProps(nextProps) {
    //     if (prevProps.errors !== this.props.errors) {
    //         this.setState({ errors: this.props.errors });
    //       }
    // }
    componentDidUpdate(prevProps) {
        if (this.props.auth.isAuthenticated && !prevProps.auth.isAuthenticated) {
          this.props.navigate('/login');
        }
      
        if (prevProps.errors !== this.props.errors) {
          this.setState({ errors: this.props.errors });
        }
      }

    onChange(e)
    {
        this.setState({[e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        
        const newUser = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2
        }

        this.props.registerUser(newUser, this.props.router.navigate);
        // this.props.testaction(data);
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
                        <p className="text-login-register">Register</p>
                        <form onSubmit={this.onSubmit}>
                            <TextFieldGroup
                                placeholder="Username"
                                name="name"
                                type="text"
                                value={this.state.name}
                                onChange={this.onChange}
                                error={errors.name}
                            />

                            <TextFieldGroup
                                placeholder="Email"
                                name="email"
                                type="text"
                                value={this.state.email}
                                onChange={this.onChange}
                                error={errors.email}
                            />

                            <TextFieldGroup
                                placeholder="Password"
                                name="password"
                                type="text"
                                value={this.state.password}
                                onChange={this.onChange}
                                error={errors.password}
                            />
                            
                            <TextFieldGroup
                                placeholder="Password2"
                                name="password2"
                                type="text"
                                value={this.state.password2}
                                onChange={this.onChange}
                                error={errors.password2}
                            />
                            <button type="submit" className="button-style-login">Register</button>
                            <div>
                                If you have an account<Link to="/login"> login </Link>
                            </div>
                        </form>
                     </div>
                </motion.div>
        );
    }
};

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(Register));
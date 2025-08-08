import React, { Component } from 'react'
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Post from '../timezon/post';
import Manager from '../managers/post';
import './style.css'

class Landing extends Component {
    render() {
        const { user } = this.props.auth || {};
        return (
            <div>
                {user.role === 'user' ? (
                            <Post/>
                ) : (
                    <p></p>
                )}
                {user.role === 'moderator' ? (
                            <Post/>
                ) : (
                    <p></p>
                )}
                {user.role === 'admin' ? (
                    <Manager/>
                ) : (
                    <p></p>
                )}
            </div>
        )
    }
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Landing);
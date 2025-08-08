import React, { Component } from 'react'
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import './style.css'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { logoutUser } from '../actions/authactions';

class Navbar extends Component {

   onLogoutClick(e) {
      e.preventDefault();
      this.props.logoutUser();
  }
render() {
      const { auth = {} } = this.props;

      const { isAuthenticated = false, user = {} } = auth;
        const authLinks = (
            <div className='button-bar-nabvar'>
               <Link to="/landing"> <button className='button-style-home'>Swan07222@outlook.com</button> </Link>
               <Link to="/landing">
                  <button 
                  className="button-style nav-link-logout" 
                  onClick={this.onLogoutClick.bind(this)}
                  >
                  Logout
                  </button>
               </Link>
               <div className="text-logout-style">{user?.name || 'User'}</div>
            </div>
        );

        const guestLinks = (
            <div className='button-bar-nabvar'>
               <Link to="/landing"> <button className='button-style-home'>Swan07222@outlook.com</button> </Link>
               <Link to="/login"> <button className='button-style'>Log in</button> </Link>
               <Link to="/register"> <button className='button-style'>Register</button> </Link>
            </div>
        );

   return (
      <motion.div
         initial={{ opacity: 1, y: -50 }}   
         animate={{ opacity: 1, y: 0 }}    
         transition={{ duration: 0.4 }}      
      >
         
         <div >
            {isAuthenticated ? authLinks : guestLinks}
               
         </div>
      </motion.div>
         
   )
}
}

Navbar.propTypeds = {
   auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
   auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(Navbar);
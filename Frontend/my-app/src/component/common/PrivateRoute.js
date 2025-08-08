import React from "react";
import { Route, Routes } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import { connect, useSelector } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({component: Component, auth, ...rest}) => (
    <Routes>
        <Route 
            {...rest}
            render = {props =>
                auth.isAuthenticated === true ? (
                    <Component {...props} />
                ) : (
                    <Navigate to="/login" replace />

                )
            }
        />
    </Routes>
);
PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired
  };

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);

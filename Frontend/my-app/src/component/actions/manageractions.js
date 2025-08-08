import axios from "axios";

import {
  ADD_USER,
  DELETE_USER,
  GET_ERRORS,
  GET_USER,
  USER_LOADING,
  CLEAR_ERRORS, 
  EDIT_USER
} from "./types";
  
  //Get Post
  export const getUser = (id) => dispatch => {
    dispatch(setUserLoading());
    axios
      .get(`http://localhost:5000/api/users/getusers`)
      .then(res =>{
        const users = res.data.user || [];
        dispatch({
          type: GET_USER,
          payload: users
        });}
      )
      .catch(err =>
        dispatch({
          type: GET_USER,
          payload: []
        })
      );
  };
  
  export const addUser = (userId, userData) => dispatch => {
    dispatch(clearErrors());
    axios
        .post(`http://localhost:5000/api/times/createtimes/${userId}`, userData)
        .then(res =>
          dispatch({
            type: ADD_USER,
            payload: res.data
          })
        )
        .catch(err =>
          dispatch({
            type: GET_ERRORS,
            payload: err.response?.data || { error: "Something went wrong." }
          })
        );
  };

  export const editUser = (userId, timeData, timeId) => dispatch => {
    dispatch(clearErrors());
    let token = localStorage.getItem('jwtToken') || '';
    if (token.startsWith('Bearer ')) {
      token = token.slice(7);
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
    axios
        .post(`http://localhost:5000/api/times/changetimes/${userId}/${timeId}`, timeData, config)
        .then(res =>
          dispatch({
            type: EDIT_USER,
            payload: res.data
          })
        )
        .catch(err =>
          dispatch({
            type: GET_ERRORS,
            payload: err.response?.data || { error: "Something went wrong." }
          })
        );
  };
  
  export const deleteUser = (userId, timeId) => dispatch => {
    axios
      .delete(`http://localhost:5000/api/times/deletetimes/${userId}/${timeId}`)
      .then(res =>
        dispatch({
          type: DELETE_USER,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
  
  //Set Loading state
  export const setUserLoading = () => {
    return {
      type: USER_LOADING
    };
  };
  
  //Clear errors
  export const clearErrors = () => {
    return {
      type: CLEAR_ERRORS
    };
  };
  
import axios from "axios";

import {
  ADD_TIME,
  DELETE_TIME,
  GET_ERRORS,
  GET_TIME,
  TIME_LOADING,
  CLEAR_ERRORS, 
  EDIT_TIME
} from "./types";
  
  //Get Post
  export const getTime = (id) => dispatch => {
    dispatch(setTimeLoading());
    axios
      .get(`http://localhost:5000/api/times/${id}`)
      .then(res =>{
        const timezons = res.data.timezone || [];
        dispatch({
          type: GET_TIME,
          payload: timezons
        });}
      )
      .catch(err =>
        dispatch({
          type: GET_TIME,
          payload: []
        })
      );
  };
  
  export const addTime = (userId, timeData) => dispatch => {
    dispatch(clearErrors());
    axios
        .post(`http://localhost:5000/api/times/createtimes/${userId}`, timeData)
        .then(res =>
          dispatch({
            type: ADD_TIME,
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

  export const editTime = (userId, timeData, timeId) => dispatch => {
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
            type: EDIT_TIME,
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
  
  export const deleteTime = (userId, timeId) => dispatch => {
    axios
      .delete(`http://localhost:5000/api/times/deletetimes/${userId}/${timeId}`)
      .then(res =>
        dispatch({
          type: DELETE_TIME,
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
  export const setTimeLoading = () => {
    return {
      type: TIME_LOADING
    };
  };
  
  //Clear errors
  export const clearErrors = () => {
    return {
      type: CLEAR_ERRORS
    };
  };
  
import { GET_ERRORS } from './types';
import { SET_CURRENT_USER } from './types';
import  axios  from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { jwtDecode } from 'jwt-decode';

// Register User
export const registerUser = (userData,navigate) => dispatch => {
    axios
        .post('http://localhost:5000/api/users/register', userData,{
            withCredentials: true // only if you use cookies or auth
          })
        .then(res => {navigate('/login')})
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response?.data || { error: "RegisterLogin failed or no response" }
            })
        );
};

export const loginUser = userData => dispatch => {
    axios
        .post('http://localhost:5000/api/users/login', userData,{
            withCredentials: true // only if you use cookies or auth
          })
        .then(res => 
            {
                // Save to localStorage
                const { token } = res.data;
                // Set token to ls
                localStorage.setItem('jwtToken', token);
                // Set token to Auth header
                setAuthToken(token);
                const decoded = jwtDecode(token);
                dispatch(setCurrentUser(decoded))
            }
        )
    .catch(err =>
        dispatch 
        (
            {
                type: GET_ERRORS,
                payload: err.response?.data || { error: "Login failed or no response" }
            }
        )
    );
};

export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken');

    setAuthToken(false);

    dispatch(setCurrentUser({}));
};

export const loadUser = () => dispatch => {
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
    }
  
    axios.get('http://localhost:5000/api/users/current')  // Your API endpoint to get current user
      .then(res => dispatch(setCurrentUser(res.data)))
      .catch(err => {
        dispatch(setCurrentUser({}));
        // optionally handle errors, logout etc.
      });
  };
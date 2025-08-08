import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import './App.css';

import Navbar from './component/layout/Navbar';
import Footer from './component/layout/Footer';
import Landing from './component/layout/Landing';
import PrivateRoute from "./component/common/PrivateRoute";
import Post from './component/timezon/post';
import Manager from './component/managers/post';

import Register from './component/auth/register';
import Login from './component/auth/login';
import LoginWrapper from './component/auth/LoginWrapper';
import { loadUser } from './component/actions/authactions';
import setAuthToken from './component/utils/setAuthToken';

function App() {
  if(localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    store.dispatch(loadUser());
  }
  return (
    <Provider store = { store }>
      <Router>
          <div className="App">
            <header>
            </header>
            <div>
              <Navbar/>
              <Footer/>
            </div>
            <PrivateRoute exact path="/" element = { <Login/> } />
            <PrivateRoute exact path="/landing" element = { <Landing/> } />
            <Routes>
              <Route exact path="/timezones/:id" element={<Post/>} />
              <Route exact path="/managers" element={<Manager/>} />
              <Route exact path="/register" element={<Register/>} />
              <Route exact path="/login" element={<Login/>} />
              <Route path="/login" element={<LoginWrapper />} />
            </Routes>
          </div>
      </Router>
    </Provider>
  );
}

export default App;

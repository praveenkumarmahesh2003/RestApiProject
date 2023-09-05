import './loginform.css';
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Loginform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popupStyle: 'hide',
      userid: '',
      password: '',
      isLogSuccess: false
    };
  }

  popup = () => {
    this.setState({ popupStyle: 'login-popup' });
    setTimeout(() => this.setState({ popupStyle: 'hide' }), 3000);
  };

  handleUseridChange = (event) => {
    this.setState({ userid: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = () => {
    axios
      .get(`http://127.0.0.1:8080/verify-login?userid=${this.state.userid}&password=${this.state.password}`)
      .then((response) => {
        const isAUser = response.data;
        if (isAUser === 1) {
          this.setState({ isLogSuccess: true });
          this.popup();
        } else {
          this.setState({ isLogSuccess: false });
          this.popup();
        }
      })
      .catch((error) => {
        console.log('Axios error:', error);
      });
  };

  render() {
    return (
      <div className='page'>
        <div className='cover'>
          <h1>Login</h1>
          <input
            type='number'
            placeholder='UserId'
            className='tex1'
            value={this.state.userid}
            onChange={this.handleUseridChange}
          />
          <input
            type='password'
            placeholder='Password'
            className='tex2'
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />

          <div className='login-btn' onClick={this.handleSubmit}>
            <Link to='/medicalrec'>
            
            Login
            </Link>
          </div>
          {this.state.isLogSuccess ? (
            <div className={this.state.popupStyle}>
              <h2>Login Successful</h2>
            </div>
          ) : (
            <div className={this.state.popupStyle}>
              <h2>Login Failed</h2>
              <p>UserId Or Password Invalid</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Loginform;

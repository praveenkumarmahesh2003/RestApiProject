import './register.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [userid, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isloggedin, setIsLoggedIn] = useState(false);
  const [istaken, setIsTaken] = useState(false);
  const [popupStyle, setPopupStyle] = useState('hide');

  const navigate = useNavigate();

  const popup = () => {
    setPopupStyle('login-popup-register');
    setTimeout(() => {
      setPopupStyle('hide');
      setUserId('');
      setUsername('');
      setEmail('');
      setPassword('');
      setPasswordConfirm('');
      setIsLoggedIn(false);
      setIsTaken(false);
      navigate('/login');
    }, 3000);
  };

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8080/show/reg')
      .then((response) => {
        const userids = response.data.map((item) => item.userid);
        setUserId(userids);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleIdChange = (event) => {
    const newUserid = event.target.value;
    setUserId(newUserid);
    checkUserSame(newUserid);
  };

  const checkUserSame = (newUserid) => {
    if (userid.includes(newUserid)) {
      setIsTaken(true);
    } else {
      setIsTaken(false);
    }
  };

  const handleNameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setPasswordConfirm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!istaken) {
      const data = {
        userid,
        username,
        email,
        password,
      };
      axios
        .post('http://127.0.0.1:8080/add/reg', data)
        .then((response) => {
          setIsLoggedIn(true);
          popup();
        })
        .catch((error) => {
          console.error('Axios error:', error);
        });
    }
  };

  return (
    <div className="cover">
      {isloggedin ? (
        <div className={popupStyle}>
          <h2>Register Successful</h2>
        </div>
      ) : (
        <div>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <p>UserId</p>
            <input
              className="tex1"
              type="number"
              placeholder="Enter your UserId"
              onChange={handleIdChange}
              value={userid}
            />
            {istaken ? <h4>UserId taken</h4> : <h4>UserId not taken</h4>}
            <p>Username</p>
            <input
              className="tex1"
              type="text"
              placeholder="Enter your Username"
              onChange={handleNameChange}
              value={username}
            />
            <p>Email</p>
            <input
              className="tex1"
              type="text"
              placeholder="Enter your Email"
              onChange={handleEmailChange}
              value={email}
            />
            <p>Password</p>
            <input
              className="tex2"
              type="password"
              placeholder="Enter your Password"
              onChange={handlePasswordChange}
              value={password}
            />
            <p>Confirm Password</p>
            <input
              className="tex2"
              type="password"
              placeholder="Confirm Password"
              onChange={handleConfirmPasswordChange}
              value={passwordConfirm}
            />
            <br/>
            <br/>
            <div className="login-btn" onClick={handleSubmit}>
              Register
            </div>
            <br/>
            <br/>
            <p className="text">Or Register Using</p>
            <div className="alt-login">
              <div className="face"></div>
              <div className="google"></div>
            </div>
          </form>
          <span>
            <p>
              Already have an Account?
              <i>
                <Link to="/login">Go to Login</Link>
              </i>
            </p>
          </span>
        </div>
      )}
    </div>
  );
}

export default Register;

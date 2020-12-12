import React, { useState } from 'react';
import { setCookie } from '../../utils/cookie';
import { auth } from '../../services';
import './style.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isLoginLoading, setLoginLoading] = useState(false);

  const onSubmitLogin = () => {
    setLoginLoading(true);
    auth
      .login(username, password)
      .then((res) => {
        const cookieToken = res.token;
        const cookieUser = res.username;
        setCookie('userData', JSON.stringify(cookieUser), 10000);
        setCookie('token', JSON.stringify(cookieToken), 10000);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        window.location.replace('/product');
      });
  };

  return (
    <div className="container container-login">
      <div className="login-card">
        <h2>Welcome to DTI</h2>
        <form
          className="login_form"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmitLogin();
          }}
        >
          <input
            className="form-control form-control-sm"
            type="text"
            name="username"
            value={username}
            placeholder="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            className="form-control form-control-sm"
            type="password"
            name="password"
            value={password}
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="submit" value="Submit" disabled={isLoginLoading}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

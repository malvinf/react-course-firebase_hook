import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const onSubmitLoading = () => {
    setIsLoading(true);
    axios
      .get('https://dev.api.etalasy.com/v1/login', {
        params: {
          username: user,
          password: pass,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form className="login_form">
        <label htmlFor="user">
          Username
          <input
            onChange={(e) => {
              setUser(e.target.value);
            }}
            value={user}
            id="user"
            type="text"
            name="user"
            placeholder="user"
          />
        </label>
        <label htmlFor="pass">
          Password
          <input
            onChange={(e) => {
              setPass(e.target.value);
            }}
            value={pass}
            id="pass"
            type="password"
            name="pass"
            placeholder="pass"
          />
        </label>
        <button
          onClick={() => {
            onSubmitLoading();
          }}
          type="submit"
          disabled={isLoading}
        >
          submit
        </button>
      </form>
    </div>
  );
};

export default Login;

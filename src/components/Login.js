import { Input, Space } from 'antd';
import '../css/style.css';

import React, { useState, useEffect } from "react";
import SignIn from './auth/SignIn';



const Login = () => {

  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    console.log(value);
  };

  const handleSubmit = (e) => {
    console.log(value);
    e.preventDefault();
    SignIn(value);
  };

  return (
    <div>
      <form className="mt-2 space-y-6" onSubmit={handleSubmit}>
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="-space-y-px rounded-md shadow-sm">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Email address"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <Input.Password
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="relative appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
        </div>
        <hr className='mt-5' />
        <button type="submit" className="buttonNext">
          Go
        </button>
      </form>
    </div>
  );
};
export default Login;

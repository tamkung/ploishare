import logo from '../img/logo.png';
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { Button, Checkbox, Form, Input, Space } from 'antd';
import '../css/style.css';
import { Link } from "react-router-dom";
import axios from "axios";

import React, { useState, useEffect } from "react";
import { API_URL } from "../Constant";
import SignIn from './auth/SignIn';

const HomeLogin = () => {

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

    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">

        <div>
          <img
            className="mx-auto h-12 w-auto"
            src={logo}
            alt="Your Logo"
            style={{ width: '250px', height: '160px' }}
          />
          <br />
          <hr />
          <h3 className="mt-6  text-2xl font-bold tracking-tight" style={{color:"#67b99a"}} >
            เข้าสู่ระบบ
          </h3>

        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
          <div className="textWarp">
            <Link to="/vertify"> Vertification </Link>
          </div>
          <hr />
          <div style={{ textAlign: "center", padding: "5px" }}>
            <button type="submit" className="buttonNext">
              Go
            </button>
          </div>
        </form>

      </div>
    </div>

  );
};
export default HomeLogin;
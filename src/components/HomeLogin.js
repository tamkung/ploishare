import logo from '../img/logo.png';
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { Button, Checkbox, Form, Input, Space } from 'antd';
import '../css/style.css';
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import React, { useState } from "react";

//const API_URL = 'https://api-ploishare.cyclic.app/'
const API_URL = 'https://test-w8q8.onrender.com/'
//const API_URL = 'http://localhost:8080/'

// const signUp = (email, password) => {
//   return axios.post(API_URL + "signup", {
//     email,
//     password,
//   });
// };


const HomeLogin = () => {
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");

  //   const onChangeEmail = (e) => {
  //     const email = e.target.value;
  //     setEmail(email);
  //     console.log(email);
  //   };

  //   const onChangePassword = (e) => {
  //     const password = e.target.value;
  //     setPassword(password);
  //     console.log(password);
  //   };

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

    fetch(API_URL + "signin", {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    }).then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if (data.status === "OK") {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "success",
            title: "SignIn in successfully",
          }).then(() => {
            // alert("login sucess");
            localStorage.setItem("token", data.token);
            window.location = "/booking";
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.message,
            //footer: '<a href="">Why do I have this issue?</a>'
          })
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
          <h3 className="mt-6  text-2xl font-bold tracking-tight text-yellow-400" >
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
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="textWarp">
            <Link to="/vertify">ยืนยันตัวตน</Link>
          </div>
          <hr />


          <div style={{ textAlign: "center", padding: "5px" }}>
            <button type="submit" className="buttonNext">
              Go
            </button>
            <br />
            {/* <button
              type="submit"

              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
              </span>
              Admin
            </button> */}
          </div>
        </form>
      </div>
    </div>

  );
};
export default HomeLogin;
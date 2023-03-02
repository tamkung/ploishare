import React, { useState } from 'react';
import { Form, Input } from 'antd';
import * as BsIcons from 'react-icons/bs';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import '../css/style.css';
import SignUp from '../service/SignUp';

function Vertify() {

  const [value, setValue] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    console.log(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.email === "") {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "ไม่มีข้อมูลอีเมล",
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (value.password === "") {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "ไม่มีข้อมูลรหัสผ่าน",
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (value.confirmPassword === "") {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "ไม่มีข้อมูลยืนยันรหัสผ่าน",
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (value.password !== value.confirmPassword) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "รหัสผ่านไม่ตรงกัน",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      try {
        console.log(value);
        SignUp(value);

      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>

      <div>
        <form onSubmit={handleSubmit}>
          <p className='text-muted'>* กรอก Email SCG ของคุณ</p>
          <Input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="relative block w-full appearance-none rounded-none rounded-b-md rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="Email address"
            onChange={handleChange}
          />

          <p className='mt-4 text-muted'>* สร้างรหัสผ่านของตนเอง</p>
          <Input.Password
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            className="relative appearance-none rounded-none rounded-b-md rounded-t-md border border-gray-300 px-3 py-2 mt-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="Password"
            onChange={handleChange}
          />

          <Input.Password
            id="Confirm-Password"
            name="confirmPassword"
            type="password"
            autoComplete="current-password"
            rules={[{ required: true, message: 'Please input your confirm password!' }]}
            className="relative appearance-none rounded-none rounded-b-md rounded-t-md border border-gray-300 px-3 py-2 mt-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="Confirm Password"
            onChange={handleChange}
          />
          {/* <button
              type="button"
              class="btn btn-outline-primary buttonNext"
              onClick={() => handleSubmit()}
            >ยืนยันตัวตน
            </button>
          </Form> */}

          <hr className='mt-3 mb-4' />
          <button className="btn bg-warning w-100" >
            ยืนยันตัวตน
          </button>
          {/* <button type="button" onClick={() => handleSubmit()} class="btn btn-outline-primary buttonNext">Vertify</button> */}
        </form>
      </div>
    </div>
  )
}

export default Vertify;
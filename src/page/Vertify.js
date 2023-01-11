import React, { useState } from 'react';
import {Form, Input } from 'antd';
import * as BsIcons from 'react-icons/bs';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import '../css/style.css';
import SignUp from '../components/auth/SignUp';

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

        SignUp(value);

      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div style={{ fontFamily: "IBM Plex Sans Thai", background: "lightgray", height: "100%" }}>
      <nav className="navbar" style={{ background: "#67b99a", fontWeight: "bold", color: "white" }}>
        <div className="container-fluid">
          <p className="navbar">
            {/* <img src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="Logo" width="30" height="24" class="d-inline-block align-text-top" /> */}
            ปล่อย Share
          </p>
        </div>
      </nav>
      <div>
        <Form className='mt-4 mr-3 ml-3' >
          <Form.Item
            label="Email"
            rules={[{ required: true, message: 'Please input your email!' }]}
            onChange={handleChange}
          >
            <Input name="email" />
          </Form.Item>

          <Form.Item
            label="Password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            onChange={handleChange}
          >
            <Input name="password" />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            onChange={handleChange}
          >
            <Input name="confirmPassword" />
          </Form.Item>

          {/* <button
              type="button"
              class="btn btn-outline-primary buttonNext"
              onClick={() => handleSubmit()}
            >ยืนยันตัวตน
            </button>
          </Form> */}
          <button className="buttonNext" onClick={() => handleSubmit(0)}>
            Vertify
          </button>
          {/* <button type="button" onClick={() => handleSubmit()} class="btn btn-outline-primary buttonNext">Vertify</button> */}

        </Form>

        <Link to="/" className="ml-4 inline-flex backButton">
          <BsIcons.BsArrowLeftShort style={{ marginRight: "5px", fontSize: "25px" }} />
          Back
        </Link>
      </div>
    </div>
  )
}

export default Vertify;

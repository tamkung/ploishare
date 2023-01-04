import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Space } from 'antd';
import * as BsIcons from 'react-icons/bs';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

//const API_URL = 'https://api-ploishare.cyclic.app/'
const API_URL = 'https://test-w8q8.onrender.com/'
//const API_URL = 'http://localhost:8080/'

const Vertify = () => {

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

        const jsonData = {
          email: value.email,
          password: value.confirmPassword,
        };

        // ----------------------------axja--------------

        fetch(API_URL + "signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            //"allow-access-control-origin": "*", // CORS
          },
          body: JSON.stringify(jsonData),
        }).then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
            if (data.status === "OK") {
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2500,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener("mouseenter", Swal.stopTimer);
                  toast.addEventListener("mouseleave", Swal.resumeTimer);
                },
              });

              Toast.fire({
                icon: "success",
                title: "SignUp successfully",
              }).then(() => {
                // alert("login sucess");
                //localStorage.setItem("token", data.token);
                window.location = "/";
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

        //   axios
        //     .post(linkDB + "/signUp", jsonData)
        //     .then((response) => response.json())
        //     .then((data) => {
        //       console.log(data);
        //       if (data.status === "sucess") {
        //         alert("SignUp sucess");
        //         window.location = "/";
        //       } else {
        //         alert("SignUp failed");
        //       }
        //     })
        //     .catch((err) => {
        //       console.error("Error:", err);
        //     });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div>
        <h1 className='textHeader'>Vertify</h1>
        <div className='box'>
          <Form>
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
            <button type="button" onClick={() => handleSubmit()} class="btn btn-outline-primary buttonNext">Vertify</button>

          </Form>
          <div type="button" className="inline-flex backButton" onClick={()=>{window.location="/"}}>
            <BsIcons.BsArrowLeftShort style={{marginRight:"5px" , fontSize:"25px"}}/>
            Back
          </div>

        </div>

      </div>
    </div>
  )
}

export default Vertify


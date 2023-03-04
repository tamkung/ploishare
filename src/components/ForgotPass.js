import React, { useState } from 'react';
import { Form, Input } from 'antd';
import * as BsIcons from 'react-icons/bs';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import '../css/style.css';
import LandScapeLogo from '../img/landscape-logo.png'
import axios from 'axios';
import { API_URL } from '../Constant';

function ForgotPass() {

    const [value, setValue] = useState({
        email: "",
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
        } else {
            try {
                console.log(value);
                axios.post(API_URL + 'api/auth/forgotpass', {
                    email: value.email
                }).then(res => {
                    console.log(res);
                    if (res.data.message === "User not found") {
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "ไม่พบอีเมลนี้ในระบบ",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    } else {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "ส่งอีเมลสำเร็จ",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                });
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div>

            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 " >
                <div className="w-full max-w-md space-y-8 " style={{ background: "white", padding: "30px", borderRadius: "15px", boxShadow: "#282828 0px 5px 10px" }}>
                    <img
                        className="mx-auto h-auto w-auto"
                        src={LandScapeLogo}
                        alt="ปล่อย Share Logo"
                        style={{ width: '250px', height: '160px' }}
                    />
                    <form onSubmit={handleSubmit}>
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
                        <hr className='mt-3 mb-4' />
                        <button className="btn bg-warning w-100" >
                            ตกลง
                        </button>
                        {/* <button type="button" onClick={() => handleSubmit()} class="btn btn-outline-primary buttonNext">Vertify</button> */}
                    </form>
                </div>
            </div>
        </div>

    )
}

export default ForgotPass;
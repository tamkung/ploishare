import React from 'react'
import { API_URL } from "../Constant";
import Swal from "sweetalert2";

export default function SignIn(value) {
    const scg_email = new RegExp("[a-zA-Z0-9]+@scg+.com");

    fetch(API_URL + "api/auth/signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
    }).then((response) => response.json())
        .then((data) => {
            if (data.status === "OK") {
                Swal.fire({
                    icon: "success",
                    title: "เข้าสู่ระบบสำเร็จ",
                    showConfirmButton: false,
                    timer: 1000,
                }).then(() => {
                    localStorage.setItem("user", JSON.stringify(data));
                    window.location = "/";
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.message,
                });
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

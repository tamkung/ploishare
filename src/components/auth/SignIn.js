import React from 'react'
import { API_URL } from "../../Constant";
import Swal from "sweetalert2";

export default function SignIn(value) {
    fetch(API_URL + "api/auth/signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
    }).then((response) => response.json())
        .then((data) => {

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
                    //console.log(data.message);
                    localStorage.setItem("user", JSON.stringify(data));
                    localStorage.setItem("type", data.type);
                    localStorage.setItem("email", data.email);
                    window.location = "/";
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.message,
                })
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

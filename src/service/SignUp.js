import { API_URL_SignUp } from "../Constant";
import Swal from "sweetalert2";

export default function SignUp(value) {

    const jsonData = {
        email: value.email,
        password: value.confirmPassword,
    };

    fetch(API_URL_SignUp + "api/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
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
                    timer: 1000,
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

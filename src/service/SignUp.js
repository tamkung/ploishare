import { API_URL_SignUp } from "../Constant";
import Swal from "sweetalert2";

export default function SignUp(value) {
    const scg_email = new RegExp("[a-zA-Z0-9]+@scg+.com");

    const jsonData = {
        email: value.email,
        password: value.confirmPassword,
    };

    if (!scg_email.test(value.email)) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Email must be SCG email",
        });
        return;
    } else {
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
                    Swal.fire({
                        icon: "success",
                        title: "SignUp in successfully",
                        text: "Please check your email to verify",
                    }).then(() => {
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
}

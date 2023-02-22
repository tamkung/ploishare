import axios from 'axios';
import { GET_USER, API_URL } from '../Constant';
import Swal from 'sweetalert2';

export default function authCheck() {
  try {
    axios.post(API_URL + 'api/auth/verifytoken', {}, {
      headers: {
        "x-access-token": GET_USER.token,
      }
    }).then((response) => console.log(response.data))
      .catch((error) => {
        console.log(error);
        localStorage.removeItem("user");
        sessionStorage.clear();
        Swal.fire({
          icon: 'error',
          title: 'การเข้าสู่ระบบหมดอายุ',
          text: 'กรุณาเข้าสู่ระบบใหม่',
        }).then(() =>
          window.location.replace('/')
        );
      });
  } catch (error) {
    console.log(error);
    localStorage.removeItem("user");
    Swal.fire({
      icon: 'error',
      title: 'การเข้าสู่ระบบหมดอายุ',
      text: 'กรุณาเข้าสู่ระบบใหม่',
    }).then(() =>
      window.location.replace('/')
    );
  }
}

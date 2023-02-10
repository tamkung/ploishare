import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../Constant";
import { Button } from "@mui/material";
import '../css/ConfirmSuccess.css'

function ConfirmSuccess() {
  const { email } = useParams();

  useEffect(() => {
    axios.get(API_URL + "api/auth/verified/?email=" + email).then((response) => {
      console.log(response.data);
    });
  }, []);

  return (
    <div className=" full max-h-full w-full bg-white">
      <div className="flex flex-col items-center mt-14 h-full">
        <div className="flex flex-col items-center justify-center">
          <div className="text-3xl font-bold text-gray-800">ยืนยันสำเร็จ</div>
          <div className="text-xl font-bold text-gray-800">
            คุณได้ยืนยันอีเมล์สำเร็จแล้ว
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmSuccess;

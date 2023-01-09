import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../Constant";
import { Button } from "@mui/material";

function ConfirmSuccess() {
  const { email } = useParams();

  useEffect(() => {
    axios.get(API_URL + "verify/?email=" + email).then((response) => {
      console.log(response.data);
    });
  }, []);

  return (
    <div className="container text-center">
      <header className="jumbotron">
        <h1>
          <strong>Account confirmed!</strong>
        </h1>
      </header>
      <br />
      {/* <Button variant="contained" onClick={() => {
        window.location = '/'
      }}>Login</Button> */}
    </div>
  );
};

export default ConfirmSuccess;

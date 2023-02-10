import React from 'react'
import axios from 'axios';
import { API_URL, API_URL_SignUp } from "../Constant";

export default async function callAPI() {
    await axios.get(
        API_URL
    ).then(res => {
        console.log("API 1 : " + res.data);
    }).catch(err => {
        console.log("API 1 : " + err);
    })
    await axios.get(
        API_URL_SignUp
    ).then(res => {
        console.log("API 2 : " + res.data);
    }).catch(err => {
        console.log("API 2 : " + err);
    })
}

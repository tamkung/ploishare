import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { API_URL } from "../Constant";
import '../css/Booking.css';

export default function BookingDetail() {
    const [getCar, setGetCar] = useState([]);
    const [Loading, setLoading] = useState(false);

    useEffect(() => {
        async function getCarById() {
            await axios.get(`${API_URL}api/getcarbyid/${id}`)
                .then(res => {
                    setGetCar(res.data);
                    console.log(res.data);
                    setLoading(true);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getCarById();
        const { id } = useParams();
    }, []);


    return (
        <div >
            <div className="app-bar" />
            {/* {Loading !== false ? */}
            <div className="flexbook">
                <div className="itemBook" >
                    <div className="container">
                        <div style={{ fontWeight: "bolder", fontSize: "2rem" }}>รายละเอียดการจอง</div>
                        <hr />
                    </div>
                </div>
                <div className="itemBook"  >
                    <div className="container">
                        <div style={{ fontWeight: "bolder", fontSize: "2rem" }}>รายละเอียดการจอง</div>
                        <hr />
                        <button className="button-book">จองเลย </button>
                    </div>
                </div>
            </div>
            {/* : <div>Loading...</div>} */}
        </div>
    )
}

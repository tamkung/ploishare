import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { API_URL } from "../Constant";
import NO_Img from '../img/no_img.jpg';
import '../css/Booking.css';

export default function BookingDetail() {

    const [Loading, setLoading] = useState(false);
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

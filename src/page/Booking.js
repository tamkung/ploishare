import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { API_URL } from "../Constant";
import NO_Img from '../img/no_img.jpg';
import '../css/Booking.css';
function Booking() {
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
    }, []);

    const { id } = useParams();
    return (
        <div>
            {Loading !== false ?
                <div className="flexbook">
                    <div className="itemBook">
                        <img src={getCar.image !== null ? getCar.image : NO_Img} alt={getCar.license} />
                    </div>
                    <div className="itemBook" >
                        <div>
                            <div className="brandname">{getCar.brand}</div>
                            <div className="license">ทะเบียนรถ : {getCar.license + " " + getCar.province}</div>
                        </div>
                        <ul className="contentCar">
                            <li>สีรถ : {getCar.color}</li>
                            <li>Car Seat : {getCar.seat}</li>
                        </ul>
                        <button className="buttonNext-Outline" style={{ textAlign: "center", width: "70%", marginLeft: "15%" }}> จองเลย </button>
                    </div>
                    <div className="detailCar">Car Detail : {getCar.detail}</div>

                </div>

                : <div>Loading...</div>}
        </div>
    );
}

export default Booking

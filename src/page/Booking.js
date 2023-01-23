import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';

import { API_URL } from "../Constant";
import NO_Img from '../img/no_img.jpg';

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
                <div>
                    <Link className="buttonNext" to={'/'}>Back</Link>
                    <h1>Booking ID : {new Date().getTime()}</h1>
                    <h1>Car License : {getCar.license + " " + getCar.province}</h1>
                    <ul>
                        <li>Car Brand : {getCar.brand}</li>
                        <li>Car Color : {getCar.color}</li>
                        <li>Car Seat : {getCar.seat}</li>
                        <li>Car Detail : {getCar.detail}</li>
                    </ul>
                    <img src={getCar.image !== null ? getCar.image : NO_Img} alt={getCar.license} />

                </div>
                : <div>Loading...</div>}
        </div>
    );
}

export default Booking

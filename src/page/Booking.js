import React, { useState, useEffect } from "react";
import { Carousel } from 'antd';
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { API_URL } from "../Constant";
import NO_Img from '../img/no_img.jpg';
import '../css/Booking.css';
import { positions } from "@mui/system";


const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};


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
        <div >
            <div className="app-bar" />
            {Loading !== false ?
                <div className="flexbook">
                    <div className="itemBook" >
                        {/* <img src={getCar.image !== null ? getCar.image : NO_Img} alt={getCar.license} /> */}
                        <Carousel autoplay>
                            <div>
                                <img src={getCar.image !== null ? getCar.image : NO_Img} alt={getCar.license} />
                            </div>
                            <div>
                                <img src={getCar.image !== null ? getCar.image : NO_Img} alt={getCar.license} />
                            </div>
                        </Carousel>
                    </div>
                    <div className="itemBook"  >
                        <div className="contentFrame">
                            <div>
                                <div className="brandname">{getCar.brand}</div>
                                <div className="license">ทะเบียนรถ : {getCar.license + " " + getCar.province}</div>
                            </div>
                            <ul className="contentCar">
                                <li>สีรถ : {getCar.color}</li>
                                <li>จำนวน : {getCar.seat} ที่นั่ง</li>
                            </ul>
                            <button className="button-book" style={{ textAlign: "center", marginTop: "50px" }}
                                onClick={() => { window.location = '/booking-detail' }}> จองเลย </button>
                        </div>
                    </div>
                    <div className="detailCar">Car Detail : {getCar.detail}</div>

                </div>

                : <div>Loading...</div>}
        </div>
    );
}

export default Booking

import React, { useState, useEffect } from "react";
import { Carousel } from 'antd';
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios';
import { API_URL } from "../Constant";
import NO_Img from '../img/no_img.jpg';
import '../css/Booking.css';

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
    const location = useLocation();
    const { value } = location.state;
    const { car } = location.state;
    console.log(value)
    console.log(car)

    useEffect(() => {
        async function getCarById() {
            await axios.get(`${API_URL}api/getcarbyid/${car}`)
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

    return (
        <div >
            <div className="app-bar mb-5" />
            {Loading !== false ?
                <div className="flexbook" style={{ borderRadius: "15px", marginLeft: "15px", marginRight: "15px", background: "white" }}>
                    <div className="itemBook" >
                        {/* <img src={getCar.image !== null ? getCar.image : NO_Img} alt={getCar.license} /> */}
                        <Carousel autoplay style={{ borderRadius: "15px" }}>
                            <div >
                                <img src={getCar.image !== null ? getCar.image : NO_Img} alt={getCar.license} style={{ borderRadius: "15px" }} />
                            </div>
                            <div>
                                <img src={getCar.image !== null ? getCar.image : NO_Img} alt={getCar.license} style={{ borderRadius: "15px" }} />
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
                            <Link to={"/booking-detail"} state={{ value: value, car: car }}>
                                <button className="button-book" style={{ textAlign: "center", marginTop: "50px" }}>
                                    จองเลย
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="detailCar mb-3">Car Detail : {getCar.detail}</div>

                </div>

                : <div>Loading...</div>}
        </div>
    );
}

export default Booking

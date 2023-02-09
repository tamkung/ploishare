import React, { useState, useEffect } from 'react';
import { Layout, } from 'antd';
import axios from 'axios';
import { API_URL } from '../../Constant';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};


const { Content } = Layout;

function HomeAdmin() {

    const [car, setCar] = useState([]);
    const [booking, setBooking] = useState([]);
    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            car.length = 0;
            booking.length = 0;
            user.length = 0;

            axios.get(API_URL + 'api/getcar').then((response) => {
                setCar(response.data);
                console.log(response.data.length);
            });
            axios.get(API_URL + 'api/getbooking').then((response) => {
                setBooking(response.data);
                console.log(response.data.length);
            });
            axios.get(API_URL + 'api/getuser').then((response) => {
                setUser(response.data);
                console.log(response.data.length);
            });
        }
        fetchData();
    }, []);
    return (
        <div>
            <Layout>
                <Layout style={{ padding: '0 24px 24px', margin: '24px 0' }}>

                    <Content
                        style={{
                            padding: 20,
                            borderRadius: "15px 15px 15px 15px",
                            margin: 0,
                            minHeight: 280,
                            background: '#fff',
                        }}
                    >
                        <div className="row">
                            <div className="col-12 col-sm-6 col-md-3">
                                <div className="info-box">
                                    <span className="info-box-icon bg-info elevation-1"><i className="fas fa-cog" /></span>
                                    <div className="info-box-content">
                                        <span className="info-box-text">รถทั้งหมด</span>
                                        <span className="info-box-number">
                                            {car.length} คัน
                                        </span>
                                    </div>
                                    {/* /.info-box-content */}
                                </div>
                                {/* /.info-box */}
                            </div>
                            {/* /.col */}
                            <div className="col-12 col-sm-6 col-md-3">
                                <div className="info-box mb-3">
                                    <span className="info-box-icon bg-danger elevation-1"><i className="fas fa-thumbs-up" /></span>
                                    <div className="info-box-content">
                                        <span className="info-box-text">การจองทั้งหมด</span>
                                        <span className="info-box-number">{booking.length}</span>
                                    </div>
                                    {/* /.info-box-content */}
                                </div>
                                {/* /.info-box */}
                            </div>
                            {/* /.col */}
                            {/* fix for small devices only */}
                            <div className="clearfix hidden-md-up" />
                            <div className="col-12 col-sm-6 col-md-3">
                                <div className="info-box mb-3">
                                    <span className="info-box-icon bg-success elevation-1"><i className="fas fa-shopping-cart" /></span>
                                    <div className="info-box-content">
                                        <span className="info-box-text">-</span>
                                        <span className="info-box-number">-</span>
                                    </div>
                                    {/* /.info-box-content */}
                                </div>
                                {/* /.info-box */}
                            </div>
                            {/* /.col */}
                            <div className="col-12 col-sm-6 col-md-3">
                                <div className="info-box mb-3">
                                    <span className="info-box-icon bg-warning elevation-1"><i className="fas fa-users" /></span>
                                    <div className="info-box-content">
                                        <span className="info-box-text">ผู้ใช้งาน</span>
                                        <span className="info-box-number">{user.length} คน</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Bar options={options} data={data} />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default HomeAdmin

import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { API_URL } from "../Constant";
import '../css/Booking.css';
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
    Checkbox,
    Upload,
} from 'antd';

import { Province } from '../components/admin/Province';
import { UserOutlined, PlusOutlined } from '@ant-design/icons';
const { Option } = Select;
const { TextArea } = Input;
export default function BookingDetail() {
    const [getCar, setGetCar] = useState([]);
    const [Loading, setLoading] = useState(false);
    const [radio, setRadio] = useState('กรุงเทพฯ และ ปริมณฑล');
    const [province, setProvince] = useState();
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

    const onRadioChange = (e) => {
        console.log('radio checked', e.target.value);
        setRadio(e.target.value);

    };
    const onProvinceChange = (value) => {
        console.log(value);
        setProvince(value);

    };

    return (
        <div >
            <div className="app-bar" />
            {/* {Loading !== false ? */}
            <div className="flexbook">
                <div className="itemBook" >
                    <div >
                        <div style={{ fontWeight: "bolder", fontSize: "2rem" }}>รายละเอียดการจอง</div>
                        <hr />
                    </div>
                </div>
                <div className="itemBook" style={{ background: "red" }}  >
                    <div>
                        <br />
                        <br />
                        <div className="container">
                            <Radio.Group name="radiogroup" defaultValue='กรุงเทพฯ และ ปริมณฑล'
                                checked={radio}
                                onChange={onRadioChange}
                                direction="vertical">

                                <Radio value='กรุงเทพฯ และ ปริมณฑล'>กรุงเทพฯ และ ปริมณฑล</Radio>
                                <Radio value='ต่างจังหวัด'>ต่างจังหวัด</Radio>

                            </Radio.Group>
                            <Select
                                placeholder='เลือกจังหวัด'
                                showSearch
                                style={{
                                    width: 200,
                                }}
                                hidden={radio === 'กรุงเทพฯ และ ปริมณฑล' ? true : false}
                                onChange={onProvinceChange}>
                                {Province.map((item, index) => {
                                    return (
                                        item.geography_id !== 2.5 ?
                                            <Option key={index} value={item.name_th}>{item.name_th}</Option> : null
                                    )
                                })}
                            </Select>
                        </div>
                        <div className="contianer">
                            <Form
                                labelCol={{
                                    span: 4,
                                }}
                                wrapperCol={{
                                    span: 14,
                                }}
                                layout="horizontal"
                                style={{
                                    maxWidth: 600,
                                }}
                            >
                                <Form.Item label="ชื่อ นามสกุล">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="เลขประจำตัว">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="เบอร์โทรศัพท์">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Upload" valuePropName="fileList">
                                    <Upload action="/upload.do" listType="picture-card">
                                        <div>
                                            <PlusOutlined />
                                            <div
                                                style={{
                                                    marginTop: 8,
                                                }}
                                            >
                                                Upload
                                            </div>
                                        </div>
                                    </Upload>
                                </Form.Item>
                                <Form.Item label="หมายเหตุ">
                                    <TextArea rows={4} />
                                </Form.Item>
                            </Form>
                        </div>
                        <button className="button-book mt-5">จองเลย </button>
                    </div>
                </div>
            </div>
            {/* : <div>Loading...</div>} */}
        </div >
    )
}

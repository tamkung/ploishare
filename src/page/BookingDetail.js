import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { API_URL } from "../Constant";
import Swal from "sweetalert2";
import '../css/Booking.css';
import {
    Form,
    Input,
    Radio,
    Select,
    Checkbox,
    Upload,
    Modal,
    Button,

} from 'antd';
import { Province } from '../components/admin/Province';
import { CloudUploadOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;

export default function BookingDetail() {
    const navigate = useNavigate();
    const location = useLocation()
    const { value } = location.state
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        async function getCarById() {
            await axios.get(`${API_URL}api/getcarbyid/${id}`)
                .then(res => {
                    setGetCar(res.data);
                    console.log(res.data);
                    //setLoading(true);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getCarById();

    }, []);

    const { id } = useParams();

    const [form] = Form.useForm();

    const [getCar, setGetCar] = useState([]);
    const [radio, setRadio] = useState('กรุงเทพฯ และ ปริมณฑล');
    const [province, setProvince] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [name, setName] = useState("");
    const [empoyeeNo, setEmpoyeeNo] = useState("");
    const [phone, setPhone] = useState("");
    const [note, setNote] = useState("");

    const handleChangeName = (e) => {
        setName(e.target.value);
        console.log(name);
    };
    const handleChangeEmpoyeeNo = (e) => {
        setEmpoyeeNo(e.target.value);
        console.log(empoyeeNo);
    };
    const handleChangePhone = (e) => {
        setPhone(e.target.value);
        console.log(phone);
    };

    const handleChangeNote = (e) => {
        setNote(e.target.value);
        console.log(note);
    };

    const addBooking = async (values) => {
        setComponentDisabled(false);
        setLoading(true);
        const startDateTime = value.startDate + " " + value.startTime;
        const endDateTime = value.endDate + " " + value.endTime;
        try {
            await axios.post(API_URL + 'api/addbooking',
                {
                    "id": Date.now(),
                    "uName": values.name,
                    "empoyeeNo": values.empoyeeNo,
                    "uPhone": values.phone,
                    "uSect": null,
                    "uPart": null,
                    "note": values.note,
                    "startDateTime": startDateTime,
                    "endDateTime": endDateTime,
                    "cLicense": getCar.license,
                }).then(response => {
                    if (response.data.status === "OK") {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 1000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.addEventListener("mouseenter", Swal.stopTimer);
                                toast.addEventListener("mouseleave", Swal.resumeTimer);
                            },
                        });

                        Toast.fire({
                            icon: "success",
                            title: "Booking added successfully",
                        }).then(() => {

                            navigate("/booking-list");
                        });
                    } else {

                    }
                }).catch(error => {
                    console.log(error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error
                    })
                });
        } catch (error) {
            console.log(error);
        }
    }

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        addBooking(values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const onRadioChange = (e) => {
        console.log('radio checked', e.target.value);
        setRadio(e.target.value);

    };
    const onProvinceChange = (value) => {
        console.log(value);
        setProvince(value);

    };

    const [componentDisabled, setComponentDisabled] = useState(false);
    const onFormLayoutChange = ({ disabled }) => {
        setComponentDisabled(disabled);
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
                        <img src={getCar.image} alt={getCar.name} />
                        <div style={{ fontWeight: "bolder", fontSize: "1.5rem" }}>{getCar.license}</div>
                        <div style={{ fontWeight: "bolder", fontSize: "1.5rem" }}>{getCar.model}</div>
                        <h2>วันที่ใช้รถ : {value.startDate}</h2>
                        <h2>เวลาที่ใช้รถ : {value.startTime}</h2>
                        <h2>วันที่คืนรถ : {value.endDate}</h2>
                        <h2>เวลที่คืนรถ : {value.endTime}</h2>
                    </div>
                </div>
                <div className="itemBook" style={{ textAlign: "left" }} >
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

                        </div>
                        <div className="contianer pl-2 pr-2">
                            <Form
                                form={form}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                labelCol={{
                                    span: 6,
                                }}
                                wrapperCol={{
                                    span: 12,
                                }}
                                layout="horizontal"

                            >
                                <Form.Item label="จังหวัดที่คุณต้องการเดินทาง" hidden={radio === 'กรุงเทพฯ และ ปริมณฑล' ? true : false}>
                                    <Select
                                        placeholder='เลือกจังหวัด'
                                        showSearch
                                        style={{
                                            width: '100%',
                                        }}
                                        onChange={onProvinceChange}>
                                        {Province.map((item, index) => {
                                            return (
                                                item.geography_id !== 2.5 ?
                                                    <Option key={index} value={item.name_th}>{item.name_th}</Option> : null
                                            )
                                        })}
                                    </Select>
                                </Form.Item>
                                <Form.Item label="ชื่อ นามสกุล" name={"name"}>
                                    <Input value={name} onChange={handleChangeName} />
                                </Form.Item>
                                <Form.Item label="เลขประจำตัว" name={"empoyeeNo"}>
                                    <Input value={empoyeeNo} onChange={handleChangeEmpoyeeNo} />
                                </Form.Item>
                                <Form.Item label="เบอร์โทรศัพท์" name={"phone"}>
                                    <Input value={phone} onChange={handleChangePhone} />
                                </Form.Item>
                                <Form.Item label="Upload" valuePropName="fileList">
                                    <Upload action="/upload.do" listType="picture-card">
                                        <div>
                                            <CloudUploadOutlined />
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
                                <Form.Item label="หมายเหตุ" name={"note"}>
                                    <TextArea rows={4} value={note} onChange={handleChangeNote} />
                                </Form.Item>
                                <div className="mt-2" style={{ textAlign: "center" }}>
                                    <Checkbox
                                        checked={componentDisabled}
                                        onChange={(e) => setComponentDisabled(e.target.checked)}
                                    />

                                    <button style={{ marginLeft: "10px", color: !componentDisabled ? 'gray' : 'blue', textDecoration: "underline" }} className="text-primary" type="button" onClick={showModal} >ฉันอ่านและยอมรับข้อกำหนดทั้งหมด</button>
                                    <Modal okButtonProps={{ style: { display: 'none' } }} title="เงื่อนไขและข้อกำหนด" open={isModalOpen} onCancel={handleCancel}>
                                        <p>Some contents...</p>
                                        <p>Some contents...</p>
                                        <p>Some contents...</p>
                                    </Modal>
                                </div>
                                <button type="submit" loading={loading} className="button-book mt-5" disabled={!componentDisabled} style={{ backgroundColor: !componentDisabled ? 'gray' : '' }}>จองเลย </button>
                            </Form>
                        </div>


                    </div>
                </div>
            </div>
            {/* : <div>Loading...</div>} */}
        </div >
    )
}

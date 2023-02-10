import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { GET_USER, API_URL, API_URL_SignUp } from "../Constant";
import Swal from "sweetalert2";
import '../css/Booking.css';
import logoSolo from '../img/logo-solo.png'
import {
    Form,
    Input,
    Radio,
    Select,
    Checkbox,
    Upload,
    Modal,
    Button,
    message,
    Descriptions

} from 'antd';
import { Province } from '../components/admin/Province';
import { CloudUploadOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;

const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    hourCycle: "h23",  // 24-hour format
    locale: "en-EN"  // Thai language
};

export default function BookingDetail() {
    const navigate = useNavigate();
    const location = useLocation();
    const { value } = location.state;
    const { car } = location.state;
    const [loading, setLoading] = useState(false);
    const email = GET_USER.email;
    const [imageList, setImageList] = useState([]);

    useEffect(() => {
        console.log(email);
        async function getCarById() {
            await axios.get(`${API_URL}api/getcarbyid/${car}`)
                .then(res => {
                    setGetCar(res.data);
                    console.log(res.data);
                    //setLoading(true);
                    setImageList(JSON.parse(res.data.image));
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getCarById();
        console.log(imageList)
    }, []);

    const [form] = Form.useForm();

    const [getCar, setGetCar] = useState([]);
    const [radio, setRadio] = useState('กรุงเทพฯ และ ปริมณฑล');
    const [province, setProvince] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [image, setImage] = useState(null);
    const [disabled, setDisabled] = useState(true)

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

    const handleUpload = (info) => {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            console.log(info.file.response);
            setImage(info.file.response);
            setDisabled(false);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    const addBooking = async (values) => {
        setLoading(true);
        console.log(province === null ? "กรุงเทพฯ และ ปริมณฑล" : province);
        const startDateTime = value.startDate + " " + value.startTime;
        const endDateTime = value.endDate + " " + value.endTime;
        console.log(new Date().toLocaleString('en-EN', options),);
        try {
            await axios.post(API_URL_SignUp + 'api/addbooking',
                {
                    "id": Date.now(),
                    "province": province === null ? "กรุงเทพฯ และ ปริมณฑล" : province,
                    "uName": values.name,
                    "empoyeeNo": values.empoyeeNo,
                    "uEmail": email,
                    "uPhone": values.phone,
                    "uSect": null,
                    "uPart": null,
                    "note": values.note,
                    "startDateTime": startDateTime,
                    "endDateTime": endDateTime,
                    //"bookingDate": new Date().toLocaleString('en-EN', options),
                    "cLicense": getCar.license,
                    "cName": getCar.brand + " : " + getCar.model,
                    image: image,
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
                    setLoading(false);
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
        setProvince(null)
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
            <div className="app-bar mb-3" style={{ textAlign: "left" }}>
                <img
                    type="button"
                    className="ml-4 h-10 w-auto"
                    src={logoSolo}
                    alt="ปล่อย Share Logo"
                    onClick={() => { window.location = "/" }}

                />
            </div>
            {/* {Loading !== false ? */}
            <div className="flexbook" style={{ borderRadius: "15px", background: "white", marginLeft: "15px", marginRight: "15px", padding: "15px" }}>
                <div className="itemBook" >
                    <div >
                        <div style={{ fontWeight: "bolder", fontSize: "1.6rem" }}>การจอง</div>
                        <hr />
                        <Descriptions className="mt-3" title="รายละเอียดการจอง">
                            <Descriptions.Item label="รถ">{getCar.brand} {getCar.model}</Descriptions.Item>
                            <Descriptions.Item label="สี">{getCar.color}</Descriptions.Item>
                            <Descriptions.Item label="ทะเบียน">{getCar.license}</Descriptions.Item>
                            <Descriptions.Item label="วันที่ใช้รถ">{value.startDate} {value.startTime}</Descriptions.Item>
                            <Descriptions.Item label="วันที่คืนรถ">{value.endDate} {value.endTime}</Descriptions.Item>
                        </Descriptions>
                        <hr className="mt-3" />
                        <img className="mt-3" src={imageList[0]} alt={getCar.name} style={{ borderRadius: "15px", width: '100%' }} />

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
                                <Form.Item label="อีเมล" name={"email"}>
                                    <Input defaultValue={email} disabled />
                                </Form.Item>
                                <Form.Item label="เบอร์โทรศัพท์" name={"phone"}>
                                    <Input value={phone} onChange={handleChangePhone} />
                                </Form.Item>
                                <Form.Item label="เอกสารขออนุญาต" valuePropName="fileList">
                                    <Upload
                                        listType="picture-card"
                                        name="img"
                                        multiple={false}
                                        maxCount={1}
                                        action={API_URL + "api/upload-file"}
                                        onChange={handleUpload}
                                        beforeUpload={(file) => {
                                            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                                            if (!isJpgOrPng) {
                                                message.error('You can only upload JPG/PNG file!');
                                            }
                                            const isLt2M = file.size / 1024 / 1024 < 2;
                                            if (!isLt2M) {
                                                message.error('Image must smaller than 2MB!');
                                            }
                                            return isJpgOrPng && isLt2M;
                                        }} >
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
                                <Button
                                    className="button-book mt-5"
                                    disabled={!componentDisabled}
                                    loading={loading}
                                    htmlType="submit"
                                    style={{ backgroundColor: !componentDisabled ? 'gray' : '' }}
                                >
                                    จองเลย
                                </Button>
                            </Form>
                        </div>


                    </div>
                </div>
            </div>
            {/* : <div>Loading...</div>} */}
        </div >
    )
}

import { InboxOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from "sweetalert2";
import {
    Layout,
    Button,
    Input,
    Form,
    Select,
    Upload,
    message,
} from 'antd';
import { API_URL } from "../../Constant";
import { Province } from './Province';

const { Content } = Layout;
const { Option } = Select;

const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};
const carBrand = [
    "Volvo",
    "BMW",
    "Mercedes-Benz",
    "Porsche",
    "Lexus",
    "Peugeot",
    "GWM",
    "Audi",
    "Toyota",
    "Isuzu",
    "Honda",
    "Mitsubishi",
    "Nissan",
    "MG",
    "Kia",
    "Subaru",
    "Mazda",
    "Mini",
    "Porsche",
    "Jaguar"
];

const carColor = ["ดำ", "ขาว", "แดง", "เขียว", "น้ำเงิน", "ฟ้า", "เหลือง", "ชมพู", "ม่วง"];

const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const AddCar = () => {
    const navigate = useNavigate();

    const [form] = Form.useForm();
    const [inputCarLicenseText, setInputCarLicenseText] = useState("");
    const [inputCarLicenseNum, setInputCarLicenseNum] = useState("");
    const [inputCarDetail, setInputCarDetail] = useState("");

    const [selectedCarProvince, setSelectedCarProvince] = useState("");
    const [selectedCarBrand, setSelectedCarBrand] = useState("");
    const [selectedCarColor, setSelectedCarColor] = useState("");

    const [image, setImage] = useState(null);

    const handleChangeCarLicenseText = (e) => {
        setInputCarLicenseText(e.target.value);
        console.log(inputCarLicenseText);
    };
    const handleChangeCarLicenseNum = (e) => {
        setInputCarLicenseNum(e.target.value);
        console.log(inputCarLicenseNum);
    };
    const handleChangeCarDetail = (e) => {
        setInputCarDetail(e.target.value);
        console.log(inputCarDetail);
    };

    const handleChangeCarProvince = (value) => {
        setSelectedCarProvince(value);
        console.log(value);
    };

    const handleChangeCarBrand = (value) => {
        setSelectedCarBrand(value);
        console.log(value);
    };

    const handleChangeCarColor = (value) => {
        setSelectedCarColor(value);
        console.log(value);
    };

    const handleUpload = (info) => {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            setImage(info.file.response);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    const onFinish = (values) => {
        console.log(image)
        try {
            axios.post(API_URL + "api/addcar",
                {
                    "license": inputCarLicenseText + "-" + inputCarLicenseNum,
                    "province": selectedCarProvince,
                    "brand": selectedCarBrand,
                    "color": selectedCarColor,
                    "detail": inputCarDetail,
                    "image": image
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
                            title: "SignIn in successfully",
                        }).then(() => {

                            navigate("/listcar");
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: response.data.message,
                        })
                    }
                }).catch(error => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <div>
            <Layout>
                <Layout >
                    <Content className='mt-3 ml-4 mr-4' style={{ background: "white", padding: "20px", borderRadius: "15px", fontSize: "20px" }}>Add Car</Content>
                    <Content className='mt-3 ml-4 mr-4' style={{ background: "white", padding: "20px", borderRadius: "15px" }}>
                        <Form
                            {...formItemLayout}
                            form={form}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            initialValues={{
                                'input-number': 3,
                                'checkbox-group': ['A', 'B'],
                                rate: 3.5,
                            }}>
                            <Form.Item label="ทะเบียนรถ"  >
                                <Form.Item
                                    name={['carLicense', 'carLicenseText']}
                                    noStyle
                                    rules={[{ required: true, message: 'กรุณาป้อนทะเบียนรถ' }]}
                                >
                                    <Input className="inline-flex w-auto" value={inputCarLicenseText} onChange={handleChangeCarLicenseText} />

                                </Form.Item>
                                <p className="inline-flex mr-2 ml-2"> - </p>
                                <Form.Item
                                    name={['carLicense', 'carLicenseNum']}
                                    noStyle
                                    rules={[{ required: true, message: 'กรุณาป้อนทะเบียนรถ' }]}
                                >
                                    <Input className="inline-flex w-auto" value={inputCarLicenseNum} onChange={handleChangeCarLicenseNum} />
                                    {/* <Select>
                                        <Option value="black">ดำ</Option>
                                        <Option value="white">ขาว </Option>
                                        <Option value="red">แดง </Option>
                                        <Option value="green">เขียว </Option>
                                        <Option value="blue">น้ำเงิน </Option>
                                        <Option value="lightblue">ฟ้า </Option>
                                        <Option value="yellow">เหลือง</Option>
                                        <Option value="pink">ชมพู</Option>
                                        <Option value="purple">ม่วง</Option>
                                    </Select> */}
                                </Form.Item>
                                {/* <Form.Item label="ทะเบียนรถ"
                                    name="detail">
                                    <Input.TextArea rows={4} placeholder="กรอกรายละเอียดเพิ่มเติม"/>
                                </Form.Item> */}
                            </Form.Item>
                            <Form.Item
                                label="จังหวัด"
                                name={'carProvince'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'กรุณาเลือกจังหวัด',
                                    },
                                ]}  >
                                <Select placeholder="เลือกจังหวัด" onChange={handleChangeCarProvince} value={selectedCarProvince} >
                                    {Province.map((item, index) => <Option key={index} value={item.name_th} >{item.name_th}</Option>)}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="ยี่ห้อรถ"
                                name={'carBrand'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'กรุณาเลือกยี่ห้อรถ',
                                    },
                                ]}>
                                <Select placeholder="เลือกยี่ห้อรถยนต์" onChange={handleChangeCarBrand} value={selectedCarBrand} >
                                    {carBrand.map((item, index) => <Option key={index} value={item}>{item}</Option>)}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="สีรถ"
                                name={'carColor'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'กรุณาเลือกสีรถ',
                                    },
                                ]}>
                                <Select placeholder="เลือกสีรถยนต์" onChange={handleChangeCarColor} value={selectedCarColor}>
                                    {carColor.map((item, index) => <Option key={index} value={item}>{item}</Option>)}
                                </Select>
                            </Form.Item>
                            <Form.Item label="รายละเอียดเพิ่มเติม" name={'carDetail'}>
                                <Input.TextArea name='carDetail' rows={4} placeholder="กรอกรายละเอียดเพิ่มเติม" value={inputCarDetail} onChange={handleChangeCarDetail} />
                            </Form.Item>
                            <Form.Item label="อัปโหลดรูปภาพ">
                                <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                                    <Upload.Dragger
                                        name="img"
                                        action={API_URL + "upload/firebase"}
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
                                        <p className="ant-upload-drag-icon">
                                            <InboxOutlined />
                                        </p>
                                        <p className="ant-upload-text">"คลิก" หรือ "ลาก" รูปภาพวางในช่องอัปโหลด</p>
                                        <p className="ant-upload-hint">เพื่ออัปโหลดรูปภาพ</p>
                                    </Upload.Dragger>
                                </Form.Item>
                            </Form.Item>

                            <Form.Item
                                wrapperCol={{
                                    span: 12,
                                    offset: 6,
                                }} >
                                <Button className="buttonNext" htmlType="submit" >
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Content>
                </Layout>
                
            </Layout>

        </div >
    );
};
export default AddCar;

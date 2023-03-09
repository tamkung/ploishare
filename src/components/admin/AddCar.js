import { InboxOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from "sweetalert2";
import {
    Layout,
    Button,
    Input,
    InputNumber,
    Form,
    Select,
    Upload,
    message,
} from 'antd';
import { API_URL } from "../../Constant";
import { Province } from './Province';
import { carBrands, carYear, carColor, rentMonth, rentYear, } from './Car';
import authCheck from '../../service/Auth';

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

const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const AddCar = () => {
    useEffect(() => {
        authCheck();
    }, []);

    const navigate = useNavigate();

    const [form] = Form.useForm();
    const [inputCarLicenseText, setInputCarLicenseText] = useState("");
    const [inputCarLicenseNum, setInputCarLicenseNum] = useState("");
    const [inputCarSeat, setInputCarSeat] = useState("");
    const [inputCarDetail, setInputCarDetail] = useState("");

    const [selectedCarProvince, setSelectedCarProvince] = useState("");
    const [selectedCarBrand, setSelectedCarBrand] = useState("");
    const [selectedCarModel, setSelectedCarModel] = useState([]);
    const [selectedCarYear, setSelectedCarYear] = useState("");
    const [selectedRentYear, setSelectedRentYear] = useState("");
    const [selectedRentMonth, setSelectedRentMonth] = useState("");
    const [selectedCarColor, setSelectedCarColor] = useState("");

    const [image, setImage] = useState(null);
    const images = [];
    const [imageList, setImageList] = useState([]);
    const [disabled, setDisabled] = useState(true)

    const handleChangeCarLicenseText = (e) => {
        setInputCarLicenseText(e.target.value);
        console.log(inputCarLicenseText);
    };
    const handleChangeCarLicenseNum = (e) => {
        setInputCarLicenseNum(e.target.value);
        console.log(inputCarLicenseNum);
    };

    const handleChangeCarSeat = (e) => {
        setInputCarSeat(e);
        console.log(inputCarSeat);
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
        setSelectedCarModel([])
        console.log(value);
    };

    const handleChangeCarModel = (value) => {
        setSelectedCarModel(value);
        console.log(value);
    };

    const handleChangeCarYear = (value) => {
        setSelectedCarYear(value);
        console.log(selectedCarYear);
    };

    const handleChangeRentYear = (value) => {
        setSelectedRentYear(value);
        console.log(selectedRentYear);
    };

    const handleChangeRentMonth = (value) => {
        setSelectedRentMonth(value);
        console.log(selectedRentMonth);
    };
    const handleChangeCarColor = (value) => {
        setSelectedCarColor(value);
        console.log(value);
    };

    const selectedCarModels = selectedCarBrand
        ? carBrands.find(brand => brand.label === selectedCarBrand).models
        : [];

    const handleUpload = (info) => {
        if (info.file.status !== 'uploading') {
            //console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            // setImage(info.file.response);
            images.length = 0;
            info.fileList.map((file) => {
                images.push(file.response)
            })
            //images.push(info.file.response)
            console.log("images : " + images)
            setImageList(images)
            //console.log("imageList : " + imageList)
            setDisabled(false);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    const onFinish = (values) => {
        //console.log(image)
        console.log(imageList)
        console.log(selectedRentMonth + '-' + selectedRentYear)
        try {
            axios.post(API_URL + "api/addcar",
                {
                    "license": inputCarLicenseText + "-" + inputCarLicenseNum,
                    "province": selectedCarProvince,
                    "brand": selectedCarBrand,
                    "model": selectedCarYear !== '' ? selectedCarModel + " ปี " + selectedCarYear : selectedCarModel,
                    "rentDate": selectedRentMonth + '-' + selectedRentYear,
                    "color": selectedCarColor,
                    "seat": inputCarSeat,
                    "detail": inputCarDetail,
                    "image": JSON.stringify(imageList)
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
                                </Form.Item>
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
                                <Select showSearch placeholder="เลือกจังหวัด" onChange={handleChangeCarProvince} value={selectedCarProvince} >
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
                                <Select
                                    showSearch
                                    placeholder="เลือกยี่ห้อรถยนต์"
                                    onChange={handleChangeCarBrand}
                                    value={selectedCarBrand}
                                >
                                    {carBrands.map((brand, index) => <Option key={index} value={brand.label}>{brand.label}</Option>)}
                                </Select>
                            </Form.Item>
                            <Form.Item label="รุ่นรถ"  >
                                <Form.Item
                                    name={['carName', 'carModel']}
                                    noStyle
                                    rules={[{ required: true, message: 'กรุณาป้อนรุ่นรถ' }]}
                                >
                                    <Select
                                        style={{ width: 150 }}
                                        showSearch
                                        placeholder="เลือกยี่ห้อรถยนต์"
                                        onChange={handleChangeCarModel}
                                        value={selectedCarModel}
                                        disabled={!selectedCarBrand}
                                    >
                                        {selectedCarModels.map(model => (
                                            <Option key={model} value={model}>
                                                {model}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <p className="inline-flex mr-2 ml-2"> ปี </p>
                                <Form.Item
                                    name={['carName', 'carYear']}
                                    noStyle
                                    rules={[{ required: false, message: 'กรุณาป้อนปีรถ' }]}
                                >
                                    <Select
                                        style={{ width: 150 }}
                                        showSearch
                                        placeholder="กรุณาป้อนปีรถ"
                                        onChange={handleChangeCarYear}
                                        value={selectedCarYear}
                                    >
                                        {carYear.map((item, index) => <Option key={index} value={item}>{item}</Option>)}
                                    </Select>
                                </Form.Item>
                            </Form.Item>
                            <Form.Item label="เริ่มเช่า"  >
                                <Form.Item
                                    name={['rentDate' , 'rentYear']}
                                    noStyle
                                    rules={[{ required: true, message: 'กรุณาป้อนเดือนที่เริ่มเช่า' }]}
                                >
                                    <Select
                                        style={{ width: 180 }}
                                        showSearch

                                        placeholder="กรุณาป้อนเดือนที่เริ่มเช่า"
                                        onChange={handleChangeRentMonth}
                                        value={selectedRentMonth}
                                    >
                                        {rentMonth.map((item, index) => <Option key={index} value={item}>{item}</Option>)}
                                    </Select>
                                </Form.Item>
                                <p className="inline-flex mr-2 ml-2"> - </p>
                                <Form.Item
                                    name={['rentDate' , 'rentMonth']}
                                    noStyle
                                    rules={[{ required: true, message: 'กรุณาป้อนปีที่เริ่มเช่า' }]}
                                >
                                    <Select
                                        style={{ width: 180 }}
                                        showSearch
                                        placeholder="กรุณาป้อนปีที่เริ่มเช่า"
                                        onChange={handleChangeRentYear}
                                        value={selectedRentYear}
                                    >
                                        {rentYear.map((item, index) => <Option key={index} value={item}>{item}</Option>)}
                                    </Select>
                                </Form.Item>
                            </Form.Item>
                            <Form.Item
                                label="สีรถ"
                                name={'carColor'}
                                rules={[{ required: true, message: 'กรุณาเลือกสีรถ', },
                                ]}>
                                <Select showSearch placeholder="เลือกสีรถยนต์" onChange={handleChangeCarColor} value={selectedCarColor}>
                                    {carColor.map((item, index) => <Option key={index} value={item}>{item}</Option>)}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="จำนวนที่นั่ง"
                                name={'carSeat'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'กรุณาระบุจำนวนที่นั่ง',
                                    },
                                ]}>
                                <InputNumber placeholder='ระบุจำนวนที่นั่ง' className="inline-flex w-auto" value={inputCarSeat} onChange={handleChangeCarSeat} min={1} max={10} />
                            </Form.Item>
                            <Form.Item label="รายละเอียดเพิ่มเติม" name={'carDetail'}>
                                <Input.TextArea name='carDetail' rows={4} placeholder="กรอกรายละเอียดเพิ่มเติม" value={inputCarDetail} onChange={handleChangeCarDetail} />
                            </Form.Item>
                            <Form.Item label="อัปโหลดรูปภาพ">
                                <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                                    <Upload.Dragger
                                        name="img"
                                        multiple={true}
                                        maxCount={3}
                                        action={API_URL + "api/upload-file"}
                                        onChange={handleUpload}
                                        beforeUpload={(file) => {
                                            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                                            if (!isJpgOrPng) {
                                                message.error('You can only upload JPG/PNG file!');
                                            }
                                            const isLt10M = file.size / 1024 / 1024 < 10;
                                            if (!isLt10M) {
                                                message.error('Image must smaller than 10MB!');
                                            }
                                            return isJpgOrPng && isLt10M;
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
                                <Button className="buttonNext" htmlType="submit" disabled={disabled}>
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

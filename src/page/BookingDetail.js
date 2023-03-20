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
    second: "2-digit",
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
    const [uSectNo, setSectNo] = useState("");
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
    const handleChangeSectNo = (e) => {
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
        console.log(values);
        console.log(province === null ? "กรุงเทพฯ และ ปริมณฑล" : province);
        const startDateTime = value.startDate + " " + value.startTime;
        const endDateTime = value.endDate + " " + value.endTime;
        const newDataTime = new Date().toLocaleString('en-EN', options).slice(0, 20).replace(',', '')
        //const timeStamp = newDataTime.split(" ")[0].split("/").reverse().join("-") + " " + newDataTime.split(" ")[1];
        const dateObj = new Date(newDataTime);
        const timeStamp = dateObj.getFullYear() + "-" + ('0' + (dateObj.getMonth() + 1)).slice(-2) + "-" + ('0' + dateObj.getDate()).slice(-2) + " " + ('0' + dateObj.getHours()).slice(-2) + ":" + ('0' + dateObj.getMinutes()).slice(-2) + ":" + ('0' + dateObj.getSeconds()).slice(-2);
        console.log('timeStamp', timeStamp);

        if (values.name === undefined || values.empoyeeNo === undefined || values.phone === undefined) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
            })
        } else {
            setLoading(true);
            try {
                await axios.post(API_URL_SignUp + 'api/addbooking',
                    {
                        "id": Date.now(),
                        "province": province === null ? "กรุงเทพฯ และ ปริมณฑล" : province,
                        "uName": values.name,
                        "empoyeeNo": values.empoyeeNo,
                        "uEmail": email,
                        "uPhone": values.phone,
                        "uSectNo": values.uSectNo,
                        "uSectName": null,
                        "note": values.note,
                        "startDateTime": startDateTime,
                        "endDateTime": endDateTime,
                        "bookingDate": timeStamp,
                        "cLicense": getCar.license,
                        "cName": getCar.brand + " : " + getCar.model,
                        "image": image,
                        "status": 1,
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
    };

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
                    onClick={() => { navigate('/home') }}

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
                                <Form.Item label="Cost Center" name={"uSectNo"}>
                                    <Input value={uSectNo} onChange={handleChangeSectNo} />
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
                                            const isLt10M = file.size / 1024 / 1024 < 10;
                                            if (!isLt10M) {
                                                message.error('Image must smaller than 10MB!');
                                            }
                                            return isJpgOrPng && isLt10M;
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
                                        <div>
                                            <strong>1. รายละเอียดการจอง</strong>
                                            <p>- ระบุวันเวลาใช้เริ่มต้น - สิ้นสุด ให้ชัดเจน</p>
                                            <p>- ตรวจสอบรายละเอียดการจอง ชื่อ-นามสกุล , รหัสพนักงาน , Cost Center ฯลฯ ให้ถูกต้อง</p>
                                            <p>- กรณีใช้หรือคืนรถนอกเวลาที่กำหนด ตั้งแต่เวลา 5.00 ถึง 18.00 ให้ติดต่อผู้ดูแล</p>
                                            <br />
                                            <strong>2. การอนุมัติใช้รถ</strong>
                                            <p>- ผู้ใช้งานจะต้องกรอกใบขออนุญาตและต้องเซ็นรับรองจากหัวหน้า (หากไม่มีแบบฟอร์มสามารถขอได้จากเจ้าหน้าที่ที่ดูแล)</p>
                                            <p>- ผู้ใช้งานสามารถส่งใบขออนุญาตย้อนหลังได้ผ่านระบบ "ปล่อยShared" (วิธีการส่งใบขออนุญาตย้อนหลัง ดูได้จากข้อ 5)</p>
                                            <br />
                                            <strong>3. การรับและคืนรถ</strong>
                                            <p>- รับรถ , คืนรถ ในวันเวลาทำการตั้งแต่ วันจันทร์ – ศุกร์ / เวลา 07.30 - 16.30 น. รับที่หน่วยงาน Workplace Solution อ.2/4 (เบอร์ติดต่อ 063-485-1959)</p>
                                            <p>- รับรถ , คืนรถ นอกวันเวลาทำการหรือวันหยุด ตั้งแต่ วันจันทร์ –ศุกร์ / เวลา 16.31 – 07.29 น. (วันเสาร์ , อาทิตย์ และวันหยุดนักขัตฤกษ์)   รับที่รปภ.ประจำโถงอาคาร 1/1 (เบอร์ติดต่อ 02-555-5013)</p>
                                            <br />
                                            <strong>4. การใช้รถ</strong>
                                            <p>- เมื่อ Start รถทุกครั้ง ต้องเช็คว่ากล้องติดหน้ารถทำงานได้ 100%</p>
                                            <p>- ก่อนใช้งานรถ และ หลังการใช้งานรถ ให้สำรวจสภาพรถ ว่ามีรอยหรือชำรุดส่วนใดหรือไม่ หากมีปัญหาให้ถ่ายรูปทุกครั้ง</p>
                                            <p>- กรณีคืนรถไม่ตรงเวลาตามที่จอง ให้ติดต่อผู้ดูแล (เนื่องจากอาจมีผู้ใช้งานรอต่อคิว)</p>
                                            <p>- ผู้ใช้จะต้องกรอกเลขไมค์ผ่านเว็บไซต์ "ปล่อยShared" ทั้งก่อนใช้งานและหลัง ค่าน้ำมันจะคำนวณจากส่วนนี้และเรียกเก็บไปที่หน่วยงานภายหลัง</p>
                                            <p>- ควรพึงระวังการใช้รถ หากทางเราตรวจสอบพบว่ารถเกิดความเสียหาย ทางผู้ใช้งานรถจะต้องรับผิดชอบค่าใช้จ่ายทั้งหมดที่เกิดขึ้น เช่น ค่าเครม</p>
                                            <br />
                                            <strong>5. ขั้นตอนการใช้งาน</strong>
                                            <p>#หากผู้ใช้งานจองรถสำเร็จแล้ว สถานะของรายการจองนั้นจะมีปุ่ม "เปิดการใช้งาน" ปรากฎ</p>
                                            <p>วิธีการกรอกเลขไมล์รถ ผ่านเว็บไซต์ "ปล่อยShared" ทุกครั้ง</p>
                                            <p>1. กดปุ่ม "เปิดการใช้งาน" และกรอกเลขไมล์เริ่มต้นก่อนใช้งานทุกครั้ง</p>
                                            <p>2. ขณะคืนรถ ให้กดปุ่ม "ปิดการใช้งาน" และกรอกเลขไมลล์ล่าสุดหลังใช้งานทุกครั้ง</p>
                                            <br />
                                            <p>#หากผู้ใช้งานต้องการส่งใบขออนุญาตย้อนหลังสามารถทำตามวิธีด้านล่างได้เลยค่ะ</p>
                                            <p>(ข้อพึงระวังผู้ใช้งานจะต้องส่งใบขออนุญาตทุกครั้งเพราะระบบจะบันทึกว่าท่านยังไม่ได้ส่ง)</p>
                                            <p>วิธีส่งใบอนุญาตย้อนหลัง</p>
                                            <p>1. คลิกที่ปุ่ม "เมนู" ทางขวาล่าง เลือก "รายการจอง"</p>
                                            <p>2. ตรวจสอบรายการจจอง รุ่นรถ ป้ายทะเบียน และวันเวลาที่ใช้งานให้ถูกต้อง หากผิดพลาดให้กดยกเลิกทางขวาบนของรายการ และทำการจองใหม</p>่
                                            <p>3. กดปุ่ม "เพิ่มใบขออนุญาต"</p>
                                            <p>4. เลือกไฟล์ ใบขออนุญาต และกด "ตกลง"</p>
                                            <br />
                                            <p>หากผู้ใช้งานติดปัญหาเรื่องการจอง สามารถติดต่อเจ้าหน้าที่ ได้ที่ เบอร์ : 063-485-1959 หรือผ่านช่องแชท Line :  CPAC Workplace ได้เลยค่ะ</p>
                                        </div>
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

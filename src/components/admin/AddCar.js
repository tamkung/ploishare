import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Province } from './Province';
import {
    Layout,
    Button,
    Input,
    Form,
    Select,
    Upload,
} from 'antd';

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

// const carBrand = [
//     { "name": "Volvo" },
//     { "name": "BMW" },
//     { "name": "Mercedes-Benz" },
//     { "name": "Porsche" },
//     { "name": "Lexus" },
//     { "name": "Peugeot" },
//     { "name": "GWM" },
//     { "name": "Audi" },
//     { "name": "Toyota" },
//     { "name": "Isuzu" },
//     { "name": "Honda" },
//     { "name": "Mitsubishi" },
//     { "name": "Nissan" },
//     { "name": "MG" },
//     { "name": "Kia" },
//     { "name": "Subaru" },
//     { "name": "Mazda" },
//     { "name": "Mini" },
//     { "name": "Porsche" },
//     { "name": "Jaguar" },
//     { "name": "Ford" }
// ];

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
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    return (
        <div>
            <Layout>
                <Layout >
                    <Content className='mt-3 ml-4 mr-4' style={{ background: "white", padding: "20px", borderRadius: "15px", fontSize: "20px" }}>Add Car</Content>
                    <Content className='mt-3 ml-4 mr-4' style={{ background: "white", padding: "20px", borderRadius: "15px" }}>
                        <Form
                            name="validate_other"
                            {...formItemLayout}
                            onFinish={onFinish}
                            initialValues={{
                                'input-number': 3,
                                'checkbox-group': ['A', 'B'],
                                rate: 3.5,
                            }}>
                            <Form.Item label="ทะเบียนรถ"
                                name="license"
                                rules={[
                                    {
                                        required: true,
                                        message: 'กรุณาป้อนเลขทะเบียน',
                                    },
                                ]}>
                                <Input className="inline-flex w-auto" />
                                <p className="inline-flex mr-2 ml-2"> - </p>
                                <Input className="inline-flex w-auto" />
                            </Form.Item>
                            <Form.Item
                                name="province"
                                label="จังหวัด"
                                rules={[
                                    {
                                        required: true,
                                        message: 'กรุณาเลือกจังหวัด',
                                        type: 'array',
                                    },
                                ]}
                            >
                                <Select>
                                    {Province.map((item, index) => < Option key={index} value={item.name_th} >{item.name_th}</Option>)}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="ิcar_brand"
                                label="ยี่ห้อรถ"
                                rules={[
                                    {
                                        required: true,
                                        message: 'กรุณาเลือกยี่ห้อรถ',
                                        type: 'array',
                                    },
                                ]}
                            >
                                <Select placeholder="เลือกยี่ห้อรถยนต์">
                                    {carBrand.map((item, index) => <Option key={index} value={item}>{item}</Option>)}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="car_color"
                                label="สีรถ"
                                rules={[
                                    {
                                        required: true,
                                        message: 'กรุณาเลือกสีรถ',
                                        type: 'array',
                                    },
                                ]}
                            >
                                <Select>
                                    {carColor.map((item, index) => <Option key={index} value={item}>{item}</Option>)}
                                </Select>
                            </Form.Item>
                            <Form.Item label="รายละเอียดเพิ่มเติม"
                                name="detail">
                                <Input.TextArea rows={4} placeholder="กรอกรายละเอียดเพิ่มเติม" />
                            </Form.Item>


                            <Form.Item label="อัปโหลดรูปภาพ">
                                <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                                    <Upload.Dragger name="files" action="/upload.do">
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
                                }}
                            >
                                <Button type="primary" htmlType="submit">
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

import React from 'react';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { Province } from './Province';
import {
    Layout,
    Button,
    Input,
    Checkbox,
    Col,
    Form,
    InputNumber,
    Radio,
    Rate,
    Row,
    Select,
    Slider,
    Switch,
    Upload,
} from 'antd';

const { Header, Content, Sider, Footer } = Layout;
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
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    return (
        <div>
            <div>
                <Layout>
                    <Layout>
                        <Sider width={200} className="site-layout-background" />
                    </Layout>
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
                                }}
                            >

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
                                    name="ิprovince"
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


                                        {Province.map((item, index) => {
                                            return (
                                                <Option key={index} value={item.name_th}>{item.name_th}</Option>

                                            );
                                        })}



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
                                        <Option value="Toyota">Toyota</Option>
                                        <Option value="Honda">Honda</Option>
                                        <Option value="Suzuki">Suzuki</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    name="ิcar_color"
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
                                        <Option value="black">ดำ</Option>
                                        <Option value="white">ขาว </Option>
                                        <Option value="red">แดง </Option>
                                        <Option value="green">เขียว </Option>
                                        <Option value="blue">น้ำเงิน </Option>
                                        <Option value="lightblue">ฟ้า </Option>
                                        <Option value="yellow">เหลือง</Option>
                                        <Option value="pink">ชมพู</Option>
                                        <Option value="purple">ม่วง</Option>

                                    </Select>
                                </Form.Item>
                                <Form.Item label="ทะเบียนรถ"
                                    name="detail">
                                    <Input.TextArea rows={4} placeholder="กรอกรายละเอียดเพิ่มเติม"/>
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
            </div>
        </div>
    );
};
export default AddCar;

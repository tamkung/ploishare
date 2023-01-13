import React from 'react';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
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
const App = () => {
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
                                    <Input className="inline-flex" placeholder="Please input your license. ( Example 1กก-1234 )" />
                                    <Input placeholder="Please input your license. ( Example 1กก-1234 )" />
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
                                    <Select mode="multiple" placeholder="Please select colors">
                                        <Option value="red">Red</Option>
                                        <Option value="green">Green</Option>
                                        <Option value="blue">Blue</Option>
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
                                    <Select mode="multiple" placeholder="Please select favourite colors">
                                        <Option value="black">ดำ : Black</Option>
                                        <Option value="white">ขาว : white</Option>
                                        <Option value="red">แดง : Red</Option>
                                        <Option value="green">เขียว : Green</Option>
                                        <Option value="blue">น้ำเงิน : Blue</Option>
                                        <Option value="lightblue">ฟ้า : Light Blue </Option>
                                        <Option value="yellow">เหลือง : Yellow</Option>
                                        <Option value="pink">ชมพู : Pink</Option>
                                        <Option value="purple">ม่วง : Purple</Option>

                                    </Select>
                                </Form.Item>

                                <Form.Item label="InputNumber">
                                    <Form.Item name="input-number" noStyle>
                                        <InputNumber min={1} max={10} />
                                    </Form.Item>
                                    <span
                                        className="ant-form-text"
                                        style={{
                                            marginLeft: 8,
                                        }}
                                    >
                                        machines
                                    </span>
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
export default App;
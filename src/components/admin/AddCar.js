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
        <Layout>
            <Layout>
                <Header style={{ background: '#fff', padding: 0 }} />
            </Layout>
            <Layout>
                <Sider width={200} className="site-layout-background" />

            </Layout>
            <Layout>
                <Content>


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
                        <Form.Item label="Plain Text">
                            <span className="ant-form-text">China</span>
                        </Form.Item>

                        <Form.Item label="Input">
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="select"
                            label="Select"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select your country!',
                                },
                            ]}
                        >
                            <Select placeholder="Please select a country">
                                <Option value="china">China</Option>
                                <Option value="usa">U.S.A</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="select-multiple"
                            label="Select[multiple]"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select your favourite colors!',
                                    type: 'array',
                                },
                            ]}
                        >
                            <Select mode="multiple" placeholder="Please select favourite colors">
                                <Option value="red">Red</Option>
                                <Option value="green">Green</Option>
                                <Option value="blue">Blue</Option>
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

                        <Form.Item
                            name="upload"
                            label="Upload"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            extra="longgggggggggggggggggggggggggggggggggg"
                        >
                            <Upload name="logo" action="/upload.do" listType="picture">
                                <Button icon={<UploadOutlined />}>Click to upload</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item label="Dragger">
                            <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                                <Upload.Dragger name="files" action="/upload.do">
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                    <p className="ant-upload-hint">Support for a single or bulk upload.</p>
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
    );
};
export default App;
import React, { useState, useEffect } from 'react';
import * as IoIcons from 'react-icons/io';
import {
    Breadcrumb,
    Layout,
    Menu,
    theme,
    Button,
    Drawer,
    Form,
    Input,
    InputNumber,
    Popconfirm,
    Table,
    Typography,
    Image,
} from 'antd';

import axios from 'axios';

import { API_URL } from '../../Constant';
import { Link } from 'react-router-dom';

const { Header, Content, Sider, Footer } = Layout;

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (

        <td {...restProps}>

            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>

    );
};
const originData = [];

function ContentCar() {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');

    useEffect(() => {

        const fetchData = async () => {
            originData.length = 0;
            await axios.get(API_URL + 'api/getcar').then((response) => {
                response.data.map((item) => {
                    originData.push({
                        key: item.id.toString(),
                        license: item.license,
                        province: item.province,
                        brand: item.brand,
                        color: item.color,
                        detail: item.detail,
                        image: item.image,
                    });
                });
            });
            setData(originData);
        }
        fetchData();
    }, []);

    const isEditing = (record) => record.key === editingKey;
    const edit = (record) => {
        form.setFieldsValue({
            name: '',
            age: '',
            address: '',
            ...record,
        });
        setEditingKey(record.key);
    };
    const cancel = () => {
        setEditingKey('');
    };
    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };
    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            width: '10%',
            editable: true,
        },
        {
            title: 'ป้ายทะเบียน',
            dataIndex: 'license',
            width: '10%',
            editable: true,
        },
        {
            title: 'จังหวัด',
            dataIndex: 'province',
            width: '15%',
            editable: true,
        },
        {
            title: 'ยี่ห้อ',
            dataIndex: 'brand',
            width: '15%',
            editable: true,
        },
        {
            title: 'สี',
            dataIndex: 'color',
            width: '15%',
            editable: true,
        },
        {
            title: 'รายละเอียด',
            dataIndex: 'detail',
            width: '15%',
            editable: true,
        },
        {
            title: 'รูปภาพ',
            dataIndex: 'image',
            render: (image) => <Image
                width={75}
                height={75}
                src={image}
            />,
            width: '15%',
            editable: true,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
                );
            },
        },
    ];
    const mergedColumns = columns.map((col) => {

        if (!col.editable) {
            return col;
            console.log(col);
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'id' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),

            }),

        };
    });
    return (
        <div>
            <Layout>
                <Layout style={{ padding: '0 24px 24px', margin: '24px 0' }}>

                    <Content
                        style={{
                            padding: 20,
                            borderRadius: "15px 15px 15px 15px",
                            margin: 0,
                            minHeight: 280,
                            background: '#fff',
                        }}
                    >
                        <div style={{ textAlign: "right" }}>
                            <Link to={'/listcar/addcar'}><button className='btn-add'> + Add</button></Link>
                        </div>
                        <Form form={form} component={false}>
                            <Table loading={data.length === 0 ? true : false}
                                components={{
                                    body: {
                                        cell: EditableCell,
                                    },
                                }}
                                bordered
                                dataSource={data}
                                columns={mergedColumns}
                                rowClassName="editable-row"
                                pagination={{
                                    onChange: cancel,
                                }}
                            />
                        </Form>

                    </Content>
                </Layout>

            </Layout>
        </div>
    )
}
export default ContentCar;
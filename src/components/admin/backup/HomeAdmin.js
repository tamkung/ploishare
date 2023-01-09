import React, { useState, useEffect } from 'react';
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
} from 'antd';

import axios from 'axios';

import Navbar from './Navbar';

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

const HomeAdmin = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            await axios.get('https://api-ploishare.cyclic.app/list/cars').then((response) => {
                response.data.map((item) => {
                    originData.push({
                        key: item.id.toString(),
                        id: item.id,
                        make: item.make,
                        model: item.model,
                        year: item.year,
                        color: item.color,
                        rental_rate: item.rental_rate,
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
            title: 'ID',
            dataIndex: 'id',
            width: '10%',
            editable: true,
        },
        {
            title: 'Make',
            dataIndex: 'make',
            width: '15%',
            editable: true,
        },
        {
            title: 'Model',
            dataIndex: 'model',
            width: '15%',
            editable: true,
        },
        {
            title: 'Year',
            dataIndex: 'year',
            width: '15%',
            editable: true,
        },
        {
            title: 'Color',
            dataIndex: 'color',
            width: '15%',
            editable: true,
        },
        {
            title: 'Rental Price',
            dataIndex: 'rental_rate',
            width: '20%',
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
            
            <Navbar />
            <Layout>

                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '12px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        style={{
                            padding: 20,
                            margin: 0,
                            minHeight: 280,
                            background: '#fff',
                        }}
                    >
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
                <Layout >
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>

        </div>
    );
};
export default HomeAdmin;
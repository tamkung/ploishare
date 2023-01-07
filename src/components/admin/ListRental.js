import React, { useState, useEffect, usePra } from 'react';
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

const date = new Date('2023-02-02T10:00:00.000Z');
var now_utc = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours() - 7,
    date.getUTCMinutes(),
    date.getUTCSeconds());
//2023-02-02T10:00:00.000Z
//2023-02-02T03:00:00.000Z
const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    hourCycle: "h23",  // 24-hour format
    locale: "th"  // Thai language

};
console.log(new Date(now_utc).toLocaleString('th', options));
console.log(date.toISOString());
console.log(date.toLocaleString('th', options));

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

const ListRental = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            await axios.get('https://api-ploishare.cyclic.app/list/rentals').then((response) => {
                response.data.map((item) => {
                    originData.push({
                        key: item.id.toString(),
                        id: item.id,
                        car_id: item.car_id,
                        start_date_time: new Date(Date.UTC(
                            new Date(item.start_date_time).getUTCFullYear(),
                            new Date(item.start_date_time).getUTCMonth(),
                            new Date(item.start_date_time).getUTCDate(),
                            new Date(item.start_date_time).getUTCHours() - 7,
                            new Date(item.start_date_time).getUTCMinutes(),
                            new Date(item.start_date_time).getUTCSeconds())).toLocaleString('th', options),

                        end_date_time: new Date(Date.UTC(
                            new Date(item.end_date_time).getUTCFullYear(),
                            new Date(item.end_date_time).getUTCMonth(),
                            new Date(item.end_date_time).getUTCDate(),
                            new Date(item.end_date_time).getUTCHours() - 7,
                            new Date(item.end_date_time).getUTCMinutes(),
                            new Date(item.end_date_time).getUTCSeconds())).toLocaleString('th', options),
                        rate: item.rate,
                        day: item.day + ' วัน',
                    });
                });
            });
            setData(originData);
            console.log(originData);
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
            title: 'Car ID',
            dataIndex: 'car_id',
            width: '15%',
            editable: true,
        },
        {
            title: 'Start Date',
            dataIndex: 'start_date_time',
            width: '15%',
            editable: true,
        },
        {
            title: 'End Date',
            dataIndex: 'end_date_time',
            width: '15%',
            editable: true,
        },
        {
            title: 'Rate',
            dataIndex: 'rate',
            width: '15%',
            editable: true,
        },
        {
            title: 'Day',
            dataIndex: 'day',
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
export default ListRental;
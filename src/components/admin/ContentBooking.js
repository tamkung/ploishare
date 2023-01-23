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

import { API_URL } from '../../Constant';

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
// console.log(new Date(now_utc).toLocaleString('th', options));
// console.log(date.toISOString());
// console.log(date.toLocaleString('th', options));

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

const ContentBooking = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');

    useEffect(() => {

        const fetchData = async () => {
            originData.length = 0;
            await axios.get(API_URL + 'api/getbooking').then((response) => {
                response.data.map((item) => {
                    originData.push({
                        key: item.id.toString(),
                        uName: item.uName,
                        EmpoyeeNo: item.EmpoyeeNo,
                        uPhone: item.uPhone,
                        uSect: item.uSect,
                        uPart: item.uPart,
                        startDateTime: new Date(Date.UTC(
                            new Date(item.startDateTime).getUTCFullYear(),
                            new Date(item.startDateTime).getUTCMonth(),
                            new Date(item.startDateTime).getUTCDate(),
                            new Date(item.startDateTime).getUTCHours() - 7,
                            new Date(item.startDateTime).getUTCMinutes(),
                            new Date(item.startDateTime).getUTCSeconds())).toLocaleString('th', options),

                            endDateTime: new Date(Date.UTC(
                            new Date(item.endDateTime).getUTCFullYear(),
                            new Date(item.endDateTime).getUTCMonth(),
                            new Date(item.endDateTime).getUTCDate(),
                            new Date(item.endDateTime).getUTCHours() - 7,
                            new Date(item.endDateTime).getUTCMinutes(),
                            new Date(item.endDateTime).getUTCSeconds())).toLocaleString('th', options),
                            cLicense: item.cLicense,
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
            title: '#',
            dataIndex: 'key',
            width: '5%',
            editable: true,
        },
        {
            title: 'ชือ-สกุลผู้จอง',
            dataIndex: 'uName',
            width: '15%',
            editable: true,
        },
        {
            title: 'รหัสพนักงาน',
            dataIndex: 'EmpoyeeNo',
            width: '10%',
            editable: true,
        },
        {
            title: 'เบอร์โทรศัพท์',
            dataIndex: 'uPhone',
            width: '10%',
            editable: true,
        },
        {
            title: 'หน่วยงาน',
            dataIndex: 'uSect',
            width: '10%',
            editable: true,
        },
        {
            title: 'แผนก',
            dataIndex: 'uPart',
            width: '10%',
            editable: true,
        },
        {
            title: 'วันที่ใช้รถ',
            dataIndex: 'startDateTime',
            width: '10%',
            editable: true,
        },
        {
            title: 'วันที่คืนรถ',
            dataIndex: 'endDateTime',
            width: '10%',
            editable: true,
        },
        {
            title: 'ทะเบียนรถ',
            dataIndex: 'cLicense',
            width: '10%',
            editable: true,
        },
        {
            title: 'จำยวนวัน',
            dataIndex: 'day',
            width: '10%',
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
    );
};
export default ContentBooking;
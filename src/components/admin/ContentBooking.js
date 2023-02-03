import React, { useState, useEffect } from 'react';
import {
    Layout,
    Form,
    Input,
    InputNumber,
    Table,
    DatePicker,
    Button,
} from 'antd';

import axios from 'axios';
import Swal from 'sweetalert2';
import { API_URL } from '../../Constant';
import authCheck from '../../service/Auth';
const { RangePicker } = DatePicker;

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

const { Content } = Layout;

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
    useEffect(() => {
        authCheck();
    }, []);

    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        originData.length = 0;
        await axios.get(API_URL + 'api/getbooking').then((response) => {
            response.data.map((item, index) => {
                originData.push({
                    key: index + 1,
                    id: item.id,
                    province: item.province,
                    uName: item.uName,
                    empoyeeNo: item.empoyeeNo,
                    uEmail: item.uEmail,
                    uPhone: item.uPhone,
                    uSect: item.uSect,
                    uPart: item.uPart,
                    note: item.note,
                    startDateTime: new Date(item.startDateTime).toLocaleString('th', options),
                    endDateTime: new Date(item.endDateTime).toLocaleString('th', options),
                    bookingDate: new Date(item.bookingDate).toLocaleString('th', options),
                    cLicense: item.cLicense,
                    cName: item.cName,
                    day: item.day + ' วัน',
                    status: item.status,
                });
            });
        });
        setData(originData);
        setLoading(false);
        console.log(originData);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const approveCar = (record) => {
        console.log(record);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(API_URL + 'api/updatebookingapprove', { id: record.id, status: record.status === 1 ? 0 : 1 }
                ).then((response) => {
                    console.log(response.data);
                });
                Swal.fire(
                    'Updated!',
                    'Your file has been updated.',
                    'success'
                ).then((result) => {
                    if (result.isConfirmed) {
                        if (startDate === '' || endDate === '') {
                            fetchData();
                        } else {
                            searchDate();
                        }
                    }
                });
            }
        })
    };

    const searchDate = () => {
        console.log(startDate)
        console.log(endDate)
        if (startDate === '' || endDate === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'กรุณาเลือกวันที่',
            })
        } else {
            axios.post(API_URL + 'api/searchbookingbydaterange', { startDate: startDate + " 00:00:00", endDate: endDate + " 23:59:59" }
            ).then((response) => {
                console.log(response.data);
                originData.length = 0;
                const new_data = [];
                response.data.map((item, index) => {
                    new_data.push({
                        key: index + 1,
                        id: item.id,
                        province: item.province,
                        uName: item.uName,
                        empoyeeNo: item.empoyeeNo,
                        uEmail: item.uEmail,
                        uPhone: item.uPhone,
                        uSect: item.uSect,
                        uPart: item.uPart,
                        note: item.note,
                        startDateTime: new Date(item.startDateTime).toLocaleString('th', options),
                        endDateTime: new Date(item.endDateTime).toLocaleString('th', options),
                        bookingDate: new Date(item.bookingDate).toLocaleString('th', options),
                        cLicense: item.cLicense,
                        cName: item.cName,
                        day: item.day + ' วัน',
                        status: item.status,
                    });
                });
                setData(new_data);
                console.log(new_data.length);
            });
        }
    };

    const handleChangeDate = (date, dateString) => {
        setStartDate(dateString[0]);
        setEndDate(dateString[1]);
    };

    const isEditing = (record) => record.key === editingKey;

    const cancel = () => {
        setEditingKey('');
    };

    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            editable: true,
        },
        {
            title: 'จังหวัดที่เดินทางไป',
            dataIndex: 'province',
            editable: true,
        },
        {
            title: 'ชือ-สกุลผู้จอง',
            dataIndex: 'uName',
            // width: '10%',
            editable: true,
        },
        // {
        //     title: 'รหัสพนักงาน',
        //     dataIndex: 'EmpoyeeNo',
        //     editable: true,
        // },
        {
            title: 'อีเมล์',
            dataIndex: 'uEmail',
            editable: true,
        },
        {
            title: 'เบอร์โทรศัพท์',
            dataIndex: 'uPhone',
            editable: true,
        },
        // {
        //     title: 'หน่วยงาน',
        //     dataIndex: 'uSect',
        //     editable: true,
        // },
        // {
        //     title: 'แผนก',
        //     dataIndex: 'uPart',
        //     editable: true,
        // },
        {
            title: 'วันที่ใช้รถ',
            dataIndex: 'startDateTime',
            editable: true,
        },
        {
            title: 'วันที่คืนรถ',
            dataIndex: 'endDateTime',
            editable: true,
        },
        {
            title: 'วันที่จอง',
            dataIndex: 'bookingDate',
            editable: true,
        },
        {
            title: 'ทะเบียนรถ',
            dataIndex: 'cLicense',
            editable: true,
        },
        {
            title: 'ชื่อรถ',
            dataIndex: 'cName',
            editable: true,
        },
        {
            title: 'จำนวนวัน',
            dataIndex: 'day',
            editable: true,
        },
        {
            title: 'สถานะ',
            dataIndex: 'status',
            width: '120px',
            align: 'center',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>

                    </span>
                ) : (
                    <button
                        className={record.status === 1 ? 'btn btn-success' : 'btn btn-warning'}
                        onClick={() => approveCar(record)}
                    >
                        {record.status === 1 ? 'ยืนยัน' : 'รอยืนยัน'}
                    </button>
                );
            },
        },
    ];
    const mergedColumns = columns.map((col) => {

        if (!col.editable) {
            return col;
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
                            <div className='row' style={{ paddingBottom: "10px" }}>
                                <RangePicker onChange={handleChangeDate} />
                                <Button onClick={searchDate} >
                                    ค้นหา
                                </Button>
                            </div>
                            <Table
                                loading={loading}
                                components={{
                                    body: {
                                        cell: EditableCell,
                                    },
                                }}
                                bordered
                                dataSource={data.length === 0 ? null : data}
                                columns={mergedColumns}
                                rowClassName="editable-row"
                                pagination={{
                                    onChange: cancel,
                                }}
                                scroll={{ x: 1500 }}
                            />
                        </Form>

                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};
export default ContentBooking;
import React, { useState, useEffect } from 'react';
import {
    Layout,
    Form,
    Input,
    InputNumber,
    Table,
    DatePicker,
    Button,
    Image,
    Select,
    Typography,
} from 'antd';

import axios from 'axios';
import Swal from 'sweetalert2';
import { CSVLink } from "react-csv";
import { FaRegStopCircle } from 'react-icons/fa';
import { DeleteOutlined } from '@ant-design/icons';

import { API_URL } from '../../Constant';
import NO_Img from '../../img/no_img.jpg';
import authCheck from '../../service/Auth';
const { RangePicker } = DatePicker;
const { Option } = Select;

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
const emails = [];

const ContentBooking = () => {
    useEffect(() => {
        authCheck();
    }, []);

    const headers = [
        { label: "จังหวัดที่เดินทางไป", key: "province" },
        { label: "Cost Center", key: "uSectNo" },
        { label: "ชือ-สกุลผู้จอง", key: "uName" },
        { label: "รหัสพนักงาน", key: "empoyeeNo" },
        { label: "อีเมล์", key: "uEmail" },
        { label: "เบอร์โทรศัพท์	", key: "uPhone" },
        { label: "โน๊ต	", key: "note" },
        { label: "วันที่ใช้รถ", key: "startDateTime" },
        { label: "วันที่คืนรถ", key: "endDateTime" },
        { label: "วันที่จอง", key: "bookingDate" },
        { label: "ทะเบียนรถ", key: "cLicense" },
        { label: "ชื่อรถ", key: "cName" },
        { label: "จำนวนวัน", key: "day" },
        { label: "รูปขออนุมัติ", key: "image" },
        { label: "สถานะ", key: "status" },
        { label: "การเปิดใช้งาน", key: "status" },
        { label: "ไมล์เริ่มต้น", key: "startMile" },
        { label: "ไมล์สิ้นสุด", key: "endMile" },
        { label: "ระยะทาง", key: "distance" },
    ];

    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [email, setEmail] = useState('');


    const [loading, setLoading] = useState(true);

    const getuEmail = async () => {
        emails.length = 0;
        await axios.get(API_URL + 'api/getuser').then((response) => {
            console.log(response.data);
            response.data.map((item, index) => {
                emails.push(item.email);
                console.log(item.email);
            });
        });
    }

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
                    uSectNo: item.uSectNo,
                    uPart: item.uPart,
                    note: item.note,
                    //startDateTime: new Date(item.startDateTime).toLocaleString('th', options),
                    //endDateTime: new Date(item.endDateTime).toLocaleString('th', options),
                    //bookingDate: new Date(item.bookingDate).toLocaleString('th', options),
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
                    bookingDate: new Date(Date.UTC(
                        new Date(item.bookingDate).getUTCFullYear(),
                        new Date(item.bookingDate).getUTCMonth(),
                        new Date(item.bookingDate).getUTCDate(),
                        new Date(item.bookingDate).getUTCHours() - 7,
                        new Date(item.bookingDate).getUTCMinutes(),
                        new Date(item.bookingDate).getUTCSeconds())).toLocaleString('th', options),
                    cLicense: item.cLicense,
                    cName: item.cName,
                    day: item.day + ' วัน',
                    image: item.image,
                    status: item.status,
                    startMile: item.startMile, // ไมล์เริ่มต้น
                    endMile: item.endMile,  // ไมล์สิ้นสุด
                    distance: item.distance, // ระยะทาง
                });
            });
        });
        setData(originData);
        setLoading(false);
        console.log(originData);
    }

    useEffect(() => {
        fetchData();
        getuEmail();
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
                axios.post(API_URL + 'api/updatebookingstatus', {
                    id: record.id,
                    status: 1,
                }).then((response) => {
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
                        uSectNo: item.uSectNo,
                        uPart: item.uPart,
                        note: item.note,
                        //startDateTime: new Date(item.startDateTime).toLocaleString('th', options),
                        //endDateTime: new Date(item.endDateTime).toLocaleString('th', options),
                        //bookingDate: new Date(item.bookingDate).toLocaleString('th', options),
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
                        bookingDate: new Date(Date.UTC(
                            new Date(item.bookingDate).getUTCFullYear(),
                            new Date(item.bookingDate).getUTCMonth(),
                            new Date(item.bookingDate).getUTCDate(),
                            new Date(item.bookingDate).getUTCHours() - 7,
                            new Date(item.bookingDate).getUTCMinutes(),
                            new Date(item.bookingDate).getUTCSeconds())).toLocaleString('th', options),
                        cLicense: item.cLicense,
                        cName: item.cName,
                        day: item.day + ' วัน',
                        image: item.image,
                        status: item.status,
                        startMile: item.startMile, // ไมล์เริ่มต้น
                        endMile: item.endMile,  // ไมล์สิ้นสุด
                        distance: item.distance, // ระยะทาง
                    });
                });
                setData(new_data);
                console.log(new_data.length);
            });
        }
    };

    const searchEmail = (value) => {
        console.log("aasd" + value);
        if (value === '') {
            fetchData();
        } else {
            axios.post(API_URL + 'api/searchbookingbyemail', { uEmail: value }
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
                        uSectNo: item.uSectNo,
                        uPart: item.uPart,
                        note: item.note,
                        //startDateTime: new Date(item.startDateTime).toLocaleString('th', options),
                        //endDateTime: new Date(item.endDateTime).toLocaleString('th', options),
                        //bookingDate: new Date(item.bookingDate).toLocaleString('th', options),
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
                        bookingDate: new Date(Date.UTC(
                            new Date(item.bookingDate).getUTCFullYear(),
                            new Date(item.bookingDate).getUTCMonth(),
                            new Date(item.bookingDate).getUTCDate(),
                            new Date(item.bookingDate).getUTCHours() - 7,
                            new Date(item.bookingDate).getUTCMinutes(),
                            new Date(item.bookingDate).getUTCSeconds())).toLocaleString('th', options),
                        cLicense: item.cLicense,
                        cName: item.cName,
                        day: item.day + ' วัน',
                        image: item.image,
                        status: item.status,
                        startMile: item.startMile, // ไมล์เริ่มต้น
                        endMile: item.endMile,  // ไมล์สิ้นสุด
                        distance: item.distance, // ระยะทาง
                    });
                });
                setData(new_data);
                console.log(new_data.length);
                //fetchData();
            });
        }
    };
    const updateStatus = (id) => {
        console.log(id);
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
                axios.post(API_URL + 'api/updatebookingstatus', {
                    id: id,
                    status: 3,
                }).then((response) => {
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

    const deleteBooking = (record) => {
        console.log(record);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(API_URL + 'api/deletebooking/' + record.id).then((response) => {
                    console.log(response.data);
                    axios.delete(API_URL + 'api/delete-files-url', { data: { url: record.image } }
                    ).then((response) => {
                        console.log(response.data);
                    });
                });
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                ).then((result) => {
                    if (result.isConfirmed) {
                        fetchData();
                    }
                });
            }
        })
    };

    const handleChangeDate = (date, dateString) => {
        setStartDate(dateString[0]);
        setEndDate(dateString[1]);
    };

    const handleChangeEmail = async (value) => {
        await setEmail(value);
        await searchEmail(value);
        console.log(value);
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
            title: 'Cost Center',
            dataIndex: 'uSectNo',
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
        {
            title: 'รหัสพนักงาน',
            dataIndex: 'empoyeeNo',
            editable: true,
        },
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
            title: 'โน๊ต',
            dataIndex: 'note',
            editable: true,
        },
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
            title: 'รูปขออนุมัติ',
            dataIndex: 'image',
            align: 'center',
            render: (image) => <Image

                width={75}
                height={75}
                src={image !== null ? image : NO_Img}
            />,
            width: '8%',
            editable: true,
        },

        {
            title: 'สถานะ',
            dataIndex: 'status',
            width: '130px',
            align: 'center',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>

                    </span>
                ) : (
                    <div>
                        {record.status === "0" ? 'รอยืนยัน' :
                            record.status === "1" ? <div className='text-blue-700 font-bold'>ยืนยันแล้ว</div> :
                                record.status === "2" ? <div className='flex items-center'>เปิดใช้งาน<FaRegStopCircle className='ml-2 text-red-700' size={20} onClick={() => { updateStatus(record.id) }} /></div> :
                                    record.status === "3" ? <div className='text-green-700 font-bold'>เสร็จสิ้น</div> : <div className='text-red-700 font-bold'>ยกเลิก</div>}
                    </div>
                );
            },
        },
        {
            title: 'ไมล์เริ่มต้น',
            dataIndex: 'startMile',
            editable: true,
        },
        {
            title: 'ไมล์สิ้นสุด',
            dataIndex: 'endMile',
            editable: true,
        },
        {
            title: 'ระยะทาง',
            dataIndex: 'distance',
            editable: true,
        },
        {
            title: 'ดำเนินการ',
            dataIndex: 'operation',
            width: '4%',
            align: 'center',
            fixed: 'right',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>

                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => deleteBooking(record)}>
                        <DeleteOutlined />
                    </Typography.Link>
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
                            <div className='row ml-2 pb-3 space-x-2 items-center w-full' >
                                <h2 className='text-base'>ค้นหาจาก :</h2>
                                <Select
                                    className='w-40'
                                    showSearch
                                    onChange={handleChangeEmail}
                                    placeholder="email"
                                >
                                    {emails.map((email, index) => {
                                        return (
                                            <Option key={index} value={email} >{email}</Option>
                                        )
                                    })}
                                </Select>
                                <RangePicker onChange={handleChangeDate} />
                                <Button onClick={searchDate} >
                                    ค้นหา
                                </Button>
                                <CSVLink data={originData} headers={headers}>
                                    <Button>
                                        Export
                                    </Button>
                                </CSVLink>
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
                                scroll={{ x: 2500 }}
                            />
                        </Form>

                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};
export default ContentBooking;
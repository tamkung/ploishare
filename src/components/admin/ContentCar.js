import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Layout,
    Form,
    Input,
    InputNumber,
    Popconfirm,
    Table,
    Typography,
    Image,
} from 'antd';

import axios from 'axios';
import Swal from 'sweetalert2';

import { API_URL } from '../../Constant';
import NO_Img from '../../img/no_img.jpg';

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

function ContentCar() {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');

    useEffect(() => {

        const fetchData = async () => {
            originData.length = 0;
            await axios.get(API_URL + 'api/getcar').then((response) => {
                // eslint-disable-next-line array-callback-return
                response.data.map((item, index) => {
                    originData.push({
                        key: index + 1,
                        license: item.license,
                        province: item.province,
                        brand: item.brand,
                        model: item.model,
                        color: item.color,
                        seat: item.seat,
                        detail: item.detail,
                        image: item.image,
                        status: item.status,
                    });
                });
            });
            setData(originData);
        }
        fetchData();
    }, []);

    const deleteCar = (record) => {
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
                axios.post(API_URL + 'api/deletecar/' + record.license).then((response) => {
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
                        window.location.reload();
                    }
                });
            }
        })
    };

    const updateCarStatus = (record) => {
        console.log(record);
        // Swal.fire({
        //     title: 'Are you sure?',
        //     text: "You won't be able to revert this!",
        //     icon: 'warning',
        //     showCancelButton: true,
        //     confirmButtonColor: '#3085d6',
        //     cancelButtonColor: '#d33',
        //     confirmButtonText: 'Yes, update it!'
        // }).then((result) => {
        //     if (result.isConfirmed) {
        //         axios.post(API_URL + 'api/updatecar/' + license).then((response) => {
        //             console.log(response.data);
        //         });
        //         Swal.fire(
        //             'Updated!',
        //             'Your file has been updated.',
        //             'success'
        //         ).then((result) => {
        //             if (result.isConfirmed) {
        //                 window.location.reload();
        //             }
        //         });
        //     }
        // })
    };

    const isEditing = (record) => record.key === editingKey;

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
            width: '3%',
            editable: true,
        },
        {
            title: 'ป้ายทะเบียน',
            dataIndex: 'license',
            width: '8%',
            editable: true,
        },
        {
            title: 'จังหวัด',
            dataIndex: 'province',
            width: '10%',
            editable: true,
        },
        {
            title: 'ยี่ห้อ',
            dataIndex: 'brand',
            width: '8%',
            editable: true,
        },
        {
            title: 'รุ่น',
            dataIndex: 'model',
            width: '8%',
            editable: true,
        },
        {
            title: 'สี',
            dataIndex: 'color',
            width: '7%',
            editable: true,
        },
        {
            title: 'จำนวนที่นั่ง',
            dataIndex: 'seat',
            width: '7%',
            editable: true,
        },
        {
            title: 'รายละเอียด',
            dataIndex: 'detail',
            width: '20%',
            editable: true,
        },
        {
            title: 'รูปภาพ',
            dataIndex: 'image',
            render: (image) => <Image
                width={75}
                height={75}
                src={image !== null ? image : NO_Img}
            />,
            width: '10%',
            editable: true,
        },
        {
            title: 'สถานะ',
            dataIndex: 'status',
            render: (status) => <button
                className={status === 1 ? 'btn btn-success' : 'btn btn-danger'}
                onClick={updateCarStatus(status)}
            >
                {status === 1 ? 'ปกติ' : 'พักงาน'}
            </button>,
            width: '8%',
           // editable: true,
        },
        {
            title: 'ดำเนินการ',
            dataIndex: 'operation',
            width: '7%',
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
                    <Typography.Link disabled={editingKey !== ''} onClick={() => deleteCar(record)}>
                        Delete
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
                        <div style={{ textAlign: "right" }}>
                            <Link to={'/addcar'}><button className='btn-add'> + Add</button></Link>
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
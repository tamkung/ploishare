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
import { DeleteOutlined } from '@ant-design/icons';
import { CSVLink } from "react-csv";


import axios from 'axios';
import Swal from 'sweetalert2';
import authCheck from '../../service/Auth';
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
    useEffect(() => {
        authCheck();
    }, []);

    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');

    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        originData.length = 0;
        await axios.get(API_URL + 'api/get-files').then((response) => {
            response.data.map((item, index) => {
                originData.push({
                    key: index + 1,
                    name: item.name,
                    url: item.url,
                });
            });
        });
        setData(originData);
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const deleteImage = (record) => {
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
                axios.delete(API_URL + 'api/delete-file/' + record.name
                ).then((response) => {
                    console.log(response.data);
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    ).then((result) => {
                        if (result.isConfirmed) {
                            fetchData();
                        }
                    });
                });
            }
        })
    };

    const isEditing = (record) => record.key === editingKey;

    const cancel = () => {
        setEditingKey('');
    };


    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            width: '3%',
            editable: true,
        },
        {
            title: 'ชื่อ',
            dataIndex: 'name',
            width: '8%',
            editable: true,
        },
        {
            title: 'URL',
            dataIndex: 'url',
            width: '10%',
            render: (url) => <a href={url} target='_blank' >{url}</a>,
            editable: true,
        },
        {
            title: 'รูปภาพ',
            dataIndex: 'url',
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
            title: 'ดำเนินการ',
            dataIndex: 'operation',
            width: '7%',
            align: 'center',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => deleteImage(record)}>
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
    )
}
export default ContentCar;
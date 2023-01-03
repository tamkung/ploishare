import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Space } from 'antd';
import * as IoIcons from 'react-icons/io5';
import { Link } from "react-router-dom";
function Vertify() {
  return (
    <div>
      <div className='form'>
        <h1>ยืนยันตัวตน</h1>
        <div className='box'>
          <Form>
            <Form.Item
              label="Email"
              name="Email"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="confirm-password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input />
            </Form.Item>

            <button type="button" class="btn btn-outline-primary buttonNext">ยืนยันตัวตน</button>
          </Form>
        </div>
        <button><IoIcons.IoChevronBackCircleOutline /></button>
      </div>
    </div>
  )
}

export default Vertify


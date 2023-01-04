import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Space } from 'antd';
import * as BsIcons from 'react-icons/bs';
import { Link } from "react-router-dom";
function Vertify() {
  return (
    <div>
      <div>
        <h1 className='textHeader'>ยืนยันตัวตน</h1>
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
          <button className='backButton' onClick={() => { window.location = "/" }}> <BsIcons.BsArrowLeftShort /> ย้อนกลับ </button>
        </div>

      </div>
    </div>
  )
}

export default Vertify


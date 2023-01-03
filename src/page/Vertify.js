import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Space } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';

function Vertify() {
  return (
    <div>
      <div>
        <h1>ยืนยันตัวตน</h1>
        <div className='box'>
          <Form>
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>
            <button type="button" class="btn btn-outline-primary buttonNext">Vertify</button>

          </Form>
        </div>
      </div>
    </div>
  )
}

export default Vertify


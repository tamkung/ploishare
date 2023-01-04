import React from 'react';
import { FloatButton } from 'antd';
import { MenuOutlined, CommentOutlined, LogoutOutlined } from '@ant-design/icons';
const logout = () => {
  // Clear the user's session
  localStorage.removeItem('token');
  localStorage.removeItem('email');
  sessionStorage.clear();

  // Redirect the user to the login page
  window.location.replace('/');
};

const MenuButton = () => (
  <FloatButton.Group icon={<MenuOutlined />} type="primary" trigger="click">
    <FloatButton />
    <FloatButton icon={<CommentOutlined />} />
    <FloatButton icon={<LogoutOutlined />} onClick={(logout)}/>
  </FloatButton.Group>
);
export default MenuButton;
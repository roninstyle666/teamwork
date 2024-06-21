import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined,MobileOutlined } from '@ant-design/icons';
import './index.css';
import axios from 'axios';


const RegisterPage: React.FC = () => {
  const out = async (values: any) => {
    try {
      const res = await axios.post('http://localhost:8085/user/register', JSON.stringify(values));
      console.log(res);
      if (res.data[0] != undefined) {
        if (res.data[0].code ==='200') {
         console.log(res.data[0].data.userInfoVo);//打印返回信息
          window.location.href = '/Login';
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
 }

  return (
    <div className="register-container">
      <div className="register-content">
        <h1>注册新账号</h1>
        <Form
          name="register"
          initialValues={{ remember: true }}
          onFinish={out}
        >
          <Form.Item
            name="nickName"
            rules={[{ required: true, message: '请输入昵称!' }]}
          >
            <Input placeholder="昵称" />
          </Form.Item>
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[{ required: true, message: '请输入手机号!' }]}
          >
            <Input prefix={<MobileOutlined />} placeholder="手机号" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="密码" />
          </Form.Item>
          <Form.Item
            name="passwordConfirm"
            rules={[
              {
                required: true,
                message: '请确认密码!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两个密码不相同!'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="确认密码" />
          </Form.Item>
          <a className="login-form-forgot" href="/Login">
              登陆
            </a>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="register-form-button">
              注册
            </Button>
          </Form.Item>
        </Form>
      </div>
      <footer className="register-footer">
        <p>© 2024 数字马力</p>
      </footer>
    </div>
  );
};

export default RegisterPage;

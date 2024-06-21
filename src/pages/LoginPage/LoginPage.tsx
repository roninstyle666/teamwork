import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useState } from 'react';
import './index.css';
import axios from 'axios';
import { withSuccess } from 'antd/es/modal/confirm';
import { redirect, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {settoken,setuser } from '../../store/user';


const LoginPage: React.FC = () => {
  const dispatch =useDispatch();
  const navigate = useNavigate();
 const out = async (values: any) => {
   try {
    //传给后端参数
     const res = await axios.post('https://d29ca72fcb1a04bf75c7cae4a1e8354f.pty.oscollege.net/user/login',values);
     //处理后端返回的json
     console.log(res);
       if (res.data.code ===200) {
        console.log(res.data.data.userInfoVo);//打印返回信息
        await dispatch(settoken(res.data.data.token))
        const user=res.data.data.userInfoVo
        await dispatch(setuser(user))
        localStorage.setItem('role', user.role);

        window.location.href = '/Manage';
       }
     else { alert('用户名或密码错误')
      console.log(res.data.msg);
      }
     }
    catch (error) {
     console.error('Error:', error);
   }
}

  return (
    <div className="login-container">
      <div className="login-content">
        <h1>数字马力</h1>
        <p>数字马力智能运营大脑</p>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={out}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input prefix={<UserOutlined />}  placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password prefix={<LockOutlined />}  placeholder="密码" />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className='login-form-remember' value={true}  >自动登录</Checkbox>
            </Form.Item>
            <a className="login-form-forgot" href="/Register">
              注册
            </a>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
      <footer className="login-footer">
        <p>© 2024 数字马力</p>
      </footer>
    </div>
  );
};

export default LoginPage

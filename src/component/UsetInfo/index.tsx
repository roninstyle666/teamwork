import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, message, theme } from 'antd';
import axios from 'axios';
import './index.css';
import { Content } from 'antd/es/layout/layout';

const { Option } = Select;

const UserInfo: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(true);

  const handleSubmit = () => {
   console.log(form.getFieldsValue());
    
  }

  const {token: { colorBgContainer, borderRadiusLG },} = theme.useToken();
  return (
    <Content
        style={{
          margin: '12px 16px',
          padding: 24,
          minHeight: 150,
          
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
   
      <Form
        form={form}
        name="user-info"
        layout="vertical"
      >
        <h2>用户信息</h2>
        <Form.Item
          label="姓名"
          name="name"
          rules={[{ required: true, message: '请输入姓名' }]}
        >
          <Input disabled={loading} />
        </Form.Item>
        <Form.Item
          label="邮箱"
          name="email"
          rules={[
            { required: true, message: '请输入邮箱' },
            { type: 'email', message: '请输入有效的邮箱地址' }
          ]}
        >
          <Input disabled={loading} />
        </Form.Item>
        <Form.Item
          label="性别"
          name="gender"
          rules={[{ required: true, message: '请选择性别' }]}
        >
          <Select placeholder="请选择性别" disabled={loading}>
            <Option value="male">男</Option>
            <Option value="female">女</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="地址"
          name="address"
          rules={[{ required: true, message: '请输入地址' }]}
        >
          <Input disabled={loading} />
        </Form.Item>
        <Form.Item
          label="手机号码"
          name="phone"
          rules={[
            { required: true, message: '请输入手机号码' },
            { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号码' }
          ]}
        >
          <Input disabled={loading} />
        </Form.Item>
        <Form.Item
          label="身份"
          name="role"
          rules={[{ required: true, message: '请选择身份' }]}
        >
          <Select placeholder="请选择身份" disabled={loading}>
            <Option value="admin">管理员</Option>
            <Option value="operator">运营小二</Option>
          </Select>
        </Form.Item>
        <Button  type='primary' htmlType='submit' onClick={handleSubmit} >
        提交
      </Button>
      </Form>
      
    
    </Content>
  );
};

export default UserInfo;

// src/Pages/ProductDetailsPage/index.tsx
import React, { useState } from 'react';
import { Tabs, Button, Modal, Table, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import './index.css';  // 引入样式文件
import { Content } from 'antd/es/layout/layout';

const { TabPane } = Tabs;

const ProductDetail: React.FC = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [activeTab, setActiveTab] = useState<string>('1');

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const showModal = (title: string, content: string) => {
    setModalTitle(title);
    setModalContent(content);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleEdit = () => {
    // 跳转到编辑页面
    navigate('/edit-product');
  };

  const handleAction = (action: string) => {
    // 处理操作按钮的逻辑
    if (action === 'edit') {
      handleEdit();
    } else {
      showModal(action, `请确认是否${action}`);
    }
  };

  // 操作记录列表的列定义
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '操作时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: '操作人',
      dataIndex: 'operator',
      key: 'operator',
    },
  ];

  // 操作记录列表的数据
  const data = [
    {
      key: '1',
      id: '565288822332',
      status: '下线',
      time: '2022-05-02 23:36',
      remark: '库存不足',
      operator: '114515',
    },
    // 其他数据
  ];
  const {token: { colorBgContainer, borderRadiusLG },} = theme.useToken();
  return (
    <Content  style={{
      margin: '12px 16px',
      padding: 24,
      minHeight: 150,
      background: colorBgContainer,
      borderRadius: borderRadiusLG,
    }}>
    <div className="product-details-container">
      <div className="product-details-header">
        <img src="https://via.placeholder.com/150" alt="商品头图" className="product-image" />
        <div className="product-info">
          <h2>爱奇艺会员1</h2>
          <p>管理员: 114515</p>
          <p>创建人: 114515</p>
          <p>权益id: 202304241111658704</p>
          <p>状态: 下线</p>
        </div>
        <div className="product-actions">
          <Button type="primary" onClick={() => handleAction('edit')}>编辑</Button>
          <Button onClick={() => handleAction('发起审核')}>发起审核</Button>
          <Button onClick={() => handleAction('审批通过')}>审批通过</Button>
          <Button onClick={() => handleAction('审批驳回')}>审批驳回</Button>
          <Button onClick={() => handleAction('上线')}>上线</Button>
          <Button onClick={() => handleAction('下线')}>下线</Button>
        </div>
      </div>
      <Tabs defaultActiveKey="1" onChange={handleTabChange}>
        <TabPane tab="基本信息" key="1">
          <div className="product-basic-info">
            <p>商品名称: 爱奇艺会员1</p>
            <p>权益类型: 虚拟</p>
            <p>模版信息: 文学模版</p>
            <p>发放方式: 个人发放</p>
            <p>服务商信息: 服务商信息</p>
            <p>兑换限制: 1件</p>
            <p>创建时间: 2022-05-18 23:37</p>
            <p>修改时间: 2022-05-18 23:37</p>
            <p>展示时间: 2022-05-02 23:36 - 2022-05-03 23:36</p>
          </div>
        </TabPane>
        <TabPane tab="商品预览" key="2">
          <div className="product-preview">
            <img src="https://via.placeholder.com/600" alt="商品预览" />
          </div>
        </TabPane>
      </Tabs>
      <div className="action-records">
        <h3>操作记录列表</h3>
        <Table columns={columns} dataSource={data} />
      </div>
      <Modal title={modalTitle} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>{modalContent}</p>
      </Modal>
    </div></Content>
  );
};

export default ProductDetail;
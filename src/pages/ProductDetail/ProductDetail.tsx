import React, { useState, useEffect } from 'react';
import { Tabs, Button, Modal, Table, Select, InputNumber, Card, Typography, Descriptions, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import './index.css';  // 引入样式文件

const { TabPane } = Tabs;
const { Option } = Select;
const { Title, Text } = Typography;

const ProductDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [activeTab, setActiveTab] = useState<string>('1');
  const [membershipLevel, setMembershipLevel] = useState<string>('普通会员');
  const [points, setPoints] = useState<number>(0);
  const [productDetails, setProductDetails] = useState<any>(null);
  const [operationRecords, setOperationRecords] = useState<any[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [userRole, setUserRole] = useState<string | null>('0'); // 设置为商家角色
  const [loading, setLoading] = useState<boolean>(true); // 添加加载状态

  useEffect(() => {
    // 使用假数据进行测试
    const fakeProductDetails = {
      image: 'https://via.placeholder.com/150',
      productName: '测试商品',
      proxyUserName: '管理员',
      createUserName: '创建人',
      id: '123456',
      status: 0,
      store: 100,
      onlineTime: '2023-01-01',
      offlineTime: '2023-12-31',
      price: 100,
      points: 10,
      description: '这是一个测试商品的描述。',
      className: '分类1',
      typeName: '类型1',
      launchCity: '城市1',
      nonDeliveryCity: '城市2',
      number: 50,
      vendorName: '供应商1',
      serviceGuarantee: '服务保障信息',
      vendorPhone: '1234567890',
      sales: 200,
      approved: false, // 假设这是商品是否审批通过的字段
    };

    const fakeOperationRecords = [
      {
        id: '1',
        operatorStatus: '已完成',
        updateTime: '2023-01-01 10:00:00',
        description: '操作记录1',
        operatorUserId: '操作人1',
      },
      {
        id: '2',
        operatorStatus: '处理中',
        updateTime: '2023-01-02 11:00:00',
        description: '操作记录2',
        operatorUserId: '操作人2',
      },
    ];

    setProductDetails(fakeProductDetails);
    setOperationRecords(fakeOperationRecords);
    setTotalRecords(fakeOperationRecords.length);
    setLoading(false);
  }, []);

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
    navigate('/Manage/ProductCreate');
  };

  const handleAction = (action: string) => {
    showModal(action, `请确认是否${action}`);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '状态',
      dataIndex: 'operatorStatus',
      key: 'operatorStatus',
    },
    {
      title: '操作时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
    },
    {
      title: '备注',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '操作人',
      dataIndex: 'operatorUserId',
      key: 'operatorUserId',
    },
  ];

  const renderActionButtons = () => {
    const isEditable = productDetails?.status === 0;
    const isUnderReview = productDetails?.status === 2;

    if (userRole === '1') { // 商家
      return (
        <>
          {isEditable && (
            <Button type="primary" onClick={handleEdit}>编辑</Button>
          )}
          {!isUnderReview && (
            <Button onClick={() => handleAction('发起审核')}>发起审核</Button>
          )}
          {productDetails?.status !== 0 && (
            <Button onClick={() => handleAction('下线')}>下线</Button>
          )}
          {productDetails?.status === 0 && (
            <Button onClick={() => handleAction('上线')} disabled={!productDetails?.approved}>上线</Button>
          )}
        </>
      );
    } else if (userRole === '0') { // 管理员
      return (
        <>
          {isUnderReview && (
            <>
              <Button onClick={() => handleAction('审批通过')}>审批通过</Button>
              <Button onClick={() => handleAction('审批驳回')}>审批驳回</Button>
            </>
          )}
          {productDetails?.status !== 0 && (
            <Button onClick={() => handleAction('下线')}>下线</Button>
          )}
          {productDetails?.status === 0 && (
            <Button onClick={() => handleAction('上线')} disabled={!productDetails?.approved}>上线</Button>
          )}
        </>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="product-details-container">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="product-details-container">
      <div className="product-details-header">
        <img src={productDetails?.image} alt="商品头图" className="product-image" />
        <div className="product-info">
          <Descriptions>
            <Descriptions.Item label="商品名称">{productDetails?.productName || '商品名称'}</Descriptions.Item>
            <Descriptions.Item label="管理员">{productDetails?.proxyUserName || '管理员'}</Descriptions.Item>
            <Descriptions.Item label="创建人">{productDetails?.createUserName || '创建人'}</Descriptions.Item>
            <Descriptions.Item label="权益ID">{productDetails?.id || '权益id'}</Descriptions.Item>
            <Descriptions.Item label="状态">{productDetails?.status === 0 ? '下线' : '上线'}</Descriptions.Item>
          </Descriptions>
        </div>
        <div className="product-actions">
          {renderActionButtons()}
        </div>
      </div>
      <Tabs defaultActiveKey="1" onChange={handleTabChange}>
        <TabPane tab="基本信息" key="1">
          <div className="product-basic-info">
            <Descriptions title="商品信息">
              <Descriptions.Item label="商品名称">{productDetails?.productName}</Descriptions.Item>
              <Descriptions.Item label="商品库存">{productDetails?.store}</Descriptions.Item>
              <Descriptions.Item label="上线时间">{productDetails?.onlineTime}</Descriptions.Item>
              <Descriptions.Item label="下线时间">{productDetails?.offlineTime}</Descriptions.Item>
              <Descriptions.Item label="商品状态">{productDetails?.status === 0 ? '下线' : '上线'}</Descriptions.Item>
              <Descriptions.Item label="创建人">{productDetails?.createUserName}</Descriptions.Item>
              <Descriptions.Item label="代理人">{productDetails?.proxyUserName}</Descriptions.Item>
              <Descriptions.Item label="价格">{productDetails?.price}</Descriptions.Item>
              <Descriptions.Item label="积分">{productDetails?.points}</Descriptions.Item>
              <Descriptions.Item label="描述" span={3}>{productDetails?.description}</Descriptions.Item>
              <Descriptions.Item label="分类名称">{productDetails?.className}</Descriptions.Item>
              <Descriptions.Item label="类型名称">{productDetails?.typeName}</Descriptions.Item>
            </Descriptions>
            <Descriptions title="商品图片">
              <Descriptions.Item label=" " span={3}>
                <img src={productDetails?.image} alt="商品图片" />
              </Descriptions.Item>
            </Descriptions>
            <Descriptions title="投放">
              <Descriptions.Item label="投放城市">{productDetails?.launchCity}</Descriptions.Item>
              <Descriptions.Item label="不发放城市">{productDetails?.nonDeliveryCity}</Descriptions.Item>
              <Descriptions.Item label="投放数量">{productDetails?.number}</Descriptions.Item>
            </Descriptions>
            <Descriptions title="供应商信息">
              <Descriptions.Item label="供应商名称">{productDetails?.vendorName}</Descriptions.Item>
              <Descriptions.Item label="服务保障" span={2}>{productDetails?.serviceGuarantee}</Descriptions.Item>
              <Descriptions.Item label="供应商电话">{productDetails?.vendorPhone}</Descriptions.Item>
            </Descriptions>
          </div>
        </TabPane>
        <TabPane tab="商品预览" key="2">
          <div className="product-preview">
            <div className="simulation-controls">
              <Select
                defaultValue="普通会员"
                style={{ width: 200, marginRight: 16 }}
                onChange={(value) => setMembershipLevel(value)}
              >
                <Option value="普通会员">普通会员</Option>
                <Option value="黄金会员">黄金会员</Option>
                <Option value="白金会员">白金会员</Option>
                <Option value="钻石会员">钻石会员</Option>
              </Select>
              <InputNumber
                min={0}
                defaultValue={0}
                onChange={(value) => setPoints(value !== null ? value : 0)}
              />
            </div>
            <Card
              hoverable
              style={{ width: 300 }}
              cover={<img alt="商品预览" src={productDetails?.image} />}
            >
              <div className="product-preview-details">
                <Title level={4}>
                  {productDetails?.price || '价格'}
                </Title>
                <Title level={5}>{productDetails?.productName || '商品名称'}</Title>
                <Text>{productDetails?.sales || '月售数量'}</Text>
              </div>
            </Card>
          </div>
        </TabPane>
      </Tabs>
      <div className="action-records">
        <h3>操作记录列表</h3>
        <Table
          columns={columns}
          dataSource={operationRecords}
          pagination={{
            total: totalRecords,
            current: currentPage,
            pageSize: pageSize,
            onChange: (page, pageSize) => {
              setCurrentPage(page);
              setPageSize(pageSize);
            }
          }}
        />
      </div>
      <Modal title={modalTitle} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>{modalContent}</p>
      </Modal>
    </div>
  );
};

export default ProductDetailsPage;
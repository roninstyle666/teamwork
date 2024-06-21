// src/Pages/ProductCreateEditPage/index.tsx
import React, { useState } from 'react';
import { Form, Input, Button, Select, DatePicker, InputNumber, Space, theme, Divider, Row,Col, Upload, message, TreeSelect,Tree } from 'antd';
import './index.css';  // 引入样式文件
import { Content } from 'antd/es/layout/layout';
import { UploadOutlined,MinusCircleOutlined,PlusOutlined } from '@ant-design/icons';

import { PageHeader } from '@ant-design/pro-components';
import { addProduct } from '../../api';
import { useNavigate } from 'react-router-dom';
import { subscribe } from 'diagnostics_channel';

const { Option } = Select;
const { TextArea } = Input;

const ProductCreate: React.FC = () => {
  const [form] = Form.useForm();
  const [noDeliveryAreas, setNoDeliveryAreas] = useState<string[]>([]);
  const [deliveryCities, setDeliveryCities] = useState<string[]>([]);
  const [imageURL, setImageURL] = useState<string>('');
  const navigate = useNavigate();
  const SHOW_PARENT = TreeSelect.SHOW_PARENT;
  const token=localStorage.getItem('token')||'';


  

  const onFinish = (values: any) => {
    const onlineTime = values.onlineTime;
    const offlineTime = values.offlineTime;
    if(onlineTime !==''){
      values.onlineTime = onlineTime.format('YYYY-MM-DD');
    }
    if(offlineTime !==''){
      values.offlineTime = offlineTime.format('YYYY-MM-DD');
    }
    values.image=imageURL;
    console.log(values);
    addProduct(values);
    navigate('/Manage');
  };
const upimg = async (file:any)=>{
  
}
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const handleImageChange = (info: any) => {
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      setImageURL(info.file.response.url);
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  const priceTypes = [
    { label: '纯积分', value: 0},
    { label: '积分加钱', value: 1 },
    { label: '现金', value: 2 },
  ];
  const treeData = [
    {
      title: '北京市',
      value: '北京市',
      key: '110000',
      children: [
        { title: '东城区', value: '东城区', key: '110000' },
        { title: '西城区', value: '西城区', key: '110000' },
        // 其他区
      ],
    },
    {
      title: '上海市',
      value: '上海',
      key: '310000',
      children: [
        { title: '黄浦区', value: '黄浦区', key: '310000' },
        { title: '徐汇区', value: '徐汇区', key: '310000' },
        // 其他区
      ],
    },
    {
      title: '新疆维吾尔自治区',
      value: '新疆维吾尔自治区',
      key: '650000',
      children: [
        { title: '乌鲁木齐市', value: '乌鲁木齐市', key: '650100' },
        { title: '克拉玛依市', value: '克拉玛依市', key: '650200' },
        // 其他市
      ],
    },
    // 其他省份和直辖市
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
      <PageHeader
    className="site-page-header"
    onBack={() => window.history.back()}
    title="返回"
  />
          <div className="product-create-edit-container">
      <Form
        form={form}
        name="product-create-edit"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <h2>基本信息</h2>
        <Form.Item
          label="商品名称"
          name="productName"
          rules={[{ required: true, message: '请输入商品名称' }, { max: 20, message: '名称不能超过20个字符' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="商品头图"
          name="image"
          rules={[{ required: true, message: '请上传商品头图' }]}
        >
          <Upload
            name="productImage"
            headers={{ token , 'Content-Type': 'multipart/form-data'}}
             action='https://2b299711a3ee1b94e05ac49fc351a4ab.pty.oscollege.net/photo-upload'// 修改为您的实际上传地址
            listType="picture"
            onChange={handleImageChange}
          >
            <Button icon={<UploadOutlined />}>上传商品头图</Button>
          </Upload>
        </Form.Item>
        {imageURL && (
          <div className="image-preview">
            <img src={imageURL} alt="商品头图预览" />
          </div>
        )}
        <Form.Item
          label="文字描述"
          name="description"
          rules={[{ required: true, message: '请输入文字描述' }, { max: 100, message: '描述不能超过100个字符' }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="商品类型"
          name="typeId"
          rules={[{ required: true, message: '请选择商品类型' }]}
        >
          <Select>
            <Option value={0}>实物</Option>
            <Option value={1}>代金券</Option>
            <Option value={2}>虚拟物品</Option>
          </Select>
        </Form.Item>
       
        <Form.Item
          label="商品分类"
          name="classId"
          rules={[{ required: true, message: '请选择商品分类' }]}
        >
          <Select>
            <Option value={0}>分类1</Option>
            <Option value={1}>分类2</Option>
          </Select>
        </Form.Item>
        <h2>服务条款</h2>
        <Form.Item
          label="供应商名称"
          name="vendorName"
          rules={[{ required: true, message: '请输入供应商名称' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="供应商电话"
          name="vendorPhone"
          rules={[{ required: true, message: '请输入联系方式' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="服务保障"
          name="service_guarantee"
          rules={[{ required: true, message: '请输入服务保障' }]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <h2>兑换价格</h2>
       
        
                  <Form.Item
                   
                    name='manner'
                    rules={[{ required: true, message: '请选择价格类型' }]}
                  >
                    <Select placeholder="请选择价格类型" style={{ width: 150 }}>
                      {priceTypes.map(pt => (
                        <Option  value={pt.value}>{pt.label}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                 
                    <Form.Item
                      
                      name='points'
                      rules={[{ required: form.getFieldValue(['priceTypes']) !== 'cash', message: '请输入积分价格' }]}
                    >
                      <InputNumber placeholder="积分价格" />
                    </Form.Item>
                  
                
                    <Form.Item
                     
                      name='price'
                      rules={[{ required: form.getFieldValue(['priceTypes']) !== 'points', message: '请输入现金价格' }]}
                    >
                      <InputNumber placeholder="现金价格" />
                    </Form.Item>
                
                 
                
             
  
          
        
        <h2>快递</h2>
        <Form.Item
          label="不发货地区"
          name="nonDeliveryCity"
        >
          <TreeSelect
            treeData={treeData}
            value={noDeliveryAreas}
            onChange={setNoDeliveryAreas}
            treeCheckable={true}
            showCheckedStrategy={SHOW_PARENT}
            placeholder="请选择不发货地区"
            style={{ width: '100%' }}
          />
        </Form.Item>
        <h2>兑换限制</h2>
        <Form.Item
          label="投放数量"
          name="number"
        >
          <InputNumber />
        
        </Form.Item>
        <h2>投放</h2>
        <Form.Item
          label="上线时间"
          name="onlineTime"
          rules={[{ required: true, message: '请选择上线时间' }]}
        >
          <DatePicker picker="date" showTime={false} />
        </Form.Item>
        <Form.Item
          label="下线时间"
          name="offlineTime"
        >
          <DatePicker picker="date" showTime={false} />
        </Form.Item>
        <Form.Item
          label="投放城市"
          name="launchCity"
        >
          <TreeSelect
            treeData={treeData}
            value={deliveryCities}
            onChange={setDeliveryCities}
            treeCheckable={true}
            showCheckedStrategy={SHOW_PARENT}
            placeholder="请选择投放城市"
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">提交</Button>
        </Form.Item>
      </Form>
    </div>
  
    </Content>
  );
};

export default ProductCreate;
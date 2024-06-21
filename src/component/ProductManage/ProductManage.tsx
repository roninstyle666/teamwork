import React, { useState,createContext,useContext } from "react";


import { Content } from "antd/es/layout/layout";
import { theme } from "antd";


import {  Tabs } from 'antd';
import  {  useEffect } from 'react';
import { Table,  Tag } from 'antd';

import axios, { AxiosResponse } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct,SearchProduct,changeStatus } from '../../api';

import { Form, Input, Button, Row, Col, DatePicker, Select } from 'antd';




import { setSearch,resetSearch } from '../../store/Search';
import Search from 'antd/es/transfer/search';
import { redirect, useNavigate } from "react-router-dom";
const { RangePicker } = DatePicker;
const { Option } = Select;

const ProductManage:React.FC = () => {
  //const [sta,setsta]=useState<number>(1);
  const[k,setk]=useState(3)
  const [sta,setsta]=useState<number>(1)

 
  const onChange = (key: string) => {
    console.log(key);
    setk(Number(key))
    
  };  

  const [state, setState] = useState([{}])
  const [SearchData, setSearchData] = useState({});
  const[s,sets]=useState({ 
    "pageNumber": 4,
    "pageSize": 10,
    "id": '',
    "productName": '',
    "store": 0,
    "onlineTime": '',
    "offlineTime": '',
    "status": 0,
    "createUserId": 0,
    "createUsername": '',
    "proxyUserId": 0,
    "proxyUsername": '',})
  const dispatch= useDispatch()
  const OnFinish = (data: any) => {
    const onlineTime = data.onlineTime;
    const offlineTime = data.offlineTime;
    if(onlineTime !==''){
      data.onlineTime = onlineTime.format('YYYY-MM-DD');
    }
    if(offlineTime !==''){
      data.offlineTime = offlineTime.format('YYYY-MM-DD');
    }
    setSearchData(data);
    
  };
  useEffect(() => {
    dispatch(setSearch(SearchData))
    const searchdata =JSON.parse(localStorage.getItem('search') || '{}')
    sets(searchdata)
  },[SearchData])
  const resetclick = async () => {
   await dispatch(resetSearch())
   const searchdata =JSON.parse(localStorage.getItem('search') || '{}')
    sets(searchdata)
  }
  useEffect(() => {
    if(s.id !== '0'){
      SearchProduct(s).then((data) => {
        console.log(data)
        const rows =data.data.data.rows
        if (k === 3) { setState(rows)
          
         }
        else {
          setState(rows.filter((item: any) => {
            const matchdata = item.status === k
            return matchdata
          }))
  
        }
      })}
      else{
        getProduct({ "pageNumber": 1,"pageSize": 10}).then((data) => {
          console.log(data)
          
          const rows =data.data.data.rows
          if (k === 3) { setState(rows)
            
           }
          else {
            setState(rows.filter((item: any) => {
              const matchdata = item.status === k
              return matchdata
            }))
    
          }
        })
        
        
      }
  }, [k,s,sta])
  

 const change=(status: any,ids: any)=>{

   changeStatus(status,ids).then((data:any) => {
    setsta(status)
     if(data.data.code === 200){
      redirect('/Manage')
     }else{
       alert(data.data.msg)
     }
  })
 }
 const navigate = useNavigate();
  const newProduct = () => {
    navigate('/Manage/ProductCreate');
    
  }
 
const Role=localStorage.getItem('role')
const admin=(Role==='0'?true:false)
const columns = [
  {
    title: '商品ID',
    dataIndex: 'id',
    key: 'id',
    render: (id: any) => {
      return <Button type='link' onClick={() =>navigate(`/Manage/ProductDetail`)}>{id}</Button>
    }
  },
  {
    title: '商品名称',
    dataIndex: 'productName',
    key: 'productName',
  },
  {
    title: '库存',
    dataIndex: 'store',
    key: 'store',
  },
  {
    title: '开始时间',
    dataIndex: 'onlineTime',
    key: 'onlineTime',
  },
  {
    title: '结束时间',
    dataIndex: 'offlineTime',
    key: 'offlineTime',
  },
  {
    title: '商品状态',
    dataIndex: 'status',
    key: 'status',
    render: (status: any) => {
      switch (status) {
        case 0:
          return <Tag style={{width:'63.3px', textAlign:'center'}}color="red">已下线</Tag>;
        case 1:
          return <Tag style={{width:'63.3px',textAlign:'center'}}color="green">已上线</Tag>;
        case 2:
          return <Tag style={{width:'63.3px',textAlign:'center'}}color="orange">审核中</Tag>;
        case 3:
          return <Tag color="red">审核失败</Tag>;
        case 4:
          return <Tag color="green">审核成功</Tag>;
        case 5:
          return <Tag style={{width:'63.3px',textAlign:'center'}}color="orange">编辑中</Tag>;
        
      }
    }

  },
  
  {
    title: '管理人',
    dataIndex: 'createUsername',
    key: 'createUsername',
  },
  admin?{ 
    title: '操作',
    key: 'action',
    render: (status: any) => {

      switch (status.status) {
        case 0:
          return <Button type='primary'ghost style={{  width:'87.33px'}} onClick={() =>change(1,status.id)}>上线</Button>;
        case 1:
          return <Button style={{  width:'87.33px'}}danger={true} onClick={() =>change(0,status.id)}>下线</Button>;
        case 2:
          return <Button style={{  width:'87.33px'}}disabled={true}>审核中</Button>;
        case 3:
          return <Button disabled={true}>审核失败</Button>;
        case 4:
          return <Button disabled={true}>审核成功</Button>;
        case 5:
          return <Button style={{ width:'87.33px'}}disabled={true}>编辑中</Button>;
        default:
          return <Button disabled={true}>未知状态</Button>;
      }
    }
  }:{  }
  
];

    const {token: { colorBgContainer, borderRadiusLG },} = theme.useToken();
    return(
        <>
    
    <Content
        style={{
          margin: '12px 16px',
          padding: 24,
          minHeight: 150,
          maxHeight: 170,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
       <Form layout="inline" onFinish={OnFinish}>
      <Row gutter={[16,24]}>
        <Col span={6}>
          <Form.Item initialValue='' name="id" label="商品ID">
            <Input placeholder="请输入商品ID" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item  initialValue=''name="productName" label="商品名称">
            <Input placeholder="请输入商品名称" />
          </Form.Item>
        </Col >
        <Col span={6}>
          <Form.Item  initialValue=''name="onlineTime" label="开始时间">
            <DatePicker placeholder="选择开始时间" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item  initialValue=''name="offlineTime" label="结束时间">
            <DatePicker placeholder="选择结束时间" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item  initialValue=''name="status" label="商品状态">
            <Select placeholder="选择商品状态">
              <Option value='1'>已上线</Option>
              <Option value='0'>已下线</Option>
              <Option value='2'>审核中</Option>
              <Option value='3'>审核失败</Option>
              <Option value='4'>审核成功</Option>
              <Option value='5'>编辑中</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item  initialValue=''name="createUsername" label="管理人">
            <Input placeholder="请输入管理人" />
          </Form.Item>
        </Col>
        <Col span={6}>
        </Col>
        <Col span={2}>
          <Button type="default" htmlType="reset" onClick={resetclick}>
            重置
          </Button>
        </Col>
        <Col span={2}>
          <Button type="primary" htmlType="submit"  >
            查询
          </Button>
        </Col>
      </Row>
    </Form>

      </Content>
      <Content 
       style={{
        margin: '0px 16px',
        padding: 24,
        minHeight: 280,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}>
        <>
  <div style={{display: 'flex',justifyContent: 'space-between',marginBottom: '20px'}}>
  <h1 style={{fontWeight: 'bold'}}>商品列表</h1>
  <Button type='primary'  onClick={newProduct}>新增商品</Button>
  </div>
  <Tabs
    defaultActiveKey="3"
    onChange={onChange}
    items={[
      {
        label: `全部`,
        key: '3',
        children: <Table 
        rowKey={(record: any) => record.id}
        pagination={{defaultCurrent: 1, pageSize: 6}}
        dataSource={state} columns={columns} />,
      },
      {
        label: `已上线`,
        key: '1',
        children:<Table 
        rowKey={(record: any) => record.id}
        pagination={{defaultCurrent: 1, pageSize: 6}}
        dataSource={state} columns={columns} />,
      },
      {
        label: `已下线`,
        key: '0',
        children: <Table 
        rowKey={(record: any) => record.id}
        pagination={{defaultCurrent: 1, pageSize: 6}}
        dataSource={state} columns={columns} />,
      },
    ]}
  />
  </>
        
      </Content>
      
      
      
      </>
    
    )
}
export default ProductManage;
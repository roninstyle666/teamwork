/*import {  Tabs } from 'antd';
import React, { useState} from 'react';
import GoodList from './GoodsList';
import  { useContext, useEffect } from 'react';
import { Table, Button, Tag } from 'antd';

import axios, { AxiosResponse } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct,SearchProduct } from '../../api';



const Ptab: React.FC = () => {
  
  const[k,setk]=useState(3)
  const onChange = (key: string) => {
    console.log(key);
    setk(Number(key))
    
  };  
  const [state, setState] = useState([{}])
  
  const searchdata =JSON.parse(localStorage.getItem('searchdata') || '{}')
  useEffect(() => {
      SearchProduct(searchdata).then((data) => {
        const rows = data.data.data.rows
        if (k === 3) { setState(rows) }
        else {
          setState(rows.filter((item: any) => {
            const matchdata = item.status === k
            return matchdata
          }))
  
        }
      })
  }, [k,searchdata])

const columns = [
  {
    title: '商品ID',
    dataIndex: 'id',
    key: 'id',
    render: (id: any) => {
      return <Button type='link' href=''>{id}</Button>
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
          return <Tag color="red">已下线</Tag>;
        case 1:
          return <Tag color="green">已上线</Tag>;
        case 2:
          return <Tag color="yellow">审核中</Tag>;
        case 3:
          return <Tag color="red">审核失败</Tag>;
        case 4:
          return <Tag color="green">审核成功</Tag>;
        case 5:
          return <Tag color="yellow">编辑中</Tag>;
        default:
          return <Tag color="blue">未知</Tag>;
      }
    }

  },
  {
    title: '管理人',
    dataIndex: 'createUsername',
    key: 'createUsername',
  },
  {
    title: '操作',
    key: 'action',
    render: (status: any) => {
      
      switch (status.status) {
        case 0:
          return <Button type='primary' style={{opacity: 0.8}} href=''>上线</Button>;
        case 1:
          return <Button danger={true}  href=''>下线</Button>;
        default:
          return <Button  disabled={true}>忙碌</Button>;
      }
    }
  },
];
  return(<>
  <div style={{display: 'flex',justifyContent: 'space-between',marginBottom: '20px'}}>
  <h1 style={{fontWeight: 'bold'}}>商品列表</h1>
  <Button type='primary'  href=''>新增商品</Button>
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
        pagination={{defaultCurrent: 1, pageSize: 2}}
        dataSource={state} columns={columns} />,
      },
      {
        label: `已上线`,
        key: '1',
        children:<Table 
        rowKey={(record: any) => record.id}
        pagination={{defaultCurrent: 1, pageSize: 2}}
        dataSource={state} columns={columns} />,
      },
      {
        label: `已下线`,
        key: '0',
        children: <Table 
        rowKey={(record: any) => record.id}
        pagination={{defaultCurrent: 1, pageSize: 2}}
        dataSource={state} columns={columns} />,
      },
    ]}
  />
  </>)
};

export default Ptab;
*/


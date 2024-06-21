import React, { useDeferredValue, useEffect, useState } from 'react';
import './Sidenav.css'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShopOutlined,
  LineChartOutlined,
  PlusSquareOutlined 
} from '@ant-design/icons';
import { Avatar, Button, Layout, Menu, MenuProps, theme,Dropdown, Collapse } from 'antd';
import { Outlet, redirect, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { logout } from '../../store/user';
import axios from '../../api/axios';
import { userout } from '../../api';
import { resetSearch} from '../../store/Search';
import { Hidden } from '@mui/material';
import UserInfo from '../UsetInfo';




const { Header, Sider, Content } = Layout;

const Sidenav: React.FC = () => {
  const dispatch =useDispatch()
  const usenavigate = useNavigate()
  const Role=localStorage.getItem('role')
  const admin=(Role==='0'?true:false)

const [collapsed, setCollapsed] = useState(false);
 const userIn=JSON.parse(localStorage.getItem('user')||'{}')

 const out=()=>{
  console.log('退出登录')
  userout()
  dispatch(logout())
  dispatch(resetSearch())
  localStorage.clear()
  window.location.href='/Login'

}
const User=()=>{
  usenavigate('/Manage/UserInfo')
}
  
    const icon=[
      
      {
        key:'1',
        label: (
          <a target="_blank" onClick={User}rel="noopener noreferrer" >
            个人中心
          </a>
        ),
      },
      {
        key:'2',
        label:(
          <a onClick={out}target="_blank" rel="noopener noreferrer" >
            退出登录
          </a>
        ),
      }
    ]
  
  const navigate = useNavigate();
  const[current , setCurrent]= useState('/ProductManage');
  const handleClick :MenuProps['onClick']= (e) => {
    console.log('click ', e);
    navigate('/Manage'+e.key);
    setCurrent(e.key)
  }
  return (
    <Layout className='main-container'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <h3 className='app-name' >{collapsed?'商管':'商品管理系统'}</h3>
        { admin?<Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['/ProductManage']}
          onClick={handleClick}
          selectedKeys={[current]}
          items={[{ 

            key: '/ProductManage',
            icon: <ShopOutlined />,
            label: '商品管理',
          },
          {
            key: '/TU',
            icon: <LineChartOutlined />,
            label: '数据大盘',
          }]}
          style={{height: '100%'}}
        />:<Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['/ProductManage']}
        onClick={handleClick}
        selectedKeys={[current]}
        items={[{ 

          key: '/ProductManage',
          icon: <ShopOutlined />,
          label: '商品管理',
        },
       ]}
        style={{height: '100%'}}
      />}
        
      </Sider>
      <Layout>
        <Header className="header-container"style={{  backgroundColor: '#001529'}}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 32,
              backgroundColor:'#fff',
            }}
          />
          <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
          <Dropdown menu={{items:icon}}>
          <Avatar size={36} src={<img src={'/image/user.jpg'}/>}/>
          </Dropdown>
          <h3 style={{color:'#fff',
            margin:'0 10px',
            fontSize:'16px',
            
          }}>{userIn.nickName}</h3>
          </div>
        </Header>
        
       <Outlet/>
        
      </Layout>
    </Layout>
  );
};

export default Sidenav;
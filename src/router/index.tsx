import { createBrowserRouter, RouteObject } from "react-router-dom";
import React from "react";
import Landing from "../pages/LandingPage/Landing";
import LoginPage from "../pages/LoginPage/LoginPage";
import Register from "../pages/RegisterPage/RegisterPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import Manage from "../pages/ManagePage/Manage";
import ProductManage from "../component/ProductManage/ProductManage";
import TU from "../component/TU/TU";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import ProductCreate from "../pages/ProductCreate/ProductCreate";
import UserInfo from "../component/UsetInfo";
const routes: RouteObject[] = [
  {
    path: "/",
    element: <Landing />,//landing页面
    
  },
  {
    path: "/Login",
    element: <LoginPage/>//登录页面
  },
  {
    path: "/Register",
    element: <RegisterPage/>,//注册页面
  },
  {
    path:"/Manage",
    element:<Manage/>,//工作台主路由
    children: [
      {
        index: true,
        element: <ProductManage/>,//商品管理页面
      },
      {
        path: "/Manage/ProductManage",
        element: <ProductManage/>,//商品管理页面
      },
      {
        path: "/Manage/TU",
        element: <TU/>,//数据大盘页面
      },
      {
        path: "/Manage/ProductDetail",
        element: <ProductDetail/>,//商品详情页面
        
      },
      {path:"/Manage/ProductCreate",
        element:<ProductCreate/>,//商品创建页面
      },
      {
        path: "/Manage/UserInfo",
        element: <UserInfo/>,//用户信息页面
      }
    ],
  },
  

];

const router = createBrowserRouter(routes);

export default router;

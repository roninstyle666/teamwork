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
    element: <Landing />,
    
  },
  {
    path: "/Login",
    element: <LoginPage/>
  },
  {
    path: "/Register",
    element: <RegisterPage/>,
  },
  {
    path:"/Manage",
    element:<Manage/>,
    children: [
      {
        index: true,
        element: <ProductManage/>,
      },
      {
        path: "/Manage/ProductManage",
        element: <ProductManage/>,
      },
      {
        path: "/Manage/TU",
        element: <TU/>,
      },
      {
        path: "/Manage/ProductDetail",
        element: <ProductDetail/>,
        
      },
      {path:"/Manage/ProductCreate",
        element:<ProductCreate/>,
      },
      {
        path: "/Manage/UserInfo",
        element: <UserInfo/>,
      }
    ],
  },
  

];

const router = createBrowserRouter(routes);

export default router;

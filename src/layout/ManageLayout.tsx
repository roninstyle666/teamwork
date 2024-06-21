import { Outlet } from "react-router-dom"
import Sidenav from "../component/Sidenav/Sidenav"
import { Flex, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
const MLayoutPage = () => {
    return (
        <Flex gap="middle" wrap className={"layoutPage"}>
            <Sidenav />
        </Flex>
      );
}
export default MLayoutPage
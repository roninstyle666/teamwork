/*import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Col, DatePicker, Select } from 'antd';
import { GoodsProvider } from '../../Content/GoodsContent';

import { useDispatch } from 'react-redux';
import { setSearch,resetSearch } from '../../store/Search';
import Search from 'antd/es/transfer/search';
const { RangePicker } = DatePicker;
const { Option } = Select;



const SearchArea: React.FC = () => {
  const [SearchData, setSearchData] = useState({});
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
  const handleclick = () => {
    dispatch(resetSearch())
    
  }
  useEffect(() => {
    dispatch(setSearch(SearchData))
  // console.log(SearchData)
  }, [SearchData])

  return (
    
   
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
          <Button type="default" htmlType="reset" onClick={handleclick}>
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
    
  );
};

export default SearchArea;


*/
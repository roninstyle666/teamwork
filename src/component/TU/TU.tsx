// src/Pages/DataDashboard/index.tsx
import React, { useEffect, useState } from 'react';
import { DatePicker, Dropdown, Tabs, theme } from 'antd';
import ReactECharts from 'echarts-for-react';
import dayjs, { Dayjs } from 'dayjs';
import './index.css';  // 引入样式文件
import { ProLayout } from '@ant-design/pro-components';
import menu from 'antd/es/menu';
import { Link } from 'react-router-dom';
import { Content } from 'antd/es/layout/layout';
import { NumShow, TopShow, channelShow } from '../../api';
import { Hidden } from '@mui/material';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const TU: React.FC = () => {
  const [dates, setDates] = useState<[Dayjs, Dayjs]>([
    dayjs().subtract(8, 'days'),
    dayjs().subtract(1, 'days')
  ]);
  const [Day1,setDay1]=useState<any>((dates[0].format('YYYY-MM-DD')))
  const [Day2,setDay2]=useState<any>((dates[1].format('YYYY-MM-DD')))
  useEffect(() => {
  setDay1((dates[0].format('YYYY-MM-DD')))
  setDay2((dates[1].format('YYYY-MM-DD')))
},[dates])
  
 
  const[Data,setData]=useState<Array<number>>([])
  const[Date,setDate]=useState<Array<string>>([])
  const[manner,setManner]=useState([{}])

  const [activeTab, setActiveTab] = useState<string>('1');
  const [showx, setShowx] = useState<boolean>(true);


  const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null, dateStrings: [string, string]) => {
    if (dates && dates[0] && dates[1]) {
      setDates([dates[0], dates[1]]);
    }
  };
  useEffect(()=>{
    if(activeTab ==='1'){ 
    NumShow({beginTime:Day1,endTime:Day2}).then((res) => {
    console.log(res);
    const numbers: number[] = [];
    const Dates: string[] = [];
    res.data.data.forEach((item: any) => {
        numbers.push(item.number);
        Dates.push(item.date);
    })
    console.log(numbers);
    console.log(Dates);
    setShowx(true);
    setData(numbers);
    setDate(Dates);
  })
  }
    
    if(activeTab === '2'){
      TopShow({beginTime:Day1,endTime:Day2}).then((res) => {
        console.log(res);
        const numbers: number[] = [];
        const types: string[] = [];
        res.data.data.forEach((item: any) => {
            numbers.push(item.number);
            types.push(item.type);
        })
        console.log(numbers);
        console.log(types);
        setShowx(true);
        setData(numbers);
        setDate(types);
      })
      
    }
    if(activeTab === '3'){
      channelShow({beginTime:Day1,endTime:Day2}).then((res) => {
        console.log(res);
        var i=0;
        const data:[{value:number,name:string},{value:number,name:string},{value:number,name:string}]=[{value:0,name:'纯积分'},{value:0,name:'积分+现金'},{value:0,name:'纯现金'}]
        res.data.data.forEach((item: any) => {
            data[i].value+=item.number
           i++ 
        })
        console.log(data);
        console.log(manner);
        setShowx(false)
        setDate(['纯积分','积分+现金','纯现金'])
        setManner(data);
        
       
      })
      
    }
},[activeTab])
   
  

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    
  };

  const getChartOptions = () => {
    switch (activeTab) {
      case '1':
        return {

          xAxis: {
            type: 'category',
            data: Date,
            show: showx
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: Data,
              type: 'line'
            }
          ]
        };
      case '2':
        return {

          xAxis: {
            type: 'category',
            data: Date,
            show: showx
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              type: 'bar',
              data: Data
              
            }
          ]
        };
      case '3':
        return {
          xAxis: {
            type: 'category',
            data: Date,
            show: showx
            

          },
          yAxis: {
            type: 'value'
          },

          series: [
            {
              name: '兑换方式',
              type: 'pie',
              radius: '50%',
              data: manner
            }
          ]
        };
    }
  };
  const {token: { colorBgContainer, borderRadiusLG },} = theme.useToken();
  return (
    <>
    <Content  style={{
          margin: '12px 16px',
          padding: 24,
          minHeight: 150,
          
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}>
    <div className="dashboard-container">
      <div className="dashboard-header">
        <RangePicker
          defaultValue={dates}
          onChange={handleDateChange}
          style={{ marginBottom: 16 }}
        />
      </div>
      <div className="dashboard-tabs">
        <Tabs className='dashboard-TabChange' defaultActiveKey="1" onChange={handleTabChange}>
          <TabPane tab="兑换量" key="1">
            <div className="chart-container">
              <ReactECharts option={getChartOptions()} style={{ height: '100%', width: '100%' }} />
            </div>
          </TabPane>
          <TabPane tab="销量 Top 20" key="2">
            <div className="chart-container">
              <ReactECharts option={getChartOptions()} style={{ height: '100%', width: '100%' }} />
            </div>
          </TabPane>
          <TabPane tab="兑换方式" key="3">
            <div className="chart-container">
              <ReactECharts option={getChartOptions()} style={{ height: '100%', width: '100%' }} />
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
    </Content>
    </>
   
  );
};

export default TU;
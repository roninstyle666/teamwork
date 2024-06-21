import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Grid, Paper } from '@mui/material';
import './index.css';

const Landing: React.FC = () => {
  const handleCardClick = () => {
    window.location.href = '/Login';
  };

  return (
    <div className="root">
      <AppBar position="static" className="appBar">
        <Toolbar>
          <Typography variant="h6" className="title">
            首页
          </Typography>
          <Button color="inherit" onClick={() => window.location.href = '/Login'}>登录</Button>
          <Button color="inherit" onClick={() => window.location.href = '/Register'}>注册</Button>
        </Toolbar>
      </AppBar>
      <div className="heroImage"></div>
      <Container>
        <div className="heroContent">
          <Typography variant="h4">用户运营</Typography>
          <Typography variant="subtitle1">渠道运营、活跃运营、忠诚度运营，贯穿用户生命周期的全线运营</Typography>
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} className="gridItem">
            <Paper className="paper" onClick={handleCardClick} elevation={3}>
              <Typography variant="h5">渠道运营</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4} className="gridItem">
            <Paper className="paper" onClick={handleCardClick} elevation={3}>
              <Typography variant="h5">活跃运营</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4} className="gridItem">
            <Paper className="paper" onClick={handleCardClick} elevation={3}>
              <Typography variant="h5">支付宝会员</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <footer className="footer">
        <Typography variant="body2">隐私政策 | 服务条款</Typography>
        <Typography variant="body2">© 蚂蚁集团 版权所有</Typography>
      </footer>
    </div>
  );
};

export default Landing;

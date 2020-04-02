import React, { useState } from 'react';
import { Route, Link, Redirect } from "react-router-dom";
import AddArticle from './AddArticle'
import ArticleList from './ArticleList'
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import {
  SmileOutlined,
} from '@ant-design/icons';
import '../static/css/AdminIndex.css'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


function AdminIndex(props) {
  const [collapsed, setCollapsed] = useState(false)
  const onCollapse = collapsed => {
    setCollapsed(collapsed)
  };

  const handleClickArticle = e => {
    if (e.key === 'addArticle') {
      props.history.push('/index/add')
    } else {
      props.history.push('/index/list')
    }
  }
  
  //退出登录
  function signOut() {
    console.log('退出登录')
    localStorage.removeItem('openId')
    props.history.replace('/login')
  }

  // 登录检查
  // 如果用户已经登陆, 自动跳转到管理界面
  const openId = localStorage.getItem('openId')
  if(!openId) {
    return <Redirect to='/login'/>
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" >
          <img alt="blog-logo" src="http://ww1.sinaimg.cn/large/006x4mSygy1gdfn3x3jvcj30et06oglf.jpg" style={{width:'100%',height:'160%'}}/>
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline"> 
          <Menu.Item key="1">
            <SmileOutlined />
            <Link to="/index">工作台</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <SmileOutlined />
            <Link to="/index/list">文章列表</Link>
          </Menu.Item>
          <SubMenu
            key="sub1"
            onClick={handleClickArticle}
            title={
              <span>
                <SmileOutlined />
                <span>文章管理</span>
              </span>
            }
          >
            <Menu.Item key="addArticle"><Link to="/index/add">添加文章</Link></Menu.Item>
            <Menu.Item key="articleList"><Link to="/index/list">文章列表</Link></Menu.Item>
          </SubMenu>
          <Menu.Item key="9">
            <SmileOutlined />
            <span>留言管理</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0,position:"relative"}}>
          <Button onClick={signOut} style={{position:"absolute",right:"30px",bottom:"10px"}}>退出登录</Button>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>后台管理</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <div>
              {/* 这个页面的子路由 */}
              <Route path="/index" exact component={AddArticle} />
              <Route path="/index/add" exact component={AddArticle} />
              <Route path="/index/add/:id" exact component={AddArticle} />
              <Route path="/index/list" component={ArticleList} />
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>ripple_blog</Footer>
      </Layout>
    </Layout>
  )
}

export default AdminIndex
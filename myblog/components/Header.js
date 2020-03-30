import React from 'react'
import '../static/style/components/header.css'
import { StarOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';
// 测试专用 等下删除
import Link from 'next/link'
// 

import {Row,Col, Menu} from 'antd'
const Header = () => (
  <div className="header">
    <Row type="flex" justify="center">
        <Col  xs={24} sm={24} md={10} lg={15} xl={12}>
            <span className="header-logo">ripple_h</span>
            <span className="header-txt">专注前端开发,每个月赚一百万。</span>
        </Col>

        <Col className="memu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
            <Menu  mode="horizontal">
                <Menu.Item key="home">
                    <StarOutlined />
                    首页
                </Menu.Item>
                <Menu.Item key="video">
                    <StarOutlined />
                    视频
                </Menu.Item>
                <Menu.Item key="life">
                    <StarOutlined />
                    生活
                </Menu.Item>
                <Menu.Item key="test">
                    <StarOutlined />
                    <Link href="/detailed"><a>测试详情页</a></Link>
                </Menu.Item>
            </Menu>
        </Col>
    </Row>
 </div>
)

export default Header
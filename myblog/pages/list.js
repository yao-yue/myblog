//博客列表页 即用户点开首页中的某个列表将会导航到此

import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { Row, Col, List, Breadcrumb } from 'antd'
import { StarOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../static/style/pages/comm.css'

import axios from 'axios'
import servicePath from '../config/apiUrl'
import Link from 'next/link'



const ArticleList = (props) => {
  const initList = props.data
  console.log('xxxxxxxxxxxxxx')
  console.log(props.data)
  console.log('xxxxxxxxxxxxxx')
  const [mylist, setMylist] = useState(initList);
  //解决刷新问题 之后再修正
  useEffect(() => {
    setMylist(mylist)
  })
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>{mylist[0].typeName}</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <List
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={item => (
                <List.Item>
                  <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                    <a>{item.title}</a>
                  </Link>
                  <div className="list-icon">
                    <span><StarFilled />{item.addTime}</span>
                    <span><StarFilled /> {item.typeName}</span>
                    <span><StarFilled /> {item.view_count}人</span>
                  </div>
                  <div className="list-context">{item.introduce}</div>
                </List.Item>
              )}
            />

          </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>
      <Footer />

    </>
  )
}


ArticleList.getInitialProps = async (context) => {
  let id = context.query.id ? context.query.id : 99  //测试
  const promise = new Promise((resolve) => {
    axios(servicePath.getListById + id).then(
      (res) => resolve(res.data)
    )
  })
  return await promise
}

export default ArticleList
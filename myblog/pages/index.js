import React, { useState } from 'react'
import Head from 'next/head'
import axios from 'axios'
import { Row, Col, List } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import '../static/style/pages/index.css'
import { StarOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';
import Link from 'next/link'


const Home = function (list) {
  const [mylist, setMylist] = useState(list.data);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>

            <List
              header={<div>最新日志</div>}
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={item => (
                <List.Item>
                  <div className="list-title">
                    {/* 不能直接在Link里面使用文字导航  要加一个a标签 */}
                    <Link href={{pathname:'/detailed',query:{id:item.id}}}><a>{item.title}</a></Link></div>
                  <div className="list-icon">
                    <span><StarFilled /> {item.addTime}</span>
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

    </>
  )

}

Home.getInitialProps = async () => {
  const promise = new Promise((resolve) => {
    axios('http://127.0.0.1:7001/default/getArticleList').then(
      (res) => {
        //console.log('远程获取数据结果:',res.data.data)
        resolve(res.data)
      }
    )
  })

  return await promise
}

export default Home
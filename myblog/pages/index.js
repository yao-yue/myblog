import React, { useState } from 'react'
import Head from 'next/head'
import axios from 'axios'
import { Row, Col, List, Icon } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import '../static/style/pages/index.css'



const Home = function (list) {
  const [ mylist , setMylist ] = useState(list.data);

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
                  <div className="list-title">{item.title}</div>
                  <div className="list-icon">
                    <span><Icon type="calendar" /> 2019-06-28</span>
                    <span><Icon type="folder" /> 视频教程</span>
                    <span><Icon type="fire" /> 5498人</span>
                  </div>
                  <div className="list-context">{item.context}</div>
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

Home.getInitialProps = async ()=>{
  const promise = new Promise((resolve)=>{
    axios('http://127.0.0.1:7001/default/getArticleList').then(
      (res)=>{
        //console.log('远程获取数据结果:',res.data.data)
        resolve(res.data)
      }
    )
  })

  return await promise
}

export default Home
import React, { useState } from 'react'
import Head from 'next/head'
import axios from 'axios'
import { Row, Col, List } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import { FieldTimeOutlined, EyeOutlined, BookOutlined } from '@ant-design/icons';
import Link from 'next/link'

//支持markdown
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

import '../static/style/pages/index.css'
const renderer = new marked.Renderer();
marked.setOptions({
  renderer: renderer,
  gfm: true,
  pedantic: false,
  sanitize: false,
  tables: true,
  breaks: false,
  smartLists: true,
  smartypants: false,
  sanitize: false,
  xhtml: false,
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  }
});

//api路径
import servicePath from '../config/apiUrl'

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
                    <Link href={{ pathname: '/detailed', query: { id: item.id } }}><a>{item.title}</a></Link></div>
                  <div className="list-icon">
                    <span><FieldTimeOutlined /> {item.addTime}</span>
                    <span><BookOutlined /> {item.typeName}</span>
                    <span><EyeOutlined /> {item.view_count}  次</span>
                  </div>
                  <div className="list-context"
                    dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}>
                  </div>
                </List.Item>
              )}
            />

          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          <div className="ICP-info">
            <img src="../static/img/police-logo.png" alt="police-logo" style={{width:"20px",height:"20px",marginRight:"10px"}}/>
            <a href="http://www.beian.miit.gov.cn/">赣ICP备20003337号</a>
          </div>
        </Col>
      </Row>

    </>
  )

}

Home.getInitialProps = async () => {
  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleList).then(
      (res) => {
        resolve(res.data)
      }
    ).catch(err => {
      console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxx')
      console.log(err)
      console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxx')
    })
  })

  return await promise
}

export default Home
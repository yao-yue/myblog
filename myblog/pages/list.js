//博客列表页 即用户点开首页中的某个列表将会导航到此

import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { Row, Col, List, Breadcrumb } from 'antd'
import { FieldTimeOutlined, EyeOutlined, BookOutlined } from '@ant-design/icons';
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import Link from 'next/link'


//支持markdown
import marked from 'marked'
import hljs from "highlight.js";
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
import 'highlight.js/styles/monokai-sublime.css';
import '../static/style/pages/comm.css'





const ArticleList = (props) => {
  const typeId = props.tyepId
  const initList = props.data
  const [mylist, setMylist] = useState(initList);
  
  useEffect(() => {
    pullList(typeId)
  },[typeId])

  const pullList = async(id) => {
    const result = await axios(servicePath.getListById + id)
    setMylist(result.data.data)
  }

  return (
    <>
      <Head>
        <title>List</title>
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
                    <span><FieldTimeOutlined />{item.addTime}</span>
                    <span><BookOutlined /> {item.typeName}</span>
                    <span><EyeOutlined /> {item.view_count} 次</span>
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
  let pack = await promise
  pack.tyepId = id
  return pack
}

export default ArticleList
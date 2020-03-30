//详细页做主要的一点是对Markdown语法的解析。
// react-markdown react-markdown是react专用的markdown解析组件 yarn add引入这个包
//react-markdown的配置太少了还是换回 marked+highlight


import React, { useState } from 'react'
import Head from 'next/head'
import { Row, Col, Affix, Breadcrumb } from 'antd'
import { StarOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';

//处理markdown
// import ReactMarkdown from 'react-markdown'; //wasted
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

//生成文章目录
// import MarkNav from 'markdown-navbar'; //wasted
import Tocify from '../components/tocify.tsx'

import axios from 'axios'

import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../static/style/pages/detailed.css'
import 'markdown-navbar/dist/navbar.css';

//api
import  servicePath  from '../config/apiUrl'


const Detailed = function (props) {
  let articleContent = '# P01:课程介绍和环境搭建\n' +
    '[ **M** ] arkdown + E [ **ditor** ] = **Mditor**  \n' +
    '> Mditor 是一个简洁、易于集成、方便扩展、期望舒服的编写 markdown 的编辑器，仅此而已... \n\n' +
    '**这是加粗的文字**\n\n' +
    '*这是倾斜的文字*`\n\n' +
    '***这是斜体加粗的文字***\n\n' +
    '~~这是加删除线的文字~~ \n\n' +
    '\`console.log(111)\` \n\n' +
    '# p02:来个Hello World 初始Vue3.0\n' +
    '> aaaaaaaaa\n' +
    '>> bbbbbbbbb\n' +
    '>>> cccccccccc\n' +
    '***\n\n\n' +
    '# p03:Vue3.0基础知识讲解\n' +
    '> aaaaaaaaa\n' +
    '>> bbbbbbbbb\n' +
    '>>> cccccccccc\n\n' +
    '# p04:Vue3.0基础知识讲解\n' +
    '> aaaaaaaaa\n' +
    '>> bbbbbbbbb\n' +
    '>>> cccccccccc\n\n' +
    '#5 p05:Vue3.0基础知识讲解\n' +
    '> aaaaaaaaa\n' +
    '>> bbbbbbbbb\n' +
    '>>> cccccccccc\n\n' +
    '# p06:Vue3.0基础知识讲解\n' +
    '> aaaaaaaaa\n' +
    '>> bbbbbbbbb\n' +
    '>>> cccccccccc\n\n' +
    '# p07:Vue3.0基础知识讲解\n' +
    '> aaaaaaaaa\n' +
    '>> bbbbbbbbb\n' +
    '>>> cccccccccc\n\n' +
    '``` var a=11; ```'
  // let articleContent = props.article_content


  const renderer = new marked.Renderer();
  const tocify = new Tocify()

  //配置marked
  //参考文档https://marked.js.org/#/USING_ADVANCED.md#highlight
  marked.setOptions({
    renderer: renderer, //这个是必须填写的，你可以通过自定义的Renderer渲染出自定义的格式
    gfm: true,          //启动类似Github样式的Markdown,填写true或者false
    pedantic: false,     //只解析符合Markdown定义的，不修正Markdown的错误。填写true或者false
    sanitize: false,    //原始输出，忽略HTML标签，这个作为一个开发人员，一定要写flase
    tables: true,       //支持Github形式的表格，必须打开gfm选项
    breaks: false,      //支持Github换行符，必须打开gfm选项，填写true或者false
    smartLists: true,   //优化列表输出，这个填写ture之后，你的样式会好看很多，所以建议设置成ture
    smartypants: false,
    highlight: function (code) {  //高亮显示规则 ，这里我们将使用highlight.js来完成
      return hljs.highlightAuto(code).value;
    }
  })
  //设置heading,重新定义对#标签的解析
  renderer.heading = function (text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };
  let html = marked(articleContent)

  return (
    <>
      <Head>
        <title>博客详细页</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>{props.typeName}</Breadcrumb.Item>
                <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <div>
              <div className="detailed-title">
                {props.title}
                </div>

              <div className="list-icon center">
              <span><StarFilled /> {props.addTime}</span>
              <span><StarFilled /> {props.typeName}</span>
              <span><StarFilled /> {props.view_count}人</span>
              </div>

              <div className="detailed-content" 
                    dangerouslySetInnerHTML = {{__html:html}} >
              </div>

            </div>

          </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              <div className="toc-list">
                {tocify && tocify.render()}
              </div>
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer />

    </>
  )
}

//初始拉值
Detailed.getInitialProps = async (context) => {
  let id = context.query.id
  const promise = new Promise((resolve) => {

    axios(servicePath.getArticleById + id).then(
      (res) => {
        // console.log(res)
        resolve(res.data.data[0])
      }
    )
  })

  return await promise
}


export default Detailed
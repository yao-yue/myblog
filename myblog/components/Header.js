import React,{useState,useEffect} from 'react'
import '../static/style/components/header.css'
import { HomeOutlined,BookOutlined } from '@ant-design/icons';
import Link from 'next/link'
import axios from 'axios'
import  servicePath  from '../config/apiUrl'

import {Row,Col, Menu} from 'antd'
const Header = function() {
    const [navArray , setNavArray] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(servicePath.getTypeInfo).then(
                (res) => {
                    // console.log(res.data.data)
                    return res.data.data
                }
            )
            setNavArray(result)
        }
        fetchData()
    },[])  
    
    // //跳转到列表页
    // const handleClick = (e) => {
    //     if(e.key==0) {
    //         Router.push('/index')
    //     }else {
    //         Router.push('/list?id='+e.key)
    //     }
    // }

    return (
        <div className="header">
          <Row type="flex" justify="center">
              <Col  xs={24} sm={24} md={10} lg={15} xl={12}>
                  <span className="header-logo">ripple_h</span>
                  <span className="header-txt">专注前端开发,每个月赚一百万。</span>
              </Col>
      
              <Col className="memu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
                  <Menu  mode="horizontal">
                      <Menu.Item key="0">
                        <HomeOutlined />
                        <Link href={{ pathname: '/'}}><a>博客首页</a></Link>
                      </Menu.Item>
                      {
                          navArray.map(item => (
                              <Menu.Item key={item.id}>
                                  <BookOutlined />
                                  <Link href={{ pathname: '/list', query: { id: item.id } }}><a>{item.typeName}</a></Link>
                              </Menu.Item>
                          ))
                      }
                  </Menu>
              </Col>
          </Row>
       </div>
      )
} 

export default Header
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import '../static/css/Login.css';
import { Card, Input , Button, Spin } from 'antd';
import {
    SmileOutlined,
  } from '@ant-design/icons';

function Login() {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    //isLoading用户控制Spin组件是否进入加载状态，进入加载状态可以有效防止重复提交
    const [isLoading, setIsLoading] = useState(false)

    const checkLogin = ()=>{
        setIsLoading(true)
        setTimeout(()=>{
            setIsLoading(false)
        },1000)
    }

    return (
        <div className="login-div">

        <Spin tip="Loading..." spinning={isLoading}>
            <Card title="ripple Blog  System" bordered={true} style={{ width: 400 }} >
                <Input
                    id="userName"
                    size="large"
                    placeholder="Enter your userName"
                    prefix={<SmileOutlined />}
                    onChange={(e)=>{setUserName(e.target.value)}}
                /> 
                <br/><br/>
                <Input.Password
                    id="password"
                    size="large"
                    placeholder="Enter your password"
                    prefix={<SmileOutlined />}
                    onChange={(e)=>{setPassword(e.target.value)}}
                />     
                <br/><br/>
                <Button type="primary" size="large" block onClick={checkLogin} > Login in </Button>
            </Card>
        </Spin>
    </div>
    )
}
export default Login
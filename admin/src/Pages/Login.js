import React, { useState,useEffect, createContext} from 'react';
import 'antd/dist/antd.css';
import '../static/css/Login.css';
import { Card, Input, Button, Spin ,message } from 'antd';
import {
    SmileOutlined,
} from '@ant-design/icons';

import axios from 'axios'
import servicePath from '../config/apiUrl'
const openIdContext = createContext()

function Login(props) {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    //isLoading用户控制Spin组件是否进入加载状态，进入加载状态可以有效防止重复提交
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{

    },[])

    const checkLogin = () => {
        setIsLoading(true)

        if (!userName) {
            message.error('用户名不能为空')
            return false
        } else if (!password) {
            message.error('密码不能为空')
            return false
        }
        let dataProps = {
            'userName': userName,
            'password': password
        }
        axios({
            method: 'post',
            url: servicePath.checkLogin,
            data: dataProps,
            withCredentials: true
        }).then(
            res => {
                setIsLoading(false)
                if (res.data.msg === 'success') {
                    localStorage.setItem('openId', res.data.openId)
                    props.history.push('/index')
                } else {
                    message.error('用户名密码错误')
                }
            }
        )

        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }

    return (
        <div className="login-div">

            <Spin tip="Loading..." spinning={isLoading}>
                <Card title="JSPang Blog  System" bordered={true} style={{ width: 400 }} >
                    <Input
                        id="userName"
                        size="large"
                        placeholder="Enter your userName"
                        prefix={<SmileOutlined/>}
                        onChange={(e) => { setUserName(e.target.value) }}
                    />
                    <br /><br />
                    <Input.Password
                        id="password"
                        size="large"
                        placeholder="Enter your password"
                        prefix={<SmileOutlined/>}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <br /><br />
                    <Button type="primary" size="large" block onClick={checkLogin} > Login in </Button>
                </Card>
            </Spin>
        </div>
    )

}
export default Login
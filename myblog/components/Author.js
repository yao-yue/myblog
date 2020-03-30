import {Avatar,Divider} from 'antd'
import { UserOutlined } from '@ant-design/icons';
import '../static/style/components/author.css'

const Author =()=>{

    return (
        <div className="author-div comm-box">
            <div> <Avatar shape={"square"} size={100} src="http://ww1.sinaimg.cn/large/006x4mSygy1gdb6lk9gi3j30ks0rqtrj.jpg"  /></div>
            <div className="author-introduction">
                帅气程序员，专注于WEB和移动前端开发。月薪一百万的前端王子。志坚毅,意慷慨,不碌碌于俗,何患于不济,何损于美趣。
                <Divider>社交账号</Divider>
                <Avatar size={28} icon={<UserOutlined />} className="account"  />
                <Avatar size={28} icon={<UserOutlined />}  className="account" />
                <Avatar size={28} icon={<UserOutlined />}  className="account"  />

            </div>
        </div>
    )

}

export default Author
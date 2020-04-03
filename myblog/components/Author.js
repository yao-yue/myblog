import { Avatar, Divider } from 'antd'
import '../static/style/components/author.css'

const logoWrapper = {
    display: "flex",
    justifyContent: "center",
    // backgroundColor: "yellow",
    marginTop: "-18px"
}
const logoStyle = {
    width: "30px",
    height: "30px",
    margin: "16px"
}
const imgStyle1 = {
    width: "140%",
    height: "100%"
}
const imgStyle2 = {
    width: "100%",
    height: "100%"
}

const Author = () => {
    function goLinkToGithub() {
        console.log('go to target web')
    }
    function goLinkToJuejin() {

    }

    return (
        <div className="author-div comm-box">
            <div> <Avatar shape={"square"} size={100} src="http://ww1.sinaimg.cn/large/006x4mSygy1gdb6lk9gi3j30ks0rqtrj.jpg" /></div>
            <div className="author-introduction" style={{ marginBottom: "-20px" }}>
                帅气程序员，专注于WEB和移动前端开发。月薪一百万的前端王子。志坚毅,意慷慨,不碌碌于俗,何患于不济,何损于美趣。
                <Divider>社交账号</Divider>
                {/* <Avatar size={28} icon={<GithubOutlined />} className="account"  /> */}
                {/* <Avatar size={28} icon={<UserOutlined />}  className="account" />
                <Avatar size={28} icon={<UserOutlined />}  className="account"  /> */}
                <div style={logoWrapper}>
                    <a href="https://github.com/workingNight" style={logoStyle} onClick={goLinkToGithub}>
                        <img style={imgStyle1} src="http://ww1.sinaimg.cn/large/006x4mSygy1gdgkxnlsuyj30lo0f6dg7.jpg" />
                    </a>
                    <a href="https://juejin.im/user/5b9f52046fb9a05d3447aef5" style={logoStyle} onClick={goLinkToJuejin}>
                        <img style={imgStyle2} src="http://ww1.sinaimg.cn/large/006x4mSygy1gdglb4fzvzj30ad0ac74a.jpg" />
                    </a>
                </div>
            </div>
        </div>
    )

}

export default Author
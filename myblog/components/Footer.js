import '../static/style/components/footer.css'
const icpStyle = {
        // marginTop: "20px",
        display: "flex",
        justifyContent: "center"
}

const Footer = ()=>(
    <div className="footer-div">
        <div>系统由 React+Node+Ant Desgin驱动 </div>
        <div>Rect.red</div>
        <div className="ICP-info" style={icpStyle}>
            <img src="../static/img/police-logo.png" alt="police-logo" style={{width:"20px",height:"20px",marginRight:"10px"}}/>
            <a href="http://www.beian.miit.gov.cn/">赣ICP备20003337号</a>
          </div>
    </div>
)

export default Footer
import React, { useState, useEffect } from 'react';
import marked from 'marked'
import '../static/css/AddArticle.css'
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd'
import { getTypeInfo, getArticleById, updateArticle, addArticle } from '../api'

const { Option } = Select;
const { TextArea } = Input

//有关markdown的处理思考，文件里应该保存markdown文件。即带‘#’的文件

function AddArticle(props) {
    const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle, setArticleTitle] = useState('')   //文章标题
    const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd, setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [showDate, setShowDate] = useState()   //发布日期
    const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType, setSelectType] = useState("选择文章类别") //选择的文章类别

    //marked options
    const renderer = new marked.Renderer()
    marked.setOptions({
        renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
    });

    const changeContent = (e) => {
        setArticleContent(e.target.value)
        let htmlContent = marked(e.target.value)
        setMarkdownContent(htmlContent)
    }

    const changeIntroduce = (e) => {
        setIntroducemd(e.target.value)
        let htmlIntroduce = marked(e.target.value)
        setIntroducehtml(htmlIntroduce)
    }

    //从中台得到文章类别信息
    const _getTypeInfo = async () => {
        const res = await getTypeInfo()
        if (res) {
            setTypeInfo(res.data)
        }
    }
    //选择类别后的的操作
    const selectTypeHandler = (value) => {
        setSelectType(value)
    }

    const initData = (data) => {
        console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxx')
        console.log("这里错了？",data)
        console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxx')
        let {title, addTime, typeId, article_content ,introduce } = data
        setArticleTitle(title)
        setShowDate(addTime)
        setSelectType(typeId)
        //有关md
        setArticleContent(article_content)
        setIntroducemd(introduce)
        let html = marked(article_content)
        setMarkdownContent(html)
        let tmpInt = marked(introduce)
        setIntroducehtml(tmpInt)
    }

    const _getArticleById = async (id) => {
        const res = await getArticleById(id)
        if (res.status === '1') {
            initData(res.data[0])
        }
    }
    const tempSaveArticle = () => {
        console.log('立即调用？')
        let dataProps = {}  //传递到接口的参数
        dataProps.type_id = selectedType
        dataProps.title = articleTitle
        dataProps.article_content = articleContent
        dataProps.introduce = introducemd
        if(showDate) {
            let datetext = showDate.replace('-', '/') //把字符串转换成时间戳
            dataProps.addTime = (new Date(datetext).getTime()) / 1000
        }
        //存进localStorage
        // let dataPropsJsoned = JSON.stringify(dataProps)
        // localStorage.setItem('savedArticle',dataPropsJsoned)
        // message.success('暂存成功')
    }

    const saveArticle = async () => {
        // markdownContent()  //先进行格式转换

        if (!selectedType) {
            message.error('必须选择文章类别')
            return false
        } else if (!articleTitle) {
            message.error('文章名称不能为空')
            return false
        } else if (!articleContent) {
            message.error('文章内容不能为空')
            return false
        } else if (!introducemd) {
            message.error('简介不能为空')
            return false
        } else if (!showDate) {
            message.success('发布日期已设为当前时间')
            showDate = setShowDate(Date.now())
            // return false
        }

        let dataProps = {}  //传递到接口的参数
        dataProps.type_id = selectedType
        dataProps.title = articleTitle
        dataProps.article_content = articleContent
        dataProps.introduce = introducemd
        let datetext = showDate.replace('-', '/') //把字符串转换成时间戳
        dataProps.addTime = (new Date(datetext).getTime()) / 1000

        console.log(dataProps)
        //调用api
        let res;
        if (articleId === 0) {
            console.log('articleId=:' + articleId)
            dataProps.view_count = Math.ceil(Math.random() * 100) + 1000
            res = await addArticle(dataProps)
            if (res) {
                setArticleId(res.data.insertId)
                if (res.data.isScuccess) {
                    message.success('文章添加成功')
                } else {
                    message.error('文章添加失败');
                }
            }
        } else {  //否之 修改
            dataProps.id = articleId
            res = await updateArticle(dataProps)
            if (res) {
                if (res.data.isScuccess) {
                    message.success('文章修改成功')
                } else {
                    message.error('文章修改失败');
                }
            }
        }

    }

    useEffect(() => {
        _getTypeInfo()
        //获得文章ID
        let tmpId = props.match.params.id
        let savedArticle = localStorage.getItem('savedArticle')
        if (tmpId) {
            setArticleId(tmpId)
            _getArticleById(tmpId)
        } else if(savedArticle) {
            const data = JSON.parse(saveArticle)
            console.log(data)
            // initData(data)
        }
    }, [])


    return (
        <div>
            <div>
                <Row gutter={5}>
                    <Col span={18}>
                        <Row gutter={10} >
                            <Col span={16}>
                                <Input
                                    value={articleTitle}
                                    placeholder="博客标题"
                                    onChange={e => {
                                        setArticleTitle(e.target.value)
                                    }}
                                    size="large" />
                            </Col>
                            <Col span={6}>
                                {/* &nbsp; */}
                                <Select defaultValue={selectedType} size="large" onChange={selectTypeHandler}>
                                    {typeInfo.map((item, index) => {
                                        return (<Option key={index} value={item.Id}>{item.typeName}</Option>)
                                    })}
                                </Select>
                            </Col>
                        </Row>
                        <br />
                        <Row gutter={10} >
                            <Col span={12}>
                                <TextArea
                                    value={articleContent}
                                    className="markdown-content"
                                    rows={35}
                                    onChange={changeContent}
                                    onPressEnter={changeContent}
                                    placeholder="文章内容"
                                />

                            </Col>
                            <Col span={12}>
                                <div className="show-html"
                                    dangerouslySetInnerHTML={{ __html: markdownContent }} >
                                </div>
                            </Col>
                        </Row>

                    </Col>

                    <Col span={6}>
                        <Row>
                            <Col span={24}>
                                <Button size="large" onClick={tempSaveArticle}>暂存文章</Button>&nbsp;
                                <Button type="primary" size="large" onClick={saveArticle}>发布文章</Button>
                                <br />
                                <br />
                            </Col>
                            <Col span={24}>
                                <br />
                                <TextArea
                                    rows={6}
                                    value={introducemd}
                                    onChange={changeIntroduce}
                                    onPressEnter={changeIntroduce}
                                    placeholder="文章简介"
                                />
                                <div
                                    style={{
                                        textAlign: "justify",
                                        textJustify: "newspaper",
                                        wordBreak: "break-all"
                                    }}
                                    className="introduce-html"
                                    dangerouslySetInnerHTML={{ __html: introducehtml }} >
                                </div>
                            </Col>
                            <Col span={16}>
                                <div className="date-select">
                                    <DatePicker
                                        onChange={(date, dateString) => setShowDate(dateString)}
                                        placeholder="发布日期"
                                        size="large"
                                    />
                                </div>
                            </Col>
                        </Row>

                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default AddArticle
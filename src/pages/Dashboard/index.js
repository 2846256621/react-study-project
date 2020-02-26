import React, {Component, Fragment,createRef} from 'react';
import {
    Row,
    Col,
    Card
} from 'antd'

//导入图表
import echarts from 'echarts'

import './dashboard.css'

import {getArticleAmount} from '../../Services'

class Dashboard extends Component {
    constructor(){
        super();
        this.articleAmount = createRef();

    }

    /**初始化图表*/
    initArticleChart = ()=>{

        this.articleChart = echarts.init(this.articleAmount.current);

        getArticleAmount()
            .then(res=>{
                console.log(res.data);
                /**根据官方文档，option不同，展现出来的图不同*/
                const option = {
                    color: ['#78a982'],
                    title: {
                        text: ''
                    },
                    tooltip: {},
                    legend: {
                        data:['浏览量']
                    },
                    xAxis: {
                        data: res.data.amount.map(item => item.month)
                    },
                    yAxis: {},
                    series: [{
                        name: '浏览量',
                        type: 'bar',
                        data: res.data.amount.map(item => item.value)
                    }]
                };

                this.articleChart.setOption(option);
            })
            .catch();



    };

    componentDidMount(){
        this.initArticleChart();
    }
    render() {

        return (
            <Fragment>
                <Card title="系统概览" bordered={false}>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={5} push={2}>
                            <div className="gutter-box" style={{background: 'linear-gradient(to right, #a0f1ea 0%, #ead6ee 100%)'}}>浏览人数</div>
                        </Col>
                        <Col className="gutter-row" span={5} push={2}>
                            <div className="gutter-box"  style={{background: 'linear-gradient(to right, #ccfbff 0%, #ef96c5 100%)'}}>文章总数</div>
                        </Col>
                        <Col className="gutter-row" span={5} push={2}>
                            <div className="gutter-box"  style={{background: 'linear-gradient(to right,#87cbc3 0%, #eae5c9 100%)'}}>点赞人数</div>
                        </Col>
                        <Col className="gutter-row" span={5} push={2}>
                            <div className="gutter-box" style={{background: 'linear-gradient(to right, #b2aed5 0%, #e8fbcb 100%)'}}>评论总数</div>
                        </Col>
                    </Row>


                </Card>
                <Card title="最近浏览量" bordered={false}>

                    <div ref={this.articleAmount} style={{height:350,width:'80%',margin:`0 auto`}}/>

                </Card>
            </Fragment>
        );
    }
}

export default Dashboard;
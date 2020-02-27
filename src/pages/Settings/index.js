import React, {Component} from 'react';
import {
    Card,
    Upload,
    Button,
    Icon,
    Spin
} from 'antd'

import './setting.css'
import axios from 'axios';

//修改头像
import {connect} from 'react-redux'
import {changeAvatar} from '../../actions/login'

class Settings extends Component {
    constructor(){
        super();
        this.state = {
            isUploading:false,
        };

    }
    handleUploadAvatar = ({file})=>{
        /**使用 贴图库的 接口 上传图片生成url*/
        const data = new FormData();
        data.append('Token','550efead4b9eb792634dee1639058d6dfcb15649:DlVjpv8JcL5aVLeALMSlCePd-Ic=:eyJkZWFkbGluZSI6MTU4MjgxNjYwMywiYWN0aW9uIjoiZ2V0IiwidWlkIjoiNzExMDc4IiwiYWlkIjoiMTY2NjY2NiIsImZyb20iOiJmaWxlIn0=');
        data.append('file',file);
        // console.log(file);
        this.setState({
            isUploading:true
        });
        axios.post('http://up.imgapi.com/',data)
            .then(res=>{
                console.log(res);
                if(res.status === 200){
                    this.setState({
                        isUploading:false
                    });
                    this.props.changeAvatar(res.data.linkurl);
                }
            })
            .catch(err=>{
                message.error('上传失败！')
            })
    };
    render() {
console.log(this.props);
        return (
                <Card title="个人设置" bordered={false}>
                    <p>修改头像：</p>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        customRequest={this.handleUploadAvatar} //通过覆盖默认的上传行为，可以自定义自己的上传实现
                    >
                    {/*判断有没有图片上传    */}
                    <Spin spinning={this.state.isUploading}>
                        {
                            this.props.avatarUrl
                            ?
                            <img src={this.props.avatarUrl} alt="头像" style={{width:122,height:122}}/>
                            :
                            <div>
                                <Icon type='plus' style={{fontSize:20}}/>
                                <div className="ant-upload-text">上传头像</div>
                            </div>
                        }
                    </Spin>
                    </Upload>
                </Card>
            );
        }
}

/**去 更新 头像的 url
 *
 * 请求不一定都得写在 services里面，可以在组件内部 引入axios 去请求
 * 在回调中 进行以下步骤
 *
 *  在 actionTypes 里面创建 状态
 *  action 里面定义状态 返回的 参数
 *  Settings组件 调用 action中方法，并传入参数
 *  reducer 里面去 根据参数 更新数据
 *
 * 1.调用 changeAvatar 方法，传入返回的url
 * 2.在到 reducer中去更新 数据
 * 3.mapState：向 this.props中注入 avatarUrl
 * 4.页面调用 this.props.avatarUrl
*/
const mapState = (state)=>{
    console.log(state);
    return{
        avatarUrl:state.login.avatar
    }
};
export default connect(mapState,{changeAvatar})(Settings);
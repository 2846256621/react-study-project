##### 1.配置webpack参考博客

#### 2.配置antd 

(1) 安装antd

 `npm i react-app-rewired customize-cra -D`

(2) 新建config-overrides.js

(3) 修改package.json 中的 scripts
cd
(4) 重启检测

(5) 配置less,建立一个less文件，并测试，配置config-overrides.js

`npm i less less-loader -D`

(6) 重启检测

(7) 安装 antd

`npm i antd -S`
`npm i babel-plugin-import -D`

(8) 测试并配置主题 lessVar.js 

(9) 配置装饰器模式(高阶组件WrappedComponent)

`npm i @babel/plugin-proposal-decorators -D
`
(10) 建立完整目录结构

#### 3.配置路由

(1) 配置路由

`npm install react-router-dom -S`

在index.js中配置 mainRouter，
App.js中配置 adminRouter


(2) 配置懒加载  安装react-loadable
`npm i react-loadable -S`

#### 4.编写页面组件


#### 5.配置ajax
 (1) 创建services并 安装 axios
 
 `npm i axios -S`
 
#### 6.导出excel 的插件
   (1) 安装 `npm i xlsx -S`
   
   (2) 只需要以下几句代码
   ```
      const ws = XLSX.utils.aoa_to_sheet(this.state.data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
      XLSX.writeFile(wb, "sheetjs.xlsx")
   ```
   这个 this.state.data 是个二维数组，类似：[["a","b"],[1,2]]
#### 7.对时间的格式处理使用moment.js
    
     安装 ：npm install moment
     使用 ：moment(createAt).format('YYYY年MM月DD日 hh:mm:ss')
#### 8.使用富文本编辑
   - 可用 wangeditor
    `npm install wangeditor`  
   - markdown语法的Editor.md
    
#### 9.使用 图表 （echarts 、antv）
     npm install echarts --save
     
#### 10.使用redux
`npm install react-redux redux-thunk -S`

actions负责定义传参，component中进行调用，reducer进行逻辑处理
。即可以从actions中做ajax请求，在component中去调用，然后去更新reducer中的初始化数据

#### 11.可以使用 RAP2 生成mock数据

#### 12.可以使用 贴图库去上传图片，然后 生成url


#### 13.redux 使用总结
     1.services中定义接口及传递的参数 ，也可在需要的组件内部 引入axios，进行ajax请求  
     2.actionTypes 里面创建状态(大写)
     3.action 里面定义状态，返回的参数 (type + payload)，也可进行ajax请求及异步的dispatch
     4.组件 调用action中loginIn方法，并传入参数,同时更新 state 
       (1)建立连接 connect()() 高阶组件
       (2)定义mapState方法，像this.props中注入新数据
          const mapState = (state)=>{
              console.log(state);
              return{
                  avatarUrl:state.login.avatar
              }
          };
      
       (3)调用action中对应方法并传参 this.props.login(userInfo)   
       (4)返回整个组件 export default connect(mapState,{loginIn})(login)
     5.reducer 里面去 根据参数 更新数据 (switch-case + return { ...state,...userInfo})

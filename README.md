##### 1.配置webpack参考博客

#### 2.配置antd 

(1) 安装antd

 `npm i react-app-rewired customize-cra -D`

(2) 新建config-overrides.js

(3) 修改package.json 中的 scripts

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
    
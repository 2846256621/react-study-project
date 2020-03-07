const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const path = require('path');
const app = express();

app.use('/src/',express.static('./src'));
app.set('views','my-project/src');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//把路由 挂载到 app服务中
app.use(router);
//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});
todos=[
    {
        id:1,
        title:"吃饭",
        completed:true
    },
    {
        id:2,
        title:"睡觉",
        completed:false
    },{
        id:3,
        title:"听音乐",
        completed:false
    }];
app.get('/getTodoList',(req,res)=>{
    res.json({
        todos,
        code:200,
        msg:'成功'
    })
});
app.get('/completedTodos',(req,res)=>{
    res.json({
        todos:todos.filter(item=>{return item.completed === false}),
        code:200,
        msg:'成功'
    })
});
app.post('/addTodoList',(req,res)=>{
    todos.push(JSON.parse(req.body.data));
    console.log(req.body);
    res.json({
        todos,
        code:200,
        msg:'成功'
    })
});

app.listen(3000,()=>{
    console.log('running....');
});

import{
    Dashboard,
    Login,
    NotFound,
    Settings,
    ArticleEdit,
    ArticleList,
    Notifications,
    NoAuth
} from '../pages'

export const mainRoutes = [{
   pathname:'/login',
   component:Login
},{
    pathname:'/404',
    component:NotFound
}];

//todo 有权限才能查看的路由 需要给每个页面绑定权限
export const adminRoutes = [{
        pathname:'/admin/dashboard',
        component:Dashboard,
        title:'仪表盘',
        icon:'dashboard',
        isNav:true,
        roles:['001','002','003']
},{
        pathname:'/admin/article',//文章管理
        component:ArticleList,
        exact:true,
        title:'文章管理',
        icon:'unordered-list',
        isNav:true,
        roles:['001','002']
},{
        pathname:'/admin/article/edit/:id', //修改文章
        component:ArticleEdit,
        roles:['001']

},{
        pathname:'/admin/notifications',  //通知
        component:Notifications,
        roles:['001','002','003']
},{
        pathname:'/admin/noauth', //没有权限
        component:NoAuth,
        roles:['001','002','003']

},{
        pathname:'/admin/settings', //设置
        component:Settings,
        icon:'setting',
        title:'设置',
        isNav:true,
        roles:['001','002']
}];
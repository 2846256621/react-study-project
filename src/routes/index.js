import{
    Dashboard,
    Login,
    NotFound,
    Settings,
    ArticleEdit,
    ArticleList,
    Notifications
} from '../pages'

export const mainRoutes = [{
   pathname:'/login',
   component:Login
},{
    pathname:'/404',
    component:NotFound
}];

export const adminRoutes = [{
        pathname:'/admin/dashboard',
        component:Dashboard,
        title:'仪表盘',
        icon:'dashboard',
        isNav:true
},{
        pathname:'/admin/article',
        component:ArticleList,
        exact:true,
        title:'文章管理',
        icon:'unordered-list',
        isNav:true
},{
        pathname:'/admin/article/edit/:id',
        component:ArticleEdit,
},{
        pathname:'/admin/notifications',
        component:Notifications,
},{
        pathname:'/admin/settings',
        component:Settings,
        icon:'setting',
        title:'设置',
        isNav:true
}];
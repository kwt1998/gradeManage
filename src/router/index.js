import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login'
import HelloWorld from '../components/HelloWorld'
import stuSearch from '../components/stuSearch'
import resetPwd from "@/components/resetPwd";
import gradeManage from "@/components/gradeManage";
import courseManage from "@/components/courseManage";
import gradeStatistics from "@/components/gradeStatistics";
import authManage from "@/components/authManage";
import content from "@/components/content";

Vue.use(Router)


const routes = [
    { path: '/login', component: login },
    {
        path: '/content',
        component: content,
        children: [
            { path: '/HelloWorld', component: HelloWorld },
            { path: '/stuSearch', component: stuSearch },
            { path: '/resetPwd', component: resetPwd },
            { path: '/gradeManage', component: gradeManage },
            { path: '/courseManage', component: courseManage },
            { path: '/gradeStatistics', component: gradeStatistics },
            { path: '/authManage', component: authManage },
        ]
    }
];

const createRouter = () => new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: routes
})

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

// router.beforeEach((to,from,next)=>{
//     console.log(to);
//     if(localStorage.getItem('token')){
//         next();
//     }else {
//         next({
//             path:'/'
//         })
//     }
// });

export default router

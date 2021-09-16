import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [];
//参数分别是文件夹路径、是否遍历所有子目录、用正则筛选文件名、懒加载
importPages(require.context('@/pages/index/views', true, /\.vue$/, 'lazy'));

function importPages(r) {
  r.keys().forEach(key => {
    var pathArr = key.split('.')[1].split('/');
    if (pathArr.length <= 3) {
      if (pathArr.length === 3) {
        routes.forEach(route => {
          if (route.name === pathArr[1]) {
            route.children.push({
              name: `${pathArr[1]}.${pathArr[2]}`,
              path: pathArr[1] === 'Home' ? `/${pathArr[2] === 'Index' ? '' : pathArr[2]}` : `/${pathArr[1]}/${pathArr[2] === 'Index' ? '' : pathArr[2]}`,
              component: resolve => require([`@/pages/index/views${key.split('.')[1]}`], resolve)
            });
          }
        });
      } else {
        routes.push({
          name: pathArr[1],
          path: pathArr[1] === 'Home' ? '/' : key.split('.')[1],
          component: resolve => require([`@/pages/index/views${key.split('.')[1]}`], resolve),
          children: []
        })
      }
    }
  });
}
console.log(routes)
//防止多次点击同个地方跳转
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}

const router = new Router({
  routes
});

router.beforeEach((to, from, next) => {next();});

router.afterEach((to, from) => {});

export default router

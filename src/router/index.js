import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/views/Homepage'
import Prolist from '@/views/Prolist'
import Cart from '@/views/Cart'
import Login from '@/views/Login'
import Reg from '@/views/Reg'
import Category from '@/views/Category'
import GoodsDetail from '@/views/GoodsDetail'
import Mine from '@/views/Mine'
import Address from '@/views/Address'
import Search from '@/views/Search'
import Trace from '@/views/Trace'
import Collections from '@/views/Collections'
import ChangePwd from '@/views/ChangePwd'
import Order from '@/views/Order'
import confirmOrder from '@/views/confirmOrder'
import myOrder from '@/views/myOrder'
import myOrderList from '@/views/myOrderList'
import Myaddress from '@/views/Myaddress'
import Editaddress from '@/views/Editaddress'
import Message from '@/views/Message'
Vue.use(Router)

export default new Router({
	
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/proList',
      name: 'Prolist',
      component: Prolist
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/reg',
      name: 'Reg',
      component: Reg
    },
    {
      path: '/category',
      name: 'Category',
      component: Category
    },
    {
      path: '/detail/:id',
      name: 'GoodsDetail',
      component: GoodsDetail
    },
    {
      path: '/mine',
      name: 'Mine',
      component: Mine
    },
    {
      path: '/address',
      name: 'Address',
      component: Address
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/trace',
      name: 'Trace',
      component: Trace
    },
    {
      path: '/collections',
      name: 'Collections',
      component: Collections
    },
    {
      path: '/changePwd',
      name: 'ChangePwd',
      component: ChangePwd
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/myorderlist',
      name: 'myOrderList',
      component: myOrderList
    },
    {
      path: '/myorder',
      name: 'myOrder',
      component: myOrder
    },
    {
      path: '/confirmOrder',
      name: 'confirmOrder',
      component: confirmOrder
    },
    {
      path: '/myaddress',
      name: 'Myaddress',
      component: Myaddress
    },
    {
      path: '/editaddress/:id',
      name: 'Editaddress',
      component: Editaddress
    },
    {
      path: '/message',
      name: 'Message',
      component: Message
    }
  ]
})

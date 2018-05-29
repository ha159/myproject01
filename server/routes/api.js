var express=require('express');

var router = express.Router();   /*可使用 express.Router 类创建模块化、可挂载的路由句柄*/
//后台的路由  所有的后台处理都要经过这里
var bodyParser = require('body-parser');
// 设置body-parser中间件
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());



var index=require('./api/index.js');
var prolist=require('./api/prolist.js');
var category=require('./api/category.js');
var users=require('./api/users.js');
var cart=require('./api/cart.js');
var search=require('./api/search.js');
var trace=require('./api/trace.js');

router.use('/index',index);
router.use('/prolist',prolist);
router.use('/category',category);
router.use('/users',users);
router.use('/cart',cart);
router.use('/search',search);
router.use('/trace',trace);

module.exports = router;   /*暴露这个 router模块*/
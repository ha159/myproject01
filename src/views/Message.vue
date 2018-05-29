<template>
	<div class="addr">
		
          <header class="header" style="">
		    <a class="back c_back" onclick="window.history.back();" style="color:#464646;">返回</a>
		    <div class="h_label" style="color:#464646;">留言板</div>
		    <a href="javascript:void(0);" v-on:click="toggle()" class="menu" :class='show'></a>
		    <nav class="t-nav" :class='showNav'>
				    <ul style="height: 45px;">
				        <li><router-link to='/' class="home">首页</router-link></li>
				        <li><router-link to='/search' class="sousuo">搜索</router-link></li>
				        <li><router-link to='/category'  href="" class="category">分类</router-link></li>
				        <li><router-link to='/cart'  href="" class="cart">购物车</router-link></li>
				        <li><router-link to='/mine'  href="" class="user">个人中心</router-link></li>
				    </ul>
		    </nav>
		  </header>
          <div id="wrapper" style="">
              <textarea v-model='msg' placeholder="吐槽一下..." style="width:98%;display:block;margin: 0 auto;height:70px;padding: 3px 0 0 3px;color: #666;" name="" rows="" cols=""></textarea>
		      <button @click='sendMsg()' style="width: 100%;height: 35px;font-size:16px;text-align: center;display: block;background: #f9524f;float: right;color: #fff;cursor: pointer;">提交</button>
	          <div style="background: #fff;margin-top: 35px;">
	          	<h4 style="font-size: 14px;padding:10px 5px;border-bottom: 1px solid #eee;">最新留言</h4>
	          	<div style="font-size: 14px;color: #666;">
	          		<!--<h5 style="font-size: 15px;">{{uname}}:</h5>-->
	          		<div v-for='(item,index) in list' style="border-bottom: 4px solid #eee;">
	          			<p class="msgList" style="color:#333"><span class="yuan">{{index+1}}</span>{{item.msgList.username}}</p>
	          			<p style="font-size: 12px;padding:3px 10px;margin-bottom: 1px solid #eee;">{{item.msgList.message}}</p>
	          			<p style="font-size: 12px;padding:3px 10px;">{{item.msgList.time}}</p>
	          			<p style="font-size: 12px;padding:3px 10px;border-top: 1px solid #eee;">{{item.backMsg==undefined?null:item.backMsg.name}}{{item.backMsg==undefined?null:item.backMsg.message}}</p>
	          			<p style="font-size: 12px;padding:3px 10px;">{{item.backMsg==undefined?null:item.backMsg.time}}</p>
	          			
	          		</div>
	          		
	          	</div>
	          </div>
          </div>
      
	</div>
</template>
 <script>
 	 import '../assets/css/common.css';
     import '../assets/css/address.css';
     import axios from 'axios';
	 import { Toast } from 'mint-ui';
	
    export default{
        data(){
            return {
            	list:[],
            	uname:'',
                msg:'',
                show:'',
                showNav:''
                
            }
        },
        mounted(){
            this.getMsgInfo()
        },
        methods:{
            sendMsg(){
            	var _this = this;
            	axios.post('/api/users/sendMsg',{
            		'msg':_this.msg
            	}).then(function (res) {
				    console.log(res)
				    var code=res.data.code;
				    if(code=='0'){
				    	Toast({
						  message: '提交成功!',
						  position: 'bottom',
						  duration: 3000
					});
					location.reload();
				    }else{
				    	Toast({
						  message: '提交失败!',
						  position: 'bottom',
						  duration: 3000
					});
				    }
				  })
				  .catch(function (res) {
				    console.log(res);
				  });
//				location.reload()	  
            },
            getMsgInfo(){
            	var _this=this;
            	axios.get('/api/users/showMsg')
				  .then(function (res) {
				    console.log(res);
				    _this.list=res.data.list;
				    console.log(_this.list)
				    
				    	
				    
				  }).catch(function (res) {
				    console.log(res);
				  });
           },
            toggle:function(){ 
             	var _this = this;
            
             	if(_this.show==''){
             		_this.show='active';
             		_this.showNav='active';
             	}else{
             		_this.show='';
             		_this.showNav='';
             	}
             		
             	
             }
//          setDefault(addressId){
//          	var _this = this;
//          	axios.post('/api/cart/setDefault',{
//          		addressId:addressId
//          	}).then(function (res) {
//          		console.log(res)
//          		if(res.data.code=="0"){
//          			console.log('设置默认地址成功！')
//          		}
//          	}).catch(function (res) {
//				    console.log(res);
//				  });
//          }
            
        }
    }
   
</script>

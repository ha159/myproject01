<template>
 
 <div class="cartMain">
   <div class="viewport" id="scroller" style="overflow: initial; transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
   <section class="content">
           
     <div :class="tip">
     	
     	<p style="text-align: center;padding-top: 20px;color: #666;">购物车空空如也~</p>
     </div>
     <div class="block">
        <div class="cart_list" v-for='item in list'>
            <!--店铺级模块-->
        
            <div class="shopLine"></div>

            <!--店铺商品-->
            <div class="cart_item" style="overflow: hidden;">

           <input type="checkbox" class="fl c_checkbox" :checked="item.checked" @click='editCart("checked",item)'/>
       
        
    
    <!--商品图片-->
    <router-link href="" class="fl pro_pic" :to="'/detail/'+item._id">
  
        <img :src="item.pic" dd_name="进入单品页">
    </router-link> 
    <!--商品图片end-->

    <div class="item_show">
        <div class="detail clearfix">
           <!--商品名称-->
            <p class="fl prd_tit">
                <router-link  :to="'/detail/'+item._id">
                
                     {{item.title}}                                        
                </router-link> 
                <router-link :to="'/detail/'+item._id">
               
                     {{item.author}}                                        
                </router-link> 
            </p>
            <!--商品名称end-->
            <!--商品价格-->
            <p class="fl prd_price ">
                <span class="dangdang_price">￥{{item.price}}</span>
                <span class="orign_price" style="text-decoration: line-through;">{{item.fee}}</span>
            </p>
            <!--商品价格end-->
            <!--商品标签-->
            <p class="clear tags">
            	<span @click='editCart("minu",item)' class="pro_desc">-</span>
            	<input type="text" name="" id="pro_num" :value="item.productnum" />
            	
            	<span @click='editCart("add",item)' class="pro_add">+</span>        		
            	<i class="clear_pro" @click='delCartGoods(item._id)'><img src="../assets/img/delete_down.png" style="width: 20px;height: auto;"/></i>             
            </p>
            <!--商品标签end-->
        </div>      
    </div>             
</div>           
        </div>
    </div>
    
    
</section>

 </div>
 <footer class="total_result" style="">

        <a class="fl " href="javascript:;" dd_name="全选">
            <input type="checkbox" class="c_checkbox" :checked="flag" id="cart_check_all" >
            <span style="color:" @click='delCartAllGoods()'>全选</span>
        </a>

        <div class="fr">
            <router-link to='/confirmOrder' class="c_btn payBtn" id="do_checkout" >去结算</router-link>
        </div>

        <div class="fr totalPrice">
            <span>合计:</span>
            <span style="color:" id="cart_price">￥{{money}}</span>
            <p></p>
        </div>

                  

    </footer>
   </div>
</template>
<script>
	import axios from 'axios';
    import { Toast } from 'mint-ui';
    import { MessageBox } from 'mint-ui';
    export default{
        data(){
            return {
                list:[],
                listLen:'',
                id:'',
                flag:true,
                tip:'show',
                money:''
                
               
            }
        },
        mounted(){
            this.getCartGoods()
            this.totalPrice();
           
            
        },
//      computer(){
//      	totalPrice(){
//      		var _this = this;
//      		var money = 0;
//      		_this.list.forEach((item)=>{
//      			if(item.checked=='true'){
//      				money+=parseFloat(item.price)*parseInt(item.productnum);
//      			}
//      		});
//      		return money;
//      	}
//      },
        methods:{
            getCartGoods(){
            	var _this=this;
            	axios.get('/api/cart/carts')
				  .then(function (res) {
//				    console.log(res.data);
				    _this.list = res.data.list[0].cartList;
				    _this.listLen = res.data.list[0].cartList.length;
				    console.log(_this.list.length)
				    if(_this.list.length!=0){
				    	_this.tip='hidden'
				    }else{
				    	_this.tip='show'
				    }
				    console.log(_this.list)
				  }).catch(function (res) {
				    console.log(res);
				  });
            },
//          getProductId(productid){
//          	alert(productid)
////          	
//				this.delCartGoods()
//          },
            delCartGoods(id){
            	var _this = this;
            	
            	axios.post('/api/cart/delCartGoods',{
            		id:id
            	}).then(function (res) {
            		console.log(res)
         		     Toast({
					  message: '删除成功!',
					  position: 'bottom',
					  duration: 2000
					});
                    _this.getCartGoods()

            	}).catch(function (res) {
				    console.log(res);
				  });
				
                this.totalPrice();
            },
            delCartAllGoods(){
            	var _this = this;           	
            	axios.post('/api/cart/delCartGoods',{
            		
            	}).then(function (res) {
            		console.log(res)
            		if(res.data.code=="0"){
            			MessageBox.confirm('你确定要删除?').then(action => {
                           _this.getCartGoods();
                           _this.totalPrice();
                       },action=>{
                       	   alert('aa')
                       });
            			
            		}
            	}).catch(function (res) {
				    console.log(res);
				  });
				
                this.totalPrice();
            },
            editCart(flag,item){
            	var _this = this
            	if(flag=='add'){
            		item.productnum++;
            	}else if(flag=='minu'){
            		if(item.productnum<=1){
            			return;
            		}
            		item.productnum--;
            	}else{
            		item.checked = item.checked=='0';
            		_this.flag = false
            	}
            	axios.post('/api/cart/editCart',{
            		id:item._id,
            		productnum:item.productnum,
            		checked:item.checked
            	}).then(function (res) {
            		console.log(res)
            		_this.totalPrice();
            		
            	}).catch(function (res) {
				    console.log(res);
				  });
				 
            },
            checkAll(){
            	var _this=this;
               _this.flag =!_this.flag
                _this.list.forEach((item)=>{
                	item.checked = _this.flag;
                });
                
                axios.post('api/cart/editCheckAll',{
                	checkAll:_this.flag
                }).then(function (res) {
            		console.log(res)
            		
            	}).catch(function (res) {
				    console.log(res);
				  });
				  this.totalPrice();
            },
            totalPrice(){
            	
            	var _this=this;
            	var money = 0;
            	
            	axios.get('/api/cart/carts')
				  .then(function (res) {
//				    console.log(res.data);
				    _this.list = res.data.list[0].cartList;
				    _this.listLen = res.data.list[0].cartList.length;
				    
				    for(let i=0;i<_this.listLen;i++){
				    	
				    	if(_this.list[i].checked){
				    		
				    		money+=parseFloat(_this.list[i].price)*parseFloat(_this.list[i].productnum);
					    	_this.money=money.toFixed(2);
					    	console.log(money)
					    	window.sessionStorage.prices = _this.money;
				    	}
				    	
				    }
//				    console.log(_this.list[0].price*_this.list[0].productnum)				    
				  }).catch(function (res) {
				    console.log(res);
				  });
            }
        }
    }
   
</script>

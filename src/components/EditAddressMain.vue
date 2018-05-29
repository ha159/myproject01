<template>
    <div id="address">
    	<div class="address_edit">
            <input name="addr_id" type="hidden" id="addr_id" value="">
            <input name="is_address_edit" type="hidden" id="is_address_edit" value="">
            <input id="hidden_identity_num" type="hidden" value="">
			<div class="single_line mt_n">
				<span class="t_span error_option"  id="ship_name_option">收货人：</span>
                <input name="ship_name" type="text" v-model='ship_name' id="ship_name" value="" maxlength="20" placeholder="姓名" class="normal_in">
			</div>
			<div class="single_line border_top">
				<span class="t_span error_option" id="ship_mb_option">手　机：</span><input name="ship_mb" v-model='ship_mb' type="text" ship_mb_flag="0" ship_mb="" id="ship_mb" value="" placeholder="号码" class="normal_in">
			</div>
			

			<div id="regionsArea" class="single_line border_top" style="padding-right:0;display: none;">
				<span class="t_span fl_l error_option" id="page_sel_country_edit">地　区：</span>
				<ul id="showRegion" class="region">
					<li id="showCountry" style="width:100px;display:none"><span class="choice error_option" id="country_id" country_id=""><em></em></span></li>

                    
                        <li><span class="choice error_option" id="province_id" province_id=""><em>省份</em></span></li>
                    

                    
                        
                            <li><span class="choice error_option" id="city_id" city_id=""><em>城市</em></span></li>
                        
                    

                    
                        <li><span class="choice error_option" id="town_id" town_id=""><em>城区</em></span></li>
                    
					
                    
                        
                            <li><span class="choice error_option" id="quarter_id" quarter_id=""><em>街道 </em></span></li>
                        
                    
				</ul>
			</div>
			<div class="single_line border_top">
				<span class="t_span error_option" id="receiver_address_option">地　址：</span><input name="ship_address" v-model='ship_address' type="text" id="ship_address" value="" maxlength="150" placeholder="地址" class="normal_in error_option" style="width: calc(100% - 75px);">
			</div>
			<div style="display: none;" class="single_line border_top">
				<span  class="t_span error_option" id="receiver_address_option">邮    编：</span><input name="ship_postcode" v-model='ship_postcode' type="text" id="ship_address" value="" maxlength="150" placeholder="邮编" class="normal_in error_option" style="width: calc(100% - 75px);">
			</div>
			<div class="single_line border_top addres">
				<span style="display: none;" class="t_span">设置为默认地址</span>
				
					<input type="checkbox" name="" id="check" value="" />
				
			</div>
			<div class="single_line border_top">
				<p style="font-size: 12px;color: #999;">温馨提示：为确保你能收到商品，请认真填写您的地址！</p>
			</div>
		</div>
		<a href="javascript:void(0)" @click='sendAddr()' id="saveAddress" class="red_btn">确定</a>
    </div>

</template>
<script>
    import axios from 'axios';
   import { Toast } from 'mint-ui';
	
    export default{
        data(){
            return {
                ship_name:'',
                ship_mb:'',
                ship_address:'',
                ship_postcode:'',
                id:this.$route.params.id,
                
            }
        },
        mounted(){
            this.getEditAddress();
        },
        methods:{
            sendAddr(){
            	var _this = this;
            	if(_this.ship_name==''||_this.ship_mb==''||_this.ship_address==''){
            		Toast({
							  message: '输入格式不合法!',
							  position: 'bottom',
							  duration: 3000
							});
            	}else{
            		axios.post('/api/cart/updateAddress',{
            		id:_this.id,	
            		ship_name:_this.ship_name,
            		ship_mb:_this.ship_mb,
            		ship_address:_this.ship_address,
            		ship_postcode:_this.ship_postcode
            		
            	})
            	.then(function (res) {
				    console.log(res);
				    Toast({
							  message: '添加成功!',
							  position: 'bottom',
							  duration: 3000
							});
                	   _this.$router.push({path:"/myaddress"});
							
				  })
				  .catch(function (res) {
				    console.log(res);
				  });
            	}
            	
					  
            },
            getEditAddress(){
            	var _this=this;
            	axios.get('/api/users/userInfo').then(function (res) {
				    console.log(res.data.list[0].addressList.length);
//				    _this.list=res
				    var len = res.data.list[0].addressList.length;
				    for(var i=0;i<len;i++){
				    	var j=i;
				    	if(res.data.list[0].addressList[i].id==_this.id){
				    		_this.list=res.data.list[0].addressList[j]
				    		console.log(_this.list)
				    		_this.ship_name = _this.list.ship_name;
				    		_this.ship_mb = _this.list.ship_mb;
				    		_this.ship_address = _this.list.ship_address;
				    		_this.ship_postcode = _this.list.ship_postcode;
				    	}
				    }
				    
				    
				    
				  })
				  .catch(function (res) {
				    console.log(res);
				  });
			  
        }
    }
  } 
</script>

<template>
  <!--吸底栏-->
    <footer class="total_result" style="">

        <a style="display: none;" class="fl " href="javascript:;" dd_name="全选">
            <input type="checkbox" class="c_checkbox" id="cart_check_all" style="" checked="">
            <span style="color:">全选</span>
        </a>

        <div class="fr">
            <a dd_name="结算" class="c_btn payBtn" id="do_checkout" href="javascript:;">结算(<span id="cart_quantity">8</span>)</a>
        </div>

        <div class="fr totalPrice">
            <span>合计</span>
            <span style="color:" id="cart_price">￥1740.80</span>
            <p></p>
        </div>

                  

    </footer>
    <!--吸底栏end-->
</template>
<script>
    export default{
        data(){
            return {
                
            }
        },
        mounted(){
            
        },
        methods:{
            
        }
    }
   
</script>

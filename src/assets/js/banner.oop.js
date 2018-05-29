//封装
!function(){
	/* 轮播图需求:
	 * 1)实现图片无缝自动轮播
	 * 2)导航点随图片切换
	 * 3)鼠标悬停在轮播图上时,停止轮播;鼠标移开时,继续轮播;
	 * 4)点击左右按钮,切换图片,实现图片的无缝切换
	 * 5)实现导航点切换
	 * 6)在移动端上实现左右滑动切换
	 */
	
	var timer = null;//定时器ID
	var index = 0;//当前图片的标记  0是第一张
	var speed = 3000;
	//创建Banner类
	function Banner(opt){
		//获取操作的对象
		this.banner = document.querySelector(opt.banner);
		this.imgbox = this.banner.querySelector(opt.imgbox);
		this.imglis = this.imgbox.children;
		
		this.nav = this.banner.querySelector(opt.nav);
		this.navlis = this.nav.children;
		
		this.btn = this.banner.querySelector(opt.btn);
		this.prev = this.btn.children[0];
		this.next = this.btn.children[1];
		
		//记录值
		this.active = opt.active;
		this.auto = opt.autoplay;
		speed = opt.speed || 3000;
		//初始化
		this.init();
	}
	
	//初始化
	Banner.prototype.init = function(){
		//将图片初始化，以便实现无缝滚动 //DOM
		//在最后一张后面添加第一张内容，在第一张前面添加最后一张的内容
		var first = this.imglis[0].cloneNode(true);
		var last = this.imglis[this.imglis.length-1].cloneNode(true);
		this.imgbox.appendChild(first);
		this.imgbox.insertBefore(last,this.imglis[0]);
		this.imgbox.style.left = "-100%";
		
		//自动轮播
		this.autoplay();
		//绑定对应的事件群
		this.controlPlay();
		this.navBtn();
		this.navClick();
		this.swiper();
		this.windowBug();
	}
	
	//1)实现图片无缝自动轮播
	Banner.prototype.autoplay = function(){
		if(this.auto === false){//控制自动轮播
			return;
		}
		//!this.auto && return
		var that = this;
		//自动轮播的定时器
		clearInterval(timer);
		timer = setInterval(function(){
			index++;
			that.play();
		},speed);
	}
	
	//2)导航点随图片切换
	Banner.prototype.changeNav = function(){
		var len = this.navlis.length;
		for (var i=0;i<len;i++) {
			//清除所有的active
			this.navlis[i].className = "";
		}
		//设置当前显示的点
		this.navlis[index].className = this.active;
	}
	
	//3)鼠标悬停在轮播图上时,停止轮播;鼠标移开时,继续轮播;
	Banner.prototype.controlPlay = function(){
		var that = this;
		//鼠标悬停,停止轮播
		this.banner.onmouseenter = function(){
			clearInterval(timer);
		}
		//鼠标离开,继续轮播
		this.banner.onmouseleave = function(){
			that.autoplay();
		}
	}
	//4)点击左右按钮,切换图片,实现图片的无缝切换
	Banner.prototype.navBtn = function(){
		var that = this;
		this.prev.onclick = function(){
			//上一张
			index--;
			that.play();
		}
		this.next.onclick = function(){
			//下一张
			index++;
			that.play();
		}
	}
	//5)实现导航点切换----选项卡切换
	Banner.prototype.navClick = function(){
		var that = this;
		var len = this.navlis.length;
		//使用for把所有导航点都绑定上事件
		for (var i=0;i<len;i++) {
			this.navlis[i].index = i;//使用index属性保存位置
			this.navlis[i].onmouseenter = function(){
				index = this.index;//通过this获取事件的触发对象
				that.changeNav();
				that.play();
			}
		}
	}
	
	//6)在移动端上实现左右滑动切换
	Banner.prototype.swiper = function(){
		var that = this;
		var startX = 0;//开始位置
		var endX = 0;
		var objleft = 0;
		
		this.banner.addEventListener("touchstart",function(event){
			clearInterval(timer);//停止大图轮播
			clearInterval(that.imgbox.timer);//停止图片切换动画
			startX = event.touches[0].clientX;//获取到手指的开始位置
			objleft = parseInt(that.imgbox.style.left);//获取开始位置
			
		},false);
		this.banner.addEventListener("touchmove",function(event){
			endX = event.touches[0].clientX;
			//通过计算终点和起点的距离，来获取移动的位置
			var x = Math.round((endX - startX) / that.imglis[0].offsetWidth * 100);
			//设置位置
			that.imgbox.style.left = objleft + x + "%"
		},false);
		this.banner.addEventListener("touchend",function(event){
			//通过计算终点和起点的距离，判断左滑还是右滑
			if(endX - startX > 80){
				//right
				index--;
			}else if(endX - startX < -80){
				//left
				index++;
			}
			that.play();
			that.autoplay();
		},false);
	}
	
	Banner.prototype.windowBug = function(){
		var that = this;
		window.addEventListener("blur",function(){
			//浏览器缩小时
			clearInterval(timer);
		},false);
		window.addEventListener("focus",function(){
			//浏览器恢复的时候
			that.autoplay();
		},false);
	}
	
	
	//播放动画的方法
	Banner.prototype.play = function(){
		var that = this;
		animate(this.imgbox,(index+1) * -100,function(){
			//回调函数
			that.handle();
			that.changeNav();
		});
	}
	
	//处理index操作
	Banner.prototype.handle = function(){
		//处理index，顺便将图片的位置修改正确
		if(index < 0){
			index = this.imglis.length - 3;
			this.imgbox.style.left = (index+1) * -100 + "%";
		}else if(index > this.imglis.length - 3){
			index = 0;
			this.imgbox.style.left = "-100%";
		}
	}
	
	
	
	function animate(obj,target,callback){
		clearInterval(obj.timer);//经常使用的定时器，建议开之前先关掉
		//获取对象的位置
		var objleft = parseInt(obj.style.left);
		//对象的移动方向速度
		var dirspeed = objleft - target > 0 ? -1 : 1;
		obj.timer = setInterval(function(){
			objleft += dirspeed;
			obj.style.left = objleft + "%";
			if(Math.abs(objleft - target) < 1){
				//到达目标
				clearInterval(obj.timer);
				if(typeof callback == "function"){
					callback();
				}
			}
		},2);
	}
	
	
	window.Banner = Banner;
}();

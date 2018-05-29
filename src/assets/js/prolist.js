function $id(id) {
    return document.getElementById(id);
}
function stickTop(){
	var nav = $id("nav");
	window.onscroll = function(){
    if(document.documentElement.scrollTop>100)
    {
      nav.className = 'fixed'
    }else{
    	nav.className = ''
    }
}


}








module.exports = {
   stickTop
   
}
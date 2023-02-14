window.onload=function(){
    button=document.querySelectorAll("nav>ul>li")
    nav=document.querySelector('nav>ul')
    for(let i=0;i<button.length;i++){
        button[i].addEventListener('click',function(e){
            if(this.lastElementChild.style.display=='' || this.lastElementChild.style.display=='none'){
                for(let j=0;j<button.length;j++){
                    button[j].lastElementChild.style.display='none';
                    button[j].children[1].style.transform="rotate(0)"
                }
                this.children[1].style.transform="rotate(-92deg)"
                button[i].lastElementChild.style.display="block";
            }else{
                this.children[1].style.transform="rotate(0)";
                for(let j=0;j<button.length;j++){
                    button[j].lastElementChild.style.display='none';
                    button[j].children[1].style.transform="rotate(0)";
                }
                button[i].lastElementChild.style.display="none";
            }
        })
    }
    /*此段代码用于鼠标点击空白处（并非导航栏的那几个链接的地方）都可以令导航栏回归初始样式*/
    document.body.addEventListener('click',function(e){
       if(!nav.contains(e.target)){
        for(let j=0;j<button.length;j++){
            button[j].children[1].style.transform="rotate(0)";
            button[j].lastElementChild.style.display='none';
        }
       }
    })
    /*接下来代码用于懒加载*/
    judge_a=function(element){
        for(let i=0;i<element.length;i++){
            if(element[i].style.opacity!="1"){
                return false;
            }
        }
        return true;
    }
    const pic=document.querySelectorAll(".picture");
    console.log(pic);
    _Midlistenr(pic)
    function _Midlistenr(e){
        lazy(e,pic)
    }
   function lazy(e,element){
       let vHeight=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;//获取可视区域距浏览器窗口的距离
       let scrollHeight=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;/*浏览器窗口和文档顶部距离*/
       for(let i=0;i<element.length;i++){
           if(element[i].offsetParent.offsetTop<vHeight+scrollHeight){
               element[i].style.transform="translateY(0)";
               element[i].style.opacity="1";
           }
       }
       /*发现已经满足条件删除scroll的绑定事件*/
       if(judge_a(element)){
           window.removeEventListener("scroll",_Midlistenr,false);
       }
   }
   window.addEventListener("scroll",_Midlistenr)
}
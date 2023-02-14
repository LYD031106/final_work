window.onload=function(){
    /*导航栏*/
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
    document.body.addEventListener('click',function(e){
       if(!nav.contains(e.target)){
        for(let j=0;j<button.length;j++){
            button[j].children[1].style.transform="rotate(0)";
            button[j].lastElementChild.style.display='none';
        }
       }
    })


    //对侧边导航的相关操作
    aside_intro=document.querySelectorAll(".aside_intro li");
    content_intro=document.querySelectorAll(".content_intro");
    //获取可视化区域高度
    var vHeight=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;
    change_adside_color=function(){
        console.log("11");
    //实时获取滚轮高度
        let scrollHeight=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
        for(let i=0;i<content_intro.length;i++){
            if(content_intro[i].offsetTop<vHeight+scrollHeight&&content_intro[i].offsetTop+content_intro[i].clientHeight>vHeight+scrollHeight){
                for(let j=0;j<aside_intro.length;j++){
                    aside_intro[j].setAttribute("id"," ");
                    aside_intro[j].style.backgroundColor="white"
                }
                aside_intro[i].setAttribute("id","active");
                aside_intro[i].style.backgroundColor="rgb(18, 0, 98)";
                flag=1;
                break;
            }
        }
    }
    change_adside_color();
    window.addEventListener("scroll",function (){
        let flag=0;
        let scrollHeight=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
        for(let i=0;i<content_intro.length;i++){
            if(content_intro[i].offsetTop<vHeight+scrollHeight&&content_intro[i].offsetTop+content_intro[i].clientHeight+115>=vHeight+scrollHeight){
                for(let j=0;j<aside_intro.length;j++){
                    aside_intro[j].setAttribute("id"," ");
                    aside_intro[j].style.backgroundColor="white"
                }
                aside_intro[i].setAttribute("id","active");
                aside_intro[i].style.backgroundColor="rgb(18, 0, 98)";
                flag=1;
                break;
            }
        }
        if(flag==0){
            for(let i=0;i<content_intro.length;i++){
                aside_intro[i].className=' ';
            }
        }
    })
    //跳转至指定位置
    function heightToTop(ele){
        //ele为指定跳转到该位置的DOM节点
        let root = document.body;
        let height = 0;
        do{
            height += ele.offsetTop;
            ele = ele.offsetParent;
        }while( ele !== root )
        return height;
    }
    for(let i=0;i<aside_intro.length;i++){
        aside_intro[i].addEventListener("click",function (e) {
            let scrollHeight=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
            let index=this.dataset.index;
            window.scrollTo({top:heightToTop(content_intro[i])-125,behavior:'smooth'})
        })
    }
    down_click=document.querySelector("#bigger");
    down_click.addEventListener("click",function(e){
        window.scrollTo({top:heightToTop(content_intro[0])-125,behavior:'smooth'})
    })
}

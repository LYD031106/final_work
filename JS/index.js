class transform_3D{
    constructor(element){
        let that;
        that=this;
        this.element=element;
        this.element.addEventListener("mouseover",function(){
            this.style.scale="1.03"
        })
        this.element.addEventListener("mousemove",this.roate.bind(this.element,event));
        this.element.addEventListener("mouseout",function(){
            this.style.scale="1"
            this.style.transform="rotateX("+0+"deg) rotateY("+0+"deg)";
            this.style.boxShadow=""
        })
    }
    roate(t,event){
        console.log(this);
        let a=this.getBoundingClientRect()
        var x=event.clientX;
        var y=event.clientY;
        let img=this.querySelector("img")
        var xx=(15-((event.clientX-a.left)/this.clientWidth)*15*2)/2.5+'px'
        var yy=(15-((event.clientY-a.top)/this.clientHeight)*15*2)/2.5+'px'
        let roate_x,roate_y
        if((event.clientX-a.left)/this.clientWidth>0.5){
            roate_y=-15+((event.clientX-a.left)/this.clientWidth)*15*2
        }else{
            roate_y=-15+((event.clientX-a.left)/this.clientWidth)*15*2
        }
        if((event.clientY-a.top)/this.clientHeight>0.5){
            roate_x=-15+((event.clientY-a.top)/this.clientHeight)*15*2
        }else{
            roate_x=-15+((event.clientY-a.top)/this.clientHeight)*15*2
        }
        this.style.transform="rotateX("+roate_x+"deg) rotateY("+roate_y+"deg) "+"perspective(800px)";
        this.style.boxShadow=xx +' '+ yy +' '+ '6px' +' 3px '+ 'black'
    }
}



window.onload=function(){
    $(".loader_wrapper").fadeOut("slow");
    var section_1_first=document.querySelector(".section_1 .inside div h2")
    var section_1_last=document.querySelector(".section_1 .inside div h3")
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
    /*鼠标点击空白处（并非导航栏的那几个链接的地方）都可以令导航栏回归初始样式*/
    document.body.addEventListener('click',function(e){
       if(!nav.contains(e.target)){
        for(let j=0;j<button.length;j++){
            button[j].children[1].style.transform="rotate(0)";
            button[j].lastElementChild.style.display='none';
        }
       }
    })
    /*接下来代码用于点击按钮*/
    let c=document.querySelector("#button");
    let flag_button=0
    c.addEventListener("click",function(){
        if(flag_button==0){
            nav.style.display="flex";
            flag_button=1
        }else{
            nav.style.display="none"
            flag_button=0;
        }
    })
    let down_li=document.querySelectorAll(".down_li")
    window.onresize=function(){
        if(document.body.clientWidth>900){
            for(let i=0;i<down_li.length;i++){
                down_li[i].style.display="none"
            }
            nav.style.display=""
        }
    }
    const threeD=document.querySelectorAll(".container .part")
    for(let i=0;i<threeD.length;i++){
        new transform_3D(threeD[i])
    }
    /*懒加载*/
    judge_a=function(element){
        for(let i=0;i<element.length;i++){
            if(element[i].style.opacity!="1"){
                return false;
            }
        }
        return true;
    }
    const pic=document.querySelectorAll(".BG .word");
    _Midlistenr(pic)
    function _Midlistenr(e){
        lazy(e,pic)
    }
   function lazy(e,element){
       let vHeight=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;//获取可视区域距浏览器窗口的距离
       let scrollHeight=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;/*浏览器窗口和文档顶部距离*/
       for(let i=0;i<element.length;i++){
           if(element[i].offsetTop<vHeight+scrollHeight){
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


   /*SVG和视差代码*/
   const s1=document.querySelector(".svg_1 .right");
   const svg_1=document.querySelector(".svg_1");
   const s2=document.querySelector(".svg_2 .inside .right");
   const s3=document.querySelector(".section_1 .inside")
   const section_1_svg=lottie.loadAnimation({
    container: s1,
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: './image/duration.json'
    });
    const section_2_svg=lottie.loadAnimation({
        container: s2,
        renderer: 'svg',
        loop: true,
        autoplay: false,
        path: './image/container.json'
    });
    window.addEventListener("scroll",change_parallax)
    function change_parallax(){
        let vHeight=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;
        let scrollHeight=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
        let h_1=s1.getBoundingClientRect().top;
        let change=s1.offsetTop;
        let bottom_1=document.querySelector(".svg_1 .inside").clientHeight-s1.clientHeight;
        if(h_1<vHeight/2){
            section_1_svg.goToAndStop(60*(change/bottom_1),true);
        }
        let h_2=s2.getBoundingClientRect().top;
        let change_2=s2.offsetTop;
        let bottom_2=document.querySelector(".svg_2 .inside").clientHeight-s2.clientHeight;
        if(h_2<vHeight/2){
            section_2_svg.goToAndStop(60*(change_2/bottom_2),true);
        }
        let h_3=s3.getBoundingClientRect().top;
        let change_3=s3.offsetTop;
        console.log(change_3);
        let begin=300;
        let mid=600;
        let end=1200;
        if(h_3>0){
            if(change_3>0&&change_3<begin){
                s3.style.opacity=""+change_3/begin;
                s3.style.transform="translateY("+(-70+(change_3/begin)*70)+"px)"
            }
            if(change_3>mid&&change_3<end){
                s3.style.opacity=""+(end-change_3)/(end-mid)
                section_1_first.style.transform="translateY(-"+(change_3/end)*140+"px)"
                section_1_last.style.transform="translateY(-"+(change_3/end)*70+"px)"
            }
        }
    }
} 
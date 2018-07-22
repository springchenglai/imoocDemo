$(document).ready(function(){
    $(".weixin-span").mouseover(function(){
        $(".weixin-expand").fadeIn();
    });
    $(".weixin-span").mouseout(function(){
        $(".weixin-expand").fadeOut();
    });
    followShort();
    greatTeacher();
    function followShort(){
        // 一行可容纳的盒子个数
        var num=3,
            containWidth=$(".shouji-container").width(),
            boxsArr=$(".shouji-container").find(".shouji-box"),
            heightArr=[];
        //每个盒子的宽度
        $(".shouji-box").css("width",containWidth/num+"px");
        for(var i=0;i<boxsArr.length;i++){
            if(i<num){
                //boxsArr[i]是一个DOM元素，要想使用jquery方法,重新包装成jquery元素
                heightArr[i]=$(boxsArr[i]).outerHeight();
            }else{
                var minHeight=Math.min.apply(null,heightArr);
                var minIndex=getMinHeightIndex(heightArr,minHeight);
                $( boxsArr[i]).css("position","absolute");
                $(boxsArr[i]).css("top",minHeight+"px");
                $(boxsArr[i]).css("left",$(boxsArr[minIndex]).position().left);
                heightArr[minIndex]=heightArr[minIndex]+$(boxsArr[i]).outerHeight();
            }
        }
        var h=Math.max.apply(null,heightArr);
        $(".shouji-container").css("height",h+"px");
    }
    function getMinHeightIndex(hArr,mH){
        for(var i in hArr){
            if(hArr[i]==mH)
                return i;
        }
    }
    function greatTeacher(){
        // 得到一行中每一个容器的宽度
        var num=5,
            teacherEveWidth=$(".teachers-container").width()/num-25;
        $(".teacherEvery").css("width",teacherEveWidth+"px");
        var iTags=0,
            teaConEves=$(".teachers-container").children(),
            iControls=$(".control-i").children();
        $(".chevron-left").click(function(){
                iTags--;
                if(iTags<0){
                    iTags=2;
                }
            iAddClass(iControls,"i-active",iTags);
            teaConEveAddClass(teaConEves,iTags)
        });
        $(".chevron-right").click(function(){
                iTags++;
                if(iTags>2){
                    iTags=0;
                }
                iAddClass(iControls,"i-active",iTags);
                 teaConEveAddClass(teaConEves,iTags)

        });
        //遍历三个i元素，给每个i加click事件，并且用当前点击的i的索引改变iTags
        iControls.each(function(index,element){
           $(element).click(function(){
                iTags=index;
               iAddClass(iControls,"i-active",iTags);
               teaConEveAddClass(teaConEves,iTags)
            });
        })
        setTimeout(autoAnima,5000);
        function autoAnima(){
            iTags++;
            if(iTags>2){
                iTags=0
            }
            iAddClass(iControls,"i-active",iTags);
            teaConEveAddClass(teaConEves,iTags);
            setTimeout(autoAnima,5000);
        }
    }
    function iAddClass(par,cls,iIndex){
        for(var i=0;i<par.length;i++){
            if(i==iIndex){
                $(par[i]).addClass(cls) ;
            }else{
                $(par[i]).removeClass(cls) ;
            }
        }
    }
    function teaConEveAddClass(par,iIndex){
        switch(iIndex){
            case 0:
                $(par[0]).animate({left:'0'},500);
                $(par[1]).animate({left:'100%'},500);
                $(par[2]).animate({left:'200%'},500);
              /* $(par[0]).addClass("teachers-container-active");
               $(par[1]).addClass("teachers-container-prev");
               $(par[2]).addClass("teachers-container-next");*/
               break;
            case 1:
                $(par[0]).animate({left:'-100%'},500);
                $(par[1]).animate({left:'0'},500);
                $(par[2]).animate({left:'100%'},500);
                /*$(par[0]).addClass("teachers-container-prev");
                $(par[1]).addClass("teachers-container-next");
                $(par[2]).addClass("teachers-container-active");*/
                break;
            case 2:
                $(par[0]).animate({left:'-200%'},500);
                $(par[1]).animate({left:'-100%'},500);
                $(par[2]).animate({left:'0'},500);
               /* $(par[0]).addClass("teachers-container-next");
                $(par[1]).addClass("teachers-container-active");
                $(par[2]).addClass("teachers-container-prev");*/
                break;
        }
    }

});
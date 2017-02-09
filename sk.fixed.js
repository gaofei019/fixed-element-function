'use strict';
(function(window){
    var _window=window;
    _window.skFixed=function($navWrap,$navBox){
        //$navWrap ==> 需要固定不变位置元素（用来确定要固定的位置）
        //$navBox ==>  需要吸住的位置元素，需要添加fixed样式
        var navTop = 0,
            shift=0,//位移
            $eventDetailBtnWrap = $('#eventDetailBtnWrap'),
            $eventDetailBtnBox = $('#eventDetailBtnBox'),
            $doc = $(document),
            $win=$(_window),
            navHeight=$eventDetailBtnWrap.height(),
            winHeight=$win.height(),//视窗高度
            scrollTimer = null;
        function countBtnBoxRange(){//计算相关元素属性
            var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
            winHeight=$win.height();//视窗高度
            if($eventDetailBtnWrap[0]){
                navTop = $eventDetailBtnWrap.offset().top;
            }
            shift=navTop+navHeight-scrolltop-winHeight;
            if(shift>0){//如果按钮条没有全部露出
                $eventDetailBtnBox.addClass('fixed');
            }else{
                $eventDetailBtnBox.removeClass('fixed');
            }
            
        };
        var t_img; // 定时器
        var isLoad = true; // 控制变量

        // 判断图片加载状况，加载完成后回调
        isImgLoad(function(){
            // 加载完成
            countBtnBoxRange();
            //在一定的时间之内，只执行一次scroll事件函数
            if (scrollTimer) {
                clearTimeout(scrollTimer);
            }
            scrollTimer = setTimeout(function(){
                $doc.off('scroll').on('scroll',function(){
                    countBtnBoxRange();
                });
            }, 400);
        });

        // 判断图片加载的函数
        function isImgLoad(callback){
            // 查找页面所有图片，迭代处理
            $('body').find('img').each(function(){
                // 找到为0就将isLoad设为false，并退出each
                if(this.height === 0){
                    isLoad = false;
                    return false;
                }
            });
            // 为true，没有发现为0的。加载完毕
            if(isLoad){
                clearTimeout(t_img); // 清除定时器
                // 回调函数
                callback();
            // 为false，因为找到了没有加载完成的图，将调用定时器递归
            }else{
                isLoad = true;
                t_img = setTimeout(function(){
                    isImgLoad(callback); // 递归扫描
                },500); // 设置的是500毫秒就扫描一次，可以自己调整
            }
        }
    };
})(window);
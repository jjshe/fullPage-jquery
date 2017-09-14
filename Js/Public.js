


$(function () {

    //// 触屏滚动
    //var swiper = new Swiper('.swiper-container', {
    //    direction: 'vertical',                  // 垂直滑动
    //    keyboardControl: true,                 // 开启键盘控制
    //    mousewheelControl: true,               // 开启鼠标滚轮控制
    //    pagination: '.swiper-pagination',       // 显示导航
    //    paginationClickable: true,              // 开启导航控制
    //});

    // pc全屏滚动
    $('#dowebok').fullpage({
        keyboardScrolling: true,     // 开启键盘上下翻页
        navigation: true,           // 开启导航指示
        scrollingSpeed: 500,        // 滚动速度-ms
        css3: false,                 // css3滚动
        afterLoad: function (anchorLink, index) {
            // 翻页之后
            // 第一页不显示导航
            if (index != 1) {
                $('#fp-nav').show();
            } else {
                $('#fp-nav').hide();
            }
        }
    });

    // 点击'下面更精彩'滚动到下一屏
    $('.first_screen .indicate').click(function () {
        $.fn.fullpage.moveSectionDown();
    })

    // 首屏背景轮播
    setInterval(function () {
        $.fn.fullpage.moveSlideRight();
    }, 5000);
    
    
    // 响应式--手机端出现滚动条
    autoScrolling();
    $(window).resize(function () {
        autoScrolling();
    });

    function autoScrolling() {
        var iWinW = $(window).width();
        if (iWinW < 480) {
            $.fn.fullpage.setAutoScrolling(false);
        } else {
            $.fn.fullpage.setAutoScrolling(true);
        }
    }

    // 手机端点击展开导航
    $('.click_hide_show').click(function () {
        $(this).parents('.nav_mobile').toggleClass('show_nav');
    })

    /*---------------滚动事件---------------*/
    var aSlide = $('.section');
    var aOffset = [];
    var iIndex = 0;

    // 存储分页的位置
    aSlide.each(function () {
        aOffset.push($(this).offset().top);
    });

    // 返回当前可视的分页索引
    $(document).scroll(function () {
        var iScrollTop = $(this).scrollTop();
        $.each(aOffset, function (i, o) {
            if (iScrollTop >= o) {
                iIndex = i;
            };
        });
        // 显示隐藏指示
        if (iIndex == aSlide.length - 1) {
            $('.mobile_indicate').addClass('back_top');
        } else {
            $('.mobile_indicate').removeClass('back_top');
        }
    });

    // 下一页
    $('.mobile_indicate').click(function () {
        var iTop = aOffset[iIndex + 1];
        if (iIndex < aSlide.length - 1) {
            $('html,body').animate({ 'scrollTop': iTop }, 300);
        } else {
            $('html,body').animate({ 'scrollTop': 0 }, 300);
        }
        
    })
});
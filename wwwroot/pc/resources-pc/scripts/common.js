/*dom tree 생성이전 시점(프레임)*/


/*dom tree 생성이후 시점(프레임)*/
$(function(){

    /* 래디 콜백 전역 변수*/
    var $BODY = $('body'),
        TOUCH_CLICK = ('ontouchstart' in window) ? 'touchstart' : 'click',
        LAYER_PARENT = '.layer-wrap',
        LAYER_DIM = '.bg-dimmed',   
        stickyScrollObj = null;

    /*래디 콜백 전역 함수*/
    var iscrollReset = function(show, layer){
        MUI.IScrollSingle.iscrollDestroy();
        show();
        MUI.IScrollSingle.iscrollConstructor(layer + ' .layer-iscroll');
    };



/*nature republic*/
MUI.slide.LayerSwiper = MUI.slide.init('.col1 .swiper-container','swiper', {
    spaceBetween: 0,
    loop: true,
    speed: 1500,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: '.col1 .swiper-button-next',
        prevEl: '.col1 .swiper-button-prev',
    },
    pagination: {
        el: '.col1 .swiper-pagination',
        clickable: true,
    },
});

$('.col1').on('mouseenter', function(){
    $('.col1 .swiper-button').addClass('active');
});
$('.col1').on('mouseleave', function(){
    $('.col1 .swiper-button').removeClass('active');
});

MUI.slide.init('.col3 .swiper-container','swiper', {
    slidesPerView: 7,
    freeMode: true,
    spaceBetween: 10,
    loop: true,
});




/* 유틸start-------------------------------------------------*/

//ie 스크롤 오류
if(navigator.userAgent.match(/Trident\/7\./)) {
    
    $('body').on("mousewheel", function () {
        if($('body').hasClass('fixed')) return;
        event.preventDefault();

        var wheelDelta = event.wheelDelta;

        var currentScrollPosition = window.pageYOffset;
        window.scrollTo(0, currentScrollPosition - wheelDelta);
    });
}



//tooltip 토글
if($('.tooltip-box').length){
    MUI.event.toggle('.tooltip-box > button', null, true, function(logic, layer) {
        $('.tooltip-box .layer-tooltip').hide();
        $('.tooltip-box button').removeClass('active');
        logic();
        layer.prev().addClass('active');
    });
    $('.tooltip-box .layer-tooltip-close').on('click', function(){
        //var $layer = $('.' + $(this).data('target'));
        //$layer.hide();
        $('.tooltip-box .layer-tooltip').hide();
        $('.tooltip-box button').removeClass('active');
    });
}


//공유하기 토글버튼
if($('.toggle-share').length) {
    MUI.event.toggle('.toggle-share .toggle-share-btn', null, false, function(logic, layer) {
        //console.log('toggle');
        logic();
    });
}

//수정,삭제,신고 토글버튼
if($('.toggle-modified').length) {

    function modifiedReset() {
        $('.toggle-modified .toggle-modified-btn').removeClass('active');
        $('.toggle-modified .toggle-modified-list').removeClass('active');
    }
    
    $(document).on('click','.toggle-modified .toggle-modified-btn', function(e) {
        if($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).parent().find('.toggle-modified-list').removeClass('active');
        }
        else{
            modifiedReset();

            $(this).addClass('active');
            $(this).parent().find('.toggle-modified-list').addClass('active');
        }
    });

    $(document).on('click','.toggle-modified .modified-close-btn', function(e) {
        modifiedReset();
        return false;
    });

}

//footer 토글버튼
if($('.toggle-footer').length) {
    MUI.event.toggle('.toggle-footer .toggle-footer-btn', null, false, function(logic, layer) {
        //console.log('toggle');
        logic();
    });
}

//로딩효과
if($(".progress-container").length) {
    var inputs = $(".progress-container").find($("label") );

    for(var i =0 ; i< inputs.length; i ++){ 
        var index = i +1;
        var time = ((inputs.length)-i ) * 100;
        $(".progress-container label:nth-child("+ index+")").css( "-webkit-animation", "anim 5s "+time+"ms infinite ease-in-out" );
        $(".progress-container label:nth-child("+index+")").css( "-animation", "anim 5s "+time+"ms infinite ease-in-out" );
    }
}



//gotop
if($('.fixedRight .btn-goTop').length){
    MUI.event.goTop($('.fixedRight .btn-goTop'));
    MUI.event.topScrollCh($('.fixedRight'));
    $(window).on('scroll', function(){
        MUI.event.topScrollCh($('.fixedRight'));
    });
}


/* -------------------------------------------------유틸end*/

/* 탭 전환start-------------------------------------------------*/
if($('.layer-login .tab-normal').length){
    MUI.event.taps('.layer-login .tab-normal', false, function(swap){
        setTimeout(function(){
            if($('.layer-login-ty01').hasClass('active')){
                MUI.layer.calculate('.layer-login-ty01');
            }
            else if($('.layer-login-ty02').hasClass('active')){
                MUI.layer.calculate('.layer-login-ty02');
            }
            //MUI.IScrollSingle.iscrollRefresh(500);
        },0);
        swap();
        
    });
}

if($('.layer-carSelect .tab-carSelect').length){
    MUI.event.taps('.layer-carSelect .tab-carSelect', false, function(swap){
        setTimeout(function(){
            if($('.layer-carSelect').hasClass('active')){
                MUI.layer.calculate('.layer-carSelect');
            }
        },0);
        swap();
        
    });
}


//특가상품 하단 탭
if($('.specials-list .tab-normal').length){

    MUI.event.taps('.specials-list .tab-normal', false, function(swap){
        swap();
    });
}

/* -------------------------------------------------탭 전환end*/


/* 견적start-------------------------------------------------*/
    //견적 상단 슬리이더
    if($('.estimate-wrap .detail-view-list').length) {
        $('.estimate-wrap .detail-view-list-wrap .swiper-pagination-wrap').hide();      
        if($('.estimate-wrap .detail-view-list .swiper-slide').length >= 2) {
            $('.estimate-wrap .detail-view-list-wrap .swiper-pagination-wrap').show();
            MUI.slide.init('.estimate-wrap .detail-view-list','swiper', {
                loop: true,
                pagination: {
                    el: '.estimate-wrap .detail-view-list-wrap .swiper-pagination',
                    clickable: true,
                },
                effect: 'flip',
            });
        }
        
    }

    //견적 스티키 
    if($('.estimate-wrap .detail-layer-nav').length) {
        $(window).on('scroll', function(e) {
            var scrollPos = window.scrollY || window.pageYOffset,
                $target = $('.detail-layer-nav-wrap'),
                $parent = $('.detail-layer-items-wrap'),
                stickyPos = $parent.height() - $target.find('.detail-layer-nav').height();
                parentBottomPos = $parent.offset().top + stickyPos;
                targetPos = $target.offset().top;

            if(scrollPos >= targetPos) {
                if(scrollPos >= parentBottomPos){ 
                    $target.removeClass('fixed');
                    $target.find('.detail-layer-nav').css({top: $parent.height()});
                }
                else{
                    $target.addClass('fixed');
                    $target.find('.detail-layer-nav').css({top: 0});
                }
            }
            else{
                $target.removeClass('fixed');
            }
        });
    }

    //견적 스티키 2
    if($('.estimate-wrap .detail-sticky-items').length) {
        $(window).on('scroll', function(e) {
            var scrollPos = window.scrollY || window.pageYOffset,
                $target = $('.detail-sticky-items'),
                $parent = $('.detail-layer-items-wrap'),
                $targetScroll = $target.find('.detail-sticky-iscroll'),
                parentBottomPos = $parent.offset().top + $parent.height() - $targetScroll.height(),
                _navHeight = 98,
                targetPos = $target.offset().top;

            if(scrollPos >= targetPos) {
                if(scrollPos >= parentBottomPos + _navHeight){
                    $target.find('.detail-sticky').scrollTop(0);
                    $target.removeClass('fixed');
                    $target.find('.detail-sticky').css({top: $parent.height()-$targetScroll.height() + _navHeight});
                    if(stickyScrollObj){
                        //stickyScrollObj.destroy();
                        //$targetScroll.removeAttr('style'); 
                        //stickyScrollObj = null;
                    }
                }
                else {
                    $target.addClass('fixed');
                    $target.find('.detail-sticky').css({top: _navHeight});
                    if(stickyScrollObj){
                        //stickyScrollObj.refresh();
                    }
                    if(!stickyScrollObj && $targetScroll.height() > $(window).height()) {
                        //stickyScrollObj = new IScroll('.detail-sticky', { 
                            //scrollbars: true,
                            //mouseWheel: true,
                            //interactiveScrollbars: true,
                            //shrinkScrollbars: 'scale',
                            //fadeScrollbars: true,
                        //});
                    }
                    
                }
                
            }
            else{
                $target.find('.detail-sticky').scrollTop(0);
                $target.removeClass('fixed');
                if(stickyScrollObj){
                    //stickyScrollObj.destroy();
                    //$targetScroll.removeAttr('style'); 
                    //stickyScrollObj = null;
                }
                
            }
        });
    }

    //견적 텝이동
    if($('.estimate-wrap .detail-layer-nav').length) {
        MUI.event.goTarget('.menu-link', $('.estimate-wrap .detail-layer-nav').height());

        $(window).on('scroll', function(){
            var scrollTop = $(this).scrollTop();
            MUI.event.scrollTaps(scrollTop, $('.estimate-wrap .layer-item'), $('.estimate-wrap .detail-layer-nav'));
        });
    }
    
    //견적 step1 라디오버튼 선택
    if($('.estimate-wrap .item-step1').length) {
        $('.estimate-wrap .item-step1').on('change', '.radio-box input', function(e){
            if(e.target.value === 'E'){
                $('.estimate-wrap .electric').addClass('active');
            }
            else{
                $('.estimate-wrap .electric').removeClass('active');
            }
        });
    }

    //견적 step2 모델 선택
    if($('.estimate-wrap .item-step2').length) {
        MUI.event.toggle('.item-step2 .model-toggle-btn', '.item-step2 .model-toggle-cont', false, function(logic, layer) {
            //console.log('toggle');
            //$('.estimate-wrap .item-step2 input').prop('checked', false);
            logic();
        });
    }

    //견적 step6 계약조건 선택
    if($('.estimate-wrap .item-step6').length) {
        MUI.event.toggle('.item-step6 .model-toggle-btn', '.item-step6 .model-toggle-cont', true, function(logic, layer) {
            //console.log('toggle');
            logic();
        });
    }

    //견적 기본정보 토글
    if($('.summary-table-wrap .summary-toggle-btn').length) {
        MUI.event.toggle('.summary-table-wrap .summary-toggle-btn', '.summary-table-wrap .summary-toggle-cont', true, function(logic, layer) {
            logic();
        });
    }
    
    //견적 슬라이드 레이어 선택
    if($('.layer-certification').length){
        $('.radio-box2 input').on('change',function(e){
            //console.log($(this).data('type'));
            if($(this).data('type') === 'business') {
                $('.layer-certification .radio-depth').addClass('active');
            }
            else{
                $('.layer-certification .radio-depth').removeClass('active');
            }
            MUI.IScrollSingle.iscrollRefresh(500);
        }); 
    }    

/* -------------------------------------------------견적end*/



/* 메인페이지start-------------------------------------------------*/
    //메인 상단 슬라이더
    if($('.main-wrap .main-visual-list').length) {
        if($('.main-wrap .main-visual-list li').length >= 2) {
            MUI.slide.init($('.main-wrap .main-visual-list'), 'slick', {
                    slidesToScroll: 1, 
                    infinite: true,
                    autoplay: true,
                    pauseOnHover: false, 
                    prevArrow: $('.slick-prev'),
                    nextArrow: $('.slick-next'),
                    slidesToShow: 1,
                    centerMode: true,
                    variableWidth: true,
                    dots: true,
            });
        }
        else {
            $('.main-wrap .main-visual-list li').css('display','block').css('margin','0 auto');
            $('.slider-btn').css('display','none');
        }
    }
   

    if($('.mainTypeC .swiper-container').length) {
        $('.mainTypeC .swiper-container').each(function(idx, item){
            //console.log(item, idx, this);
            if($(item).find('.swiper-slide').length < 3) return;
            $(item).parent().find('.swiper-button-next').show();
            $(item).parent().find('.swiper-button-prev').show();
            MUI.slide.init(item,'swiper', {
                slidesPerView: 2,
                spaceBetween: 30,
                loop: true,
                navigation: {
                    nextEl: $('.mainTypeC .swiper-button-next').get(idx),
                    prevEl: $('.mainTypeC .swiper-button-prev').get(idx),
                },
                /*
                autoplay: {
                    delay: 2000,
                    disableOnInteraction: false,
                },*/
            });
        });
    }

     //메인 다이렉트 견적 슬라이더
    if($('.maincard04 .swiper-container').length) {
        $('.maincard04 .swiper-container').each(function(idx, item){
            //console.log(item, idx, this);
            if($(item).find('.swiper-slide').length < 8) return;
            $(item).parent().find('.swiper-button-next').show();
            $(item).parent().find('.swiper-button-prev').show();
            MUI.slide.init(item,'swiper', {
                slidesPerView: 7,
                spaceBetween: 10,
                loop: true,
                navigation: {
                    nextEl: $('.maincard04 .swiper-button-next').get(idx),
                    prevEl: $('.maincard04 .swiper-button-prev').get(idx),
                },
                /*
                autoplay: {
                    delay: 2000,
                    disableOnInteraction: false,
                },*/
            });
        });
    }

    if($('.mainTypeA .swiper-container').length) {
        $('.mainTypeA .swiper-container').each(function(idx, item){
            //console.log(item, idx, this);
            if($(item).find('.swiper-slide').length < 4) return;
            $(item).parent().find('.swiper-button-next').show();
            $(item).parent().find('.swiper-button-prev').show();
            MUI.slide.init(item,'swiper', {
                slidesPerView: 3,
                spaceBetween: 30,
                loop: true,
                navigation: {
                    nextEl: $('.mainTypeA .swiper-button-next').get(idx),
                    prevEl: $('.mainTypeA .swiper-button-prev').get(idx),
                },
                /*
                autoplay: {
                    delay: 2000,
                    disableOnInteraction: false,
                },*/
            });
        });
    }

    if($('.mainTypeB .swiper-container').length) {
        $('.mainTypeB .swiper-container').each(function(idx, item){
            //console.log(item, idx, this);
            if($(item).find('.swiper-slide').length < 3) return;
            $(item).parent().find('.swiper-button-next').show();
            $(item).parent().find('.swiper-button-prev').show();
            MUI.slide.init(item,'swiper', {
                slidesPerView: 2,
                spaceBetween: 40,
                loop: true,
                navigation: {
                    nextEl: $('.mainTypeB .swiper-button-next').get(idx),
                    prevEl: $('.mainTypeB .swiper-button-prev').get(idx),
                },
                /*
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                },
                autoplay: {
                    delay: 2000,
                    disableOnInteraction: false,
                },*/
            });
        });
    }

    if($('.maincardD .swiper-container').length) {
        $('.maincardD .swiper-container').each(function(idx, item){
            //console.log(idx, item, this);
            if($(item).find('.swiper-slide').length < 2) return;
            $(item).parent().find('.swiper-button-next').show();
            $(item).parent().find('.swiper-button-prev').show();
            MUI.slide.init(item,'swiper', {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                navigation: {
                    nextEl: $('.maincardD .swiper-button-next').get(idx),
                    prevEl: $('.maincardD .swiper-button-prev').get(idx),
                },
                /*
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false,
                },*/
            });
        });
    }

    if($('.maincard08 .swiper-container').length) {
        $('.maincard08 .swiper-container').each(function(idx, item){
            //console.log(item, idx, this);
            if($(item).find('.swiper-slide').length < 3) return;
            $(item).parent().find('.swiper-button-next').show();
            $(item).parent().find('.swiper-button-prev').show();
            MUI.slide.init(item,'swiper', {
                slidesPerView: 2,
                spaceBetween: 30,
                loop: true,
                navigation: {
                    nextEl: $('.maincard08 .swiper-button-next').get(idx),
                    prevEl: $('.maincard08 .swiper-button-prev').get(idx),
                },
                /*
                autoplay: {
                    delay: 2000,
                    disableOnInteraction: false,
                },*/
            });
        });
    }

/* -------------------------------------------------메인페이지end*/




/*브라우저 리사이즈*/
if($(".layer-iscroll").length){
    $(window).on("resize",function(){
        MUI.IScrollSingle.iscrollRefresh(null);
    });
}


});


/*브라우저 모든 resources 다운 완료시점(프레임)*/
$(window).on('load', function(){


});
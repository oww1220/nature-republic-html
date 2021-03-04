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

//header 호버
$('.header-menu-btn, .header-nav').on('focusin mouseenter', function(){
    $('.header-nav').show();
    $('.header-menu-btn').addClass('hover');
});
$('.header-menu-btn, .header-nav').on('focusout mouseleave', function(){
    $('.header-nav').hide(); 
    $('.header-menu-btn').removeClass('hover');
});

//header top 고객센터 호버
$('.extra-menu > .customer > a, .extra-menu > .customer > .link').hover(function(){
    $('.extra-menu > .customer > .link').toggle();
})

//textarea 자동높이 조절
if($('.textarea.auto-height').length){
    autosize($('.textarea.auto-height textarea'));
}

//차트그리기
if($('.pie-chart').length){
    $('.pie-chart').easyPieChart({
        size:130,
        lineWidth: 7,
        barColor:'#F04040',
        trackColor:'#EBEBEB',
        scaleColor:'#fff',
        lineCap: 'butt',
        onStep: function(from, to, percent) {
            $(this.el).find('.percent span').text(Math.round(percent));
        }
    });
}

//댓글쓰기 키업이벤트
if($('.unit-text-write-wrap').length) {
    var keyTarget = $('.unit-text-write-wrap');
    keyTarget.on('keyup', 'textarea', function(e){
        if(e.target.value) {
            keyTarget.find('button').addClass('active');
        }
        else{
            keyTarget.find('button').removeClass('active');
        }
    });
}

//주소검색 키업이벤트
if($('.layer-address').length) {
    var addressTarget = $('.layer-address .layer-address-top');
    addressTarget.on('keyup', 'input', function(e){
        if(e.target.value) {
            addressTarget.find('button').addClass('active');
        }
        else{
            addressTarget.find('button').removeClass('active');
        }
    });
}

//카운트
if($('.great .counter').length){
    //$('.great span').css({'padding-left':$('.great .counter').width() + 15});
    $('.great .counter').counterUp({
        delay: 10,
        time: 2000
    });
}

//전체동의 열고 닫기
if($('.chk-agree-list').length){
    MUI.event.toggle('.chk-agree-list .agree-toggle-btn', '.chk-agree-list .agree-toggle-cont', false, function(logic, layer) {
        //console.log(layer);
        if($(".chk-agree-list").is(':visible')){
            MUI.IScrollSingle.iscrollRefresh(500);
        }
        logic();
    });
}

//필터 범위 슬라이드
if($('.section-filter-result').length) {
    $('#slider-price').slider({
        range: true,
        min: 0,							// 최저
        max: 80,						// 최고
        orientation: 'horizontal',		// 바타입 수평
        step: 20,						// 스텝
        values: [0, 80],				// 디폴트 값
        start: function(event, ui) {	// start
        },
        slide: function(event, ui) {	// mouse movement
        },
        stop: function(event, ui) {		// stop
        },
        change: function(event, ui) {
            var min = ui.values[0],
                max = ui.values[1];

                console.log(ui, min, max);
            // update form fields
            $('#min_slider_price').val(min);
            $('#max_slider_price').val(max);

            $('.price_box_case .price-txt span').each(function(idx, item){
                var text = $(item).text(),
                    minTxt = min === 0 ? min + '원' : min + '만원',
                    maxTxt = max + '만원',
                    minRegex = RegExp(minTxt),
                    maxRegex = RegExp(maxTxt);
                if(minRegex.test(text) || maxRegex.test(text)) {
                    $(item).addClass('active');
                }
                else{
                    $(item).removeClass('active');
                }
            });

        }
    });

    $('.section-filter-result .price-all').on('click', function(e) {
        //console.log(11);
        $('#slider-price').slider('values', [0, 80]);
    });
    $('.section-filter-result .filter-reset-btn').on('click', function(e) {
        $('#slider-price').slider('values', [0, 80]);
        $('.section-filter-result input').prop('checked', false);
    });
}

//필터 버튼 토글
MUI.event.toggle('.filter-result-open', null, true, function(logic, layer) {
    logic();
});

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


//하단 버튼바 있을시 footer padding
if($('.estimateBottom').length && $('.estimateBottom').is(':visible')){
    $('.footer').css({'padding-bottom': 200});
}

//데이트피커
MUI.event.calander(".datepicker", {
    dateFormat: 'yy-mm-dd',
    showMonthAfterYear: true,
    changeYear: false,
    changeMonth: false,
    showOn: "both",
    buttonText: "날짜선택",
    yearSuffix: '.',
    monthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
    monthNamesShort: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
    dayNames: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
},
function(e){
    //console.log("날짜변경됨");
});

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


//토스트 메시지 
if($('.toast-message-login').length){
    MUI.event.toastMessage('', 'toast-message-login', 5000);
}

if($('.toast-message-sale').length){
    MUI.event.toastMessage('', 'toast-message-sale', 5000);
}

//gotop
if($('.fixedRight .btn-goTop').length){
    MUI.event.goTop($('.fixedRight .btn-goTop'));
    MUI.event.topScrollCh($('.fixedRight'));
    $(window).on('scroll', function(){
        MUI.event.topScrollCh($('.fixedRight'));
    });
}

//커스텀 셀렉트
MUI.event.changeSelect('.change-Select select');
MUI.event.customSelect('.custom-select');

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

/* 레이어팝업start-------------------------------------------------*/
    //사전예약 슬라이드 팝업
    if($('.layer-reservation').length) {
        MUI.layer.openClick('.layer-reservation-open', LAYER_DIM, LAYER_PARENT, true, function(show, layer){
            //console.log('open');
            //iscrollReset(show, layer);
            show();
        });
    }

    //본인인증 슬라이드 팝업
    if($('.layer-certification').length) {
        MUI.layer.openClick('.layer-certification-open', LAYER_DIM, LAYER_PARENT, true, function(show, layer){
            //console.log('open');
            //iscrollReset(show, layer);
            show();
        });
    }

    //슬라이드 팝업 공통 닫기
    if($('.layer-slide').length) {
        MUI.layer.closeClick('.layer-slide-close', LAYER_DIM, LAYER_PARENT, true, function(hide){
            //console.log('close');
            MUI.IScrollSingle.iscrollDestroy();
            hide();
        });
    }

    //고객후기 모달 팝업
    if($('.layer-review-write-detail').length) {
        MUI.layer.openClick('.layer-review-write-detail-open', LAYER_DIM, LAYER_PARENT, false, function(show){
            if(MUI.slide.LayerSwiper) MUI.slide.LayerSwiper.destroy();
        
            //console.log('open');
            show();
            //고객후기 레이어팝업 상단 슬리이더
            $('.layer-review-write-detail .detail-view-list .swiper-pagination-wrap').hide();      
            if($('.layer-review-write-detail .detail-view-list .swiper-slide').length >= 2) {

                setTimeout(function(){
                    $('.layer-review-write-detail .detail-view-list .swiper-pagination-wrap').show();
                    MUI.slide.LayerSwiper = MUI.slide.init('.layer-review-write-detail .detail-view-list','swiper', {
                        loop: true,
                        autoHeight:true,
                        pagination: {
                            el: '.layer-review-write-detail .swiper-pagination',
                            clickable: true,
                        },
                        navigation: {
                            nextEl: '.layer-review-write-detail .swiper-button-next',
                            prevEl: '.layer-review-write-detail .swiper-button-prev',
                        },
                    });
                    MUI.slide.LayerSwiper.on('slideChange', function() { 
                        setTimeout(function(){
                            MUI.layer.calculate('.layer-review-write-detail');
                        },200);
                    });
                },0);
                
            }
            
        });
    }

    //후기작성 모달 팝업
    if($('.layer-review-write-default').length) {
        MUI.layer.openClick('.layer-review-write-default-open', LAYER_DIM, LAYER_PARENT, false, function(show){
            //console.log('open');
            show();
        });
    }

    //차량선택 모달 팝업
    if($('.layer-carSelect').length) {
        MUI.layer.openClick('.layer-carSelect-open', LAYER_DIM, LAYER_PARENT, true, function(show, layer){
            //console.log('open');
            //iscrollReset(show, layer);
            show();
        });
    }

    //프로모션 모달 팝업
    if($('.layer-promotion').length) {
        MUI.layer.openClick('.layer-promotion-open', LAYER_DIM, LAYER_PARENT, true, function(show, layer){
            //console.log('open');
            //iscrollReset(show, layer);
            show();
        });
    }


    //운전면허 모달 팝업
    if($('.layer-license').length) {
        MUI.layer.openClick('.layer-license-open', LAYER_DIM, LAYER_PARENT, true, function(show, layer){
            //console.log('open');
            //iscrollReset(show, layer);
            show();
        });
    }

    //주소찾기 모달 팝업
    if($('.layer-address').length) {
        MUI.layer.openClick('.layer-address-open', LAYER_DIM, LAYER_PARENT, true, function(show, layer){
            //console.log('open');
            //iscrollReset(show, layer);
            show();
        });
    }

    //제휴카드 혜택안내 모달 팝업
    if($('.layer-cards').length) {
        MUI.layer.openClick('.layer-cards-open', LAYER_DIM, LAYER_PARENT, true, function(show, layer){
            //console.log('open');
            //iscrollReset(show, layer);
            show();
        });
    }

    //푸터 이메일주소무단수집거부 팝업
    if($('.layer-emailRejection').length) {
        MUI.layer.openClick('.layer-emailRejection-open', LAYER_DIM, LAYER_PARENT, true, function(show, layer){
            //console.log('open');
            show();
        });
    }

    //마이페이지 견적상세보기  팝업
    if($('.layer-detail').length) {
        MUI.layer.openClick('.layer-detail-open', LAYER_DIM, LAYER_PARENT, true, function(show, layer){
            //console.log('open');
            //iscrollReset(show, layer);
            show();
        });
    }

    //마이페이지 계약정보 팝업
    //if($('.layer-mypageDetail').length) {
        //MUI.layer.openClick('.layer-mypageDetail-open', LAYER_DIM, LAYER_PARENT, true, function(show, layer){
            //console.log('open');
            //show();
        //});
    //}

    //마이페이지 차량비교하기  팝업
    if($('.layer-compare3').length) {
        MUI.layer.openClick('.layer-compare-open', LAYER_DIM, LAYER_PARENT, true, function(show, layer){
            //console.log('open');
            //iscrollReset(show, layer);
            show();
        });
    }
    if($('.layer-compare2').length) {
        MUI.layer.openClick('.layer-compare-open', LAYER_DIM, LAYER_PARENT, true, function(show, layer){
            //console.log('open');
            //iscrollReset(show, layer);
            show();
        });
    }

    //안내문구 공통 모달 팝업
    if($('.layer-infos').length) {
        MUI.layer.openClick('.layer-infos-open', LAYER_DIM, LAYER_PARENT, true, function(show, layer){
            //console.log('open');
            //iscrollReset(show, layer);
            show();
        });
    }

    //모달 팝업 공통 닫기
    if($('.layer-popup').length) {
        MUI.layer.closeClick('.layer-popup-close', LAYER_DIM, LAYER_PARENT, true, function(hide){
            //console.log('close');
            MUI.IScrollSingle.iscrollDestroy();
            hide();
        });
    }

    //로그인 레이어팝업
    if($('.layer-login').length) {
        MUI.layer.openClick('.layer-login-open', LAYER_DIM, LAYER_PARENT, true, function(show, layer){
            //iscrollReset(show, layer);
            show();
        });
        MUI.layer.closeClick('.layer-login-close', LAYER_DIM, LAYER_PARENT, true, function(hide){
            //console.log('close');
            //MUI.IScrollSingle.iscrollDestroy();
            hide();
        });
    }

    //bg-dimmed 클릭시 열린 레이어 들 닫기
    MUI.layer.closeClick(LAYER_DIM, LAYER_DIM, LAYER_PARENT, true, function(hide){
        //console.log('close');
        MUI.IScrollSingle.iscrollDestroy();
        hide();
    });
/* -------------------------------------------------레이어팝업end*/

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

/* 기획전start-------------------------------------------------*/
    //기획전 상단 슬라이더
    if($('.exhibition-wrap .exhibition-view-list').length) {
        if($('.exhibition-wrap .exhibition-view-list li').length >= 2) {
            MUI.slide.init($('.exhibition-wrap .exhibition-view-list'), 'slick', {
                    slidesToScroll: 1, 
                    infinite: true,
                    autoplay: true,
                    pauseOnHover: false, 
                    // arrows: false,
                    prevArrow: $('.slick-prev'),
                    nextArrow: $('.slick-next'),
                    slidesToShow: 1,
                    centerMode: true,
                    variableWidth: true,
                    dots: true,

            });
        }
        else {
            $('.exhibition-wrap .exhibition-view-list li').css('display','block').css('margin','0 auto');
            $('.slider-btn').css('display','none');
        }
    }

    //기획전 스틱키
    if($('.exhibition-wrap .exhibition-detail-middle').length) {

        MUI.event.goTarget('.exhibition-detail-middle .menu-link', $('.exhibition-wrap .exhibition-detail-middle').height());

        var $target = $('.exhibition-wrap .exhibition-detail-middle'),
            targetHeight = $target.outerHeight();
            targetTop = $target.offset().top;

        $target.css({height: targetHeight});
        $(window).on('scroll', function(){
            var scrollTop = $(window).scrollTop();
            MUI.event.scrollTaps(scrollTop, $('.exhibition-wrap .exbit-section'), $('.exhibition-wrap .exhibition-detail-middle'));
            if(scrollTop >= targetTop) {
                $target.addClass('sticky');
            }
            else{
                $target.removeClass('sticky');
                $target.find('.menu-link').removeClass('active');
            }
        });
    }
/* -------------------------------------------------기획전end*/

/* 특가상품start-------------------------------------------------*/
    //특가상품 사전예약 슬라이더
    if($('.specials-wrap .specials-more-list').length) {
        MUI.slide.init($('.specials-wrap .specials-more-list'), 'slick', {
                slidesToScroll: 1, 
                infinite: true,
                autoplay: false,
                // arrows: true,
                prevArrow: $('.slick-prev'),
		        nextArrow: $('.slick-next'),
                slidesToShow: 1,
                centerMode: true,
                variableWidth: true,
                dots: true,

        });
    }

    //특가상품 상단 슬라이더
    if($('.specials-wrap .specials-view-list').length) {
        MUI.slide.init($('.specials-wrap .specials-view-list'), 'slick', {
				slidesToScroll: 1, 
				infinite: true,
				autoplay: false,
                arrows: true,
                slidesToShow: 3,
                centerMode: true,
                variableWidth: true,
                dots: true,

        });
    }

/* -------------------------------------------------특가상품end*/

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

/* 계약start-------------------------------------------------*/
    //계약화면 메뉴 라디오버튼 선택
    if($('.contract-wrap .menu-radio-box').length) {
        $('.contract-wrap .menu-radio-box').on('change', '.radio-box input', function(e){
            if(e.target.value === 'N'){
                $('.contract-wrap .detail-layer-normal').addClass('active');
            }
            else{
                $('.contract-wrap .detail-layer-normal').removeClass('active');
            }
        });
        $('.contract-wrap .menu-radio-box').on('change', '.radio-box input', function(e){
            if(e.target.value === 'I'){
                $('.contract-wrap .detail-layer-integrated').addClass('active');
            }
            else{
                $('.contract-wrap .detail-layer-integrated').removeClass('active');
            }
        });
    }

    //계약 기본정보 토글
    if($('.contract-wrap .contract-toggle-btn').length) {
        MUI.event.toggle('.contract-wrap .contract-toggle-btn', '.contract-wrap .contract-toggle-cont', true, function(logic, layer) {
            logic();
        });
    }
/* -------------------------------------------------계약end*/

/* 신차장 다이렉트 start-------------------------------------------------*/

    if($('.direct-wrap .intro-list02 .swiper-container').length) {
        if($('.direct-wrap .intro-list02 .swiper-container .swiper-slide').length >= 2) {
            $('.direct-wrap .intro-list02 .swiper-container .swiper-pagination-wrap').show();
                MUI.slide.init('.direct-wrap .intro-list02 .swiper-container','swiper', {
                spaceBetween: 0,
                //cssMode: true,
                loop : true,
                //speed:1200,
                preloadImages: true,
                navigation : {
                    nextEl : '.direct-wrap .intro-list02 .swiper-button-next',
                    prevEl : '.direct-wrap .intro-list02 .swiper-button-prev', 
                },
                pagination: {
                    el: '.direct-wrap .intro-list02 .swiper-pagination',
                    clickable: true,
                    renderBullet: function (index, className) {
                    return '<button class="' + className + '">' + ('STEP')+(index + 1) + '</button>';
                    },
                },
            });
            
        }
    }
    

    //자주묻는질문 아코디언
    if($('.direct-faq').length){
        MUI.event.toggle('.direct-faq .direct-toggle-btn', '.direct-faq .direct-toggle-cont', false, function(logic, layer) {
            //console.log('toggle');
            logic();
        });
    }
    if($('.direct-information .direct-infos').length){
        MUI.event.toggle('.direct-information .direct-infos .direct-toggle-btn', '.direct-information .direct-infos .direct-toggle-cont', false, function(logic, layer) {
            //console.log('toggle');
            logic();
        });
    }

    //개인사업자 이용안내 
    if($('.direct-wrap .service-step').length) {
        if($('.direct-wrap .service-step li').length >= 2) {
            MUI.slide.init($('.direct-wrap .service-step'), 'slick', {
                    slidesToScroll: 1, 
                    infinite: true,
                    autoplay: false,
                    arrows: true,
                    // prevArrow: $('.slick-prev'),
                    // nextArrow: $('.slick-next'),
                    slidesToShow: 1,
                    centerMode: true,
                    variableWidth: true,
                    dots: true,
            });
        }
    }
/* ------------------------------------------------- 신차장 다이렉트 end*/

/* 카타르시스start-------------------------------------------------*/
    
    if($('.click-star').length) {
        $('.click-star .star').click(function(e){
            $(this).parents().children('.star').removeClass('active');
            $(this).addClass('active').prevAll('.star').addClass('active');
            return false;
        });
    }
/* -------------------------------------------------카타르시스end*/

/* 로그인start-------------------------------------------------*/

/* -------------------------------------------------로그인end*/



/* 고객센터start-------------------------------------------------*/
//고객센터 키업이벤트
if($('.sticky-search-wrap').length) {
    var addressTarget = $('.sticky-search-wrap .sticky-search');
    addressTarget.on('keyup', 'input', function(e){
        if(e.target.value) {
            addressTarget.find('button').addClass('active');
        }
        else{
            addressTarget.find('button').removeClass('active');
        }
    });
}
//고객센터 열고 닫기
if($('.customer-list').length){
    MUI.event.toggle('.customer-list .customer-toggle-btn', '.customer-list .customer-toggle-cont', false, function(logic, layer) {
        //console.log('toggle');
        logic();
    });
}

/* -------------------------------------------------고객센터end*/

/* 마이페이지start-------------------------------------------------*/

    //마이페이지 쿠폰 키업이벤트
    if($('.mypage-wrap .coupon-enroll').length) {
        var addressTarget = $('.mypage-wrap .coupon-enroll .coupon-code');
        addressTarget.on('keyup', 'input', function(e){
            if(e.target.value) {
                addressTarget.find('button').addClass('active');
            }
            else{
                addressTarget.find('button').removeClass('active');
            }
        });
    }

    //마이페이지 견적보관함 체크박스
    if($('.mypage-wrap .mypage-estimate-list').length) {

        $('.mypage-wrap .mypage-estimate-list input:checkbox').change(function() {
            if($(this).is(":checked")) {
                $(this).parent().parent().parent().addClass('active');
            }
            else{
                $(this).parent().parent().parent().removeClass('active');
            }
        });
    }

    //마이페이지 견적비교 내용 토글
    if($('.mypage-wrap .mypage-estimate-list').length){
        MUI.event.toggle('.mypage-wrap .mypage-estimate-list .coupon-toggle-btn', '.mypage-wrap .mypage-estimate-list .item-depth', false, function(logic, layer) {
            //console.log('toggle');
            logic();
        });
    }

/* -------------------------------------------------마이페이지end*/

/* 친구 추천 start-------------------------------------------------*/
if($('.friend-wrap .point-step .swiper-container').length) {
    if($('.friend-wrap .point-step .swiper-container .swiper-slide').length >= 2) {
        $('.friend-wrap .point-step .swiper-container .swiper-pagination-wrap').show();
            MUI.slide.init('.friend-wrap .point-step .swiper-container','swiper', {
            spaceBetween: 0,
            //cssMode: true,
            loop : true,
            //speed:1200,
            preloadImages: true,
            navigation : {
                nextEl : '.friend-wrap .point-step .swiper-button-next',
                prevEl : '.friend-wrap .point-step .swiper-button-prev', 
            },
            pagination: {
                el: '.friend-wrap .point-step .swiper-pagination',
            },
        });
        
    }
}
/* ------------------------------------------------- 친구추천 end*/

/* Footer start-------------------------------------------------*/
if($('.footer-bottom-wrap .award-wrap').length) {
    $('.footer-bottom-wrap .slide-btn').hide(); 
    if($('.footer-bottom-wrap .award-wrap .swiper-slide').length >= 5) {
        $('.footer-bottom-wrap .slide-btn').show(); 
        var footerSlideObj =  MUI.slide.init('.footer-bottom-wrap .award-wrap .award-list','swiper', {
            slidesPerView: 5,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },

        });
        $('.footer-bottom-wrap .slide-btn .pause').on('click',function(){
            footerSlideObj.autoplay.stop();	
            $(this).hide();
            $('.footer-bottom-wrap .slide-btn .play').show();
        });
        $('.footer-bottom-wrap .slide-btn .play').on('click',function(){
            footerSlideObj.autoplay.start();	
            $(this).hide();
            $('.footer-bottom-wrap .slide-btn .pause').show();
        });
    }

}

/* -------------------------------------------------Footer end*/


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
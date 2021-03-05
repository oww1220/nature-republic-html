/*dom tree 생성이전 시점(프레임)*/
//rem폰트설정
MUI.resize.font();

/*dom tree 생성이후 시점(프레임)*/
$(function(){

    /*전역 변수*/
    var $BODY = $('body'),
        TOUCH_CLICK = ('ontouchstart' in window) ? 'touchstart' : 'click',
        LAYER_PARENT = '.layer-wrap',
        LAYER_DIM = '.bg-dimmed';

/* 유틸start-------------------------------------------------*/
    //호스트환경 체크
    MUI.resize.chk($BODY);

    //리사이즈시 rem폰트설정, 호스트환경 체크
    MUI.resize.resize($BODY);

    //해더 상단네비 엑티브시 센터
    if($('.header-nav').length) { MUI.event.navCenter($('.header-nav'), 'active'); }

    //서브네비 엑티브시 센터
    if($('.section-nav').length) { MUI.event.navCenter($('.section-nav'), 'active'); }
    
    //textarea 자동높이 조절
    if($('.textarea.auto-height').length){
        autosize($('.textarea.auto-height textarea'));
    }

    //fixedRight 조건처리
    if($('.fixedRight').length) {
        if(
            ($('.catharsis-wrap .unit-text-write-wrap').length) || 
            ($('.estimateBottom').length && $('.estimateBottom').is(':visible'))
        ){
            $('.fixedRight').addClass('noFixBottom');
        }
    }
    
    //setTimeout(function(){
        //if(!$('#launcher').length) {
            //$('.fixedRight').addClass('noLauncher');
        //}
    //},2500)
    

    //전체동의 열고 닫기
    if($('.chk-agree-list').length){
        MUI.event.toggle('.chk-agree-list .agree-toggle-btn', '.chk-agree-list .agree-toggle-cont', false, function(logic, layer) {
            //console.log('toggle');
            logic();
        });
    }

    //drawer버튼 열기
    MUI.event.toggle('.btn-drawer', null, false, function(logic, layer) {
        //console.log(11);
        $BODY.addClass("fixed");
        $('.btn-drawer-close').addClass('active');
        logic();
    });

    //drawer버튼 닫기
    MUI.event.toggle('.btn-drawer-close', null, false, function(logic, layer) {
        $BODY.removeClass("fixed");
        $('.btn-drawer').removeClass('active');
        logic();
        $('.drawer').scrollTop(0);
    });

    //gotop
    if($('.fixedRight .btn-goTop').length){
        MUI.event.goTop($('.fixedRight .btn-goTop'));
        MUI.event.topScrollCh($('.fixedRight'));
        $(window).on('scroll', function(){
            MUI.event.topScrollCh($('.fixedRight'));
        });
    }

    //차트그리기
    if($('.pie-chart').length){
        $('.pie-chart').easyPieChart({
            size:80,
            lineWidth: 5,
            barColor:'#F04040',
            trackColor:'#EBEBEB',
            scaleColor:'#fff',
            lineCap: 'butt',
			onStep: function(from, to, percent) {
                $(this.el).find('.percent span').text(Math.round(percent));
			}
		});
    }

    //카운트
    if($('.great .counter').length){
        $('.great .counter').counterUp({
            delay: 10,
            time: 2000
        });
    }


    //하단 퀵메뉴 모션
    if($('.fixedBottom').length) { MUI.event.fixedBottom($('.fixedBottom')); }

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
        keyTarget.on('blur', 'textarea',function(e){
            keyTarget.removeClass('active');
        });
        keyTarget.on('focus', 'textarea',function(e){
            keyTarget.addClass('active');
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

//커스텀 셀렉트
MUI.event.changeSelect('.change-Select select');
MUI.event.customSelect('.custom-select');

//레이어 줌
if($('.slide-zoom-wrap').length) {
    MUI.slide.init('.slide-zoom-wrap','swiper', {
        zoom: {
            maxRatio: 4,
            zoomedSlideClass: 'swiper-zoom-target',
        },
        virtualTranslate: true,
    });
}

/* -------------------------------------------------유틸end*/

/* 탭 전환start-------------------------------------------------*/
if($('.specials-list .tab-normal').length){

    MUI.event.taps('.specials-list .tab-normal', false, function(swap){
        swap();
    });
}

if($('.layer-openSource .tab-normal').length){

    MUI.event.taps('.layer-openSource .tab-normal', false, function(swap){
        swap();
    });
}
/* -------------------------------------------------탭 전환end*/
    
/* 레이어팝업start-------------------------------------------------*/
    //계약정보 확인하기 풀팝업
    if($('.layer-mypageDetail').length) {
        MUI.layer.openClick('.layer-mypageDetail-open', LAYER_DIM, LAYER_PARENT, false, function(show){
            //console.log('open');
            show();
        });
    }

    //제휴카드 혜택안내 풀팝업
    if($('.layer-cards').length) {
        MUI.layer.openClick('.layer-cards-open', LAYER_DIM, LAYER_PARENT, false, function(show){
            //console.log('open');
            show();

            if($('.layer-cards .swiper-slide').length === 1) {
                $('.layer-cards .swiper-button-prev').hide();
                $('.layer-cards .swiper-button-next').hide();
                return;
            }

            MUI.slide.init('.layer-cards .cards-lists','swiper', {
                loop: true,
                //speed:1200,
                //autoHeight: true,
                pagination: {
                    el: '.layer-cards .swiper-pagination',
                    type: 'fraction',
                },
                navigation: {
                nextEl: '.layer-cards .swiper-button-next',
                prevEl: '.layer-cards .swiper-button-prev',
                },
            });
        });
    }

    //운전면허 정보안내 풀팝업
    if($('.layer-license').length) {
        MUI.layer.openClick('.layer-license-open', LAYER_DIM, LAYER_PARENT, false, function(show){
            //console.log('open');
            show();
        });
    }

    //주소찾기 풀팝업
    if($('.layer-address').length) {
        MUI.layer.openClick('.layer-address-open', LAYER_DIM, LAYER_PARENT, false, function(show){
            //console.log('open');
            show();
        });
    }

    //게시글작성 풀팝업
    if($('.layer-write').length) {
        MUI.layer.openClick('.layer-write-open', LAYER_DIM, LAYER_PARENT, false, function(show){
            //console.log('open');
            show();
        });
    }

    //안내문구 공통 풀팝업
    if($('.layer-infos').length) {
        MUI.layer.openClick('.layer-infos-open', LAYER_DIM, LAYER_PARENT, false, function(show){
            //console.log('open');
            show();
        });
    }

    //고객후기 풀팝업
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
                        //speed:1200,
                        pagination: {
                            el: '.layer-review-write-detail .swiper-pagination',
                        },
                    });
                },0);
                
            }
            
        });
    }

    //후기작성 풀팝업
    if($('.layer-review-write-default').length) {
        MUI.layer.openClick('.layer-review-write-default-open', LAYER_DIM, LAYER_PARENT, false, function(show){
            //console.log('open');
            show();
        });
    }

    //오픈소스라이선스 팝업
    if($('.layer-openSource').length) {
        MUI.layer.openClick('.layer-openSource-open', LAYER_DIM, LAYER_PARENT, false, function(show){
            //console.log('open');
            show();
        });
    }


    //공유하기 슬라이드 팝업
    if($('.layer-share').length) {
        MUI.layer.openClick('.layer-share-open', LAYER_DIM, LAYER_PARENT, false, function(show){
            //console.log('open');
            show();
        });
    }

    //신고.수정.삭제하기 슬라이드 팝업
    if($('.layer-modified').length) {
        MUI.layer.openClick('.layer-modified-open', LAYER_DIM, LAYER_PARENT, false, function(show){
            //console.log('open');
            show();
        });
    }

    //공동구매/사전예약 슬라이드 팝업
    if($('.layer-reservation').length) {
        MUI.layer.openClick('.layer-reservation-open', LAYER_DIM, LAYER_PARENT, false, function(show){
            //console.log('open');
            show();
        });
    }

    //본인인증 슬라이드 팝업
    if($('.layer-certification').length) {
        MUI.layer.openClick('.layer-certification-open', LAYER_DIM, LAYER_PARENT, false, function(show){
            //console.log('open');
            show();
        });
    }

    //차량선택 슬라이드 팝업
    if($('.layer-carSelect').length) {
        MUI.layer.openClick('.layer-carSelect-open', LAYER_DIM, LAYER_PARENT, false, function(show){
            //console.log('open');
            show();
        }, true);
    }

    //필터 슬라이드 팝업
    if($('.layer-filter').length) {
        MUI.layer.openClick('.layer-filter-open', LAYER_DIM, LAYER_PARENT, false, function(show){
            //alert('open');
            show();
            if(typeof(openSearchPop) === 'function') openSearchPop();
        });

        //필터 슬라이드 내 슬라이드
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

                $('.layer-filter .price-txt span').each(function(idx, item){
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

        $('.layer-filter .price-all').on('click', function(e) {
			$('#slider-price').slider('values', [0, 80]);
        });
        $('.layer-filter .filter-reset-btn').on('click', function(e) {
            $('#slider-price').slider('values', [0, 80]);
            $('.layer-filter input').prop('checked', false);
		});
    
    }

    //프로모션 슬라이드 팝업
    if($('.layer-promotion').length) {
        MUI.layer.openClick('.layer-promotion-open', LAYER_DIM, LAYER_PARENT, false, function(show){
            //console.log('open');
            show();
        });
        
    }

    //슬라이드 팝업 공통 닫기
    if($('.layer-slide').length) {
        MUI.layer.closeClick('.layer-slide-close', LAYER_DIM, LAYER_PARENT, false, function(hide){
            //console.log('close');
            hide();
        });
    }

    //풀 팝업 공통 닫기
    if($('.layer-full').length) {
        MUI.layer.closeClick('.layer-full-close', LAYER_DIM, LAYER_PARENT, false, function(hide){
            //console.log('close');
            hide();
        });
    }

    //로그인 레이어팝업
    if($('.login-wrap').length) {
        MUI.layer.openClick('.layer-login-open', LAYER_DIM, LAYER_PARENT, false, function(show){
            $('.drawer').removeClass('active');
            $('.btn-drawer').removeClass('active');
            show();
        });
        MUI.layer.closeClick('.layer-login-close', LAYER_DIM, LAYER_PARENT, false, function(hide){
            console.log('close');
            hide();
        });
    }

    //bg-dimmed 클릭시 열린 레이어 들 닫기
    MUI.layer.closeClick(LAYER_DIM, LAYER_DIM, LAYER_PARENT, false, function(hide){

        if($('.layer-electricity').hasClass('active')){
            //console.log('전기차보조금 안내일경우 닫을시');
			if(typeof(promCustomer2) === 'function') promCustomer2();
        }

        hide();
    });
/* -------------------------------------------------레이어팝업end*/

/* 메인start-------------------------------------------------*/
    //메인 상단 슬라이더-스와이퍼 슬라이드 버전
    if($('.main-wrap .main-col1 .swiper-container').length) {
        if($('.main-wrap .main-col1 .swiper-container .swiper-slide').length >= 2) {
            $('.main-wrap .main-col1 .swiper-container .swiper-pagination-wrap').show();
            MUI.slide.init('.main-wrap .main-col1 .swiper-container','swiper', {
                spaceBetween: 0,
                loop: true,
                loopAdditionalSlides: 1,
                slidesPerView: 'auto',
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
                //cssMode: true,
                //speed:1200,
                preloadImages: true,
                pagination: {
                    el: '.main-wrap .main-col1 .swiper-pagination',
                    type: 'fraction',
                },
            });
            
        }
    }

    /*
    //메인 상단 슬라이더-슬릭슬라이드 버전
    if($('.main-wrap .main-col1 .main-view-list').length) {
        $('.main-wrap .main-col1 .main-view-list').on('init', function(event, slick){
            var totalValue = slick.slideCount < 10 ? '0' + slick.slideCount : slick.slideCount;
            if(slick.slideCount <= 1) return;
            $(this).append('<div class="main-view-count"><span class="main-view-current">01</span> / <span class="main-view-total">'+ totalValue +'</span></div>');
        });
        MUI.slide.init($('.main-wrap .main-col1 .main-view-list'), 'slick', {
            infinite: false,
            autoplay: false,
            arrows: false,
            useTransform:false,
        });
        $('.main-wrap .main-col1 .main-view-list').on('afterChange', function(event, slick, currentSlide, nextSlide){
            var current = currentSlide + 1,
                currentValue = current < 10 ? '0' + current : current;
            $('.main-view-count .main-view-current').html(currentValue);
        });
    }*/

    //메인 중단 슬라이더
    if($('.main-wrap .main-col5 .swiper-container').length) {
        $('.main-wrap .main-col5 .swiper-container').each(function(idx, item){
            //console.log($(this).find('.swiper-slide').length);
            if($(item).find('.swiper-slide').length < 2) return;
            MUI.slide.init(item,'swiper', {
                loop: true,
                //speed:1200,
                loopAdditionalSlides: 1,
                slidesPerView: 2,
                centeredSlides: true,
            });
        });
    }

    //메인 이미지형 슬라이드
    if($('.main-wrap .main-col9 .swiper-container').length) {

        $('.main-wrap .main-col9 .swiper-container').each(function(idx, item){
            //console.log(item, idx, this);
            if($(item).find('.swiper-slide').length < 2) return;
            $(item).find('.swiper-pagination-wrap').show();
            MUI.slide.init(item,'swiper', {
                loop: true,
                loopAdditionalSlides: 1,
                spaceBetween: 10,
                //speed:1200,
                preloadImages: true,
                pagination: {
                    el: $('.main-wrap .main-col9 .swiper-pagination').get(idx),
                },
            });

        });

    }


/* -------------------------------------------------메인end*/

/* 견적start-------------------------------------------------*/
    //견적 상단 슬리이더
    if($('.estimate-wrap .detail-view-list').length) {
        $('.estimate-wrap .detail-view-list .swiper-pagination-wrap').hide();      
        if($('.estimate-wrap .detail-view-list .swiper-slide').length >= 2) {
            $('.estimate-wrap .detail-view-list .swiper-pagination-wrap').show();
            MUI.slide.init('.estimate-wrap .detail-view-list','swiper', {
                loop: true,
                //speed:1200,
                pagination: {
                    el: '.estimate-wrap .detail-view-list .swiper-pagination',
                },
            });
        }
    }

    //견적 detail-layer-top 스크롤 체크
    if($('.estimate-wrap .detail-layer-top').length) {
        var $target = $('.estimate-wrap .detail-layer-top');
        $(window).on('scroll', function(){
            var winTop = $(window).scrollTop(),
                topHeight = $target.height(),
                targetTop = $target.offset().top;
            //console.log(winTop,topHeight,targetTop);
            if(winTop >= (targetTop + topHeight/2)) {
                $target.addClass('sticky');
            }
            else{
                $target.removeClass('sticky');
            }
        });
    }

    //견적 텝이동
    if($('.estimate-wrap .detail-layer-nav').length) {
        MUI.event.goTarget('.menu-link');

        $(window).on('scroll', function(){
            var scrollTop = $(this).scrollTop();
            MUI.event.scrollTaps(scrollTop, $('.estimate-wrap#Step02 .layer-item'), $('.estimate-wrap .menu-link'));
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
        MUI.event.toggle('.item-step6 .model-toggle-btn', '.item-step6 .model-toggle-cont', false, function(logic, layer) {
            //console.log('toggle');
            logic();
        });
    }
    //견적 기본정보 토글
    if($('.summary-table-wrap .summary-toggle-btn').length) {
        MUI.event.toggleTarget('.summary-table-wrap .summary-toggle-btn', '.summary-table-wrap .summary-toggle-cont', false, function(logic, layer) {
            logic();
        });
    }
/* -------------------------------------------------견적end*/



/* 기획전start-------------------------------------------------*/
    //기획전 스틱키
    if($('.exhibition-wrap .exhibition-sticky').length) {
        var $target = $('.exhibition-wrap .exhibition-sticky'),
            targetH = $target.outerHeight();
        $(window).on('scroll', function(){
            var winTop = $(window).scrollTop(),
                targetTop = $('.exhibition-wrap .exhibition-list-wrap').offset().top,
                $items = $('.exhibition-wrap .exhibition-list-wrap .exbit-section'),
                //txt = $items.eq(0).find('h3').text();
                txt = '전체';
                //console.log(txt);
            //console.log(winTop, targetTop);
            if(winTop >= targetTop-5) {
                $target.addClass('sticky');
            }
            else{
                $target.removeClass('sticky');
            }

            $items.each(function(index ,item){
                //console.log(index ,item);
				var top_of_element = $(this).offset().top;
				if((winTop >= top_of_element-targetH-10) ){
                    txt = $(item).find('h3').text();
                }
                $target.find('.customText').text(txt);
                //$target.find('option:selected').prop('selected', false)
			});

        });

        $(document).on('click', '.exhibition-sticky .custom-select-list li',function(e){
            var link = $(this).attr('data-link'),
                offsetTop = 0;
                //console.log(link);
            if(link !== 'section-item-all'){
                offsetTop = $('.' + link).offset().top-targetH+10;
            }
            //console.log(link, offsetTop, targetH);
            $('html, body').stop().animate({'scrollTop': offsetTop}, 500,function(){
                //console.log('callback');
                $target.find('.custom-select').removeClass('active');
            });

        });


    }
/* -------------------------------------------------기획전end*/

/* 특가상품start-------------------------------------------------*/
    //특가상품 공동구매, 사전예약 슬라이더
    if($('.specials-wrap .specials-more .swiper-container').length) {
        if($('.specials-wrap .specials-more .swiper-container .swiper-slide').length >= 2) {
            $('.specials-wrap .specials-more .swiper-container .swiper-pagination-wrap').show();
                MUI.slide.init('.specials-wrap .specials-more .swiper-container','swiper', {
                spaceBetween: 0,
                //cssMode: true,
                //speed:1200,
                preloadImages: true,
                pagination: {
                    el: '.specials-wrap .specials-more .swiper-pagination',
                },
            });
            
        }
    }

    //특가상품 상단 슬라이더
    /*
    if($('.specials-wrap .specials-view-list').length) {
        MUI.slide.init($('.specials-wrap .specials-view-list'), 'slick', {
				slidesToScroll: 1, 
				infinite: false,
				autoplay: false,
                arrows: false,
                slidesToShow: 2,
                variableWidth: true,
        });
    }*/
/* -------------------------------------------------특가상품end*/


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
        MUI.event.toggleTarget('.contract-toggle-btn', '.contract-toggle-cont', false, function(logic, layer) {
            logic();
        });
    }


/* -------------------------------------------------계약end*/

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
    //로그인 견적화면 메뉴 라디오버튼 선택
    if($('.login-wrap .menu-radio-box').length) {
        $('.login-wrap .menu-radio-box').on('change', '.radio-box input', function(e){
            if(e.target.value === 'N'){
                $('.login-wrap .detail-layer-normal').addClass('active');
            }
            else{
                $('.login-wrap .detail-layer-normal').removeClass('active');
            }
        });
        $('.login-wrap .menu-radio-box').on('change', '.radio-box input', function(e){
            if(e.target.value === 'I'){
                $('.login-wrap .detail-layer-integrated').addClass('active');
            }
            else{
                $('.login-wrap .detail-layer-integrated').removeClass('active');
            }
        });
    }

    //로그인 견적화면 메뉴 토글
    if($('.login-wrap .detail-layer-integrated').length) {
        MUI.event.toggle('.detail-layer-integrated .model-toggle-btn', '.detail-layer-integrated .model-toggle-cont', false, function(logic, layer) {
            //console.log('toggle');
            $('.login-wrap .detail-layer-integrated input').prop('checked', false);
            logic();
        });
    }
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
 //고객 라디오버튼 선택
 if($('.customer-wrap .question-tab-menu').length) {
    $('.customer-wrap .question-tab-menu').on('change', '.radio-box input', function(e){
        if(e.target.value === 'N'){
            $('.customer-wrap .question-form').addClass('active');
        }
        else{
            $('.customer-wrap .question-form').removeClass('active');
        }
    });
    $('.customer-wrap .question-tab-menu').on('change', '.radio-box input', function(e){
        if(e.target.value === 'I'){
            $('.customer-wrap .question-confirm').addClass('active');
        }
        else{
            $('.customer-wrap .question-confirm').removeClass('active');
        }
    });
}
/* -------------------------------------------------고객센터end*/

/* 마이페이지start-------------------------------------------------*/

    //마이페이지 쿠폰 키업이벤트
    if($('.mypage-wrap .section-coupon').length) {
        var addressTarget = $('.mypage-wrap .section-coupon .coupon-add-input');
        addressTarget.on('keyup', 'input', function(e){
            if(e.target.value) {
                addressTarget.find('button').addClass('active');
            }
            else{
                addressTarget.find('button').removeClass('active');
            }
        });
    }

    //마이페이지 견적비교 내용 토글
    if($('.mypage-wrap .section-estimate').length){
        MUI.event.toggle('.mypage-wrap .section-estimate .coupon-toggle-btn', '.mypage-wrap .section-estimate .item-depth', false, function(logic, layer) {
            //console.log('toggle');
            logic();
        });
    }

/* -------------------------------------------------마이페이지end*/


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
                },
            });
            
        }
    }

    if($('.direct-wrap .intro-list03 .swiper-container').length) {
        if($('.direct-wrap .intro-list03 .swiper-container .swiper-slide').length >= 2) {
            $('.direct-wrap .intro-list03 .swiper-container .swiper-pagination-wrap').show();
                MUI.slide.init('.direct-wrap .intro-list03 .swiper-container','swiper', {
                slidesPerView: 1,
                spaceBetween: 10,
                //cssMode: true,
                loop : true,
                //speed:1200,
                preloadImages: true,
                pagination: {
                    el: '.direct-wrap .intro-list03 .swiper-pagination',
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
    if($('.direct-wrap .service-list02 .swiper-container').length) {
        if($('.direct-wrap .service-list02 .swiper-container .swiper-slide').length >= 2) {
            $('.direct-wrap .service-list02 .swiper-container .swiper-pagination-wrap').show();
                MUI.slide.init('.direct-wrap .service-list02 .swiper-container','swiper', {
                slidesPerView: 1,
                spaceBetween: 10,
                //cssMode: true,
                loop : true,
                //speed:1200,
                preloadImages: true,
                navigation : {
                    nextEl : '.direct-wrap .service-list02 .swiper-button-next',
                    prevEl : '.direct-wrap .service-list02 .swiper-button-prev', 
                },
                pagination: {
                    el: '.direct-wrap .service-list02 .swiper-pagination',
                },
            });
            
        }
    }
/* ------------------------------------------------- 신차장 다이렉트 end*/

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


    /*브라우저 모든 resources 다운 완료시점(프레임)*/
    $(window).on('load', function(){

    });

});

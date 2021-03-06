/* 코어 start */
var MUI = MUI || {
	resize: {
		chk: function(target){
			if (target.width() >= 1025 ) {
				target.removeClass('pc mobile tablet').addClass('pc');
			}
			else if(target.width() >=  768){
				target.removeClass('pc mobile tablet').addClass('tablet');
			}
			else {
				target.removeClass('pc mobile tablet').addClass('mobile');
			}
			
		},
		font: function(){
			var doc = document.documentElement,
			fontSizeVal = (parseFloat((doc.clientWidth / 320 * 62.5) * 100) / 100);
			fontSizeVal = (fontSizeVal >= 85) ? 85 : fontSizeVal;

			doc.style.fontSize = fontSizeVal + '%';
		},
		resize: function($BODY){
			$(window).on('resize', function(){
				MUI.resize.chk($BODY);
				MUI.resize.font();
			});
		},
	},
	Map: {
		init: function(){
			var JqMap = function(){
				this.map = new Object();
			};
			JqMap.prototype = {
				/* key, value 값으로 구성된 데이터를 추가 */
				put: function (key, value) {
					this.map[key] = value;
				},
				/* 지정한 key값의 value값 반환 */
				get: function (key) {
					return this.map[key];
				},
				/* 구성된 key 값 존재여부 반환 */
				containsKey: function (key) {
					return key in this.map;
				},
				/* 구성된 value 값 존재여부 반환 */
				containsValue: function (value) {
					for (var prop in this.map) {
						if (this.map[prop] == value) {
							return true;
						}
					}
					return false;
				},
				/* 구성된 데이터 초기화 */
				clear: function () {
					for (var prop in this.map) {
						delete this.map[prop];
					}
				},
				/*  key에 해당하는 데이터 삭제 */
				remove: function (key) {
					delete this.map[key];
				},
				/* 배열로 key 반환 */
				keys: function () {
					var arKey = new Array();
					for (var prop in this.map) {
						arKey.push(prop);
					}
					return arKey;
				},
				/* 배열로 value 반환 */
				values: function () {
					var arVal = new Array();
					for (var prop in this.map) {
						arVal.push(this.map[prop]);
					}
					return arVal;
				},
				/* Map에 구성된 개수 반환 */
				size: function () {
					var count = 0;
					for (var prop in this.map) {
						count++;
					}
					return count;
				}
			};

			return new JqMap();

		}
	},
	slide: {
		LayerSwiper: null,
		init: function(target, sort, option){
			if(sort === 'slick') {
				return target.slick(option);
			}
			if(sort === 'swiper') {
				return new Swiper(target, option);
			}
		},
	},
	layer: {
		TOUCH_CLICK: ('ontouchstart' in window) ? 'touchstart' : 'click',
		scrollTop: 0,
		openFlag: true,
		calculate: function(layer){
			var layer = $(layer),
				layerIn = layer.find('.pop-inner'),
				winH = $(window).height(),
				winW = $(window).width();
				layerIn.find('.pop-scroll').removeAttr('style');

			var layerH = layer.height(),
				layerW = layer.width(),
				marginH = parseInt(layerIn.css('marginTop')) + parseInt(layerIn.css('marginBottom'));
			//console.log(layer, winH, winW, layerH, layerW, marginH);
			
			if(winH < layerH){
				layerIn.find('.pop-scroll').css({
					height: winH - marginH,
					overflow: 'auto',
				});
				layer.css({
					top: 0,
					left: (winW - layerW) / 2,
				});
			}
			else{
				layerIn.find('.pop-scroll').removeAttr('style');
				layer.css({
					top: (winH - layerH) / 2,
					left: (winW - layerW) / 2,
				});
			}

		},
		openClick: function(target, dimmed, parent, touch, callback, openFlag){
			var that = this,
				EventType = touch ? this.TOUCH_CLICK : 'click';
            $(document).on(EventType, target, function(e){
				if(openFlag) that.openFlag = true;
				if(!that.openFlag) return;
                var layer = '.'+$(this).data('layer');
                var targetDom = $(this);
                //that.scrollTop = $(window).scrollTop();

                if(callback){
                    callback(show, layer, targetDom);
                }
                else{
					show();
                }
                function show(){
					that.open(layer, dimmed, parent);
					that.openFlag = false;
				}
            });
        },
        open: function(layer, dimmed, parent, callback){
			var that = this;
            that.scrollTop = $(window).scrollTop();
            $('body').addClass('fixed');
            $('body').css({top:-that.scrollTop});
			if(callback) callback(layer);
			if($(layer).data('type') === 'full') {
				$(dimmed).addClass('type-full');
				$(dimmed).hide();
				$(layer).css({opacity:1});
				$(layer).addClass('active');
				return;
			}
			if(dimmed) $(dimmed).delay(300).fadeIn();
			if($(layer).data('type') === 'slide') {
				$(dimmed).addClass('type-slide');
				$('.layer-full').addClass('fixed');
				//$(layer).css({opacity:1, 'max-height': $(window).height()-$('header').height()});
				$(layer).css({opacity:1});
				$(layer).addClass('active');
				return;
			}
			//console.log(parent + layer);
			$(dimmed).addClass('type-popup');
			$(parent + layer).addClass('active');
            that.calculate(layer);
            $(window).on('resize.layer', function(){
                that.calculate(layer);
            });
        },
        closeClick: function(target, dimmed, parent, touch, callback){
			var that = this,
				EventType = touch ? this.TOUCH_CLICK : 'click';
            $(document).on(EventType, target, function(e){
                var layer;
				var targetDom = $(this);
				//console.log(targetDom.data('layer'));
                if(target == dimmed){
                    layer = parent;
                }
                else{
                    layer = parent + '.'+$(this).data('layer');
                }
                
                if(callback){
                    callback(hide, layer, targetDom);
                }
                else{
                    hide();
                }

                function hide() {
					that.close(layer, dimmed, parent);
                }

            });
        },
        close :function(layer, dimmed, parent, callback){
			//console.log(layer);
			var that = this;
			if(callback) callback(layer);
            $('body').removeClass('fixed');
            $('body').css({top:0});
			$(window).scrollTop(that.scrollTop);
			//console.log(layer === '.layer-wrap');
			if((layer === '.layer-wrap')) {
				if(!$(dimmed).hasClass('type-popup')) {
					//글쓰기 풀팝인 경우 슬라이드 팝업 노출시키야됨
					$('.layer-full.layer-write').addClass('active');
					$('.layer-full.layer-write').css({opacity:1});
				}
				$('.layer-slide').removeClass('active');
				setTimeout(function(){
					$('.layer-slide').css({opacity:0});
				}, 400);
			}
			else{
				$(layer).removeClass('active');
				setTimeout(function(){
					$(layer).css({opacity:0});
				}, 400);
			}
			$('.layer-full').removeClass('fixed');
			$('.layer-popup').removeClass('active');
			if(dimmed) $(dimmed).fadeOut();
			$(dimmed).removeClass('type-full');
			$(dimmed).removeClass('type-slide');
			$(dimmed).removeClass('type-popup');
			$(window).off('resize.layer');

			setTimeout(function(){
				that.openFlag = true;
			}, 400);
			
        },
	},
	event: {
		TOUCH_CLICK: ('ontouchstart' in window) ? 'touchstart' : 'click',
		toggle: function(target, parent, touch, callback){
			var EventType = touch ? this.TOUCH_CLICK : 'click';
			$(document).on(EventType, target, function(e) {
				var $this = $(this);
				var $targetDiv = $(target);
				var layer = $('.' + $this.data('target'));
				var sort = $this.data('sort');
				var onClass = $this.data('on');
				var siblings = $this.data('siblings');
				var $parent =$(parent);
				//console.log(sort, onClass, siblings, $parent);
				function logic(){
					if(onClass){
						
						if(parent === null ? $this.hasClass('active') : layer.is(':visible')){
							$this.removeClass('active');
							layer.removeClass('active');
						}
						else{
							if(siblings){
								$targetDiv.removeClass('active');
								$parent.removeClass('active');
							}
							$this.addClass('active');
							layer.addClass('active');
						}	
					}
	
					if(layer.is(':visible')){
						if(sort == 'fade'){
							layer.fadeOut();
						}
						else if (sort == 'normal'){
							layer.hide();
						}
						else if (sort == 'none'){
							return false;
						}
						else{
							layer.slideUp();
						}
					}
					else{
						if(sort == 'fade'){
							if(siblings){
								$parent.fadeOut();
							}
							layer.fadeIn();
						}
						else if (sort == 'normal'){
							if(siblings){
								$parent.hide();
							}
							layer.show();
						}
						else if (sort == 'none'){
							return false;
						}
						else{
							if(siblings){
								$parent.slideUp();
							}
							layer.slideDown();
						}
					}
	
				}

				if(callback) {
					callback(logic, layer, target);
				}
				else{
					logic();
				}
				//e.preventDefault();
			});
		},
		toggleTarget: function(target, parent, touch, callback){
			var EventType = touch ? this.TOUCH_CLICK : 'click';
			$(target).on(EventType, function(e) {
				var $this = $(this);
				var $targetDiv = $(target);
				var layer = $('.' + $this.data('target'));
				var sort = $this.data('sort');
				var onClass = $this.data('on');
				var siblings = $this.data('siblings');
				var $parent =$(parent);
				//console.log(sort, onClass, siblings, $parent);
				function logic(){
					if(onClass){
						
						if(parent === null ? $this.hasClass('active') : layer.is(':visible')){
							$this.removeClass('active');
							layer.removeClass('active');
						}
						else{
							if(siblings){
								$targetDiv.removeClass('active');
								$parent.removeClass('active');
							}
							$this.addClass('active');
							layer.addClass('active');
						}	
					}
	
					if(layer.is(':visible')){
						if(sort == 'fade'){
							layer.fadeOut();
						}
						else if (sort == 'normal'){
							layer.hide();
						}
						else if (sort == 'none'){
							return false;
						}
						else{
							layer.slideUp();
						}
					}
					else{
						if(sort == 'fade'){
							if(siblings){
								$parent.fadeOut();
							}
							layer.fadeIn();
						}
						else if (sort == 'normal'){
							if(siblings){
								$parent.hide();
							}
							layer.show();
						}
						else if (sort == 'none'){
							return false;
						}
						else{
							if(siblings){
								$parent.slideUp();
							}
							layer.slideDown();
						}
					}
	
				}

				if(callback) {
					callback(logic, layer, target);
				}
				else{
					logic();
				}
				//e.preventDefault();
			});
		},
		goTop: function(target){
			target.on('click',function(e) {
				$('.fixedBottom').addClass('active');
				$('html, body').stop().animate({'scrollTop': 0}, 1000, function(){
					$('.fixedBottom').removeClass('active');
				});
            	e.preventDefault();
			});
		}, 
		topScrollCh: function(target){
			var winScroll = $(window).scrollTop();
			if(winScroll == 0){
				target.addClass('close-topBt');
			}
			else{
				target.removeClass('close-topBt');
			}

		},
		taps: function(tab_nav, touch, callback){
			var EventType = touch ? this.TOUCH_CLICK : 'click',
				target = tab_nav + '.tab-nav li';
			$(document).on(EventType, target, function(){
				var $this = $(this);
				var $layer = $(tab_nav + '.tab-cont');
				var idx = $this.index();

				function swap(){
					$this.addClass('active').siblings().removeClass('active');
					$layer.find('> div').eq(idx).show().siblings().hide();
				} 
				if(callback){
					callback(swap);
				}
				else{
					swap();
				}
			});
		},
		calander: function(target, option, callback){
			$(target).each(function(){
				$(this).datepicker(option); 
				$(this).datepicker('setDate', 'today'); 
				$(this).on('change', callback);
			});
		},
		customSelect:function(parent){
			var target = parent + ' button',
				listTarget = parent + ' a',
				$parent;
			$(document).on('click', target, function(e){
				$parent = $(this).parent();
				if($parent.hasClass('active')){
					$parent.removeClass('active');
				}
				else{
					$(parent).removeClass('active');
                    $parent.addClass('active');
                    //MUI.iscrolls.resize();
				}
				//console.log($parent);
			});
			$(document).on('click', listTarget, function(e){
				var bt = $parent.find('button'),
					input = $parent.find('input'),
					val = $(this).data('val'),
					text = $(this).text();

				input.val(val);
				bt.text(text);
				//console.log(input, input.val());

				$parent.addClass('select');
				$parent.removeClass('active');

				e.preventDefault();
			});
		},
        changeSelect:function(target){
			$(document).on('change', target, function(e){
				var val = $(this).val();
				var target = $(this).parent().find('.selText');
				if (val == 'DISP_ROOT') {
					target.html(target.attr('data-name'));
				} else {
					target.html($(this).find('.bestSubCate-' + val).attr('data-name'));
				}
			});
		},
		fixedTop: function(){
			var enScrollTop = 0,
				beScrollTop = 0,
				$header = $('#header'),
				$topBanner = $('.top_bn_w'),
				fixdTop = $header.offset().top,
				paddingTop = $header.height(),
				scrollThreshold = 90;

			if($topBanner.length && $topBanner.is(':visible')){
				$header.removeClass('fixed');
				$header.css({'height': 'auto'});
			}
			else{
				$header.addClass('fixed');
				$header.css({'height': paddingTop});		
			}

			$(window).on('scroll', function(e) {

				var scrollpos = window.scrollY || window.pageYOffset;

				enScrollTop = scrollpos;

				if($topBanner.length && $topBanner.is(':visible')){
					//console.log(fixdTop, scrollpos);
					if(fixdTop <= scrollpos) {
						$header.addClass('fixed');
					}
					else {
						$header.removeClass('fixed');
					}
				}
				if (Math.abs(enScrollTop - beScrollTop) < scrollThreshold) return false;

				if(!$('body').hasClass('pc')) {	
					beScrollTop > enScrollTop ? $header.removeClass('on') : $header.addClass('on');
				}
				else{
					$header.removeClass('on');
				}

				beScrollTop = enScrollTop;
			});
		},
		fixedBottomScrollvalue: 0,
		fixedBottom: function($target){
			var that = this;
			$(window).on('scroll', function() {
				that.fixedBottomCaculate($target);
			});
		},
		fixedBottomCaculate: function($target){
			var initScrollvalue = $(window).scrollTop(),                          
				MaxScroll = $(document).height() - $(window).height();  //최대 가능한 스크롤 범위
				
			//console.log('스크롤 가능한 최대값: ' + MaxScroll);
			//console.log('현재 스크롤 값: ' +  initScrollvalue);

			//IOS 스크롤 시 스크롤 바운스 범위 지정
			if(initScrollvalue < (MaxScroll - 100) && this.fixedBottomScrollvalue > 50){
				//console.log('fixedBottomScrollvalue', this.fixedBottomScrollvalue);
				//console.log('최대 바운스 범위');
				if(initScrollvalue > this.fixedBottomScrollvalue){
					//console.log('스크롤 다운');
					$target.addClass('close');
				}else{
					//console.log('스크롤 업');
					$target.removeClass('close');
				}
			}else{
				//console.log('마지막 스크롤, 최상단 바운스 되는중');
			}

			//최종 스크롤 값 기준 데이터 리턴
			this.fixedBottomScrollvalue = initScrollvalue;
		},
		cashNavOffset: null,
		navCenter: function($target, active){
			var that = this,
				$activeTarget = $target.find('.'+active),
				left = $activeTarget.offset().left,
				width = $activeTarget.outerWidth(true);

			if(that.cashNavOffset === null){
				that.cashNavOffset = MUI.Map.init();
				$target.find('a').each(function(idx){
					that.cashNavOffset.put(idx, $(this).position().left);
				});
			}

			$target.scrollLeft(left - ($(document).width() - width) / 2);
		},
		navOffsetCalculate: function($target) {
			var that = this;
			$target.find('a').each(function(idx){
				that.cashNavOffset.put(idx, $(this).position().left);
			});
		},
		changeNavCenter: function($target, active){
			var $activeTarget = $target.find('.'+active),
				idx =  $activeTarget.index(),
				width = $activeTarget.outerWidth(true),
				scrollLeft = this.cashNavOffset.get(idx) - ($(document).width() - width) / 2;
			//console.log(this.cashNavOffset);
			$target.stop().animate({'scrollLeft': scrollLeft}, 500,function(){
				//console.log('callback');
			});
		},
		goTarget: function(target){
			$(document).on('click', target, function(e){
				var hrefString = $(this).data('target'),
					offsetTop = $('.' + hrefString).offset(),
					fixHeight = 60, //추후변동
					navHeight = $('.detail-layer-nav').height();
				//console.log(hrefString, offsetTop, navHeight);
				if(offsetTop){
					offsetTop = offsetTop.top - navHeight - fixHeight;
					$('html, body').stop().animate({'scrollTop': offsetTop}, 500,function(){
						//console.log('callback');
					});
					//$(this).siblings().removeClass('active');
				}
			});
		},
		goLink: function(target, fixHeight) {
			var offsetTop = $(target).offset().top - fixHeight;
			$('html, body').stop().animate({'scrollTop': offsetTop}, 500,function(){
				//console.log('callback');
			});
		},
		scrollTaps: function(scrollTop, $target, $nav){
			var navHeight = $('.detail-layer-nav').height(),
				fixHeight = 60; //추후변동
			$target.each(function(){
				var top_of_element = $(this).offset().top;
				var idx = $(this).attr('data-link');
				if((scrollTop >= top_of_element - navHeight - fixHeight - 5) ){
					$nav.siblings().removeClass('active');
					$nav.eq(idx).addClass('active');
				}
			});
		},
		removeToast: 0,
		toastMessage: function(message, id, time){
			var that = this,
				idValue = id ? id : 'toast',
				toast = document.getElementById(idValue),
				timeValue = time ? time : 1000;
				
			toast.classList.contains('active') ?
				(clearTimeout(that.removeToast), that.removeToast = setTimeout(function () {
					document.getElementById(idValue).classList.remove('active')
				}, timeValue)) :
				that.removeToast = setTimeout(function () {
					document.getElementById(idValue).classList.remove('active')
				}, timeValue)
			toast.classList.add('active');
				if(message) toast.innerText = message;
		},

	},
	iscrolls: {
        cash: null,
        num: 0,
		init: function(target, option){

			this.cash = this.cash ? this.cash :  MUI.Map.init();

            $(target).each(function(idx, item){
                $(target)[idx].iscrolls = new IScroll(item, option);
                //console.log(item);
                this.cash.put(this.num++, {sort: item, option: option});
            }.bind(this));
            //console.log(this.cash);
		},
		resize: function(){
			var that = this;
			if(that.cash){
				$.each(that.cash.map, function(key, value){
                    if(value.sort.className == "select_list"){
                       //console.log(key, value.sort.iscrolls);
                        value.sort.iscrolls.scrollTo(0, 0);                 
                    }
				});
			}
			else{
				return;
			}
		},
	},
	Masonry: {
		init: function($target, option){
			return $target.masonry(option);
		},
	},
};

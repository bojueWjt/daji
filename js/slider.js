(function($){
	/**
	 * @author Ninico
	 * @time 2015-07-31
	 * [slider jQuery滑动图片插件]
	 * @param  {object} options [传入的参数配置项]
	 *
	 *  options {
	 *  	imgNum {number} 使用的图片张数
	 *  	slidesNavElem {string} 滚动图片导航项的选择器
	 *  }
	 *
	 *  插件html结构
	 *
	 * <ul>
	 *    <li>
	 *     <li>
	 *  </ul>
	 *
	 * 	<ol>
	 * 		<li class="focus"></li>
	 * 	</ol>
	 *
	 *  将函数绑定在ul上执行 ， slidesNavElem选择器为 ol li
	 * 
	 */
	$.fn.slider = function(options){

		var defaults = {
			nowIndex : 0,
			timeId : 0,
			me : null,
			flag: false
		};


		var options = $.extend(defaults,options);

		var startShow = function(){

			console.log(defaults.nowIndex);
			defaults.nowIndex++;
			var $this = $(this);
			$this.animate({'margin-left':-defaults.nowIndex*100 + '%'},1500,function(){

				if(defaults.nowIndex >= defaults.imgNum){

					$this.css({
						'margin-left': '0'
					});

					defaults.nowIndex = 0;

				}
			});

			$(defaults.slidesNavElem).eq(defaults.nowIndex).addClass('focus').siblings().removeClass('focus');
		}
		
		var me = this;

		defaults.timeId = setInterval(function(){
			startShow.call(me);
		},4000);


		// console.log($(defaults.slidesNavElem));

		// $(defaults.slidesNavElem).each(function(i){
		// 	$(this).bind('click',function(){

		// 			defaults.nowIndex = i;
		// 			console.log(i);
		// 			me.stop().animate({'margin-left': -i*100 + '%'},500,function(){


		// 			if(defaults.nowIndex >= defaults.imgNum){

		// 				me.css({
		// 					'margin-left': '0'
		// 				});

		// 				defaults.nowIndex = 0;
		// 			}

		// 		});
		// 		$(this).addClass('focus').siblings().removeClass('focus');
		// 	})
		// }); 

		// $(defaults.slidesNavElem).bind({
		// 	'mouseover':function(){
		// 		clearInterval(defaults.timeId);
		// 	},
		// 	'mouseleave':function(){
		// 		defaults.timeId = setInterval(function(){
		// 			startShow.call(me);
		// 		},4000);
		// 	}
		// });

		//绑定移动端自定义向左向右滑动事件
		
		Ninico.Event.slideRight.call(me[0], function(ele){
			var me = ele;
			defaults.nowIndex++ ;

			$(me).stop().animate({'margin-left':-defaults.nowIndex*100 + '%'},500,function(){

				if(defaults.nowIndex >= defaults.imgNum){

					$(me).css({
						'margin-left': '0'
					});

					defaults.nowIndex = 0;
				}
			});

			$(defaults.slidesNavElem).eq(defaults.nowIndex).addClass('focus').siblings().removeClass('focus');
		});

		Ninico.Event.slideLeft.call(me[0],function(ele){
			var me = ele;

			if(defaults.nowIndex === 0){
				return;
			}

			defaults.nowIndex-- ;

			$(me).stop().animate({'margin-left':-defaults.nowIndex*100 + '%'},500,function(){

				if(defaults.nowIndex === defaults.imgNum){

					$(me).css({
						'margin-left': '0'
					});

					defaults.nowIndex = 0;
				}
			});

			$(defaults.slidesNavElem).eq(defaults.nowIndex).addClass('focus').siblings().removeClass('focus');
		})
	}
 
})(jQuery);


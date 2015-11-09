$(function(){
	//显示遮罩层函数
	var showShutter = function(){

		$('body').append($('<div id="shutter"></div>').css({
			'opacity': 0.8,
			'position': 'fixed',
			'background': '#000',
			'left': 0,
			'right': 0,
			'top': 0,
			'bottom': 0,
			'z-index': 1
		}));
	}

	//去除遮罩层函数
	var hiddenShutter = function(){

		$('#shutter').remove();
	}

	//拉开左边抽屉
	$('.icon-align-justify').bind('click',function(){
		var leftDrawer = $('.snap-drawer-left');

		//显示遮罩层
		showShutter();
		leftDrawer.removeClass('close');
		leftDrawer.addClass('show');
	});

	//关上右边抽屉
	$('.icon-cancel').bind('click', function(event) {
		var leftDrawer = $('.snap-drawer-left');

		//去除遮罩层
		hiddenShutter();
		leftDrawer.removeClass('show');
		leftDrawer.addClass('close');
	});



})
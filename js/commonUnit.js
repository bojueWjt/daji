/**
 * 命名空间
 * @name Ninico
 * @type 单例
 */
var Ninico = {}

/**
 * 接口类
 * @name Interface
 * @param string InterfaceName 接口名
 * @param Array[string] methods  接口定义的方法
 *
 * @author Ninico
 */
Ninico.Interface = function(InterfaceName,methods){

	if(arguments.length !==2){
		throw new Error('该方法需要两个参数！');
	}

	if(typeof InterfaceName !== 'string'){
		throw new Error('接口名必须是字符串型！');
	}

	if(methods.constructor !== Array){
		throw new Error('methods 必须是一个数组!');
	}

	this.name = InterfaceName;
	this.methods = [];

	for(var i=0, len = methods.length; i < len ; i++){
		if(typeof methods[i] !== 'string'){
			throw new Error('方法名必须为字符型!');
		}

		this.methods.push(methods[i]);
	}

	i = null;
	len = null;
}

Ninico.Interface.ensureImplement  =  function(obj){

	if( arguments.length < 2){
		throw new Error('此方法需要两个或两个以上参数！');
	}

	for(var i = 1, len = arguments.length; i < len ; i++){

		if(arguments[i].constructor !== Ninico.Interface){
			throw new Error('传入的接口不是Interface的实例！');
		}

		for(var j = 0, methodsNum = arguments[i].methods.lenght; j < methodsNum ; i++){
			var methodName = arguments[i].methods[j];
			if(typeof obj[methodName] !== 'function'){
				throw new Error('未实现' + arguments[i].name + '接口的' + methodName + '方法！');
			}
		}
	}

	i = null;
	j = null;
	methodName = null;
}

/**
 * 继承方法
 * @name  extend
 * @param  {Function} sub 子类
 * @param  {[Function]} sup 父类
 * 
 */
Ninico.extend = function( sub, sup){

	if(typeof sub !== 'function' || typeof sup !== 'function'){
		throw new Error('需要两个参数都为构造函数！');
	}

	var f = new Function();
	f.prototype = sup.prototype;

	//继承父类的原型对象
	sub.prototype = new f();
	sub.prototype.constructor = sub;

	//如果父类的构造函数未还原，为其还原
	if(sup.prototype.constructor == Object.prototype.constructor){
		sup.prototype.constructor = sup;
	}


	sub.superClassPrototype = sup.prototype;console.log(sub.superClassPrototype)
	f = null;
}


// Array.prototype.each = function(){
// 	try{
// 		// this.i 遍历数组每一项时记录数组当前的位置，选用this.i而不声明新变量，是为了防止变量污染
// 		this.i || (this.i = 0);
// 		// if 进行严格的判断，什么时候可以使用each方法
// 		// 调用的对象必须是数组 && 不能是空数组 && 传入的参数必须是函数
// 		if(this.constructor === Array && this.length > 0 && fn.constructor === Function){
// 			//遍历数组
// 			for(this.i;this.i<this.length;this.i++){
// 				var item = this[this.i];
// 				//如果得到的子元素还是数组，那么进行递归
// 				if(item.constructor == Array){
// 					arguments.callee.call(item,fn);
// 				}else{
// 					//执行传入的函数
// 					fn.call(item,item);
// 				}
// 			}
// 		}
// 		this.i =null;
// 	}catch(ex){
// 		//do something
// 	}
// }


/**
 *  Event 自定义事件
 */

Ninico.Event = {};

/**
 * [slideInit 初始化滑动事件]
 * 
 */
Ninico.Event.slideInit = function(){

	/**
	 * [touchEventInfo 触屏事件信息储存]
	 * @type {Object}
	 */
	this.touchEventInfo = this.touchEventInfo ? this.touchEventInfo : {};


	this.addEventListener('touchstart',function(ev){
		this.touchEventInfo.startX = ev.targetTouches[0].pageX;
	}, false);
	this.addEventListener('touchmove',function(ev){
		this.touchEventInfo.endX = ev.targetTouches[0].pageX;
	},false);
}


/**
 * [slideLeft 定义向右滑动事件]
 * @param  {Function} fn [事件触发后执行的时间]
 * @return {void}      
 */
Ninico.Event.slideLeft = function(fn){

	Ninico.Event.slideInit.call(this);

	this.addEventListener('touchend',function(ev){


		if(this.touchEventInfo.endX === null){
			return;
		}

		if(this.touchEventInfo.endX - this.touchEventInfo.startX > 50){

			this.touchEventInfo.endX = null;
			this.touchEventInfo.startX = null;
			fn(this);
		}

	});
}   

/**
 * [slideRight 定义向左滑动事件]
 * @param  {Function} fn [事件触发后执行的事件]
 * @return {void}      
 */
Ninico.Event.slideRight = function(fn){

	Ninico.Event.slideInit.call(this);

	this.addEventListener('touchend',function(ev){

		if(this.touchEventInfo.endX === null){
			return;
		}


		if(this.touchEventInfo.endX - this.touchEventInfo.startX < -50){

			this.touchEventInfo.endX = null;
			this.touchEventInfo.startX = null;
			fn(this);
		}
	});
}

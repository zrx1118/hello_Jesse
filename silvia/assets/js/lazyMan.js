
// 关键点：如何实现任务的顺序执行
// 首先创建一个任务队列，然后利用next()函数来控制任务的顺序执行

function _LazyMan(name){
	this.tasks = [];
	var self = this;
	var fn = (function(n){
		var name = n;
		return function(){
			console.log("Hi! This is " + name + "!");
			self.next();
		}
	})(name);
	this.tasks.push(fn);
	setTimeout(function(){
		self.next();
	}, 0);   // 在下一个事件循环启动任务
}

// 事件调度函数
_LazyMan.prototype.next = function(){
	var fn = this.tasks.shift();
	fn && fn();
}

_LazyMan.prototype.eat = function(name){
	var self = this;
	var fn = (function(name){
		return function(){
			console.log("Eat " + name + "~");
			self.next();
		}
	})(name);
	this.tasks.push(fn);
	return this;   // 实现链式调用
}

_LazyMan.prototype.sleep = function(time){
	var self = this;
	var fn = (function(time){
		return function(){
			setTimeout(function(){
				console.log("Wake up after " + time + "s!");
				self.next();
			}, time * 1000);
		}
	})(time);
	this.tasks.push(fn);
	return this;
}

_LazyMan.prototype.sleepFirst = function(time){
	var self = this;
	var fn = (function(time){
		return function(){
			setTimeout(function(){
				console.log("Wake up after " + time + "s!");
				self.next();
			}, time * 1000);
		}
	})(time);
	this.tasks.unshift(fn);
	return this;
}

// 封装
function LazyMan(name){
	return new _LazyMan(name);
}
// 调用
LazyMan("Hask").sleep(10).eat("dinner");
// 快速排序
function quickSort(arr){
	if(arr.length <= 1){
		return arr;   //如果数组只有一个数，就直接返回
	}

	var num = Math.floor(arr.length / 2);   //找到中间的索引值，如果是浮点数，则向下取整
	var numValue = arr.splice(num, 1);   //找到中间数的值
	var left = [], right = [];

	for(var i=0; i<arr.length; i++){
		if(arr[i]<numValue){
			left.push(arr[i]);   //基准点的左边的数传到左边数组
		}else{
			right.push(arr[i]);   //基准点的右边的数传到右边数组
		}
	}

	return quickSort(left).concat([numValue], quickSort(right));   //递归不断重复比较
}
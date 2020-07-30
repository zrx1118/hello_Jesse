// var obj = {
//     a: 1,
//     getA: function() {
//         console.log(this === obj);
//         console.log(this.a);
//     }
// }
// var get = obj.getA;
// get()

// var before = function(fn, beforefn) {
//     return function() {
//         beforefn.apply(this, arguments);
//         return fn.apply(this, arguments);
//     }
// }

// var a = before(
//     function() {
//         console.log(3);
//     },
//     function() {
//         console.log(2);
//     }
// )

// a = before(a, function() {console.log(1);})

// a();

// function uniq(arr) {
//     var temp = [];
//     for (var i = 0; i < arr.length; i++){
//         if (temp.indexOf(arr[i]) == -1) {
//             temp.push(arr[i])
//         }
//     }
//     temp.sort(function(a, b) {
//         return a - b;
//     })
//     return temp;
// }

// var aa = [1,2,2,4,9,6,7,5,2,3,5,6,5];
// console.log(uniq(aa));

// 函数柯里化
function curry (fn) {
    var args = [];
    return function() {
        if (arguments.length === 0) {
            return fn.apply(this, args)
        } else {
            [].push.apply(args, arguments);
        }
    }
}
var cost = (function() {
    var item = 0;
    return function () {
        for (var i = 0; i < arguments.length; i++) {
            item += arguments[i];
        }
        return item
    }
})()

var cost = curry(cost);

cost(100);
cost(200);
cost(300);

console.log(cost());

Function.prototype.uncurrying = function() {
    var self = this;
    return function() {
        var obj = Array.prototype.shift.call(arguments);
        return self.apply(obj, arguments);
    }
}
for(var i = 0, fn, ary = ['push', 'shift', 'forEach']; fn = ary[i++]; ) {
    Array[fn] = Array.prototype[fn].uncurrying();
}

var obj = {
    "length": 3,
    "0": 1,
    "1": 2,
    "2": 3
}
Array.push(obj, 4);
console.log(obj);
var first = Array.shift(obj)
console.log(first);
console.log(obj);
Array.forEach(obj, function(n, i) {
    console.log(i, n);
})

var log = console.log.bind(console);

log(1);

setTimeout(function() {
    log(2);
}, 0)

var p = new Promise((resolve, reject) => {
    log(3);
    resolve(4);
    log(5);
    reject(6);
    log(7);
})

log(8);

// var s = new Promise((resolve, reject) => {
//     log(9);
//     resolve(10);
//     log(11);
//     reject(12);
//     log(13)

// })
// s.then(n => log(n));

p.then(n => log(n));
p.catch(n => log(n));


setTimeout(function() {
    log(21)
}, 0)



function ajax(...args){
    console.log('额外的参数和用户输入',  args)
}
var oInput1 = document.getElementById('input1');
var oInput2 = document.getElementById('input2');
// 防抖 当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次，如果设定的时间到来之前，又一次触发了事件，就重新开始延时
function debounce(fn, wait) {
    var timer = null;
    return function() {
        if(timer !== null)
            clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, arguments)
        }, wait);
    }
}

var de = debounce(ajax, 1000);
oInput1.addEventListener('input', function(e){
    var mydata = e.target.value
        mydata.st = +(new Date);
        window.localStorage.setItem('ctc-msg', JSON.stringify(mydata));
    de(e.target.value, 1, 2)
}, false)



// 节流 第一次会立即执行，而后再怎么频繁地触发事件，也都是每delay时间才执行一次。而当最后一次事件触发完毕后，事件也不会再被执行了
var throttle1 = function(fn, delay) {
    var timer = null;
    return function() {
        var self = this,
            args = arguments;
        if (!timer) {
            setTimeout(function() {
                fn.apply(self, args);
                timer = null
            }, delay)
        }
    }
}
var throttle2 = function(fn, delay) {
    var prev = Date.now();
    return function() {
        var now = Date.now();
        if (now - prev >= delay) {
            fn.apply(this, arguments);
            prev = Date.now();
        }
    }
}
var th1 = throttle1(ajax, 500),
    th2 = throttle2(ajax, 500);
oInput2.addEventListener('input', function(e) {
    th2(e.target.value, 2, 3)
}, false)

function Foo() {
    getName = function() {console.log(111111);}
    return this
}
Foo.getName = function() {console.log(2222222);}
Foo.prototype.getName = function() {console.log(33333333);}
var getName = function(){console.log(444444444);}
function getName() {console.log(5);}

// Foo.getName();
// getName();
// Foo().getName();
// getName();
// new Foo.getName()
// new Foo().getName();
// new new Foo().getName();

function A(name) {
    this.name = name;
}
A.prototype.getName = function() { console.log(this.name); }

function B(name, color) {
    A.call(this, name)
    this.color = color;
}
B.prototype.getColor = function() { console.log(this.color); }
B.prototype = new A();
let b = new B('aa', 'red');
console.log(b.getName());

var Page = function(option){
    this.data = {
        el: null,
        pageNo: 1,
        pageSize: 10,
        totalCount: 0,
        showPageCount: 5,       // 连续显示页码个数
        hasFLBtn: false,       // 是否显示首尾页码
        hasPNBtn: true,       // 是否显示上一页下一页页码
        jump: null
    }

    this.totalPage = 0;

    this.init(option);
}

Page.prototype = {
    constructor: Page,

    init: function(option){

        if(option){
            $.extend(this.data, option);
        }

        this.totalPage = Math.ceil(this.data.totalCount / this.data.pageSize);
        this.__createPageList();
        this.__changePage();

        return this;
    },

    __createPageList: function(){
        var data = this.data,
            flBtn = this.__showFLBtn(),
            pnBtn = this.__showPNBtn(),
            lastStr = '<span>...</span><a data-page="' + this.totalPage + '">' + this.totalPage + '</a>';
            str = '';

        str += flBtn.firstBtn;
        str += pnBtn.prevBtn;

        // 总页数小于连续显示页码个数
        if(this.totalPage < data.showPageCount){
            str += this.__prevFifthBtn(this.totalPage);
        }

        // 总页数大于连续显示页码个数
        if(this.totalPage > data.showPageCount){
            // 当前页码小于连续显示页码个数
            if(data.pageNo < data.showPageCount){
                str += this.__prevFifthBtn(data.showPageCount);
                str += lastStr;
            }

            // 当前页码大于等于连续显示页码个数
            if(data.pageNo >= data.showPageCount){
                str += '<a data-page="1">1</a><span>...</span>';

                var ceil = Math.ceil(data.showPageCount / 2),        // 向上取整
                    floor = Math.floor(data.showPageCount / 2);     // 向下取整

                if(this.totalPage - data.pageNo > floor - 1){
                    var hasSpan = (this.totalPage - data.pageNo !== floor && this.totalPage - data.pageNo !== ceil),
                        offset = this.totalPage - data.pageNo === ceil ? ceil : floor;

                    for(var i = data.pageNo - floor; i <= data.pageNo + offset; i++){
                        str += data.pageNo === i ? '<a class="cur" data-page="' + i + '">' + i + '</a>' : '<a data-page="' + i + '">' + i + '</a>';
                    }

                    if(hasSpan){
                        str += lastStr;
                    }
                }else{
                    for(var i = this.totalPage - data.showPageCount; i < this.totalPage; i++){
                        str += data.pageNo === (i + 1) ? '<a class="cur" data-page="' + (i + 1) + '">' + (i + 1) + '</a>' : '<a data-page="' + (i + 1) + '">' + (i + 1) + '</a>';
                    }
                }
            }
        }

        str += pnBtn.nextBtn;
        str += flBtn.lastBtn;       

        $(this.data.el).html(str);
    },
    
    __prevFifthBtn: function(page){
        var prevFifthBtn = '';

        for(var i = 0; i < page; i++){
            if(this.data.pageNo === (i + 1)){
                prevFifthBtn += '<a class="cur" data-page="' + (i + 1) + '">' + (i + 1) + '</a>';
            }else{
                prevFifthBtn += '<a data-page="' + (i + 1) + '">' + (i + 1) + '</a>';
            }
        }

        return prevFifthBtn;
    },

    __showFLBtn: function(){
        var flBtn = {
            firstBtn: '',
            lastBtn: ''
        };

        if(this.data.hasFLBtn){
            flBtn.firstBtn = this.data.pageNo === 1 ? '<a class="disable">首页</a>' : '<a data-page="1">首页</a>';
            flBtn.lastBtn = this.data.pageNo === this.totalPage ? '<a class="disable">尾页</a>' : '<a data-page="' + this.totalPage + '">尾页</a>';
        }

        return flBtn;
    },

    __showPNBtn: function(){
        var pnBtn = {
            prevBtn: '',
            nextBtn: ''
        };

        if(this.data.hasPNBtn){
            pnBtn.prevBtn = this.data.pageNo === 1 ? '<a class="disable">上一页</a>' : '<a data-page="' + (this.data.pageNo - 1) + '">上一页</a>';
            pnBtn.nextBtn = this.data.pageNo === this.totalPage ? '<a class="disable">下一页</a>' : '<a data-page="' + (this.data.pageNo + 1) + '">下一页</a>';
        }

        return pnBtn;
    },

    __changePage: function(){
        var self = this;

        $(this.data.el).on('click', 'a', function(){
            var pageNo = parseInt($(this).attr('data-page'));
            if(pageNo){
                self.data.pageNo = pageNo;
                self.__createPageList();
                self.data.jump && self.data.jump(self.data.pageNo);
            }
        })
    }
}

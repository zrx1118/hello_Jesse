function ajax(...args){
    console.log('额外的参数和用户输入',  args)
}

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
var thro1 = throttle1(ajax, 500),
    thro2 = throttle2(ajax, 500);
oInput2.addEventListener('input', function(e) {
    th2(e.target.value, 2, 3)
}, false)
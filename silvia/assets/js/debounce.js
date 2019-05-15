function ajax(...args){
    console.log('额外的参数和用户输入',  args)
}

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

var dbc = debounce(ajax, 1000);
// oInput1.addEventListener('input', function(e){
//     dbc(e.target.value, 1, 2)
// }, false)
var http = require('http'),
    fs = require('fs'),
    events = require('events'),
    queryString = require('querystring');

    // http.createServer(function(req, res) {
    //     var postData = '';
    //     req.setEncoding('utf8');
    //     // 侦听请求的data事件
    //     req.on('data', function(trunk) {
    //         postData += trunk;
    //         document.write(postData)
    //     });
    //     // 侦听请求的end事件
    //     req.on('end', function() {
            
    //         res.end(postData);
    //     })
    // }).listen(8080);
    // process.nextTick(function() {
    //     console.log('nextTick延迟执行');
    // });
    // setImmediate(function() {
    //     console.log('setImmediate延迟');
    // })

    // console.log('服务器启动完成');

    // var emitter = new events.EventEmitter();
    // emitter.on('event_foo', function() {
    //     console.log('event_foo')
    // })
// GYP项目生成工具 -> v8引擎 -> libuv库 -> Node内部库 -> 其他库

var Wind = require("wind");
var Task =  Wind.Async.Task;

var A = eval(Wind.compile("async", function () {
    console.log("Start A");
    $await(Wind.Async.sleep(3000));
    console.log("Finish A");
}));

var B = eval(Wind.compile("async", function () {
    console.log("Start B");
    $await(Wind.Async.sleep(5000));
    console.log("Finish B");
}));

var C = eval(Wind.compile("async", function () {
    console.log("Start C");
    console.log("Finish C");
}));

var task = eval(Wind.compile("async", function () {
    $await(A());
    $await(B());
    $await(C());
}));
task().start();

/**
 * 异步编程的主要解决方案有如下3种：
 * 1、事件发布/订阅模式；
 * 2、Promise/Deferred模式；
 * 3、流程控制库
 * */
// promise()
//     .then(obj.api1)
//     .then(obj.api2)
//     .then(obj.api3)
//     .then(obj.api4)
//     .then(function(value4) {
//         console.log(value4)
//     }, function (error) {
//         console.log(error)
//     })
//     .done();

var Deferred = function() {
    this.promise = new Promise();
}

Deferred.prototype.resolve = function(obj) {
    var promise = this.promise;
    var handler;
    while((handler = promise.queue.shift())) {
        if (handler && handler.fulfilled) {
            var ret = handler.fulfilled(obj);
            if (ret && ret.isPromise) {
                ret.queue = promise.queue;
                this.promise = ret;
                return;
            }
        }
    }
}

Deferred.prototype.reject = function(err) {
    var promise = this.promise;
    var handler;

    while((handler = promise.queue.shift())) {
        if (handler && handler.error) {
            var ret = handler.error(err);
            if (ret && ret.isPromise) {
                ret.queue = promise.queue;
                this.promise = ret;
                return;
            }
        }
    }
}

Deferred.prototype.callback = function() {
    var that = this;
    return function(err, file) {
        if (err) {
            return that.reject(err);
        }
        that.resolve(file);
    }
}

var Promise = function() {
    // 队列用于存储待执行的回调函数
    this.queue = [];
    this.isPromise = true;
}

Promise.prototype.then = function(fulfilledHandler, errorHandler, progressHandler) {
    var handler = {};
    if (typeof fulfilledHandler === 'function') {
        handler.fulfilled = fulfilledHandler;
    }
    if (typeof errorHandler === 'function') {
        handler.error = errorHandler;
    }
    this.queue.push(handler);
    return this;
}

var readFile1 = function(file, encoding) {
    var deferred = new Deferred();
    fs.readFile(file, encoding, deferred.callback());
    return deferred.promise;
}

var readFile2 = function(file, encoding) {
    var deferred = new Deferred();
    fs.readFile(file, encoding, deferred.callback());
    return deferred.promise;
}

readFile1('file.txt', 'utf8').then(function(file1) {
    return readFile2(file1.trim(), 'utf8');
}).then(function(file2) {
    console.log(file2);
})
console.log('111');

var showMem = function() {
    var mem = process.memoryUsage();
    var format = function(bytes) {
        return (bytes / 1024 / 1024).toFixed(2) + 'MB';
    }
    console.log('Process heaptotal ' + format(mem.heapTotal) + ' heapUsed ' + format(mem.heapUsed) + ' rss ' + format(mem.rss));
    console.log('-----------------------------');
}

var useMem = function() {
    var size = 200*1024*1024;
    var buffer = new Buffer(size);
    for (var i = 0; i<size; i++) {
        buffer[i] = 0;
    }
    return buffer;
}

var total = [];
for (var j = 0; j<15; j++) {
    showMem();
    total.push(useMem());
}
showMem();


// ;(function (name, definition) {
//     // 检测上下文环境是否为AMD和CMD
//     var hasDefine = typeof define === 'function',
//         hasExports = typeof module !== 'undefined' && module.exports;

//     if (hasDefine) {
//         define(definition);
//     } else if (hasExports) {
//         module.exports = definition();
//     } else {
//         this[name] = definition();
//     }
// })('hello', function() {
//     var hello = function() {
//         document.write('hello')
//     };
//     return hello;
// });
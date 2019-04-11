var Type = {};

for (var i = 0, type; type = ['String', 'Array', 'Number'][i++];){
    (function(type) {
        Type['is' + type] = function(obj) {
            return Object.prototype.toString.call(obj) === '[object '+type+ ']';
        }
    })(type)
}
console.log(
    Type.isArray([])
);
console.log(Type.isString('str'));

var obj = {
    a: 1,
    getA: function() {
        console.log(this === obj);
        console.log(this.a);
    }
}
var get = obj.getA;
get()

var before = function(fn, beforefn) {
    return function() {
        beforefn.apply(this, arguments);
        return fn.apply(this, arguments);
    }
}

var a = before(
    function() {
        console.log(3);
    },
    function() {
        console.log(2);
    }
)

a = before(a, function() {console.log(1);})

a();

function uniq(arr) {
    var temp = [];
    for (var i = 0; i < arr.length; i++){
        if (temp.indexOf(arr[i]) == -1) {
            temp.push(arr[i])
        }
    }
    temp.sort(function(a, b) {
        return a - b;
    })
    return temp;
}

var aa = [1,2,2,4,9,6,7,5,2,3,5,6,5];
console.log(uniq(aa));

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



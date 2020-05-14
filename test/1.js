// const curry = (fn, ...args) => {
//     console.log('2,', args.length, fn.length);
    
//     return args.length < fn.length ?
//     () => curry(fn, args) : fn(...args);

// }


// function sumFn(a, b, c) {
//     // let args = [...arguments], s = 0;
//     console.log('12,', ...arguments, a, b, c);
    
//     // args.map(arg => {
//     //     s += arg;
//     // })
//     return a + b + c
// }

// let sum = curry(sumFn);

// console.log(sum(2,3,5, 6666));
// console.log(sum(2)(3)(5)(6666));

// function Person(name) {
//     this.name = name;
//     if (typeof this.getName != "function") {
//         Person.prototype = {
//             constructor: Person,
//             getName: function () {
//                return this.name
//             }
//         }
//     }
// }
// function Person(name) {
//     this.name = name;
//     if (typeof this.getName != "function") {
//         Person.prototype.getName =  function () {
//                return this.name
//             }

//     }
// }
// let p = new Person('sjp').getName()

// console.log(p);

function MinStack() {
    let items = [], min = null;

    this.push = function(x) {
        items.push(x);
    }

    this.pop = function() {
        items.pop();
    }

    this.top = function() {
        return items.length ? items[items.length - 1] : null
    }

    this.getMin = function() {
        min = Math.min(...items)
        return min
    }
}

var minStack = new MinStack();
// console.log(minStack.push(111));
// console.log(minStack.push(121));
// console.log(minStack.push(31));
// console.log(minStack.pop());
// console.log(minStack.top());
// console.log(minStack.getMin());

console.log(minStack.push(-2));
console.log(minStack.push(0));
console.log(minStack.push(-3));
console.log(minStack.getMin());
console.log(minStack.pop());
console.log(minStack.top());
console.log(minStack.getMin());

let arr = ["flower","flow","flight"];
let arr1 = ["dog","racecar","car"];


function getLongPre(arr) {
    if (!Array.isArray(arr)) return '请输入数组';
    let minLength;
    arr.forEach(ele => {
        minLength = minLength ? Math.min(minLength, ele.length) : ele.length;
    })

    for (let i = 0; i < minLength; i++) {
        let flag = true,
            pre = arr[i].substring(0, i+1);

        for (let j = 0; j < arr.length; j++) {
            if (arr[j].indexOf(pre) !== 0) {
                flag = false;
            }
        }

        if (!flag) {
            return i > 0 ? arr[i].substring(0, i) : ''
        }
    }

}

console.log(getLongPre(arr))
console.log(getLongPre(arr1))
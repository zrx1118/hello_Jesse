# hello_Jesse
2. typeof的返回值    typeof运算符的返回类型为字符串，值包括如下几种：
1. 'undefined'      --未定义的变量或值
2. 'boolean'        --布尔类型的变量或值
3. 'string'         --字符串类型的变量或值
4. 'number'         --数字类型的变量或值
5. 'object'         --对象类型的变量或值，或者null(这个是js历史遗留问题，将null作为object类型处理)
6. 'function'       --函数类型的变量或值

其实new操作符干了以下三步:
1.先创建了一个新的空对象
2.然后让这个空对象的__proto__指向函数的原型prototype
3.将对象作为函数的this传进去，如果return 出来东西是对象的话就直接返回 return 的内容，没有的话就返回创建的这个对象
对应伪代码：
对于const a = new Foo();，new干了以下事情
const o = new Object();//创建了一个新的空对象o
o.__proto__ = Foo.prototype;//让这个o对象的` __proto__`指向函数的原型`prototype`
Foo.call(o);//this指向o对象
a = o;//将o对象赋给a对象

雅虎军规35条https://www.cnblogs.com/xianyulaodi/p/5755079.html

在h5端，1px会让实际效果展现出2px，那么要实现圆角，我们应该怎么处理？
答： 将整体盒子写成2倍大小之后，再整体缩小到0.5

jquery.extends()与jquery.fn.extends()的区别
jQuery.extend()这个方法，主要是用来拓展个全局函数啦，例如$.ajax()这种，要不就是拓展个选择器啦，例如$.fn.each()，当选择器用。

**大部分插件都是用jQuery.fn.extend()。

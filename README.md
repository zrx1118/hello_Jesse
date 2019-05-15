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
1.尽量减少HTTP请求数
2.减少DNS查找
3.避免重定向（同域名用alias和mod_rewrite,跨域就创建一条CNAME（创建一个指向另一个域名的DNS记录作为别名）结合Alias或者mod_rewrite指令）
4.让Ajax可缓存 
    Gzip组件
    减少DNS查找
    压缩JavaScript
    避免重定向
    配置ETags
5.延迟加载组件
6.预加载组件:
    无条件预加载
    条件性预加载
    提前预加载
7.减少DOM元素的数量
8.跨域分离组件(2-4域名最佳)
9.尽量少用iframe
    用iframe可以把一个HTML文档插入到父文档里，重要的是明白iframe是如何工作的并高效地用它。
    <iframe>的优点：
    引入缓慢的第三方内容，比如标志和广告
    安全沙箱
    并行下载脚本
    <iframe>的缺点：
    代价高昂，即使是空白的iframe
    阻塞页面加载
    非语义
10.杜绝404
css部分：
11.避免使用CSS表达式
12.选择<link>舍弃@import  在IE中用@import与在底部用<link>效果一样，所以最好不要用它。
13.避免使用滤镜
14.把样式表放在顶部
15.去除重复脚本
16.尽量减少DOM访问
    缓存已访问过的元素的索引
    先“离线”更新节点，再把它们添到DOM树上
    避免用JavaScript修复布局问题
17.用智能的事件处理器
18.把脚本放在底部
    不幸的是，Firefox不支持defer属性。
19.把JavaScript和CSS放到外部文件中
20.压缩JavaScript和CSS
23.不要用HTML缩放图片
24.用小的可缓存的favicon.ico（P.S. 收藏夹图标）
    足够小，最好在1K以下
    设置合适的有效期HTTP头（以后如果想换的话就不能重命名了），把有效期设置为几个月后一般比较安全，可以通过检查当前favicon.ico的最后修改日期来确保变更能让浏览器知道。
25.给Cookie减肥
    清除不必要的cookie
    保证cookie尽可能小，以最小化对用户响应时间的影响
    注意给cookie设置合适的域级别，以免影响其它子域
    设置合适的有效期，更早的有效期或者none可以更快的删除cookie，提高用户响应时间
26.把组件放在不含cookie的域下
移动端
27.保证所有组件都小于25K
　　这个限制是因为iPhone不能缓存大于25K的组件
28.把组件打包到一个复合文档里  用这种方式的时候，要先检查用户代理是否支持（iPhone就不支持）。
服务器。
29.Gzip组件
    Accept-Encoding: gzip, deflate
    web服务器通过Content-Encoding相应头来通知客户端：Content-Encoding: gzip
30.避免图片src属性为空
实体标签（ETags），是服务器和浏览器用来决定浏览器缓存中组件与源服务器中的组件是否匹配的一种机制（“实体”也就是组件：图片，脚本，样式表等等）。添加ETags可以提供一种实体验证机制，比最后修改日期更加灵活。一个ETag是一个字符串，作为一个组件某一具体版本的唯一标识符。唯一的格式约束是字符串必须用引号括起来，源服务器用相应头中的ETag来指定组件的ETag：
31.配置ETags
HTTP/1.1 200 OK
      Last-Modified: Tue, 12 Dec 2006 03:03:59 GMT
      ETag: "10c24bc-4ab-457e1c1f"
      Content-Length: 12195
　　然后，如果浏览器必须验证一个组件，它用If-None-Match请求头来把ETag传回源服务器。如果ETags匹配成功，会返回一个304状态码，这样就减少了12195个字节的响应体。

GET /i/yahoo.gif HTTP/1.1
      Host: us.yimg.com
      If-Modified-Since: Tue, 12 Dec 2006 03:03:59 GMT
      If-None-Match: "10c24bc-4ab-457e1c1f"
      HTTP/1.1 304 Not Modified
32.对Ajax用GET请求
　　Yahoo!邮箱团队发现使用XMLHttpRequest时，浏览器的POST请求是通过一个两步的过程来实现的：先发送HTTP头，在发送数据。所以最好用GET请求，它只需要发送一个TCP报文（除非cookie特别多）
33.尽早清空缓冲区
34.使用CDN（内容分发网络）
35.添上Expires或者Cache-Control HTTP头
    对于静态组件：通过设置一个遥远的将来时间作为Expires来实现永不失效
    多余动态组件：用合适的Cache-ControlHTTP头来让浏览器进行条件性的请求

http和https的区别？
    HTTP：是互联网上应用最为广泛的一种网络协议，是一个客户端和服务器端请求和应答的标准（TCP），用于从WWW服务器传输超文本到本地浏览器的传输协议，它可以使浏览器更加高效，使网络传输减少。
    HTTPS：是以安全为目标的HTTP通道，简单讲是HTTP的安全版，即HTTP下加入SSL层，HTTPS的安全基础是SSL，因此加密的详细内容就需要SSL。
    HTTP协议传输的数据都是未加密的，也就是明文的，因此使用HTTP协议传输隐私信息非常不安全，为了保证这些隐私数据能加密传输，于是网景公司设计了SSL（Secure Sockets Layer）协议用于对HTTP协议传输的数据进行加密，从而就诞生了HTTPS。
    1、https协议需要到ca申请证书，一般免费证书较少，因而需要一定费用。
    2、http是超文本传输协议，信息是明文传输，https则是具有安全性的ssl加密传输协议。
    3、http和https使用的是完全不同的连接方式，用的端口也不一样，前者是80，后者是443。
    4、http的连接很简单，是无状态的；HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，比http协议安全。
    三次握手，四次挥手

TCP和UDP的区别
1、TCP是面向链接的，虽然说网络的不安全不稳定特性决定了多少次握手都不能保证连接的可靠性，但TCP的三次握手在最低限度上(实际上也很大程度上保证了)保证了连接的可靠性;而UDP不是面向连接的，UDP传送数据前并不与对方建立连接，对接收到的数据也不发送确认信号，发送端不知道数据是否会正确接收，当然也不用重发，所以说UDP是无连接的、不可靠的一种数据传输协议。
2、也正由于1所说的特点，使得UDP的开销更小数据传输速率更高，因为不必进行收发数据的确认，所以UDP的实时性更好。

```
function add1(n, callback){
    setTimeout(() => {
        callback(n + 1);
    }, 1000);
}

function sum3(n, callback){
    setTimeout(() => {
        callback(n * 3);
    }, 1000)
}

var add1sum3 = async.aaa(add1, sum3);
add1sum3(function(err, result){
    // result  equal 15
})

add1sum3(4, function(err, result){
    // result  equal 15
})
```

一、节流函数
1. 概念：持续触发的事件中，在指定间隔时间执行代码(首次触发时将执行事件)
2. 定时器和时间戳方式
function ajax(...args){
console.log('额外的参数和用户输入',  args)
}
定时器模式：
function throttle(func, delay){
let timeid
return function(...args){
if(!timeid){  //timeid = null 的时候才再次触发定时器
timeid = setTimeout(() => {
func.apply(this, args)
timeid = null
}, delay)
}
}
}
使用：
const throttleAjax = throttle(ajax, 1000)
input.addEventLister('input',function(e){
throttleAjax(e.target.value, 1, 2)
})
时间戳模式：
fucntion throttle(func, delay){
let time = 0
return function(...args){
let now = Date.now()
//当前时间 - 上一次执行时间 > 延迟时间
if(now - time > delay){ 
func.apply(this, args)
time = now
}
}
}
使用：
const throttleAjax = throttle(ajax, 1000)
input.addEventLister('input',function(e){
throttleAjax(e.target.value, 1, 2)
})

二、防抖
1. 概念：持续触发的事件中，只在停止触发后的规定时间内执行代码
2. 源码
function debounce(func, delay){
return function(...args){
clearTimeout(func.tid)
func.tid = setTimeout(() => func.apply(this, args), delay)
}
}
3. 使用
function ajax(...args){
console.log('用户输入和额外的入参', args)
}
const debounceAjax = debounct(ajax, 500)
input.addEventLister('input', function(e){
debounceAjax(e.target.value, 1, 2)  //1,2 就是额外的参数
})

三、函数绑定
1. 概念：返回给定环境中调用给定函数的函数，并且将所有参数原封不动的传递过去。在bind函数中创建一个闭包，闭包使用apply调用，并给apply传递执行上下文对象和arguments实参列表
2. bind函数：
function bind(func, content){
returent (...args) = > func.apply(content, args)
}
四、函数柯里化
1. 概念：只有一个参数的函数，而这个函数返回一个才有参数的函数，实现能写两个参数的函数
2. 作用(场景)
a. 减低通用性，提高实用性
b. 延迟执行，不断柯里化，累计传入的参数，最后执行
c. 使用闭包

2. 特点
a. 函数可以作为参数传递
b. 函数能够作为函数的返回值
c. 使用闭包

在h5端，1px会让实际效果展现出2px，那么要实现圆角，我们应该怎么处理？
答： 将整体盒子写成2倍大小之后，再整体缩小到0.5

HTML5 新特性？
    1.新的文档类型 (New Doctype)
    2.脚本和链接无需type
    3.语义Header和Footer (The Semantic Header and Footer)
    4.Hgroup
        <header>
            <hgroup>
            <h1> Recall Fan Page </h1>
            <h2> Only for people who want the memory of a lifetime. </h2>
            </hgroup>
        </header>
    5.标记元素 (Mark Element)  把它当做高亮标签
    6.图形元素 (Figure Element)
        <figure>
            <img src="path/to/image" alt="About image" />
            <figcaption>
                <p>This is an image of something interesting.</p>
            </figcaption>
        </figure>
    7.重新定义small (Small Element redefined)
    8.占位符 (Placeholder)
    9.必要属性 (Required Attribute)
    10.Autofocus 属性 (Autofocus Attribute)
    11.Audio 支持 (Audio Support)
    12.Video 支持 (Video Support)
    13.视频预载 (Preload attribute in Videos element)
    14.显示控制条 (Display Controls)
    15.正则表达式 (Regular Expressions)


jquery.extends()与jquery.fn.extends()的区别
jQuery.extend()这个方法，主要是用来拓展个全局函数啦，例如$.ajax()这种，要不就是拓展个选择器啦，例如$.fn.each()，当选择器用。

**大部分插件都是用jQuery.fn.extend()。

vue的nextTick方法的实现原理了，总结一下就是：
vue用异步队列的方式来控制DOM更新和nextTick回调先后执行
microtask因为其高优先级特性，能确保队列中的微任务在一次事件循环前被执行完毕
因为兼容性问题，vue不得不做了microtask向macrotask的降级方案

Webpack 热更新实现原理分析

详解Object.is()与比较操作符===、==

jsonp是创建一个script标签，将script的src属性具有跨域的特性，回调函数进行get的请求。

实现一个isMatch(str)方法，只包含(){}[],比如“(){[()]}, [({}){}]"这种是匹配的，那么函数怎么实现

了解排序么，选择排序，冒泡排序，sort方法；

react 生命周期函数
初始化阶段：
    getDefaultProps:获取实例的默认属性
    getInitialState:获取每个实例的初始化状态
    componentWillMount：组件即将被装载、渲染到页面上
    render:组件在这里生成虚拟的 DOM 节点
    componentDidMount:组件真正在被装载之后
运行中状态：
    componentWillReceiveProps:组件将要接收到属性的时候调用
    shouldComponentUpdate:组件接受到新属性或者新状态的时候（可以返回 false，接收数据后不更新，阻止 render 调用，后面的函数不会被继续执行了）
    componentWillUpdate:组件即将更新不能修改属性和状态
    render:组件重新描绘
    componentDidUpdate:组件已经更新
销毁阶段：
    componentWillUnmount:组件即将销毁

所谓的 Virtual DOM 算法。包括几个步骤：
    1.用 JavaScript 对象结构表示 DOM 树的结构；然后用这个树构建一个真正的 DOM 树，插到文档当中
    2.当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异
    3.把2所记录的差异应用到步骤1所构建的真正的DOM树上，视图就更新了
        算法的实现：
            步骤一：用JS对象模拟DOM树
            步骤二：比较两棵虚拟DOM树的差异
                2.1 深度优先遍历，记录差异
                2.2 差异类型
                    1.替换掉原来的节点，例如把上面的div换成了section
                    2.移动、删除、新增子节点，例如上面div的子节点，把p和ul顺序互换
                    3.修改了节点的属性
                    4.对于文本节点，文本内容可能会改变。例如修改上面的文本节点2内容为Virtual DOM 2。
                2.3 列表对比算法
            步骤三：把差异应用到真正的DOM树上
    总结：Virtual DOM 算法主要是实现上面步骤的三个函数：element，diff，patch。然后就可以实际的进行使用

MVC的调用关系
用户的对View操作以后，View捕获到这个操作，会把处理的权利交移给Controller（Pass calls）；Controller会对来自View数据进行预处理、决定调用哪个Model的接口；然后由Model执行相关的业务逻辑；当Model变更了以后，会通过观察者模式（Observer Pattern）通知View；View通过观察者模式收到Model变更的消息以后，会向Model请求最新的数据，然后重新更新界面。如下图：
    1.View是把控制权交移给Controller，Controller执行应用程序相关的应用逻辑（对来自View数据进行预处理、决定调用哪个Model的接口等等）。
    2.Controller操作Model，Model执行业务逻辑对数据进行处理。但不会直接操作View，可以说它是对View无知的。
    3.View和Model的同步消息是通过观察者模式进行，而同步操作是由View自己请求Model的数据然后对视图进行更新。

MVC的优缺点
优点：
    把业务逻辑和展示逻辑分离，模块化程度高。且当应用逻辑需要变更的时候，不需要变更业务逻辑和展示逻辑，只需要Controller换成另外一个Controller就行了（Swappable Controller）。
    观察者模式可以做到多视图同时更新。
缺点：
    Controller测试困难。因为视图同步操作是由View自己执行，而View只能在有UI的环境下运行。在没有UI环境下对Controller进行单元测试的时候，应用逻辑正确性是无法验证的：Model更新的时候，无法对View的更新操作进行断言。
    View无法组件化。View是强依赖特定的Model的，如果需要把这个View抽出来作为一个另外一个应用程序可复用的组件就困难了。因为不同程序的的Domain Model是不一样的

MVVM的优缺点
优点：
    提高可维护性。解决了MVP大量的手动View和Model同步的问题，提供双向绑定机制。提高了代码的可维护性。
    简化测试。因为同步逻辑是交由Binder做的，View跟着Model同时变更，所以只需要保证Model的正确性，View就正确。大大减少了对View同步更新的测试。
缺点：
    过于简单的图形界面不适用，或说牛刀杀鸡。
    对于大型的图形应用程序，视图状态较多，ViewModel的构建和维护的成本都会比较高。
    数据绑定的声明是指令式地写在View的模版当中的，这些内容是没办法去打断点debug的。

var a = [1, 3, 5, 7, 11];
var b = [1, 5, 5, 7];
var c = [1, 5, 7];

**书名
javascript权威指南
数据结构与算法JavaScript描述
图解HTTP
隐匿在计算机软硬件背后的语言(永不退色的计算机科学经典著作)
css揭秘

```
html文档
<script>
for(var i = 0; i< 100000000; i++) {
    console.log(i)
}
</script>
html文档

解题思路：requestAnimationFrame代替setTimeout
```

可以先准备一下这些问题怎么回答：
自我介绍
职业规划
岗位优势
自身缺点
业余时间安排
想问面试官的
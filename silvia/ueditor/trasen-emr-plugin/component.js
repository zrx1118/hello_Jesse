/**
 * 自定义组件js
 * 构造 new component(ueditor)
 * 构造ueditor参数-百度富文本编辑器对象
 * @type {{}}
 */
var component = (function(ue){
    var ueditor;
    var self;
    var domUtils = UE.dom.domUtils;

    _constructor = function(ue){
        ueditor = ue;
        self = this;
        initEvent();
    };

    /**
     * 初始化组件相关事件
     * 构造对象时，默认调用该方法，进行相关初始化
     * @param ueditor 富文本编辑器dom对象
     */
    var initEvent = function () {
        var document =$(ueditor.document);
        var plugins = document.find("[name=cxNewField]");
        //添加选区改变事件
        ueditor.addListener('selectionchange', selectionchange);
        //控件点击事件
        plugins.on("click", plugins_click);
        //编辑器键盘事件
        document.on("keydown", ueditorKeyDown);
        document.on("click", ueditorClick)
    };

    var ueditorClick = function () {
        //取消其他选中控件样式
        $(ueditor.document).find("[class*=FocusedBackColor]").attr("class", "extract_field");
    }
    /**
     * 自定义组件点击事件
     * @param event
     */
    var plugins_click = function (event) {
        //取消其他选中控件样式
        $(ueditor.document).find("[class*=FocusedBackColor]").attr("class", "extract_field");

        var cxtype = $(this).attr("cxtype");
        switch (cxtype){
            case "extract":
                this.setAttribute("class", "extract_field FocusedBackColor");
                var bgtext = $(this).find("[cxtype=bgtext]");
                if(bgtext && bgtext.length > 0){
                    var range = ueditor.selection.getRange();
                    range.setStartBefore(bgtext[0]);
                    range.setEndBefore(bgtext[0]);
                    range.setCursor();
                }
                break;
        }

        window.event? window.event.cancelBubble = true : event.stopPropagation();
    };

    /**
     * 选区变化事件
     */
    var selectionchange = function () {
        pluginsRange();
    };

    /**
     * 自定义组件选区移动函数
     * 保证自定义标签内，内容输入的位置正确
     */
    var pluginsRange = function () {
        var cxplugins = self.checkPlugins();
        //表示当前选区是在自定义组件中
        if(cxplugins && self.checkAttr(cxplugins, 'cxtype' , 'extract')){
            var range = ueditor.selection.getRange();
            var node = range.startContainer;
            if(node == cxplugins && node.childNodes.length == range.endOffset){
                range.setStartAfter(node);
                range.setEndAfter(node);
                range.setCursor();
            }else if(node == node.parentNode.lastChild){
                range.setStartAfter(node.parentNode);
                range.setEndAfter(node.parentNode);
                range.setCursor();
            }
        }
    };

    /**
     * 百度富文本键盘事件
     * @param event
     * @return {boolean}
     */
    var ueditorKeyDown = function (event) {
        //判断ctrl键是否按下，快捷键直接返回不拦截
        if(event.ctrlKey==1){
            return true;
        }
        var range = ueditor.selection.getRange();
        var keyCode = event.keyCode;

        //返回值，判断键盘事件是否阻塞。默认不阻塞
        var result = true;

        //键盘左右键移动光标
        if(event.shiftKey != 1 && keyCode == 37){
            result = moveLeftUeCursor(range);
        }else if(event.shiftKey != 1 && keyCode == 39){
            result = moveRightUeCursor(range);
        }
        if(!result){ //阻止事件后，统一设置光标位置
            range.setCursor();
        }
        return result;
    };
    /**
     * 光标左移动函数
     * @return boolean false-阻止键盘原事件 true-不阻止
     */
    var moveLeftUeCursor = function (range) {
        var node,parentNode,nextNode;
        node = range.startContainer;
        parentNode = node.parentNode;

        if(range.startOffset == 0){
            //递归到最左，结束递归
            if(domUtils.isBody(node)){return true;}
            //开始位置为0时，移动选区到节点之前
            range.setStartBefore(node);
            range.setEndBefore(node);
            return moveLeftUeCursor(range);
        }else if(node.nodeType == 3){ //文本
            //解决空白文本问题,通过递归进行忽略
            var text = node.textContent.replace(/\u200B/g,'');
            if(text == ""){
                range.setStart(parentNode, domUtils.getNodeIndex(node));
                range.setEnd(parentNode,  domUtils.getNodeIndex(node));
                return moveLeftUeCursor(range);
            }
            return true;
        }else{
            nextNode = node.childNodes[range.startOffset - 1];
            var cxtype = nextNode.nodeType == 1 ? nextNode.getAttribute("cxtype") : "";
            switch (cxtype){
                case "extract":
                case "bgtext":
                case "end":
                    var bgtext = $(nextNode).find("[cxtype=bgtext]");
                    if(bgtext && bgtext.length > 0){
                        range.setStartBefore(bgtext[0]);
                        range.setEndBefore(bgtext[0]);
                    }else{
                        range.setStart(nextNode, nextNode.childNodes.length - 1);
                        range.setEnd(nextNode,  nextNode.childNodes.length - 1);
                    }
                    nextNode.setAttribute("class", "extract_field FocusedBackColor");//选中样式
                    return false;
                case "start":
                    range.setStartBefore(node);
                    range.setEndBefore(node);
                    node.setAttribute("class", "extract_field");//未选中样式
                    return false;
                default:
                    return true;
            }
        }
    };

    var moveRightUeCursor = function (range) {
        var node,parentNode,nextNode;
        node = range.endContainer;
        parentNode = node.parentNode;

        if(node.nodeType == 3){
            //解决空白文本问题,通过递归进行忽略
            var text = node.textContent.replace(/\u200B/g,'');
            if(text == "" || node.length == range.endOffset){
                range.setStartAfter(node);
                range.setEndAfter(node);
                return moveRightUeCursor(range);
            }
            return true;
        }else {
            //判断是否为元素最后
            if (range.endOffset == node.childNodes.length) {
                //递归到最左，结束递归
                if(domUtils.isBody(node)){return true;}
                range.setStartAfter(node);
                range.setEndAfter(node);
                return moveRightUeCursor(range);
            } else {
                nextNode = node.childNodes[range.endOffset];
                var cxtype = nextNode.nodeType == 1 ? nextNode.getAttribute("cxtype") : "";
                switch (cxtype) {
                    case "extract":
                        range.setStart(nextNode, 1);
                        range.setEnd(nextNode, 1);
                        nextNode.setAttribute("class", "extract_field FocusedBackColor");//选中样式
                        return false;
                    case "bgtext":
                    case "end":
                        range.setStartAfter(node);
                        range.setEndAfter(node);
                        node.setAttribute("class", "extract_field");//未选中样式
                        return false;
                    default:
                        return true;
                }
            }
        }
    };

    /**
     * 模块公共方法
     * @type {{}}
     */
    _constructor.prototype = {
        /**
         * 判断当前选区位置是否在自定义组件中
         * 返回当前自定义组件或者NUll
         * @return {*|Node|NULL}
         */
        checkPlugins:function () {
            var range = ueditor.selection.getRange();
            //选区未闭合，不进行处理
            if (!range.collapsed){ return null;}
            var startNode = range.startContainer;
            //根据cxplugins属性，确定哪些组件需要调整输入位置
            var cxplugins = domUtils.findParentByTagName(startNode, ['span'], true, function (node) {
                return node.getAttribute("name") != 'cxNewField';
            });
            return cxplugins;
        },
        /**
         * 检查节点属性
         * @param node 节点
         * @param attr 属性字段
         * @param value 属性值
         * @return {boolean}
         */
        checkAttr:function (node, attr, value) {
            return node.getAttribute(attr) == value;
        }
    };
    return _constructor;
})();
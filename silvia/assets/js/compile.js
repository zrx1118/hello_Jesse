function Compile(el, vm) {
    this.vm = vm;
    this.el = document.querySelector(el);
    this.fragment = null;
    this.init();
}

Compile.prototype = {
    init: function() {
        if (this.el) {
            this.fragment = this.nodeToFragment(this.el);
            this.compileElement(this.fragment);
            this.el.appendChild(this.fragment);
        } else {
            console.log('Dom元素不存在')
        }
    },
    nodeToFragment: function(el) {
        var fragment = document.createDocumentFragment();
        var child = el.firstChild;
        while(child) {
            fragment.appendChild(child)
            child = el.firstChild;
        }
        return fragment
    },
    compileElement: function(el) {
        var self = this;
        var childNodes = el.childNodes;
        [].slice.call(childNodes).forEach(function(node) {
            var reg = /\{\{(.*)\}\}/;
            var text = node.textContent;
            if (self.isElementNode(node)) {
                self.compile(node)
            } else if (self.isTextNode(node) && reg.test(text)) {
                self.compileText(node, reg.exec(text)[1])
            }
    
            if (node.childNodes && node.childNodes.length) {
                self.compileElement(node)
            }
        })
    },
    compile: function(node) {
        var nodeAttrs = node.attributes;
        var self = this;
        Array.prototype.forEach.call(nodeAttrs, function(attr) {
            var attrName = attr.name;
            if (self.isDirective(attrName)) {
                var exp = attr.value;
                var dir = attrName.substring(2);
                if (self.isEventDirective(dir)) {
                    self.compileEvent(node, self.vm, exp, dir);
                } else {
                    self.compileModel(node, self.vm, exp, dir);
                }
                node.removeAttribute(attrName)
            }
        })
    },
    compileText: function(node, exp) {
        var self = this;
        var initText = this.vm[exp];
        this.updateText(node, initText); // 将初始化的数据初始化到视图中
        new Watcher(this.vm, exp, function(value) {
            self.updateText(node, value);
        })
    },
    compileEvent: function(node, vm, exp, dir) {
        var eventType = dir.split(':')[1];
        var cb = vm.methods && this.vm.methods[exp];
        if (eventType && cb) {
            node.addEventListener(eventType, cb.bind(vm), false);
        }
    },
    compileModel: function(node, vm, exp, dir) {
        var self = this;
        var val = this.vm[exp];
        this.modelUpdate(node, val);
        new Watcher(this.vm, exp, function(value) {
            self.modelUpdate(node, value)
        })

        node.addEventListener('input', function(e) {
            var newValue = e.target.value;
            if (val === newValue) {
                return
            }
            self.vm[exp] = newValue;
            val = newValue
        })
    },
    modelUpdate: function(node, value) {
        node.value = typeof value == 'undefined'? '' : value; 
    },
    updateText: function(node, value) {
        node.textContent = typeof value == 'undefined' ? '' : value;
    },
    isElementNode: function(node) {
        return node.nodeType == 1;
    },
    isTextNode: function(node) {
        return node.nodeType == 3;
    },
    isEventDirective: function(dir) {
        return dir.indexOf('on:') === 0;
    },
    isDirective: function(attr) {
        return attr.indexOf('v-') == 0;
    }
}


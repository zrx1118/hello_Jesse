/*
 * 设计器私有的配置说明
 * 一
 * UE.CXFormDesignUrl  插件路径
 *
 * 二
 *UE.getEditor('myFormDesign',{
 *          toolEmr:true,//是否显示，设计器的清单 tool
 */
UE.trasenFormDesignUrl = 'trasen-emr-plugin';

/**
 * 医学表达式
 */
UE.plugins['medical'] = function() {
    var me = this,
        thePlugins = 'medical';
    me.commands[thePlugins] = {
        queryCommandState: function() {

        },
        execCommand: function() {
            var dialog = new UE.ui.Dialog({
                iframeUrl: this.options.UEDITOR_HOME_URL + UE.trasenFormDesignUrl + '/medical/medical.html',
                name: thePlugins,
                editor: this,
                title: '医学表达式',
                cssRules: "width:600px;height:182px;",
                buttons: [{
                        className: 'edui-okbutton',
                        label: '确定',
                        onclick: function() {
                            dialog.close(true);
                        }
                    },
                    {
                        className: 'edui-cancelbutton',
                        label: '取消',
                        onclick: function() {
                            dialog.close(false);
                        }
                    }
                ]
            });
            dialog.render();
            dialog.open();
        }
    };
    var popup = new baidu.editor.ui.Popup({
        id: 'medical1',
        editor: this,
        content: '',
        className: 'edui-bubble',
        _edittext: function() {
            baidu.editor.plugins[thePlugins].editdom = popup.anchorEl;
            me.execCommand(thePlugins);
            this.hide();
        },
        _delete: function() {
            if(window.confirm('确认删除该控件吗？')) {
                baidu.editor.dom.domUtils.remove(this.anchorEl, false);
            }
            this.hide();
        }
    });
    popup.render();
    me.addListener('mouseover', function(t, evt) {
        evt = evt || window.event;
        var el = evt.target || evt.srcElement;
        var leipiPlugins = el.getAttribute('cxtype');
        if(/span/ig.test(el.tagName) && leipiPlugins == thePlugins) {
            var html = popup.formatHtml(
                '<nobr>医学表示式: <span onclick=$$._edittext() class="edui-clickable">编辑</span>&nbsp;&nbsp;<span onclick=$$._delete() class="edui-clickable">删除</span></nobr>');
            if(html) {
                popup.getDom('content').innerHTML = html;
                popup.anchorEl = el;
                popup.showAnchor(popup.anchorEl);
            } else {
                popup.hide();
            }
        }
    });
};

/**
 * 结构化数据
 * @command struct
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @example
 * ```javascript
 * editor.execCommand( 'struct');
 * ```
 */
UE.plugins['struct'] = function() {
    var me = this,
        thePlugins = 'struct';
    me.commands[thePlugins] = {
        execCommand: function() {
            var dialog = new UE.ui.Dialog({
                iframeUrl: this.options.UEDITOR_HOME_URL + UE.trasenFormDesignUrl + '/dialogs/struct.html',
                name: thePlugins,
                editor: this,
                title: '结构化数据',
                cssRules: "width:600px;height:350px;",
                buttons: [{
                    className: 'edui-cancelbutton',
                    label: '取消',
                    onclick: function() {
                        dialog.close(false);
                    }
                }]
            });
            dialog.render();
            dialog.open();
        }
    };
    var popup = new baidu.editor.ui.Popup({
        id: 'struct1',
        editor: this,
        content: '',
        className: 'edui-bubble',
        _delete: function() {
            if(window.confirm('确认删除该控件吗？')) {
                baidu.editor.dom.domUtils.remove(this.anchorEl, false);
            }
            this.hide();
        }
    });
    popup.render();
    me.addListener('mouseover', function(t, evt) {
        evt = evt || window.event;
        var el = evt.target || evt.srcElement;
        var cxtype = el.getAttribute('cxtype');
        if(cxtype && el.parentNode) {
            el = el.parentNode;
        }
        var plugins = el.getAttribute("cxtype");
        if(/span/ig.test(el.tagName) && plugins == thePlugins) {
            var html = popup.formatHtml(
                '<nobr>结构化数据: <span onclick=$$._delete() class="edui-clickable">删除</span></nobr>');
            if(html) {
                popup.getDom('content').innerHTML = html;
                popup.anchorEl = el;
                popup.showAnchor(popup.anchorEl);
            } else {
                popup.hide();
            }
        }
    });
};

/**
 * 数据提取组件
 * @command extract
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @example
 * ```javascript
 * editor.execCommand( 'extract');
 * ```
 */
UE.plugins['extract'] = function() {
    var me = this,
        thePlugins = 'extract';
    me.commands[thePlugins] = {
        queryCommandState: function() {
            var range = this.selection.getRange();
            var node = range.startContainer;
            var parent = UE.dom.domUtils.findParentByTagName(node, ['span'], false, function(node) {
                return !node.getAttribute("cxtype");
            });
            return range.collapsed && !parent ? 1 : -1;
        },
        execCommand: function() {
            var dialog = new UE.ui.Dialog({
                iframeUrl: this.options.UEDITOR_HOME_URL + UE.trasenFormDesignUrl + '/dialogs/extract.html',
                name: thePlugins,
                editor: this,
                title: '数据提取组件',
                cssRules: "width:600px;height:350px;",
                buttons: [{
                    className: 'edui-cancelbutton',
                    label: '取消',
                    onclick: function() {
                        dialog.close(false);
                    }
                }]
            });
            dialog.render();
            dialog.open();
        }
    };
    var popup = new baidu.editor.ui.Popup({
        id: 'extract1',
        editor: this,
        content: '',
        className: 'edui-bubble',
        _delete: function() {
            if(window.confirm('确认删除该控件吗？')) {
                baidu.editor.dom.domUtils.remove(this.anchorEl, false);
            }
            this.hide();
        }
    });
    popup.render();
    me.addListener('mouseover', function(t, evt) {
        evt = evt || window.event;
        var el = evt.target || evt.srcElement;
        var cxtype = el.getAttribute('cxtype');
        if(cxtype && el.parentNode) {
            el = el.parentNode;
        }
        var plugins = el.getAttribute("cxtype");
        if(/span/ig.test(el.tagName) && plugins == thePlugins) {
            var html = popup.formatHtml(
                '<nobr>数据提取组件: <span onclick=$$._delete() class="edui-clickable">删除</span></nobr>');
            if(html) {
                popup.getDom('content').innerHTML = html;
                popup.anchorEl = el;
                popup.showAnchor(popup.anchorEl);
            } else {
                popup.hide();
            }
        }
    });
};

/**
 * 导出xml
 */
UE.registerUI('export_xml', function(editor, uiName) {
    if(!this.options.toolEmr) {
        return false;
    }
    //注册按钮执行时的command命令，使用命令默认就会带有回退操作
    editor.registerCommand(uiName, {
        execCommand: function() {
            leipiFormDesign.exportXML();
        }
    });
    //创建一个button
    var btn = new UE.ui.Button({
        //按钮的名字
        name: uiName,
        //提示
        title: "导出XML",
        //需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
        cssRules: 'background-image:url("static/ueditor/themes/default/images/xml.png") !important;',
        //点击时执行的命令
        onclick: function() {
            editor.execCommand(uiName);
        }
    });
    //因为你是添加button,所以需要返回这个button
    return btn;
});
/**
 * 打开
 */
UE.registerUI('open_xml', function(editor, uiName) {
    if(!this.options.toolEmr) {
        return false;
    }
    //注册按钮执行时的command命令，使用命令默认就会带有回退操作
    editor.registerCommand(uiName, {
        execCommand: function() {
            leipiFormDesign.openXML();
        }
    });
    //创建一个button
    var btn = new UE.ui.Button({
        //按钮的名字
        name: uiName,
        //提示
        title: "打开xml",
        //需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
        cssRules: 'background-image:url("static/ueditor/themes/default/images/xml.png") !important;',
        //点击时执行的命令
        onclick: function() {
            editor.execCommand(uiName);
        }
    });
    //因为你是添加button,所以需要返回这个button
    return btn;
});

UE.plugins['header'] = function() {
    var me = this,
        thePlugins = 'header';
    me.commands[thePlugins] = {
        execCommand: function() {
            var header = "<header><p>键入页眉</p><hr/></header>";
            var originalHead = me.document.getElementsByTagName("header");

            if(originalHead.length > 0) {
                if(confirm("已存在页眉，是否重置？")) {
                    me.window.document.body.removeChild(originalHead[0]);
                    me.window.document.body.innerHTML = header + me.window.document.body.innerHTML;
                }
            } else {
                me.window.document.body.innerHTML = header + me.window.document.body.innerHTML;
            }
        }
    };
};

/**
 * 插入页眉
 */
UE.registerUI('header_btn', function(editor, uiName) {
    if(!this.options.toolEmr) {
        return false;
    }
    //创建一个button
    var btn = new UE.ui.Button({
        //按钮的名字
        name: uiName,
        //提示
        title: "插入页眉",
        cssRules: 'background-image:url("static/ueditor/themes/default/images/header.png") !important;',
        //点击时执行的命令
        onclick: function() {
            editor.execCommand("header");
        }
    });
    return btn;
});

UE.plugins['footer'] = function() {
    var me = this,
        thePlugins = 'footer';
    me.commands[thePlugins] = {
        execCommand: function() {
            var footer = "<footer><hr><p>键入页脚</p></footer>";
            var originalFooter = me.document.getElementsByTagName("footer");

            if(originalFooter.length > 0) {
                if(confirm("已存在页脚，是否重置？")) {
                    me.window.document.body.removeChild(originalFooter[0]);
                    me.window.document.body.innerHTML = me.window.document.body.innerHTML + footer;
                }
            } else {
                me.window.document.body.innerHTML = me.window.document.body.innerHTML + footer;
            }
        }
    };
};

/**
 * 插入页脚
 */
UE.registerUI('footer_btn', function(editor, uiName) {
    if(!this.options.toolEmr) {
        return false;
    }
    //创建一个button
    var btn = new UE.ui.Button({
        //按钮的名字
        name: uiName,
        //提示
        title: "插入页脚",
        cssRules: 'background-image:url("static/ueditor/themes/default/images/header.png") !important;',
        //点击时执行的命令
        onclick: function() {
            editor.execCommand("footer");
        }
    });
    return btn;
});

UE.plugins['showhead'] = function() {
    var me = this,
        b = 0,
        thePlugins = 'showhead';
    me.commands[thePlugins] = {
        execCommand: function() {
            var header = me.window.document.getElementsByTagName("header");
            if(header.length > 0) {
                if(b == 1) {
                    $(header).removeAttr("style");
                    b = 0;
                } else if(b == 0) {
                    $(header).attr("style", "border:1px solid red");
                    b = 1;
                }
            }
        },
        queryCommandState: function() {
            return b;
        }
    };
};

/**
 * 编辑页眉
 */
UE.registerUI('showhead_btn', function(editor, uiName) {
    if(!this.options.toolEmr) {
        return false;
    }
    //创建一个button
    var btn = new UE.ui.Button({
        //按钮的名字
        name: uiName,
        //提示
        title: "编辑页眉",
        cssRules: 'background-image:url("static/ueditor/themes/default/images/header.png") !important;',
        //点击时执行的命令
        onclick: function() {
            editor.execCommand("showhead");
        }
    });
    return btn;
});

/**
 * 只读模式
 */
UE.registerUI('readview', function(editor, uiName) {
    if(!this.options.toolEmr) {
        return false;
    }
    //创建一个button
    var btn = new UE.ui.Button({
        //按钮的名字
        name: uiName,
        //提示
        title: "只读模式",
        cssRules: 'background-image:url("static/ueditor/themes/default/images/read.png") !important;',
        //点击时执行的命令
        onclick: function() {
            editor.execCommand("tabview", uiName);
        }
    });
    return btn;
});
/**
 * 编辑模式
 */
UE.registerUI('editorview', function(editor, uiName) {
    if(!this.options.toolEmr) {
        return false;
    }
    var btn = new UE.ui.Button({
        //按钮的名字
        name: uiName,
        //提示
        title: "编辑模式",
        cssRules: 'background-image:url("static/ueditor/themes/default/images/editor.png") !important;',
        //点击时执行的命令
        onclick: function() {
            editor.setEnabled();
            editor.execCommand("tabview", uiName);
        }
    });
    return btn;
});
/**
 * 整洁视图
 */
UE.registerUI('cleanview', function(editor, uiName) {
    if(!this.options.toolEmr) {
        return false;
    }
    var btn = new UE.ui.Button({
        //按钮的名字
        name: uiName,
        //提示
        title: "整洁视图",
        cssRules: 'background-image:url("static/ueditor/themes/default/images/editor.png") !important;',
        //点击时执行的命令
        onclick: function() {
            editor.execCommand("tabview", uiName);
        }
    });
    return btn;
});
/**
 * 留痕视图
 */
UE.registerUI('traceview', function(editor, uiName) {
    if(!this.options.toolEmr) {
        return false;
    }
    var btn = new UE.ui.Button({
        //按钮的名字
        name: uiName,
        //提示
        title: "留痕视图",
        cssRules: 'background-image:url("static/ueditor/themes/default/images/editor.png") !important;',
        //点击时执行的命令
        onclick: function() {
            editor.execCommand("tabview", uiName);
        }
    });
    return btn;
});
/**
 * 视图切换
 */
UE.plugins['tabview'] = function() {
    var me = this,
        thePlugins = 'tabview';
    me.commands[thePlugins] = {
        execCommand: function(commandName, params) {
            this.options.view = params;
            var content = this.getContent();
            if(params == "traceview") {
                content = content.replace(/class="not_del_remains"/g, 'class="del_remains"');
                content = content.replace(/class="not_add_remains"/g, 'class="add_remains"');
                me.setContent(content);
            } else if(params == "cleanview") {
                content = content.replace(/class="del_remains"/g, 'class="not_del_remains"');
                content = content.replace(/class="add_remains"/g, 'class="not_add_remains"');
                me.setContent(content);
            } else if(params == "readview") {
                me.setDisabled();
            } else if(params == "editorview") {
                me.setEnabled();
            }
        }
    };
};

/**
 * 页边距
 */
var pagedistance = 0; //用于记录当前页边距选择
UE.plugins['pagedistance'] = function() {
    var me = this,
        thePlugins = 'pagedistance';
    me.commands[thePlugins] = {
        execCommand: function(commandName, params) {
            var styleObj = {
                '1': {
                    'margin': '37.8px auto',
                    "width": "718.2px",
                    'height': '1280px'
                },
                '2': {
                    'margin': '37.8px auto',
                    "width": "697.8px",
                    'height': '1280px'
                },
                '3': {
                    'margin': '37.8px auto',
                    "width": "601.8px",
                    'height': '1280px'
                }
            };
            pagedistance = params;
            var styles = styleObj[params];
            var node = this.document.body;
            UE.dom.domUtils.setStyles(node, styles);
        },
        queryCommandValue: function() {
            return pagedistance;
        }
    };
};
UE.registerUI('pagedistance_btn', function(editor, uiName) {
    if(!this.options.toolEmr) {
        return false;
    }
    var cmd = "pagedistance";
    //创建下拉菜单中的键值对，这里我用字体大小作为例子
    var items = [];
    for(var i = 0, ci; ci = [{
            "label": "1厘米",
            "value": "1"
        }, {
            "label": "1.27厘米",
            "value": "2"
        }, {
            "label": "2.54厘米",
            "value": "3"
        }][i++];) {
        //label - 显示的条目  value - 选中条目后的返回值
        items.push({
            label: ci.label,
            value: ci.value,
            onclick: function() {
                editor.execCommand(cmd, this.value);
            }
        });
    }
    //创建下拉框
    var ui = new UE.ui.MenuButton({
        title: "页边距", //提示
        editor: editor,
        className: 'edui-for-lineheight',
        items: items, //添加条目
        onbuttonclick: function() {
            var value = editor.queryCommandValue(cmd) || this.value;
            editor.execCommand(cmd, value);
        }
    });
    UE.ui.buttons[uiName] = ui;
    editor.addListener('selectionchange', function() {
        var state = editor.queryCommandState(cmd);
        if(state == -1) {
            ui.setDisabled(true);
        } else {
            ui.setDisabled(false);
            var value = editor.queryCommandValue(cmd);
            value && ui.setValue((value + ''));
            ui.setChecked(state)
        }
    });
    return ui;
});
/**
 * 页行高
 */
UE.plugins['pagelineheight'] = function() {
    var me = this,
        thePlugins = 'pagelineheight';
    me.commands[thePlugins] = {
        execCommand: function(commandName, params) {
            UE.utils.cssRule(thePlugins, "p{line-height:" + params + "em;margin:0px;word-break:normal;}", this.document);
        },
        queryCommandValue: function() {
            var node = this.document.getElementById(thePlugins);
            if(node) {
                var lineHeight = node.sheet.cssRules[0].style.lineHeight;
                return lineHeight ? lineHeight : 1;
            } else {
                return 1;
            }
        }
    };
};
UE.registerUI('pagelineheight_btn', function(editor, uiName) {
    if(!this.options.toolEmr) {
        return false;
    }
    var cmd = "pagelineheight";
    //创建下拉菜单中的键值对，这里我用字体大小作为例子
    var items = [];
    for(var i = 0, ci; ci = [1, 1.5, 1.75, 2, 3, 4, 5][i++];) {
        //label - 显示的条目  value - 选中条目后的返回值
        items.push({
            label: ci,
            value: ci,
            onclick: function() {
                editor.execCommand(cmd, this.value);
            }
        });
    }
    //创建下来框
    var ui = new UE.ui.MenuButton({
        title: "页行高", //提示
        editor: editor,
        className: 'edui-for-lineheight',
        items: items, //添加条目
        onbuttonclick: function() {
            var value = editor.queryCommandValue(cmd) || this.value;
            editor.execCommand(cmd, value);
        }
    });
    UE.ui.buttons[uiName] = ui;
    editor.addListener('selectionchange', function() {
        var state = editor.queryCommandState(cmd);
        if(state == -1) {
            ui.setDisabled(true);
        } else {
            ui.setDisabled(false);
            var value = editor.queryCommandValue(cmd);
            value && ui.setValue((value + '').replace(/em/, ''));
            ui.setChecked(state)
        }
    });
    return ui;
});

/**
 * 单元格锁定
 */
UE.plugins['lock_cell'] = function() {
    var me = this,
        thePlugins = 'lock_cell';
    me.commands[thePlugins] = {
        queryCommandState: function() {
            return UE.UETable.getTableItemsByRange(this).cell ? 0 : -1;
        },
        execCommand: function() {
            var me = this,
                ut = UE.UETable.getUETableBySelected(me);

            if(!ut) {
                var start = me.selection.getStart(),
                    cell = start && UE.dom.domUtils.findParentByTagName(start, ["td", "th", "caption"], true);
                if(cell) {
                    if(cell.contentEditable == "false") {
                        cell.contentEditable = "true";
                        cell.style.cursor = "text";
                    } else {
                        cell.contentEditable = "false";
                        cell.style.cursor = "default";
                    }
                }
            } else {
                UE.utils.each(ut.selectedTds, function(cell) {
                    if(cell.contentEditable == "false") {
                        cell.contentEditable = "true";
                        cell.style.cursor = "text";
                    } else {
                        cell.contentEditable = "false";
                        cell.style.cursor = "default";
                    }
                });
            }
        }
    };
};
//单元格锁定
UE.registerUI('lock_cell_btn', function(editor, uiName) {
    if(!this.options.toolEmr) {
        return false;
    }
    var cmd = "lock_cell";
    //创建一个button
    var btn = new UE.ui.Button({
        //按钮的名字
        name: uiName,
        //提示
        title: "单元格锁定",
        //需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
        cssRules: 'background-image:url("static/ueditor/themes/default/images/read.png") !important;',
        //点击时执行的命令
        onclick: function() {
            //这里可以不用执行命令,做你自己的操作也可
            editor.execCommand(cmd);
        }
    });
    //当点到编辑内容上时，按钮要做的状态反射
    editor.addListener('selectionchange', function() {
        var state = editor.queryCommandState(cmd);
        if(state == -1) {
            btn.setDisabled(true);
            btn.setChecked(false);
        } else {
            btn.setDisabled(false);
            btn.setChecked(state);
        }
    });
    //因为你是添加button,所以需要返回这个button
    return btn;
});

/**
 * 网格线
 */
UE.plugins['grid_lines'] = function() {
    var me = this,
        thePlugins = 'grid_lines';
    me.commands[thePlugins] = {
        execCommand: function() {
            var mydocument = this.document;
            var gridline = mydocument.getElementById("edui_gridline");
            if(gridline) {
                gridline.parentNode.removeChild(gridline);
            } else {
                gridline = mydocument.createElement("div");
                gridline.setAttribute("id", "edui_gridline");
                gridline.setAttribute("contenteditable", "false");
                var child = mydocument.createElement("div");
                child.setAttribute("style", "position: absolute;z-index: -1;background-color:white;opacity: 1;background-image: linear-gradient(black 1px, transparent 0px);" +
                    "height:100%;width: 718.2px;left:31px;margin-top:24px;background-size:70% 24px;");
                gridline.appendChild(child);
                mydocument.body.insertBefore(gridline, mydocument.body.firstChild);
            }
        }
    };
};
UE.registerUI('grid_lines_btn', function(editor, uiName) {
    if(!this.options.toolEmr) {
        return false;
    }
    var cmd = "grid_lines";
    //创建一个button
    var btn = new UE.ui.Button({
        //按钮的名字
        name: uiName,
        //提示
        title: "网格线",
        //需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
        cssRules: 'background-image:url("static/ueditor/themes/default/images/read.png") !important;',
        //点击时执行的命令
        onclick: function() {
            //这里可以不用执行命令,做你自己的操作也可
            editor.execCommand(cmd);
        }
    });
    //当点到编辑内容上时，按钮要做的状态反射
    editor.addListener('selectionchange', function() {
        var state = editor.queryCommandState(cmd);
        if(state == -1) {
            btn.setDisabled(true);
            btn.setChecked(false);
        } else {
            btn.setDisabled(false);
            btn.setChecked(state);
        }
    });
    //因为你是添加button,所以需要返回这个button
    return btn;
});

/**
 * 减少缩进
 */
UE.plugins['blockoutindent'] = function() {
    var me = this,
        thePlugins = 'blockoutindent';
    me.commands[thePlugins] = {
        queryCommandState: function() {
            var pN = UE.dom.domUtils.filterNodeList(this.selection.getStartElementPath(), 'p h1 h2 h3 h4 h5 h6');
            return pN && pN.style.textIndent && parseInt(pN.style.textIndent) ? 0 : -1;
        },
        execCommand: function() {
            var start = me.selection.getStart(),
                dom_p = start && UE.dom.domUtils.findParentByTagName(start, ["p"], true);
            if(dom_p) {
                var textIndent = dom_p.style.textIndent ? dom_p.style.textIndent : "0em";
                textIndent = parseInt(textIndent.substring(0, textIndent.length - 2)) - 1;
                me.execCommand('Paragraph', 'p', {
                    style: 'text-indent:' + textIndent + 'em;'
                });
            }
        }
    };
};
UE.registerUI('blockoutindent_btn', function(editor, uiName) {
    if(!this.options.toolEmr) {
        return false;
    }
    var cmd = "blockoutindent";
    //创建一个button
    var btn = new UE.ui.Button({
        //按钮的名字
        name: uiName,
        //提示
        title: "减少缩进",
        //需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
        cssRules: 'background-position:-540px 0;',
        //点击时执行的命令
        onclick: function() {
            //这里可以不用执行命令,做你自己的操作也可
            editor.execCommand(cmd);
        }
    });
    //当点到编辑内容上时，按钮要做的状态反射
    editor.addListener('selectionchange', function() {
        var state = editor.queryCommandState(cmd);
        if(state == -1) {
            btn.setDisabled(true);
            btn.setChecked(false);
        } else {
            btn.setDisabled(false);
            btn.setChecked(state);
        }
    });
    //因为你是添加button,所以需要返回这个button
    return btn;
});

/**
 * 增加缩进
 */
UE.plugins['blockindent'] = function() {
    var me = this,
        thePlugins = 'blockindent';
    me.commands[thePlugins] = {
        queryCommandState: function() {
            var pN = UE.dom.domUtils.filterNodeList(this.selection.getStartElementPath(), 'p h1 h2 h3 h4 h5 h6');
            return pN ? 0 : -1;
        },
        execCommand: function() {
            var start = me.selection.getStart(),
                dom_p = start && UE.dom.domUtils.findParentByTagName(start, ["p"], true);
            if(dom_p) {
                var textIndent = dom_p.style.textIndent ? dom_p.style.textIndent : "0em";
                textIndent = parseInt(textIndent.substring(0, textIndent.length - 2)) + 1;
                me.execCommand('Paragraph', 'p', {
                    style: 'text-indent:' + textIndent + 'em;'
                });
            }
        }
    };
};
UE.registerUI('blockindent_btn', function(editor, uiName) {
    if(!this.options.toolEmr) {
        return false;
    }
    var cmd = "blockindent";
    //创建一个button
    var btn = new UE.ui.Button({
        //按钮的名字
        name: uiName,
        //提示
        title: "增加缩进",
        //需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
        cssRules: 'background-position:-400px 0;',
        //点击时执行的命令
        onclick: function() {
            //这里可以不用执行命令,做你自己的操作也可
            editor.execCommand(cmd);
        }
    });
    //当点到编辑内容上时，按钮要做的状态反射
    editor.addListener('selectionchange', function() {
        var state = editor.queryCommandState(cmd);
        if(state == -1) {
            btn.setDisabled(true);
            btn.setChecked(false);
        } else {
            btn.setDisabled(false);
            btn.setChecked(state);
        }
    });
    //因为你是添加button,所以需要返回这个button
    return btn;
});
/**
 * 单元格斜线
 */
UE.plugins['cell_slash'] = function() {
    var me = this,
        thePlugins = 'cell_slash';
    me.commands[thePlugins] = {
        queryCommandState: function() {
            var pN = UE.dom.domUtils.filterNodeList(this.selection.getStartElementPath(), 'td th');
            return pN ? 0 : -1;
        },
        execCommand: function() {
            var start = me.selection.getStart(),
                cell = start && UE.dom.domUtils.findParentByTagName(start, ["td", "th"], true);
            if(cell) {
                if(cell.getAttribute("class")) {
                    cell.removeAttribute("class")
                } else {
                    cell.setAttribute("class", "cell_slash")
                }
            }
        }
    };
};
UE.registerUI('cell_slash_btn', function(editor, uiName) {
    if(!this.options.toolEmr) {
        return false;
    }
    var cmd = "cell_slash";
    //创建一个button
    var btn = new UE.ui.Button({
        //按钮的名字
        name: uiName,
        //提示
        title: "单元格斜线",
        //需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
        cssRules: 'background-image:url("static/ueditor/themes/default/images/read.png") !important;',
        //点击时执行的命令
        onclick: function() {
            //这里可以不用执行命令,做你自己的操作也可
            editor.execCommand(cmd);
        }
    });
    //当点到编辑内容上时，按钮要做的状态反射
    editor.addListener('selectionchange', function() {
        var state = editor.queryCommandState(cmd);
        if(state == -1) {
            btn.setDisabled(true);
            btn.setChecked(false);
        } else {
            btn.setDisabled(false);
            btn.setChecked(state);
        }
    });
    //因为你是添加button,所以需要返回这个button
    return btn;
});
/**
 * 续打
 */
UE.plugins['extend_print'] = function() {
    var me = this,
        thePlugins = 'extend_print';
    me.commands[thePlugins] = {
        queryCommandState: function() {
            var div = this.document.getElementById("edui_jumplayer");
            return div ? 0 : 1;
        },
        execCommand: function() {
            var mydocument = this.document;
            var jumplayer = mydocument.getElementById("edui_jumplayer");
            if(jumplayer) {
                jumplayer.remove();
                $(mydocument).off("mousedown");
            } else {
                jumplayer = mydocument.createElement("div");
                jumplayer.setAttribute("id", "edui_jumplayer");
                jumplayer.setAttribute("contenteditable", "false");
                var child = mydocument.createElement("div");
                child.setAttribute("id", "edui_jumplayer1");
                child.setAttribute("style", "position: absolute; background-color: white; opacity: 1; z-index: 11000;" +
                    " left: 0px; top: 0px; width: 100%; height: 99px;");
                jumplayer.appendChild(child);
                mydocument.body.insertBefore(jumplayer, mydocument.body.firstChild);
                $(mydocument).on("mousedown", function(event) {
                    $(this).find("#edui_jumplayer1").css("height", event.clientY + "px");
                })
            }
        }
    };
};
UE.registerUI('extend_print_btn', function(editor, uiName) {
    if(!this.options.toolEmr) {
        return false;
    }
    var cmd = "extend_print";
    //创建一个button
    var btn = new UE.ui.Button({
        //按钮的名字
        name: uiName,
        //提示
        title: "续打",
        //需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
        cssRules: 'background-position:-440px -20px;',
        //点击时执行的命令
        onclick: function() {
            //这里可以不用执行命令,做你自己的操作也可
            editor.execCommand(cmd);
        }
    });
    //当点到编辑内容上时，按钮要做的状态反射
    editor.addListener('selectionchange', function() {
        var state = editor.queryCommandState(cmd);
        if(state == 0) {
            btn.addState("active");
        } else {
            btn.removeState("active");
        }
    });
    //因为你是添加button,所以需要返回这个button
    return btn;
});
/**
 *  打印
 *  mode 打印类型
 */
UE.plugins['print_dom'] = function() {
    var me = this,
        thePlugins = 'print_dom';
    me.commands[thePlugins] = {
        execCommand: function(cmd, mode) {
            var div = document.createElement("div");
            switch(mode) {
                case "new_print": //打印
                    div.innerHTML = this.getAllHtml();
                    break;
                case "select_print": //选择打印
                    //获取头部样式css
                    div.innerHTML = this.document.head.innerHTML;
                    div.appendChild(this.selection.getRange().cloneContents());
                    break;
                case "clean_print": //整洁打印
                    var html = this.getAllHtml();
                    if(this.options.view != "cleanview") {
                        html = html.replace(/class="del_remains"/g, 'class="not_del_remains"');
                        html = html.replace(/class="add_remains"/g, 'class="not_add_remains"');
                    }
                    div.innerHTML = html;
                    break;
                case "trace_print": //留痕打印
                    var html = this.getAllHtml();
                    if(this.options.view != "traceview") {
                        html = html.replace(/class="not_del_remains"/g, 'class="del_remains"');
                        html = html.replace(/class="not_add_remains"/g, 'class="add_remains"');
                    }
                    div.innerHTML = html;
                    break;
            }

            var totalHeight = $("#" + $("#editor")[0].childNodes[0].getAttribute("id") + "_iframeholder")[0].offsetHeight; //实际高度
            var pageHeightStr = $("#editor")[0].style.minHeight;
            var pageHeight = pageHeightStr.substr(0, pageHeightStr.indexOf("px")); //页面高度
            var header = me.document.getElementsByTagName("header")[0];
            var headerHeight = header ? header.offsetHeight : 0; //页眉高度
            var footer = me.document.getElementsByTagName("footer")[0];
            var footerHeight = footer ? footer.offsetHeight : 0;; //页脚高度
            var contentHeight = pageHeight - headerHeight - footerHeight;
            var page = Math.ceil(totalHeight / pageHeight); //页数

            var new_iframe = document.createElement('IFRAME');
            new_iframe.setAttribute('id', 'printIframe');
            new_iframe.setAttribute('style', 'margin:0px;padding: 0px;');
            new_iframe.setAttribute('align', 'center');
            document.body.appendChild(new_iframe);
            var doc = new_iframe.contentWindow.document;
            for(i = 0; i < page; i++) {
                if(header) {
                    doc.write("<div id='header" + i + "' style='height:" + headerHeight + "px;'>" + header.innerHTML + "</div>");
                }
                doc.write("<div id='content" + i + "' style='height:" + contentHeight + "px;overflow:hidden'><div></div></div>");
                if(footer) {
                    doc.write("<div id='footer" + i + "' style='height:" + footerHeight + "px;overflow:hidden'>" + footer.innerHTML + "</div>");
                }
            }
            doc.close();
            new_iframe.contentWindow.document.head.innerHTML = "<style type='text/css' media='print'> @page{ size:  auto;   /* auto is the initial value */margin: 0mm;  /* this affects the margin in the printer settings */}html{/*background-color: #FFFFFF; */margin: 0px;  /* this affects the margin on the html before sending to printer */}</style>";

            var headerStart = div.innerHTML.indexOf("<header>");
            var headerEnd = div.innerHTML.indexOf("</header>");
            var footerStart = div.innerHTML.indexOf("<footer>");
            var footerEnd = div.innerHTML.indexOf("</footer>");
            if(headerStart > 0) {
                var headerHTML = div.innerHTML.substring(headerStart, headerEnd + 9);
                div.innerHTML = div.innerHTML.substring(0, div.innerHTML.indexOf(headerHTML)) + div.innerHTML.substring(div.innerHTML.indexOf(headerHTML) + headerHTML.length, div.innerHTML.length);
            }
            if(footerStart > 0) {
                var footerHTML = div.innerHTML.substring(footerStart, footerEnd + 9);
                div.innerHTML = div.innerHTML.substring(0, div.innerHTML.indexOf(footerHTML)) + div.innerHTML.substring(div.innerHTML.indexOf(footerHTML) + footerHTML.length, div.innerHTML.length);
            }
            for(i = 0; i < page; i++) {
                $("#printIframe").contents().find("#content" + i)[0].childNodes[0].innerHTML = div.innerHTML;
                if(i > 0) {
                    $("#printIframe").contents().find("#content" + i)[0].childNodes[0].style.height = contentHeight * (i + 1);
                }
                $("#printIframe").contents().find("#content" + i).scrollTop(contentHeight * i);
            }

            $("#printIframe").contents().find("body").attr("style", "margin:0px");
            new_iframe.contentWindow.focus();
            new_iframe.contentWindow.print();
//          document.body.removeChild(document.getElementById("printIframe"));
        }
    };
};

/**
 * 打印
 */
UE.registerUI('new_print', function(editor, uiName) {
    if(!this.options.toolEmr) {
        return false;
    }
    var cmd = "print_dom";
    //创建一个button
    var btn = new UE.ui.Button({
        //按钮的名字
        name: uiName,
        //提示
        title: "打印",
        //需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
        cssRules: 'background-position:-440px -20px;',
        //点击时执行的命令
        onclick: function() {
            //这里可以不用执行命令,做你自己的操作也可
            editor.execCommand(cmd, uiName);
        }
    });
    //因为你是添加button,所以需要返回这个button
    return btn;
});

/**
 * 选择打印
 */
UE.plugins['select_print'] = function() {
    var me = this,
        thePlugins = 'select_print';
    me.commands[thePlugins] = {
        queryCommandState: function() {
            var collapsed = this.selection.getRange().collapsed;
            return collapsed ? -1 : 0;
        },
        execCommand: function() {
            me.execCommand('print_dom', thePlugins);
        }
    };
};
UE.registerUI('select_print_btn', function(editor, uiName) {
    if(!this.options.toolEmr) {
        return false;
    }
    var cmd = "select_print";
    //创建一个button
    var btn = new UE.ui.Button({
        //按钮的名字
        name: uiName,
        //提示
        title: "选择打印",
        //需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
        cssRules: 'background-position:-440px -20px;',
        //点击时执行的命令
        onclick: function() {
            //这里可以不用执行命令,做你自己的操作也可
            editor.execCommand(cmd);
        }
    });
    //当点到编辑内容上时，按钮要做的状态反射
    editor.addListener('selectionchange', function() {
        var state = editor.queryCommandState(cmd);
        if(state == -1) {
            btn.setDisabled(true);
            btn.setChecked(false);
        } else {
            btn.setDisabled(false);
            btn.setChecked(state);
        }
    });
    //因为你是添加button,所以需要返回这个button
    return btn;
});
/**
 * 整洁打印
 */
UE.registerUI('clean_print', function(editor, uiName) {
    if(!this.options.toolEmr) {
        return false;
    }
    var cmd = "print_dom";
    //创建一个button
    var btn = new UE.ui.Button({
        //按钮的名字
        name: uiName,
        //提示
        title: "整洁打印",
        //需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
        cssRules: 'background-position:-440px -20px;',
        //点击时执行的命令
        onclick: function() {
            //这里可以不用执行命令,做你自己的操作也可
            editor.execCommand(cmd, uiName);
        }
    });
    //因为你是添加button,所以需要返回这个button
    return btn;
});
/**
 * 留痕打印
 */
UE.registerUI('trace_print', function(editor, uiName) {
    if(!this.options.toolEmr) {
        return false;
    }
    var cmd = "print_dom";
    //创建一个button
    var btn = new UE.ui.Button({
        //按钮的名字
        name: uiName,
        //提示
        title: "留痕打印",
        //需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
        cssRules: 'background-position:-440px -20px;',
        //点击时执行的命令
        onclick: function() {
            //这里可以不用执行命令,做你自己的操作也可
            editor.execCommand(cmd, uiName);
        }
    });
    //因为你是添加button,所以需要返回这个button
    return btn;
});

UE.registerUI('medical_btn', function(editor, uiName) {
    if(!this.options.toolEmr) {
        return false;
    }
    var cmd = "medical";
    //创建一个button
    var btn = new UE.ui.Button({
        //按钮的名字
        name: uiName,
        //提示
        title: "医学表达式",
        //需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
        cssRules: 'background: url(static/ueditor/kityformula-plugin/kf-icon.png) !important;',
        //点击时执行的命令
        onclick: function() {
            //这里可以不用执行命令,做你自己的操作也可
            editor.execCommand(cmd);
        }
    });
    //当点到编辑内容上时，按钮要做的状态反射
    editor.addListener('selectionchange', function() {
        var state = editor.queryCommandState(cmd);
        if(state == -1) {
            btn.setDisabled(true);
            btn.setChecked(false);
        } else {
            btn.setDisabled(false);
            btn.setChecked(state);
        }
    });
    //因为你是添加button,所以需要返回这个button
    return btn;
});
/**
 * 文本域按钮
 */
UE.registerUI('emr_text_btn', function(editor, uiName) {
    if(!this.options.toolEmr) {
        return false;
    }
    var cmd = "emr_text";
    //创建一个button
    var btn = new UE.ui.Button({
        //按钮的名字
        name: uiName,
        //提示
        title: "文本域",
        //需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
        cssRules: 'background-image:url("static/ueditor/themes/default/images/read.png") !important;',
        //点击时执行的命令
        onclick: function() {
            //这里可以不用执行命令,做你自己的操作也可
            editor.execCommand(cmd);
        }
    });
    //当点到编辑内容上时，按钮要做的状态反射
    editor.addListener('selectionchange', function() {
        var state = editor.queryCommandState(cmd);
        if(state == -1) {
            btn.setDisabled(true);
            btn.setChecked(false);
        } else {
            btn.setDisabled(false);
            btn.setChecked(state);
        }
    });
    //因为你是添加button,所以需要返回这个button
    return btn;
});
/**
 * 文本域
 * @command emr_text
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @example
 * ```javascript
 * editor.execCommand( 'emr_text');
 * ```
 */
UE.plugins['emr_text'] = function() {
    var me = this,
        thePlugins = 'emr_text';
    me.commands[thePlugins] = {
        execCommand: function() {
            var dialog = new UE.ui.Dialog({
                iframeUrl: this.options.UEDITOR_HOME_URL + UE.trasenFormDesignUrl + '/dialogs/text.html',
                name: thePlugins,
                editor: this,
                title: '文本域',
                cssRules: "width:600px;height:310px;",
                buttons: [{
                        className: 'edui-okbutton',
                        label: '确定',
                        onclick: function() {
                            dialog.close(true);
                        }
                    },
                    {
                        className: 'edui-cancelbutton',
                        label: '取消',
                        onclick: function() {
                            dialog.close(false);
                        }
                    }
                ]
            });
            dialog.render();
            dialog.open();
        }
    };
    var popup = new baidu.editor.ui.Popup({
        id: 'emr_text',
        editor: this,
        content: '',
        className: 'edui-bubble',
        _edittext: function() {
            baidu.editor.plugins[thePlugins].editdom = popup.anchorEl;
            me.execCommand(thePlugins);
            this.hide();
        },
        _delete: function() {
            if(window.confirm('确认删除该控件吗？')) {
                baidu.editor.dom.domUtils.remove(this.anchorEl, false);
            }
            this.hide();
        }
    });
    popup.render();
    me.addListener('mouseover', function(t, evt) {
        evt = evt || window.event;
        var el = evt.target || evt.srcElement;
        var leipiPlugins = el.getAttribute('emr-type');
        if(/span/ig.test(el.tagName) && leipiPlugins == thePlugins) {
            var html = popup.formatHtml(
                '<nobr>文本框: <span onclick=$$._edittext() class="edui-clickable">编辑</span>&nbsp;&nbsp;<span onclick=$$._delete() class="edui-clickable">删除</span></nobr>');
            if(html) {
                popup.getDom('content').innerHTML = html;
                popup.anchorEl = el;
                popup.showAnchor(popup.anchorEl);
            } else {
                popup.hide();
            }
        }
    });
};
/**
 * 下拉域按钮
 */
UE.registerUI('emr_select_btn', function(editor, uiName) {
    if(!this.options.toolEmr) {
        return false;
    }
    var cmd = "emr_select";
    //创建一个button
    var btn = new UE.ui.Button({
        //按钮的名字
        name: uiName,
        //提示
        title: "下拉域",
        //需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
        cssRules: 'background-image:url("static/ueditor/themes/default/images/read.png") !important;',
        //点击时执行的命令
        onclick: function() {
            //这里可以不用执行命令,做你自己的操作也可
            editor.execCommand(cmd);
        }
    });
    //当点到编辑内容上时，按钮要做的状态反射
    editor.addListener('selectionchange', function() {
        var state = editor.queryCommandState(cmd);
        if(state == -1) {
            btn.setDisabled(true);
            btn.setChecked(false);
        } else {
            btn.setDisabled(false);
            btn.setChecked(state);
        }
    });
    //因为你是添加button,所以需要返回这个button
    return btn;
});
/**
 * 下拉域
 * @command emr-select
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @example
 * ```javascript
 * editor.execCommand( 'select');
 * ```
 */
UE.plugins['emr_select'] = function() {
    var me = this,
        thePlugins = 'emr_select';
    me.commands[thePlugins] = {
        execCommand: function() {
            var dialog = new UE.ui.Dialog({
                iframeUrl: this.options.UEDITOR_HOME_URL + UE.trasenFormDesignUrl + '/dialogs/select.html',
                name: thePlugins,
                editor: this,
                title: '下拉域',
                cssRules: "width:590px;height:370px;",
                buttons: [{
                        className: 'edui-okbutton',
                        label: '确定',
                        onclick: function() {
                            dialog.close(true);
                        }
                    },
                    {
                        className: 'edui-cancelbutton',
                        label: '取消',
                        onclick: function() {
                            dialog.close(false);
                        }
                    }
                ]
            });
            dialog.render();
            dialog.open();
        }
    };
    var popup = new baidu.editor.ui.Popup({
        id: 'emr_select',
        editor: this,
        content: '',
        className: 'edui-bubble',
        _edittext: function() {
            baidu.editor.plugins[thePlugins].editdom = popup.anchorEl;
            me.execCommand(thePlugins);
            this.hide();
        },
        _delete: function() {
            if(window.confirm('确认删除该控件吗？')) {
                baidu.editor.dom.domUtils.remove(this.anchorEl, false);
            }
            this.hide();
        }
    });
    popup.render();
    me.addListener('mouseover', function(t, evt) {
        evt = evt || window.event;
        var el = evt.target || evt.srcElement;
        var leipiPlugins = el.getAttribute('emr-type');
        if(/span/ig.test(el.tagName) && leipiPlugins == thePlugins) {
            var html = popup.formatHtml(
                '<nobr>下拉菜单: <span onclick=$$._edittext() class="edui-clickable">编辑</span>&nbsp;&nbsp;<span onclick=$$._delete() class="edui-clickable">删除</span></nobr>');
            if(html) {
                popup.getDom('content').innerHTML = html;
                popup.anchorEl = el;
                popup.showAnchor(popup.anchorEl);
            } else {
                popup.hide();
            }
        }
    });
};
/**
 * 日期域按钮
 */
UE.registerUI('emr_datetime_btn', function(editor, uiName) {
    if(!this.options.toolEmr) {
        return false;
    }
    var cmd = "emr_datetime";
    //创建一个button
    var btn = new UE.ui.Button({
        //按钮的名字
        name: uiName,
        //提示
        title: "日期域",
        //需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
        cssRules: 'background-image:url("static/ueditor/themes/default/images/read.png") !important;',
        //点击时执行的命令
        onclick: function() {
            //这里可以不用执行命令,做你自己的操作也可
            editor.execCommand(cmd);
        }
    });
    //当点到编辑内容上时，按钮要做的状态反射
    editor.addListener('selectionchange', function() {
        var state = editor.queryCommandState(cmd);
        if(state == -1) {
            btn.setDisabled(true);
            btn.setChecked(false);
        } else {
            btn.setDisabled(false);
            btn.setChecked(state);
        }
    });
    //因为你是添加button,所以需要返回这个button
    return btn;
});
/**
 * 日期域
 * @command emr_datetime
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @example
 * ```javascript
 * editor.execCommand( 'select');
 * ```
 */
UE.plugins['emr_datetime'] = function() {
    var me = this,
        thePlugins = 'emr_datetime';
    me.commands[thePlugins] = {
        execCommand: function() {
            var dialog = new UE.ui.Dialog({
                iframeUrl: this.options.UEDITOR_HOME_URL + UE.trasenFormDesignUrl + '/dialogs/datetime.html',
                name: thePlugins,
                editor: this,
                title: '日期域',
                cssRules: "width:600px;height:270px;",
                buttons: [{
                        className: 'edui-okbutton',
                        label: '确定',
                        onclick: function() {
                            dialog.close(true);
                        }
                    },
                    {
                        className: 'edui-cancelbutton',
                        label: '取消',
                        onclick: function() {
                            dialog.close(false);
                        }
                    }
                ]
            });
            dialog.render();
            dialog.open();
        }
    };
    var popup = new baidu.editor.ui.Popup({
        id: 'emr_datetime',
        editor: this,
        content: '',
        className: 'edui-bubble',
        _edittext: function() {
            baidu.editor.plugins[thePlugins].editdom = popup.anchorEl;
            me.execCommand(thePlugins);
            this.hide();
        },
        _delete: function() {
            if(window.confirm('确认删除该控件吗？')) {
                baidu.editor.dom.domUtils.remove(this.anchorEl, false);
            }
            this.hide();
        }
    });
    popup.render();
    me.addListener('mouseover', function(t, evt) {
        evt = evt || window.event;
        var el = evt.target || evt.srcElement;
        var leipiPlugins = el.getAttribute('emr-type');
        if(/span/ig.test(el.tagName) && leipiPlugins == thePlugins) {
            var html = popup.formatHtml(
                '<nobr>下拉菜单: <span onclick=$$._edittext() class="edui-clickable">编辑</span>&nbsp;&nbsp;<span onclick=$$._delete() class="edui-clickable">删除</span></nobr>');
            if(html) {
                popup.getDom('content').innerHTML = html;
                popup.anchorEl = el;
                popup.showAnchor(popup.anchorEl);
            } else {
                popup.hide();
            }
        }
    });
};
/**
 * 设置纸张大小
 */
var papersize = 0; //用于记录当前纸张大小选择
UE.plugins['papersize'] = function() {
    var me = this,
        thePlugins = 'papersize';
    me.commands[thePlugins] = {
        execCommand: function(commandName, params) {
            var arrDPI = new Array();   
            if(window.screen.deviceXDPI != undefined) {       
                arrDPI[0] = window.screen.deviceXDPI;       
                arrDPI[1] = window.screen.deviceYDPI;   
            }   
            else {       
                var tmpNode = document.createElement("DIV");       
                tmpNode.style.cssText = "width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden";       
                document.body.appendChild(tmpNode);       
                arrDPI[0] = parseInt(tmpNode.offsetWidth);       
                arrDPI[1] = parseInt(tmpNode.offsetHeight);       
                tmpNode.parentNode.removeChild(tmpNode);      
            }
            var styleObj = {
                '1': {
                    'margin': '0 auto',
                    "width": parseInt(21.59 * 10 / 25.4 * arrDPI[0]) + "px",
                    'min-height': parseInt(27.94 * 10 / 25.4 * arrDPI[1]) + 'px'
                },
                '2': {
                    'margin': '0 auto',
                    "width": parseInt(21.59 * 10 / 25.4 * arrDPI[0]) + "px",
                    'min-height': parseInt(35.56 * 10 / 25.4 * arrDPI[1]) + 'px'
                },
                '3': {
                    'margin': '0 auto',
                    "width": parseInt(18.42 * 10 / 25.4 * arrDPI[0]) + "px",
                    'min-height': parseInt(26.67 * 10 / 25.4 * arrDPI[1]) + 'px'
                },
                '4': {
                    'margin': '0 auto',
                    "width": parseInt(29.7 * 10 / 25.4 * arrDPI[0]) + "px",
                    'min-height': parseInt(29.7 * 10 / 25.4 * arrDPI[1]) + 'px'
                },
                '5': {
                    'margin': '0 auto',
                    "width": parseInt(21 * 10 / 25.4 * arrDPI[0]) + "px",
                    'min-height': parseInt(29.7 * 10 / 25.4 * arrDPI[1]) + 'px'
                },
                '6': {
                    'margin': '0 auto',
                    "width": parseInt(14.8 * 10 / 25.4 * arrDPI[0]) + "px",
                    'min-height': parseInt(21 * 10 / 25.4 * arrDPI[1]) + 'px'
                },
                '7': {
                    'margin': '0 auto',
                    "width": parseInt(25.7 * 10 / 25.4 * arrDPI[0]) + "px",
                    'min-height': parseInt(36.4 * 10 / 25.4 * arrDPI[1]) + 'px'
                },
                '8': {
                    'margin': '0 auto',
                    "width": parseInt(18.2 * 10 / 25.4 * arrDPI[0]) + "px",
                    'min-height': parseInt(25.7 * 10 / 25.4 * arrDPI[1]) + 'px'
                }
            };
            papersize = params;
            var styles = styleObj[params];
            $.each(styles, function(i, val) {
                $("#editor")[0].style[i] = val;
                $("#editor")[0].childNodes[0].style[i] = val;
                var editorId = $("#editor")[0].childNodes[0].getAttribute("id");
                if(editorId) {
                    $("#" + editorId + "_iframeholder")[0].style[i] = val;
                }
                if(i == "width") {
                    $.each($("#editor")[0].childNodes, function(index, item) {
                        item.style.width = val;
                    });
                }
            });
        },
        queryCommandValue: function() {
            return papersize;
        }
    };
};
UE.registerUI('papersize_btn', function(editor, uiName) {
    if(!this.options.toolEmr) {
        return false;
    }
    var cmd = "papersize";
    //创建下拉菜单中的键值对
    var items = [];
    for(var i = 0, ci; ci = [{
            "label": "信纸",
            "value": "1"
        }, {
            "label": "法律专用纸",
            "value": "2"
        }, {
            "label": "行政公文纸",
            "value": "3"
        }, {
            "label": "A3",
            "value": "4"
        }, {
            "label": "A4",
            "value": "5"
        }, {
            "label": "A5",
            "value": "6"
        }, {
            "label": "B4",
            "value": "7"
        }, {
            "label": "B5",
            "value": "8"
        }][i++];) {
        //label - 显示的条目  value - 选中条目后的返回值
        items.push({
            label: ci.label,
            value: ci.value,
            onclick: function() {
                editor.execCommand(cmd, this.value);
            }
        });
    }
    //创建下拉框
    var ui = new UE.ui.MenuButton({
        title: "纸张大小", //提示
        editor: editor,
        className: 'edui-for-lineheight',
        items: items, //添加条目
        onbuttonclick: function() {
            var value = editor.queryCommandValue(cmd) || this.value;
            editor.execCommand(cmd, value);
        }
    });
    UE.ui.buttons[uiName] = ui;
    editor.addListener('selectionchange', function() {
        var state = editor.queryCommandState(cmd);
        if(state == -1) {
            ui.setDisabled(true);
        } else {
            ui.setDisabled(false);
            var value = editor.queryCommandValue(cmd);
            value && ui.setValue((value + ''));
            ui.setChecked(state)
        }
    });
    return ui;
});

UE.plugins['pageing'] = function() {
    var me = this,
        thePlugins = 'pageing';

    me.commands[thePlugins] = {
        execCommand: function() {
            var pageEndMark = "<div id='pageEndMark' style='width:100%;border:1px solid #ababab;display:block;z-index:0;'></div>";
            var originalHead = me.document.getElementsByTagName("header");
            $("#editor").childNodes[0].appendChild(pageEndMark);
        }
    };
};

/**
 * 分页
 */
UE.registerUI('pageing_btn', function(editor, uiName) {
    if(!this.options.toolEmr) {
        return false;
    }
    //创建一个button
    var btn = new UE.ui.Button({
        //按钮的名字
        name: uiName,
        //提示
        title: "分页",
        cssRules: 'background-image:url("static/ueditor/themes/default/images/header.png") !important;',
        //点击时执行的命令
        onclick: function() {
            editor.execCommand("header");
        }
    });
    return btn;
});

/**
 * 保存按钮注册
 */
UE.registerUI('button_save', function(editor, uiName) {
    if(!this.options.toolleipi) {
        return false;
    }
    //注册按钮执行时的command命令，使用命令默认就会带有回退操作
    editor.registerCommand(uiName, {
        execCommand: function() {
            try {
                emrPlugins.save();
            } catch(e) {
                console.error(e);
                alert('emrPlugins.save() 保存异常');
            }

        }
    });
    //创建一个button
    var btn = new UE.ui.Button({
        //按钮的名字
        name: uiName,
        //提示
        title: "保存表单",
        //需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
        cssRules: 'background-position: -481px -20px;',
        //点击时执行的命令
        onclick: function() {
            //这里可以不用执行命令,做你自己的操作也可
            editor.execCommand(uiName);
        }
    });

    //因为你是添加button,所以需要返回这个button
    return btn;
});
/**
 * 全局对象
 * editor 编辑器集合
 * events 事件集合
 * @type {{}}
 */
emrUE = {};
emrUE.editor;
emrUE.plugins = {};

(function () {
  var ue;
  var events = {};
  var plugins = emrUE.plugins;
  var domUtils = UE.dom.domUtils;

  /**
   * 针对百度富文本包装初始化函数
   * @param id
   * @param opt 构造参数，参考百度富文本
   * @grammar emrUE.getEditor(id,[opt])  =>  Editor实例
   */
  emrUE.getEditor = function (id, opt) {
    var editor = UE.getEditor(id, opt);
    //添加事件绑定
    editor.addListener('afterinserthtml', events.afterinserthtml);
    editor.addListener('selectionchange', events.selectionchange);
    //全局保存
    emrUE.editor = ue = editor;
    return editor;
  };

  /**
   *  事件函数
   *  inserthtml命令执行后触发。
   */
  events.afterinserthtml = function () {
    var nodes = $(this.window.document).find('[emr-plugins=emrFieldElement]');

    //循环进行事件绑定
    $.each(nodes, function (i, node) {
      init_plugins(node);
    })
  };
  /**
   * 富文本编辑器，选取发生变化事件
   */
  events.selectionchange = function () {
    var range = ue.selection.getRange();
    var plugin_node = checkPlugins(range);
    if (plugin_node) {
      var node = range.startContainer;
      //文本节点，切换到父节点
      if (node.nodeType == 3) {
        node = node.parentNode;
      }
      //光标在自定义组件末尾
      if (node == plugin_node && node == range.startContainer && node.childNodes.length == range.endOffset) {
        range.setStartAfter(node);
        range.setEndAfter(node);
      } else if (node == plugin_node && $(node).find('[emr-type=bgtext]')[0]) {
        //光标在自定义组件中，并且包含提示文字，移动光标到提示文字dom节点前
        var bgtext = $(node).find('[emr-type=bgtext]')[0];
        range.setStartBefore(bgtext);
        range.setEndBefore(bgtext);
      } else if (node.getAttribute('emr-ignore') == 1) { //忽略节点
        if (range.endOffset == 0) {
          range.setStartBefore(node.parentNode);
          range.setEndBefore(node.parentNode)
        } else {
          range.setStartAfter(node);
          range.setEndAfter(node);
        }
      } else if (node.getAttribute('emr-type') == 'bgtext') { //背景提示文本
        range.setStartBefore(node);
        range.setEndBefore(node);
      }
      range.setCursor();
    }
  };
  /**
   * 判断当前选区位置是否在自定义组件中
   * 返回当前自定义组件或者NUll
   * @return {*|Node|NULL}
   */
  var checkPlugins = function (range) {
    //选区未闭合，不进行处理
    if (!range.collapsed) {
      return null;
    }
    var startNode = range.startContainer;
    //根据cxplugins属性，确定哪些组件需要调整输入位置
    var emrPlugins = domUtils.findParentByTagName(startNode, ['span'], true, function (node) {
      return node.getAttribute("emr-plugins") != 'emrFieldElement';
    });
    return emrPlugins;
  };
  /**
   * 初始化自定义组件
   */
  var init_plugins = function (node) {
    var emr_type = node.getAttribute('emr-type');
    var events = node.getAttribute('emr-events');
    var plugin = plugins[emr_type];
    //判断组件是否定义
    if (!plugin) {
      console.warn("未定义的组件类型 - " + emr_type);
      return false;
    }
    plugin = new plugin(node);
    //事件判断
    if (events && events.length > 0) {
      var eventsList = events.split('|');
      //循环绑定事件
      $.each(eventsList, function (i, event) {
        //判断事件是否定义
        if (!plugin[event]) {
          console.warn("组件【" + emr_type + "】未定义事件【" + event + "】");
          return false;
        }
        ;
        $(node).off(event);
        $(node).on(event, plugin[event]);
      });
    }
    ;
  };
})();

/**
 * 日期域控件
 * @type {{}}
 */
emrUE.plugins.emr_datetime = function (dom) {
  //控件dom节点
  var node = this.node = dom;
  //控件属性对象
  var nodeAttr = this.nodeAttr = {
    emr_type: node.getAttribute('emr-type'),
    emr_format: node.getAttribute('emr-format'),
    emr_deleteable: node.getAttribute('emr-deleteable'),
    emr_editable: node.getAttribute('emr-editable'),
    emr_edited: node.getAttribute('emr-edited')
  };

  /**
   * 初始化控件
   * @param node
   */
  var init = function () {
    $(node).attr('contenteditable', nodeAttr.emr_editable);

    var format = nodeAttr.emr_format;
    //初始值
    var value = node.getAttribute('value') ? value : new Date();
    var type = format.length == 10 ? 'date' : 'datetime';
    //日期选择器渲染
    laydate.render({
      elem: $(node).find('label')[0],
      format: format,
      type: type,
      value: value,
      btns: ['now', 'confirm'],
      done: function (value, date, endDate) {
        node.setAttribute('emr-value', value);
        //设置已编辑，添加已编辑class
        node.setAttribute('emr-edited', 'true');
        node.classList.add('already_in');
      }
    });
  };

  /**
   * 节点点击事件
   * @param event
   */
  this.click = function (event) {
    console.log(event);
  };

  init();
};

/**
 * 下拉域组件
 */
emrUE.plugins.emr_select = function (dom) {

  //控件dom节点
  var node = this.node = dom;
  //控件属性对象
  var nodeAttr = this.nodeAttr = {
    emr_data: dom.getAttribute('emr-data'),
    emr_type: dom.getAttribute('emr-type'),
    emr_format: dom.getAttribute('emr-format'),
    emr_deleteable: dom.getAttribute('emr-deleteable'),
    emr_editable: dom.getAttribute('emr-editable'),
    emr_edited: dom.getAttribute('emr-edited')
  };

  /**
   * 控件初始化方法
   */
  var init = function () {
    loadOption();
    $(node).attr('contenteditable', nodeAttr.emr_editable);
  };
  /**
   * 初始化选择项加载
   * @param node
   */
  var loadOption = function () {
    var emr_data = nodeAttr.emr_data;
    var data = [{'code': '0', 'name': '男'}, {'code': '1', 'name': '女'}];
    var select = $(node).find('.selection_choose');
    //避免重复加载，先清理
    select.empty();
    $.each(data, function (index, obj) {
      var option = document.createElement('span');
      $(option).attr('code', obj.code);
      $(option).text(obj.name);
      $(option).on('click', {'code': obj.code, 'name': obj.name, 'node': option}, selected);
      select.append(option);
    });
  };
  var selected = function (event) {
    hide(event);
    var code = event.data.code;
    var name = event.data.name;
    var dom = $(node);
    //设置已编辑，添加已编辑class
    dom.find('label').text(name);
    dom.attr('emr-value', "{'code':" + code + ", 'name': " + name + "}");
    dom.attr('emr-edited', 'true');
    dom.addClass('already_in');
  };
  var show = function (event) {
    $(node).find('.selection_choose').attr('style', 'display: block;');
    //阻止事件冒泡
    window.event ? window.event.cancelBubble = true : event.stopPropagation();
  };
  var hide = function (event) {
    $(node).find('.selection_choose').attr('style', 'display: none;');
    //阻止事件冒泡
    window.event ? window.event.cancelBubble = true : event.stopPropagation();
  };

  this.click = function (event) {
    show(event);
  };

  //执行初始化控件
  init();
};

/**
 *  文本域控件
 */
emrUE.plugins.emr_text = function (dom) {

  //控件dom节点
  var node = this.node = dom;
  //控件属性对象
  var nodeAttr = this.nodeAttr = {
    emr_type: node.getAttribute('emr-type'),
    emr_format: node.getAttribute('emr-format'),
    emr_deleteable: node.getAttribute('emr-deleteable'),
    emr_editable: node.getAttribute('emr-editable'),
    emr_edited: node.getAttribute('emr-edited')
  };

  /**
   * 控件初始化方法
   */
  var init = function () {
    $(node).attr('contenteditable', nodeAttr.emr_editable);
    $(node).on('contentchange', contentchange);
  };

  /**
   * 文本域输入时，内容改变事件处理
   */
  var contentchange = function () {
    var dom = $(this);
    //获取文本域内容
    var text = dom.text().replace('[', '').replace(']', '').replace(/\u200B/g, '');
    var emr_bgtext = dom.attr('emr-bgtext');

    if (text == '') {
      var bgtext = $('<label emr-type="bgtext" contenteditable="false">' + emr_bgtext + '</label>')[0];
      dom.find('em')[0].after(bgtext);
      //设置未编辑
      dom.attr('emr-edited', 'false');
      dom.removeClass('already_in');
    } else if (text.length != emr_bgtext.length) {
      //移除背景提示文字
      dom.find('[emr-type=bgtext]').remove();
      //设置已编辑
      dom.attr('emr-edited', 'true');
      dom.addClass('already_in');
    }
    dom.attr('emr-value', text);
  }

  /**
   * 点击事件
   * @param event
   */
  this.click = function (event) {
    //console.log(this);
  }

  //初始化控件
  init();
};

/**
 * jQuery自定义事件
 * 内容改变事件
 */
(function () {
  var interval;
  jQuery.event.special.contentchange = {
    setup: function () {
      var self = this,
        $this = $(this),
        $originalContent = $this.text().replace(/\u200B/g, '');
      interval = setInterval(function () {
        if ($originalContent != $this.text().replace(/\u200B/g, '')) {
          $originalContent = $this.text();
          jQuery.event.dispatch.call(self, {type: 'contentchange'});
        }
      }, 100);
    },
    teardown: function () {
      clearInterval(interval);
    }
  };
})();

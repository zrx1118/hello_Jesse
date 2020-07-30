/**
 * 基于Snap框架实现
 * @type {{menstrual_1: medical.menstrual_1, menstrual_2: medical.menstrual_2, menstrual_3: medical.menstrual_3, menstrual_4: medical.menstrual_4, pupil: medical.pupil, projection: medical.projection, fetal_heart_map: medical.fetal_heart_map, permanent_tooth: medical.permanent_tooth, deciduous_teeth: medical.deciduous_teeth, scale: medical.scale}}
 */
var medical = {
    /**
     * 月经史表达式一
     * @param id svg标签id
     * @param array 数组传参
     *  0-初潮年龄 1-绝经年龄 2-经期 3-周期
     * @return Snap
     */
    menstrual_1:function (id, array) {
        //var array = ["10","08","10","1"];
        var padding = 5;//边距

        var svg = Snap("#"+id);
        var g = svg.paper.g();
        g.attr({"font-size":"10px"});

        var c1_x = padding;
        var c1_y = 25;
        var c1 = svg.paper.text(c1_x, c1_y, array[0]);
        g.append(c1);
        var c1_box = c1.getBBox();

        var c3_x = c1_box.x2;
        var c3_y = c1_box.cy - 6;
        var c3 = svg.paper.text(c3_x, c3_y, array[2]);
        g.append(c3);
        var c3_box = c3.getBBox();

        var c4_x = c3_x;
        var c4_y = c1_box.cy + c1_box.h;
        var c4 = svg.paper.text(c4_x, c4_y, array[3]);
        g.append(c4);
        var c4_box = c4.getBBox();

        var t0_x0 = c1_box.x2 + 1;
        var t0_y0 = c1_box.cy;
        var t0_x1 = (c3_box.x2 > c4_box.x2 ? c3_box.x2 : c4_box.x2) + 6;
        var t0_y1 = c1_box.cy;
        var t0 = svg.paper.line(t0_x0, t0_y0, t0_x1, t0_y1).attr({stroke: "#000", strokeWidth: 1});
        g.append(t0);

        var t0_box = t0.getBBox();
        var c2_x = t0_box.x2 + 1;
        var c2_y = c1_y;
        var c2 = svg.paper.text(c2_x, c2_y, array[1]);
        g.append(c2);

        //设置居中对齐
        c3.attr({"x":t0.getBBox().cx, "text-anchor":"middle"});
        c4.attr({"x":t0.getBBox().cx, "text-anchor":"middle"});
        //计算并设置实际宽高，实现等比缩放
        var width = c2.getBBox().x2 + padding;
        var heigth = c4.getBBox().y2 - c3.getBBox().y + 2*padding;
        var viewbox = "0 0 " + width + " " + heigth;
        svg.attr({"viewBox":viewbox});

        return svg;
    },
    /**
     * 月经史表达式二
     * @param id svg标签id
     * @param array 数组传参
     *  0-初潮年龄 1-经期 2-绝经年龄  3-周期
     *
     */
    menstrual_2:function (id, array) {
        //var array = ["10","08","10","1"];
        var padding = 5;//边距

        var svg = Snap("#"+id);
        var g = svg.paper.g();
        g.attr({"font-size":"10px"});

        //循环判断，获取最长文字
        var temp = "";
        for(var i = 0; i < array.length; i++){
            if(temp.length < array[i].length){
                temp = array[i];
            }
        }
        //获取最长文字长度
        var svg_temp = svg.paper.text(0, 0, temp);
        var max_width = svg_temp.getBBox().w;
        var max_heigth = svg_temp.getBBox().h;
        svg_temp.remove();

        //横线
        var t0_x1 = padding;
        var t0_y1 = max_width+padding;
        var t0_x2 = 2*max_width + 6;
        var t0_y2 = t0_y1;
        var t0 = svg.paper.line(t0_x1, t0_y1, t0_x2, t0_y2).attr({stroke: "#000", strokeWidth: 1});
        g.append(t0);
        var t0_box = t0.getBBox();
        //竖线
        var t1_x1 = t0_box.cx;
        var t1_y1 = padding;
        var t1_x2 = t1_x1;
        var t1_y2 = 2*max_heigth;
        var t1 = svg.paper.line(t1_x1, t1_y1, t1_x2, t1_y2).attr({stroke: "#000", strokeWidth: 1});
        g.append(t1);
        var t1_box = t1.getBBox();
        t0.attr({"y1":t1_box.cy, "y2":t1_box.cy});
        t0_box = t0.getBBox();

        var c0_x = t0_box.x + (t0_box.cx - t0_box.x) / 2;
        var c0_y = t1_box.y + (t1_box.cy - t1_box.y) / 2;
        var c0 = svg.paper.text(c0_x, c0_y, array[0]).attr({"text-anchor":"middle", "dy":4});
        g.append(c0);

        var c1_x = t0_box.cx + (t0_box.cx - t0_box.x) / 2;
        var c1_y = t1_box.y + (t1_box.cy - t1_box.y) / 2;
        var c1 = svg.paper.text(c1_x, c1_y, array[1]).attr({"text-anchor":"middle", "dy":4});
        g.append(c1);

        var c2_x = t0_box.x + (t0_box.cx - t0_box.x) / 2;
        var c2_y = t1_box.cy + (t1_box.cy - t1_box.y) / 2;
        var c2 = svg.paper.text(c2_x, c2_y, array[2]).attr({"text-anchor":"middle", "dy":4});
        g.append(c2);

        var c3_x = t0_box.cx + (t0_box.cx - t0_box.x) / 2;
        var c3_y = t1_box.cy + (t1_box.cy - t1_box.y) / 2;
        var c3 = svg.paper.text(c3_x, c3_y, array[3]).attr({"text-anchor":"middle", "dy":4});
        g.append(c3);

        //计算并设置实际宽高，实现等比缩放
        var width = t0.getBBox().x2 + padding;
        var heigth = t1.getBBox().y2 + padding;
        var viewbox = "0 0 " + width + " " + heigth;
        svg.attr({"viewBox":viewbox});

        return svg;
    },
    /**
     * 月经史表达式三
     * @param id svg标签id
     * @param array 数组传参
     *  0-初潮年龄 1-周期 2-经期  3-绝经年龄
     *
     */
    menstrual_3:function (id, array) {
        //var array = ["10","08","10","1"];
        var padding = 5;//边距

        var svg = Snap("#"+id);
        var g = svg.paper.g();
        g.attr({"font-size":"10px"});
        svg.attr({"viewBox":"0 0 60 60"});

        var t0_x1 = padding;
        var t0_y1 = padding;
        var t0_x2 = 60 - padding;
        var t0_y2 = 60 - padding;
        var t0 = svg.paper.line(t0_x1, t0_y1, t0_x2, t0_y2).attr({stroke: "#000", strokeWidth: 2});
        g.append(t0);
        var t0_box = t0.getBBox();

        var t1_x1 = t0_x1;
        var t1_y1 = 60 - padding;
        var t1_x2 = t0_x2 ;
        var t1_y2 = t0_y1;
        var t1 = svg.paper.line(t1_x1, t1_y1, t1_x2, t1_y2).attr({stroke: "#000", strokeWidth: 2});
        g.append(t1);
        var t1_box = t1.getBBox();

        var c0_x = t0_box.cx - 20;
        var c0_y = t0_box.cy + 4;
        var c0 = svg.paper.text(c0_x, c0_y, array[0]).attr({"text-anchor":"middle", "textLength":"12", "lengthAdjust":"spacingAndGlyphs"});
        g.append(c0);

        var c1_x = t0_box.cx + 20;
        var c1_y = t0_box.cy + 4;
        var c1 = svg.paper.text(c1_x, c1_y, array[1]).attr({"text-anchor":"middle", "textLength":"12", "lengthAdjust":"spacingAndGlyphs"});
        g.append(c1);

        var c2_x = t0_box.cx;
        var c2_y = t0_box.cy - 15;
        var c2 = svg.paper.text(c2_x, c2_y, array[2]).attr({"text-anchor":"middle", "textLength":"12", "lengthAdjust":"spacingAndGlyphs"});
        g.append(c2);

        var c3_x = t0_box.cx;
        var c3_y = t0_box.cy + 23;
        var c3 = svg.paper.text(c3_x, c3_y, array[3]).attr({"text-anchor":"middle", "textLength":"12", "lengthAdjust":"spacingAndGlyphs"});
        g.append(c3);

        return svg;
    },
    /**
     * 月经史表达式四
     * @param id svg标签id
     * @param array 数组传参
     *  0-初潮年龄 1-周期 2-经期
     *
     */
    menstrual_4:function (id, array) {
        //var array = ["10","08","10"];
        var padding = 5;//边距

        var svg = Snap("#"+id);
        var g = svg.paper.g();
        g.attr({"font-size":"10px"});

        var c0_x = padding;
        var c0_y = 30;
        var c0 = svg.paper.text(c0_x, c0_y, array[0]);
        g.append(c0);
        var c0_box = c0.getBBox();

        var c1_x = c0_box.x2 + 2;
        var c1_y = c0_y;
        var c1 = svg.paper.text(c1_x, c1_y, "/");
        g.append(c1);
        var c1_box = c1.getBBox();

        var c2_x = c1_box.x2;
        var c2_y = c1_box.cy - 6;
        var c2 = svg.paper.text(c2_x, c2_y, array[1]);
        g.append(c2);
        var c2_box = c2.getBBox();

        var c3_x = c2_x;
        var c3_y = c1_box.cy + c1_box.h;
        var c3 = svg.paper.text(c3_x, c3_y, array[2]);
        g.append(c3);
        var c3_box = c3.getBBox();

        var t0_x0 = c1_box.x2 + 1;
        var t0_y0 = c1_box.cy;
        var t0_x1 = (c2_box.x2 > c3_box.x2 ? c2_box.x2 : c3_box.x2) + 6;
        var t0_y1 = c1_box.cy;
        var t0 = svg.paper.line(t0_x0, t0_y0, t0_x1, t0_y1).attr({stroke: "#000", strokeWidth: 1});
        g.append(t0);

        //设置居中对齐
        c2.attr({"x":t0.getBBox().cx, "text-anchor":"middle"});
        c3.attr({"x":t0.getBBox().cx, "text-anchor":"middle"});
        //计算并设置实际宽高，实现等比缩放
        var width = t0.getBBox().x2 + padding;
        var heigth = c3_box.y2 + padding;
        var viewbox = "0 0 " + width + " " + heigth;
        svg.attr({"viewBox":viewbox});

        return svg;
    },
    /**
     * 瞳孔图表达式
     * @param id
     * @param array
     */
    pupil:function (id, array) {
        var padding = 5;//边距

        var svg = Snap("#"+id);
        var g = svg.paper.g();
        g.attr({"font-size":"12px"});
        svg.attr({"viewBox":"0 0 60 60"});

        var c0_x = padding;
        var c0_y = 10;
        var c0 = svg.paper.text(c0_x, c0_y, array[0]);
        g.append(c0);
        var c0_box = c0.getBBox();

        var c1_x = 2*c0_box.w + 20;
        var c1_y = c0_y;
        var c1 = svg.paper.text(c1_x, c1_y, array[1]);
        g.append(c1);
        var c1_box = c1.getBBox();

        var c2_x = c0_x;
        var c2_y = c0_box.y2 + 18;
        var c2 = svg.paper.text(c2_x, c2_y, array[2]);
        g.append(c2);
        var c2_box = c2.getBBox();

        var c3_x = c2_box.x2 + 8;
        var c3_y = c2_y;
        var c3 = svg.paper.text(c3_x, c3_y, array[3]);
        g.append(c3);

        var c4_x = c1_x;
        var c4_y = c2_y;
        var c4 = svg.paper.text(c4_x, c4_y, array[4]);
        g.append(c4);

        var c5_x = c2_x;
        var c5_y = c2_box.y2 + 20;
        var c5 = svg.paper.text(c5_x, c5_y, array[5]);
        g.append(c5);

        var c6_x = c4_x;
        var c6_y = c5_y;
        var c6 = svg.paper.text(c6_x, c6_y, array[6]);
        g.append(c6);

        return svg;
    },
    /**
     * 光学定位图
     * @param id
     * @param array
     */
    projection:function (id, array) {
        var svg = Snap("#"+id);
        var g = svg.paper.g();
        g.attr({"font-size":"10px"});
        svg.attr({"viewBox":"0 0 65 65"});

        for(var i = 0; i < array.length; i++){
            var x = 12.5 + (i%3)*20;
            var y = 12.5 + Math.floor(i/3)*20;
            var c = svg.paper.text(x, y, array[i]).attr({"dy":"3" ,"text-anchor":"middle", "textLength":"14", "lengthAdjust":"spacingAndGlyphs"});
            g.append(c);
        }
        return svg;
    },
    /**
     * 胎心图
     * @param id
     * @param array
     */
    fetal_heart_map:function (id, array) {
        var padding = 5;//边距
        var svg = Snap("#"+id);
        var g = svg.paper.g();
        g.attr({"font-size":"10px"});

        //----------左侧内容------------
        var t0_x1 = padding;
        var t0_y1 = 28;
        var t0_x2 = t0_x1 + 10;
        var t0_y2 = t0_y1;
        var t0 = svg.paper.line(t0_x1, t0_y1, t0_x2, t0_y2).attr({stroke: "#000", strokeWidth: 2});
        g.append(t0)
        var t0_box = t0.getBBox();

        var c0_x = t0_box.x2 + 2;
        var c0_y = t0_box.y - 16;
        var c0 = svg.paper.text(c0_x, c0_y, array[0]);
        g.append(c0);
        var c0_box = c0.getBBox();

        var c2_x = c0_x;
        var c2_y = t0_box.y + 4;
        var c2 = svg.paper.text(c2_x, c2_y, array[2]);
        g.append(c2);
        var c2_box = c2.getBBox();

        var c4_x = c0_x;
        var c4_y = t0_box.y + 24;
        var c4 = svg.paper.text(c4_x, c4_y, array[4]);
        g.append(c4);
        var c4_box = c4.getBBox();

        //计算行中坐标，实现居中对齐
        var left_cx;//左侧中心x坐标
        var left_x2;//左侧右边x坐标
        if(c0_box.cx > c2_box.cx){
            left_cx = c0_box.cx > c4_box.cx ? c0_box.cx : c4_box.cx;
            left_x2 = c0_box.x2 > c4_box.x2 ? c0_box.x2 : c4_box.x2;
        }else {
            left_cx = c2_box.cx > c4_box.cx ? c2_box.cx : c4_box.cx;
            left_x2 = c2_box.x2 > c4_box.x2 ? c2_box.x2 : c4_box.x2;
        }
        c0.attr({"x":left_cx, "text-anchor":"middle"});
        c2.attr({"x":left_cx, "text-anchor":"middle"});
        c4.attr({"x":left_cx, "text-anchor":"middle"});
        //----------左侧内容END------------
        var t1_x1 = left_x2 + 2;
        var t1_y1 = t0_y1;
        var t1_x2 = t1_x1 + 10;
        var t1_y2 = t1_y1;
        var t1 = svg.paper.line(t1_x1, t1_y1, t1_x2, t1_y2).attr({stroke: "#000", strokeWidth: 2});
        g.append(t1)
        var t1_box = t1.getBBox();

        var t2_x1 = t1_box.cx;
        var t2_y1 = 3;
        var t2_x2 = t2_x1;
        var t2_y2 = 55;
        var t2 = svg.paper.line(t2_x1, t2_y1, t2_x2, t2_y2).attr({stroke: "#000", strokeWidth: 2});
        g.append(t2)
        var t2_box = t2.getBBox();
        //----------右侧内容------------
        var c1_x = t1_box.x2 + 2;
        var c1_y = c0_y;
        var c1 = svg.paper.text(c1_x, c1_y, array[1]);
        g.append(c1);
        var c1_box = c1.getBBox();

        var c3_x = c1_x;
        var c3_y = c2_y;
        var c3 = svg.paper.text(c3_x, c3_y, array[3]);
        g.append(c3);
        var c3_box = c3.getBBox();

        var c5_x = c1_x;
        var c5_y = c4_y;
        var c5 = svg.paper.text(c5_x, c5_y, array[5]);
        g.append(c5);
        var c5_box = c5.getBBox();

        //计算行中坐标，实现居中对齐
        var rigth_cx;//左侧中心x坐标
        var rigth_x2;//左侧右边x坐标
        if(c1_box.cx > c3_box.cx){
            rigth_cx = c1_box.cx > c5_box.cx ? c1_box.cx : c5_box.cx;
            rigth_x2 = c1_box.x2 > c5_box.x2 ? c1_box.x2 : c5_box.x2;
        }else {
            rigth_cx = c3_box.cx > c5_box.cx ? c3_box.cx : c5_box.cx;
            rigth_x2 = c3_box.x2 > c5_box.x2 ? c3_box.x2 : c5_box.x2;
        }
        c1.attr({"x":rigth_cx, "text-anchor":"middle"});
        c3.attr({"x":rigth_cx, "text-anchor":"middle"});
        c5.attr({"x":rigth_cx, "text-anchor":"middle"});
        //----------右侧内容END------------
        var t3_x1 = rigth_x2 + 2;
        var t3_y1 = t0_y1;
        var t3_x2 = t3_x1 + 10;
        var t3_y2 = t3_y1;
        var t3 = svg.paper.line(t3_x1, t3_y1, t3_x2, t3_y2).attr({stroke: "#000", strokeWidth: 2});
        g.append(t3)
        var t3_box = t3.getBBox();

        //计算并设置实际宽高，实现等比缩放
        var width = t3_box.x2 + padding;
        var heigth = t2_box.y2 + padding;
        var viewbox = "0 0 " + width + " " + heigth;
        svg.attr({"viewBox":viewbox});

        return svg;
    },
    /**
     * 恒牙牙位图
     * @param id
     * @param array
     */
    permanent_tooth:function (id, array) {
        var padding = 6;//边距
        var interval = 2;//间距
        var svg = Snap("#"+id);
        var g = svg.paper.g();
        g.attr({"font-size":"10px"});
        svg.attr({"viewBox":"0 0 140 60"});

        var t0_x1 = padding;
        var t0_y1 = 30;
        var t0_x2 = 140 - padding;
        var t0_y2 = 30;
        var t0 = svg.paper.line(t0_x1, t0_y1, t0_x2, t0_y2).attr({stroke: "#000", strokeWidth: 2});
        g.append(t0);
        var t0_box = t0.getBBox();

        var t1_x1 = t0_box.cx;
        var t1_y1 = padding;
        var t1_x2 = t1_x1;
        var t1_y2 = 60 - padding;
        var t1 = svg.paper.line(t1_x1, t1_y1, t1_x2, t1_y2).attr({stroke: "#000", strokeWidth: 2});

        var x,y,c;
        for(var i = 0; i < array.length; i++){
            x = padding + i%16*6 + (i%16-1)*interval + Math.floor(i%16/8)*5;
            y = 23 + Math.floor(i/16)*23;
            c = svg.paper.text(x, y, array[i]);
            g.append(c);
        }

        return svg;
    },
    /**
     * 乳牙牙位
     * @param id
     * @param array
     */
    deciduous_teeth:function (id, array) {
        var padding = 6;//边距
        var interval = 2;//间距
        var svg = Snap("#"+id);
        var g = svg.paper.g();
        g.attr({"font-size":"10px"});
        svg.attr({"viewBox":"0 0 140 60"});

        var t0_x1 = padding;
        var t0_y1 = 30;
        var t0_x2 = 140 - padding;
        var t0_y2 = 30;
        var t0 = svg.paper.line(t0_x1, t0_y1, t0_x2, t0_y2).attr({stroke: "#000", strokeWidth: 2});
        g.append(t0);
        var t0_box = t0.getBBox();

        var t1_x1 = t0_box.cx;
        var t1_y1 = padding;
        var t1_x2 = t1_x1;
        var t1_y2 = 60 - padding;
        var t1 = svg.paper.line(t1_x1, t1_y1, t1_x2, t1_y2).attr({stroke: "#000", strokeWidth: 2});

        var x,y,c;
        for(var i = 0; i < array.length; i++){
            x = padding + i%10*11 + (i%10-1)*interval + Math.floor(i%10/5)*5;
            y = 23 + Math.floor(i/10)*23;
            c = svg.paper.text(x, y, array[i]);
            g.append(c);
        }

        return svg;
    },
    /**
     * 标尺
     * @param id
     */
    scale:function (id, value) {
        var padding = 5;//边距
        var interval = 5;//间距
        var svg = Snap("#"+id);
        var g = svg.paper.g();
        g.attr({"font-size":"10px"});
        svg.attr({"viewBox":"0 0 520 60"});

        var t0_x1 = padding;
        var t0_y1 = 30;
        var t0_x2 = 510 - padding;
        var t0_y2 = 30;
        var t0 = svg.paper.line(t0_x1, t0_y1, t0_x2, t0_y2).attr({stroke: "#000", strokeWidth: 1});
        g.append(t0);
        var t0_box = t0.getBBox();

        var x1,y1,x2,y2,t,t_box,c;
        //循环刻度
        for(var i = 0; i < 101; i++){
            var dy1 = 0,dy2 = 0;
            if(i % 5 == 0){
                dy1 = 5;
            }
            if(i % 10 == 0){
                dy1 = 5;
                dy2 = 10;
            }
            x1 = padding + i*interval;
            y1 = 25 - dy1;
            x2 = x1;
            y2 = 30 + dy2;
            t = svg.paper.line(x1, y1, x2, y2).attr({stroke: "#000", strokeWidth: 1});
            g.append(t);
            t_box = t.getBBox();

            //画刻度值
            if(i % 10 == 0){
                c = svg.paper.text(t_box.cx, t_box.y2, Math.floor(i/10).toString()).attr({"dx":"1", "dy":"15","text-anchor":"middle"});
                g.append(c);
            }
        }
        //画三角形，标记数值
        t1_x1 = padding + 10 * value * interval;
        t1_y1 = 31;
        t1_x2 = t1_x1 - 8
        t1_y2 = t1_y1 + 10;
        t1_x3 = t1_x1 + 8
        t1_y3 = t1_y1 + 10;
        svg.paper.polyline(t1_x1, t1_y1, t1_x2, t1_y2, t1_x3, t1_y3).attr({stroke: "#000", strokeWidth: 1});

        return svg;
    }
}

/**
 * 表达式鼠标拖拽缩放实现
 */
$(document).ready(function () {
    zoom_mousedown = function(node) {
        var event = trasenEditor.window.event;
        var width = $(node).attr("width");
        var height = $(node).attr("height");
        var clientX = event.clientX;
        var clientY = event.clientY;
        $(trasenEditor.window.document).on("mousemove",function (e) {
            var curX = e.pageX;
            var curY = e.pageY;
            $(node).attr("width",width - clientX + curX);
            $(node).attr("height", height - clientY + curY);
        });
        $(trasenEditor.window.document).on("mouseup",function () {
            $(this).off("mousemove");
            $(this).off("mouseup");
        })
    }
});

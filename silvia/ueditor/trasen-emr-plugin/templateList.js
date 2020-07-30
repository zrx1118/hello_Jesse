//文本输入框编辑器功能
$(".tmp_top_tab a").click(function(){
	$(this).addClass("active").siblings().removeClass("active");
	var index = $(this).index();
	$(".tmp_tab_cont").show();
	$(".tmp_tab_cont").find(".img_card").eq(index).show().siblings(".img_card").hide();
});
$(".tmp_scroll_set .set_type").click(function(){
	if($(this).hasClass("set_open")){
		$(this).removeClass("set_open");
		$(this).next(".set_cont").hide();
	}else{
		$(this).addClass("set_open")
		$(this).next(".set_cont").show();
	}
});
//点击×
$(".new_dellect").click(function(){
	$(this).parents(".tmp_bomb").hide();
});


//字体选择
$("#fontChoose").click(function(){
	$(this).find(".quarter_box").toggle();
});

$("#fontSize").click(function(){
	$(this).find(".quarter_box").toggle();
});
//插入下面的功能弹出
$("#tmpKnowledge").click(function(){
	$(".tmp_bomb").hide();
	console.log(1);
	$(".tmp_knowledge").show();
});
$("#structure").click(function(){
	$(".tmp_bomb").hide();
	$(".tmp_insert").show();
});
$("#expression").click(function(){
	$(".tmp_bomb").hide();
	$(".tmp_expression").show();
});
$("#character").click(function(){
	$(".tmp_bomb").hide();
	$(".tmp_character").show();
});
//文本编辑功能图标框  点击随意地方 图标消失
//$(".text_content").click(function(){
//	$(".tmp_tab_cont").hide();
//	$(".tmp_top_tab a").removeClass("active");
//});
//$(".tmp_tab_cont").click(function(){
//	$(".tmp_tab_cont").hide();
//	$(".tmp_top_tab a").removeClass("active");
//});


if (window.addEventListener) {
	var eleFile = document.querySelector("#file"), eleShow = document.querySelector("#showImage"), elePre = document.querySelector("pre");
	var canvas = document.createElement("canvas");
	var context = canvas.getContext("2d");
	
	eleFile.addEventListener("change", function(event) {
		var file = event.target.files[0];
		if (!file) { return; }
		if (file.type.indexOf("image") == 0 || (!file.type && /\.(?:jpg|png|gif)$/.test(file.name) /* for IE10 */)) {
			if (file.size >= 100 * 1024) {
				alert('您这张"'+ file.name +'"图片大小过大，应小于100k');	
			} else {
				var reader = new FileReader()
				reader.onload = function(e) {
					var image = new Image();
					image.onload = function() {
						var width = this.width, height = this.height;
						canvas.width = width;
						canvas.height = height;
						
						context.drawImage(this, 0, 0, width, height);
						var imageData = context.getImageData(0, 0, width, height);
						var arrBoxShadow = [], length = imageData.data.length;
                        // console.log(imageData)
						// 遍历颜色参数值
						for (var index = 0; index < length; index++) {		
							if (index % 4 === 0) {
								var x = index / 4 % width + 1, y = Math.floor(index / 4 / width) + 1, alpha = Math.round(imageData.data[index + 3] / 255 * 100) / 100;
								if (imageData.data[index + 3] == 255) {
                                    var hex1 = imageData.data[index].toString(16), hex2 = imageData.data[index + 1].toString(16), hex3 = imageData.data[index + 2].toString(16);

                                    if (hex1.length == 1) hex1 = "0" + hex1;
									if (hex2.length == 1) hex2 = "0" + hex2;
									if (hex3.length == 1) hex3 = "0" + hex3;
									
									var hex = hex1 + hex2 + hex3;
									if (hex1.slice(0,1) == hex1.slice(-1) && hex2.slice(0,1) == hex2.slice(-1) && hex3.slice(0,1) == hex3.slice(-1)) {
										hex = hex1.slice(-1) + hex2.slice(-1) + hex3.slice(-1);
									}				
									
									arrBoxShadow.push(x + "px " + y + "px #" + hex);
								} else if (alpha > 0) {
									arrBoxShadow.push(x + "px " + y + "px rgba(" + 
										[imageData.data[index], imageData.data[index + 1], imageData.data[index + 2], alpha].join() + 
									")");
								}									
							}
						};
						
						eleShow.style.width = width + "px";
						eleShow.style.height = height + "px";
						
						// 盒阴影图片显示
						eleShow.querySelector("i").style.boxShadow = arrBoxShadow.join();
						
						// 代码显示
						elePre.style.display = "block";
						elePre.innerHTML = "box-shadow: " + arrBoxShadow.join(",");
					};
					image.src = e.target.result;
				}
				reader.readAsDataURL(file);	
			}			
		} else {
			alert('文件"' + file.name + '"不是图片。');	
		}
	});
}
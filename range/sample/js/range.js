/* range.js v1.0, 2007.01.29
  * Copyright (c) 2007 iamas, HIrotaka Takagi
  * Support url : http://www.iamas.ac.jp/~key05/range/reference/
  *-------------------------------------------------------------*/
  
var jogWidth = 10; //„Éú„Çø„É≥„ÅÆÊ®™ÂπÖ
var offsetX;
var setX;
var setMinX;
var setMaxX;
var offsetY;
var setY;
var setMinY;
var setMaxY;


/*horizontal
-------------------------------------------------------------*/
function RangeH(Bar,Range,Min,Max,minNum,maxNum,Top,Left){
	var num = minNum;
	var range = maxNum - minNum;
	var barLeft = Left;
	var barTop = Top;
	
	var barWidth = 190; //„Éê„Éº„ÅÆÊ®™ÂπÖ
	var barHeight = 10; //„Éê„Éº„ÅÆÁ∏¶ÂπÖ
	
	var min = num;
	var max = num + range;
	var minX = barLeft;
	var maxX = barLeft + barWidth;
	var rangeX = barLeft;
	var minFlag = false;
	var maxFlag = false;
	var rangeFlag = false;
	
	Event.observe(document.body, "mousemove", MoveH, false);
	Event.observe(document.body, "mouseup", UpH, false);
		
	$(Min).onmousedown = MinDownH;
	$(Max).onmousedown = MaxDownH;
	$(Range).onmousedown = RangeDownH;
	$(Bar).onmousedown = BarDownH;
	$(Min).style.top = barTop + "px";
	$(Min).style.left = barLeft + "px";
	$(Min).style.width = jogWidth + "px";
	$(Min).style.height = barHeight + "px";
	$(Max).style.top = barTop + "px";
	$(Max).style.left = barLeft + barWidth + "px";
	$(Max).style.width = jogWidth + "px";
	$(Max).style.height = barHeight+ "px";
	$(Bar).style.top = barTop + "px";
	$(Bar).style.left = barLeft + "px";
	$(Bar).style.width = barWidth + jogWidth + "px";
	$(Bar).style.height = barHeight + "px";
	$(Range).style.top = barTop + "px";
	$(Range).style.left = barLeft + "px";
	$(Range).style.width = barWidth + jogWidth + "px";
	$(Range).style.height = barHeight + "px";
	
	function MinDownH(e){
		offsetX = Event.pointerX(e) - minX;
		minFlag = true;
		return false;
	}
	
	function MaxDownH(e){
		offsetX = Event.pointerX(e) - maxX;
		maxFlag = true;
		return false;
	}
	
	function RangeDownH(e){
		offsetX = Event.pointerX(e) - rangeX;
		setMinX = rangeX - minX;
		setMaxX = maxX - rangeX;
		rangeFlag = true;
		return false;
	}
	
	function BarDownH(e){
		var x = Event.pointerX(e);
		if(x <= minX){
			minX = x;
			moveLayerH(Min,minX);
			min =  parseInt(num+(minX -barLeft+jogWidth)/(barWidth - jogWidth)*range, 10);
			changeRangeH(Range,minX,maxX);
			onSlideH(min,max);
			onUpH(min,max);
		}
		
		if(x >= maxX){
			maxX = x-jogWidth;
			moveLayerH(Max,maxX);
			max =  parseInt(num+(maxX -barLeft)/(barWidth - jogWidth)*range, 10);
			changeRangeH(Range,minX,maxX);
			onSlideH(min,max);
			onUpH(min,max);
		}
		return false;
	}
	
	function UpH(e){
		if(minFlag == true || maxFlag == true || rangeFlag == true){
			minFlag = false;
			maxFlag = false;
			rangeFlag = false;
			onUpH(min,max);
		}
	}
	
	function MoveH(e){
		var x = Event.pointerX(e);
		setX = x - offsetX;
	
		if(setX >= barLeft && setX <= maxX-jogWidth && minFlag){
			minX = setX;
			moveLayerH(Min,minX);
			min =  parseInt(num+(minX -barLeft+jogWidth)/(barWidth - jogWidth)*range, 10);
			max =  parseInt(num+(maxX -barLeft)/(barWidth - jogWidth)*range, 10);
			changeRangeH(Range,minX,maxX);
			onSlideH(min,max);
		}
		
		if(setX >= minX+jogWidth && setX <= barLeft + barWidth && maxFlag){
			maxX = setX;
			moveLayerH(Max,maxX);
			min =  parseInt(num+(minX -barLeft+jogWidth)/(barWidth - jogWidth)*range, 10);
			max =  parseInt(num+(maxX -barLeft)/(barWidth - jogWidth)*range, 10);
			changeRangeH(Range,minX,maxX);
			onSlideH(min,max);
		}
		
		if(setX - setMinX >= barLeft && setX + setMaxX <= barLeft + barWidth && rangeFlag){
			rangeX = setX;
			minX = rangeX - setMinX;
			maxX = rangeX + setMaxX;
			moveLayerH(Range,rangeX);
			moveLayerH(Min,minX);
			moveLayerH(Max,maxX);
			min =  parseInt(num+(minX -barLeft+jogWidth)/(barWidth - jogWidth)*range, 10);
			max =  parseInt(num+(maxX -barLeft)/(barWidth - jogWidth)*range, 10);
			changeRangeH(Range,minX,maxX);
			onSlideH(min,max);
		}
		return false;
	}
}

function changeRangeH(layName,min,max){
	$(layName).style.width = max - min + jogWidth + "px";
	$(layName).style.left = min + "px";
}

function moveLayerH(layName,layx){
	$(layName).style.left = layx + "px";
}


/*vertical
-------------------------------------------------------------*/
function RangeV(Bar,Range,Min,Max,minNum,maxNum,Top,Left){
	var num = minNum;
	var range = maxNum - minNum;
	var barLeft = Left;
	var barTop = Top;
	
	var barWidth = 10; //„Éê„Éº„ÅÆÊ®™ÂπÖ
	var barHeight = 190; //„Éê„Éº„ÅÆÁ∏¶ÂπÖ
	
	var min = num;
	var max = num + range;
	var minY = barTop;
	var maxY = barTop + barHeight;
	var rangeY = barLeft;
	var minFlag = false;
	var maxFlag = false;
	var rangeFlag = false;
	
	Event.observe(document.body, "mousemove", MoveV, false);
	Event.observe(document.body, "mouseup", UpV, false);
		
	$(Min).onmousedown = MinDownV;
	$(Max).onmousedown = MaxDownV;
	$(Range).onmousedown = RangeDownV;
	$(Bar).onmousedown = BarDownV;
	$(Min).style.top = barTop + "px";
	$(Min).style.left = barLeft + "px";
	$(Min).style.width = jogWidth + "px";
	$(Min).style.height = barWidth + "px";
	$(Max).style.top = barTop + barHeight + "px";
	$(Max).style.left = barLeft + "px";
	$(Max).style.width = jogWidth + "px";
	$(Max).style.height = barWidth + "px";
	$(Bar).style.top = barTop + "px";
	$(Bar).style.left = barLeft + "px";
	$(Bar).style.width = barWidth + "px";
	$(Bar).style.height = barHeight + jogWidth + "px";
	$(Range).style.top = barTop + "px";
	$(Range).style.left = barLeft + "px";
	$(Range).style.width = barWidth + "px";
	$(Range).style.height = barHeight + jogWidth + "px";
	
	function MinDownV(e){
		offsetY = Event.pointerY(e) - minY;
		minFlag = true;
		return false;
	}
	
	function MaxDownV(e){
		offsetY = Event.pointerY(e) - maxY;
		maxFlag = true;
		return false;
	}
	
	function RangeDownV(e){
		offsetY = Event.pointerY(e) - rangeY;
		setMinY = rangeY - minY;
		setMaxY = maxY - rangeY;
		rangeFlag = true;
		return false;
	}
	
	function BarDownV(e){
		var y = Event.pointerY(e);
		if(y <= minY){
			minY = y;
			moveLayerV(Min,minY);
			min =  parseInt(num+(minY -barTop+jogWidth)/(barHeight - jogWidth)*range, 10);
			changeRangeV(Range,minY,maxY);
			onSlideV(min,max);
			onUpV(min,max);
		}
		
		if(y >= maxY){
			maxY = y-jogWidth;
			moveLayerV(Max,maxY);
			max =  parseInt(num+(maxY -barTop)/(barHeight - jogWidth)*range, 10);
			changeRangeV(Range,minY,maxY);
			onSlideV(min,max);
			onUpV(min,max);
		}
		return false;
	}
	
	function UpV(e){
		if(minFlag == true || maxFlag == true || rangeFlag == true){
			minFlag = false;
			maxFlag = false;
			rangeFlag = false;
			onUpV(min,max);
		}
	}
	
	function MoveV(e){
		var y = Event.pointerY(e);
		setY = y - offsetY;
	
		if(setY >= barTop && setY <= maxY-jogWidth && minFlag){
			minY = setY;
			moveLayerV(Min,minY);
			min =  parseInt(num+(minY -barTop+jogWidth)/(barHeight - jogWidth)*range, 10);
			max =  parseInt(num+(maxY -barTop)/(barHeight - jogWidth)*range, 10);
			changeRangeV(Range,minY,maxY);
			onSlideV(min,max);
		}
		
		if(setY >= minY+jogWidth && setY <= barTop + barHeight && maxFlag){
			maxY = setY;
			moveLayerV(Max,maxY);
			min =  parseInt(num+(minY -barTop+jogWidth)/(barHeight - jogWidth)*range, 10);
			max =  parseInt(num+(maxY -barTop)/(barHeight - jogWidth)*range, 10);
			changeRangeV(Range,minY,maxY);
			onSlideV(min,max);
		}
		
		if(setY - setMinY >= barTop && setY + setMaxY <= barTop + barHeight && rangeFlag){
			rangeY = setY;
			minY = rangeY - setMinY;
			maxY = rangeY + setMaxY;
			moveLayerV(Range,rangeY);
			moveLayerV(Min,minY);
			moveLayerV(Max,maxY);
			min =  parseInt(num+(minY -barTop+jogWidth)/(barHeight - jogWidth)*range, 10);
			max =  parseInt(num+(maxY -barTop)/(barHeight - jogWidth)*range, 10);
			changeRangeV(Range,minY,maxY);
			onSlideV(min,max);
		}
		return false;
	}
}

function changeRangeV(layName,min,max){
	$(layName).style.height = max - min + jogWidth + "px";
	$(layName).style.top = min + "px";
}

function moveLayerV(layName,layx){
	$(layName).style.top = layx + "px";
}


/*horizontal in
-------------------------------------------------------------*/
function RangeHI(Bar,Range,Min,Max,In,minNum,maxNum,Top,Left){
	var num = minNum;
	var range = maxNum - minNum;
	var barLeft = Left;
	var barTop = Top;
	
	var barWidth = 190;
	var barHeight = 10;
	
	var min = num;
	var max = num + range;
	var minX = barLeft;
	var maxX = barLeft + barWidth;
	var rangeX = barLeft;
	var inX = barLeft + jogWidth/2;
	var minFlag = false;
	var maxFlag = false;
	var rangeFlag = false;
	var inFlag = false;
	
	Event.observe(document.body, "mousemove", MoveHI, false);
	Event.observe(document.body, "mouseup", UpHI, false);
		
	$(Min).onmousedown = MinDownHI;
	$(Max).onmousedown = MaxDownHI;
	$(Range).onmousedown = RangeDownHI;
	$(Bar).onmousedown = BarDownHI;
	$(In).onmousedown = InDownHI;
	$(Min).style.top = barTop + "px";
	$(Min).style.left = barLeft + "px";
	$(Min).style.width = jogWidth + "px";
	$(Min).style.height = barHeight + "px";
	$(Max).style.top = barTop + "px";
	$(Max).style.left = barLeft + barWidth + "px";
	$(Max).style.width = jogWidth + "px";
	$(Max).style.height = barHeight+ "px";
	$(Bar).style.top = barTop + "px";
	$(Bar).style.left = barLeft + "px";
	$(Bar).style.width = barWidth + jogWidth + "px";
	$(Bar).style.height = barHeight + "px";
	$(Range).style.top = barTop + "px";
	$(Range).style.left = barLeft + "px";
	$(Range).style.width = barWidth + jogWidth + "px";
	$(Range).style.height = barHeight + "px";
	$(In).style.top = barTop + jogWidth + "px";
	$(In).style.left = barLeft + jogWidth/2 + "px";
	$(In).style.width = jogWidth + "px";
	$(In).style.height = barHeight + "px";
	
	function MinDownHI(e){
		offsetX = Event.pointerX(e) - minX;
		minFlag = true;
		return false;
	}
	
	function MaxDownHI(e){
		offsetX = Event.pointerX(e) - maxX;
		maxFlag = true;
		return false;
	}
	
	function RangeDownHI(e){
		offsetX = Event.pointerX(e) - rangeX;
		setMinX = rangeX - minX;
		setMaxX = maxX - rangeX;
		rangeFlag = true;
		return false;
	}
	
	function BarDownHI(e){
		var x = Event.pointerX(e);
		if(x <= minX){
			minX = x;
			moveLayerH(Min,minX);
			min =  parseInt(num+(minX -barLeft+jogWidth)/(barWidth - jogWidth)*range, 10);
			changeRangeH(Range,minX,maxX);
			changeIn(In,minX);
			inX = minX + jogWidth/2;
			onSlideHI(min,max);
			onUpHI(min,max);
		}
		
		if(x >= maxX){
			maxX = x-jogWidth;
			moveLayerH(Max,maxX);
			max =  parseInt(num+(maxX -barLeft)/(barWidth - jogWidth)*range, 10);
			changeRangeH(Range,minX,maxX);
			changeIn(In,minX);
			inX = minX + jogWidth/2;
			onSlideHI(min,max);
			onUpHI(min,max);
		}
		return false;
	}
	
	function InDownHI(e){
		offsetX = Event.pointerX(e) - inX;
		inFlag = true;
		return false;
	}
	
	function UpHI(e){
		if(minFlag == true || maxFlag == true || rangeFlag == true){
			minFlag = false;
			maxFlag = false;
			rangeFlag = false;
			inX = minX + jogWidth/2;
			onUpHI(min,max);
		}
		if(inFlag == true){
			inFlag = false;
			onUpHI(min,max);
		}
	}
	
	function MoveHI(e){
		var x = Event.pointerX(e);
		setX = x - offsetX;
	
		if(setX >= barLeft && setX <= maxX-jogWidth && minFlag){
			minX = setX;
			moveLayerH(Min,minX);
			min =  parseInt(num+(minX -barLeft+jogWidth)/(barWidth - jogWidth)*range, 10);
			max =  parseInt(num+(maxX -barLeft)/(barWidth - jogWidth)*range, 10);
			changeRangeH(Range,minX,maxX);
			changeIn(In,minX);
			onSlideHI(min,max);
		}
		
		if(setX >= minX+jogWidth && setX <= barLeft + barWidth && maxFlag){
			maxX = setX;
			moveLayerH(Max,maxX);
			min =  parseInt(num+(minX -barLeft+jogWidth)/(barWidth - jogWidth)*range, 10);
			max =  parseInt(num+(maxX -barLeft)/(barWidth - jogWidth)*range, 10);
			changeRangeH(Range,minX,maxX);
			changeIn(In,minX);
			onSlideHI(min,max);
		}
		
		if(setX - setMinX >= barLeft && setX + setMaxX <= barLeft + barWidth && rangeFlag){
			rangeX = setX;
			minX = rangeX - setMinX;
			maxX = rangeX + setMaxX;
			moveLayerH(Range,rangeX);
			moveLayerH(Min,minX);
			moveLayerH(Max,maxX);
			min =  parseInt(num+(minX -barLeft+jogWidth)/(barWidth - jogWidth)*range, 10);
			max =  parseInt(num+(maxX -barLeft)/(barWidth - jogWidth)*range, 10);
			changeRangeH(Range,minX,maxX);
			changeIn(In,minX);
			onSlideHI(min,max);
		}
		
		if(setX >= minX + jogWidth/2 && setX <= maxX - jogWidth/2 && inFlag){
			inX = setX;
			moveLayerH(In,inX);
			min =  parseInt(num+(inX -barLeft+jogWidth)/(barWidth - jogWidth)*range, 10);
			max =  min
			onSlideHI(min,max);
		}
		return false;
	}
}

function changeIn(layName,min){
	inX = min + jogWidth/2;
	moveLayerH(layName,inX);
}


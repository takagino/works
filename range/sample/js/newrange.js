function RangeH2(Bar,Range,Min,Max,minNum,maxNum,Top,Left){
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
	var minFlag = false;
	var maxFlag = false;
	var rangeFlag = false;
	
	Event.observe(document.body, "mousemove", MoveH2, false);
	Event.observe(document.body, "mouseup", UpH2, false);
		
	$(Min).onmousedown = MinDownH2;
	$(Max).onmousedown = MaxDownH2;
	$(Range).onmousedown = RangeDownH2;
	$(Bar).onmousedown = BarDownH2;
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
	
	function MinDownH2(e){
		offsetX = Event.pointerX(e) - minX;
		minFlag = true;
		return false;
	}
	
	function MaxDownH2(e){
		offsetX = Event.pointerX(e) - maxX;
		maxFlag = true;
		return false;
	}
	
	function RangeDownH2(e){
		offsetX = Event.pointerX(e) - rangeX;
		setMinX = rangeX - minX;
		setMaxX = maxX - rangeX;
		rangeFlag = true;
		return false;
	}
	
	function BarDownH2(e){
		var x = Event.pointerX(e);
		if(x <= minX){
			minX = x;
			moveLayerH(Min,minX);
			min =  parseInt(num+(minX -barLeft+jogWidth)/(barWidth - jogWidth)*range, 10);
			changeRangeH(Range,minX,maxX);
			onSlideH2(min,max);
			onUpH2(min,max);
		}
		
		if(x >= maxX){
			maxX = x-jogWidth;
			moveLayerH(Max,maxX);
			max =  parseInt(num+(maxX -barLeft)/(barWidth - jogWidth)*range, 10);
			changeRangeH(Range,minX,maxX);
			onSlideH2(min,max);
			onUpH2(min,max);
		}
		return false;
	}
	
	function UpH2(e){
		if(minFlag == true || maxFlag == true || rangeFlag == true){
			minFlag = false;
			maxFlag = false;
			rangeFlag = false;
			onUpH2(min,max);
		}
	}
	
	function MoveH2(e){
		var x = Event.pointerX(e);
		setX = x - offsetX;
	
		if(setX >= barLeft && setX <= maxX-jogWidth && minFlag){
			minX = setX;
			moveLayerH(Min,minX);
			min =  parseInt(num+(minX -barLeft+jogWidth)/(barWidth - jogWidth)*range, 10);
			max =  parseInt(num+(maxX -barLeft)/(barWidth - jogWidth)*range, 10);
			changeRangeH(Range,minX,maxX);
			onSlideH2(min,max);
		}
		
		if(setX >= minX+jogWidth && setX <= barLeft + barWidth && maxFlag){
			maxX = setX;
			moveLayerH(Max,maxX);
			min =  parseInt(num+(minX -barLeft+jogWidth)/(barWidth - jogWidth)*range, 10);
			max =  parseInt(num+(maxX -barLeft)/(barWidth - jogWidth)*range, 10);
			changeRangeH(Range,minX,maxX);
			onSlideH2(min,max);
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
			onSlideH2(min,max);
		}
		return false;
	}
}

function SingleH(Bar,Min,minNum,maxNum,Top,Left){
	var num = minNum;
	var range = maxNum - minNum;
	var barLeft = Left;
	var barTop = Top;
	
	var barWidth = 190;
	var barHeight = 10;
	
	var min = num;
	var minX = barLeft;
	var minFlag = false;
	
	Event.observe(document.body, "mousemove", MoveS, false);
	Event.observe(document.body, "mouseup", UpS, false);
		
	$(Min).onmousedown = MinDownS;
	$(Bar).onmousedown = BarDownS;
	$(Min).style.top = barTop + barHeight  + "px";
	$(Min).style.left = barLeft + "px";
	$(Min).style.width = jogWidth + "px";
	$(Min).style.height = barHeight + "px";
	$(Bar).style.top = barTop + "px";
	$(Bar).style.left = barLeft + "px";
	$(Bar).style.width = barWidth + jogWidth + "px";
	$(Bar).style.height = barHeight + "px";
	
	function MinDownS(e){
		offsetX = Event.pointerX(e) - minX;
		minFlag = true;
		return false;
	}
	
	function BarDownS(e){
		var x = Event.pointerX(e);
		minX = x;
		moveLayerH(Min,minX);
		if(minX >= barLeft && barLeft + 45 > minX){
			min = 0;
		}else if(minX >= barLeft + 45 && barLeft + 95 > minX){
			min = 1;
		}else if(minX >= barLeft + 95 && barLeft + 145 > minX){
			min = 2;
		}else if(minX >= barLeft + 145 && barLeft + 195 > minX){
			min = 3;
		}
		onSlideS(min);
		onUpS(min);
	}
	
	function UpS(e){
		if(minFlag == true){
			minFlag = false;
			onUpS(min);
		}
	}
	
	function MoveS(e){
		var x = Event.pointerX(e);
		setX = x - offsetX;
	
		if(setX >= barLeft && setX <= barLeft + barWidth && minFlag){
			minX = setX;
			moveLayerH(Min,minX);
			if(minX >= barLeft && barLeft + 45 > minX){
			min = 0;
		}else if(minX >= barLeft + 45 && barLeft + 95 > minX){
			min = 1;
		}else if(minX >= barLeft + 95 && barLeft + 145 > minX){
			min = 2;
		}else if(minX >= barLeft + 145 && barLeft + 195 > minX){
			min = 3;
		}
			onSlideS(min);
		}
		return false;
	}
}
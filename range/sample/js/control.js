var num = [];
var carData = [];
var priceset = [];
var meterset = [];
var yearset = [];

var colors = [];
var makers = [];
var models = [];
var grades = [];
var prices = [];
var meters = [];
var years = [];
var areas = [];
var descriptions = [];
var links = [];
var imgs = [];

var color = "black";
var yearMin = 2000;
var yearMax = 2007;
var priceMin = 0*100000;
var priceMax = 10*100000;
var meterMin = 0*10000;
var meterMax = 5*10000;

var car = ""
var nextNum = 0;
var showNum = 5;
var j;

window.onload = function (){
	SingleH("colorBar","colorMin",0,3,245,100)
	RangeH("priceBar","priceRange","priceMin","priceMax",0,10,310,100);
	RangeH2("meterBar","meterRange","meterMin","meterMax",0,5,375,100);
	RangeHI("yearBar","yearRange","yearMin","yearMax","yearIn",2002,2007,440,100);
	$("colorVal").style.top = "220px";
	$("colorVal").style.left = "100px";
	$("priceVal").style.top = "285px";
	$("priceVal").style.left = "100px";
	$("meterVal").style.top = "350px";
	$("meterVal").style.left = "100px";
	$("yearVal").style.top = "415px";
	$("yearVal").style.left = "100px";
	$("loading").style.top = "170px";
	$("loading").style.left = "100px";
	
	$("next").onmousedown = nextDown;
	$("back").onmousedown = backDown;
	
	$("loading").innerHTML = "合計件数 : " + "取得中です...";
	var url = 'http://matherotics.org/work/range/sample/xml/car_black.xml';
	var myAjax = new Ajax.Request(
			url, 
			{
				method: 'get', 
				parameters: '', 
				onComplete: houseData
			});
	function houseData(req){
		var xmlData = req.responseXML;
		carData = xmlData.getElementsByTagName("used_car");
		for(var i=0; i<carData.length; i++){
			priceset[i] = carData[i].getElementsByTagName("price")[0].firstChild.nodeValue;
		}
		for(var i=0; i<carData.length; i++){
			meterset[i] = carData[i].getElementsByTagName("meter")[0].firstChild.nodeValue;
		}
		for(var i=0; i<carData.length; i++){
			yearset[i] = carData[i].getElementsByTagName("year")[0].firstChild.nodeValue;
		}
		for(var i=0; i<carData.length; i++){
			colors[i] = carData[i].getElementsByTagName("keycolor")[0].firstChild.nodeValue;
		}
		$("loading").innerHTML = "合計件数 : " + carData.length + "件";
	}
}

function onUpHI(min,max){
	yearMin = min;
	yearMax = max;
	showData();
}

function onUpH(min,max){
	priceMin = min*100000;
	priceMax = max*100000;
	showData();
}

function onUpH2(min,max){
	meterMin = min*10000;
	meterMax = max*10000;
	showData();
}

function onUpS(min){
	if(min == 0){
		color = "black";
	}else if(min == 1){
		color = "pearl";
	}else if(min == 2){
		color = "red";
	}else if(min == 3){
		color = "blue";
	}
	showData();
}

function onSlideHI(min,max){
	sendData("yearDat",min,max,1, "");
}

function onSlideH(min,max){
	sendData("priceDat",min,max,10, "万円");
}

function onSlideH2(min,max){
	sendData("meterDat",min,max,10000, "km");
}

function onSlideS(min){
	if(min == 0){
		color = "黒色";
	}else if(min == 1){
		color = "銀色";
	}else if(min == 2){
		color = "赤色";
	}else if(min == 3){
		color = "青色";
	}
	sendData2("colorDat",color);
}

function nextDown(){
	nextNum++;
	changeData();
}

function backDown(){
	nextNum--;
	changeData();
}

function showData(){
	nextNum = 0;
	backNum = 0;
	num = [];
	makers = [];
	models = [];
	grades = [];
	prices = [];
	meters = [];
	years = [];
	areas = [];
	links = [];
	descriptions = [];
	imgs = [];
	car = ""
	
	for(var i=0; i<yearset.length; i++){
		if(yearMin <= yearset[i] && yearset[i] <= yearMax && priceMin <= priceset[i] && priceset[i] <= priceMax && meterMin <= meterset[i] && meterset[i] <= meterMax && colors[i] == color){
			num.push(i);
		}
	}
	if(num.length > showNum && num.length != 0){
		for(j=0; j<showNum; j++){
			houseArray();
		}
		$("next").innerHTML = "next >>";
		$("back").innerHTML = "";
		$("number").innerHTML = showNum + "/" + num.length;
		$("loading").innerHTML = "検索結果 : " + num.length + "件";
	}else if(num.length <= showNum && num.length != 0){
		for(j=0; j<num.length; j++){
			houseArray();
		}
		$("next").innerHTML = "";
		$("back").innerHTML = "";
		$("number").innerHTML = num.length + "/" + num.length;
		$("loading").innerHTML = "検索結果 : " + num.length + "件";
	}else if(num.length == 0){
		$("next").innerHTML = "";
		$("back").innerHTML = "";
		$("number").innerHTML = num.length + "/" + num.length;
		$("loading").innerHTML = "検索結果 : " + num.length + "件";
	}
	$("indicate").innerHTML = car;
}

function changeData(){
	makers = [];
	models = [];
	grades = [];
	prices = [];
	meters = [];
	years = [];
	areas = [];
	prefectures = [];
	links = [];
	descriptions = [];
	imgs = [];
	sizes = [];
	car = ""
	
	if((num.length -showNum*nextNum) > showNum && num.length != 0){
		for(j=(0+showNum*nextNum); j<(showNum+showNum*nextNum); j++){
			houseArray();
		}
		$("next").innerHTML = "next >>";
		$("back").innerHTML = "<< back";
		$("number").innerHTML = showNum*(nextNum+1) + "/" + num.length;
	}else if((num.length -showNum*nextNum) <= showNum && num.length != 0){
		for(j=showNum*nextNum; j<num.length; j++){
			houseArray();
		}
		$("next").innerHTML = " ";
		$("back").innerHTML = "<< back";
		$("number").innerHTML = num.length + "/" + num.length;
	}
	$("indicate").innerHTML = car;
	if(nextNum == 0){
		$("back").innerHTML = "";
	}
}

function houseArray(){
	makers[j] = carData[num[j]].getElementsByTagName("maker")[0].firstChild.nodeValue;
	models[j] = carData[num[j]].getElementsByTagName("model")[0].firstChild.nodeValue;
	if(carData[num[j]].getElementsByTagName("grade")[0].firstChild != null){
		grades[j] = carData[num[j]].getElementsByTagName("grade")[0].firstChild.nodeValue;
	}else{
		grades[j] = "";
	}
	areas[j] = carData[num[j]].getElementsByTagName("prefecture")[0].firstChild.nodeValue;
	links[j] = carData[num[j]].getElementsByTagName("link")[0].firstChild.nodeValue;
	if(carData[num[j]].getElementsByTagName("description")[0].firstChild != null){
		descriptions[j] = carData[num[j]].getElementsByTagName("description")[0].firstChild.nodeValue;
	}else{
		descriptions[j] = "";
	}
	imgs[j] = carData[num[j]].getElementsByTagName("size_s")[0].firstChild.nodeValue;
	prices[j] = carData[num[j]].getElementsByTagName("price")[0].firstChild.nodeValue;
	meters[j] = carData[num[j]].getElementsByTagName("meter")[0].firstChild.nodeValue;
	years[j] = carData[num[j]].getElementsByTagName("year")[0].firstChild.nodeValue;
	car += "<div class='block'>" + 
					"<div class='carName'>" + "<p><a href=" + "'" + links[j] + "'" + "target='_blank'>" + makers[j] + "　" + models[j]  + "</a>" + "　(" + grades[j] + ")</p></div>"  + 
					"<img src=" + "'" + imgs[j] + "' />" + 
					"<div class='info'>" + 
						"<div class='terms'><p>" + prices[j]/10000 + "万円</div>" + 
						"<div class='terms'><p>" + meters[j]+ "km</div>" + 
						"<div class='terms'><p>" + years[j] + "</div>" + 
						"<div class='terms'><p>" + areas[j] + "</div>" + 
						"<div class='cap'><p>" + descriptions[j] + "</p></div>" + 
					"</div>" + 
				"</div>";
}

function sendData(layName,min, max,product, text){
	if(min == max){
		Dat = min*product + text;
	}else{
		Dat = min*product + text +"—"+ max*product + text;
	}
	$(layName).innerHTML = Dat;
}

function sendData2(layName,min){
	$(layName).innerHTML = min;
}
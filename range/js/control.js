var Dat;
var samples01 = ["n00","n01","n02","n03","n04","n05","n06","n07","n08","n09","n10"];
var samples02 = ["c00","c01","c02","c03","c04","c05","c06","c07","c08","c09","c10"];
var number = [0,1,2,3,4,5,6,7,8,9,10];

window.onload = function (){
	RangeH("hBar","hRange","hMin","hMax",0,10,610,270);
	RangeV("vBar","vRange","vMin","vMax",0,10,610,390);
	RangeHI("iBar","iRange","iMin","iMax","iIn",0,10,610,740);
	$("hVal").style.top = "290px";
	$("hVal").style.left = "610px";
	$("vVal").style.top = "600px";
	$("vVal").style.left = "610px";
	$("iVal").style.top = "770px";
	$("iVal").style.left = "610px";
	
	$("n00").style.width = "200px";
	$("n00").style.height = "50px";
	$("n01").style.width = "200px";
	$("n01").style.height = "50px";
	$("n02").style.width = "200px";
	$("n02").style.height = "50px";
	$("n03").style.width = "200px";
	$("n03").style.height = "50px";
	$("n04").style.width = "200px";
	$("n04").style.height = "50px";
	$("n05").style.width = "200px";
	$("n05").style.height = "50px";
	$("n06").style.width = "200px";
	$("n06").style.height = "50px";
	$("n07").style.width = "200px";
	$("n07").style.height = "50px";
	$("n08").style.width = "200px";
	$("n08").style.height = "50px";
	$("n09").style.width = "200px";
	$("n09").style.height = "50px";
	$("n10").style.width = "50px";
	$("n10").style.height = "50px";
	
	$("c00").style.width = "200px";
	$("c00").style.height = "200px";
	$("c01").style.width = "200px";
	$("c01").style.height = "200px";
	$("c02").style.width = "200px";
	$("c02").style.height = "200px";
	$("c03").style.width = "200px";
	$("c03").style.height = "200px";
	$("c04").style.width = "200px";
	$("c04").style.height = "200px";
	$("c05").style.width = "200px";
	$("c05").style.height = "200px";
	$("c06").style.width = "200px";
	$("c06").style.height = "200px";
	$("c07").style.width = "200px";
	$("c07").style.height = "200px";
	$("c08").style.width = "200px";
	$("c08").style.height = "200px";
	$("c09").style.width = "200px";
	$("c09").style.height = "200px";
	$("c10").style.width = "200px";
	$("c10").style.height = "200px";
}

function onSlideH(min,max){
	sendData("hDat",min,max);
	changeSample(min,max);
}

function onSlideV(min,max){
	sendData("vDat",min,max);
	changeSample(min,max);
}

function onSlideHI(min,max){
	sendData("iDat",min,max);
	changeSample(min,max);
}

function sendData(layName,min, max){
	if(min == max){
		Dat = min;
	}else{
		Dat = min +"—"+ max;
	}
	$(layName).innerHTML = Dat;
}

//--------------------sample
function changeSample(min,max){
	for(i=0; i<samples01.length; i++){
		if(min <= number[i] && number[i] <= max){
			$(samples01[i]).style.width = "200px";
			$(samples01[i]).style.height = "50px";
			$(samples02[i]).style.width = "200px";
			$(samples02[i]).style.height = "200px";
		}else{
			$(samples01[i]).style.width = "0";
			$(samples01[i]).style.height = "0";
			$(samples02[i]).style.width = "0";
			$(samples02[i]).style.height = "0";
		}
	}
}
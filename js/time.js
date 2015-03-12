$.fn.p=function(num){
	var nr=[];
	nr[0]=[[1,2],[1,3],[1,4],[1,5],[1,6],[5,2],[5,3],[5,4],[5,5],[5,6],[2,1],[3,1],[4,1],[2,7],[3,7],[4,7],[2,5],[3,4],[4,3]];
	nr[1]=[[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7],[2,2],[2,7],[4,7]];
	nr[2]=[[5,7],[4,7],[3,7],[2,7],[1,7],[1,6],[2,5],[3,4],[4,4],[1,2],[2,1],[3,1],[4,1],[5,2],[5,3]];
	nr[3]=[[1,1],[2,1],[3,1],[4,1],[5,1],[1,6],[2,7],[3,7],[4,7],[4,2],[3,3],[4,4],[5,5],[5,6]];
	nr[4]=[[1,5],[2,5],[3,5],[4,5],[5,5],[1,4],[2,3],[3,2],[4,1],[4,2],[4,3],[4,4],[4,6],[4,7]];
	nr[5]=[[1,6],[2,7],[3,7],[4,7],[5,6],[5,5],[5,4],[4,3],[3,3],[2,3],[1,3],[1,2],[1,1],[2,1],[3,1],[4,1],[5,1]];
	nr[6]=[[2,4],[3,4],[4,4],[5,5],[5,6],[4,7],[3,7],[2,7],[1,6],[1,5],[1,4],[1,3],[2,2],[3,1],[4,1]];
	nr[7]=[[3,7],[3,6],[3,5],[3,4],[4,3],[5,2],[5,1],[4,1],[3,1],[2,1],[1,1]];
	nr[8]=[[5,5],[5,6],[4,7],[3,7],[2,7],[1,6],[1,5],[2,4],[3,4],[4,4],[5,3],[5,2],[4,1],[3,1],[2,1],[1,2],[1,3]];
	nr[9]=[[2,7],[3,7],[4,6],[5,5],[5,4],[5,3],[5,2],[4,1],[3,1],[2,1],[1,2],[1,3],[2,4],[3,4],[4,4]];
	var po = nr[num];
	$(this).children('.p').each(function(i){
		if(i>(po.length-1))$(this).animate({opacity:'hide',left:Math.floor(Math.random()*120-Math.random()*50)+'px',top:Math.floor(Math.random()*160-Math.random()*70)+'px'},1000);
	})
	for (var n=0;n<po.length;n++){
		var left=(po[n][0]-1)*20;
		var top=(po[n][1]-1)*20;
		$(this).children('.p').eq(n).animate({opacity:'show',left:left+'px',top:top+'px'},1000);
	}
}

$(function(){
	var phtml='';
	for(var i=0; i<20;i++){
		phtml+='<i class="p"></i>';
	}
	$("#hour1").html(phtml);
	$("#hour2").html(phtml);
	$("#hour3").html(phtml);
	$("#min1").html(phtml);
	$("#min2").html(phtml);
	$("#sec1").html(phtml);
	$("#sec2").html(phtml);
	$('.p').each(function(){
		$(this).css('top',Math.floor(Math.random()*600-Math.random()*600));
		$(this).css('left',Math.floor(Math.random()*500-Math.random()*500));
	});
	
	// 判断时间
	judgeTime();
	
});

var currentDay, begTime;
function judgeTime()
{
    ///////////////////////////////////////////////////////////////
	// 定义开始和结束的时间，格式要像这样的(HH-MM-SS)，不然会出问题
	var defBegTime = "22:00:00";
	var defEndTime = "23:00:00";
    ///////////////////////////////////////////////////////////////
	
	// 获取当前的年月日
	currentDay = new Date();
	
	// 分离定义的时间信息
	var arrs = defBegTime.split(":");
	begDate = new Date( currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate(), arrs[0], arrs[1], arrs[2] );
	arrs = defEndTime.split(":");
	var endDate = new Date( currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate(), arrs[0], arrs[1], arrs[2] );
	
	// 重新获取当前时间
	currentDay = new Date();
	
	// 时间的转换，换成代码支持的时间格式(js的月份是从0开始的，超蛋疼)
	//var last="2015/03/14 23:00:00";
	var last = begDate.getFullYear() + "/" + (begDate.getMonth()+1>=10?begDate.getMonth()+1:"0"+(begDate.getMonth()+1)) + "/" + (begDate.getDate()>=10?begDate.getDate():"0"+begDate.getDate()) + " " + defBegTime;
	
	// 判断时间状态
	if(currentDay < begDate) {
	    changetime(last);
		setInterval('changetime("'+last+'")',1000);
	}
	else if (currentDay > endDate) {
		begDate += 24 * 60 * 60 * 1000; // plus one day
		last = begDate.getFullYear() + "/" + (begDate.getMonth()+1>=10?begDate.getMonth()+1:"0"+(begDate.getMonth()+1)) + "/" + (begDate.getDate()>=10?begDate.getDate():"0"+begDate.getDate()) + " " + defBegTime;
		
	    changetime(last);
		setInterval('changetime("'+last+'")',1000);
	}
	else {
		// 抢购中
	}
	
	// 循环查询时间是否到了
	callMoreTime();
}

function callMoreTime() {
	setTimeout("waitTimeUp()",1000);
}

function waitTimeUp() {
	currentDay = new Date();
	if(currentDay < begDate) {
		callMoreTime();
		return;
	}
	
	// ok, time is enough
	$("#time").after('<a href="http://mewx.org/" title="点击鼠标立即抢购~" target="_self"><div style="position:absolute;top:0px;left:0px;height:100%;width:100%;background-image:url(images/get.png);background-size:100% 100%;text-align:center;z-index:2;">点击鼠标立即抢购~</div></a>');
}

var h, m;
function changetime(lasttime){
	var time=new Date(lasttime).getTime()-new Date().getTime();
	time = Math.floor(time/1000);
	var s = time%60;
	var s1=Math.floor(s/10);
	var s2=s-s1*10;
	$('#sec1').p(s1);
	$('#sec2').p(s2);
	if(m==(Math.floor(time/60))%60)return false;
	m = (Math.floor(time/60))%60;
	var m1=Math.floor(m/10);
	var m2=m-m1*10;
	$('#min1').p(m1);
	$('#min2').p(m2);
	if(h==Math.floor(time/3600))return false;
	h = Math.floor(time/3600);
	var h1=Math.floor(h/100);
	var h2=Math.floor((h-h1*100)/10);
	var h3=h-h1*100-h2*10;
	$('#hour1').p(h1);
	$('#hour2').p(h2);
	$('#hour3').p(h3);
}
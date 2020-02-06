/*
 * dart
 * Copyright(c) 2006, SangWoog Kim.
 *
 */
var $j=jQuery.noConflict();

function MM_reloadPage(init){if(init==true)with(navigator){if((appName=="Netscape")&&(parseInt(appVersion)==4)){document.MM_pgW=innerWidth;document.MM_pgH=innerHeight;onresize=MM_reloadPage;}}
else if(innerWidth!=document.MM_pgW||innerHeight!=document.MM_pgH)location.reload();}
MM_reloadPage(true);function MM_preloadImages(){var d=document;if(d.images){if(!d.MM_p)d.MM_p=new Array();var i,j=d.MM_p.length,a=MM_preloadImages.arguments;for(i=0;i<a.length;i++)
if(a[i].indexOf("#")!=0){d.MM_p[j]=new Image;d.MM_p[j++].src=a[i];}}}
function MM_swapImgRestore(){var i,x,a=document.MM_sr;for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++)x.src=x.oSrc;}
function MM_findObj(n,d){var p,i,x;if(!d)d=document;if((p=n.indexOf("?"))>0&&parent.frames.length){d=parent.frames[n.substring(p+1)].document;n=n.substring(0,p);}
if(!(x=d[n])&&d.all)x=d.all[n];for(i=0;!x&&i<d.forms.length;i++)x=d.forms[i][n];for(i=0;!x&&d.layers&&i<d.layers.length;i++)x=MM_findObj(n,d.layers[i].document);if(!x&&d.getElementById)x=d.getElementById(n);return x;}
function MM_swapImage(){var i,j=0,x,a=MM_swapImage.arguments;document.MM_sr=new Array;for(i=0;i<(a.length-2);i+=3)
if((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x;if(!x.oSrc)x.oSrc=x.src;x.src=a[i+2];}}
function MM_showHideLayers(){var i,p,v,obj,args=MM_showHideLayers.arguments;for(i=0;i<(args.length-2);i+=3)if((obj=MM_findObj(args[i]))!=null){v=args[i+2];if(obj.style){obj=obj.style;v=(v=='show')?'visible':(v=='hide')?'hidden':v;}
obj.visibility=v;}}
function formatDate(date,separator){if((date.getMonth()+1)<10)month="0"+(date.getMonth()+1);else month=date.getMonth()+1;if(date.getDate()<10)day="0"+date.getDate();else day=date.getDate();return date.getFullYear()+""+separator+""+month+""+separator+""+day;}
function setOffsets(obj,target){var end=obj.offsetWidth;var left=calculateOffsetLeft(obj);var top=calculateOffsetTop(obj)+obj.offsetHeight;target.style.left=left+"px";target.style.top=top+"px";}
function calculateOffsetLeft(field){return calculateOffset(field,"offsetLeft");}
function calculateOffsetTop(field){return calculateOffset(field,"offsetTop");}
function calculateOffset(field,attr){var offset=0;while(field){offset+=field[attr];field=field.offsetParent;}
return offset;}
function divOnOff(pNum,flag){if(flag==null||flag=="")flag="select";var divNm="publicTypeDiv"+pNum;var btnNm="PublicTypeBtn"+pNum;var imgNm="/images/publicType/";var divObj=getRef(divNm);var btnObj=getRef(btnNm);var isChecked=false;var allItem;if(document.all){allItem=document.all["publicType"];}else{allItem=document.getElementsByName("publicType");}
for(var i=0;i<allItem.length;i++){chkValue=allItem[i].value;if(pNum==chkValue.charAt(0)&&allItem[i].checked)
isChecked=true;}
if(divObj!=null){if(flag=="select"){if(divObj.className=="selectBox doNotShowDiv"){divObj.className="selectBox doShowDiv";if(isChecked)btnObj.src=imgNm+pNum+"_on_check.gif";else btnObj.src=imgNm+pNum+"_on.gif";}else if(divObj.className=="selectBox doShowDiv"){divObj.className="selectBox doNotShowDiv";if(isChecked)btnObj.src=imgNm+pNum+"_off_check.gif";else btnObj.src=imgNm+pNum+"_off.gif";}}else if(flag=="open"){divObj.className="selectBox doShowDiv";if(isChecked)btnObj.src=imgNm+pNum+"_on_check.gif";else btnObj.src=imgNm+pNum+"_on.gif";}else if(flag=="close"){divObj.className="selectBox doNotShowDiv";if(isChecked)btnObj.src=imgNm+pNum+"_off_check.gif";else btnObj.src=imgNm+pNum+"_off.gif";}}}
function checkOnOff(obj,fword){var bool;var btnNm="PublicTypeBtn"+fword;var btnObj=getRef(btnNm);if(obj.src.indexOf("/images/btn_select_all.gif")==-1){btnObj.src="/images/publicType/"+fword+"_on.gif";bool=false;obj.src="/images/btn_select_all.gif";obj.alt="전체선택";}else{btnObj.src="/images/publicType/"+fword+"_on_check.gif";bool=true;obj.src="/images/btn_deselect_all.gif";obj.alt="전체해제";}
var allItem;if(document.all){allItem=document.all["publicType"];}else{allItem=document.getElementsByName("publicType");}
for(var i=0;i<allItem.length;i++){chkValue=allItem[i].value;if(fword==chkValue.charAt(0))allItem[i].checked=bool;}}
function setOrder(obj){var series=document.searchForm.series;var sort=document.searchForm.sort;var imgs=getRefNm("sortImg");for(var i=0;i<imgs.length;i++){if(imgs[i].id==obj.id){sort.value=obj.id;if(series.value=="asc"){series.value="desc";}else{series.value="asc";}}else{imgs[i].src="/images/sort/"+imgs[i].id+"/off_asc.gif";}}
search('');}

//=============================================================================
//보고자찾기
//=============================================================================

var winSearchReporter = null;
var divSearchReporter = "ajaxSearchCik";
var urlSearchReporterL = "/reporter/main.ax";
var urlSearchReporterA = "/reporter/search.ax";
var formSearchReporter = "reporterForm";
var divSearchReporterL = "pstListContents";
var titleSearchReporter = "보고자 찾기";

function initSearchReporter() {
	$j(document.body).append(
			'<div id="' + divSearchReporter + '" class="x-hidden"></div>');
	winSearchReporter = xwindow.createWindow(titleSearchReporter, 530, 560, divSearchReporter);
}

function openSearchReporter() {
	var frm = findForm(formSearch);
	var srchfrm = findForm("searchForm");	
	xajax.initParameter();
	xajax.setTimeout(20000);
	xajax.blockUI = true;
	xajax.addParameterObj(frm.textReporterNm);
	xajax.addParameterObj(frm.textReporterCik);
	xajax.addParameterObj(srchfrm.textCrpCik);
	for(var i=0; i<srchfrm.gubun.length;i++){
		if(srchfrm.gubun[i].checked){
			xajax.addParameterObj(srchfrm.gubun[i]);
			break;
		}
	}
	xajax.blockTarget = "";
	xajax.simpleSend(urlSearchReporterL, function(html) {
		getRef(divSearchReporter).innerHTML = html;
		$j("tr[group='even']:odd").addClass("even");
		xwindow.show(winSearchReporter);
		clearSearchReporterIdx();
		setTimeout(function(){document.reporterForm.textReporterNm.focus();},100);
	});
}

function searchReporter(page) {
	var frm = findForm(formSearchReporter);

	if (page == null || page == "" || page == "null") {
		page = 1;
	}
	frm.currentPage.value = page;
	xajax.initParameter();
	xajax.blockTarget="";
	xajax.blockUI = true;
	xajax.sendForm(formSearchReporter, urlSearchReporterA, function(html) {
		getRef(divSearchReporterL).innerHTML = html;
		$j("tr[group='even']:odd").addClass("even");
	});
}

/**
* 알파벳으로 조회
*
* @param num
* @return
*/
function searchReporterByIdx(num) {
	var frm = findForm(formSearchReporter);
	frm.searchIndex.value = num;
	frm.textReporterNm.value = "";
	frm.textReporterCik.value = "";
	frm.currentPage.value = 1;

	xajax.blockUI = true;
	xajax.sendForm(formSearchReporter, urlSearchReporterA, function(html) {
		getRef(divSearchReporterL).innerHTML = html;
		$j("tr[group='even']:odd").addClass("even");
	});
}

function selectSearchReporter(str, str1) {
	var frm = findForm(formSearch);
	frm.textReporterNm.value = str;
	frm.textReporterCik.value = str1;

	xwindow.hide(winSearchReporter);
}

function clearSearchReporterIdx(){var frm=findForm(formSearchReporter);frm.searchIndex.value="";}
function clearSearchReporter(){var frm=findForm(formSearchReporter);frm.textReporterCik.value = "";frm.currentPage.value = 1;}
function searchReporterPressEnter(obj){if(event.keyCode==13){obj.blur();searchReporter(1);}}


function setOrder_ext004(obj){
	var series=document.searchForm.series;
	var sort=document.searchForm.sort;


	var imgs=getRefNm("sortImg");
	//alert("obj.id :>>> "+obj.id);
	for(var i=0;i<imgs.length;i++){
		//alert("imgs["+i+"].id :>>>> "+ imgs[i].id);
		if(imgs[i].id==obj.id){
			sort.value=obj.id;
			if(series.value=="asc"){
				series.value="desc";
			}else{
				series.value="asc";
			}
		}
	}// for

	search('');
}

function setOrder_ext005(obj){
	var series=document.searchForm.series;
	var sort=document.searchForm.sort;

	var series_sum=document.searchForm.series_sum;
	var sort_sum=document.searchForm.sort_sum;

	var imgs=getRefNm("sortImg");
	//alert("obj.id :>>> "+obj.id);
	for(var i=0;i<imgs.length;i++){
		//alert("imgs["+i+"].id :>>>> "+ imgs[i].id);
		if(imgs[i].id==obj.id){
			if(obj.id == "sum"){
				sort_sum.value=obj.id;
				if(series_sum.value=="asc"){
					series_sum.value="desc";
				}else{
					series_sum.value="asc";
				}
			}else {
				sort.value=obj.id;
				if(series.value=="asc"){
					series.value="desc";
				}else{
					series.value="asc";
				}
			}
		}
	}// for

	search('');
}

function setOrder_ext006(obj){
	var series=document.searchForm.series;
	var sort=document.searchForm.sort;

	var series_prsn=document.searchForm.series_prsn;
	var sort_prsn=document.searchForm.sort_prsn;

	var imgs=getRefNm("sortImg");
	//alert("obj.id :>>> "+obj.id);
	for(var i=0;i<imgs.length;i++){
		//alert("imgs["+i+"].id :>>>> "+ imgs[i].id);
		if(imgs[i].id==obj.id){
			if(obj.id == "prsn"){
				sort_prsn.value=obj.id;
				if(series_prsn.value=="asc"){
					series_prsn.value="desc";
				}else{
					series_prsn.value="asc";
				}
			}else {
				sort.value=obj.id;
				if(series.value=="asc"){
					series.value="desc";
				}else{
					series.value="asc";
				}
			}
		}
	}// for

	search('');
}


function hiddenDiv(name){getRef(name).style.display="none";}
function allChecks(obj,str){var chks=getRefNm(str);for(var i=0;i<chks.length;i++){chks[i].checked=obj.checked;}}
function oneCheck(obj,str){if(obj.checked==false&&getRef(str).checked==true){getRef(str).checked=false;}else if(obj.checked==true&&getRef(str).checked==false){var chks=getRefNm(obj.name);var j=0;for(var i=0;i<chks.length;i++){if(chks[i].checked==true)j++;}
if(chks.length==j)getRef(str).checked=true;}}
function getCurrentDateTime(){var d=new Date();var s=leadingZeros(d.getFullYear(),4)+'-'+
leadingZeros(d.getMonth()+1,2)+'-'+
leadingZeros(d.getDate(),2)+' '+
leadingZeros(d.getHours(),2)+':'+
leadingZeros(d.getMinutes(),2);return s;}
function leadingZeros(n,digits){var zero='';n=n.toString();if(n.length<digits){for(i=0;i<digits-n.length;i++)
zero+='0';}
return zero+n;}
function setCookie(name,value,day){var expdate=new Date();expdate.setTime(expdate.getTime()+1000*3600*24*day);document.cookie=name+"="+escape(value)+"; path=/; expires="+expdate.toGMTString();}
function getCookie(Name){var search=Name+"="
if(document.cookie.length>0){offset=document.cookie.indexOf(search)
if(offset!=-1){offset+=search.length
end=document.cookie.indexOf(";",offset)
if(end==-1)
end=document.cookie.length
return unescape(document.cookie.substring(offset,end))}}}

var winCorpInfo=null;var divCorpInfo="winCorpInfo";var urlCorpInfo="/dsae001/selectPopup.ax";var titleCoprInfo="기업개황정보";var widthCorpInfo=500;var heightCorpInfo=540;function initCorpInfo(){$j(document.body).append('<div id="'+divCorpInfo+'" class="x-hidden"></div>');winCorpInfo=xwindow.createWindow(titleCoprInfo,widthCorpInfo,heightCorpInfo,divCorpInfo,false,false);}
function openCorpInfo(key){destoryToolTip();xajax.initParameter();xajax.addParameter("selectKey",key);xajax.setTimeout(20000);xajax.blockUI=false;xajax.blockTarget="";xajax.simpleSend(urlCorpInfo,function(html){getRef(divCorpInfo).innerHTML=html;xwindow.show(winCorpInfo);corpclose();var x=document.body.scrollLeft+document.documentElement.scrollLeft;var y=document.body.scrollTop+document.documentElement.scrollTop;xwindow.setPosition(winCorpInfo,280,y+70);history(key);});}
function corpclose(){ setTimeout("corpcloseTime()",300);}
function corpcloseTime(){if(document.getElementById("fml_btn")){document.getElementById("fml_btn").focus();return;} else if(document.getElementById("ifm_btn")){document.getElementById("ifm_btn").focus();return;} else if(document.getElementById("ceo_btn")){document.getElementById("ceo_btn").focus();return;}else if(document.getElementById("homePage")){document.getElementById("homePage").focus();return;}else if(document.getElementById("irHome")){document.getElementById("irHome").focus();return;} document.getElementById("closePop").focus(); }
function closeCorpInfo(){destoryToolTip();xwindow.hide(winCorpInfo);}
function popSize(){var agt=navigator.userAgent.toLowerCase();if(agt.indexOf("firefox") != -1){widthCorpInfo = 537;heightCorpInfo = 660;}else if(agt.indexOf("msie 7") != -1){widthCorpInfo = 537;	heightCorpInfo = 615;	}else if(agt.indexOf("opera") != -1){widthCorpInfo = 537;heightCorpInfo = 615;}}

var urlCorpInfoSelect="/dsae001/select.ax";function openCorpInfo1(key){destoryToolTip();xajax.initParameter();xajax.addParameter("selectKey",key);xajax.setTimeout(20000);xajax.blockUI=false;xajax.blockTarget="";xajax.simpleSend(urlCorpInfoSelect,function(html){getRef(divCorpInfo).innerHTML=html;xwindow.show(winCorpInfo);corpclose();var x=document.body.scrollLeft+document.documentElement.scrollLeft;var y=document.body.scrollTop+document.documentElement.scrollTop;xwindow.setPosition(winCorpInfo,280,y+70);history(key)})}

var ifm_win;var ifm_btn;var fml_win;var fml_btn;
var ceo_btn;var ceo_win;function history(cik){destoryToolTip();if(getRef("fml_btn")!=null){fml_btn=Ext.get('fml_btn');fml_btn.on('click',function(){if(!fml_win){fml_win=new Ext.Window({title:'▒ 회사이름 변경내역 ▒',closable:true,width:250,height:150,plain:true,closeAction:'hide',autoscroll:true,autoLoad:{url:'/corp/historyFmlNm.ax?cik='+cik},resizable:false});}
setWinPosition(fml_win);fml_win.show(fml_btn);});}
if(getRef("ifm_btn")!=null){ifm_btn=Ext.get('ifm_btn');ifm_btn.on('click',function(){if(!ifm_win){ifm_win=new Ext.Window({title:'▒ 회사약식명 변경내역 ▒',closable:true,width:250,height:150,plain:true,closeAction:'hide',autoscroll:true,autoLoad:{url:'/corp/historyFmlNm.ax?cik='+cik},resizable:false});}
setWinPosition(ifm_win);ifm_win.show(ifm_btn);});}
if(getRef("ceo_btn")!=null){ceo_btn=Ext.get('ceo_btn');ceo_btn.on('click',function(){if(!ceo_win){ceo_win=new Ext.Window({title:'▒ 대표자명 변경내역 ▒',closable:true,width:260,height:150,plain:true,closeAction:'hide',plain:true,autoScroll:true,autoLoad:{url:'/corp/historyCeoNm.ax?cik='+cik},resizable:false});}
setWinPosition(ceo_win);ceo_win.show(ceo_btn);});}}
function setWinPosition(win) {//탭 버튼으로 선택후 엔터키 입력으로 히스토리 팝업 위치 기능 수정
	var e = this.event;if (!e)e = window.event;	var x = 0;	var y = 0;
	var targ;if(e.target)targ = e.target;else if(e.srcElement)targ=e.srcElement;
	if(targ.getBoundingClientRect){//버튼의 좌표 구하기.
		var targ = targ.getBoundingClientRect(); x = targ.left + (document.documentElement.scrollLeft || document.body.scrollLeft);y = targ.top + (document.documentElement.scrollTop || document.body.scrollTop);
	}else if (e.pageX || e.pageY){
		x = e.pageX;y = e.pageY;
	}else if(e.clientX||e.clientY){
		x=e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft;y=e.clientY+document.body.scrollTop+document.documentElement.scrollTop;
	}win.setPosition(x + 5, y + 5);
}
function destoryToolTip(){try{if(fml_win!=null){fml_win.close(fml_btn);fml_win=null;}
if(fml_btn!=null)fml_btn=null;}catch(e){}
try{if(ifm_win!=null){ifm_win.close(ifm_btn);ifm_win=null;}
if(ifm_btn!=null)ifm_btn=null;}catch(e){}
try{if(ceo_win!=null){ceo_win.close(ceo_btn);ceo_win=null;}
if(ceo_btn!=null)ceo_btn=null;}catch(e){}}
var winDelReason=null;var divDelReason="winDelReason";var urlDelReason="/dsac004/select.ax";function initDelReason(){$j(document.body).append('<div id="'+divDelReason+'" class="x-hidden"></div>');winDelReason=xwindow.createWindow("삭제상세사유",537,265,divDelReason);}
function openDelReason(rcpNo,dcmSeq){xajax.initParameter();xajax.addParameter("rcpNo",rcpNo);xajax.addParameter("dcmSeq",dcmSeq);xajax.blockUI=false;xajax.blockTarget="";xajax.simpleSend(urlDelReason,function(html){getRef(divDelReason).innerHTML=html;xwindow.show(winDelReason); setTimeout(function(){document.getElementById("closePop").focus();},300);});}
var winBodoDeatilPopup=null;var divBodoDetailPopup="divBodoDetailPopup";var urlBodoDetailPopup="/dsaa003/selectBodoMain.ax";
function initBodoDetailPopup(){$j(document.body).append('<div id="'+divBodoDetailPopup+'" class="x-hidden"></div>');winBodoDeatilPopup=xwindow.createWindow("보도자료 상세보기",537,470,divBodoDetailPopup);}
function openBodoDetailPopup(seqno){xajax.initParameter();xajax.addParameter("seqno",seqno);xajax.setTimeout(20000);xajax.blockUI=true;xajax.blockTarget="";xajax.simpleSend(urlBodoDetailPopup,function(html){winBodoDeatilPopup.setSize(537, 470);getRef(divBodoDetailPopup).innerHTML=html;xwindow.show(winBodoDeatilPopup);winBodoDeatilPopup.setSize(537, document.getElementById(divBodoDetailPopup).offsetHeight + 35);});}
var winGongsiDeatilPopup=null;var divGongsiDetailPopup="divGongsiDetailPopup";var urlGongsiDetailPopup="/dsaa003/selectGuideMain.ax";function initGongsiDetailPopup(){$j(document.body).append('<div id="'+divGongsiDetailPopup+'" class="x-hidden"></div>');winGongsiDeatilPopup=xwindow.createWindow("기업공시제도일반 상세보기",537,340,divGongsiDetailPopup);}
function openGongsiDetailPopup(seqno){xajax.initParameter();xajax.addParameter("seqno",seqno);xajax.setTimeout(20000);xajax.blockUI=true;xajax.blockTarget="";xajax.simpleSend(urlGongsiDetailPopup,function(html){winGongsiDeatilPopup.setSize(537, 340);getRef(divGongsiDetailPopup).innerHTML=html;xwindow.show(winGongsiDeatilPopup);});}
var winScheduleInfo=null;var divScheduleInfo="winScheduleInfo";var urlScheduleInfo="/dsah008/searchByYear.ax";function initScheduleInfo(){$j(document.body).append('<div id="'+divScheduleInfo+'" class="x-hidden"></div>');winScheduleInfo=xwindow.createWindow("정기보고서 제출기한",610,462,divScheduleInfo,false,true);}
function openScheduleInfo(year){xajax.initParameter();xajax.addParameter("year",year);xajax.setTimeout(20000);xajax.blockUI=true;xajax.blockTarget=divScheduleInfo;xajax.blockTarget="";xajax.simpleSend(urlScheduleInfo,function(html){getRef(divScheduleInfo).innerHTML=html;$j(".pop_table_s tr:nth-child(even)").addClass("even"); xwindow.show(winScheduleInfo);xwindow.setSize(winScheduleInfo,divScheduleInfo);setTimeout(function(){document.getElementById("popClose").focus();},300);});}

function getOpenSize(width,height){if(navigator.userAgent.indexOf("Firefox")>-1){height+=10}else if(navigator.userAgent.indexOf("Chrome")>-1){height+=15}else if(navigator.userAgent.indexOf("Safari")>-1){height-=80} return "width="+width+",height="+height}

/** publictype2.js*/
var publicTypeStatusNo = ["", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10"];var publicTypeStatusOn = [false, false, false, false, false, false, false, false, false, false, false];var publicTypeStatusCheck = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; var publicTypeCode = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];var publicTypeImageUrl1 = "/images/btn/small_btn";var publicTypeImageId = "publicTypeButton_";var publicTypeOptionDiv = "divPublicType_";var publicTypeConatiner = "publicTypeDiv";var publicTypeContainerButton = "openPublicTP";var allItem ;
function getPublicType() {if (document.all) {	   allItem = document.all["publicType"];	} else {   allItem = document.getElementsByName("publicType");}}
function initPublicTypeCount() {getPublicType() ;for(var i=1; i<=10; i++) {publicTypeStatusCheck[i] = getCountPublicTypeChecked(i);changePublicTypeButton(i);	initEvent(i);}}
function initEvent(Idx){		var no = publicTypeStatusNo[Idx];    $j('#ptb_close'+no).click(function(){		publicTypeStatusOn[Idx] = false;		changePublicTypeButton(Idx);		$j("#" + publicTypeOptionDiv +no).hide();		$j('#publicTypeButton_'+no).focus();  	return false;    }).keyup(function(event){  		if (event.which == 13) {			publicTypeStatusOn[Idx] = false;			changePublicTypeButton(Idx);			$j("#" + publicTypeOptionDiv +no).hide();$j('#publicTypeButton_'+no).focus();}return false;	});	}
function keydownPublicTypeButton(id, target){	$j('#'+id).keydown(function(event){ if (event.which == 9) {	$j('#'+target).focus();		event.preventDefault();		}	});}
function checkPublicTypeStatus(){	for(var i=1; i<=10; i++) {		if(publicTypeStatusCheck[i]>0) return true;	}	return false;}
function clickPublicTypeButton(n) {	publicTypeStatusOn[n] = !publicTypeStatusOn[n];	changePublicTypeButton(n);	if (publicTypeStatusOn[n]) {	$j("#" + publicTypeOptionDiv + publicTypeStatusNo[n]).show();	showPublicTypeContainer();	} else {		$j("#" + publicTypeOptionDiv + publicTypeStatusNo[n]).hide();	}}
function changePublicTypeButton(n,objName) {var no = publicTypeStatusNo[n];	var objImg = getRef(publicTypeImageId + no);	var src = publicTypeImageUrl1 + no;	if(publicTypeStatusCheck[n]>0){		src+="_c";	}else{		src+="_";			}	if(publicTypeStatusOn[n]){ 		src+="on";	}else{		src+="off";	}	src += ".gif";		if(objName != "choice_all"){		objImg.src = src;	}}
function clickPublicTypeCheck(obj, n) {	if (obj.checked) {publicTypeStatusCheck[n] += 1;	} else {publicTypeStatusCheck[n] -= 1;	}	changePublicTypeButton(n);}
function clickPublicTypeAll(obj, n){var tf;	var objName= obj.name;	if (obj.alt == "전체해제") {	obj.src = "/images/btn/total_choice.gif";obj.alt = "전체선택";	tf = false;	} else {obj.src = "/images/btn/total_clear.gif";
obj.alt = "전체해제";tf = true;	}	var cnt = 0;	var code = publicTypeCode[n] ;	for(var i=0; i < allItem.length; i++){	chkValue = allItem[i].value;if(code == chkValue.charAt(0)) {allItem[i].checked = tf;cnt++;	}	}	if (tf) {publicTypeStatusCheck[n] = cnt;	} else {publicTypeStatusCheck[n] = 0;}changePublicTypeButton(n,objName);}
function getCountPublicTypeChecked(n) {	var cnt = 0;	for(var i=0; i < allItem.length; i++){		chkValue = allItem[i].value;		if(publicTypeCode[n] == chkValue.charAt(0) && allItem[i].checked) {		cnt++;	}	}	return cnt;}
function checkPublicTypeByValue(value, tf, n) {	var form = obj.form;	var arrayTarget = $j(form).find(":checkbox[value='" + value + "']");	for(var i=0; i<arrayTarget.length; i++) {clickPublicTypeCheck(arrayTarget[i], n);arrayTarget[i].checked = tf;	}}
function openPublicTpAll(obj){	if(obj.src.indexOf("/images/icon_option_open.gif") > 1 ) {		showPublicTypeContainer();	} else if(obj.src.indexOf("/images/icon_option_close.gif") > 1) {		hidePublicTypeContainer();	}}
function showPublicTypeContainer() {for(var i=1; i<=10; i++) {	if(publicTypeStatusOn[i]){$j("#" + publicTypeOptionDiv + publicTypeStatusNo[i]).show(); 		}	}	$j("#"+ publicTypeContainerButton).attr("src", "/images/icon_option_close.gif");}
function hidePublicTypeContainer() {for(var i=1; i<=10; i++) {$j("#" + publicTypeOptionDiv + publicTypeStatusNo[i]).hide(); 	}	$j("#"+ publicTypeContainerButton).attr("src", "/images/icon_option_open.gif");}
function clickPublicFundTypeCheck(obj, n) {	if (obj.checked) {publicTypeStatusCheck[n] += 1;	} else {		publicTypeStatusCheck[n] -= 1;	}}
//end publictype2.js
var HtmlSelect={setSelectedIndexByValue:function(obj,value,caseSensitive){for(var i=0;i<obj.length;i++){if(caseSensitive){if(obj.options[i].value==value){obj.selectedIndex=i;return;}}else{if(obj.options[i].value.toLowerCase()==value.toLowerCase()){obj.selectedIndex=i;return;}}}},setSelectedIndexByText:function(obj,value,caseSensitive){for(var i=0;i<obj.length;i++){if(caseSensitive){if(obj.options[i].text==value){obj.selectedIndex=i;return;}}else{if(obj.options[i].text.toLowerCase()==value.toLowerCase()){obj.selectedIndex=i;return;}}}},getSelectedText:function(obj){return obj.options[obj.selectedIndex].text;},containedValue:function(obj,value,caseSensitive){for(var i=0;i<obj.length;i++){if(caseSensitive){if(obj.options[i].value==value){return true;}}else{if(obj.options[i].value.toLowerCase()==value.toLowerCase()){return true;}}}
return false;},addOption:function(selectbox,text,value){var optn=document.createElement("OPTION");optn.text=text;optn.value=value;selectbox.options.add(optn);}};

function addEvent(obj,event_name,func_name){if(obj.attachEvent){obj.attachEvent("on"+event_name,func_name);}else if(obj.addEventListener){obj.addEventListener(event_name,func_name,true);}else{obj["on"+event_name]=func_name;}}
function removeEvent(obj,event_name,func_name){if(obj.detachEvent){obj.detachEvent("on"+event_name,func_name);}else if(obj.removeEventListener){obj.removeEventListener(event_name,func_name,true);}else{obj["on"+event_name]=null;}}
function stopEvent(evt){if(evt.stopPropagation){evt.stopPropagation();evt.preventDefault();}else if(typeof evt.cancelBubble!="undefined"){evt.cancelBubble=true;evt.returnValue=false;}
return false;}
function getElement(evt){if(window.event){return window.event.srcElement;}else{return evt.currentTarget;}}
function getTargetElement(evt){if(window.event){return window.event.srcElement;}else{return evt.target;}}
function stopSelect(obj){if(typeof obj.onselectstart!='undefined'){addEvent(obj,"selectstart",function(){return false;});}}
function getCaretEnd(obj){if(typeof obj.selectionEnd!="undefined"){return obj.selectionEnd;}else if(document.selection&&document.selection.createRange){var M=document.selection.createRange();try{var Lp=M.duplicate();Lp.moveToElementText(obj);}catch(e){var Lp=obj.createTextRange();}
Lp.setEndPoint("EndToEnd",M);var rb=Lp.text.length;if(rb>obj.value.length){return-1;}
return rb;}}
function getCaretStart(obj){if(typeof obj.selectionStart!="undefined"){return obj.selectionStart;}else if(document.selection&&document.selection.createRange){var M=document.selection.createRange();try{var Lp=M.duplicate();Lp.moveToElementText(obj);}catch(e){var Lp=obj.createTextRange();}
Lp.setEndPoint("EndToStart",M);var rb=Lp.text.length;if(rb>obj.value.length){return-1;}
return rb;}}
function setCaret(obj,l){obj.focus();if(obj.setSelectionRange){obj.setSelectionRange(l,l);}else if(obj.createTextRange){m=obj.createTextRange();m.moveStart('character',l);m.collapse();m.select();}}
function setSelection(obj,s,e){obj.focus();if(obj.setSelectionRange){obj.setSelectionRange(s,e);}else if(obj.createTextRange){m=obj.createTextRange();m.moveStart('character',s);m.moveEnd('character',e);m.select();}}
String.prototype.addslashes=function(){return this.replace(/(["\\\.\|\[\]\^\*\+\?\$\(\)])/g,'\\$1');}
String.prototype.trim=function(){return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/,"$1");};function curTop(obj){toreturn=0;while(obj){toreturn+=obj.offsetTop;obj=obj.offsetParent;}
return toreturn;}
function curLeft(obj){toreturn=0;while(obj){toreturn+=obj.offsetLeft;obj=obj.offsetParent;}
return toreturn;}
function isNumber(a){return typeof a=='number'&&isFinite(a);}
function replaceHTML(obj,text){while(el=obj.childNodes[0]){obj.removeChild(el);};obj.appendChild(document.createTextNode(text));}

function actb(obj,ca){var objName=obj.name;$j("#"+objName).attr("autocomplete","off");this.actb_timeOut=-1;this.actb_lim=4;this.actb_firstText=false;this.actb_mouse=true;this.actb_delimiter=new Array('/');this.actb_startcheck=1;this.actb_bgColor='silver';this.actb_textColor='white';this.actb_hColor='gray';this.actb_fFamily='Verdana';this.actb_fSize='12px';this.actb_padding='2px';this.actb_hStyle='text-decoration:underline;font-weight="bold"';this.actb_width=$j("#"+objName).outerWidth()+"px";var actb_delimwords=new Array();var actb_cdelimword=0;var actb_delimchar=new Array();var actb_display=false;var actb_pos=0;var actb_total=0;var actb_curr=null;var actb_rangeu=0;var actb_ranged=0;var actb_bool=new Array();var actb_pre=0;var actb_toid;var actb_tomake=false;var actb_getpre="";var actb_mouse_on_list=1;var actb_kwcount=0;var actb_caretmove=false;this.actb_keywords=new Array();var actb_widthIframe="100px";this.actb_keywords=ca;this.actb_previousKeyword=null;this.actb_previousKeyword2=null;var actb_self=this;var isFirst=false;actb_curr=obj;var cnt=0;var actb_timer;addEvent(actb_curr,"focus",actb_setup);function actb_setup(){addEvent(document,"keyup",actb_checkkey);addEvent(actb_curr,"blur",actb_clear);addEvent(document,"keypress",actb_keypress);$j(window).resize(function(event){actb_position()});actb_setTimer()}function actb_keycheck(){var val=actb_curr.value;if(val.trim().length==0){actb_curr.value="";actb_previousKeyword="";actb_setTimer();return}cnt++;actb_checkkey()}function actb_setTimer(){if(navigator.userAgent.match(/Firefox|Opera/)!=null){actb_previousKeyword2=actb_previousKeyword;actb_timer=setTimeout(actb_keycheck,0)}}function actb_clearTimer(){if(navigator.userAgent.match(/Firefox|Opera/)!=null){if(actb_timer)clearTimeout(actb_timer)}}function actb_checkkey(evt){if(!evt)evt=event;if(navigator.userAgent.match(/Firefox|Opera/)==null){a=evt.keyCode}else{if(evt==undefined){a=0}else{a=evt.keyCode}}actb_clearTimer();caret_pos_start=getCaretStart(actb_curr);actb_caretmove=0;switch(a){case 38:actb_goup();actb_caretmove=1;actb_penter2();return false;break;case 40:actb_godown();actb_caretmove=1;actb_penter2();return false;break;case 13:if(actb_display){actb_caretmove=1;actb_penter();try{if(a==13)search()}catch(e){}return false}else{try{if(a==13)search()}catch(e){}return true}break;default:removeEvent(actb_curr,"keyup",actb_enter);isFirst=true;if((actb_previousKeyword==null||actb_previousKeyword!=actb_curr.value)&&actb_curr.value!=""&&actb_curr.value.length>=2){var v=obj.value;$j.getScript(actbUrl[obj.name]+"?"+obj.name+"="+encodeURIComponent(v),function(){actb_tocomplete(a)});actb_previousKeyword=v}actb_setTimer();break}}function actb_keywordCheck(){if(navigator.userAgent.match(/Firefox|Opera/)!=null){if(actb_timer)clearTimeout(actb_timer)}}function actb_position(){setTimeout(function(){$j("#tat_table").offset({left:$j("#"+objName).offset().left});},15);}function actb_clear(evt){if(!evt)evt=event;removeEvent(document,"keyup",actb_checkkey);removeEvent(actb_curr,"blur",actb_clear);removeEvent(document,"keypress",actb_keypress);actb_clearTimer();actb_removedisp()}function actb_parse(n){if(actb_self.actb_delimiter.length>0){var t=actb_delimwords[actb_cdelimword].trim().addslashes();var plen=actb_delimwords[actb_cdelimword].trim().length}else{var t=actb_curr.value.addslashes();var plen=actb_curr.value.length}var tobuild='';var i;if(actb_self.actb_firstText){var re=new RegExp("^"+t,"i")}else{var re=new RegExp(t,"i")}var p=n.search(re);for(i=0;i<p;i++){tobuild+=n.substr(i,1)}tobuild+="<font style='"+(actb_self.actb_hStyle)+"'>";for(i=p;i<plen+p;i++){tobuild+=n.substr(i,1)}tobuild+="</font>";for(i=plen+p;i<n.length;i++){tobuild+=n.substr(i,1)}tobuild=tobuild.replace("&","&amp;");return tobuild;}function actb_generate(){if(document.getElementById('tat_table')){actb_display=false;document.body.removeChild(document.getElementById('tat_table'))}if(actb_kwcount==0){actb_display=false;return}a=document.createElement('table');a.cellSpacing='1px';a.cellPadding='2px';a.style.position='absolute';a.style.top=$j("#"+objName).offset().top+$j("#"+objName).outerHeight()+4+"px";a.style.left=$j("#"+objName).offset().left+"px";a.style.backgroundColor=actb_self.actb_bgColor;a.style.width=actb_width;a.style.zIndex="100";a.id='tat_table';document.body.appendChild(a);var i;var first=true;var j=1;if(actb_self.actb_mouse){a.onmouseout=actb_table_unfocus;a.onmouseover=actb_table_focus}var counter=0;for(i=0;i<actb_self.actb_keywords.length;i++){if(actb_bool[i]){counter++;r=a.insertRow(-1);if(first&&!actb_tomake){r.style.backgroundColor=actb_self.actb_hColor;first=false;actb_pos=counter}else if(actb_pre==i){r.style.backgroundColor=actb_self.actb_hColor;first=false;actb_pos=counter}else{r.style.backgroundColor=actb_self.actb_bgColor}r.id='tat_tr'+(j);c=r.insertCell(-1);c.style.color=actb_self.actb_textColor;c.style.fontFamily=actb_self.actb_fFamily;c.style.fontSize=actb_self.actb_fSize;c.style.padding=actb_self.actb_padding;c.innerHTML=actb_parse(actb_self.actb_keywords[i]);c.id='tat_td'+(j);c.setAttribute('pos',j);if(actb_self.actb_mouse){c.style.cursor='pointer';c.onclick=actb_mouseclick;c.onmouseover=actb_table_highlight}j++}if(j-1==actb_self.actb_lim&&j<actb_total){r=a.insertRow(-1);r.style.backgroundColor=actb_self.actb_bgColor;c=r.insertCell(-1);c.style.color=actb_self.actb_textColor;c.style.fontFamily='arial narrow';c.style.fontSize=actb_self.actb_fSize;c.align='center';replaceHTML(c,'▼');if(actb_self.actb_mouse){c.style.cursor='pointer';c.onclick=actb_mouse_down}break}}actb_rangeu=1;actb_ranged=j-1;actb_display=true;if(actb_pos<=0)actb_pos=1}function actb_remake(){if(document.getElementById('tat_table')){document.body.removeChild(document.getElementById('tat_table'))}a=document.createElement('table');a.cellSpacing='1px';a.cellPadding='2px';a.style.position='absolute';a.style.top=$j("#"+objName).offset().top+$j("#"+objName).outerHeight()+4+"px";a.style.left=$j("#"+objName).offset().left+"px";a.style.backgroundColor=actb_self.actb_bgColor;a.id='tat_table';a.style.width=actb_width;a.style.zIndex="100";if(actb_self.actb_mouse){a.onmouseout=actb_table_unfocus;a.onmouseover=actb_table_focus}document.body.appendChild(a);var i;var first=true;var j=1;if(actb_rangeu>1){r=a.insertRow(-1);r.style.backgroundColor=actb_self.actb_bgColor;c=r.insertCell(-1);c.style.color=actb_self.actb_textColor;c.style.fontFamily='arial narrow';c.style.fontSize=actb_self.actb_fSize;c.align='center';replaceHTML(c,'▲');if(actb_self.actb_mouse){c.style.cursor='pointer';c.onclick=actb_mouse_up}}for(i=0;i<actb_self.actb_keywords.length;i++){if(actb_bool[i]){if(j>=actb_rangeu&&j<=actb_ranged){r=a.insertRow(-1);r.style.backgroundColor=actb_self.actb_bgColor;r.id='tat_tr'+(j);c=r.insertCell(-1);c.style.color=actb_self.actb_textColor;c.style.fontFamily=actb_self.actb_fFamily;c.style.fontSize=actb_self.actb_fSize;c.style.padding=actb_self.actb_padding;c.innerHTML=actb_parse(actb_self.actb_keywords[i]);c.id='tat_td'+(j);c.setAttribute('pos',j);if(actb_self.actb_mouse){c.style.cursor='pointer';c.onclick=actb_mouseclick;c.onmouseover=actb_table_highlight}j++}else{j++}}if(j>actb_ranged)break}if(j-1<actb_total){r=a.insertRow(-1);r.style.backgroundColor=actb_self.actb_bgColor;c=r.insertCell(-1);c.style.color=actb_self.actb_textColor;c.style.fontFamily='arial narrow';c.style.fontSize=actb_self.actb_fSize;c.align='center';replaceHTML(c,'▼');if(actb_self.actb_mouse){c.style.cursor='pointer';c.onclick=actb_mouse_down}}}function actb_goup(){if(!actb_display)return;if(actb_pos==1)return;document.getElementById('tat_tr'+actb_pos).style.backgroundColor=actb_self.actb_bgColor;actb_pos--;if(actb_pos<actb_rangeu)actb_moveup();document.getElementById('tat_tr'+actb_pos).style.backgroundColor=actb_self.actb_hColor;if(actb_toid)clearTimeout(actb_toid);if(actb_self.actb_timeOut>0)actb_toid=setTimeout(function(){actb_mouse_on_list=0;actb_removedisp()},actb_self.actb_timeOut)}function actb_godown(){if(!actb_display)return;if(actb_pos==actb_total)return;document.getElementById('tat_tr'+actb_pos).style.backgroundColor=actb_self.actb_bgColor;if(isFirst){isFirst = false;}else{actb_pos++;}if(actb_pos>actb_ranged)actb_movedown();document.getElementById('tat_tr'+actb_pos).style.backgroundColor=actb_self.actb_hColor;if(actb_toid)clearTimeout(actb_toid);if(actb_self.actb_timeOut>0)actb_toid=setTimeout(function(){actb_mouse_on_list=0;actb_removedisp()},actb_self.actb_timeOut)}function actb_movedown(){actb_rangeu++;actb_ranged++;actb_remake()}function actb_moveup(){actb_rangeu--;actb_ranged--;actb_remake()}function actb_mouse_down(){document.getElementById('tat_tr'+actb_pos).style.backgroundColor=actb_self.actb_bgColor;actb_pos++;actb_movedown();document.getElementById('tat_tr'+actb_pos).style.backgroundColor=actb_self.actb_hColor;actb_curr.focus();actb_mouse_on_list=0;if(actb_toid)clearTimeout(actb_toid);if(actb_self.actb_timeOut>0)actb_toid=setTimeout(function(){actb_mouse_on_list=0;actb_removedisp()},actb_self.actb_timeOut)}function actb_mouse_up(evt){if(!evt)evt=event;if(evt.stopPropagation){evt.stopPropagation()}else{evt.cancelBubble=true}document.getElementById('tat_tr'+actb_pos).style.backgroundColor=actb_self.actb_bgColor;actb_pos--;actb_moveup();document.getElementById('tat_tr'+actb_pos).style.backgroundColor=actb_self.actb_hColor;actb_curr.focus();actb_mouse_on_list=0;if(actb_toid)clearTimeout(actb_toid);if(actb_self.actb_timeOut>0)actb_toid=setTimeout(function(){actb_mouse_on_list=0;actb_removedisp()},actb_self.actb_timeOut)}function actb_mouseclick(evt){if(!evt)evt=event;if(!actb_display)return;actb_mouse_on_list=0;actb_pos=this.getAttribute('pos');actb_penter()}function actb_table_focus(){actb_mouse_on_list=1}function actb_table_unfocus(){actb_mouse_on_list=0;if(actb_toid)clearTimeout(actb_toid);if(actb_self.actb_timeOut>0)actb_toid=setTimeout(function(){actb_mouse_on_list=0;actb_removedisp()},actb_self.actb_timeOut)}function actb_table_highlight(){actb_mouse_on_list=1;document.getElementById('tat_tr'+actb_pos).style.backgroundColor=actb_self.actb_bgColor;actb_pos=this.getAttribute('pos');while(actb_pos<actb_rangeu)actb_moveup();while(actb_pos>actb_ranged)actb_movedown();document.getElementById('tat_tr'+actb_pos).style.backgroundColor=actb_self.actb_hColor;if(actb_toid)clearTimeout(actb_toid);if(actb_self.actb_timeOut>0)actb_toid=setTimeout(function(){actb_mouse_on_list=0;actb_removedisp()},actb_self.actb_timeOut)}function actb_insertword(a){if(actb_self.actb_delimiter.length>0){str='';l=0;for(i=0;i<actb_delimwords.length;i++){if(actb_cdelimword==i){prespace=postspace='';gotbreak=false;for(j=0;j<actb_delimwords[i].length;++j){if(actb_delimwords[i].charAt(j)!=' '){gotbreak=true;break}prespace+=' '}for(j=actb_delimwords[i].length-1;j>=0;--j){if(actb_delimwords[i].charAt(j)!=' ')break;postspace+=' '}postspace='';str+=prespace;str+=a;l=str.length;if(gotbreak)str+=postspace}else{str+=actb_delimwords[i]}if(i!=actb_delimwords.length-1){str+=actb_delimchar[i]}}actb_curr.value=str.unescapeHTML();setCaret(actb_curr,l)}else{actb_curr.value=a}actb_mouse_on_list=0;actb_removedisp()}function actb_insertword2(a){if(actb_self.actb_delimiter.length>0){str='';l=0;for(i=0;i<actb_delimwords.length;i++){if(actb_cdelimword==i){prespace=postspace='';gotbreak=false;for(j=0;j<actb_delimwords[i].length;++j){if(actb_delimwords[i].charAt(j)!=' '){gotbreak=true;break}prespace+=' '}for(j=actb_delimwords[i].length-1;j>=0;--j){if(actb_delimwords[i].charAt(j)!=' ')break;postspace+=' '}postspace='';str+=prespace;str+=a;l=str.length;if(gotbreak)str+=postspace}else{str+=actb_delimwords[i]}if(i!=actb_delimwords.length-1){str+=actb_delimchar[i]}}actb_curr.value=str.unescapeHTML();setCaret(actb_curr,l)}else{actb_curr.value=a}}function actb_penter(){if(!actb_display)return;actb_display=false;var word='';var c=0;for(var i=0;i<=actb_self.actb_keywords.length;i++){if(actb_bool[i])c++;if(c==actb_pos){word=actb_self.actb_keywords[i];break}}actb_insertword(word);l=getCaretStart(actb_curr)}function actb_penter2(){if(!actb_display)return;var word='';var c=0;for(var i=0;i<=actb_self.actb_keywords.length;i++){if(actb_bool[i])c++;if(c==actb_pos){word=actb_self.actb_keywords[i];break}}actb_insertword2(word);l=getCaretStart(actb_curr)}function actb_removedisp(){if(actb_mouse_on_list==0){actb_removeIframe();actb_display=0;if(document.getElementById('tat_table')){document.body.removeChild(document.getElementById('tat_table'))}if(actb_toid)clearTimeout(actb_toid)}}function actb_keypress(e){if(actb_caretmove)stopEvent(e);return!actb_caretmove}function actb_tocomplete(kc){if(autoCompleteReceivedKeyword!=actb_curr.value.toUpperCase())return;if(kc==38||kc==40||kc==13)return;var i;if(actb_display){var word=0;var c=0;for(var i=0;i<=actb_self.actb_keywords.length;i++){if(actb_bool[i])c++;if(c==actb_pos){word=i;break}}actb_pre=word}else{actb_pre=-1};if(actb_curr.value==''){actb_mouse_on_list=0;actb_removedisp();return}if(actb_self.actb_delimiter.length>0){caret_pos_start=getCaretStart(actb_curr);caret_pos_end=getCaretEnd(actb_curr);delim_split='';for(i=0;i<actb_self.actb_delimiter.length;i++){delim_split+=actb_self.actb_delimiter[i]}delim_split=delim_split.addslashes();delim_split_rx=new RegExp("(["+delim_split+"])");c=0;actb_delimwords=new Array();actb_delimwords[0]='';for(i=0,j=actb_curr.value.length;i<actb_curr.value.length;i++,j--){if(actb_curr.value.substr(i,j).search(delim_split_rx)==0){ma=actb_curr.value.substr(i,j).match(delim_split_rx);actb_delimchar[c]=ma[1];c++;actb_delimwords[c]=''}else{actb_delimwords[c]+=actb_curr.value.charAt(i)}}var l=0;actb_cdelimword=-1;for(i=0;i<actb_delimwords.length;i++){if(caret_pos_end>=l&&caret_pos_end<=l+actb_delimwords[i].length){actb_cdelimword=i}l+=actb_delimwords[i].length+1}if(actb_cdelimword){return}var ot=actb_delimwords[actb_cdelimword].trim();var t=actb_delimwords[actb_cdelimword].addslashes().trim()}else{var ot=actb_curr.value;var t=actb_curr.value.addslashes()}if(ot.length==0){actb_mouse_on_list=0;actb_removedisp()}if(ot.length<actb_self.actb_startcheck)return this;if(actb_self.actb_firstText){var re=new RegExp("^"+t,"i")}else{var re=new RegExp(t,"i")}actb_total=0;actb_tomake=false;actb_kwcount=0;for(i=0;i<actb_self.actb_keywords.length;i++){actb_bool[i]=false;if(re.test(actb_self.actb_keywords[i])){actb_total++;actb_bool[i]=true;actb_kwcount++;if(actb_pre==i)actb_tomake=true}}if(actb_toid)clearTimeout(actb_toid);if(actb_self.actb_timeOut>0)actb_toid=setTimeout(function(){actb_mouse_on_list=0;actb_removedisp()},actb_self.actb_timeOut);actb_generate()}function actb_addIframe(left,top,width){if(!document.getElementById("tat_iframe")){$j("<iframe id='tat_iframe' border='0'></iframe>").css("position","absolute").css("left",left).css("top",top).css("width",width).css("height","300px").css("z-index","90").css("filter","alpha(opacity=0)").appendTo("body")}removeEvent(actb_curr,"keyup",actb_enter)}function actb_removeIframe(){if(document.getElementById("tat_iframe")){$j("#tat_iframe").remove()}addEvent(actb_curr,"keyup",actb_enter)}function actb_enter(evt){if(!evt)evt=event;a=evt.keyCode;if(a==13){try{search()}catch(e){}}}return this}

if(navigator.userAgent.indexOf('Firefox')>=0){(function(){var events=["mousedown","mouseover","mouseout","mousemove","mousedrag","click","dblclick","onkeyup","onkeypress","onkeydown"];for(var i=0;i<events.length;i++){window.addEventListener(events[i],function(e){window.event=e;},true);}}());};var isDOM=(document.getElementById?true:false);var isIE4=((document.all&&!isDOM)?true:false);var isNS4=(document.layers?true:false);var isNS=navigator.appName=="Netscape";function findForm(name){return document.forms[name];}
function getRef(id){if(isDOM)return document.getElementById(id);if(isIE4)return document.all[id];if(isNS4)return document.layers[id];}
function getRefNm(name){if(isDOM)return document.getElementsByName(name);if(isIE4)return document.all[name];if(isNS4)return document.layers[name];}
function getOpenerRef(id){if(isDOM)return window.opener.document.getElementById(id);if(isIE4)return opener.document.all[id];if(isNS4)return opener.document.layers[id];}
function getOpenerRefNm(name){if(isDOM)return window.opener.document.getElementsByName(name);if(isIE4)return opener.document.all[name];if(isNS4)return opener.document.layers[name];}
function findElementInForm(obj,name){frm=findForm(obj);for(var i=0;i<frm.length;i++){var ele=frm[i];if(ele.getAttribute("name")==name||ele.name==name){return ele;}}
return null;}
function ShowMessage(msg,args){var delim="^";var msgs=msg.split(delim);var params=args.split(delim);var message="";for(var i=0;i<msgs.length;i++){message+=msgs[i];if(params.length<=i)continue;message+=params[i];var j=i+1;if(msgs.length<=j)continue;if(!(/^.{1}\(.{1}\)/).test(msgs[j]))continue;var bStr=msgs[j].substring(0,4);var eStr=msgs[j].substring(4);var ch=params[i].charCodeAt(params[i].length-1);if((ch-44032)%28>0)msgs[j]=bStr.charAt(0)+eStr;else msgs[j]=bStr.charAt(2)+eStr;}
alert(message);}
String.prototype.trim=function()
{return this.replace(/(^\s*)|(\s*$)/gi,"");}
function chkObjMessage(obj,msg){if(obj.value==""){alert(msg);obj.focus();return false;}
return true;}
var deny_char='! % = \" \' -- < > |';function onlyEng(CrpNm){var deny_pattern=/[!%=\"\'<>|]/;var flag=false
if(CrpNm.indexOf('--')>=0){flag=true}else if(deny_pattern.test(CrpNm)){flag=true}
return flag}
/** search.js*/
var formSearch="searchForm";var isKor = false;
function nextFocus(id){setTimeout(function(){$j('#'+id).focus();},100);}
var winSearchCorp=null;var divSearchCorp="divSearchCorpWin";var txtSearchCorp="textCrpNm";var txtSearchCik="textCrpCik";var formSearchCorp="corpSearchForm";var urlSearchCorpL="/corp/searchCorpL.ax";var urlSearchCorpA="/corp/searchCorp.ax";var divSearchCorpL="corpListContents";var chkSearchCorp="checkCorpSelect";var defaultSearchCrop="회사명 또는 종목코드를 입력하세요";var titleSearchCorp="회사명 찾기";var widthSearchCorp=538;var heightSearchCorp=595;var errMsgSearchCorp="선택된 회사명이 없습니다";var errMsgNotice="주의!";var singleChoice="N";function initSearchCorp(){$j(document.body).append('<div id="'+divSearchCorp+'" class="x-hidden"></div>');winSearchCorp=xwindow.createWindow(titleSearchCorp,widthSearchCorp,heightSearchCorp,divSearchCorp);var frm=findForm(formSearch);if(!frm[txtSearchCorp].value){frm[txtSearchCorp].value=defaultSearchCrop;}}
function openSearchCorpWindow(){singleChoice="N";var frm=findForm(formSearch);if(frm.textCrpNm.value.split("/").length>10){alert("회사명은 동시에 최대 10개까지 조회 가능합니다.");frm.textCrpNm.select();return;}clearSearchCorpText();xajax.initParameter();xajax.addParameterObj(frm.textCrpNm);xajax.setTimeout(20000);xajax.blockUI=true;xajax.blockTarget="";xajax.simpleSend(urlSearchCorpA,function(html){getRef(divSearchCorp).innerHTML=html;xwindow.show(winSearchCorp);xwindow.syncSize(winSearchCorp);setTimeout(function(){document.corpSearchForm.textCrpNm.focus();},100);});blurSearchCorp();}
function openSearchCorpWindow_singleChoice(){singleChoice="Y";var frm=findForm(formSearch);clearSearchCorpText();xajax.initParameter();xajax.addParameter("singleChoice",singleChoice);xajax.addParameterObj(frm.textCrpNm);xajax.setTimeout(20000);xajax.blockUI=true;xajax.blockTarget="";xajax.simpleSend(urlSearchCorpA,function(html){getRef(divSearchCorp).innerHTML=html;xwindow.show(winSearchCorp);});blurSearchCorp();}
function searchCorp(page){var frm=findForm(formSearchCorp);if(frm.textCrpNm.value == "" && frm.searchIndex.value == ""){alert("회사명을 입력해 주세요.");return false;}if(page==null||page==""||page=="null"){page=1;}
frm.currentPage.value=page;xajax.initParameter();xajax.addParameterObj(frm.textCrpNm);xajax.blockUI=true;xajax.blockTarget="";xajax.sendForm(formSearchCorp,urlSearchCorpL,function(str){getRef(divSearchCorpL).innerHTML=str;$j("tr:nth-child(even)").addClass("even");});}
function searchCorpByIdx(num){var frm=findForm(formSearchCorp);frm.searchIndex.value=num;frm.textCrpNm.value="";searchCorp();}
function selectSearchCorp(){var frm=findForm(formSearchCorp);var ciks=getRefNm("hiddenCikCD1");var chks=getRefNm(chkSearchCorp);var strCiks="";var strChks="";for(var i=0;i<chks.length;i++){if(chks[i].checked==true){strCiks+=ciks[i].value+" ";strChks+=chks[i].value+"/";}}
findElementInForm(formSearch,txtSearchCik).value=strCiks.substr(0,strCiks.length-1);findElementInForm(formSearch,txtSearchCorp).value=strChks.substr(0,strChks.length-1);if(strCiks==""){xmsgbox.alert("안내!",errMsgSearchCorp);return;}else{xwindow.hide(winSearchCorp);frm.searchIndex.value="";if(isKor)search(1);}}
function clearSearchCorpText(){var obj=findElementInForm(formSearch,txtSearchCorp);if(obj.value==defaultSearchCrop){obj.value="";findElementInForm(formSearch,txtSearchCik).value="";}}
function clearSearchCorpCik(){ findElementInForm(formSearch,txtSearchCik).value="";}
function clearSearchCorpIdx(){var frm=findForm(formSearchCorp);frm.searchIndex.value="";}
function blurSearchCorp(){var frm=findForm(formSearch);if(!frm[txtSearchCorp].value){frm[txtSearchCorp].value=defaultSearchCrop;}}
function focusSearchCorp(){clearSearchCorpText();}
function validateSearchCorp(obj,id,name,value){var frm=findForm(formSearch);clearSearchCorpText();if(getRef("typesOfBusiness")!=null&&getRef("typesOfBusiness").value!="all"){if(frm[txtSearchCorp].value){obj.err="업종선택시 회사명을 입력할 수 없습니다";frm[txtSearchCorp].value="회사명 또는 종목코드를 입력하세요";return false;}else{return true;}}
var allItem;if(document.all){allItem=document.all["publicType"];}else{allItem=document.getElementsByName("publicType");}
var checkCnt=0;for(var i=0;i<allItem.length;i++){if(allItem[i].checked){checkCnt++;}}
if(checkCnt==0&&frm[txtSearchCorp].value==""){obj.err="하나이상의 공시유형을 선택하시거나 회사이름을 입력하셔야 합니다.";frm[txtSearchCorp].value=defaultSearchCrop;return false;}
return true;}
function getCorpExistAll(corpName){xajax.initParameter();xajax.addParameter("textCrpNm",corpName);xajax.async=false;xajax.blockUI=true;var result=true;xajax.blockTarget="";xajax.simpleSend("/corp/searchExistAll.ax",function(existAllCik){if(existAllCik=="null"){result=false;}else{findElementInForm(formSearch,txtSearchCik).value=existAllCik.substr(0,existAllCik.length-1);xajax.addParameter("textCrpCik",existAllCik);result=true;}});xajax.async=true;return result;}
function searchCorpPressEnter(obj){if(event.keyCode==13){obj.blur();searchCorp(1);}}
var calStartDate=null;var calEndDate=null;var txtStartDate="startDate";var txtEndDate="endDate";var titleStartDate="검색시작일";var titleEndDate="검색종료일";function initCalStartEndDate(){if(getRef(txtStartDate).value==""&&getRef(txtEndDate).value==""){setDate(3)}calStartDate=xcalendar.createWindow(titleStartDate,function(date){getRef(txtStartDate).value=date;xcalendar.hide(calStartDate)});calEndDate=xcalendar.createWindow(titleEndDate,function(date){getRef(txtEndDate).value=date;xcalendar.hide(calEndDate)})}
function setDate(num){var now=new Date();var beDate=new Date(now.getFullYear(),now.getMonth()-6,now.getDate());var tmp=num;if(tmp==1)beDate=new Date(now.getFullYear(),now.getMonth(),now.getDate()-7);else if(tmp==2)beDate=new Date(now.getFullYear(),now.getMonth()-1,now.getDate());else if(tmp==4)beDate=new Date(now.getFullYear()-1,now.getMonth(),now.getDate());else if(tmp==5)beDate=new Date(now.getFullYear()-2,now.getMonth(),now.getDate());else if(tmp==6)beDate=new Date(now.getFullYear()-3,now.getMonth(),now.getDate());else if(tmp==7)beDate=new Date(1999,0,1);else beDate=new Date(now.getFullYear(),now.getMonth()-6,now.getDate());var startDT=formatDate(beDate,"");var endDT=formatDate(now,"");findForm(formSearch).startDate.value=startDT;findForm(formSearch).endDate.value=endDT;setDateImg(tmp)}
function setDateImg(num){var tmp=num;var imgs=getRefNm("dateImg");for(var i=0;i<imgs.length;i++){if(i+1==tmp){imgs[i].src="/images/common/"+imgs[i].id+"_on.gif"}else{imgs[i].src="/images/common/"+imgs[i].id+"_off.gif"}}}function validateDate(obj,id,name,value){var frm=findForm(formSearch);if(frm.startDate.value!=""&&frm.endDate.value==""){obj.err="기간 검색은 종료일을 같이 입력하셔야 합니다.";obj.err="기간 검색은 종료일을 같이 입력하셔야 합니다.";return false}if(frm.endDate.value!=""&&frm.startDate.value==""){obj.err="기간 검색은 시작일을 같이 입력하셔야 합니다.";obj.err="기간 검색은 시작일을 같이 입력하셔야 합니다.";return false}if(frm.startDate.value!=""||frm.endDate.value!=""){if(frm.startDate.value>frm.endDate.value){obj.err="시작일은 종료일 보다 클 수 없습니다.";obj.err="시작일은 종료일 보다 클 수 없습니다.";return false}}return true;}
function isDate(obj){var sdate=obj.value;if(sdate==""){xmsgbox.alert(errMsgNotice,"입력된 날짜가 없습니다.");return false;}
if(sdate.length!=8){xmsgbox.alert(errMsgNotice,"날짜가 잘못 입력되었습니다.");return false;}
var year=sdate.substr(0,4);var month=sdate.substr(4,2)-1;var day=sdate.substr(6,2);var date=new Date(year,month,day);if(date.getFullYear()!=year||date.getMonth()!=month||date.getDate()!=day){xmsgbox.alert(errMsgNotice,"날짜가 잘못 입력되었습니다.");return false;}
return true;}
function openCalStartDate(){xcalendar.showWindow(calStartDate);}
function openCalEndDate(){xcalendar.showWindow(calEndDate);}
var winSearchCik=null;var divSearchCik="ajaxSearchCik";var urlSearchCikL="/presenter/main.ax";var urlSearchCikA="/presenter/search.ax";var formSearchCik="presenterForm";var divSearchCikL="pstListContents";var titleSearchCik="제출인명 찾기";function initSearchCik(){$j(document.body).append('<div id="'+divSearchCik+'" class="x-hidden"></div>');winSearchCik=xwindow.createWindow(titleSearchCik,538,562,divSearchCik);}
function openSearchCik(){var frm=findForm(formSearch);xajax.initParameter();xajax.setTimeout(20000);xajax.blockUI=true;xajax.addParameterObj(frm.textPresenterNm);xajax.blockTarget="";xajax.simpleSend(urlSearchCikL,function(html){getRef(divSearchCik).innerHTML=html;$j("tr:nth-child(even)").addClass("even");xwindow.show(winSearchCik);setTimeout(function(){document.presenterForm.textPresenterNm.focus();},100);});}
function searchCik(page){var frm=findForm(formSearchCik);if(page==null||page==""||page=="null"){page=1;}
frm.currentPage.value=page;xajax.initParameter();xajax.blockTarget="";xajax.blockUI=true;xajax.sendForm(formSearchCik,urlSearchCikA,function(html){getRef(divSearchCikL).innerHTML=html;$j("tr:nth-child(even)").addClass("even"); });}
function searchCikByIdx(num){var frm=findForm(formSearchCik);frm.searchIndex.value=num;frm.textPresenterNm.value="";frm.currentPage.value=1;xajax.blockUI=true;xajax.sendForm(formSearchCik,urlSearchCikA,function(html){getRef(divSearchCikL).innerHTML=html;$j("tr:nth-child(even)").addClass("even");});}
function selectSearchCik(str){var frm=findForm(formSearch);frm.textPresenterNm.value=str;xwindow.hide(winSearchCik);}
function searchCikPressEnter(obj){if(event.keyCode==13){obj.blur();searchCik(1);}}
function clearSearchPresenterIdx(){var frm=findForm(formSearchCik);frm.searchIndex.value="";}
var winSearchCategory=null;var divSearchCategory="ajaxSearchCategory";var urlSearchCategoryForm="/category/categoryForm.ax";var urlSearchCategoryData="/category/categorySearch.ax";var divSearchCategoryBaseId="divCode";var lstSearchCategoryBaseId="lstCode";var titleSearchCategory="업종상세 찾기";var widthCategory=550;var heightCategory=325;var errMsgSearchCategory="중분류 이상 선택하셔야 합니다";var initHtml = "";
function initSearchCategory(){$j(document.body).append('<div id="'+divSearchCategory+'" class="x-hidden"></div>');winSearchCategory=xwindow.createWindow(titleSearchCategory,widthCategory,heightCategory,divSearchCategory);}
function openSearchCategory() {	if(initHtml == ""){xajax.initParameter();xajax.setTimeout(20000);		xajax.blockUI = true;		xajax.blockTarget = ""; xajax.simpleSend(urlSearchCategoryForm, function(html) {initHtml = html;getRef(divSearchCategory).innerHTML = initHtml;	setEventCategory(1);setEventCategory(2);setEventCategory(3);});	}else{$j('#lstCode1').val('all');$j('#lstCode2').html(optionAll); $j('#lstCode3').html(optionAll);$j('#lstCode4').html(optionAll);}xwindow.show(winSearchCategory);xwindow.syncSize(winSearchCategory);nextFocus('lstCode1');}
function setEventCategory(Idx){ $j('#lstCode'+Idx).click(function(){ changeSearchCategory(Idx);}).keyup(function(event){if (event.which == 13) { changeSearchCategory(Idx);} });	}
var optionAll='<option value="all" selected="selected">전체</option>';
function changeSearchCategory(Idx) {var nextIdx = Idx+1 ;if(nextIdx > 4) return;if(nextIdx == 2){  $j('#lstCode3').html(optionAll); $j('#lstCode4').html(optionAll);}else if(nextIdx == 3){	$j('#lstCode4').html(optionAll);}xajax.initParameter();	var v = $j('#lstCode'+Idx).val() ;if (Idx == 1) {	xajax.addParameter("indCodeStart", v.substring(0, 2));xajax.addParameter("indCodeEnd", v.substring(2, 4));	} else {		xajax.addParameter("indCode", v);	}	xajax.addParameter("lstId", lstSearchCategoryBaseId + nextIdx);	xajax.setTimeout(20000);	xajax.blockUI = true;	xajax.blockTarget = "";	xajax.simpleSend(urlSearchCategoryData, function(data) { $j('#lstCode'+ nextIdx).html(data);	});}
function selectSearchCategory(){var values=new Array(4);var value=null;var text=null;for(var i=0;i<4;i++){var obj = document.getElementById(lstSearchCategoryBaseId + (i + 1));values[i]=obj.value;if(values[i]!="all"){value=values[i];text=HtmlSelect.getSelectedText(obj);}}if(values[1]=="all"){xmsgbox.alert(errMsgNotice,errMsgSearchCategory);return;}var obj=getRef("typesOfBusiness");	if(!HtmlSelect.containedValue(obj,value)){value='SSS'+value;HtmlSelect.addOption(obj,text,value);}HtmlSelect.setSelectedIndexByValue(obj,value);xwindow.hide(winSearchCategory);}
var winFindReport=null;var divFindReport="winFindReport";var urlFindReportL="/report/main.ax";var urlFindReportA="/report/search.ax";var urlFindReportKind="/report/searchReportKind.ax";var formFindReport="formReportForm";var titleFindReport="보고서명 찾기";var initHtmlFindReport = "";var optionAllFindReport = '<option value="">전체</option>';
function initFindReport(){$j(document.body).append('<div id="'+divFindReport+'" class="x-hidden"></div>');winFindReport=xwindow.createWindow(titleFindReport,538,585,divFindReport);}
function openFindReport() {	xajax.initParameter();xajax.addParameter("dcmNm", $j('#reportName').val());xajax.blockUI = true;xajax.blockTarget = "";xajax.simpleSend(urlFindReportL, function(html) {getRef(divFindReport).innerHTML = html;xwindow.show(winFindReport);setTimeout(function(){document.formReportForm.dspTp.focus();},100);});}
function searchFindReport(){var frm=findForm(formFindReport);xajax.initParameter();xajax.blockUI=true;xajax.blockTarget="";xajax.sendForm(formFindReport,urlFindReportA,function(str){getRef("reportListContents").innerHTML=str;$j("tr:nth-child(even)").addClass("even");});}
function selectFindReport(reportNm){var frm=findForm(formSearch);frm.reportName.value=reportNm;frm.reportNamePopYn.value="Y";xwindow.hide(winFindReport);}
function searchBsnTp() {if ($j('#dspTp').val() != "")xajax.sendForm(formFindReport, urlFindReportKind, searchBsnTpResult);}
function searchBsnTpResult(str){var obj=findForm(formFindReport).bsnTp;var cnt=obj.length;while(cnt>0){obj.options.remove(0);cnt--;}
var optAll=new Option();optAll.value="";optAll.text="전체";obj.add(optAll);var kindResult=eval(str.replace(/(^\s*)|(\s*$)/g,""));for(var i=0;i<kindResult.length;i++){var opt=new Option();opt.value=kindResult[i][0];opt.text=kindResult[i][1];obj.add(opt);}}
var winFindAttach=null;var divFindattach="winFindAttach";function initFindAttach(){$j(document.body).append('<div id="'+divFindattach+'" class="x-hidden"></div>');winFindAttach=xwindow.createWindow("첨부서류명 찾기",532, 500, divFindattach);}
function openFindAttach(){var frm=findForm("searchForm");xajax.initParameter();xajax.addParameterObj(frm.attachDocNm);xajax.setTimeout(30000);xajax.blockUI=true;xajax.blockTarget="";xajax.simpleSend("/attach/main.ax",function(html){getRef(divFindattach).innerHTML=html;$j("tr:nth-child(even)").addClass("even");xwindow.show(winFindAttach);setTimeout(function(){document.attachSearchForm.attachDocNm.focus();},100);});}
function searchFindAttach(){var frm=findForm("attachSearchForm");xajax.initParameter();xajax.blockUI=true;xajax.blockTarget="";xajax.sendForm("attachSearchForm","/attach/search.ax",function(html){getRef("attachlistContents").innerHTML=html;$j("tr:nth-child(even)").addClass("even");});}
function selectFindAttach(str){findForm("searchForm").attachDocNm.value=str;findForm("searchForm").attachDocNmPopYn.value="Y";xwindow.hide(winFindAttach);}
function searchPressEnter(obj,evt){if(evt.keyCode==13){search(1);}}
function clearReportPopYn() {var frm=findForm(formSearch);frm.reportNamePopYn.value="N";}
function clearAttachDocNmPopYn() {var frm=findForm(formSearch);frm.attachDocNmPopYn.value="N";}
var winSearchFund=null;var divSearchFund="divSearchCorpWin";var txtSearchFund="textCrpNm";var txtSearchFundCik="textCrpCik";var formSearchFund="corpSearchForm";var urlSearchFundL="/corp/searchFundL.ax";var urlSearchFundA="/corp/searchFund.ax";var divSearchFundL="corpListContents";var chkSearchFund="checkCorpSelect";var defaultSearchFund="펀드명 또는 펀드코드를 입력하세요";var titleSearchFund="펀드명 찾기";var widthSearchFund=535;var heightSearchFund=570;var errMsgSearchFund="선택된 펀드명이 없습니다";function initSearchFund(){$j(document.body).append('<div id="'+divSearchFund+'" class="x-hidden"></div>');winSearchFund=xwindow.createWindow(titleSearchFund,widthSearchFund,heightSearchFund,divSearchFund);var frm=findForm(formSearch);if(!frm[txtSearchFund].value){frm[txtSearchFund].value=defaultSearchFund;}}
function openSearchFundWindow(){singleChoice="N"; var frm=findForm(formSearch);clearSearchFundText(); xajax.initParameter();xajax.addParameterObj(frm.textCrpNm); xajax.setTimeout(20000);xajax.blockUI=true;xajax.blockTarget="";xajax.simpleSend(urlSearchFundA,function(html){getRef(divSearchFund).innerHTML=html;$j("tr:nth-child(even)").addClass("even"); 	xwindow.show(winSearchFund); setTimeout(function(){$j('#corpSearchForm input[name=textCrpNm]').focus();},700); }); blurSearchFund();}
function openSearchFundWindow_singleChoice(){singleChoice="Y";var frm=findForm(formSearch);clearSearchFundText();xajax.initParameter();xajax.addParameter("singleChoice",singleChoice);xajax.addParameterObj(frm.textCrpNm);xajax.setTimeout(20000);xajax.blockUI=true;xajax.blockTarget="";xajax.simpleSend(urlSearchFundA,function(html){getRef(divSearchFund).innerHTML=html;$j("tr:nth-child(even)").addClass("even");xwindow.show(winSearchFund);});blurSearchFund();}
function searchFund(page){var frm=findForm(formSearchFund);if(page==null||page==""||page=="null"){page=1;}
frm.currentPage.value=page;xajax.initParameter();xajax.addParameterObj(frm.textCrpNm);xajax.blockUI=true;xajax.blockTarget=divSearchFundL;xajax.sendForm(formSearchFund,urlSearchFundL,function(str){getRef(divSearchFundL).innerHTML=str;$j("tr:nth-child(even)").addClass("even");});}
function searchFundByIdx(num){var frm=findForm(formSearchFund);frm.searchIndex.value=num;frm.textCrpNm.value="";searchFund();}
function selectSearchFund(){var frm=findForm(formSearchFund);var ciks=getRefNm("hiddenCikCD1");var chks=getRefNm(chkSearchCorp);var strCiks="";var strChks="";for(var i=0;i<chks.length;i++){if(chks[i].checked==true){strCiks+=ciks[i].value+" ";strChks+=chks[i].value+"/";}}
findElementInForm(formSearch,txtSearchFundCik).value=strCiks.substr(0,strCiks.length-1);findElementInForm(formSearch,txtSearchFund).value=strChks.substr(0,strChks.length-1);if(strCiks==""){xmsgbox.alert("안내!",errMsgSearchFund);return;}else{xwindow.hide(winSearchFund);frm.searchIndex.value="";search(1);}}
function clearSearchFundText(){var obj=findElementInForm(formSearch,txtSearchFund);if(obj.value==defaultSearchFund){obj.value="";}}
function clearSearchFundCik(){findElementInForm(formSearch,txtSearchFundCik).value="";}
function blurSearchFund(){var frm=findForm(formSearch);if(!frm[txtSearchFund].value){frm[txtSearchFund].value=defaultSearchFund;}}
function focusSearchFund(){clearSearchFundText();}
function validateSearchFund(obj,id,name,value){var frm=findForm(formSearch);clearSearchFundText();if(getRef("typesOfBusiness")!=null&&getRef("typesOfBusiness").value!="all"){if(frm[txtSearchFund].value){obj.err="업종선택시 회사명을 입력할 수 없습니다";frm[txtSearchFund].value="회사명 또는 종목코드를 입력하세요";return false;}else{return true;}}
var allItem;if(document.all){allItem=document.all["publicType"];}else{allItem=document.getElementsByName("publicType");}
var checkCnt=0;for(var i=0;i<allItem.length;i++){if(allItem[i].checked){checkCnt++;}}
if(checkCnt==0&&frm[txtSearchFund].value==""){obj.err="하나이상의 공시유형을 선택하시거나 펀드명을 입력하셔야 합니다.";frm[txtSearchFund].value=defaultSearchFund;return false;}
return true;}
function getFundExistAll(corpName){xajax.initParameter();xajax.addParameter("textCrpNm",corpName);xajax.async=false;xajax.blockUI=true;var result=true;xajax.blockTarget="";xajax.simpleSend("/fund/searchExistAll.ax",function(existAllCik){if(existAllCik=="null"){result=false;}else{findElementInForm(formSearch,txtSearchFundCik).value=existAllCik.substr(0,existAllCik.length-1);xajax.addParameter("textCrpCik",existAllCik);result=true;}});xajax.async=true;return result;}
function searchFundPressEnter(obj){if(event.keyCode==13){obj.blur();searchFund(1);}}
var winSearchFundCik=null;var divSearchFundCik="ajaxSearchCik";var urlSearchFundCikL="/presenter/mainFund.ax";var urlSearchFundCikA="/presenter/searchFund.ax";var formSearchFundCik="presenterForm";var divSearchFundCikL="pstListContents";var titleSearchFundCik="자산운용사명 찾기";function initSearchFundCik(){$j(document.body).append('<div id="'+divSearchFundCik+'" class="x-hidden"></div>');winSearchFundCik=xwindow.createWindow(titleSearchFundCik,530,555,divSearchFundCik);}
function openSearchFundCik(){var frm=findForm(formSearch);xajax.initParameter();xajax.setTimeout(20000);xajax.blockUI=true;xajax.addParameterObj(frm.textPresenterNm);xajax.blockTarget="";xajax.simpleSend(urlSearchFundCikL,function(html){getRef(divSearchFundCik).innerHTML=html;$j("tr[group='even']:odd").addClass("even");xwindow.show(winSearchFundCik);setTimeout(function(){document.presenterForm.textPresenterNm.focus();},100);});}
function searchFundCik(page){var frm=findForm(formSearchFundCik);if(page==null||page==""||page=="null"){page=1;}
frm.currentPage.value=page;xajax.initParameter();xajax.blockTarget="";xajax.blockUI=true;xajax.sendForm(formSearchFundCik,urlSearchFundCikA,function(html){getRef(divSearchFundCikL).innerHTML=html;$j("tr[group='even']:odd").addClass("even");});}
function searchFundCikByIdx(num){var frm=findForm(formSearchFundCik);frm.searchIndex.value=num;frm.textPresenterNm.value="";frm.currentPage.value=1;xajax.blockUI=true;xajax.sendForm(formSearchFundCik,urlSearchFundCikA,function(html){getRef(divSearchFundCikL).innerHTML=html;$j("tr[group='even']:odd").addClass("even");});}
function selectSearchFundCik(str){var frm=findForm(formSearch);frm.textPresenterNm.value=str;xwindow.hide(winSearchFundCik);}
var winFindFundReport=null;var divFindFundReport="winFindReport";var urlFindFundReportL="/report/mainFund.ax";var urlFindFundReportA="/report/searchFund.ax";var urlFindFundReportKind="/report/searchFundReportKind.ax";var formFindFundReport="formReportForm";var titleFindFundReport="보고서명 찾기";function initFindFundReport(){$j(document.body).append('<div id="'+divFindFundReport+'" class="x-hidden"></div>');winFindFundReport=xwindow.createWindow(titleFindFundReport,530,555,divFindReport);}
function openFindFundReport(){var frm=findForm(formSearch);xajax.initParameter();xajax.addParameter("dcmNm",frm.reportName.value);xajax.blockUI=true;xajax.blockTarget="";xajax.simpleSend(urlFindFundReportL,function(str){getRef(divFindFundReport).innerHTML=str;xwindow.show(winFindFundReport);setTimeout(function(){document.formReportForm.bsnTp.focus();},100);});}
function searchFindFundReport(){var frm=findForm(formFindFundReport);xajax.initParameter();xajax.blockUI=true;xajax.blockTarget="";xajax.sendForm(formFindFundReport,urlFindFundReportA,function(str){getRef("reportListContents").innerHTML=str;});}
function selectFindFundReport(reportNm){var frm=findForm(formSearch);frm.reportName.value=reportNm;frm.reportNamePopYn.value="Y";xwindow.hide(winFindFundReport);}
function searchFundBsnTp(){var frm=findForm(formFindFundReport);if(frm.dspTp.value!="")
xajax.sendForm(formFindFundReport,urlFindFundReportKind,searchFundBsnTpResult);}
function changeMaxResults(max){var frm=findForm("searchForm");frm.maxResults.value=max;search(1);location.href="#layoutTop";}
/* end 팝업창 사이즈 재조정*/

function hideTopMenuAll(){$j("div[topMenu='topMenu']").hide();$j("div[topMenu='topMenu']").attr("visibility","hide");}
var lastMenuAction="";function showTopMenuById(id,stamp){lastMenuAction="show";hideTopMenuAll();$j("#"+id+"[topMenu='topMenu']").show().attr("visibility","show").attr("stamp",stamp);}
function hideTopMenuById(id,stamp,delay){if(delay){lastMenuAction="hide";setTimeout("hideTopMenuById('"+id+"', '"+stamp+"')",delay);return;}
if(lastMenuAction=="hide")
$j("#"+id+"[topMenu='topMenu'][stamp='"+stamp+"']").hide().attr("visibility","hide");}

xajax=function(){};xajax.version="1.0";xajax.waitMessage="데이터 수신중입니다!";xajax.fatalErrorMessage="예기치 않은 오류가 발생하였습니다!";xajax.defaultErrorMessage="요청이 실패하였습니다!";xajax.url="";xajax.execute="";xajax.message="";xajax.movePage="";xajax.openDialog="";xajax.queryString="";xajax.receivedData="";xajax.async=true;xajax.type="POST";xajax.timeout=120000;xajax.blockUI=true;xajax.dataType="html";xajax.debugMode=false;xajax.blockTarget="";xajax.blockHeight="150px";xajax.setUrl=function(url){xajax.url=url;};xajax.setAsync=function(bool){xajax.async=bool;};xajax.setType=function(method){xajax.type=method;};xajax.setTimeout=function(time){xajax.timeout=time;};xajax.setBlockUI=function(bool){xajax.blockUI=bool;};xajax.setDataType=function(type){xajax.dataType;};xajax.initParameter=function(){xajax.queryString="";xajax.blockTarget="";};xajax.findFrm=function(name){var frmArray=$j("form");for(var i=0;i<frmArray.length;i++){if(frmArray[i].name==name||frmArray[i].id==name){return frmArray[i];}}
return null;};xajax.addParameter=function(strKey,strValue){if(xajax.queryString!=""){xajax.queryString+="&";}
xajax.queryString+=strKey+"="+encodeURIComponent(strValue);};xajax.addParameterObj=function(obj){if(obj!=null){if(obj.length==null){if(obj.name!=""&&obj.value!=""){if(xajax.queryString!=""){xajax.queryString+="&";}
xajax.queryString+=obj.name+"="+encodeURIComponent(obj.value);}}else{if(obj.length>0){for(var i=0;i<obj.length;i++){if(obj[i].name!=""&&obj[i].value!=""){if(obj[i].type=="checkbox"){if(obj[i].checked==false){continue;}}
if(xajax.queryString!=""){xajax.queryString+="&";}
xajax.queryString+=obj[i].name+"="+encodeURIComponent(obj[i].value);}}}}}};xajax.addParameterForm=function(frm){if(xajax.findFrm(frm)!=null){if(xajax.queryString!=""){xajax.queryString+="&";}
xajax.queryString+=$j(xajax.findFrm(frm)).serialize();}};xajax.simpleSend=function(url,funcSuccess){xajax.setUrl(url);xajax.realSendForm(funcSuccess);};xajax.sendForm=function(frmName,url,funcSuccess){xajax.queryString="";xajax.addParameterForm(frmName);xajax.setUrl(url);xajax.realSendForm(funcSuccess);};xajax.fSuccess=function(data,funcSuccess){try{document.body.style.cursor="auto";}catch(e){}
try{var execute=xajax.execute;var message=xajax.message;var movePage=xajax.movePage;var openDialog=xajax.openDialog;var body=data;if(message!=null&&message!=""&&message!="null"){if(openDialog=="true"){xmsgbox.show(xmsgbox.ICON_INFO,"정보",message,xmsgbox.BTN_OK);}else{alert(message);}}
if(movePage!=null&&movePage!=""&&movePage!="null"){document.location=movePage;}
if(execute=="true"&&funcSuccess!=""&&funcSuccess!=null&&funcSuccess!="null"){funcSuccess(body);}}
catch(e){var strTmp=xajax.fatalErrorMessage+"<br/>";strTmp+=e+"<br/>";strTmp+=e.description+"<br/>";xmsgbox.show(xmsgbox.ICON_ERROR,"ajax error dialog",strTmp,xmsgbox.BTN_OK);}};xajax.fError=function(request,textStatus,error){try{document.body.style.cursor="auto";}catch(e){}
try{if(request.status==404){alert("\uc694\uccad\ud558\uc2e0 "+xajax.url+" \ud398\uc774\uc9c0\ub97c \ucc3e\uc744 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4.");}else{alert(xajax.fatalErrorMessage);}
if(xajax.debugMode){var strTmp="request.status : "+request.status;strTmp+="<br>"+request.responseText;xmsgbox.show(xmsgbox.ICON_ERROR,"ajax error dialog",strTmp);}}
catch(e){var strTmp=xajax.fatalErrorMessage+"<br/>";strTmp+=e+"<br/>";strTmp+=e.description+"<br/>";xmsgbox.show(xmsgbox.ICON_ERROR,"ajax error dialog",strTmp);$j.unblobkcUI();}};xajax.realSendForm=function(funcSuccess){try{xajax.execute="";xajax.message="";xajax.openDialog="";xajax.movePage="";xajax.receivedData="";try{document.body.style.cursor="progress";if(xajax.blockTarget!=""){$j("#"+xajax.blockTarget).html("<table class='list' border=0 width='100%' height='"+xajax.blockHeight+"'><tr><td align='center' style='line-height: 30px;'><img src='/images/bert2.gif'><br><b>데이터를 수신중입니다!</b></td></tr></table>");}}catch(e){}
$j.ajax({async:xajax.async,type:xajax.type,dataType:xajax.dataType,timeout:xajax.timeout,data:xajax.queryString,url:xajax.url,beforeSend:function(){},success:function(data){xajax.receivedData=data;},error:xajax.fError,complete:function(xhr,status){try{document.body.style.cursor="auto";}catch(e){}
if(status=="success"){xajax.message=decodeURIComponent(xhr.getResponseHeader("message")).replace(/\+/g," ");xajax.execute=xhr.getResponseHeader("execute");xajax.movePage=decodeURIComponent(xhr.getResponseHeader("movePage"));xajax.openDialog=xhr.getResponseHeader("openDialog");xajax.fSuccess(xajax.receivedData,funcSuccess);}}});}
catch(e){var strTmp=xajax.fatalErrorMessage+"<br/>";strTmp+=e+"<br/>";strTmp+=e.description+"<br/>";xmsgbox.show(xmsgbox.ICON_ERROR,"ajax error dialog",strTmp);}};xajax.getHtml=function(url,target){xajax.blockTarget=target;$j.ajax({async:true,type:"get",dataType:"html",timeout:2000,data:xajax.queryString,url:url,success:function(html){try{getRef(target).innerHTML=html;}catch(e){alert(target);}finally{;}}});}
xajax.getAutoCompleteScript=function(){$j.getScript("/corp/searchAutoComplete.do",function(){;});}

var autoCompleteReceivedKeyword;var crpAutoCompleteList=new Array();var crpAutoCompleteObject;var presenterCompleteList=new Array();var presenterCompleteObject;var actbUrl={"textCrpNm":"/corp/searchAutoComplete.do","textPresenterNm":"/presenter/auto/searchPresenter.do"};function initCrpAutoComplete(targetObj){crpAutoCompleteObject=actb(targetObj,crpAutoCompleteList);}
function initPresenterAutoComplete(targetObj){presenterCompleteObject=actb(targetObj,presenterCompleteList);}
function removeAllCrpAutoCompleteList(){for(var i=0;i<crpAutoCompleteList.length;i++){crpAutoCompleteList[i]="";}}
function removeAllPresenterAutoCompleteList(){for(var i=0;i<presenterCompleteList.length;i++){presenterCompleteList[i]="";}}
function getAutoCompleteData(obj){$j.getScript(actbUrl[obj.name]+"?"+obj.name+"="+encodeURI(obj.value));}

xcalendar=function(){};
xcalendar.version="1.0";
xcalendar.dependency="ext-js 2.3.0, xwindow";
xcalendar.format="Ymd";
xcalendar.dummyNo=0;
xcalendar.createCalendar=function(func){return new Ext.DatePicker({okText:"확인",cancelText:"취소",dayNames:["일","월","화","수","목","금","토"],monthNames:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],todayText:"오늘",listeners:{"select":func}});};
xcalendar.createWindow=function(title,func){ var no=xcalendar.dummyNo++; var id="xcalDiv_"+no; $j(document.body).append("<div id='"+id+"' class='x-hidden'></div>"); var cal=xcalendar.createCalendar(function(obj,date){func(date.format(xcalendar.format));}); cal.render(id); var cal_width =193; var cal_height =229; if( navigator.appName.indexOf("Microsoft") > -1 ){if(navigator.appVersion.indexOf("MSIE 9") > -1){cal_width =199; cal_height =229;}else{cal_width =199; cal_height =216;}}else if(navigator.appName.indexOf("Netscape") > -1 ){cal_width =193; cal_height =229;}else{cal_width =193; cal_height =215;}
return xwindow.createWindow(title,cal_width,cal_height,id,false,false);};
xcalendar.render=function(cal,render,isVisible){cal.render(render);if(!isVisible){cal.hide();}};xcalendar.showWindow=function(win,left,top){if(left==null&&top==null){var e=this.event;if(!e)e=window.event;var x=0;var y=0;var targ;if(e.target)targ = e.target;else if(e.srcElement)targ=e.srcElement;if(targ.getBoundingClientRect){x=targ.getBoundingClientRect().right;y=targ.getBoundingClientRect().top;}else if(e.pageX||e.pageY){x=e.pageX;y=e.pageY;}else if(e.clientX||e.clientY){x=e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft;y=e.clientY+document.body.scrollTop+document.documentElement.scrollTop;}
left=x;top=y;}
xwindow.setPosition(win,left,top);xwindow.show(win);xwindow.syncSize(win);};xcalendar.hideWindow=function(win){xwindow.hide(win);};xcalendar.show=function(cal){if(cal==null||cal==""||cal=="null"){return;}
cal.show();};xcalendar.hide=function(cal){if(cal==null||cal==""||cal=="null"){return;}
cal.hide();};xcalendar.syncSize=function(win,div){xwindow.setSize(win,div);};

function addOption(selectbox,text,value){var optn=document.createElement("OPTION");optn.text=text;optn.value=value;selectbox.options.add(optn);}
function removeAllOptions(selectbox){var i;for(i=selectbox.options.length-1;i>=0;i--){selectbox.remove(i);}}
function removeOptions(selectbox){var i;for(i=selectbox.options.length-1;i>=0;i--){if(selectbox.options[i].selected)
selectbox.remove(i);}}
function trim(stringToTrim){return stringToTrim.replace(/^\s+|\s+$/g,"");}
function ltrim(stringToTrim){return stringToTrim.replace(/^\s+/,"");}
function rtrim(stringToTrim){return stringToTrim.replace(/\s+$/,"");}
function checkQueryString(str){var comp=["!","%","=","\"","'","--","<",">","|"];for(var i=0;i<comp.length;i++){if(str.indexOf(comp[i])>-1){return false;}}
return true;}
function URLEncode(inStr)
{outStr=' ';for(i=0;i<inStr.length;i++)
{aChar=inStr.substring(i,i+1);switch(aChar)
{case'%':outStr+="%25";break;case',':outStr+="%2C";break;case':':outStr+="%3A";break;case'~':outStr+="%7E";break;case'!':outStr+="%21";break;case'"':outStr+="%22";break;case'#':outStr+="%23";break;case'$':outStr+="%24";break;case"'":outStr+="%27";break;case'`':outStr+="%60";break;case'^':outStr+="%5E";break;case'&':outStr+="%26";break;case'(':outStr+="%28";break;case')':outStr+="%29";break;case'+':outStr+="%2B";break;case'{':outStr+="%7B";break;case'|':outStr+="%7C";break;case'}':outStr+="%7D";break;case';':outStr+="%3B";break;case'<':outStr+="%3C";break;case'=':outStr+="%3D";break;case'>':outStr+="%3E";break;case'?':outStr+="%3F";break;case'[':outStr+="%5B";break;case'\\':outStr+="%5C";break;case']':outStr+="%5D";break;case' ':outStr+="+";break;case'/':outStr+="+";break;default:outStr+=aChar;}}
return outStr.substring(1,outStr.length);}

function setFSSFIle(type, files, filenames){ var $d_files = $('#d_files'); for(var j=0 ; j < files.length ; j++){var file = files[j]; var name = filenames[j]; var ext = file.split('.').reverse()[0]; var url  = getFSSFileUrl(type, file); var str = '<li><img src="/images/mdart/icon/f_'+ext+'.gif" /><a href="'+url+'" target="_blank">'+name+'</a><li>'; $d_files.append( str);}}
function getFSSFileUrl(type, file){	var url; switch(type){ case 1: url = 'http://www.fss.or.kr/fss.hpdownload?file='+file+'&path=/nws/nbd/'; break; case 2: url = 'http://www.fss.or.kr/fss.hpdownload?file='+file+'&path=/sob/ann/data/'; break;} window.location.href = url;}

function setSelectValue(obj,value){for(var i=0;i<obj.options.length;i++){if(obj.options[i].value==value){obj.selectedIndex=i;return;}}}
function MM_reloadPage(init){if(init==true)with(navigator){if((appName=="Netscape")&&(parseInt(appVersion)==4)){document.MM_pgW=innerWidth;document.MM_pgH=innerHeight;onresize=MM_reloadPage;}}
else if(innerWidth!=document.MM_pgW||innerHeight!=document.MM_pgH)location.reload();}
MM_reloadPage(true);function MM_preloadImages(){var d=document;if(d.images){if(!d.MM_p)d.MM_p=new Array();var i,j=d.MM_p.length,a=MM_preloadImages.arguments;for(i=0;i<a.length;i++)
if(a[i].indexOf("#")!=0){d.MM_p[j]=new Image;d.MM_p[j++].src=a[i];}}}
function MM_swapImgRestore(){var i,x,a=document.MM_sr;for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++)x.src=x.oSrc;}
function MM_findObj(n,d){var p,i,x;if(!d)d=document;if((p=n.indexOf("?"))>0&&parent.frames.length){d=parent.frames[n.substring(p+1)].document;n=n.substring(0,p);}
if(!(x=d[n])&&d.all)x=d.all[n];for(i=0;!x&&i<d.forms.length;i++)x=d.forms[i][n];for(i=0;!x&&d.layers&&i<d.layers.length;i++)x=MM_findObj(n,d.layers[i].document);if(!x&&d.getElementById)x=d.getElementById(n);return x;}
function MM_swapImage(){var i,j=0,x,a=MM_swapImage.arguments;document.MM_sr=new Array;for(i=0;i<(a.length-2);i+=3)
if((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x;if(!x.oSrc)x.oSrc=x.src;x.src=a[i+2];}}
function MM_showHideLayers(){var i,p,v,obj,args=MM_showHideLayers.arguments;for(i=0;i<(args.length-2);i+=3)if((obj=MM_findObj(args[i]))!=null){v=args[i+2];if(obj.style){obj=obj.style;v=(v=='show')?'visible':(v=='hide')?'hidden':v;}
obj.visibility=v;}}
function formatDate(date,separator){if((date.getMonth()+1)<10)month="0"+(date.getMonth()+1);else month=date.getMonth()+1;if(date.getDate()<10)day="0"+date.getDate();else day=date.getDate();return date.getFullYear()+""+separator+""+month+""+separator+""+day;}
function setOffsets(obj,target){var end=obj.offsetWidth;var left=calculateOffsetLeft(obj);var top=calculateOffsetTop(obj)+obj.offsetHeight;target.style.left=left+"px";target.style.top=top+"px";}
function calculateOffsetLeft(field){return calculateOffset(field,"offsetLeft");}
function calculateOffsetTop(field){return calculateOffset(field,"offsetTop");}
function calculateOffset(field,attr){var offset=0;while(field){offset+=field[attr];field=field.offsetParent;}
return offset;}
function divOnOff(pNum,flag){if(flag==null||flag=="")flag="select";var divNm="publicTypeDiv"+pNum;var btnNm="PublicTypeBtn"+pNum;var imgNm="/images/publicType/";var divObj=getRef(divNm);var btnObj=getRef(btnNm);var isChecked=false;var allItem;if(document.all){allItem=document.all["publicType"];}else{allItem=document.getElementsByName("publicType");}
for(var i=0;i<allItem.length;i++){chkValue=allItem[i].value;if(pNum==chkValue.charAt(0)&&allItem[i].checked)
isChecked=true;}
if(divObj!=null){if(flag=="select"){if(divObj.className=="selectBox doNotShowDiv"){divObj.className="selectBox doShowDiv";if(isChecked)btnObj.src=imgNm+pNum+"_on_check.gif";else btnObj.src=imgNm+pNum+"_on.gif";}else if(divObj.className=="selectBox doShowDiv"){divObj.className="selectBox doNotShowDiv";if(isChecked)btnObj.src=imgNm+pNum+"_off_check.gif";else btnObj.src=imgNm+pNum+"_off.gif";}}else if(flag=="open"){divObj.className="selectBox doShowDiv";if(isChecked)btnObj.src=imgNm+pNum+"_on_check.gif";else btnObj.src=imgNm+pNum+"_on.gif";}else if(flag=="close"){divObj.className="selectBox doNotShowDiv";if(isChecked)btnObj.src=imgNm+pNum+"_off_check.gif";else btnObj.src=imgNm+pNum+"_off.gif";}}}
function checkOnOff(obj,fword){var bool;var btnNm="PublicTypeBtn"+fword;var btnObj=getRef(btnNm);if(obj.src.indexOf("/images/btn_select_all.gif")==-1){btnObj.src="/images/publicType/"+fword+"_on.gif";bool=false;obj.src="/images/btn_select_all.gif";obj.alt="전체선택";}else{btnObj.src="/images/publicType/"+fword+"_on_check.gif";bool=true;obj.src="/images/btn_deselect_all.gif";obj.alt="전체해제";}
var allItem;if(document.all){allItem=document.all["publicType"];}else{allItem=document.getElementsByName("publicType");}
for(var i=0;i<allItem.length;i++){chkValue=allItem[i].value;if(fword==chkValue.charAt(0))allItem[i].checked=bool;}}
function setOrder(obj){var series=document.searchForm.series;var sort=document.searchForm.sort;var imgs=getRefNm("sortImg");for(var i=0;i<imgs.length;i++){if(imgs[i].id==obj.id){sort.value=obj.id;if(series.value=="asc"){series.value="desc";}else{series.value="asc";}}else{imgs[i].src="/images/sort/"+imgs[i].id+"/off_asc.gif";}}
search('');}
function hiddenDiv(name){getRef(name).style.display="none";}
function allChecks(obj,str){var chks=getRefNm(str);for(var i=0;i<chks.length;i++){chks[i].checked=obj.checked;}}
function oneCheck(obj,str){if(obj.checked==false&&getRef(str).checked==true){getRef(str).checked=false;}else if(obj.checked==true&&getRef(str).checked==false){var chks=getRefNm(obj.name);var j=0;for(var i=0;i<chks.length;i++){if(chks[i].checked==true)j++;}
if(chks.length==j)getRef(str).checked=true;}}
function getCurrentDateTime(){var d=new Date();var s=leadingZeros(d.getFullYear(),4)+'-'+
leadingZeros(d.getMonth()+1,2)+'-'+
leadingZeros(d.getDate(),2)+' '+
leadingZeros(d.getHours(),2)+':'+
leadingZeros(d.getMinutes(),2);return s;}
function leadingZeros(n,digits){var zero='';n=n.toString();if(n.length<digits){for(i=0;i<digits-n.length;i++)
zero+='0';}
return zero+n;}
function setCookie(name,value,day){var expdate=new Date();expdate.setTime(expdate.getTime()+1000*3600*24*day);document.cookie=name+"="+escape(value)+"; path=/; expires="+expdate.toGMTString();}
function getCookie(Name){var search=Name+"="
if(document.cookie.length>0){offset=document.cookie.indexOf(search)
if(offset!=-1){offset+=search.length
end=document.cookie.indexOf(";",offset)
if(end==-1)
end=document.cookie.length
return unescape(document.cookie.substring(offset,end))}}}

xevent=function(){};xevent.version="1.0";xevent.dependency="ext-js 2.1";xevent.ready=function(evt){Ext.onReady(evt);};

xmsgbox=function(){};xmsgbox.version="1.0";xmsgbox.dependency="ext-js 2.1";xmsgbox.ICON_NONE=null;xmsgbox.ICON_INFO=Ext.MessageBox.INFO;xmsgbox.ICON_QUESTION=Ext.MessageBox.QUESTION;xmsgbox.ICON_WARNING=Ext.MessageBox.WARNING;xmsgbox.ICON_ERROR=Ext.MessageBox.ERROR;Ext.MessageBox.buttonText.yes="예";Ext.MessageBox.buttonText.no="아니오";Ext.MessageBox.buttonText.cancel="취소";Ext.MessageBox.buttonText.ok="확인";xmsgbox.BTN_CANCEL=Ext.MessageBox.CANCEL;xmsgbox.BTN_OK=Ext.MessageBox.OK;xmsgbox.BTN_OKCANCEL=Ext.MessageBox.OKCANCEL;xmsgbox.BTN_YESNO=Ext.MessageBox.YESNO;xmsgbox.BTN_YESNOCANCEL=Ext.MessageBox.YESNOCANCEL;xmsgbox.OK="ok";xmsgbox.CANCEL="cancel";xmsgbox.YES="yes";xmsgbox.NO="no";xmsgbox.defaultWidth=300;xmsgbox.show=function(icon,title,msg,btn){Ext.MessageBox.show({title:title,msg:msg,width:xmsgbox.defaultWidth,buttons:btn,icon:icon});};xmsgbox.show=function(icon,title,msg,btn,callback){Ext.MessageBox.show({title:title,msg:msg,width:xmsgbox.defaultWidth,buttons:btn,icon:icon,fn:callback});};xmsgbox.alert=function(title,msg,callback){Ext.Msg.alert(title,msg,callback);};xmsgbox.prompt=function(title,msg,callback){Ext.Msg.prompt(title,msg,function(btn,text){if(btn=='ok'){callback(text);}else{callback(null);}});};

var webFXTreeConfig={rootIcon:'/images/tree/rootfolder.png',openRootIcon:'/images/tree/rootfolder.png',folderIcon:'/images/tree/folder.png',openFolderIcon:'/images/tree/openfolder.png',fileIcon:'/images/tree/file.png',lMinusIcon:'/images/tree/Lminus.png',lPlusIcon:'/images/tree/Lplus.png',tMinusIcon:'/images/tree/Tminus.png',tPlusIcon:'/images/tree/Tplus.png',iIcon:'/images/tree/I.png',lIcon:'/images/tree/L.png',tIcon:'/images/tree/T.png',blankIcon:'/images/tree/blank.png',defaultText:'Tree Item',defaultAction:'#none',defaultBehavior:'classic',target:null,usePersistence:false};var webFXTreeHandler={idCounter:0,idPrefix:'webfx-tree-object-',all:{},behavior:null,selected:null,onSelect:null,getId:function(sId){return this.idPrefix+sId;},getOrgId:function(sId){return sId.replace(this.idPrefix,'');},toggle:function(oItem){this.all[oItem.id.replace('-plus','')].toggle();},select:function(oItem){this.all[oItem.id.replace('-icon','')].select();},focus:function(oItem){this.all[oItem.id.replace('-anchor','')].focus();},blur:function(oItem){this.all[oItem.id.replace('-anchor','')].blur();},keydown:function(oItem,e){return this.all[oItem.id].keydown(e.keyCode);},cookies:new WebFXCookie(),insertHTMLBeforeEnd:function(oElement,sHTML){if(oElement.insertAdjacentHTML!=null){oElement.insertAdjacentHTML('BeforeEnd',sHTML)
return;}
var df;var r=oElement.ownerDocument.createRange();r.selectNodeContents(oElement);r.collapse(false);df=r.createContextualFragment(sHTML);oElement.appendChild(df);}};function WebFXCookie(){if(document.cookie.length){this.cookies=document.cookie;}}
WebFXCookie.prototype.setCookie=function(key,value){var persis;var re=new RegExp('TREE_PERSISTENCE=([^;]*)','g');if(re.test(this.cookies)){persis=eval('('+RegExp.$1+')');}else{persis=new Array();}
persis[key]=value;var str='{';for(var k in persis){var v=persis[k];if(v=='0')continue;str+=k+':'+v+',';}
if(str.length>1)str=str.substring(0,str.length-1);str+='}';document.cookie='TREE_PERSISTENCE='+str;this.cookies=document.cookie;}
WebFXCookie.prototype.getCookie=function(key){if(this.cookies){var persis;var re=new RegExp('TREE_PERSISTENCE=([^;]*)','g');if(re.test(this.cookies)){persis=eval('('+RegExp.$1+')');}else{return null;}
if(persis[key]==undefined)return null;return persis[key];}}
function WebFXTreeAbstractNode(sId,sText,sAction){this.childNodes=[];this.id=webFXTreeHandler.getId(sId);this.text=sText||webFXTreeConfig.defaultText;this.action=sAction||webFXTreeConfig.defaultAction;this._last=false;webFXTreeHandler.all[this.id]=this;}
WebFXTreeAbstractNode.prototype.add=function(node,bNoIdent){node.parentNode=this;this.childNodes[this.childNodes.length]=node;var root=this;if(this.childNodes.length>=2){this.childNodes[this.childNodes.length-2]._last=false;}
while(root.parentNode){root=root.parentNode;}
if(root.rendered){if(this.childNodes.length>=2){document.getElementById(this.childNodes[this.childNodes.length-2].id+'-plus').src=((this.childNodes[this.childNodes.length-2].folder)?((this.childNodes[this.childNodes.length-2].open)?webFXTreeConfig.tMinusIcon:webFXTreeConfig.tPlusIcon):webFXTreeConfig.tIcon);this.childNodes[this.childNodes.length-2].plusIcon=webFXTreeConfig.tPlusIcon;this.childNodes[this.childNodes.length-2].minusIcon=webFXTreeConfig.tMinusIcon;this.childNodes[this.childNodes.length-2]._last=false;}
this._last=true;var foo=this;while(foo.parentNode){for(var i=0;i<foo.parentNode.childNodes.length;i++){if(foo.id==foo.parentNode.childNodes[i].id){break;}}
if(i==foo.parentNode.childNodes.length-1){foo.parentNode._last=true;}
else{foo.parentNode._last=false;}
foo=foo.parentNode;}
webFXTreeHandler.insertHTMLBeforeEnd(document.getElementById(this.id+'-cont'),node.toString());if((!this.folder)&&(!this.openIcon)){this.icon=webFXTreeConfig.folderIcon;this.openIcon=webFXTreeConfig.openFolderIcon;}
if(!this.folder){this.folder=true;this.collapse(true);}
if(!bNoIdent){this.indent();}}
return node;}
WebFXTreeAbstractNode.prototype.toggle=function(){if(this.folder){if(this.open){this.collapse();}
else{this.expand();}}}
WebFXTreeAbstractNode.prototype.select=function(){if(!document.getElementById(this.id+'-anchor'))return;document.getElementById(this.id+'-anchor').focus();}
WebFXTreeAbstractNode.prototype.deSelect=function(){if(!document.getElementById(this.id+'-anchor'))return;document.getElementById(this.id+'-anchor').className='';webFXTreeHandler.selected=null;}
WebFXTreeAbstractNode.prototype.focus=function(){if((webFXTreeHandler.selected)&&(webFXTreeHandler.selected!=this)){webFXTreeHandler.selected.deSelect();}
webFXTreeHandler.selected=this;if((this.openIcon)&&(webFXTreeHandler.behavior!='classic')){document.getElementById(this.id+'-icon').src=this.openIcon;}
document.getElementById(this.id+'-anchor').className='selected';document.getElementById(this.id+'-anchor').focus();if(webFXTreeHandler.onSelect){webFXTreeHandler.onSelect(this);}}
WebFXTreeAbstractNode.prototype.blur=function(){if((this.openIcon)&&(webFXTreeHandler.behavior!='classic')){document.getElementById(this.id+'-icon').src=this.icon;}
document.getElementById(this.id+'-anchor').className='selected-inactive';}
WebFXTreeAbstractNode.prototype.doExpand=function(){if(webFXTreeHandler.behavior=='classic'){document.getElementById(this.id+'-icon').src=this.openIcon;}
if(this.childNodes.length){document.getElementById(this.id+'-cont').style.display='block';}
this.open=true;if(webFXTreeConfig.usePersistence){webFXTreeHandler.cookies.setCookie(webFXTreeHandler.getOrgId(this.id),'1');}}
WebFXTreeAbstractNode.prototype.doCollapse=function(){if(webFXTreeHandler.behavior=='classic'){document.getElementById(this.id+'-icon').src=this.icon;}
if(this.childNodes.length){document.getElementById(this.id+'-cont').style.display='none';}
this.open=false;if(webFXTreeConfig.usePersistence){webFXTreeHandler.cookies.setCookie(webFXTreeHandler.getOrgId(this.id),'0');}}
WebFXTreeAbstractNode.prototype.expandAll=function(){this.expandChildren();if((this.folder)&&(!this.open)){this.expand();}}
WebFXTreeAbstractNode.prototype.expandChildren=function(){for(var i=0;i<this.childNodes.length;i++){this.childNodes[i].expandAll();}}
WebFXTreeAbstractNode.prototype.collapseAll=function(){this.collapseChildren();if((this.folder)&&(this.open)){this.collapse(true);}}
WebFXTreeAbstractNode.prototype.collapseChildren=function(){for(var i=0;i<this.childNodes.length;i++){this.childNodes[i].collapseAll();}}
WebFXTreeAbstractNode.prototype.indent=function(lvl,del,last,level,nodesLeft){if(lvl==null){lvl=-2;}
var state=0;for(var i=this.childNodes.length-1;i>=0;i--){state=this.childNodes[i].indent(lvl+1,del,last,level);if(state){return;}}
if(del){if((level>=this._level)&&(document.getElementById(this.id+'-plus'))){if(this.folder){document.getElementById(this.id+'-plus').src=(this.open)?webFXTreeConfig.lMinusIcon:webFXTreeConfig.lPlusIcon;this.plusIcon=webFXTreeConfig.lPlusIcon;this.minusIcon=webFXTreeConfig.lMinusIcon;}
else if(nodesLeft){document.getElementById(this.id+'-plus').src=webFXTreeConfig.lIcon;}
return 1;}}
var foo=document.getElementById(this.id+'-indent-'+lvl);if(foo){if((foo._last)||((del)&&(last))){foo.src=webFXTreeConfig.blankIcon;}
else{foo.src=webFXTreeConfig.iIcon;}}
return 0;}
function WebFXTree(sId,sText,sAction,sBehavior,sIcon,sOpenIcon){this.base=WebFXTreeAbstractNode;this.base(sId,sText,sAction);this.icon=sIcon||webFXTreeConfig.rootIcon;this.openIcon=sOpenIcon||webFXTreeConfig.openRootIcon;if(webFXTreeConfig.usePersistence){this.open=(webFXTreeHandler.cookies.getCookie(webFXTreeHandler.getOrgId(this.id))=='0')?false:true;}else{this.open=true;}
this.folder=true;this.rendered=false;this.onSelect=null;if(!webFXTreeHandler.behavior){webFXTreeHandler.behavior=sBehavior||webFXTreeConfig.defaultBehavior;}}
WebFXTree.prototype=new WebFXTreeAbstractNode;WebFXTree.prototype.setBehavior=function(sBehavior){webFXTreeHandler.behavior=sBehavior;};WebFXTree.prototype.getBehavior=function(sBehavior){return webFXTreeHandler.behavior;};WebFXTree.prototype.getSelected=function(){if(webFXTreeHandler.selected){return webFXTreeHandler.selected;}
else{return null;}}
WebFXTree.prototype.setSelected=function(sId){var node=webFXTreeHandler.all[webFXTreeHandler.getId(sId)];if(node)node.select();}
WebFXTree.prototype.remove=function(){}
WebFXTree.prototype.getId=function(){return webFXTreeHandler.getOrgId(this.id);}
WebFXTree.prototype.expand=function(){this.doExpand();}
WebFXTree.prototype.collapse=function(b){this.doCollapse();}
WebFXTree.prototype.getFirst=function(){return this.childNodes[0];}
WebFXTree.prototype.getLast=function(){if(this.childNodes[this.childNodes.length-1].open){return this.childNodes[this.childNodes.length-1].getLast();}
else{return this.childNodes[this.childNodes.length-1];}}
WebFXTree.prototype.getNextSibling=function(){return null;}
WebFXTree.prototype.getPreviousSibling=function(){return null;}
WebFXTree.prototype.keydown=function(key){if(key==39){if(!this.open){this.expand();}
else if(this.childNodes.length){this.childNodes[0].select();}
return false;}
if(key==37){this.collapse();return false;}
if((key==40)&&(this.open)&&(this.childNodes.length)){this.childNodes[0].select();return false;}
return true;}
WebFXTree.prototype.toString=function(){var str="<div id=\""+this.id+"\" ondblclick=\"webFXTreeHandler.toggle(this);\" class=\"webfx-tree-item\" onkeydown=\"return webFXTreeHandler.keydown(this, event)\">"+"<img id=\""+this.id+"-icon\" class=\"webfx-tree-icon\" src=\""+((webFXTreeHandler.behavior=='classic'&&this.open)?this.openIcon:this.icon)+"\" onclick=\"webFXTreeHandler.select(this);\">"+"<a href=\""+this.action+"\" id=\""+this.id+"-anchor\" onfocus=\"webFXTreeHandler.focus(this);\" onblur=\"webFXTreeHandler.blur(this);\""+
(this.target?" target=\""+this.target+"\"":"")+">"+this.text+"</a></div>"+"<div id=\""+this.id+"-cont\" class=\"webfx-tree-container\" style=\"display: "+((this.open)?'block':'none')+";\">";var sb=[];for(var i=0;i<this.childNodes.length;i++){sb[i]=this.childNodes[i].toString(i,this.childNodes.length);}
this.rendered=true;return str+sb.join("")+"</div>";};function WebFXTreeItem(sId,sText,sAction,eParent,sIcon,sOpenIcon){this.base=WebFXTreeAbstractNode;this.base(sId,sText,sAction);if(webFXTreeConfig.usePersistence){this.open=(webFXTreeHandler.cookies.getCookie(webFXTreeHandler.getOrgId(this.id))=='1')?true:false;}else{this.open=false;}
if(sIcon){this.icon=sIcon;}
if(sOpenIcon){this.openIcon=sOpenIcon;}
if(eParent){if(typeof(eParent)=='object'){eParent.add(this);}else{webFXTreeHandler.all[webFXTreeHandler.getId(eParent)].add(this);}}
if(sAction){this.target=webFXTreeConfig.target;}}
WebFXTreeItem.prototype=new WebFXTreeAbstractNode;WebFXTreeItem.prototype.remove=function(){var iconSrc=document.getElementById(this.id+'-plus').src;var parentNode=this.parentNode;var prevSibling=this.getPreviousSibling(true);var nextSibling=this.getNextSibling(true);var folder=this.parentNode.folder;var last=((nextSibling)&&(nextSibling.parentNode)&&(nextSibling.parentNode.id==parentNode.id))?false:true;this.getPreviousSibling().focus();this._remove();if(parentNode.childNodes.length==0){document.getElementById(parentNode.id+'-cont').style.display='none';parentNode.doCollapse();parentNode.folder=false;parentNode.open=false;}
if(!nextSibling||last){parentNode.indent(null,true,last,this._level,parentNode.childNodes.length);}
if((prevSibling==parentNode)&&!(parentNode.childNodes.length)){prevSibling.folder=false;prevSibling.open=false;if(document.getElementById(prevSibling.id+'-plus')){iconSrc=document.getElementById(prevSibling.id+'-plus').src;iconSrc=iconSrc.replace('minus','').replace('plus','');document.getElementById(prevSibling.id+'-plus').src=iconSrc;document.getElementById(prevSibling.id+'-icon').src=webFXTreeConfig.fileIcon;}}
if(document.getElementById(prevSibling.id+'-plus')){if(parentNode==prevSibling.parentNode){iconSrc=iconSrc.replace('minus','').replace('plus','');document.getElementById(prevSibling.id+'-plus').src=iconSrc;}}}
WebFXTreeItem.prototype._remove=function(){for(var i=this.childNodes.length-1;i>=0;i--){this.childNodes[i]._remove();}
for(var i=0;i<this.parentNode.childNodes.length;i++){if(this==this.parentNode.childNodes[i]){for(var j=i;j<this.parentNode.childNodes.length;j++){this.parentNode.childNodes[j]=this.parentNode.childNodes[j+1];}
this.parentNode.childNodes.length-=1;if(i+1==this.parentNode.childNodes.length){this.parentNode._last=true;}
break;}}
webFXTreeHandler.all[this.id]=null;var tmp=document.getElementById(this.id);if(tmp){tmp.parentNode.removeChild(tmp);}
tmp=document.getElementById(this.id+'-cont');if(tmp){tmp.parentNode.removeChild(tmp);}}
WebFXTreeItem.prototype.getId=function(){return webFXTreeHandler.getOrgId(this.id);}
WebFXTreeItem.prototype.expand=function(){this.doExpand();document.getElementById(this.id+'-plus').src=this.minusIcon;}
WebFXTreeItem.prototype.collapse=function(b){this.doCollapse();document.getElementById(this.id+'-plus').src=this.plusIcon;}
WebFXTreeItem.prototype.getFirst=function(){return this.childNodes[0];}
WebFXTreeItem.prototype.getLast=function(){if(this.childNodes[this.childNodes.length-1].open){return this.childNodes[this.childNodes.length-1].getLast();}
else{return this.childNodes[this.childNodes.length-1];}}
WebFXTreeItem.prototype.getNextSibling=function(){for(var i=0;i<this.parentNode.childNodes.length;i++){if(this==this.parentNode.childNodes[i]){break;}}
if(++i==this.parentNode.childNodes.length){return this.parentNode.getNextSibling();}
else{return this.parentNode.childNodes[i];}}
WebFXTreeItem.prototype.getPreviousSibling=function(b){for(var i=0;i<this.parentNode.childNodes.length;i++){if(this==this.parentNode.childNodes[i]){break;}}
if(i==0){return this.parentNode;}
else{if((this.parentNode.childNodes[--i].open)||(b&&this.parentNode.childNodes[i].folder)){return this.parentNode.childNodes[i].getLast();}
else{return this.parentNode.childNodes[i];}}}
WebFXTreeItem.prototype.keydown=function(key){if((key==39)&&(this.folder)){if(!this.open){this.expand();}
else{this.getFirst().select();}
return false;}
else if(key==37){if(this.open){this.collapse();}
else{this.parentNode.select();}
return false;}
else if(key==40){if(this.open){this.getFirst().select();}
else{var sib=this.getNextSibling();if(sib){sib.select();}}
return false;}
else if(key==38){this.getPreviousSibling().select();return false;}
return true;}
WebFXTreeItem.prototype.toString=function(nItem,nItemCount){var foo=this.parentNode;var indent='';if(nItem+1==nItemCount){this.parentNode._last=true;}
var i=0;while(foo.parentNode){foo=foo.parentNode;indent="<img id=\""+this.id+"-indent-"+i+"\" src=\""+((foo._last)?webFXTreeConfig.blankIcon:webFXTreeConfig.iIcon)+"\">"+indent;i++;}
this._level=i;if(this.childNodes.length){this.folder=1;}
else{this.open=false;}
if((this.folder)||(webFXTreeHandler.behavior!='classic')){if(!this.icon){this.icon=webFXTreeConfig.folderIcon;}
if(!this.openIcon){this.openIcon=webFXTreeConfig.openFolderIcon;}}
else if(!this.icon){this.icon=webFXTreeConfig.fileIcon;}
var label=this.text.replace(/</g,'&lt;').replace(/>/g,'&gt;');var str="<div id=\""+this.id+"\" ondblclick=\"webFXTreeHandler.toggle(this);\" class=\"webfx-tree-item\" onkeydown=\"return webFXTreeHandler.keydown(this, event)\">"+
indent+"<img id=\""+this.id+"-plus\" src=\""+((this.folder)?((this.open)?((this.parentNode._last)?webFXTreeConfig.lMinusIcon:webFXTreeConfig.tMinusIcon):((this.parentNode._last)?webFXTreeConfig.lPlusIcon:webFXTreeConfig.tPlusIcon)):((this.parentNode._last)?webFXTreeConfig.lIcon:webFXTreeConfig.tIcon))+"\" onclick=\"webFXTreeHandler.toggle(this);\">"+"<img id=\""+this.id+"-icon\" class=\"webfx-tree-icon\" src=\""+((webFXTreeHandler.behavior=='classic'&&this.open)?this.openIcon:this.icon)+"\" onclick=\"webFXTreeHandler.select(this);\">"+"<a href=\""+this.action+"\" id=\""+this.id+"-anchor\" onfocus=\"webFXTreeHandler.focus(this);\" onblur=\"webFXTreeHandler.blur(this);\""+
(this.target?" target=\""+this.target+"\"":"")+">"+label+"</a></div>"+"<div id=\""+this.id+"-cont\" class=\"webfx-tree-container\" style=\"display: "+((this.open)?'block':'none')+";\">";var sb=[];for(var i=0;i<this.childNodes.length;i++){sb[i]=this.childNodes[i].toString(i,this.childNodes.length);}
this.plusIcon=((this.parentNode._last)?webFXTreeConfig.lPlusIcon:webFXTreeConfig.tPlusIcon);this.minusIcon=((this.parentNode._last)?webFXTreeConfig.lMinusIcon:webFXTreeConfig.tMinusIcon);return str+sb.join("")+"</div>";}

xwindow=function(){};xwindow.version="1.0";xwindow.dependency="ext-js 2.1";xwindow.createWindow=function(title,width,height,contentEl,modal,resizable){if(modal==null){modal=false;}
if(resizable==null){resizable=true;}
return new Ext.Window({title:title,closable:true,width:width,height:height,plain:true,layout:'border',closeAction:'hide',modal:modal,resizable:resizable,items:[new Ext.Panel({region:'center',border:false,contentEl:contentEl})]});};xwindow.syncSize=function(win){win.syncSize();};xwindow.setSize=function(win,contentEl){win.setSize(document.getElementById(contentEl).offsetWidth+15,document.getElementById(contentEl).offsetHeight+35);}
xwindow.setAnimateTarget=function(win,target){win.setAnimateTarget(target);};xwindow.show=function(win){win.show(this);};xwindow.hide=function(win){win.hide(this);};xwindow.setPosition=function(win,left,top){win.setPosition(left,top);};
/*ie9 createContextualFragment error관련*/
if ((typeof Range !== "undefined") && !Range.prototype.createContextualFragment){Range.prototype.createContextualFragment = function(html){var frag = document.createDocumentFragment(),div = document.createElement("div");frag.appendChild(div);div.outerHTML = html;return frag;};}
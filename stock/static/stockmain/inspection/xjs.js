// -----------------------------------------------------------------------------
// xcommon.js
// -----------------------------------------------------------------------------

/**
 * jquery와 prototype의 충돌을 피하기 위한 선언
 */
var $j = jQuery.noConflict();

/**
 * SELECT객체에 OPTION 객체를 추가한다.
 */
function addOption(selectbox, text, value) {
	var optn = document.createElement("OPTION");
	optn.text = text;
	optn.value = value;
	selectbox.options.add(optn);
}

/**
 *  SELECT 객체내의 OPTION들을 모두 제거한다.
 */
function removeAllOptions(selectbox) {
	var i;
	for(i=selectbox.options.length-1;i>=0;i--) {
		selectbox.remove(i);
	}
}

/**
 * SELECT 객체에서 선택된 OPTION을 삭제한다.
 */
function removeOptions(selectbox) {
	var i;
	for(i=selectbox.options.length-1;i>=0;i--) {
		if(selectbox.options[i].selected)
		selectbox.remove(i);
	}
}

function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}

function ltrim(stringToTrim) {
	return stringToTrim.replace(/^\s+/,"");
}

function rtrim(stringToTrim) {
	return stringToTrim.replace(/\s+$/,"");
}

function checkQueryString(str) {
	var comp = ["!", "%", "=", "\"", "'", "--", "<", ">", "|"];
	for(var i=0; i<comp.length; i++) {
		if (str.indexOf(comp[i]) > -1) {
			return false;
		}
	}
	return true;
}

function URLEncode(inStr)
{
    outStr=' ';  //not '' for a NS bug!
    for (var i=0; i < inStr.length; i++)
    {
            aChar=inStr.substring (i, i+1);
            switch(aChar)
            {
                    case '%': outStr += "%25"; break;
                    case ',': outStr += "%2C"; break;
                    //case '/': outStr += "%2F"; break;
                    case ':': outStr += "%3A"; break;
                    case '~': outStr += "%7E"; break;
                    case '!': outStr += "%21"; break;
                    case '"': outStr += "%22"; break;
                    case '#': outStr += "%23"; break;
                    case '$': outStr += "%24"; break;
                    case "'": outStr += "%27"; break;
                    case '`': outStr += "%60"; break;
                    case '^': outStr += "%5E"; break;
                    case '&': outStr += "%26"; break;
                    case '(': outStr += "%28"; break;
                    case ')': outStr += "%29"; break;
                    case '+': outStr += "%2B"; break;
                    case '{': outStr += "%7B"; break;
                    case '|': outStr += "%7C"; break;
                    case '}': outStr += "%7D"; break;
                    case ';': outStr += "%3B"; break;
                    case '<': outStr += "%3C"; break;
                    case '=': outStr += "%3D"; break;
                    case '>': outStr += "%3E"; break;
                    case '?': outStr += "%3F"; break;
                    case '[': outStr += "%5B"; break;
                    case '\\': outStr += "%5C"; break;
                    case ']': outStr += "%5D"; break;
                    case ' ': outStr += "+"; break;
                    case '/': outStr += "+"; break;
                    default: outStr += aChar;
            }
    }
    return outStr.substring(1, outStr.length);
}

/**
 * fss.or.kr 에 있는 자료 가져오기
 * @param path
 * @param filename
 * @return
 */
function filedown(path,filename) {
	filedownIFrame.location.href  ="http://www.fss.or.kr/kor/include/file_down.jsp?path="+path+"&filename="+filename;
}

function setSelectValue(obj, value) {
	for(var i=0; i<obj.options.length; i++) {
		if (obj.options[i].value == value) {
			obj.selectedIndex = i;
			return;
		}
	}
}

function MM_reloadPage(init) {  //reloads the window if Nav4 resized
  if (init==true) with (navigator) {if ((appName=="Netscape")&&(parseInt(appVersion)==4)) {
    document.MM_pgW=innerWidth; document.MM_pgH=innerHeight; onresize=MM_reloadPage; }}
  else if (innerWidth!=document.MM_pgW || innerHeight!=document.MM_pgH) location.reload();
}
MM_reloadPage(true);

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}
function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}
function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
function MM_showHideLayers() { //v6.0
  var i,p,v,obj,args=MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3) if ((obj=MM_findObj(args[i]))!=null) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v=='hide')?'hidden':v; }
    obj.visibility=v; }
}

/**
 * Date 객체를 받아서 구분자로 연결된 문자열 형태로 리턴한다.
 *
 * date - Date 객체
 * separator - 년과 월, 월과일 사이에 연결할 문자열
 *
 * return 문자열
 */
function formatDate(date, separator){
	if((date.getMonth()+1) < 10) month = "0"+(date.getMonth()+1);
	else month = date.getMonth()+1;
	if(date.getDate() < 10) day = "0"+date.getDate();
	else day = date.getDate();
	return date.getFullYear() + "" + separator + "" + month+ "" + separator+ "" + day;
}

/**
 * obj개체의 위치를 계산하여 target개체의 위치를 obj바로 밑으로 위치 시킨다.
 *
 * obj - dom4j Element
 * target - dom4j Element
 *
 * return
 */

function setOffsets(obj, target) {
	var end = obj.offsetWidth;
    var left = calculateOffsetLeft(obj);
    var top = calculateOffsetTop(obj) + obj.offsetHeight;
    target.style.left = left + "px";
    target.style.top = top + "px";
}

function calculateOffsetLeft(field) {
	return calculateOffset(field, "offsetLeft");
}

function calculateOffsetTop(field) {
	return calculateOffset(field, "offsetTop");
}

function calculateOffset(field, attr) {
	var offset = 0;
    while(field) {
		offset += field[attr];
		field = field.offsetParent;
	}
	return offset;
}

/**
 * 공시유형 div를 보여주거나 감춘다.
 *
 * pNum - div 번호
 *
 * return
 */
function divOnOff(pNum, flag){
    if(flag == null || flag == "") flag = "select";
	var divNm = "publicTypeDiv"+pNum;
	var btnNm = "PublicTypeBtn"+pNum;
	var imgNm = "/images/publicType/";
	var divObj = getRef(divNm);
	var btnObj = getRef(btnNm);


    var isChecked = false;

    var allItem;
	if (document.all) {
	   allItem = document.all["publicType"];
	} else {
	   allItem = document.getElementsByName("publicType");
	}
	//var allItem = document.all.publicType;
    //if(allItem == null) allItem = document.all["publicType"];

    for(var i=0; i < allItem.length; i++){
      chkValue = allItem[i].value;
      if(pNum == chkValue.charAt(0) && allItem[i].checked)
        isChecked = true;
    }

	if(divObj != null){
        if(flag == "select"){
    		if(divObj.className == "selectBox doNotShowDiv"){
    			divObj.className = "selectBox doShowDiv";
                if(isChecked) btnObj.src = imgNm+pNum+"_on_check.gif";
                else btnObj.src = imgNm+pNum+"_on.gif";
    		}else if(divObj.className == "selectBox doShowDiv"){
    			divObj.className = "selectBox doNotShowDiv";
    			if(isChecked) btnObj.src = imgNm+pNum+"_off_check.gif";
                else btnObj.src = imgNm+pNum+"_off.gif";
    		}
        }else if(flag == "open"){
          divObj.className = "selectBox doShowDiv";
          if(isChecked) btnObj.src = imgNm+pNum+"_on_check.gif";
          else btnObj.src = imgNm+pNum+"_on.gif";
        }else if(flag == "close"){
          divObj.className = "selectBox doNotShowDiv";
          if(isChecked) btnObj.src = imgNm+pNum+"_off_check.gif";
          else btnObj.src = imgNm+pNum+"_off.gif";
        }
	}
}

/**
 * 해당 공시유형 div에서 전체선택 또는 해제 기능을 수행한다.
 *
 * obj - dom4j Element
 * fword - 선택 도는 해제 하고 싶은 publicType.value의 첫번째 값
 *
 * return
 */

function checkOnOff(obj, fword){
	var bool;
    var btnNm = "PublicTypeBtn"+fword;
    var btnObj = getRef(btnNm);

	if(obj.src.indexOf("/images/btn_select_all.gif") == -1){
        btnObj.src = "/images/publicType/"+fword+"_on.gif";
		bool = false;
		obj.src = "/images/btn_select_all.gif";
		obj.alt = "전체선택";
	}else{
        btnObj.src = "/images/publicType/"+fword+"_on_check.gif";
		bool = true;
		obj.src = "/images/btn_deselect_all.gif";
		obj.alt = "전체해제";
	}
	//var allItem = document.all.publicType;
	//if(allItem == null) allItem = document.all["publicType"];
    var allItem;
	if (document.all) {
	   allItem = document.all["publicType"];
	} else {
	   allItem = document.getElementsByName("publicType");
	}

	for(var i=0; i < allItem.length; i++){
		chkValue = allItem[i].value;
		if(fword == chkValue.charAt(0)) allItem[i].checked = bool;
	}
}

/**
 * 리스트 정렬을 값을 넣고 search()를 호출한다.
 * img속성에 name="sortImg"로 해야 하며 각각 id값을 다르게 하야 한다.
 * /img/sort 밑에 해당 id값으로 된 폴더가 존재 하여야 하며, asc.gif, desc.gif, disable.gif가 존재해야 한다.
 *
 * obj - dom4j Element(클릭된 이미지 객체)
 *
 * return
 */
function setOrder(obj){
	var series = document.searchForm.series;
    var sort = document.searchForm.sort;

	var imgs = getRefNm("sortImg");
	for(var i = 0; i < imgs.length; i++){
		if(imgs[i].id == obj.id){
            sort.value = obj.id;
			if(series.value == "asc"){
				series.value = "desc";
				//imgs[i].src = "/images/sort/"+imgs[i].id+"/on_asc.gif";
			}else{
				series.value = "asc";
				//imgs[i].src = "/images/sort/"+imgs[i].id+"/on_desc.gif";
			}
		}else{
			imgs[i].src = "/images/sort/"+imgs[i].id+"/off_asc.gif";
		}
	}
	search('');
}

function hiddenDiv(name){
	getRef(name).style.display="none";
}

function allChecks(obj, str) {
    var chks = getRefNm(str);
	for(var i=0; i < chks.length; i++) {
    	chks[i].checked = obj.checked;
	}
}

function oneCheck(obj, str) {
	if(obj.checked == false && getRef(str).checked == true) {
    	getRef(str).checked = false;
    } else if (obj.checked == true && getRef(str).checked == false) {
		var chks = getRefNm(obj.name);
		var j = 0;
		for(var i=0; i < chks.length; i++) {
			if(chks[i].checked == true) j++;
		}
		if(chks.length == j) getRef(str).checked = true;
	}
}

/**
 * 오늘의 공시 시간
 * @return
 */
function getCurrentDateTime() {
	var d = new Date();
	var s =
    leadingZeros(d.getFullYear(), 4) + '-' +
    leadingZeros(d.getMonth() + 1, 2) + '-' +
    leadingZeros(d.getDate(), 2) + ' ' +

    leadingZeros(d.getHours(), 2) + ':' +
    leadingZeros(d.getMinutes(), 2) ;

	return s;
}

function leadingZeros(n, digits) {
	var zero = '';
	n = n.toString();
	if (n.length < digits) {
		for (var i = 0; i < digits - n.length; i++)
		zero += '0';
	}
	return zero + n;
}

function setCookie (name, value, day) {
	var expdate = new Date();
	expdate.setTime(expdate.getTime() + 1000 * 3600 * 24 * day); // 365일
	document.cookie = name + "=" + escape (value) + "; path=/; expires=" + expdate.toGMTString();
}

function getCookie(Name) {
	var search = Name + "=";
	if (document.cookie.length > 0) { // 쿠키가 설정되어 있다면
    	offset = document.cookie.indexOf(search);
    	if (offset != -1) { // 쿠키가 존재하면
      		offset += search.length;
      		// set index of beginning of value
      		end = document.cookie.indexOf(";", offset);
      		// 쿠키 값의 마지막 위치 인덱스 번호 설정
      		if (end == -1)
        		end = document.cookie.length;
      		return unescape(document.cookie.substring(offset, end));
    	}
  	}
}

// -----------------------------------------------------------------------------
// xajax.js
// -----------------------------------------------------------------------------

/*
 *  1. 화일이름		: xajax.js
 *  2. 작성자			: 신영진
 *  3. 작성일자		: 2008. 05. 08
 *  4. 파일설명		: ajax관련 스크립트 파일
 *  5. 프로그램 변경 내역
 *     1) 2008. 05. 08 / 배포 / 최초 포맷 설정
 *     2) 2008. 07. 04 / 배포 / jquery lib 에서 사용하는 ajax모듈로 전송 모듈 변경.
 *     3) 2008. 07. 06 / 배포 / debug 창 추가
 *     4) 2008. 07. 14 / 배포 / dartHttp.js --> xajax.js로 이름 변경
 *     5) 2008. 07. 15 / 배포 / 결과 xml에 movePage 추가.
 *     6) 2008. 07. 23 / 배포 / XML에 있는 상태정보를 Response Header으로 이동 (김상욱)
 *
 */
xajax = function () {
};

xajax.version = "1.0";
xajax.waitMessage = "데이터 수신중입니다!"; // 잠시만 기다려 주세요!
xajax.fatalErrorMessage = "예기치 않은 오류가 발생하였습니다!"; // 예기치 않은 오류가 발생하였습니다!
xajax.defaultErrorMessage = "요청이 실패하였습니다!"; // 요청이 실패하였습니다!
xajax.url = "";
xajax.execute = "";
xajax.message = "";
xajax.movePage = "";
xajax.openDialog = "";
xajax.queryString = "";
xajax.receivedData = "";
xajax.async = true;
xajax.type = "POST";
xajax.timeout = 120000;
xajax.blockUI = true;
xajax.dataType = "html";
xajax.debugMode = false;
xajax.blockTarget = "";
xajax.blockHeight = "150px";

xajax.setUrl = function (url) {
	xajax.url = url;
};
xajax.setAsync = function (bool) {
	xajax.async = bool;
};
xajax.setType = function (method) {
	xajax.type = method;
};
xajax.setTimeout = function (time) {
	xajax.timeout = time;
};
xajax.setBlockUI = function (bool) {
	xajax.blockUI = bool;
};
xajax.setDataType = function (type) {
	xajax.dataType;
};
xajax.initParameter = function () {
	xajax.queryString = "";
	xajax.blockTarget = "";
};
xajax.findFrm = function (name) {
	var frmArray = $j("form");
	for (var i = 0; i < frmArray.length; i++) {
		if (frmArray[i].name == name || frmArray[i].id == name) {
			return frmArray[i];
		}
	}
	return null;
};
xajax.addParameter = function (strKey, strValue) {
	if (xajax.queryString != "") {
		xajax.queryString += "&";
	}
	xajax.queryString += strKey + "=" + encodeURIComponent(strValue);
};
xajax.addParameterObj = function (obj) {
	if (obj != null) {
		if (obj.length == null) {
			if (obj.name != "" && obj.value != "") {
				if (xajax.queryString != "") {
					xajax.queryString += "&";
				}
				xajax.queryString += obj.name + "=" + encodeURIComponent(obj.value);
			}
		} else {
			if (obj.length > 0) {
				for (var i = 0; i < obj.length; i++) {
					if (obj[i].name != "" && obj[i].value != "") {
						if (obj[i].type == "checkbox") {
							if (obj[i].checked == false) {
								continue;
							}
						}
						if (xajax.queryString != "") {
							xajax.queryString += "&";
						}
						xajax.queryString += obj[i].name + "=" + encodeURIComponent(obj[i].value);
					}
				}
			}
		}
	}
};
xajax.addParameterForm = function (frm) {
	if (xajax.findFrm(frm) != null) {
		if (xajax.queryString != "") {
			xajax.queryString += "&";
		}
		xajax.queryString += $j(xajax.findFrm(frm)).serialize();
	}
};
xajax.simpleSend = function (url, funcSuccess) {
	xajax.setUrl(url);
	xajax.realSendForm(funcSuccess);
};
xajax.sendForm = function (frmName, url, funcSuccess) {
	xajax.queryString = "";
	xajax.addParameterForm(frmName);
	xajax.setUrl(url);
	xajax.realSendForm(funcSuccess);
};
xajax.fSuccess = function (data, funcSuccess) {
	try {
		document.body.style.cursor = "auto";
	} catch (e) {
	}
	try {
		var execute = xajax.execute;
		var message = xajax.message;
		var movePage = xajax.movePage;
		var openDialog = xajax.openDialog;
		var body = data;
		if (message != null && message != "" && message != "null") {
			if (openDialog == "true") {
				xmsgbox.show(xmsgbox.ICON_INFO, "정보", message, xmsgbox.BTN_OK);
			} else {
				alert(message);
			}
		}
		if (movePage != null && movePage != "" && movePage != "null") {
			document.location = movePage;
		}
		if (execute == "true" && funcSuccess != "" && funcSuccess != null && funcSuccess != "null") {
			funcSuccess(body);
		}
	}
	catch (e) {
		var strTmp = xajax.fatalErrorMessage + "<br/>";
		strTmp += e + "<br/>";
		strTmp += e.description + "<br/>";
		xmsgbox.show(xmsgbox.ICON_ERROR, "ajax error dialog", strTmp, xmsgbox.BTN_OK);
	}
};
xajax.fError = function (request, textStatus, error) {
	try {
		document.body.style.cursor = "auto";
	} catch (e) {
	}
	try {
		if (request.status == 404) {
			alert("\uc694\uccad\ud558\uc2e0 " + xajax.url + " \ud398\uc774\uc9c0\ub97c \ucc3e\uc744 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4.");
		} else {
			alert(xajax.fatalErrorMessage);
		}
		if (xajax.debugMode) {
			var strTmp = "request.status : " + request.status;
			strTmp += "<br>" + request.responseText;
			xmsgbox.show(xmsgbox.ICON_ERROR, "ajax error dialog", strTmp);
		}
	}
	catch (e) {
		var strTmp = xajax.fatalErrorMessage + "<br/>";
		strTmp += e + "<br/>";
		strTmp += e.description + "<br/>";
		xmsgbox.show(xmsgbox.ICON_ERROR, "ajax error dialog", strTmp);
		$j.unblobkcUI();
	}
};
xajax.realSendForm = function (funcSuccess) {
	try {
		xajax.execute = "";
		xajax.message = "";
		xajax.openDialog = "";
		xajax.movePage = "";
		xajax.receivedData = "";
		try {
			document.body.style.cursor = "progress";
			if (xajax.blockTarget != "") {
				$j("#" + xajax.blockTarget).html("<table class='list' border=0 width='100%' height='" + xajax.blockHeight + "'><tr><td align='center' style='line-height: 30px;'><img src='/images/bert2.gif'><br><b>데이터를 수신중입니다!</b></td></tr></table>");
			}
		} catch (e) {
		}
		$j.ajax({
			async:xajax.async,
			type:xajax.type,
			dataType: xajax.dataType,
			timeout:xajax.timeout,
			data:xajax.queryString,
			url:xajax.url,
			beforeSend:function () {
			},
			success:function (data) {
				xajax.receivedData = data;
			},
			error:xajax.fError,
			complete:function (xhr, status) {
				try {
					document.body.style.cursor = "auto";
				} catch (e) {
				}
				if (status == "success") {
					xajax.message = decodeURIComponent(xhr.getResponseHeader("message")).replace(/\+/g, " ");
					xajax.execute = xhr.getResponseHeader("execute");
					xajax.movePage = decodeURIComponent(xhr.getResponseHeader("movePage"));
					xajax.openDialog = xhr.getResponseHeader("openDialog");
					xajax.fSuccess(xajax.receivedData, funcSuccess);
				}
			}
		});
	}
	catch (e) {
		var strTmp = xajax.fatalErrorMessage + "<br/>";
		strTmp += e + "<br/>";
		strTmp += e.description + "<br/>";
		xmsgbox.show(xmsgbox.ICON_ERROR, "ajax error dialog", strTmp);
	}
};
xajax.getHtml = function(url, target) {
	xajax.blockTarget = target;
	$j.ajax({
			async:true,
			type:"get",
			dataType: "html",
			timeout:2000,
			data:xajax.queryString,
			//contentType: "text/html; euc-kr",
			url:url,
			success:function (html) {
				try {
					getRef(target).innerHTML = html;
				} catch (e) {
					alert(target);
				} finally {
					;
				}
			}
	});
};

xajax.getAutoCompleteScript = function() {
	$j.getScript("/corp/searchAutoComplete.do", function() {
		;
	});
};

// -----------------------------------------------------------------------------
// xautocomplete.js
// -----------------------------------------------------------------------------

xajax.getAutoCompleteScript = function() {
	$j.getScript("/corp/searchAutoComplete.do", function() {
		;
	});
};

var autoCompleteReceivedKeyword;

var crpAutoCompleteList = new Array();
var crpAutoCompleteObject;

var presenterCompleteList = new Array();
var presenterCompleteObject;

var actbUrl = {"textCrpNm":"/corp/searchAutoComplete.do", "textPresenterNm":"/presenter/auto/searchPresenter.do"};

function initCrpAutoComplete(targetObj) {
	crpAutoCompleteObject = actb(targetObj, crpAutoCompleteList);
}

function initPresenterAutoComplete(targetObj) {
	presenterCompleteObject = actb(targetObj, presenterCompleteList);
}

function removeAllCrpAutoCompleteList() {
	for(var i=0; i<crpAutoCompleteList.length; i++) {
		crpAutoCompleteList[i] = "";
	}
}

function removeAllPresenterAutoCompleteList() {
	for(var i=0; i<presenterCompleteList.length; i++) {
		presenterCompleteList[i] = "";
	}
}
function getAutoCompleteData(obj) {
	$j.getScript(actbUrl[obj.name] + "?" + obj.name + "=" + encodeURI(obj.value));
}

// -----------------------------------------------------------------------------
// xcalendar.js
// -----------------------------------------------------------------------------

/*
 * xcalendar.js v1.0
 * ext-js 2.1와 xwindow을 기반으로 작성하였습니다.
 *
 *  1. 화일이름		: xcalendar.js
 *  2. 작성자			: 김상욱
 *  3. 작성일자		: 2008. 07. 29
 *  4. 파일설명		: 윈도우 상자 구현을 위한 스크립트
 *  5. 프로그램 변경 내역
 *     1) 2008.07.29 / 배포 / 최초 포맷 설정
 */

xcalendar = function() {
};

xcalendar.version = "1.0";

xcalendar.dependency = "ext-js 2.1, xwindow";
xcalendar.format = "Ymd";
xcalendar.dummyNo = 0;

/**
 * 캘린더 객체를 생성하여 리턴한다.
 * func : 캘린더의 선택시 실행할 콜백함수 function(obj, date) {...}
 */
xcalendar.createCalendar = function(func) {
	return new Ext.DatePicker({
		okText: "확인",
		cancelText: "취소",
		dayNames: ["일", "월", "화", "수", "목", "금", "토"],
		monthNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
		todayText: "오늘",
		listeners: {
			"select": func
		}
	});
};

/**
 * 캘린더 윈도우 객체를 생성하여 리턴한다.
 *
 * title : 윈도우의 타이틀
 * func : 캘린더의 선택시 실행할 콜백함수 function(date) {...}
 */
xcalendar.createWindow = function(title, func) {
	var no = xcalendar.dummyNo++;
	var id = "xcalDiv_" + no;
	$j(document.body).append("<div id='" + id + "' class='x-hidden'></div>");
	var cal = xcalendar.createCalendar(function(obj, date) {
		func(date.format(xcalendar.format));
	});
	cal.render(id);
	return xwindow.createWindow(title, 198, 228, id, false, false);
};

/**
 * 캘린더를 렌더링한다.
 *
 * cal : 캘린더 객체
 * render : 랜더링할 대상 객체 혹은 그 아이디
 * isVisible : 랜더링 후 랜더링 한 내용을 표시할 것인가 감출것인지 여부
 */
xcalendar.render = function(cal, render, isVisible) {
	cal.render(render);
	if (!isVisible) {
		cal.hide();
	}
};

/**
 * 캘린더 윈도우 객체를 보여준다.
 * left와 top이 생략된 경우에는 이벤트가 발생한 위치에 보여준다.
 *
 * win : 캘린더윈도우
 * left : x좌표
 * top : y좌표
 */
xcalendar.showWindow = function(win, left, top) {
	if (left == null && top == null) {
		var e = this.event;
		if(!e) e = window.event;
		var x = 0;
		var y = 0;
		if (e.pageX || e.pageY) {
		    x = e.pageX;
		    y = e.pageY;
		} else if (e.clientX || e.clientY) {
		    x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		    y = e.clientY + document.body.scrollTop  + document.documentElement.scrollTop;
		}
		left = x;
		top = y;
	}
	xwindow.setPosition(win, left, top);
	xwindow.show(win);
	xwindow.syncSize(win);
};

/**
 * 캘린더 윈도우 객체를 감춘다.
 *
 * win : 캘린더윈도우
 */
xcalendar.hideWindow = function(win) {
	xwindow.hide(win);
};

/**
 * 캘린더 객체를 보여준다.
 *
 * cal : 캘린더
 */
xcalendar.show = function(cal) {
	if (cal == null || cal == "" || cal == "null" ) {
		return;
	}
	cal.show();
};

/**
 * 캘린더 객체를 감춘다.
 *
 * cal : 캘린더
 */
xcalendar.hide = function(cal) {
	if (cal == null || cal == "" || cal == "null" ) {
		return;
	}
	cal.hide();
};

xcalendar.syncSize = function(win, div) {
	xwindow.setSize(win, div);
};

// -----------------------------------------------------------------------------
// xevent.js
// -----------------------------------------------------------------------------

/*
 * xevent.js v1.0
 * ext-js 2.1을 기반으로 작성하였습니다.
 *
 *  1. 화일이름		: xevent.js
 *  2. 작성자			: 김상욱
 *  3. 작성일자		: 2008. 07. 28
 *  4. 파일설명		: 이벤트 구현을 위한 스크립트
 *  5. 프로그램 변경 내역
 *     1) 2008.07.28 / 배포 / 최초 포맷 설정
 */

xevent = function() {
};

xevent.version = "1.0";
xevent.dependency = "ext-js 2.1";

xevent.ready = function(evt) {
	Ext.onReady(evt);
};

// -----------------------------------------------------------------------------
// xmsgbox.js
// -----------------------------------------------------------------------------

/*
 * xmsgbox.js v1.0
 * ext-js 2.1을 기반으로 작성하였습니다.
 *
 *  1. 화일이름		: xmsgbox.js
 *  2. 작성자			: 김상욱
 *  3. 작성일자		: 2008. 07. 24
 *  4. 파일설명		: 메시지 상자 구현을 위한 자바스크립트
 *  5. 프로그램 변경 내역
 *     1) 2008.07.24 / 배포 / 최초 포맷 설정
 */

xmsgbox = function () {
};

xmsgbox.version = "1.0";
xmsgbox.dependency = "ext-js 2.1";

// 메시지박스 아이콘
xmsgbox.ICON_NONE = null;
xmsgbox.ICON_INFO = Ext.MessageBox.INFO;
xmsgbox.ICON_QUESTION = Ext.MessageBox.QUESTION;
xmsgbox.ICON_WARNING = Ext.MessageBox.WARNING;
xmsgbox.ICON_ERROR = Ext.MessageBox.ERROR;

// 국제화 (한글)
Ext.MessageBox.buttonText.yes = "예";
Ext.MessageBox.buttonText.no = "아니오";
Ext.MessageBox.buttonText.cancel = "취소";
Ext.MessageBox.buttonText.ok = "확인";

// 메시지박스 버튼 타입
xmsgbox.BTN_CANCEL = Ext.MessageBox.CANCEL;
xmsgbox.BTN_OK = Ext.MessageBox.OK;
xmsgbox.BTN_OKCANCEL = Ext.MessageBox.OKCANCEL;
xmsgbox.BTN_YESNO = Ext.MessageBox.YESNO;
xmsgbox.BTN_YESNOCANCEL = Ext.MessageBox.YESNOCANCEL;

// 메시지박스 버튼 결과 문자열
xmsgbox.OK = "ok";
xmsgbox.CANCEL = "cancel";
xmsgbox.YES = "yes";
xmsgbox.NO = "no";

xmsgbox.defaultWidth = 300;

xmsgbox.show = function (icon, title, msg, btn) {
	Ext.MessageBox.show({
		title:title,
		msg:msg,
		width:xmsgbox.defaultWidth,
		buttons:btn,
		icon:icon
	});
};

xmsgbox.show = function(icon, title, msg, btn, callback) {
	Ext.MessageBox.show({
		title:title,
		msg:msg,
		width:xmsgbox.defaultWidth,
		buttons:btn,
		icon:icon,
		fn:callback
	});
};

/**
 * Alert 메시지 박스
 */
xmsgbox.alert = function(title, msg, callback) {
	Ext.Msg.alert(title, msg, callback);
};

/**
 * 프롬프트 메시지박스
 *
 * title - 제목
 * msg - 메시지
 * callback - function(text) ; text에 입력한 문자열이 넣어진다.
 */
xmsgbox.prompt = function(title, msg, callback) {
	Ext.Msg.prompt(title, msg, function(btn, text) {
		if (btn == 'ok') {
			callback(text);
		} else {
			callback(null);
		}
	});
};

// -----------------------------------------------------------------------------
// xwindow.js
// -----------------------------------------------------------------------------

/*
 * xwindow.js v1.0
 * ext-js 2.1을 기반으로 작성하였습니다.
 *
 *  1. 화일이름		: xwindow.js
 *  2. 작성자			: 김상욱
 *  3. 작성일자		: 2008. 07. 28
 *  4. 파일설명		: 윈도우 상자 구현을 위한 스크립트
 *  5. 프로그램 변경 내역
 *     1) 2008.07.28 / 배포 / 최초 포맷 설정
 */

xwindow = function () {
};

xwindow.version = "1.0";
xwindow.dependency = "ext-js 2.1";

/**
 * 윈도우 객체를 생성하여 리턴한다.
 * title : 창 제목
 * width, height : 창의 가로와 세로 크기 (픽셀)
 * contentEl : 내용을 담고 있는 div의 id
 */
xwindow.createWindow = function(title, width, height, contentEl, modal, resizable) {
	if (modal == null) {
		modal = false;
	}
	if (resizable == null) {
		resizable = true;
	}
	return new Ext.Window({
		title: title,
		closable: true,
		width: width,
		height: height,
		plain: true,
		layout: 'border',
		closeAction: 'hide',
		modal: modal,
		resizable: resizable,
		items: [
			new Ext.Panel({
				region: 'center',
				border: false,
				contentEl: contentEl
			})
		]
    });
};

xwindow.syncSize = function(win) {
	win.syncSize();
};

xwindow.setSize = function(win, contentEl) {
	win.setSize(document.getElementById(contentEl).offsetWidth + 15, document.getElementById(contentEl).offsetHeight + 35);
};

xwindow.setAnimateTarget = function(win, target) {
	win.setAnimateTarget(target);
};

/**
 * 윈도우를 보여준다.
 */
xwindow.show = function(win) {
	win.show(this);
};

/**
 * 윈도우를 감춘다.
 */
xwindow.hide = function(win) {
	win.hide(this);
};

xwindow.setPosition = function(win, left, top) {
	win.setPosition(left, top);
};

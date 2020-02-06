

/**
 * ================================================================================================
 *
 * 핵심 투자위험 알림
 *
 * ================================================================================================
 */

var winInvestNotice = null;
var divInvestNotice = "winInvestNotice";
var urlInvestNotice = "/report/alertInvestNotice.ax";
var titleInvestNotice = "";
var widthInvestNotice = 760;
var heightInvestNotice = 650;

/**
 * 최초작성일 : 2011.03.15
 * 작성자 : 김미선
 * 핵심 투자위험 알림서비스 팝업
 * 대상 문서 10001\10002\10003\10004\10020\10081\10082\10083\10084\10085
 * 1.대상 보고서 확인
 * 2.결과값이 있는 경우만 팝업 호출
 *
 */

function alertInvestNotice(rcpNo, dcmNo, bsnBgnNo, dcmTp, dcmId, dtd){
	var cookie = getCookie("investNotice");

	if(cookie=="N") return;
	if(dcmId=="10001"||dcmId=="10002"||dcmId=="10003"||dcmId=="10004"
		||dcmId=="10020"
			||dcmId=="10081"||dcmId=="10082"||dcmId=="10083"||dcmId=="10084"||dcmId=="10085"){
		$j(document.body).append('<div id="' + divInvestNotice + '" class="x-hidden"></div>');

		var p = new Ext.Panel({
			width: 750,
			autoScroll: true,
			contentEl: divInvestNotice
		});

		winInvestNotice = new Ext.Window({
        	title: "",
        	closable: false,
            width       : 760,
            height      : 580,
            bodyStyle   : 'padding: 20px',
            layout:'fit',
            items :[p],
            closeAction :'hide',
    		resizable: false
		});//*/

		xajax.initParameter();
		xajax.addParameter("rcpNo", rcpNo);
		xajax.addParameter("dcmNo", dcmNo);
		xajax.addParameter("bsnBgnNo", bsnBgnNo);
		xajax.addParameter("dcmTp", dcmTp);
		xajax.addParameter("dcmId", dcmId);
		xajax.addParameter("dtd", dtd);
		xajax.setTimeout(20000);
		xajax.blockUI = true;
		xajax.blockTarget = "";
		xajax.simpleSend(urlInvestNotice, function(html) {
			if(html == null) return ;
			getRef(divInvestNotice).innerHTML = html;
			xwindow.show(winInvestNotice);

			var cnt = frmInvestNotice.crc_cnt.value;

			var color = "#FFFFFF";

			if(cnt==0){
				getRef("investNoticeContents").style.backgroundColor = "#FFFFFF";
			}else if(cnt==1){
				getRef("investNoticeContents").style.backgroundColor = "#FCFC90";
			}else if(cnt>=2){
				getRef("investNoticeContents").style.backgroundColor = "#FFAFAF";

			}
			winInvestNotice.setPosition(140, 30);
		});


	}

}


function onClickService(){
	if(frmInvestNotice.service.checked){
		setCookie ("investNotice", "N", 3650);
	}else{
		setCookie ("investNotice", "Y", 3650);
	}

}

function onClickRead(){
	if(frmInvestNotice.read.checked){
		winInvestNotice.close();
	}
}

// 정정제출요구가 있고, 1회이상 정정일 경우 (증권신고서 - '제출 및 정정연혁'부터 열람하도록 이동
function onClickRead2(rcpNo, dcmNo, eleId, offset, length, dtd){
	if(frmInvestNotice.read2.checked){
		viewDoc(rcpNo, dcmNo, eleId, offset, length, dtd);
		winInvestNotice.close();
	}
}


/**
 * 최초작성일 : 2011.04.29
 * 2011.09.15	팝업 문구 변경요청
 * 작성자 : 김미선
 * 소액 공모 알림서비스 팝업
 * 대상 문서 10403, 10404, 10431, 10432, 10433, 10434, 10435, 10401, 10402, 10420
 * 1.대상 보고서 확인
 * 2.결과값이 있는 경우만 팝업 호출
 *
 */
var winSmallPublicOffering = null;
var divSmallPublicOffering = "winSmallPublicOffering";
var titleSmallPublicOffering = "";
var cookieSmallPublicOffering = "smallPublicOffering";
function alertSmallPublicOffering(isPop){

	if(getCookie(cookieSmallPublicOffering)=="N") return;
	if(isPop=="Y"){
		var html = "<span style='font-size:17px;font-weight:bold;color:red;'>투자주의!</span>" +
				"<div style='padding:5px; background-color:#FFFF00;  border: 1px #000000 solid; font-size:17px;color:red;margin:15 0 15 0px; '>" +
				"<p>" +
				"▶ 본 소액공모 공시서류는 증권신고서가 아니어서 금융감독원이 " +
				"<span style='font-weight:bold;'>심사하는 절차를 거치지 않으며</span>, " +
				"증권회사 등이 주관회사로 참여하여 " +
				"<span style='font-weight:bold;'>기업실사 등을 수행하지도 않습니다</span>." +
				"</p>"+
				"<p>" +
				"▶ <span style='font-weight:bold;'>청약증거금</span> 납입, 관리, 환급업무를 " +
				"<span style='font-weight:bold;'>금융회사가 수행하는지를 꼭 확인</span>해 주시기 바랍니다. " +
				"(공모회사 은행계좌 등으로 관리하는 경우에는 청약증거금의 횡령 가능성 등에 유의하시기 바랍니다)" +
				"</p>"+
				"<p>" +
				"▶ 상기사항 등을 충분히 고려하여 신중하게  투자하시기 바랍니다. " +
				"</p>"+
				"</div> " +
				"<form id='frmSmallPublicOffering'>" +
				"<div style='padding:5px; font-size:15px;border: 1px #000000 solid; '> 본 주의사항 안내를 원하지 않는 분은 표시하시기 바랍니다." +
				"<input type='checkbox' id='service' onclick='onClickServiceSmallPublicOffering()'/></div>" +
				"</form>"
		$j(document.body).append('<div style="padding:10px; " id="' + divSmallPublicOffering + '" class="x-hidden"></div>');
		///*
		var p = new Ext.Panel({
			width: 660,
			autoScroll: true,
			contentEl: divSmallPublicOffering
		});

		winSmallPublicOffering = new Ext.Window({
	    	title: titleSmallPublicOffering,
	    	closable: true,
	        width       : 595,
	        height      : 350,
	        bodyStyle   : 'padding: 10px',
	        layout:'fit',
	        items :[p],
	        closeAction
	        :'hide',
			resizable: false
		});//*/

		getRef(divSmallPublicOffering).innerHTML = html;
		winSmallPublicOffering.show();

	}

}

function onClickServiceSmallPublicOffering(){
	if(frmSmallPublicOffering.service.checked){
		setCookie (cookieSmallPublicOffering, "N", 3650);
		xwindow.show(winSmallPublicOffering);
		winSmallPublicOffering.close();
	}
}


// * 주주총회소집공고-참고사항
var winChamgoNotice = null;
var divChamgoNotice = "winChamgoNotice";
var urlChamgoNotice = "/report/alertChamgoNotice.ax";
var titleChamgoNotice = "";
var widthChamgoNotice = 760;
var heightChamgoNotice = 650;

/**
 * 최초작성일 : 2018.01.29
 * 작성자 : 서나람
 * 주주총회소집공고 참고사항 알림서비스 팝업
 * 대상 문서 00591
 * 1.대상 보고서 확인
 * 2.결과값이 있는 경우만 팝업 호출
 *
 */
function alertChamgoNotice(rcpNo, dcmNo, dcmId){
	if(dcmId=="00591"){
		$j(document.body).append('<div id="' + divChamgoNotice + '" class="x-hidden"></div>');

		var p = new Ext.Panel({
			width: 750,
			autoScroll: true,
			contentEl: divChamgoNotice
		});

		winChamgoNotice = new Ext.Window({
        	title: "",
        	closable: false,
            width       : 760,
            height      : 480,
            bodyStyle   : 'padding: 20px',
            layout:'fit',
            items :[p],
            closeAction :'hide',
    		resizable: false
		});

		xajax.initParameter();
		xajax.addParameter("rcpNo", rcpNo);
		xajax.addParameter("dcmNo", dcmNo);
		xajax.addParameter("dcmId", dcmId);
		xajax.setTimeout(20000);
		xajax.blockUI = true;
		xajax.blockTarget = "";
		xajax.simpleSend(urlChamgoNotice, function(html) {
			if(html == null) return ;
			getRef(divChamgoNotice).innerHTML = html;
			xwindow.show(winChamgoNotice);
			getRef("chamgoNoticeContents").style.backgroundColor = "#FFFFFF";

			winChamgoNotice.setPosition(140, 75);
		});
	}
}

function onClickRead3(){
	if(frmChamgoNotice.read.checked){
		winChamgoNotice.close();
	}
}

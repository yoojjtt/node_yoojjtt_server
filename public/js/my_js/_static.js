//브라우져 체크
function chk_ie_verions()
{
    var _ua = navigator.userAgent;

    /* IE7,8,9,10,11 */
    if (navigator.appName == 'Microsoft Internet Explorer') {
        var rv = -1;
        var trident = _ua.match(/Trident\/(\d.\d)/i);

        //ie11에서는 MSIE토큰이 제거되고 rv:11 토큰으로 수정됨 (Trident표기는 유지)
        if(trident != null && trident[1] == "7.0") return rv = "IE" + 11;
        if(trident != null && trident[1] == "6.0") return rv = "IE" + 10;
        if(trident != null && trident[1] == "5.0") return rv = "IE" + 9;
        if(trident != null && trident[1] == "4.0") return rv = "IE" + 8;
        if(trident == null) return rv = "IE" + 7;

        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(_ua) != null) rv = parseFloat(RegExp.$1);
        return rv;
    }

    /* etc */
    var agt = _ua.toLowerCase();
    if (agt.indexOf("chrome") 		!= -1) return 'Chrome';
    if (agt.indexOf("opera") 		!= -1) return 'Opera';
    if (agt.indexOf("staroffice") 	!= -1) return 'Star Office';
    if (agt.indexOf("webtv") 		!= -1) return 'WebTV';
    if (agt.indexOf("beonex") 		!= -1) return 'Beonex';
    if (agt.indexOf("chimera") 		!= -1) return 'Chimera';
    if (agt.indexOf("netpositive") 	!= -1) return 'NetPositive';
    if (agt.indexOf("phoenix") 		!= -1) return 'Phoenix';
    if (agt.indexOf("firefox") 		!= -1) return 'Firefox';
    if (agt.indexOf("safari") 		!= -1) return 'Safari';
    if (agt.indexOf("skipstone") 	!= -1) return 'SkipStone';
    if (agt.indexOf("netscape") 	!= -1) return 'Netscape';
    if (agt.indexOf("mozilla/5.0") 	!= -1) return 'Mozilla';
}

//os체크
function getOSInfoStr()
{
    var ua = navigator.userAgent;

    if(ua.indexOf("NT 6.2") 		!= -1) return "Windows 8";
    else if(ua.indexOf("NT 6.1") 	!= -1) return "Windows 7";
    else if(ua.indexOf("NT 6.0") 	!= -1) return "Windows Vista/Server 2008";
    else if(ua.indexOf("NT 5.2") 	!= -1) return "Windows Server 2003";
    else if(ua.indexOf("NT 5.1") 	!= -1) return "Windows XP";
    else if(ua.indexOf("NT 5.0") 	!= -1) return "Windows 2000";
    else if(ua.indexOf("NT") 		!= -1) return "Windows NT";
    else if(ua.indexOf("9x 4.90") 	!= -1) return "Windows Me";
    //else if(ua.indexOf("98") 		!= -1) return "Windows 98";
    else if(ua.indexOf("Android") 	!= -1) return "Android";
    //else if(ua.indexOf("95") 		!= -1) return "Windows 95";
    else if(ua.indexOf("Win16") 	!= -1) return "Windows 3.x";
    else if(ua.indexOf("Windows") 	!= -1) return "Windows";
    else if(ua.indexOf("Linux") 	!= -1) return "Linux";
    else if(ua.indexOf("Macintosh") != -1) return "Macintosh";
    else if(ua.indexOf("iPad") 		!= -1) return "iPad";
    else return "";
}

//쿠키 생성 ------
function set_Cookie(cName, cValue, cDay){
    var expire = new Date();
    expire.setDate(expire.getDate() + cDay);
    cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
    if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
    document.cookie = cookies;
}

// 쿠키 확인 ------
function get_Cookie(cName)
{
    cName = cName + '=';
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cName);
    var cValue = '';
    if(start != -1){
        start += cName.length;
        var end = cookieData.indexOf(';', start);
        if(end == -1)end = cookieData.length;
        cValue = cookieData.substring(start, end);
    }
    return unescape(cValue);
}

function deleteCookie(cookieName)
{
    var expireDate = new Date();

    //어제 날짜를 쿠키 소멸 날짜로 설정한다.
    expireDate.setDate( expireDate.getDate() - 1 );
    document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString() + "; path=/";
}

function ajaxFileUpload(_attachType, _relativeKey, _thumb_width, _thumb_height, _returnFn)
{
    var select_file = $('#uploaded_file').val();
    var ext = $('#uploaded_file').val().split('.').pop().toLowerCase();

    if(select_file == '')
    {
        alert('업로드 할 파일을 선택해 주세요.');
        $('#uploaded_file').focus();
        return;
    }

    if($.inArray(ext, ['png','gif','jpg','jpeg']) == -1) {
        alert('업로드는 이미지파일(png,jpg,gif)만 가능합니다.');
        return;
    }

    $("#loading").ajaxStart(function(){
        $(this).show();
    }).ajaxComplete(function(){
        $(this).hide();
    });

    var ins_id = get_Cookie('ss_userId');
    var send_url = "/m/fileUpload/S";
    $.ajaxFileUpload({
        url:send_url,
        secureuri:false,
        fileElementId:'uploaded_file',
        dataType: 'jsonp',
        data:{
            ins_id:ins_id,
            attachType:_attachType,
            relativeKey:_relativeKey,
            thumb_height:_thumb_height,
            thumb_width:_thumb_width },

        success: function (data, status) {

            if(typeof(data.error_no) != 'undefined')
            {
                if(data.error_no != 0) {
                    alert(data.error_no);
                }else {
                    alert(data.msg);
                }
            }

            _returnFn(data);

        },
        error: function (data, status, e) {
            //alert(e);
        }

    });

    return false;

}

function random_number(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
}

/** 매칭단어 변경 **/
function CStr_change(str, sName, tDay, tMoney) {

    if(str == undefined) { return; }

    //var pattern = /\{([a-zA-Z]+),[\W]*([^,]+),[\W]*([A-Z]+)\}/g;
    var pattern = /\{학원명\}|{원생\}|{납부�
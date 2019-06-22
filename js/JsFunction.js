
//检查是否为整数
function IsNumeric(str) 
{
    var reg = /^[0-9]*[1-9][0-9]*$/; 
    var r = str.match(reg);
	
    if(r==null)
        return false; 
    else
        return true;
}

//检查是否为任意数（实数）
function IsDecimal(str) 
{
    var reg = /^(-|\+)?\d+(\.\d+)?$/   ;
    var r = str.match(reg);
	
    if(r==null)
        return false; 
    else
        return true;
}
            
//判断是否整数
//用于文本框限制输入的数字类型
function FltIsNumeric(obj) 
{
	var e=window.event;   
    code=e.keyCode;   
    if(code >=48 && code <=57)
    {
        return true;   
    }
    else if(code == 109 || code == 189 && obj.value.indexOf("-") == -1)
    {
        return true;
    }
    else
    {
        window.event.keyCode=null;
        return false;
    } 
}

function FltIsNumeric2(obj)
{   
    var sValue = obj.value;

    if(isdigit(sValue) == 0)
    {
        alert("此文本框只能输入正数！\r\n\r\n请注意是否使用了中文输入法，如使用，请关闭！");
        obj.value = "0";
        return "";
    }
    return "ok";
} 

function FltIsNumericchange(obj)
{   
    var sValue = obj.value;

    if(isdigit(sValue) == 0)
    {
        alert("此文本框只能输入正数！\r\n\r\n请注意是否使用了中文输入法，如使用，请关闭！");
        obj.value = "0";
    }
} 

//判断是否任意数（实数）
//用于文本框限制输入的数字类型
function FltIsDecimal(obj)
{   
    var e=window.event;   
    code=e.keyCode; 

    if(code >=48 && code <=57)
    {
        return true;   
    }
    else if(code == 46 && obj.value.indexOf(".")==-1)
    {
        return true;
    }
    else if(code == 45 && obj.value.indexOf("-")==-1)
    {
        return true;
    }
    else if(code == 109 || code == 189 && obj.value.indexOf("-") == -1)
    {
        return true;
    }
    else
    {
        window.event.keyCode=null;
        return false;
    }   
} 

function FltIsDecimal2(obj)
{   
    var sValue = obj.value.replace(".", "").replace("-", "");

    if(isdigit(sValue) == 0)
    {
        alert("此文本框只能输入数字！\r\n\r\n请注意是否使用了中文输入法，如使用，请关闭！");
        obj.value = "0";
        return "";
    }
    return "ok";
} 

function isdigit(s)
{
    var r,re;
    re = /\d*/i; //\d表示数字,*表示匹配多个数字
    r = s.match(re);
    return (r==s)?1:0;
}
    
function FltIsDecimalchange(obj)
{   
    var sValue = obj.value.replace(".", "").replace("-", "");

    if(isdigit(sValue) == 0)
    {
        alert("此文本框只能输入数字！\r\n\r\n请注意是否使用了中文输入法，如使用，请关闭！");
        obj.value = "0";
    }
} 

//数字 千分位 分隔符
function CommaSplit(srcNumber) 
{
    var txtNumber = '' + srcNumber;
    if (isNaN(txtNumber) || txtNumber == "") 
    {
        alert("Oops!  That does not appear to be a valid number.  Please try again.");
        fieldName.select();
        fieldName.focus();
    }
    else 
    {
        var rxSplit = new RegExp('([0-9])([0-9][0-9][0-9][,.])');
        var arrNumber = txtNumber.split('.');
        arrNumber[0] += '.';
        do {
        arrNumber[0] = arrNumber[0].replace(rxSplit, '$1,$2');
        } while (rxSplit.test(arrNumber[0]));
        if (arrNumber.length > 1) {
        return arrNumber.join('');
        }
        else 
        {
            return arrNumber[0].split('.')[0];
        }
    }
}

//数字转换成金额大写
function MoneyTransform(n)
{
    if(typeof(n) == "number")
    {
        if(-1 == n.toString().indexOf("."))
        {
            return MoneyTransSeti2c(n);
        }
        else
        {
            var i,istr,f,fstr,a,rstr;
            a = n.toString().split(".");
            i = a[0];
            f = a[1];
            istr = MoneyTransSeti2c(i);
            fstr = MoneyTransSetf2c(f);
            rstr = istr+fstr;
            rstr = rstr.replace(/^圆/,"");
            return rstr;
        }
    }
    else
    {
        return "---";
    }
}

function MoneyTransSeti2c(n)
{
    var ns = n.toString();
    var tempstr = "";
    for(var i=1;i<ns.length+1;i++)
    {
    switch(i)
    {
        case 1:
            var t = ns.substr(ns.length-i,1);
            if(t!="0")
            {
                tempstr = t+"圆"+tempstr;
            }
            else
            {
                tempstr = "圆"+tempstr;
            }
            break;
        case 2:
            var t = ns.substr(ns.length-i,1);
            if(t!="0")
            {
            tempstr = t+"拾"+tempstr;
            }
            else
            {
            tempstr = "0"+tempstr;
            }
            break;
        case 3:
            var t = ns.substr(ns.length-i,1);
            if(t!="0")
            {
                tempstr = t+"佰"+tempstr;
            }
            else
            {
                tempstr = "0"+tempstr;
            }
            break;
        case 4:
            var t = ns.substr(ns.length-i,1);
            if(t!="0")
            {
                tempstr = t+"仟"+tempstr;
            }
            else
            {
                tempstr = "0"+tempstr;
            }
            break;
        case 5:
            var t = ns.substr(ns.length-i,1);
            if(t!="0")
            {
                tempstr = t+"万"+tempstr;
            }
            else
            {
                tempstr = "万"+tempstr;
            }
            break;
        case 6:
            var t = ns.substr(ns.length-i,1);
            if(t!="0")
            {
                tempstr = t+"拾"+tempstr;
            }
            else
            {
                tempstr = "0"+tempstr;
            }
            break;
        case 7:
            var t = ns.substr(ns.length-i,1);
            if(t!="0")
            {
                tempstr = t+"佰"+tempstr;
            }
            else
            {
                tempstr = "0"+tempstr;
            }
            break;
        case 8:
            var t = ns.substr(ns.length-i,1);
            if(t!="0")
            {
                tempstr = t+"仟"+tempstr;
            }
            else
            {
                tempstr = "0"+tempstr;
            }
            break;
        case 9:
            var t = ns.substr(ns.length-i,1);
            if(t!="0")
            {
                tempstr = t+"亿"+tempstr;
            }
            else
            {
                tempstr = "亿"+tempstr;
            }
            break;
        case 10:
            var t = ns.substr(ns.length-i,1);
            if(t!="0")
            {
                tempstr = t+"拾"+tempstr;
            }
            else
            {
                tempstr = "0"+tempstr;
            }
            break;
        case 11:
            var t = ns.substr(ns.length-i,1);
            if(t!="0")
            {
                tempstr = t+"佰"+tempstr;
            }
            else
            {
                tempstr = "0"+tempstr;
            }
            break;
        case 12:
            var t = ns.substr(ns.length-i,1);
            if(t!="0")
            {
                tempstr = t+"仟"+tempstr;
            }
            else
            {
                tempstr = "0"+tempstr;
            }
            break;
            default:break;
        }
    }
    return MoneyTransG2b(tempstr);
}

function MoneyTransSetf2c(n)
{
    var ns = n.toString();
    var tempstr = "";
    for(var i=0;i<ns.length;i++)
    {
        switch(i)
        {
            case 0:
                var t = ns.substr(i,1);
                if(t!="0")
                {
                    tempstr += t+"角";
                }
                else
                {
                    tempstr += "0";
                }
                break;
            case 1:
                var t = ns.substr(i,1);
                if(t!="0")
                {
                    tempstr += t+"分";
                }
                break;
            default:break;
        }
    }
    return MoneyTransG2b(tempstr);
}

function MoneyTransG2b(s)
{
    rs = s.replace(/0+/g,"0");
    rs = rs.replace(/0(圆|万|亿)/g,"$1");
    rs = rs.replace("亿万","亿");
    rs = rs.replace(/0/g,"零");
    rs = rs.replace(/1/g,"壹");
    rs = rs.replace(/2/g,"贰");
    rs = rs.replace(/3/g,"叁");
    rs = rs.replace(/4/g,"肆");
    rs = rs.replace(/5/g,"伍");
    rs = rs.replace(/6/g,"陆");
    rs = rs.replace(/7/g,"柒");
    rs = rs.replace(/8/g,"捌");
    rs = rs.replace(/9/g,"玖");
    return rs;
}


/******************************************************
描述：	去掉字符串的前后空格
返回：	
参数：	sVal要处理的字符串

******************************************************/
function trimStr(sVal) {
    var m = sVal.match(/^\s*(\S+(\s+\S+)*)\s*$/);
    return (m == null) ? "" : m[1];
}
/******************************************************		
描述：	执行服务器端的程序文件

返回：	成功则返回程序执行结果。失败则返回-1
参数：	strPrgmURL	程序文件路径
strMethod	发送方法（POST或GET）

strParamString POST方法时的参数字符串

使用方法:  
var strResult = ExecServerPrgm("xxx.aspx", "POST", escape("xxxxxx"));
******************************************************/
function ExecServerPrgm(strPrgmURL, strMethod, strParamString, strUserID, strPwd) {
    try {
        var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        if (strUserID != "" && strUserID != null)
            xmlhttp.Open(strMethod, strPrgmURL, false, strUserID, strPwd);
        else
            xmlhttp.Open(strMethod, strPrgmURL, false);

        if (strMethod.toUpperCase() == 'POST') {
            xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xmlhttp.Send(strParamString);
        } else {
            xmlhttp.Send();
        }
        if (xmlhttp.status == 200)
            return unescape(trimStr(xmlhttp.responseText));
        else
            return -1;
    } catch (e) {
        return -1;
    }
}
//获取Http对象，支持多种浏览器
function getXMLHttpRequest() {
    var xmlhttp;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}

/******************************************************	
作用：从网络上返回数据流。
url：网络地址
sendCont：提交的数据内容
openType：提交类型  "get"  "post"
iType：返回的数据类型  1--字符串  2--二进制流 3--xml字符串
param1：扩展参数
return  数据流 
******************************************************/
function getDataStreamFromURL(url, sendCont, openType, iType, param1) {
    var ret = null;
    var xmlHttpObj = getCommonXMLHttpObject(); // new ActiveXObject("Microsoft.xmlHttp");
    if (xmlHttpObj == null) {
        window.alert("请确认你的机器上安装了Microsoft.xmlHttp。");
        return null;
    }
    try {
        xmlHttpObj.open(openType, url, false);
        xmlHttpObj.setRequestHeader("Content-Type", "text/xml;charset=GBK");
        xmlHttpObj.send(sendCont);
    }
    catch (e) {
        window.alert("连接服务器出现异常，请及时与系统管理员联系！");
        xmlHttpObj = null;
        return null;
    }
    var retStatus = xmlHttpObj.status;
    if (retStatus == 200) {
        if (iType == 1) {
            ret = xmlHttpObj.responseText;
        }
        else if (iType == 2) {
            ret = xmlHttpObj.responseBody;
        }
        else if (iType == 3) {
            ret = xmlHttpObj.responseXML.xml;
        }
    }
    else {
        window.alert("连接服务器出现异常[返回的代码：" + retStatus + "]，请及时与系统管理员联系！");
        ret = null;
    }
    xmlHttpObj = null;
    return ret;
}
function getCommonXMLHttpObject()//创建请求对象
{
    try {
        if (window.ActiveXObject) // IE5或者IE6
        {
            return new ActiveXObject("Microsoft.XMLHTTP");
        }
        else if (window.XMLHttpRequest) //IE7
        {
            return new XMLHttpRequest();
        }
    }
    catch (ex) {
        alert('Exception in CreateXmlHttpRequest: ' + ex);
    }
    return null;
}
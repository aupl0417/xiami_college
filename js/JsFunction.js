
//����Ƿ�Ϊ����
function IsNumeric(str) 
{
    var reg = /^[0-9]*[1-9][0-9]*$/; 
    var r = str.match(reg);
	
    if(r==null)
        return false; 
    else
        return true;
}

//����Ƿ�Ϊ��������ʵ����
function IsDecimal(str) 
{
    var reg = /^(-|\+)?\d+(\.\d+)?$/   ;
    var r = str.match(reg);
	
    if(r==null)
        return false; 
    else
        return true;
}
            
//�ж��Ƿ�����
//�����ı��������������������
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
        alert("���ı���ֻ������������\r\n\r\n��ע���Ƿ�ʹ�����������뷨����ʹ�ã���رգ�");
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
        alert("���ı���ֻ������������\r\n\r\n��ע���Ƿ�ʹ�����������뷨����ʹ�ã���رգ�");
        obj.value = "0";
    }
} 

//�ж��Ƿ���������ʵ����
//�����ı��������������������
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
        alert("���ı���ֻ���������֣�\r\n\r\n��ע���Ƿ�ʹ�����������뷨����ʹ�ã���رգ�");
        obj.value = "0";
        return "";
    }
    return "ok";
} 

function isdigit(s)
{
    var r,re;
    re = /\d*/i; //\d��ʾ����,*��ʾƥ��������
    r = s.match(re);
    return (r==s)?1:0;
}
    
function FltIsDecimalchange(obj)
{   
    var sValue = obj.value.replace(".", "").replace("-", "");

    if(isdigit(sValue) == 0)
    {
        alert("���ı���ֻ���������֣�\r\n\r\n��ע���Ƿ�ʹ�����������뷨����ʹ�ã���رգ�");
        obj.value = "0";
    }
} 

//���� ǧ��λ �ָ���
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

//����ת���ɽ���д
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
            rstr = rstr.replace(/^Բ/,"");
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
                tempstr = t+"Բ"+tempstr;
            }
            else
            {
                tempstr = "Բ"+tempstr;
            }
            break;
        case 2:
            var t = ns.substr(ns.length-i,1);
            if(t!="0")
            {
            tempstr = t+"ʰ"+tempstr;
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
                tempstr = t+"��"+tempstr;
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
                tempstr = t+"Ǫ"+tempstr;
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
                tempstr = t+"��"+tempstr;
            }
            else
            {
                tempstr = "��"+tempstr;
            }
            break;
        case 6:
            var t = ns.substr(ns.length-i,1);
            if(t!="0")
            {
                tempstr = t+"ʰ"+tempstr;
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
                tempstr = t+"��"+tempstr;
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
                tempstr = t+"Ǫ"+tempstr;
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
                tempstr = t+"��"+tempstr;
            }
            else
            {
                tempstr = "��"+tempstr;
            }
            break;
        case 10:
            var t = ns.substr(ns.length-i,1);
            if(t!="0")
            {
                tempstr = t+"ʰ"+tempstr;
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
                tempstr = t+"��"+tempstr;
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
                tempstr = t+"Ǫ"+tempstr;
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
                    tempstr += t+"��";
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
                    tempstr += t+"��";
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
    rs = rs.replace(/0(Բ|��|��)/g,"$1");
    rs = rs.replace("����","��");
    rs = rs.replace(/0/g,"��");
    rs = rs.replace(/1/g,"Ҽ");
    rs = rs.replace(/2/g,"��");
    rs = rs.replace(/3/g,"��");
    rs = rs.replace(/4/g,"��");
    rs = rs.replace(/5/g,"��");
    rs = rs.replace(/6/g,"½");
    rs = rs.replace(/7/g,"��");
    rs = rs.replace(/8/g,"��");
    rs = rs.replace(/9/g,"��");
    return rs;
}


/******************************************************
������	ȥ���ַ�����ǰ��ո�
���أ�	
������	sValҪ������ַ���

******************************************************/
function trimStr(sVal) {
    var m = sVal.match(/^\s*(\S+(\s+\S+)*)\s*$/);
    return (m == null) ? "" : m[1];
}
/******************************************************		
������	ִ�з������˵ĳ����ļ�

���أ�	�ɹ��򷵻س���ִ�н����ʧ���򷵻�-1
������	strPrgmURL	�����ļ�·��
strMethod	���ͷ�����POST��GET��

strParamString POST����ʱ�Ĳ����ַ���

ʹ�÷���:  
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
//��ȡHttp����֧�ֶ��������
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
���ã��������Ϸ�����������
url�������ַ
sendCont���ύ����������
openType���ύ����  "get"  "post"
iType�����ص���������  1--�ַ���  2--�������� 3--xml�ַ���
param1����չ����
return  ������ 
******************************************************/
function getDataStreamFromURL(url, sendCont, openType, iType, param1) {
    var ret = null;
    var xmlHttpObj = getCommonXMLHttpObject(); // new ActiveXObject("Microsoft.xmlHttp");
    if (xmlHttpObj == null) {
        window.alert("��ȷ����Ļ����ϰ�װ��Microsoft.xmlHttp��");
        return null;
    }
    try {
        xmlHttpObj.open(openType, url, false);
        xmlHttpObj.setRequestHeader("Content-Type", "text/xml;charset=GBK");
        xmlHttpObj.send(sendCont);
    }
    catch (e) {
        window.alert("���ӷ����������쳣���뼰ʱ��ϵͳ����Ա��ϵ��");
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
        window.alert("���ӷ����������쳣[���صĴ��룺" + retStatus + "]���뼰ʱ��ϵͳ����Ա��ϵ��");
        ret = null;
    }
    xmlHttpObj = null;
    return ret;
}
function getCommonXMLHttpObject()//�����������
{
    try {
        if (window.ActiveXObject) // IE5����IE6
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
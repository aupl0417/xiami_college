// object.js

function stringTrim(data)
{
	var reg = /^\s*|\s*$/g;
	return data.replace(reg,"");
}

//把读出来的innerHTML变成innerText
function HTMLToText(s){
	s = s.replace(/&nbsp;/gi," ");
	//while (/\s\s/.test(s))
	//	s = s.replace("&nbsp; ",/\s\s/);
	return s.replace(/&amp;/gi,"&").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/<BR>/gi, "\n").replace(/<\/?[^>]+>/gi,"");;
}
//把text变成html写入innerHTML
function convertTextToHTML(s) {
	s = s.replace(/\&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<BR>");
	while (/\s\s/.test(s))
		s = s.replace(/\s\s/, "&nbsp; ");
	return s.replace(/\s/g, " ");
}

function replaceTag(text)
{
	if ( typeof( text ) != "string" )
		text = text.toString() ;

	text = text.replace(/&/g, "&amp;") ;
	text = text.replace(/"/g, "&quot;") ;
	text = text.replace(/</g, "&lt;") ;
	text = text.replace(/>/g, "&gt;") ;
	text = text.replace(/'/g, "&#39;") ;

	return text ;
}
function reverseTag(str)
{
	if ( typeof( str ) != "string" )
		str = str.toString() ;

	str = str.replace(/&nbsp;/g," ");
	str = str.replace(/&amp;/g,"&");
	str = str.replace(/&quot;/g,"\"");
	str = str.replace(/&lt;/g,"<");
	str = str.replace(/&gt;/g,">");

	return str ;
}

/* xml操作
*/
var _SARISSA_IS_IE = (navigator.userAgent.toLowerCase().indexOf("msie") > -1)?true:false;
var _SARISSA_IS_MOZ = (document.implementation && document.implementation.createDocument)?true:false;
var _sarissa_iNsCounter = 0;
var _SARISSA_IEPREFIX4XSLPARAM = "";
if (_SARISSA_IS_MOZ)
{
    //============================================
    // Section: Factory methods for Moz
    //============================================
    // @param sUri the namespace of the root node (if any)
    // @param sUri the local name of the root node (if any)
    // @return a DOM Document
    Sarissa.getDomDocument = function()
    {
            var oDoc = document.implementation.createDocument("", "", null);
            oDoc.addEventListener("load", _sarissa__XMLDocument_onload, false);
            return oDoc;
    };
    Sarissa.getDomDocument = function(sUri, sName)
    {
            var oDoc = document.implementation.createDocument(sUri, sName, null);
            oDoc.addEventListener("load", _sarissa__XMLDocument_onload, false);
            return oDoc;
    };
    // AFAIK, the object behaves exactly like 
    // IE's IXMLHTTPRequest)
    // @return a XmlHttpRequst object suitable for Moz
    Sarissa.getXmlHttpRequest = function()
    {
            return new XMLHttpRequest();
    };
    //============================================
    // Section: utility functions for internal use
    //============================================
    // Attached by an event handler to the load event.
    function _sarissa__XMLDocument_onload()
    {
            _sarissa_loadHandler(this);
    };
    // Ensures the document was loaded correctly, otherwise sets the parseError to -1
    // to indicate something went wrong.
    function _sarissa_loadHandler(oDoc)
    {
            if (!oDoc.documentElement || oDoc.documentElement.tagName == "parsererror")
                    oDoc.parseError = -1;
            _sarissa_setReadyState(oDoc, 4);
    };
    // Sets the readyState property
    function _sarissa_setReadyState(oDoc, iReadyState) 
    {
            oDoc.readyState = iReadyState;
            if (oDoc.onreadystatechange != null && typeof oDoc.onreadystatechange == "function")
                    oDoc.onreadystatechange();
    };
    
    XMLDocument.prototype._sarissa_clearDOM = function()
    {
            while(this.hasChildNodes())
                    this.removeChild(this.firstChild);
    }
    // Replaces the contents of the object with the contents of 
    // the object given as the parameter
    XMLDocument.prototype._sarissa_copyDOM = function(oDoc)
    {
            this._sarissa_clearDOM();
            // importNode is not yet needed in Moz due to a bug but it will be 
            // fixed so...
        var oNodes = oDoc.childNodes;
        for(i=0;i<oNodes.length;i++)
              this.appendChild(this.importNode(oNodes[i], true));
    };
    var _SARISSA_WSMULT = new RegExp("^\\s*|\\s*$", "g");
    var _SARISSA_WSENDS = new RegExp("\\s\\s+", "g");
    function _sarissa_normalizeText(sIn)
    {
            return sIn.replace(_SARISSA_WSENDS, " ").replace(_SARISSA_WSMULT, " ");
    }
    //============================================
    // Section: Extending Mozilla's DOM implementation 
    // to emulate IE extentions
    //============================================
    // Parses the String given as parameter to build the document content
    // for the object, exactly like IE's loadXML().
    // @return the old contents serialized to String (xml)
    XMLDocument.prototype.loadXML = function(strXML) 
    {
            _sarissa_setReadyState(this, 1);
            var sOldXML = this.xml;
            var oDoc = (new DOMParser()).parseFromString(strXML, "text/xml");
            _sarissa_setReadyState(this, 2);
            this._sarissa_copyDOM(oDoc);
            _sarissa_setReadyState(this, 3);
            _sarissa_loadHandler(this);
            return sOldXML;
    };
    // Emulates IE's xml property. Gives an XML serialization of the DOM Object
    XMLDocument.prototype.__defineGetter__("xml", function ()
    {
            return (new XMLSerializer()).serializeToString(this);
    });
    // Emulates IE's xml property. Gives an XML serialization of the DOM Object
    Node.prototype.__defineGetter__("xml", function ()
    {
            return (new XMLSerializer()).serializeToString(this);
    });
    // Ensures and informs the xml property is read only
    XMLDocument.prototype.__defineSetter__("xml", function ()
    {
            throw "Invalid assignment on read-only property 'xml'. Hint: Use the 'loadXML(String xml)' method instead. (original exception: "+e+")";
    });
    // Emulates IE's innerText (write). Note that this removes all childNodes of 
    // an Element and just replaces it with a textNode
    HTMLElement.prototype.__defineSetter__("innerText", function (sText)
    {
            var s = "" + sText;
            this.innerHTML = s.replace(/\&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    });
    // Emulate IE's innerText (read). Gives the concatenation of all text nodes under the Element
    HTMLElement.prototype.__defineGetter__("innerText", function ()
    {
            return _sarissa_normalizeText(this.innerHTML.replace(/<[^>]+>/g,""));
    });
    // Emulate IE's onreadystatechange attribute 
    // used as a listener to the onreadystatechange event (also emulated)
    Document.prototype.onreadystatechange = null;
    // Emulate IE's parseError attribute
    Document.prototype.parseError = 0;
    // Emulates IE's readyState property, which always gives an integer from 0 to 4:
    // 1 == LOADING
    // 2 == LOADED
    // 3 == INTERACTIVE
    // 4 == COMPLETED 
    XMLDocument.prototype.readyState = 0;
    // Emulates IE's async property. It controls whether loading of 
    // remote XML files works synchronously or asynchronously.
    // NOTE: setting async to false will only work with documents 
    // called over HTTP (meaning a server), not the local file system,
    // unless you are using Moz 1.4.
    // BTW the try>catch block is for 1.4; I haven't found a way to check if the property is implemented without 
    // causing an error and I dont want to use user agent stuff for that...
    try{
            XMLDocument.prototype.async = true;
    }catch(e){/*trap*/}
    // Keeps a handle to the original load() method
    XMLDocument.prototype._sarissa_load = XMLDocument.prototype.load;
    /** Extends the load method to provide synchronous loading
    * using an XMLHttpRequest object (if async is set to false)
    * @return the DOM Object as it was before the load() call (may be empty)
    */
	XMLDocument.prototype.load = function(sURI)
    {
            var oDoc = document.implementation.createDocument("", "", null);
            oDoc._sarissa_copyDOM(this);
            this.parseError = 0;
            _sarissa_setReadyState(this, 1);
            try
            {
                    if(this.async == false)
                    {
                            var tmp = new XMLHttpRequest();
                            tmp.open("GET", sURI, false);
                            tmp.overrideMimeType("text/xml");
                            tmp.send(null);
                            _sarissa_setReadyState(this, 2);
                            this._sarissa_copyDOM(tmp.responseXML);
                            _sarissa_setReadyState(this, 3);
                    }
                    else
                            this._sarissa_load(sURI);
            }
            catch (objException)
            {
                    this.parseError = -1;
            }
            finally
            {
                    _sarissa_loadHandler(this);
            }
            return oDoc;
    }; 
    // Emulate IE's transformNodeToObject
    Document.prototype.transformNodeToObject = function(xslDoc, oResult)
    {
            var xsltProcessor = null;
            try
            {
                xsltProcessor = new XSLTProcessor();
                if(xsltProcessor.reset)
                {
                            // new nsIXSLTProcessor is available
                            xsltProcessor.importStylesheet(xslDoc);
                            var newFragment = xsltProcessor.transformToFragment(this, oResult);
                            oResult._sarissa_copyDOM(newFragment);
        }
        else
                {
                            // only nsIXSLTProcessorObsolete is available
                            xsltProcessor.transformDocument(this, xslDoc, oResult, null);
        }
            }
            catch(e)
            {
                    if(xslDoc && oResult)
                            throw "Sarissa_TransformNodeToObjectException: Failed to transform document. (original exception: "+e+")";
                    else if(!xslDoc)
                            throw "Sarissa_TransformNodeToObjectException: No Stylesheet Document was provided. (original exception: "+e+")";
                    else if(!oResult)
                            throw "Sarissa_TransformNodeToObjectException: No Result Document was provided. (original exception: "+e+")";
                    else if(xsltProcessor == null)
                        throw "Sarissa_XSLTProcessorNotAvailableException: Could not instantiate an XSLTProcessor object. (original exception: "+e+")";
                    else
                        throw e;
            }
    };
    // Emulate IE's transformNode() method. Gives the result XML serialised to a String
    Document.prototype.transformNode = function(xslDoc)
    {
            var out = document.implementation.createDocument("", "", null);
            this.transformNodeToObject(xslDoc, out);
            var str = null;
            try
            {
                    var serializer = new XMLSerializer();
                    str = serializer.serializeToString(out);
            }
            catch(e)
            {
                    throw "Sarissa_TransformNodeException: Failed to serialize result document. (original exception: "+e+")";
            }
            return str;
    };
    // Extend the Array to behave as a NodeList     
    Array.prototype.item = function(i)
    {
            return this[i];
    };
    // add IE's expr property
    Array.prototype.expr = "";
    // dummy, used to accept IE's stuff without throwing errors
    XMLDocument.prototype.setProperty  = function(x,y){};
    // Emulate IE's selectNodes
    XMLDocument.prototype.selectNodes = function(sExpr, contextNode)
    {
            var oResult = this.evaluate(sExpr, (contextNode?contextNode:this),
                                                    this.createNSResolver(this.documentElement),
                                                    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            var nodeList = new Array(oResult.snapshotLength);
            nodeList.expr = sExpr;
            for(i=0;i<nodeList.length;i++)
                    nodeList[i] = oResult.snapshotItem(i);
            return nodeList;
    };
    Element.prototype.selectNodes = function(sExpr)
    {
            var doc = this.ownerDocument;
            if(doc.selectNodes)
                    return doc.selectNodes(sExpr, this);
            else
                    throw "SarissaXPathOperationException: Method selectNodes is only supported by XML Nodes";
    };
    // Emulate IE's selectSingleNode
    XMLDocument.prototype.selectSingleNode = function(sExpr, contextNode)
    {
            var ctx = contextNode?contextNode:null;
            sExpr += "[1]";
            var nodeList = this.selectNodes(sExpr, ctx);
            if(nodeList.length > 0)
            {
	        return nodeList[0];
	}
            else 
                    return null;
    };
    Element.prototype.selectSingleNode = function(sExpr)
    {
            var doc = this.ownerDocument;
            if(doc.selectSingleNode)
                    return doc.selectSingleNode(sExpr, this);
            else
                    throw "SarissaXPathOperationException: Method selectSingleNode is only supported by XML Nodes. (original exception: "+e+")";
    };
	XMLDocument.prototype.selectSingleNode = function(tagname) {
		var result = this.evaluate(tagname, this, null, 0, null);
		return result.iterateNext();
	}
	function __XMLNodes(result) {
		this.length = 0;
		this.pointer = 0;
		this.array = new Array();
		var i = 0;
		while((this.array[i]=result.iterateNext())!=null)
			i++;
		this.length = this.array.length;
	}
/*	XMLNodes.prototype.nextNode = function() {
		this.pointer++;
		return this.array[pointer-1];
	}
	XMLNodes.prototype.reset = function() {
		this.pointer = 0;
	}*/
	XMLDocument.prototype.selectNodes = function(tagname) {
		var result = this.evaluate(tagname, this, null, 0, null);
		var xns = new __XMLNodes(result);
		return xns;
	}
}
else if (_SARISSA_IS_IE)
{
        //============================================
        // Section: IE Initialization
        //============================================
        // Add NodeType constants; missing in IE4, 5 and 6
        if(!window.Node)
        {
                var Node = {
                        ELEMENT_NODE: 1,
                        ATTRIBUTE_NODE: 2,
                        TEXT_NODE: 3,
                        CDATA_SECTION_NODE: 4,
                        ENTITY_REFERENCE_NODE: 5,
                        ENTITY_NODE: 6,
                        PROCESSING_INSTRUCTION_NODE: 7,
                        COMMENT_NODE: 8,
                        DOCUMENT_NODE: 9,
                        DOCUMENT_TYPE_NODE: 10,
                        DOCUMENT_FRAGMENT_NODE: 11,
                        NOTATION_NODE: 12
                }
        }
        // for XSLT parameter names
        _SARISSA_IEPREFIX4XSLPARAM = "xsl:";
        // used to store the most recent ProgID available out of the above
        var _SARISSA_DOM_PROGID = "";
        var _SARISSA_XMLHTTP_PROGID = "";
        // used to pick most recent ProgIDs
        function pickRecentProgID(idList)
        {
                // found progID flag
                var bFound = false;
                for (var i=0; i < idList.length && !bFound; i++)
                {
                        try
                        {
                                var oDoc = new ActiveXObject(idList[i]);
                                o2Store = idList[i];
                                bFound = true;
                        }
                        catch (objException)
                        {
                                // trap; try next progID
                        }
                }
                if (!bFound)
                        throw "Sarissa_Exception: Could not retreive a valid progID of Class: " + idList[idList.length-1]+". (original exception: "+e+")";
                idList = null;
                return o2Store;
        };
        // store proper progIDs
        _SARISSA_DOM_PROGID = pickRecentProgID(["Msxml2.DOMDocument.4.0", "Msxml2.DOMDocument.3.0", "MSXML2.DOMDocument", "MSXML.DOMDocument", "Microsoft.XmlDom"]);
        _SARISSA_XMLHTTP_PROGID = pickRecentProgID(["Msxml2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"]);
        // we dont need this anymore
        pickRecentProgID = null;
        //============================================
        // Section: Factory methods (IE)
        //============================================
        // Factory method, returns a DOMDocument suitable for IE
    Sarissa.getDomDocument = function()
    {
                return new ActiveXObject(_SARISSA_DOM_PROGID);
    };
    Sarissa.getDomDocument = function(sUri, sName)
    {
                var oDoc = new ActiveXObject(_SARISSA_DOM_PROGID);
                // if a root tag name was provided, we need to load it in the DOM object
                if (sName)
                {
                        // if needed, create an artifical namespace prefix the way Moz does
                        if (sUri)
                        {
                                oDoc.loadXML("<a" + _sarissa_iNsCounter + ":" + sName + " xmlns:a" + _sarissa_iNsCounter + "=\"" + sUri + "\" />");
                                // don't use the same prefix again
                                ++_sarissa_iNsCounter;
                        }
                        else
                                oDoc.loadXML("<" + sName + "/>");
                }
                return oDoc;
    };
        // Factory method, returns an IXMLHTTPRequest object 
        // AFAIK, the object behaves exactly like 
        // Mozilla's XmlHttpRequest
        Sarissa.getXmlHttpRequest = function()
        {
                return new ActiveXObject(_SARISSA_XMLHTTP_PROGID);
        };
}
// Factory Class
function Sarissa(){}
// Common factory method, used to set xslt parameters.
// TODO: figure out how to implement support for both Mozilla's and IE's 
// XSL Processor objects to improove performance for reusable stylesheets.
// @param oXslDoc the target XSLT DOM Document
// @param sParamName the name of the XSLT parameter
// @param sParamValue the value of the XSLT parameter
// @return whether the parameter was set succefully
Sarissa.setXslParameter = function(oXslDoc, sParamQName, sParamValue)
{
        try
        {
                var params = oXslDoc.getElementsByTagName(_SARISSA_IEPREFIX4XSLPARAM+"param");
                var iLength = params.length;
                var bFound = false;
                var param;
                
                if(sParamValue)
                {
                        for(i=0; i < iLength && !bFound;i++)
                        {
                                // match a param name attribute with the name given as argument
                                if(params[i].getAttribute("name") == sParamQName)
                                {
                                        param = params[i];
                                        // clean up the parameter
                                        while(param.firstChild)
                                                param.removeChild(param.firstChild);
                                        if(!sParamValue || sParamValue == null)
                                        {
                                                // do nothing; we've cleaned up the parameter anyway
                                        }
                                        // if String
                                        else if(typeof sParamValue == "string")
                                        { 
                                                param.setAttribute("select", sParamValue);
                                                bFound = true;
                                        }
                                        // if node
                                        else if(sParamValue.nodeName)
                                        {
                                                param.removeAttribute("select");
                                                param.appendChild(sParamValue.cloneNode(true));
                                                bFound = true;
                                        }
                                        // if NodeList
                                        else if (sParamValue.item(0)
                                                && sParamValue.item(0).nodeType)
                                        {
                                                for(j=0;j < sParamValue.length;j++)
                                                if(sParamValue.item(j).nodeType) // check if this is a Node
                                                        param.appendChild(sParamValue.item(j).cloneNode(true));
                                                bFound = true;
                                        }
                                        // if Array or IE's IXMLDOMNodeList
                                        else
                                                throw "SarissaTypeMissMatchException in method: Sarissa.setXslParameter. (original exception: "+e+")";
                                }
                        }
                }
                return bFound;
        }
        catch(e)
        {
                throw e;
                return false;
        }
}


function getCommonXMLDocument(){
	if (navigator.userAgent.toLowerCase().indexOf("msie") > -1) {
		//ie
		return new ActiveXObject("MSXML.DOMDocument");
	}else{
		//moz
		return document.implementation.createDocument("","",null);
	}
}
function getNodeTextValue(node){
	if (navigator.userAgent.toLowerCase().indexOf("msie") > -1) {
		//ie
		return node.text;
	}else{
		//moz
		return node.textContent;
	}
}
function setNodeTextValue(node,value){
	if (navigator.userAgent.toLowerCase().indexOf("msie") > -1) {
		//ie
		node.text=value;
	}else{
		//moz
		node.textContent=value;
	}
}

/* http提交
*/
// 取得xml http object
function getCommonXMLHttpObject() {
	// branch for native XMLHttpRequest object
	if (window.XMLHttpRequest) {
		var xmlHttpObject=new XMLHttpRequest();
		try{
			xmlHttpObject.overrideMimeType("text/xml");
		}catch(ee){}
        return xmlHttpObject;
    // branch for IE/Windows ActiveX version
    } else if (window.ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP");
    }

}

/* 文件操作
*/
function initFileObject(){
	//var s="";
	if (_SARISSA_IS_MOZ) document.write("<object TYPE=application/x-filectrl ID='exFileCtrl'></object>");
	else if (_SARISSA_IS_IE) {
		document.write("<object classid='clsid:FDC65D71-83A0-11D2-9075-0020AF05A5B1' id='exFileCtrl' width='0' height='0'  style='display:none'  codebase='/DataWork/cabs/exFileAccess.CAB#version=6,8,0,15' VIEWASTEXT='请安装客户端文件处理控件'></object>");
		document.write('<SCRIPT LANGUAGE=VBScript\> \n');
		  //document.write('on error resume next \n');
		document.write('function  readFileVB(strFn)\n');
		document.write('  dim  DataStr,fObj,strRet\n');
		document.write('  set fObj = CreateObject("exFileAccess.ExFileSys")\n');
		document.write('  strRet = fObj.ReadFileV(CStr(strFn),DataStr)\n');
		document.write('  readFileVB = DataStr\n');
		document.write('  set fObj = nothing\n');
		document.write('end function\n');
		document.write('function  getFileSizeVB(strFn)\n');
		document.write('  dim  fObj,lRet\n');
		document.write('  set fObj = CreateObject("exFileAccess.ExFileSys")\n');
		document.write('  getFileSizeVB = fObj.getFileSize(CStr(strFn))\n');
		document.write('  set fObj = nothing\n');
		document.write('end function\n');
		document.write('</SCRIPT\> \n');
		//s+="<script language='VBScript'>\n";
		//s+="function  readFileVB(strFn)\n";
		//s+="  dim  DataStr,fObj,strRet\n";
		//s+="  set fObj = CreateObject('exFileAccess.ExFileSys')\n";
		//s+="  strRet = fObj.ReadFileV(CStr(strFn),DataStr)\n";
		//s+="  readFileV = DataStr\n";
		//s+="  set fObj = nothing\n";
		//s+="end function</script>";
	}
	//alert(s);
	//document.write(s);
}

function getFileSize(filename){
	if (_SARISSA_IS_MOZ) {
		var length=document.getElementById("exFileCtrl").FileSize(filename);
		return(length);
	}else if (_SARISSA_IS_IE) {
	   var fso, f;
	   //fso = new ActiveXObject("Scripting.FileSystemObject");
	   //f = fso.GetFile(filename);
	   return getFileSizeVB(filename); // (f.size);
	}
	return 0;
}

function createFile(filename,content){
	if (_SARISSA_IS_MOZ) {
		document.getElementById("exFileCtrl").WriteFile(filename,content,content.length);
	}else if (_SARISSA_IS_IE) {
	}
}

function createFileWithTempName(ext,content){
	if (_SARISSA_IS_MOZ) {
		filename=getTempFileName(ext);
		document.getElementById("exFileCtrl").WriteFile(filename,content,content.length);
		return filename;
	}else if (_SARISSA_IS_IE) {
		var fObject = new ActiveXObject("exFileAccess.ExFileSys");
	    var TempFn = fObject.GetTempName2(ext,"",true);
	    fObject.WriteFile(TempFn,content);
		return TempFn;
	}
	return "";
}

function createFileFromBase64(filename,content){
	if (_SARISSA_IS_MOZ) {
		var strings=atob(content);
		document.getElementById("exFileCtrl").WriteFile(filename,strings,strings.length);
	}else if (_SARISSA_IS_IE) {
	}
}

function readFile(filename){
	if (_SARISSA_IS_MOZ) {
		var size=document.getElementById("exFileCtrl").FileSize(filename);
		return (document.getElementById("exFileCtrl").ReadFile(filename,size));
	}else if (_SARISSA_IS_IE) {
		return readFileVB(filename);
		//var fso, f, s;
		//fso = new ActiveXObject("exFileAccess.ExFileSys");
		//fso.readFileVB(filename,s);
		//return s;
	}
}

function readFileAsBase64(filename){
	if (_SARISSA_IS_MOZ) {
		var size=document.getElementById("exFileCtrl").FileSize(filename);
		return btoa(document.getElementById("exFileCtrl").ReadFile(filename,size));
	}else if (_SARISSA_IS_IE) {
		var fso, f, s;
		fso = new ActiveXObject("exFileAccess.ExFileSys");
		fso.readFileV(filename,s);
		return encode64(s);
	}
}

function readFileToNode(filename,node){
	try
	{
		if (_SARISSA_IS_MOZ) {
			var size=document.getElementById("exFileCtrl").FileSize(filename);
			node.textContent=btoa(document.getElementById("exFileCtrl").ReadFile(filename,size));
		}else if (_SARISSA_IS_IE) {
			node.dataType = "bin.base64";	
			node.nodeTypedValue = readFileVB(filename);
		}
		return node;
	}
	catch(e)
	{
		window.alert("readFileToNode:"+e.description);
	}
}

function readFileFromServer(urlIe,urlMoz,ext){
	var tempFilename="";
	var xmlHttpObj = getCommonXMLHttpObject();
	var DataStr;
	if (_SARISSA_IS_MOZ) {
		xmlHttpObj.open("get", urlMoz, false);   	
	}else if (_SARISSA_IS_IE) {
		xmlHttpObj.open("get", urlIe, false);   	
	}
	xmlHttpObj.send("");
	if (_SARISSA_IS_MOZ) {
		DataStr = xmlHttpObj.responseText; //Body;
	}else if (_SARISSA_IS_IE) {
		DataStr = xmlHttpObj.responseBody;
	}
	//alert(DataStr);
	xmlHttpObj = null;
	//alert("-1");
	if (_SARISSA_IS_MOZ) {
		tempFilename = createFileWithTempName(ext,decode64(DataStr));
	}else if (_SARISSA_IS_IE) {
		tempFilename = createFileWithTempName(ext,DataStr);
	}
	return tempFilename;
}

function deleteFile(filename){
	if (_SARISSA_IS_MOZ) {
		if(document.getElementById("exFileCtrl").FileExists(filename)){
			document.getElementById("exFileCtrl").DeleteFile(filename);
			return true;
		}
	}else if (_SARISSA_IS_IE) {
		var fso, f, s;
		FObj = new ActiveXObject("exFileAccess.ExFileSys");
		FObj.KillFile(filename);
		FObj = null;
		return true;
	}
	return false;
}

function fileExists(filename){
	if (_SARISSA_IS_MOZ) {
		return (document.getElementById("exFileCtrl").FileExists(filename));
	}else if (_SARISSA_IS_IE) {
		var fso, f, s;
		len=getFileSizeVB(filename);
		if (len>0) return true;
		//fso = new ActiveXObject("Scripting.FileSystemObject");
		//return fso.FileExists(filename);
	}
	return false;
}

function copyFile(fromFilename,toFilename){
	if (_SARISSA_IS_MOZ) {
		return (document.getElementById("exFileCtrl").CopyFile(fromFilename,toFilename));
	}else if (_SARISSA_IS_IE) {
		var fso, f, s;
		//fso = new ActiveXObject("Scripting.FileSystemObject");
		//return fso.CopyFile(fromFilename,toFilename,true);
		FObj = new ActiveXObject("exFileAccess.ExFileSys");
		srcContent=readFileVB(fromFilename);
		FObj.WriteFile(toFilename,srcContent);
		FObj=null;
	}
}

function getTempFileName(ext){
	if (_SARISSA_IS_MOZ) {
		var temp=new Date();
		filename="/tmp/"+temp.getYear()+""+temp.getMonth()+""+temp.getDay()+""+temp.getHours()+""+temp.getMinutes()+""+temp.getSeconds()+"."+ext;
		return filename;
	}else if (_SARISSA_IS_IE) {
		var fso, f, s;
		fObj = new ActiveXObject("exFileAccess.ExFileSys");
		return fObj.GetTempName2(ext,"",true);
	}
	return false;
}

function  getFileExt(fileName)
{
  var ext = "";
  var iIndex = fileName.lastIndexOf(".");
  ext = fileName.substring(iIndex+1,fileName.length);
  ext = ext.toLowerCase();
  return ext;
}

/* Base64操作
*/
var keyStr = "ABCDEFGHIJKLMNOP" + 
"QRSTUVWXYZabcdef" + 
"ghijklmnopqrstuv" + 
"wxyz0123456789+/" + 
"="; 

function encode64(input) { 
	input = escape(input); 
	var output = ""; 
	var chr1, chr2, chr3 = ""; 
	var enc1, enc2, enc3, enc4 = ""; 
	var i = 0; 

	do { 
	chr1 = input.charCodeAt(i++); 
	chr2 = input.charCodeAt(i++); 
	chr3 = input.charCodeAt(i++); 

	enc1 = chr1 >> 2; 
	enc2 = ((chr1 & 3) << 4) | (chr2 >> 4); 
	enc3 = ((chr2 & 15) << 2) | (chr3 >> 6); 
	enc4 = chr3 & 63; 

	if (isNaN(chr2)) { 
		enc3 = enc4 = 64; 
	} else if (isNaN(chr3)) { 
		enc4 = 64; 
	} 

	output = output + 
	keyStr.charAt(enc1) + 
	keyStr.charAt(enc2) + 
	keyStr.charAt(enc3) + 
	keyStr.charAt(enc4); 
	chr1 = chr2 = chr3 = ""; 
	enc1 = enc2 = enc3 = enc4 = ""; 
	} while (i < input.length); 

	return output; 
} 

function decode64(input) { 
var output = ""; 
var chr1, chr2, chr3 = ""; 
var enc1, enc2, enc3, enc4 = ""; 
var i = 0; 

// remove all characters that are not A-Z, a-z, 0-9, +, /, or = 
var base64test = /[^A-Za-z0-9\+\/\=]/g; 
if (base64test.exec(input)) { 
alert("There were invalid base64 characters in the input text.\n" + 
"Valid base64 characters are A-Z, a-z, 0-9, '+', '/', and '='\n" + 
"Expect errors in decoding."); 
} 
input = input.replace(/[^A-Za-z0-9\+\/\=]/g, ""); 

do { 
enc1 = keyStr.indexOf(input.charAt(i++)); 
enc2 = keyStr.indexOf(input.charAt(i++)); 
enc3 = keyStr.indexOf(input.charAt(i++)); 
enc4 = keyStr.indexOf(input.charAt(i++)); 

chr1 = (enc1 << 2) | (enc2 >> 4); 
chr2 = ((enc2 & 15) << 4) | (enc3 >> 2); 
chr3 = ((enc3 & 3) << 6) | enc4; 

output = output + String.fromCharCode(chr1); 

if (enc3 != 64) { 
output = output + String.fromCharCode(chr2); 
} 
if (enc4 != 64) { 
output = output + String.fromCharCode(chr3); 
} 

chr1 = chr2 = chr3 = ""; 
enc1 = enc2 = enc3 = enc4 = ""; 

} while (i < input.length); 

return unescape(output); 
} 

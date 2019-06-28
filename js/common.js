$(window).load(function() {


    //初始化页面高度
    /*评价*/
    setGrade();

    initSize();
    initImgSize();

    // apiUrl  = 'http://testapi.gongxiangyoupin.com/';
    apiUrl  = 'http://api.xiamibox.com/';
    url     = 'http://' + window.location.host;
    $(window).resize(function(){
        initSize();
        initImgSize();
    })
    //仿单选框、复选框
    $("label").on("click","[role^='label-']",function(){
        $(this).toggleClass("lab-sele");
    })
    $(".modal-list").on("click","li",function(){
        $(this).siblings().removeClass("selected");
        $(this).addClass("selected");
    })
    $("label").on("click",".lab-radio",function(){
        if($(this).hasClass("lab-sele")){
            $(this).siblings().removeClass("lab-sele");
        }
    })
    /*全选*/
    $("body").on("click","[role='check-all']",function(){
        var chkGrp=$(this).attr("check-group");
        $(this).toggleClass("lab-sele");
        $(".lab-checkbox",$(chkGrp)).not($(this)).removeClass().addClass($(this).attr("class"));
    })
    /*展开/收起*/
    $(".list-head").on("click",function(){
    	var a_switch = $(this).find(".switch-down");
        if(a_switch.hasClass("fa-down")){
            $(this).nextUntil(".list-head").slideUp("fast");
            a_switch.removeClass("fa-down").addClass("fa-up");
        }else if(a_switch.hasClass("fa-up")){
            $(this).nextUntil(".list-head").slideDown("fast");
            a_switch.removeClass("fa-up").addClass("fa-down");
        }
    })
    $(".type-list").on("click","li",function(){
        $(this).addClass("active");
        $(this).find("ul").show();
        $(this).siblings().removeClass("active");
        $(this).siblings().find("ul").hide();
    })
    $("body").on("click","[data-toggle]",function(){
        $(this).toggleClass("active");
        $(this).siblings(".filter-item").removeClass("active");
        $($(this).attr("data-toggle")).toggle();
        $($(this).attr("data-toggle")).siblings(".dropdown-type").hide();
    })
    /*文件域*/
    $(".input-file").on("change","input[type='file']",function(){
        var filePath=$(this).val();
        if(filePath.indexOf("jpg")!=-1 || filePath.indexOf("png")!=-1){
            $(this).siblings("input[type='text']").val($(this).val());
        }else{
            $(".showFileName").html("");
            $(".fileerrorTip").html("您未上传文件，或者您上传文件类型有误！").show();
            return false
        }
    })
    /*关闭广告*/
    $("[mytag=clsPop]").bind("click",function(){
        $(this).parents(".ad_pop").hide();
    })

    $('.lesson-item').click(function () {
        var junpUrl = $(this).data('href');
        location.href = url + junpUrl;
    });
    //仿单选框、复选框
    $("body").on("click",".fa-back", function(){
        window.history.back(-1);
    })
})

//获取url中的参数
function GetUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return ""; //返回参数值
}

function initSize(){
    var topH = 0; botH = 0;botSpace=0;
    if($(".header-fix").length){
        topH = topH + $(".header-fix").outerHeight(true);
    }
    if($(".footer").length){
        botH = botH + $(".footer").outerHeight(true);
    }
    if($(".footer-tool").length){
        botH = botH + $(".footer-tool").outerHeight(true);
    }
    if($(".page-tool").length){
        botSpace = botSpace + $(".page-tool").outerHeight(true);
    }
    /*$(".footer-tool").css("bottom",botH-$(".footer-tool").outerHeight());*/
    $(".main-content").css({"padding-top":0}).height($(window).height() - topH - botH - botSpace);
    $(".header-fix").css({"position":"static"});
	$(".header-fix1").css({"position":"fixed"});
    $(".footer").css({"position":"static"});
    $(".page-tool").css({"bottom":botH})
    var typeT=topH, typeH=$(window).height()-topH-botH;
    $(".type-area").css({"top":typeT, "height":typeH });
    $(".type-area ul ul").css({"top":typeT,"height":typeH});
    $(".dropdown-type").css({"top":topH, "height":typeH-30});
    $(".dropdown-type ul ul").css({"top":topH, "height":typeH-31});
}
function initImgSize(){
    $(".list-media .list-img").height(function(){
        var ph=$(this).width()* .63;
        return ph;
    })
    $(".pic-fixed-list>li").height(function(){
        var ph=$(this).width() *(3/4);
        return ph;
    })
    $(".pic-fixed-list.img-nums-2>li").height(function(){
        var ph=$(this).parent().width()*(1/2);
        return ph;
    });
    $(".pic-fixed-list.img-nums-4>li:nth-child(2),.pic-fixed-list.img-nums-4>li:nth-child(3),.pic-fixed-list.img-nums-4>li:nth-child(4)").width(function(){
        var pw=$(".pic-fixed-list.img-nums-4>li:nth-child(1) img").width()*(1/3)-9;
        return pw;
    }).height(function(){
        var ph=$(this).width();
        return ph;
    }).css("margin-right","6px");
    $(".pic-fixed-list.img-nums-4>li:nth-child(4)").css("margin-right","5px");
    $(".pic-fixed-list.img-nums-5>li:nth-child(1),.pic-fixed-list.img-nums-5>li:nth-child(2)").width(function(){
        var pw=$(this).parent().width()*(1/2)-10;
        return pw;
    }).height(function(){
        var ph=$(this).width();
        return ph;
    }).css("margin-right","10px");
    $(".pic-fixed-list.img-nums-5>li:nth-child(3),.pic-fixed-list.img-nums-5>li:nth-child(4),.pic-fixed-list.img-nums-5>li:nth-child(5)").height(function(){
        var ph=$(this).parent().height()*(1/3)-4;
        return ph;
    })
    $(".pic-fixed-list.img-nums-5>li:nth-child(4),.pic-fixed-list.img-nums-5>li:nth-child(5)").css("margin-top","2px");
    $(".pic-fixed-list.img-nums-5>.pic-more").css({"height":"1.5em","line-height":"1.5em"});

    /*弹出广告图片*/
    $(".ad_pop .ad_main").width(function(){
        var defwidth = 500;//16为字号;
        adwidth = $(window).width() > 600 ? defwidth : "80%";
        return adwidth;
    });
    $(".ad_pop .ad_main").css({"left":function(){
        var adleft = $(window).width()/2 - $(".ad_pop .ad_main").width()/2;
        return adleft;
    },"margin-left":"0"});
    // $(".ad_pop .close").css("left", $(".ad_pop .ad_main").position().left + $(".ad_pop .ad_main").width()-15);
}

function setGrade(){
    $(".grades .star").bind("click",function(){
        // //oldPoi=$(this).siblings(".act:last");
        // $(this).addClass("over");
        // $(this).prevAll(".star").addClass("over");
        // $(this).nextAll(".star").removeClass("over");
        // $(this).bind("click",function(){
            $(this).addClass("act");
            $(this).prevAll(".star").addClass("act");
            $(this).nextAll(".star").removeClass("act","over");
            $(this).siblings(".score").html($(this).siblings(".act").length+1+"分");
        // })
    })
}

function appendMp3(appendId, length, headPic, title, path, textContent, hasTopText) {
    var orderBody = '';
    for(var i = 1; i <= length; i++){
        orderBody += '<div class="message-item" id="message-mp3-' + i + '">\
                <div class="headpic"><span><img src="images/' + headPic + '" /></span></div>\
                <div class="detail">\
                <div class="name">' + title + '</div>\
            <div class="con">\
                <audio src="./media/' + path + i + '.mp3" controls>\
            当浏览器不支持时，此处给出提示\
            </audio>\
            </div>\
            </div>\
            </div>';
        // console.log(textContent);
        var textBody = '';
        if(textContent[i]){
            var k = 0;
            if(i == '20'){
                console.log(textContent[i]);
            }
            $.each(textContent[i], function(key, val){
                var r = /^img_|text_img_/;　　//判断是否为正整数
                r.test(key);
                console.log(r.test(key) + '==' + key);
                k += 1;
                if(!r.test(key)){
                    textBody += '<div class="message-item" id="message-mp3-text-' + i + '-' + k + '">\
                        <div class="headpic"><span><img src="images/' + headPic + '" /></span></div>\
                        <div class="detail">\
                        <div class="name">' + title + '</div>\
                    <div class="con">\
                        <div class="text">'+ val + '</div>\
                        </div>\
                        </div>\
                        </div>';
                }else{
                    textBody += '<div class="message-item" id="message-mp3-text-' + i + '-' + k + '">\
                    <div class="headpic"><span><img src="images/' + headPic + '" /></span></div>\
                    <div class="detail">\
                    <div class="name">' + title + '</div>\
                <div class="con">\
                    <img src="' + val + '" />\
                    </div>\
                    <span class="time"><sup></sup></span>\
                    </div>\
                    </div>';
                }
            });

            if(hasTopText && i == 1){
                orderBody = textBody + orderBody;
            }else{
                orderBody += textBody;
            }
        }
    }
    $('#' + appendId).after(orderBody);
}

function appendVideo(appendId, key, headPic, title, path) {
    var orderBody = '';

        orderBody += '<div class="message-item" id="' + appendId + '-' + key + '">\
            <div class="headpic"><span><img src="images/' + headPic + '" /></span></div>\
            <div class="detail">\
            <div class="name">' + title + '</div>\
        <div class="con">\
            <video width="100%" height="100%" controls="controls">\
            <source src="' + path + '.mp4" type="video/mp4" />\
            <source src="' + path + '.ogg" type="video/ogg" />\
            <source src="' + path + '.webm" type="video/webm" />\
            <object data="' + path + '.mp4" width="100" height="100">\
            <embed src="' + path + '.swf" width="100" height="100" />\
            </object>\
            </video>\
            </div>\
            </div>\
            </div>';

    console.log(orderBody);
    $('#' + appendId).after(orderBody);
}

function getQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null) return unescape(r[2]); return null;
}

function getCourseList(teacher) {
    if(!teacher){
        teacher = getQueryString('teacher');
    }
    // var apiUrl  = 'http://testapi.gongxiangyoupin.com/';
    var apiUrl  = 'http://api.xiamibox.com/';
    var token   = localStorage.getItem('user_token');
    // console.log(apiUrl);
    $.ajax({
        url : apiUrl + "/college/course/index",
        type: "post", //用POST方式传输
        dataType: "json", //数据格式:JSON
        data:{'token' : token, 'teacher' : teacher},
        success:function (data) {
            // console.log(data);
            if(data.status == 'success'){
                var teachers = ['liuboxi', 'liuxiaojie', 'ouyangjia', 'jiajia', 'shanshan', 'zhongxiaoping', 'zhangsui', 'xiaoyan'];
                var courseList  = '';
                var teacherInfo = '';
                var teacherImg  = '';
                var courseTitle = '商学院系统';
                $.each(data.data, function(i, val){
                    if(i == teacher){
                        teacherInfo = val.describe;
                        teacherImg  = 'images/' + val.header;
                        courseTitle = val.title;
                        appendMp3('media_mp3', val.mp3, val.headPic, val.name, val.mediaPath, val.textContent, val.hasTextTop);
                        if(val.video){
                            $.each(val.video, function(idKey, idValue){
                                console.log(idKey);
                                console.log(idValue);
                                appendVideo(idValue, i, val.headPic, val.name, './media/' + val.mediaPath + (idKey + 1));
                            });
                        }
                    }else{
                        courseList += '<li class="course" data-href="/' + val.url + '">\
                        <div class="img"><img src="images/' + val.header + '" /></div>\
                        <div class="text">\
                        <div class="name">' + val.name + '</div>\
                    <div class="title">《' + val.title + '》</div>\
                    <div class="other">' + val.other + '</div>\
                    </div>\
                    </li>';
                    }
                });
                $('.sys-name').text(courseTitle);
                $('.detail .header-pic img').attr('src', teacherImg);
                $('.con .desc').append(teacherInfo);
                $('.comm-list').append(courseList);

            }
        },error:function (e) {
            console.log(e);
        }
    })
}
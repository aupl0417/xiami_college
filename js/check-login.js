$(document).ready(function(){
    var url     = 'http://' + window.location.host;
    var apiUrl  = 'http://testapi.gongxiangyoupin.com/';
    checkLogin();
    getCourseList();
    function checkLogin() {
        var token   = localStorage.getItem('user_token');
        if(!token || token == null || token == 'undefined'){
            location.href = url + '/login.html';
        }
        $.ajax({
            url : apiUrl + "/college/check",
            type: "post", //用POST方式传输
            dataType: "json", //数据格式:JSON
            data:{'token' : token},
            success:function (data) {
                if(data.status != 'success'){
                    location.href = url + '/login.html';
                }
            },error:function (e) {
                console.log(e);
            }
        });


        $('.lesson-item').click(function () {
            location.href = url + $(this).data('href');
        });
        $(document).on('click','.course',function(){//on绑定事件
            location.href = url + $(this).data('href');
        });
        $('.course').click(function () {
            location.href = url + $(this).data('href');
        });

    }
});
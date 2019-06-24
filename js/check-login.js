$(document).ready(function(){
    checkLogin();
    function checkLogin() {
        var url     = 'http://' + window.location.host;
        var apiUrl  = 'http://api.xiamibox.com/';
        var token   = localStorage.getItem('user_token');
        console.log(token);
        $.ajax({
            url : apiUrl + "/college/check",
            type: "post", //用POST方式传输
            dataType: "json", //数据格式:JSON
            data:{'token' : token},
            success:function (data) {
                console.log(data);
                if(data.status != 'success'){
                    location.href = url + '/login.html';
                }
            },error:function (e) {
                console.log(e);
            }
        })
        $('.lesson-item').click(function () {
            var junpUrl = $(this).data('href');
            location.href = url + junpUrl;
        });
        $('.course').click(function () {
            var junpUrl = $(this).data('href');
            location.href = url + junpUrl;
        });
    }
});
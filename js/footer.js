$(document).ready(function(){
    $("#navi a").click(function(){
	  	$("a[class='active']").removeAttr("class");
	  	$(this).addClass("active");
    });
});
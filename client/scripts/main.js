//'use strict';
var type = 0;
var node = 0;
var file = '';
var fileName = '';
var inti = 0;
$(document).ready(function () {
    var msie = navigator.userAgent.match(/msie/i);
    $.browser = {};
    $.browser.msie = {};
    $("#searchUser").hide();
    //var $sidebarNav = $('.sidebar-nav');
    $('.accordion > a').click(function (e) {
        e.preventDefault();
        var $ul = $(this).siblings('ul');
        var $li = $(this).parent();
        if ($ul.is(':visible')) {
            $li.removeClass('active');
        }
        else {
            $li.addClass('active');
            $li.siblings("li").removeClass("active");
        }
        $ul.slideToggle();
    });
    $(".main-menu >li >a").not(".accordion>a").click(function () {
        if ($(".accordion").hasClass("active")) {
            //var $ul = $(this).siblings('ul');
            //var $li = $(this).parent();
            $(this).removeClass('active');
            //$(".accordion>ul").css("display","none")
            $(".accordion>ul").slideUp();
        }
    });
    //user_network();
    
    $('#calc').click(function (e) {
        calc();
        //$('#sf2').html("clicked");
    });
    // $("#cover").click(function () {
    //     $("#recmovieNetwork").css("z-index", "1");
    // });
    // $('.accordion li.active:first').parents('ul').slideDown();
    $(".ajax-link").click(function () {
        // if($(".tab-content").children("active").attr("id")=="sf1"){
        //    $("#searchUser").css("display","");
        // } else{
        //    $("#searchUser").css("display","none");
        // }
        // if($("#sf1").parent().hasClass("active")){
        //    $("#searchUser").show();
        // }else{
        //    $("#searchUser").hide();
        // }
        if ($(this).attr("id") == "sli1" || $(this).attr("id") == "sli2" || $(this).attr("id") == "sli3") {
            $("#searchUser").show();
        } else {
            $("#searchUser").hide();
        }
        $("#recmovieNetwork").empty();
        $("#movieInfo").empty();
        if ($(this).attr("id") == "sli1") {
            movie_network("udatasloprec");
        } else if ($(this).attr("id") == "sli2") {
            movie_network("udataknnrec");
        } else if ($(this).attr("id") == "sli3") {
            movie_network("udatasvdrec");
        }

    });


});

$('#loadfile').fileinput({
    showUpload: true,
    showRemove: false,
    showPreview: false,
    browseLabel: "upload file",
    removeLabel: "remove",
    uploadUrl: 'upload', // server upload action
    uploadLabel: "upload",
    maxFileCount: 1,
    uploadAsync: true,
    allowedFileExtensions: ['txt', 'csv']
});
$('#loadfile').on('filebatchpreupload', function (event, data, previewId, index) {
    //dispLoading(true);
    fileName = $('#loadfile').text();
    console.log('File batch pre upload');
});

$('#loadfile').on('filebatchuploadsuccess', function (event, data, previewId, index) {
    file = data.response;
    //loadfile.
    console.log(data.response);
    
    //drewPlot(file);   
    drew(file);  //化直方图	
    user_network(file);
    //$('#loadfile').val(data.files[0]);
});
function calc() {
    //inti = setInterval(function name(params) {
    $.ajax({
        url: 'calc',
        type: 'GET',
        timeout: 3000,
        success: function (data) {
            console.log(data);
            $("#sf2 h2").html(data);
        }
    });
    // },6000);
}
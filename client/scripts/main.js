/// <reference path="../../typings/node/node.d.ts"/>
//'use strict';
var type = '';
var file = '';
var outputfile = '';
var check = false;
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
    $("#jindu").hide();
    $('#calc').click(function (e) {
        $(this).attr("disabled","true");
        //$(".zhanshi .active").hide();
        $("#jindu").show();
        calc();
        
    });

    $(".ajax-link").click(function () {
        $("#title").html("上传用户和电影的关系文件");
        if ($(this).attr("id") == "sli1" || $(this).attr("id") == "sli2" || $(this).attr("id") == "sli3") {
            $("#searchUser").show();
        } else {
            $("#searchUser").hide();
        }
        $("#recmovieNetwork").empty();
        $("#movieInfo").empty();
        if ($(this).attr("id") == "sli1") {
            //movie_network("udatasloprec");
            type = 's';
            outputfile = "slopeResult";
        } else if ($(this).attr("id") == "sli2") {
            //movie_network("udataknnrec");
            type = 'k';
            outputfile = "knnResult";
        } else if ($(this).attr("id") == "sli3") {
            //movie_network("udatasvdrec");
            type = 'v';
            outputfile = "svdResult";
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
    //allowedFileExtensions: ['txt', 'csv','data']
});
$('#loadfile').on('filebatchpreupload', function (event, data, previewId, index) {
    console.log('File batch pre upload');
});

$('#loadfile').on('filebatchuploadsuccess', function (event, data, previewId, index) {
    file = data.response;
    //loadfile.
    console.log(data.response);
    if (type != "") {
        $("#calc").removeAttr("disabled");
    }   
    //drewPlot(file);   
    if (type == "") {
        drew(file);  //化直方图	
        user_network(file);
    }
    
    //$('#loadfile').val(data.files[0]);
});
function calc() {
    //inti = setInterval(function name(params) {
    if (type == "") {
        return;
    }
    $.ajax({
        url: 'calc/ ' + type + '/' + file + '/' + outputfile,
        type: 'GET',
        timeout: 100000,
        success: function (data) {
            //console.log(data);
            //$("#sf2 h2").html(data);
            movie_network("output\\" + outputfile);
            $("#jindu").hide();
            //$(".zhanshi .active").show();

        }
    });
    // },6000);
}
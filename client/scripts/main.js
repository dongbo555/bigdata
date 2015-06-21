//'use strict';
$(document).ready(function () {
    var msie = navigator.userAgent.match(/msie/i);
    $.browser = {};
    $.browser.msie = {};
    var $sidebarNav = $('.sidebar-nav');
    // $(document).mouseup(function (e) {
    //     if (!$sidebarNav.is(e.target) // if the target of the click isn't the container...
    //         && $sidebarNav.has(e.target).length === 0
    //         && !$('.navbar-toggle').is(e.target)
    //         && $('.navbar-toggle').has(e.target).length === 0
    //         && $sidebarNav.hasClass('active')
    //         )// ... nor a descendant of the container
    //     {
    //         e.stopPropagation();
    //         $('.navbar-toggle').click();
    //     }
    // });
    //highlight current / active link
    // $('ul.main-menu li a').each(function () {
    //     if ($($(this))[0].href == String(window.location))
    //         $(this).parent().addClass('active');
    // });
    // //ajaxify menus
    // $('a.ajax-link').click(function (e) {
    //     if (msie) e.which = 1;
    //     if (e.which != 1 || !$('#is-ajax').prop('checked') || $(this).parent().hasClass('active')) return;
    //     e.preventDefault();
    //     $('.sidebar-nav').removeClass('active');
    //     if($(".accordion").hasClass("active")){
    //         //var $ul = $(this).siblings('ul');
    //         //var $li = $(this).parent();
    //          $(this).removeClass('active');
    //          $(".accordion>ul").css("display","none")
    //     }
    //     var $clink = $(this);
    //     History.pushState(null, null, $clink.attr('href'));
    //     $('ul.main-menu li.active').removeClass('active');
    //     $clink.parent('li').addClass('active');
    //     return false;
    // });
    $('.accordion > a').click(function (e) {
        e.preventDefault();
        var $ul = $(this).siblings('ul');
        var $li = $(this).parent();
        if ($ul.is(':visible')) 
        {
            $li.removeClass('active');
        }
        else{
            $li.addClass('active');
            $li.siblings("li").removeClass("active");
        }                    
        $ul.slideToggle();
    });
    $(".main-menu >li >a").not(".accordion>a").click(function(){
        if($(".accordion").hasClass("active")){
            //var $ul = $(this).siblings('ul');
            //var $li = $(this).parent();
             $(this).removeClass('active');
             //$(".accordion>ul").css("display","none")
             $(".accordion>ul").slideUp();
        }
    });

    // $('.accordion li.active:first').parents('ul').slideDown();
    //console.log('Welcome to Yeogurt');
  
});
$('#loadfile').fileinput({
  	showUpload:true,
  	showRemove:false, 
  	showPreview:false,
    browseLabel:"upload file",
    removeLabel: "remove",
  	uploadUrl: 'upload', // server upload action
    uploadLabel:"upload",  
    maxFileCount: 1,
    uploadAsync:true,
    allowedFileExtensions:['txt']
  });
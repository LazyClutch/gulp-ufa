var popup = require('../modules/popup.js');
var service = require('../services/communityService.js');

$(function() {
    "use strict";

    submit();

    function submit() {
        $('#sub').on('click', function() {
            var name = $('#community').val(),
                desc = $('#content').val(),
                $err = $('.err-txt'),
                reg = /^[\u4E00-\u9FA5A-Za-z0-9]+$/g;

            if(!name) {
                $err.html('请填写小区名');
            } else if(!reg.test(name)) {
                $err.html('小区名输入不合法');
            } else {
                service.demand({
                    data: {
                        community: name,
                        content: desc
                    },
                    success: sucFn,
                    error: errFn
                });
                $('.ajax-loading').addClass('active');
            }
            function sucFn(d) {
                $('.ajax-loading').removeClass('active');
                showPopup('提交成功');
                // 跳转页面
                setTimeout(function() {
                    window.location.href = d.redirect;
                }, 1000);
            }
            function errFn(d) {
                $err.html(d.msg);
            }
        });
    }

    function showPopup(msg) {
        var width, height, content;
        width = 100;
        height = 50;
        content = $.temp('popTpl', {'msg': msg});
        var pop = new popup({
            width: width,
            height: height,
            isMask: false,
            showTime: 2000,
            content: content
        });
        pop.showPop();
    }
});
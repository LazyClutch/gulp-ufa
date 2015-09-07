var popup = require('../modules/popup.js');
var service = require('../services/userService.js');

$(function() {

    var phoneEle = $('#fiPhone'),
        sendEle = $('#sendNum'),
        tipEle = $('#errTip'),
        loginEle = $('#loginByPhone'),
        codeEle = $('#fiCode'),
        box = $('.box'),
        //openid = $('#openid'),
        reg = /^1\d{10}$/,
        re = /^\d{4}$/;

    init();

    function init() {
        initStat();
        bindEvent();
    }

    function initStat() {
        var phone = phoneEle.val(),
            testp = reg.test(phone),
            code;
        codeEle.val('');
        code = codeEle.val();
        switchStatus(testp);

        /* jshint expr: true */
        testp && code ? loginEle.removeClass('no-sub') : loginEle.addClass('no-sub');
    }

    function bindEvent() {
        //获取验证码可用
        phoneEle.on('input', function() {
            switchStatus(false);
            tipEle.html('');
            var val = $(this).val();
            if (val.length === 11) {
                var str = checkPhonePattern(val);
                if (str) {
                    tipEle.html(str);
                } else {
                    switchStatus(true);
                }
            }
        });

        //下发短信验证码
        sendEle.on('click', function() {
            if ($(this).hasClass('codein')) {
                var tip = checkPhonePattern(phoneEle.val());
                /* jshint expr: true */
                tip ? tipEle.html(tip) : sendPhoneCode(phoneEle.val());
            }
        });

        //确定按钮
        loginEle.on('click', function() {
            if (!loginEle.hasClass('no-sub')) {
                var code = codeEle.val(),
                    tip = checkPhonePattern(phoneEle.val());
                if (tip !== '') {
                    tipEle.html(tip);
                } else if (code === '') {
                    tipEle.html('验证码没有输入');
                } else if (!re.test(code)) {
                    tipEle.html('手机验证码错误');
                } else {
                    phoneEle.blur();
                    codeEle.blur();
                    login();
                }
            }
        });

        //判断“确定”按钮是否可点
        box.on('input', 'input', function() {
            var phone = phoneEle.val(),
                code = codeEle.val();
            if (reg.test(phone) && code) {
                loginEle.removeClass('no-sub');
            } else {
                loginEle.addClass('no-sub');
            }
        });
    }

    //验证手机号格式错误
    function checkPhonePattern(num) {
        if (num === '') {
            return '手机号没有输入';
        }
        if (!reg.test(num)) {
            return '手机号格式错误';
        }
        return '';
    }

    //下发验证码
    function sendPhoneCode(num) {
        service.sendCode({
            data: {
                phone: num
            },
            success: successCb,
            error: errorCb
        });

        function successCb() {
            switchStatus(false);
            sendEle.addClass('sending');
            var num = 60,
                str;
            str = num + '秒后重试';
            sendEle.html(str);
            var timer = setInterval(function() {
                num--;
                str = num + '秒后重试';
                sendEle.html(str);
                if (num <= 0) {
                    recoverBtn(timer);
                    sendEle.removeClass('sending');
                    if (!checkPhonePattern(phoneEle.val())) {
                        switchStatus(true);
                    }
                }
            }, 1000);
        }

        function errorCb(d) {
            tipEle.html(d.msg);
        }

        //恢复下发短信验证码按钮
        function recoverBtn(timer) {
            /* jshint expr: true */
            timer && clearInterval(timer);
            sendEle.html('获取验证码');
            switchStatus(true);
        }
    }

    //登陆
    function login() {
        var data = {
            phone: phoneEle.val(),
            code: codeEle.val()
            //openid: openid.val()
        };
        service.register({
            data: data,
            success: successCb,
            error: errorCb
        });

        function successCb(ret) {
            showPopup(ret.msg);
            // 跳转页面
            setTimeout(function() {
                window.location.href = ret.redirect;
            }, 1000);
        }

        function errorCb(ret) {
            tipEle.html(ret.msg);
        }
    }

    //更改＂获取验证码＂的按钮
    function switchStatus(status) {
        if (!sendEle.is('.sending')) {
            /* jshint expr: true */
            status ? sendEle.addClass('codein') : sendEle.removeClass('codein');
        }
    }

    function showPopup(msg) {
        var width, height, content;
        width = 100;
        height = 50;
        content = $.temp('pop_tpl_success', {'msg': msg});
        var pop = new popup({
            width: width,
            height: height,
            isMask: false,
            showTime: 1000,
            content: content
        });
        pop.showPop();
    }
});
var Uploader = require('../modules/uploader.js');
var popup = require('../modules/popup.js');
var doublewheel = require('../modules/doublewheel.js');
var service = require('../services/userService.js');

$(function() {
    "use strict";

    var fullName = $('#full_name'),
        idCard = $('#id_card'),
        aliPay = $('#ali_account'),
        $errTip = $('#errTip'),
        $mainBlock = $('#main_block'),
        $saveData = $('#mb_data'),
        change = $('#sub').data('change'),
        poptip;

    init();

    function init() {
        initParams();
        changeStatus();
        input();
        dealWheel();
        addPic();
        delPic();
        popUp();
        subInfo();
    }

    function initParams() {
        new Uploader({
            fileDom: $('#file0'),
            index: 0
        });
        new Uploader({
            fileDom: $('#file1'),
            index: 1
        });
    }

    function input() {
        $('.itxt').on('input', function() {
            changeStatus();
        });
    }

    function dealWheel() {
        var mbwheel = new doublewheel({
            doubleH: 248,
            moduleName: 'mb',
            elements: {
                $doubleAll: $('.double-all'),
                $mask: $('.mask-double'),
                $wheel: $('.double-wheel'),
                $btnCancel: $('.btn-cancel-wheel'),
                $btnSure: $('.btn-sure-wheel'),
                $columnLeft: $('.column-left'),
                $columnRight: $('.column-right')
            }
        });
        mbwheel.setScrolledCb(leftScrollCb, rightScrollCb);
        mbwheel.scrollToIndex(1, 0);
        $mainBlock.on('click', function() {
            mbwheel.show();
        });
        $.sp.subscribe('double.mb.btnSure', function() {
            sureMsg();
            mbwheel.hide();
            changeStatus();
        });
        $.sp.subscribe('double.mb.btnCancel', function() {
            mbwheel.hide();
        });

        function sureMsg() {
            var leftVal = $('.column-left .selected-item-left').html();
            var leftId = $('.column-left .selected-item-left').attr('left');
            var rightVal = $('.column-right .selected-item-right').html();
            var rightId = $('.column-right .selected-item-right').attr('right');
            var val = leftVal + '-' + rightVal;
            $mainBlock.text(val);
            $mainBlock.removeClass('txt-info');
            $saveData.data('region', leftId);
            $saveData.data('block', rightId);
        }

        function leftScrollCb() {
            var seletedIdx = mbwheel.getSelectedIdx();
            var opts = mbwheel.getOpts();
            var $items = opts.$left.find('.' + opts.leftItemName),
                sltedIndex = seletedIdx.leftIdx,
                sltedLeftClass = opts.sltedLeftClass;
            mbwheel.defaultCb($items, sltedIndex, sltedLeftClass);
            changeRightData(seletedIdx);
        }

        function rightScrollCb() {
            var seletedIdx = mbwheel.getSelectedIdx();
            var opts = mbwheel.getOpts();
            var $items = opts.$right.find('.' + opts.rightItemName),
                sltedIndex = seletedIdx.rightIdx,
                sltedRightClass = opts.sltedRightClass;
            mbwheel.defaultCb($items, sltedIndex, sltedRightClass);
        }

        function changeRightData(s) {
            var html = $($('.none')[s.leftIdx]).html();
            $('.column-right').html(html);
            mbwheel.initRightwheel();
            mbwheel.scrollToRightIndex(0);
            
        }
    }

    //添加图片成功
    function addPic() {
        $.sp.subscribe('uploader_error', function() {
            $('.err-msg').html('上传图片格式有误！');
        });
        $.sp.subscribe('uploader_init', function() {
            $('.err-msg').html('');
            $('.ajax-loading').addClass('active');
        });
        $.sp.subscribe('uploader_success', function(data) {
            $('.ajax-loading').removeClass('active');
            var picture = $.temp('addPic', {
                    'pic': data.images
                }),
                $picbtn = $('#file' + data.index).parent();
            $picbtn.append(picture);
            changeStatus();
        });
    }

    //删除图片功能
    function delPic() {
        $('.upload-box').on('click', '.pic-del', function() {
            $(this).parent().remove();
            changeStatus();
        });
    }

    //确认
    function subInfo() {
        var data;
        $('#sub').on('click', function() {
            if($(this).hasClass('no-sub')) {
                return;
            }
            var name = fullName.val(),
                id = idCard.val(),
                ali = aliPay.val(),
                frontimg = $('.front').find('.id-card').data('imgid'),
                endimg = $('.end').find('.id-card').data('imgid'),
                regname = /^[\u4e00-\u9fa5a-zA-Z ]{1,5}$/g,
                reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/g;

            if(!(name && id && ali)) {
                $errTip.html('请补全所有信息');
            }else if (!frontimg || !endimg) {
                $errTip.html('请上传身份证正反面');
            }else if(!reg.test(id)) {
                $errTip.html('身份证号不正确');
            }else if(!regname.test(name)) {
                $errTip.html('请输入和身份证相同的名字');
            }else {
                $errTip.html('');
                if(change == 'on') {
                    data = {
                        'alipay_account': ali,
                        'district_id':$saveData.data('region'),
                        'block_id': $saveData.data('block')
                    };
                }else {
                    data = {
                        'name': name,
                        'identity_card_number': id,
                        'alipay_account': ali,
                        'district_id':$saveData.data('region'),
                        'block_id': $saveData.data('block'),
                        'identity_card_positive_photo': frontimg,
                        'identity_card_negative_photo': endimg
                    };
                }
                poptip.showPop();
            }
        });
        $('#btnCancel').on('click', function() {
            poptip.closePop();
        });
        $('#btnSure').on('click', function() {
            goService(data);
        });
    }

    function popUp() {
        poptip = new popup({
            width: 270,
            height: 150,
            maskColor: '#000',
            maskOpacity: '.5',
            contentBg: '#ececec',
            content: $('#popTpl').html()
        });
    }

    function goService (data) {
        if(change == 'on') {
            service.changeInfo({
                data: data,
                success: sucFn,
                error: errFn
            });
        } else {
            service.personInfo({
                data: data,
                success: sucFn,
                error: errFn
            });
        }
        function sucFn(d) {
            poptip.closePop();
            window.location.href = d.redirect;
        }
        function errFn(d) {
            poptip.closePop();
            $errTip.html(d.msg);
        }
    }

    function changeStatus() {
        if(fullName.val() && idCard.val() && aliPay.val() && $saveData.data('region') && $saveData.data('region') && $('.front').find('.id-card').data('imgid') && $('.end').find('.id-card').data('imgid')) {
            $('#sub').removeClass('no-sub');
        }else {
            $('#sub').addClass('no-sub');
        }
    }

});
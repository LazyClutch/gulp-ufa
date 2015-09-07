var popup = require('../modules/popup.js');
var service = require('../services/propService.js');

$(function() {
    "use strict";

    var $tel = $('#tel'),
        $invent = $('#invent'),
        $collect = $('#collect'),
        housetip = {},
        poptip = {},
        $currDom = null;

    init();

    function init() {
        popUp();
        housePopUp();
        getPhone();
        getHouse();
        toggleCollect();
        initEvent();
    }

    function popUp() {
        poptip = new popup({
            width: 270,
            height: 150,
            maskColor: '#000',
            maskOpacity: '.5',
            contentBg: '#ececec',
            content: $('#popTelTpl').html()
        });
    }

    function housePopUp() {
        housetip = new popup({
            width: 270,
            height: 150,
            maskColor: '#000',
            maskOpacity: '.5',
            contentBg: '#ececec',
            content: $('#popHouseTpl').html()
        });
    }

    function getPhone() {
        $tel.on('click', function() {
            if($($tel.find('a')).length !== 0) {
                return;
            }
            var cost = $tel.data('cost');
            $('.pop-tel-cost').text(cost);
            poptip.showPop();
        });
        $('#btnCancel').on('click', function() {
            poptip.closePop();
            $('.err-tel-tip').html('').hide();
        });
        $('#btnSure').on('click', function() {
            var pid = $tel.data('invent');
            var data = {
                'property_id': pid,
                'object_type': 'unlock_phone'
            };
            service.unlock({
                data: data,
                success: sucFn,
                error: errFn
            });
            function sucFn(d) {
                poptip.closePop();
                var html = '<a href="tel:'+d.data[0]+'" class="tel"><i class="iconfont">&#xe612;</i>'+d.data[0]+'</a>';
                $tel.html(html);
            }
            function errFn(d) {
                $('.err-tel-tip').html(d.msg).show();
            }
        });
    }

    function getHouse() {
        $invent.on('click', '.invent-item', function() {
            var $self = $(this);
            var cost = $self.data('cost');
            $currDom = $self;
            if($.trim($(this).attr('href')) == 'javascript:;') { //jshint ignore:line
                $('.pop-house-cost').text(cost);
                housetip.showPop();
            }
        });
    }

    function initEvent () {
        $('#btnCancelHouse').on('click', function() {
            housetip.closePop();
            $('.err-house-tip').html('').hide();
        });
        $('#btnSureHouse').on('click', function() {
            if ($currDom === null) {
                return;
            }
            var pid = $currDom.attr('data-invent-item');
            var data = {
                'property_id': pid,
                'object_type': 'unlock_house'
            };
            service.unlock({
                data: data,
                success: sucFn,
                error: errFn
            });
            function sucFn(d) {
                housetip.closePop();
                $currDom.attr('href', d.redirect);
                window.location.href = d.redirect;
            }
            function errFn(d) {
                $('.err-house-tip').html(d.msg).show();
            }
        });
    }

    function toggleCollect() {
        $collect.on('click', function() {
            var status = $collect.data('status'),
                data = {
                    'community_id': $collect.data('cid')
                };
            service.collectCommunity({
                data: data,
                success: sucFn,
                error: errFn
            });
            function sucFn() {
                if(status == 0) {  //jshint ignore:line
                    $collect.addClass('has');
                    $collect.html('已收藏小区');
                    $collect.data('status', 1);
                }else {
                    $collect.removeClass('has');
                    $collect.html('<i class="iconfont">&#xe617;</i>收藏小区');
                    $collect.data('status', 0);
                }
            }
            function errFn() {}
        });
    }
});
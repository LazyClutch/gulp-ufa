var service = require('../services/userService.js');

$(function() {
    "use strict";

    var $price = $('#price'),
        $sub = $('#sub'),
        $errTip = $('#errTip'),
        maxmoney = +$price.data('maxmoney'),
        minmoney = +$price.data('minmoney');

    function init() {
        subInfo();
        changeStatus();
    }

    function subInfo() {
        function sucFn() {
            var sucTpl = $('#sucTpl').html();
            $('.withdraw').remove();
            $('.content-wrapper').append(sucTpl);
        }

        function errFn(d) {
            $errTip.html(d.msg);
        }

        $sub.on('click', function() {
            if ($sub.hasClass('no-sub')) {
                return;
            }
            var priceval = $price.val();
            if (priceval < minmoney) {
                $errTip.html('单次最低提现' + minmoney + '元');
            } else if (priceval > maxmoney) {
                $errTip.html('超过最大提现金额');
            } else {
                $errTip.html('');
                service.withdraw({
                    data: {
                        money: priceval
                    },
                    success: sucFn,
                    error: errFn
                });
            }
        });
    }

    function changeStatus() {
        $price.on('input', function() {
            if ($price.val()) {
                $sub.removeClass('no-sub');
            } else {
                $sub.addClass('no-sub');
            }
        });
    }

    init();
});
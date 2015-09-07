var Waterfall = require('../modules/waterfall.js');
var autocomplete = require('../modules/autocomplete.js');
var Iscroll = require('../modules/iscroll.js');
var service = require('../services/propService.js');
var popup = require('../modules/popup.js');
$(function () {
    var params = $.params,
        pager = params.pager,
        d = params.data,
        waterfallInstace = null,
        autocompleteInstance = null,
        filtertTopPos = 0,
        visibleTopPos = 0,
        myIscroll = [],
        housetip = null,
        $currDom = null;

    function initWaterfall () {
        if (Number(pager.current_page) < Number(pager.last_page)) {  //jshint ignore:line
            d.page = 1;
            d.per_page = 10;  //jshint ignore:line
            waterfallInstace = new Waterfall({
                resources: service.getMoreHouse,
                onLoad: function(data) {
                    if (data.properties.length > 0) {
                        $('.inventory-list').append($.temp('inventory_list_tepl', {
                            'names': data.properties
                        }));
                    }
                },
                data: d,
                wrap: '.content-wrapper',
                eventDom: $(window)
            });
        }
    }

    function initAutocomplete () {
        autocompleteInstance = new autocomplete({
            resources: service.getCommunityList
        });
    }

    function initEvent () {
        $('#list_filter').on('click', '.filter-title', function () {
            if ($(this).attr('data-status') == 1) {
                $(this).attr('data-status', 0);
                _closeFilterPop();
                return;
            } else {
                $(this).attr('data-status', '1').siblings('.filter-title').attr('data-status', 0);
            }
            var index = $(this).attr('data-index');
            visibleTopPos = document.body.scrollTop;
            $(this).find('i').addClass('filter-icon-rotate').end().siblings().find('i').removeClass('filter-icon-rotate');
            if (filtertTopPos > visibleTopPos) {
                window.scrollTo(0, filtertTopPos);
            }
            $('#filter_detail').show();
            $('#wrapper_' + index).show().siblings('div').hide();
            $('.mask').show();

            $('.filter-arrow').css({
                'display': 'inline',
                'left': (100/6) * (Number(index) * 2 - 1) + '%'
            });

            if (myIscroll[index - 1] === undefined) {
                _createIscroll(index - 1, '#filter_' + index);
                _setPosition(index - 1, _getPosY(index, 'cur-item'));
            }
        });

        $('.mask').on('touchstart', function () {
            $(this).hide();
            $('.list-filter').find('i').removeClass('filter-icon-rotate');
            $('.filter-arrow').hide();
            $('#filter_detail').hide();
            window.scrollTo(0, visibleTopPos);
        });

        $('#search_placeholder').on('click', function (e) {
            if ($(e.target).is('#search_house_cancle')) {
                e.stopPropagation();
                location.href = params.default_url;  //jshint ignore:line
            } else {
                _closeFilterPop();
                e.preventDefault();
                e.stopPropagation();
                $('.search-house-wrap').hide();
                $('#list_filter').hide();
                $('.inventory-list').hide();
                $('.mask').hide();
                $('#waterfall_loading').hide();
                $('.no-result').hide();
                $('#auto-wrap').show();
                waterfallInstace && waterfallInstace.stop();  //jshint ignore:line
                autocompleteInstance.setInputVal($('#search_placeholder').attr('data-value'));
                $('html, body').scrollTop(0);
                setTimeout(function() {
                    autocompleteInstance.focus();
                });
            }
        });

        $.sp.subscribe('search_canceled', function() {
            $('#auto-wrap').hide();
            $('.search-house-wrap').show();
            $('#list_filter').show();
            $('.inventory-list').show();
            $('.no-result').show();
            waterfallInstace && waterfallInstace.start();  //jshint ignore:line
        });

        $.sp.subscribe('autocomplete_entered', function(oData) {
            location.href = '/house/list?city_id=' + oData.cityid + '&keyword=' + oData.keyword;
        });

        $.sp.subscribe('value_changed', function(oData) {
            location.href = '/house/list?city_id=' + oData.cityid + '&community_id=' + oData.id + '&community_name=' + oData.name; 
        });

        $('#inventory_list').on('click', '.inventory-item', function () {
            var $self = $(this);
            var cost = $self.data('cost');
            $currDom = $self;
            var name = 'name' + $currDom.attr('data-invent-item');
            var href = sessionStorage.getItem(name);
            if(href) {
                window.location.href = href;
                return;
            }
            if($.trim($(this).attr('href')) == 'javascript:;') {  //jshint ignore:line
                $('.pop-house-cost').text(cost);
                housetip.showPop();
            }
        });

        $('#btnCancelHouse').on('click', function() {
            housetip.closePop();
            $('.err-house-tip').html('').hide();
        });

        $('#btnSureHouse').on('click', function() {
            if ($currDom === null) {
                return;
            }
            var data = {
                'property_id': $currDom.attr('data-invent-item'),
                'object_type': 'unlock_house'
            };
            service.unlock({
                data: data,
                success: sucFn,
                error: errFn
            });
            function sucFn(d) {
                housetip.closePop();
                var name = 'name' + $currDom.attr('data-invent-item');
                sessionStorage.setItem(name, d.redirect);
                $currDom.attr('href', d.redirect);
                window.location.href = d.redirect;
            }
            function errFn(d) {
                $('.err-house-tip').html(d.msg).show();
            }
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

    function _createIscroll (index, id) {
        if (myIscroll[index] === undefined) {
            myIscroll[index] = new Iscroll({
                $ele: id
            });
        }
    }

    function _setPosition (index, posY) {
        var dis = Math.abs(posY) - 244;
        dis > 0 ? myIscroll[index].scroll(-dis) : '';  //jshint ignore:line
    }

    function _getPosY (index, className) {
        var target = $('.' + className, '#filter_' + index);
        return target.length ? target.position().top : 0;
    }

    function _closeFilterPop() {
        $('#filter_detail').hide();
        $('.filter-arrow').hide();
        $('.mask').hide();
        $('.filter-title').find('i').removeClass('filter-icon-rotate');
    }

    function init () {
        filtertTopPos = $('#list_filter').offset().top;
        housePopUp();
        initEvent();
        initWaterfall();
        initAutocomplete();
    }

    init();
});


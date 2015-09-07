var autocomplete = require('../modules/autocomplete.js');
var doublewheel = require('../modules/doublewheel.js');
var singlewheel = require('../modules/singlewheel.js');
var SecCont = require('../house360/sec-input.js');
var popup = require('../modules/popup.js');
var service = require('../services/propService.js');
$(function() {
    var Page = function(op) {
        var self = this;

        self._op = $.extend({}, {
            resources: []
        }, op);

        self.auto = new autocomplete({
            resources: self._op.resources
        });
        self.$searchIpt = $('#search_input_box');
        self.$firstWrap = $('.first-cont');
        self.$btnRepeat = $('#btn_repeat');
        self.$name = $('#name');
        self.$phone = $('#phone');
        self.$building = $('#build_num');
        self.$door = $('#door_num');
        self.$msg = $('#errTip');
        self.$id = $('#hidden_id');
        self.$cityid = $('#hidden_cityid');
        self.poptip = null;
        self.$entrustBox = $('.entrust-box');

        self.$city = $('#city');
        self.$ctbox = $('#city_box');
        self.init();
    };

    Page.prototype = {
        init: function() {
            var self = this;
            self.newPopTip();
            self.changeCities();
            // autocomplete 注册事件
            $.sp.subscribe('value_changed', function(oData) {
                $('#auto-wrap').hide();
                self.changeBgColor(false);
                self.$firstWrap.show();
                self.setSearchTxt(oData);
                self.$id.val(oData.id);
                self.$cityid.val(oData.cityid);
                self.changeStatus();
            });

            $.sp.subscribe('autocomplete_entered', function(oData) {
                self.setSearchTxt(oData);
                $('#auto-wrap').hide();
                self.changeBgColor(false);
                self.$firstWrap.show();
                self.$id.val('');
                self.$cityid.val('');
                self.changeStatus();
            });

            $.sp.subscribe('search_canceled', function() {
                $('#auto-wrap').hide();
                self.changeBgColor(false);
                self.$firstWrap.show();
            });

            $.sp.subscribe('error', function(key) {
                self.$msg.text(Page._default[key]);
            });

            $.sp.subscribe('success', function() {
                self.$msg.html('');
                var d = {
                    'seller_phone': self.$phone.val(),
                    'community_id': self.$id.val(),
                    'building_num': $.trim(self.$building.val()),
                    'door_num': $.trim(self.$door.val())
                };
                service.checkRepeatablity({
                    data: d,
                    success: function() {
                        self.$firstWrap.hide();
                        $('.second-cont').show();
                        var data = {
                            'seller_alias': $.trim(self.$name.val()),
                            'seller_phone': self.$phone.val(),
                            'city_id': self.$cityid.val(),
                            'community_id': self.$id.val(),
                            'building_num': $.trim(self.$building.val()),
                            'door_num': $.trim(self.$door.val())
                        };
                        new SecCont(data, service, doublewheel, singlewheel);
                    },
                    error: function(data) {
                        self.$msg.text(data.msg);
                    }
                });
            });

            $('#search_input_box').on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                self.changeBgColor(true);
                self.$firstWrap.hide();
                $('#auto-wrap').show();
                self.auto.setInputVal(self.getSearchTxt());
                $('html, body').scrollTop(0);
                setTimeout(function() {
                    self.auto.focus();
                });
            });

            self.$btnRepeat.on('click', function() {
                self.validate();
            });

            self.$firstWrap.on('input', 'input', function() {
                self.changeStatus();
            });
        },
        setSearchTxt: function(oData) {
            if (oData.name) {
                this.$searchIpt.text(oData.name).removeClass('txt-info');
            } else if (oData.keyword) {
                this.$searchIpt.text(oData.keyword).removeClass('txt-info');
            } else {
                this.$searchIpt.text(this.$searchIpt.data('placeholder')).addClass('txt-info');
            }
        },
        getSearchTxt: function() {
            return this.$searchIpt.text() == this.$searchIpt.data('placeholder') ? '' : this.$searchIpt.text();
        },
        changeStatus: function() {
            var self = this;
            if (self.$name.val() && self.$phone.val() && self.$id.val() && self.$cityid.val() && self.$building.val() && self.$door.val()) {
                self.$btnRepeat.removeClass('no-sub');
            } else {
                self.$btnRepeat.addClass('no-sub');
            }
        },

        //post提示
        newPopTip: function() {
            var self = this;
            self.poptip = new popup({
                height: 80,
                maskColor: '#FFF',
                maskOpacity: '0',
                contentBg: '#333',
                showTime: 2000,
                content: $('#popTip').html()
            });
        },
        validate: function() {
            var self = this,
                name = self.$name.val(),
                phone = self.$phone.val(),
                regphone = /^1\d{10}$|^0\d{10,11}$|^\d{8}$/g,
                regname = /^[\u4e00-\u9fa5a-zA-Z ]{1,5}$/g;
            if (self.$btnRepeat.hasClass('no-sub')) {
                return;
            }
            if (!$.trim(name)) {
                $.sp.publish('error', ['name']);
                return;
            }
            if (!phone) {
                $.sp.publish('error', ['phone']);
                return;
            }
            if (!(self.$id.val() && self.$cityid.val())) {
                $.sp.publish('error', ['community']);
                return;
            }
            if (!$.trim(self.$building.val())) {
                $.sp.publish('error', ['building']);
                return;
            }
            if (!$.trim(self.$door.val())) {
                $.sp.publish('error', ['door']);
                return;
            }
            if (!regname.test(name)) {
                $.sp.publish('error', ['checkname']);
                return;
            }
            if (!regphone.test(phone)) {
                $.sp.publish('error', ['checkphone']);
                return;
            }
            $.sp.publish('success');
        },

        //清空填写的数据（兼容微信浏览器返回会执行js）
        clearContent: function() {
            var self = this;
            self.setSearchTxt('');
            self.$price.val('');
            var $phone = $('#phone');
            var attr = $phone.attr('type');
            /* jshint expr: true */
            (attr == 'hidden') ? null: $phone.val('');
        },

        changeBgColor: function(isAdd) {
            /* jshint expr: true */
            isAdd ? $('.page').addClass('bg-page') : $('.page').removeClass('bg-page');

        },

        changeCities: function() {
            var self = this;
            $('#auto-wrap').on('click', function() {
                if (self.$ctbox.hasClass('show')) {
                    self.$ctbox.removeClass('show');
                }
            });
            self.$city.on('click', function(e) {
                e.stopPropagation();
                $(self.auto.op.inputSelect).val('');
                self.auto.cancelAll.hide();
                $(self.auto.op.listSelect).empty().hide();
                self.$ctbox.toggleClass('show');
            });
            self.$ctbox.on('click', 'li', function() {
                $(this).addClass('cur').siblings('li').removeClass('cur');
                var ctid = self.$ctbox.find('.cur').data('id'),
                    ctname = self.$ctbox.find('.cur').html();

                self.$city.find('span').text(ctname);
                self.$ctbox.removeClass('show');
                self.auto.changeCityId(ctid);
            });
        }
    };

    Page._default = {
        'name': '请填写房东称呼',
        'phone': '请输入联系电话',
        'checkname': '名字只能包含中文和英文',
        'checkphone': '手机格式不正确',
        'community': '请选择所属小区',
        'building': '楼栋号不能为空',
        'door': '房号不能为空',
        'sale': '售价必须是40亿及以下的数值'
    };

    new Page({
        resources: service.getCommunityList
    });
});
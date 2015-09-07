module.exports = (function() {

    var HouseDetail = function(d, server, doublewheel, singlewheel) {
        this.data = d;
        this.server = server;
        this.doublewheel = doublewheel;
        this.singlewheel = singlewheel;
        this.reg = /^\d+(?:\.\d{1,2})?$/;
        this.init();
    };

    HouseDetail.prototype = {
        init: function() {
            this.dom = {
                $secCont: $('.second-cont'),
                $thirdCont: $('.third-cont'),
                $btnSure: $('#btn_sure'),
                $price: $('#sec_money'),
                $area: $('#sec_area'),
                $bedrooms: $('#sec_bedroom'),
                $livingrooms: $('#sec_living_room'),
                $bathrooms: $('#sec_bathroom'),
                $floor: $('#sec_floor'),
                $orientation: $('#sec_orientation'),
                $fitment: $('#sec_fitment'),
                $buildingtype: $('#sec_building_type'),
                $listedAt: $('#sec_listed_at'),
                $tags: $('#sec_tags'),
                $saveData: $('#save_data'),
                $secError: $('#sec_errTip')
            };
            this.chooseTags();
            this.submitInfo();
            this.dealWheel();
            this.dealListedWheel();
            this.dealSingleWheel();
        },
        chooseTags: function() {
            var self = this;
            self.dom.$tags.on('click', 'span', function() {
                $($(this).find('i')).toggleClass('active');
            });
        },
        submitInfo: function() {
            var self = this;
            self.dom.$btnSure.on('click', function() {
                var price = self.dom.$price.val(),
                    area = self.dom.$area.val(),
                    bedrooms = $.trim(self.dom.$bedrooms.val()),
                    livingrooms = $.trim(self.dom.$livingrooms.val()),
                    bathrooms = $.trim(self.dom.$bathrooms.val()),
                    floor = self.dom.$saveData.data('floor'),
                    totalfloor = self.dom.$saveData.data('total-floor'),
                    orient = self.dom.$saveData.data('orientation'),
                    fitment = self.dom.$saveData.data('fitment'),
                    buildingtype = self.dom.$saveData.data('buildingtype'),
                    listed = self.dom.$saveData.data('listed'),
                    tags = [];

                var b = self.validateInfo(price, area, bedrooms, livingrooms, bathrooms, floor, totalfloor);
                if (b) {
                    var active = self.dom.$tags.find('.active');
                    for (var i = 0; i < active.length; i++) {
                        tags.push($(active[i]).data('id'));
                    }
                    var data = $.extend({}, self.data, {
                        'price': price,
                        'area': area,
                        'bedrooms': bedrooms,
                        'living_rooms': livingrooms,
                        'bathrooms': bathrooms,
                        'floor': floor,
                        'total_floors': totalfloor,
                        'orientation': orient,
                        'fitment': fitment,
                        'building_type': buildingtype,
                        'tags': tags,
                        'listed_at': listed
                    });
                    self.server.inputHouse({
                        data: data,
                        success: function() {
                            self.dom.$secError.html('');
                            self.dom.$secCont.hide();
                            self.dom.$thirdCont.show();
                        },
                        error: function(d) {
                            self.dom.$secError.html(d.msg);
                        }
                    });
                }
            });
        },
        validateInfo: function(p, a, bed, l, bath, f, tf) {
            var self = this;
            if (!p) {
                self.dom.$secError.html('请输入价格');
                return false;
            }
            if (!a) {
                self.dom.$secError.html('请输入面积');
                return false;
            }
            if (p && p >= 1000000) {
                self.dom.$secError.html('价格需小于100亿');
                return false;
            }
            if (a && a >= 1000000) {
                self.dom.$secError.html('所填面积超过限制面积');
                return false;
            }
            if (!self.reg.test(a)) {
                self.dom.$secError.html('面积最多两位小数');
                return false;
            }
            if (!(bed && l && bath)) {
                self.dom.$secError.html('请完善户型信息');
                return false;
            }
            if (!(bed < 20 && l < 20 && bath < 20)) {
                self.dom.$secError.html('户型信息不合理，请重新输入');
                return false;
            }
            if(f && tf && (f > tf)) {
                self.dom.$secError.html('楼层选择有误，请重新选择');
                return false;
            }
            return true;
        },
        dealWheel: function() {
            var self = this;
            self.floorInfo = {
                showLeft: '2层',
                hideLeft: '2',
                showRight: '6层',
                hideRight: '6'
            };
            var lcwheel = new self.doublewheel({
                doubleH: 248,
                moduleName: 'lc',
                elements: {
                    $doubleAll: $($('.double-all')[0]),
                    $mask: $($('.mask-double')[0]),
                    $wheel: $($('.double-wheel')[0]),
                    $btnCancel: $($('.btn-cancel-wheel')[0]),
                    $btnSure: $($('.btn-sure-wheel')[0]),
                    $columnLeft: $($('.column-left')[0]),
                    $columnRight: $($('.column-right')[0])
                }
            });
            lcwheel.setScrolledCb(leftScrollCb, rightScrollCb);
            lcwheel.scrollToIndex(1, 5);
            self.dom.$floor.on('click', function() {
                lcwheel.show();
            });
            $.sp.subscribe('double.lc.btnSure', function() {
                sureFloor();
                lcwheel.hide();
            });
            $.sp.subscribe('double.lc.btnCancel', function() {
                lcwheel.hide();
            });

            function sureFloor() {
                self.floorInfo = lcwheel.getSelected();
                var val = self.floorInfo.showLeft + '，' + self.floorInfo.showRight;
                self.dom.$floor.text(val);
                self.dom.$floor.removeClass('txt-info');
                self.dom.$saveData.data('floor', self.floorInfo.hideLeft);
                self.dom.$saveData.data('total-floor', self.floorInfo.hideRight);
            }

            function leftScrollCb() {
                var seletedIdx = lcwheel.getSelectedIdx();
                var opts = lcwheel.getOpts();
                var $items = opts.$left.find('.' + opts.leftItemName),
                    sltedIndex = seletedIdx.leftIdx,
                    sltedLeftClass = opts.sltedLeftClass;
                lcwheel.defaultCb($items, sltedIndex, sltedLeftClass);
            }

            function rightScrollCb() {
                var seletedIdx = lcwheel.getSelectedIdx();
                var opts = lcwheel.getOpts();
                var $items = opts.$right.find('.' + opts.rightItemName),
                    sltedIndex = seletedIdx.rightIdx,
                    sltedRightClass = opts.sltedRightClass;
                lcwheel.defaultCb($items, sltedIndex, sltedRightClass);
            }
        },
        dealListedWheel: function() {
            var self = this;
            self.listedInfo = {
                showLeft: '2015',
                hideLeft: '2015',
                showRight: '06',
                hideRight: '06'
            };
            var gpwheel = new self.doublewheel({
                doubleH: 248,
                moduleName: 'gp',
                elements: {
                    $doubleAll: $($('.double-all')[1]),
                    $mask: $($('.mask-double')[1]),
                    $wheel: $($('.double-wheel')[1]),
                    $btnCancel: $($('.btn-cancel-wheel')[1]),
                    $btnSure: $($('.btn-sure-wheel')[1]),
                    $columnLeft: $($('.column-left')[1]),
                    $columnRight: $($('.column-right')[1])
                }
            });
            gpwheel.setScrolledCb(leftScrollCb, rightScrollCb);
            gpwheel.scrollToIndex(0, 1);
            self.dom.$listedAt.on('click', function() {
                gpwheel.show();
            });
            $.sp.subscribe('double.gp.btnSure', function() {
                sureListed();
                gpwheel.hide();
            });
            $.sp.subscribe('double.gp.btnCancel', function() {
                gpwheel.hide();
            });

            function sureListed() {
                self.listedInfo = gpwheel.getSelected();
                var val = self.listedInfo.showLeft + '-' + self.listedInfo.showRight;
                self.dom.$listedAt.text(val);
                self.dom.$listedAt.removeClass('txt-info');
                self.dom.$saveData.data('listed', val);
            }

            function leftScrollCb() {
                var seletedIdx = gpwheel.getSelectedIdx();
                var opts = gpwheel.getOpts();
                var $items = opts.$left.find('.' + opts.leftItemName),
                    sltedIndex = seletedIdx.leftIdx,
                    sltedLeftClass = opts.sltedLeftClass;
                gpwheel.defaultCb($items, sltedIndex, sltedLeftClass);
            }

            function rightScrollCb() {
                var seletedIdx = gpwheel.getSelectedIdx();
                var opts = gpwheel.getOpts();
                var $items = opts.$right.find('.' + opts.rightItemName),
                    sltedIndex = seletedIdx.rightIdx,
                    sltedRightClass = opts.sltedRightClass;
                gpwheel.defaultCb($items, sltedIndex, sltedRightClass);
            }
        },

        dealSingleWheel: function() {
            var self = this,
                moduleNames = ['cx', 'zx', 'lx'],
                wheel = [];
            for (var i = 0; i < moduleNames.length; i++) {
                wheel[i] = new self.singlewheel({
                    moduleName: moduleNames[i],
                    wheelH: 248,
                    elements: {
                        $singleAll: $($('.single-all')[i]),
                        $mask: $($('.mask-single')[i]),
                        $wheel: $($('.single-wheel')[i]),
                        $btnCancel: $($('.btn-cancel-single')[i]),
                        $btnSure: $($('.btn-sure-single')[i]),
                        $columnContainer: $($('.wheel-container-items')[i])
                    }
                });
                wheel[i].scrollToIndex(0);
            }
            //确定/取消按钮需要做的事情
            $.sp.subscribe('single.cx.btnSure', function() {
                sureVals(wheel[0], self.dom.$orientation, 'orientation');
                wheel[0].hide();
            });
            $.sp.subscribe('single.cx.btnCancel', function() {
                wheel[0].hide();
            });
            $.sp.subscribe('single.zx.btnSure', function() {
                sureVals(wheel[1], self.dom.$fitment, 'fitment');
                wheel[1].hide();
            });
            $.sp.subscribe('single.zx.btnCancel', function() {
                wheel[1].hide();
            });
            $.sp.subscribe('single.lx.btnSure', function() {
                sureVals(wheel[2], self.dom.$buildingtype, 'buildingtype');
                wheel[2].hide();
            });
            $.sp.subscribe('single.lx.btnCancel', function() {
                wheel[2].hide();
            });

            self.dom.$orientation.on('click', function() {
                wheel[0].show();
            });

            self.dom.$fitment.on('click', function() {
                wheel[1].show();
            });

            self.dom.$buildingtype.on('click', function() {
                wheel[2].show();
            });

            function sureVals(wheel, dom, p) {
                self.vals = wheel.getSelected();
                var val = self.vals.showVal;
                dom.text(val);
                dom.removeClass('txt-info');
                self.dom.$saveData.data(p, self.vals.hideVal);
            }

        }

    };

    return HouseDetail;
})();
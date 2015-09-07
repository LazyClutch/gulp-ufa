var Sw = require('../modules/scrollwheel.js');

module.exports = (function () {
    'use strict';

    /*使用过程可以参考ui.doublewheel组件*/

    var SingleWheel = function(opts) {
        var defOpts = {
            moduleName: null,
            wheelH: 248, //包括“确定”/"取消"按钮的高度
            elements: {
                $singleAll: null,
                $mask: null,
                $wheel: null,
                $btnCancel: null,
                $btnSure: null,
                $columnContainer: null
            },
            stopContainer: false
        };
        this.opts = $.extend(defOpts, opts);
        this.$singleAll = this.opts.elements.$singleAll;
        this.$mask = this.opts.elements.$mask;
        this.$wheel = this.opts.elements.$wheel;
        this.$btnSure = this.opts.elements.$btnSure;
        this.$btnCancel = this.opts.elements.$btnCancel;
        this.currSelected = {
            showVal: '',//展示的内容
            hideVal: ''
        };
        this.scrolledCb = null;
        this.init();
    };

    SingleWheel.prototype.init = function() {
        var self = this;
        self.winH = initPos(self.$singleAll, self.$wheel, self.opts.wheelH);
        self.initWheel();
        bindEvent(self.$btnSure, self.$btnCancel, self.opts.moduleName, self.$singleAll, self.$wheel, self.opts.wheelH);
        stopMaskEvent(self.$mask);
        /* jshint expr: true */
        self.opts.stopContainer && stopWhellContainer(self.$wheel.find('.wheel-container-items'));
        $.sp.subscribe('singlewheel.window.resize', function(winH) {
            self.winH = winH;
        });
    };

    SingleWheel.prototype.initWheel = function() {
        var self = this;
        self.$columnContainer = this.opts.elements.$columnContainer;
        var moduleName = self.opts.moduleName ? 'single.' + self.opts.moduleName : 'single';
        self.itemName = 'wheel-item';
        self.$items = self.$columnContainer.find('.' + self.itemName);
        self.selectedItemClass = 'selected-item';

        self.singleWheel = new Sw({
            $ele: self.$columnContainer,
            className: self.itemName,
            selectedClass: self.selectedItemClass,
            moduleName: moduleName
        });

        //touchend触发事件
        $.sp.subscribe('scrollwheel.' + moduleName + '.selected_changed', function($ele, index) {
            self.setSelectedItem(self.$items, index, self.selectedItemClass);
            self.scrolledCb ? self.scrolledCb.call(self, self.singleWheel) : null; // jshint ignore:line
        });
    };

    //在touchend执行结束以后需要做特殊处理，指定callback做对应的事情
    SingleWheel.prototype.setScrolledCb = function(cb) {
        var self = this;
        self.scrolledCb = cb;
    };

    SingleWheel.prototype.setSelectedItem = function($items, index, selectedClass) {
        var self = this;
        $items.removeClass(selectedClass);
        var $selected = $($items[index]);
        $selected.addClass(selectedClass);
        self.currSelected.showVal = $selected.html();
        var attr = 'itemdata';
        self.currSelected.hideVal = $selected.attr(attr);
    };

    //获取当前选择元素的index
    SingleWheel.prototype.getSelectedIdx = function() {
        var self = this;
        return self.singleWheel.getSelectedIdx();
    };

    SingleWheel.prototype.getOpts = function() {
        var self = this;
        return {
            $itemsContainer: self.$columnContainer,
            itemName: self.itemName,
            selectedClass: self.selectedItemClass
        };
    };

    SingleWheel.prototype.getSelected = function() {
        var self = this;
        return self.currSelected;
    };

    SingleWheel.prototype.show = function() {
        var self = this;
        self.$singleAll.show();
        setTimeout(function() {
            changeMultiSameCss(self.$wheel, 'transform', 'translate3d(0, ' + (self.winH - self.opts.wheelH) + 'px, 0)');
        }, 300);
    };

    SingleWheel.prototype.hide = function() {
        var self = this;
        changeMultiSameCss(self.$wheel, 'transform', 'translate3d(0, ' + self.winH + 'px, 0)');
        setTimeout(function() {
            self.$singleAll.hide();
        }, 300);
    };

    SingleWheel.prototype.scrollToIndex = function(seleIndex) {
        var self = this;
        if (seleIndex >= 0 && seleIndex < self.$items.length) {
            self.singleWheel.scrollTo(seleIndex);
        }
    };

    //为浏览器兼容性，更改多个相同属性（前缀不同）
    function changeMultiSameCss($ele, attrName, attrVal) {
        $ele.css(attrName, attrVal);
        $ele.css('-webkit-' + attrName, attrVal);
        $ele.css('-moz-' + attrName, attrVal);
    }

    //确定 取消 按钮事件
    function bindEvent($btnSure, $btnCancel, moduleName, $singleAll, $wheel, wheelH) {
        var eNamePrefix = !moduleName ? 'single.' : 'single.' + moduleName + '.';
        var winH;
        $btnSure.on('click', function() {
            $.sp.publish(eNamePrefix + 'btnSure', []);
        });
        $btnCancel.on('click', function(){
            $.sp.publish(eNamePrefix + 'btnCancel', []);
        });
        //resize
        $(window).on('resize', function() {
            winH = initPos($singleAll, $wheel, wheelH);
            $.sp.publish('singlewheel.window.resize', [winH]);
        });
        return winH;
    }

    function stopMaskEvent($mask) {
        $mask.on('touchstart', function(e) {
            stop(e);
        }).on('touchmove', function(e) {
            stop(e);
        }).on('touchend', function(e) {
            stop(e);
        });
    }

    function stopWhellContainer($container) {
        $container.on('touchmove', function(e) {
            stop(e);
        }).on('touchend', function(e) {
            stop(e);
        });
    }

    function stop(e) { // jshint ignore:line
        e.preventDefault();
        e.stopPropagation();
    }

    function initPos($singleAll, $wheel, wheelH) {
        var winH = $(window).height();
        $singleAll.height(winH);
        var posH = $singleAll.css('display') == 'none' ? winH : (winH - wheelH);
        changeMultiSameCss($wheel, 'transform', 'translate3d(0, ' + posH + 'px, 0)');
        return winH;
    }

    return SingleWheel;
})();
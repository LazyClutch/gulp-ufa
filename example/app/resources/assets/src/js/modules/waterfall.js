module.exports = (function () {
    "use strict";
    
    var Waterfall = function (op) {
        var self = this;
        self._op = $.extend({}, {
            loadingId: 'waterfall_loading',
            loadingClass: 'waterfall-loading',
            data: {
                page: 1
            },
            resources: '', // 获取数据资源，可以是string，可以是ajax
            scrollAfterHeight: 100, // 距离底部多少开始触发事件
            onLoad: function(){}, // 获得数据后的回调
            onInit: function () {
                self.$loading.show().css('display', 'block');
            }, // 初始化之前执行的操作
            onEnd: function () {
                self.$loading.text('不好意思，已经没有了...');
            },
            onError: function(){},
            continueWhile: function () {
                return true;
            },
            wrap: 'body',
            eventDom: $(window)
        }, op);
        self.scrolling = false;
        
        self.addLoading();
        self.init();
    };

    Waterfall.prototype.addLoading = function () {
        var self = this;

        $(self._op.wrap).after('<a id="' + self._op.loadingId + '" class="' + self._op.loadingClass + '" style="width: 100%;height: 6rem;line-height: 6rem;text-align: center;font-size: 1.6rem;display: none;">加载中...</a>');
        self.$loading = $('#' + self._op.loadingId);
    };

    Waterfall.prototype.init = function () {
        var self = this;
        var op = self._op;

        self.scrollPrev = self.onscroll ? self.onscroll : null;
        op.eventDom.on('scroll.waterfall', function () {
            var height = 0;
            var $this = $(this);
            if (self.scrollPrev) {
                self.scrollPrev();
            }
            if (self.scrolling || self.isStop) {
                return;
            }
            if (op.eventDom[0] == window) {
                height = 0 + $(document).height() - $this.scrollTop() - $(window).height();
            } else {
                height = 0 + $this.attr('scrollHeight') - $this.attr('scrollTop') - $this.attr('clientHeight');
            }
            if(height <= op.scrollAfterHeight) {
                op.onInit(this);
                self.scrolling = true;
                op.data.page++;
                if ($.isFunction(op.resources)) {
                    op.resources({
                        data: op.data,
                        success: function (data) {
                            self.scrolling = false;
                            op.onLoad(data);
                            if(!op.continueWhile(data) || data.length === 0 || data.pager && Number(data.pager.last_page) <= Number(data.pager.current_page)) { // jshint ignore:line
                                op.eventDom.unbind('scroll.waterfall');
                                op.onEnd(self);
                                if (!op.continueWhile(data)) {
                                    return;
                                }
                                if (data.pager && Number(data.pager.last_page) <= Number(data.pager.current_page)) { // jshint ignore:line
                                    $.sp.publish('waterfall_succ', {'page': op.data.page});
                                }
                            } else {
                                $.sp.publish('waterfall_succ', {'page': op.data.page});
                            }
                        },
                        error: function () {
                            op.onError(self);
                        }
                    });
                } else if ($.isArray(op.resources)) {
                    // 直接返回
                } else {
                    // ajax
                }
            }
        });
    };

    Waterfall.prototype.stop = function () {
        this.isStop = true;
        return this;
    };

    Waterfall.prototype.start = function () {
        this.isStop = false;
        return this;
    };

    Waterfall.prototype.hideMoreBtn = function () {
        this.$loading.hide();
        return this;
    };

    Waterfall.prototype.showMoreBtn = function () {
        this.$loading.show().css('display', 'block');
        return this;
    };

    return Waterfall;
})();
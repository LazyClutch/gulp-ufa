module.exports = (function iscroll() {
    'user strict';
    
    var IScroll = function(_opts){
        var self = this;

        self.moveX = self.moveY = 0;
        self.startX = self.startY = 0;
        self.preX = self.preY = 0;
        self.curX = self.curY = 0;

        self.opts = $.extend({},{
            //默认参数
            $ele: ''  //id
        }, _opts);

        self.ele = $(self.opts.$ele);

        self.eleHeight = parseInt(self.ele.css("height"));
        self.parentHeight = parseInt(self.ele.parent().css("height"));
        self.needHeight = self.eleHeight - self.parentHeight;

        self.init();
    };

    IScroll.prototype.init = function () {
        var self = this;

        if(self.needHeight <= 0){
            self.ele.parent().on('touchmove', function (e) {
                e.preventDefault();  //防止拖动页面
            });

            self.ele.off('touchstart');
            self.ele.off('touchmove');
            self.ele.off('touchend');
            return;
        }
        self.ele.on('touchstart', function (e) {
            self.touchStart(e);
        });

        self.ele.on('touchmove', function (e) {
            self.touchMove(e);
        });

        self.ele.on('touchend', function () {
            self.touchEnd();
        });
    };

    IScroll.prototype.touchStart = function (e) {
        var self = this;

        self.moveX = self.moveY = 0;

        // 元素当前位置
        self.preX = parseInt(self.getT3d(self.ele, 'x'));
        self.preY = parseInt(self.getT3d(self.ele, 'y'));

        //手指位置
        self.startX = e.touches[0].pageX;
        self.startY = e.touches[0].pageY;

        /*self.ele.css('transition', '0ms cubic-bezier(0.1, 0.57, 0.1, 1)');
        self.ele.css('-webkit-transition', '0ms cubic-bezier(0.1, 0.57, 0.1, 1)');*/

        self.ele.css('transition', 'all 0 ease-out');
        self.ele.css('-webkit-transition', 'all 0 ease-out');
    };

    IScroll.prototype.touchMove = function (e) {
        var self = this;

        e.preventDefault();  //防止拖动页面

        self.moveX = e.touches[0].pageX - self.startX;
        self.moveY = e.touches[0].pageY - self.startY;

        // 目标位置:要移动的距离 加上 元素当前位置
        self.curX = self.preX + self.moveX;
        self.curY = self.preY + self.moveY;

        // 只能移动Y轴方向
        if((self.moveY > 1 && self.curY < 60) || (self.moveY < -1 && Math.abs(self.curY) + self.parentHeight < self.eleHeight + 70)) {
            self.scroll(self.curY);
        }

        // 自由移动
        // $ele.style.webkitTransform = 'translate3d(' + (curX) + 'px, ' + (curY) + 'px,0px)';
    };

    IScroll.prototype.touchEnd = function () {
        var self = this;

        if(self.curY > 0) {
            self.scroll(0);
        }else if (self.curY < -self.needHeight) {
            self.scroll(-self.needHeight);
        }
        self.ele.css('transition', 'all 0.1s ease-out');
        self.ele.css('-webkit-transition', 'all 0.1s ease-out');

        self.preX = self.curX;
        self.preY = self.curY;
    };

    IScroll.prototype.scroll = function (dis) {
        var self = this;
        self.ele.css('transform', 'translate3d(' + 0 + 'px, ' + dis + 'px, 0px)');
        self.ele.css('-webkit-transform', 'translate3d(' + 0 + 'px, ' + dis + 'px, 0px)');
    };

    IScroll.prototype.getT3d = function (ele, c) {
        var str = ele[0].style.WebkitTransform;

        if(str === '') return '0';
        str = str.replace('translate3d(', '');
        str = str.replace(')', '');

        var coords = str.split(',');
        if(c == 'x')
            return coords[0];
        else if(c == 'y')
            return coords[1];
        else if(c == 'z')
            return coords[2];
        else
            return '';
    };

    IScroll.prototype.refresh = function () {
        var self = this;

        self.ele.css('transition', '');
        self.ele.css('-webkit-transition', '');
        self.scroll(0);
        self.eleHeight = parseInt(self.ele.css("height"));
        self.parentHeight = parseInt(self.ele.parent().css("height"));
        self.needHeight = self.eleHeight - self.parentHeight;

        self.init();
    };

    return IScroll;
})();

/**
	备注1: 即使以后样式发生变化，只需要样式覆盖即可，功能代码仍可适用。显眼位置的高度不同其他，更改之无影响，因为计算的只是最上层的y值
*/
module.exports = (function () {
	'use strict';

	var ScrollWheel = function(opts) {
		var defOpts = {
			interVal: 40, //单位px,间隔
			topLines: 2, //最上层空行个数（用于生成上线最大范围）
			$ele: '', //需要滚动的元素
			className: 'date-item',
			selectedClass: 'selected-item',
			moduleName: null//为不同组件区分同一个事件，如果moduleName == null,则组件共用同一事件
		};
		this.opts = $.extend(defOpts, opts);
		this.length = this.opts.$ele.find('.' + this.opts.className).length;
		this.starY = 0;
		this.stopY = 0;
		this.startIndex = 0;//当前元素的index（index为2的是突出位置）
		this.moveMaxIndex = this.length - 1;
		this.moveMinIndex = -this.opts.topLines * 2;
		this.endMaxIndex = this.length - 1 - this.opts.topLines;
		this.endMinIndex = -this.opts.topLines;
		this.init();
	};

	ScrollWheel.prototype.init = function() {
		var self = this;
		var $ele = self.opts.$ele;
		$ele.on('touchstart', function(e) {
			self.touchStart(e);
		}).on('touchmove', function(e) {
			self.touchMove(e);
		}).on('touchend', function(e) {
			self.touchEnd(e);
		});
	};

	ScrollWheel.prototype.touchStart = function(e) {
		var self = this;
		var $ele = self.opts.$ele;
		stop(e);
		changeMultiSameCss($ele, 'transition', 'all 0 ease-out');
		self.startY = getCoord(e, 'Y');
	};

	ScrollWheel.prototype.touchMove = function(e) {
		var self = this;
		stop(e);
		self.stopY = getCoord(e, 'Y');
		var idx = constrain(self.startIndex + (self.startY - self.stopY) / self.opts.interVal, self.moveMinIndex, self.moveMaxIndex);
		self.scroll(idx);
	};

	ScrollWheel.prototype.touchEnd = function(e) {
		var self = this;
		var $ele = self.opts.$ele;
		stop(e);
		changeMultiSameCss($ele, 'transition', 'all 0.1s ease-out');
		self.startIndex = Math.round(constrain(self.startIndex + (self.startY - self.stopY) / self.opts.interVal, self.endMinIndex, self.endMaxIndex));
		self.scrollTo(self.startIndex + self.opts.topLines);
	};

	//获取当前选择元素的index
	ScrollWheel.prototype.getSelectedIdx = function() {
		var self = this;
		return (self.startIndex + self.opts.topLines);
	};


	//index 指的是元素的index（0～length-1之间）(index==0，实际展示在选择位置的是index+topLines)
	//只滚动，不做其他操作
	ScrollWheel.prototype.scroll = function(index) {
		var self = this;
		var $ele = self.opts.$ele;
		var yy = index * (-self.opts.interVal);
		changeMultiSameCss($ele, 'transform', 'translate3d(0,' + yy + 'px,0)');
	};

	/**
	 @param selectedIndex 表示展示在显眼位置的就是selectedIndex。
	 @param isTime 是否将transition中的延迟时间设置为0(true设置为0，false不用设置)
	*/
	ScrollWheel.prototype.scrollTo = function(selectedIndex) {
		var self = this;
		var $ele = self.opts.$ele;
		//translate index meaning
		self.startIndex = selectedIndex - self.opts.topLines;
		self.scroll(self.startIndex);
		//选择以后触发事件
		var eName = !self.opts.moduleName ? 'scrollwheel.selected_changed' : 'scrollwheel.' + self.opts.moduleName + '.selected_changed'; 
		$.sp.publish(eName, [$ele, selectedIndex]);
	};

	/**
	  更改滚动元素的个数
	  @param length 需要改成的个数
	  @param isScroll 标识更改长度后是否需要滚动(true or false)
	  @param scrollIdx 如果需要滚动，则应该滚动到更改后的index(被选择位置的index)
	*/
	ScrollWheel.prototype.changeLengthScroll = function(length, isScroll, scrolledIdx) {
		var self = this;
		self.length = length;
		self.moveMaxIndex = length - 1;
		self.endMaxIndex = length - 1- self.opts.topLines;
		isScroll ? self.scrollTo(scrolledIdx) : null; // jshint ignore:line
	};

	//为浏览器兼容性，更改多个相同属性（前缀不同）
	function changeMultiSameCss ($ele, attrName, attrVal) {
		$ele.css(attrName, attrVal);
		$ele.css('-webkit-' + attrName, attrVal);
	}

	//获取当前的pageY
	function getCoord(e, c) {
	    var org = e.originalEvent,
	        ct = e.changedTouches;
	    return ct || (org && org.changedTouches) ? (org ? org.changedTouches[0]['page' + c] : ct[0]['page' + c]) : e['page' + c];
	}

	//限制滚动的位置
	function constrain(val, min, max) {
	    return Math.max(min, Math.min(val, max));
	}

	function stop(e) {  // jshint ignore:line
		e.preventDefault();
		e.stopPropagation();
	}

	return ScrollWheel;

})();
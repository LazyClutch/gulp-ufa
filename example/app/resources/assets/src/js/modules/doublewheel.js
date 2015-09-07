var Sw = require('../modules/scrollwheel.js');

module.exports = (function () {
	/**
	  备注1: 该业务组件，如果以后样式有不同且差别不大的话，css可以使用样式覆盖，js只要html中的id名称和className不变就行（bindEvent）
	  
	  备注2: 使用实例：
	  var wheel = new sw({});
	  wheel.setScrolledCb(leftScrollCb, rightScrollCb);//不放在init中，因为callback需要用到初始化后的很多接口
	  wheel.scrollToIndex(0, 0);//一定要先setScrolledCb,再scrollToIndex，因为scrollToIndex结束，会调用callback。
	*/

	//moduleName,为不同组件同一个事件需要做不同事情而服务。moduleName为null则不需要
	var DoubleWheel = function(opts) {
		var defOpts = {
			moduleName: null,
			topLines: 2,
			doubleH: 248, //包括“确定”/"取消"按钮的高度
			elements: {
				$doubleAll: null,
				$mask: null,
				$wheel: null,
				$btnCancel: null,
				$btnSure: null,
				$columnLeft: null,
				$columnRight: null
			},
			stopContainer: false
		};
		this.opts = $.extend(defOpts, opts);
		this.$doubleAll = this.opts.elements.$doubleAll;
		this.$mask = this.opts.elements.$mask;
		this.$wheel = this.opts.elements.$wheel;
		this.$btnSure = this.opts.elements.$btnSure;
		this.$btnCancel = this.opts.elements.$btnCancel;
		this.currSeleted = {
			showLeft: '', //展示的时间
			hideLeft: '', //api需要的时间
			showRight: '',
			hideRight: ''
		};
		this.leftScrolledCb = null;
		this.rightScrolledCb = null;
		this.init();
	};

	DoubleWheel.prototype.init = function() {
		var self = this;
		self.winH = initPos(self.$doubleAll, self.$wheel, self.opts.doubleH);
		//wheel
		self.initLeftwheel();
		self.initRightwheel();
		//self.scrollToIndex(0, 0);//默认
		//sure cancel event
		bindEvent(self.$btnSure, self.$btnCancel, self.opts.moduleName, self.$doubleAll, self.$wheel, self.opts.doubleH);
		stopMaskEvent(self.$mask);
		/* jshint expr: true */
		self.opts.stopContainer && stopWhellContainer(self.$wheel.find('.wheel-container'));
		$.sp.subscribe('doublewheel.window.resize', function(winH) {
			self.winH = winH;
		});
	};

	//init leftwheel
	DoubleWheel.prototype.initLeftwheel = function() {
		var self = this;
		//wheel
		self.$columnLeft = this.opts.elements.$columnLeft;
		var leftModule = self.opts.moduleName ? 'left.' + self.opts.moduleName : 'left';
		self.leftItemName = 'left-item';
		self.$leftItems = self.$columnLeft.find('.' + self.leftItemName);
		self.sltedLeftClass = 'selected-item-left';

		self.leftWheel = new Sw({
			$ele: self.$columnLeft,
			className: self.leftItemName,
			selectedClass: self.sltedLeftClass,
			moduleName: leftModule
		});

		//touchend触发事件
		$.sp.subscribe('scrollwheel.' + leftModule + '.selected_changed', function($ele, index) {
			self.setSelectedItem(self.$leftItems, index, 'left');
			self.leftScrolledCb ? self.leftScrolledCb.call(self, self) : null; // jshint ignore:line
		});
	};

	DoubleWheel.prototype.initRightwheel = function() {
		var self = this;
		//wheel
		self.$columnRight = this.opts.elements.$columnRight;
		var rightModule = self.opts.moduleName ? 'right.' + self.opts.moduleName : 'right';
		self.rightItemName = 'right-item';
		self.$rightItems = self.$columnRight.find('.' + self.rightItemName);
		self.sltedRightClass = 'selected-item-right';

		self.rightWheel = new Sw({
			$ele: self.$columnRight,
			className: self.rightItemName,
			selectedClass: self.sltedRightClass,
			moduleName: rightModule
		});

		//touchend触发事件
		$.sp.subscribe('scrollwheel.' + rightModule + '.selected_changed', function($ele, index) {
			self.setSelectedItem(self.$rightItems, index, 'right');
			self.rightScrolledCb ? self.rightScrolledCb.call(self, self) : null; // jshint ignore:line
		});
	};

	DoubleWheel.prototype.setScrolledCb = function(leftCb, rightCb) {
		var self = this;
		self.leftScrolledCb = leftCb;
		self.rightScrolledCb = rightCb;
	};

	/**
	  更改选择元素后的操作
	  @param $items 展示的滚动元素
	  @param index 当前选择元素的index
	  @param seletedClass 当前选择元素需要用selectedClass来标记
	  @param attr 滚动元素的属性（标记api需要的类型）
	*/
	DoubleWheel.prototype.setSelectedItem = function($items, index, attr) {
		var self = this;
		var $selected = $($items[index]);
		if (attr == 'left') {
			self.currSeleted.showLeft = $selected.html();
			self.currSeleted.hideLeft = $selected.attr(attr);
		} else if (attr == 'right') {
			self.currSeleted.showRight = $selected.html();
			self.currSeleted.hideRight = $selected.attr(attr);
		}
	};

	//默认callback，字体变大
	DoubleWheel.prototype.defaultCb = function($items, index, selectedClass) {
		$items.removeClass(selectedClass);
		var $selected = $($items[index]);
		$selected.addClass(selectedClass);
	};

	//获取当前选择元素的index
	DoubleWheel.prototype.getSelectedIdx = function() {
		var self = this;
		return {
			leftIdx: self.leftWheel.getSelectedIdx(),
			rightIdx: self.rightWheel.getSelectedIdx()
		};
	};

	//获取滚动元素的包裹元素
	DoubleWheel.prototype.getOpts = function() {
		var self = this;
		return {
			$left: self.$columnLeft,
			leftItemName: self.leftItemName,
			sltedLeftClass: self.sltedLeftClass,
			$right: self.$columnRight,
			rightItemName: self.rightItemName,
			sltedRightClass: self.sltedRightClass
		};
	};

	DoubleWheel.prototype.getSelected = function() {
		var self = this;
		return self.currSeleted;
	};

	//show LeftWheel
	DoubleWheel.prototype.show = function() {
		var self = this;
		self.winH = initPos(self.$doubleAll, self.$wheel, self.opts.doubleH);
		self.$doubleAll.show();
		setTimeout(function() { // jshint ignore:line
			changeMultiSameCss(self.$wheel, 'transform', 'translate3d(0, ' + (self.winH - self.opts.doubleH) + 'px, 0)');
		}, 300);
	};

	//hide LeftWheel
	DoubleWheel.prototype.hide = function() {
		var self = this;
		changeMultiSameCss(self.$wheel, 'transform', 'translate3d(0, ' + self.winH + 'px, 0)');
		setTimeout(function() { //jshint ignore:line
			self.$doubleAll.hide();
		}, 300);
	};

	/**
	  滚动到指定的index元素(展示位置的index)
	  @param leftSeleIndex 日期滚动元素的leftSeleIndex(0~length-1)，如果不在该范围内，则不做处理
	  @param rightSeleIndex 时间滚动元素的rightSeleIndex(0~length-1)，如果不在该范围内，则不做处理
	 */
	DoubleWheel.prototype.scrollToIndex = function(leftSeleIndex, rightSeleIndex) {
		var self = this;
		if (leftSeleIndex >= 0 && leftSeleIndex < self.$leftItems.length) {
			self.leftWheel.scrollTo(leftSeleIndex);
		}
		if (rightSeleIndex >= 0 && rightSeleIndex < self.$rightItems.length) {
			self.rightWheel.scrollTo(rightSeleIndex);
		}
	};
	/*滚动右侧指定index*/
	DoubleWheel.prototype.scrollToRightIndex = function(rightSeleIndex) {
		var self = this;
		if (rightSeleIndex >= 0 && rightSeleIndex < self.$rightItems.length) {
			self.rightWheel.scrollTo(rightSeleIndex);
		}
	};

	/**
	  更改length
	  @param leftOpts 更改日期的相关选项，｛
	     rightLength: 更改后的长度，如果为－1，则不做处理
		 isScroll: 是否需要滚动
		 scrolledIdx: 如果需要滚动，滚动到的位置
	  ｝如果为－1，则不做处理
	  @param rightOpts 更改时间相关选项，同上
	*/
	DoubleWheel.prototype.changeItemsScroll = function(leftOpts, rightOpts) {
		var self = this;
		if (leftOpts && leftOpts.leftLength != -1) {
			self.$leftItems = self.$columnLeft.find('.' + self.leftItemName);
			self.leftWheel.changeLengthScroll(leftOpts.leftLength, leftOpts.isScroll, leftOpts.scrolledIdx);
		}
		if (rightOpts && rightOpts.rightLength != -1) {
			self.$rightItems = self.$columnRight.find('.' + self.rightItemName);
			self.rightWheel.changeLengthScroll(rightOpts.rightLength, rightOpts.isScroll, rightOpts.scrolledIdx);
		}

	};


	//为浏览器兼容性，更改多个相同属性（前缀不同）
	function changeMultiSameCss($ele, attrName, attrVal) {
		$ele.css(attrName, attrVal);
		$ele.css('-webkit-' + attrName, attrVal);
		$ele.css('-moz-' + attrName, attrVal);
	}


	//确定 取消 按钮事件
	function bindEvent($btnSure, $btnCancel, moduleName, $doubleAll, $wheel, doubleH) {
		var eNamePrefix = !moduleName ? 'double.' : 'double.' + moduleName + '.',
			winH;
		$btnSure.on('click', function() {
			$.sp.publish(eNamePrefix + 'btnSure', []);
		});
		$btnCancel.on('click', function() {
			$.sp.publish(eNamePrefix + 'btnCancel', []);
		});
		//resize
		$(window).on('resize', function() {
			winH = initPos($doubleAll, $wheel, doubleH);
			$.sp.publish('doublewheel.window.resize', [winH]);
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

	function initPos($doubleAll, $wheel, doubleH) {
		var winH = $(window).height();
		$doubleAll.height(winH);
		var posH = $doubleAll.css('display') == 'none' ? winH : (winH - doubleH);
		changeMultiSameCss($wheel, 'transform', 'translate3d(0, ' + posH + 'px, 0)');
		return winH;
	}

	return DoubleWheel;
})();

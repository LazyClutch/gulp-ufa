module.exports = (function() {

function AutoComplete(_op) {
    var self = this;
    self.op = $.extend({}, {
        inputSelect: '#auto_ipt', // input id
        resources: [],
        listSelect: '#auto_content', // list box
        liSelect: 'div.item', //
        boxSelect: null,
        liTpl: 'autocomplete_tpl',
        emptyHandle: true, // function
        showDefaultData: false
    }, _op);
    self.cityid = 1;
    self.dom = $(self.op.inputSelect);
    self.list = $(self.op.listSelect);
    self.contentBox = self.op.boxSelect === null ? self.list : $(self.op.boxSelect);
    self.cancelBtn = $('#btn_cancel');
    self.cancelAll = $('#cancel_all');
    self.tags = $('#auto_tags');
    self.autoContent = $('#auto_content');
    self.init();
}

    AutoComplete.prototype.init = function() {
        var self = this;
        self.list.on('click', self.op.liSelect, function() {
            $(self.dom).val($(this).data('name'));
            $.sp.publish('value_changed', [{name: $(this).data('name'), cityid: $(this).data('cityid'), id: $(this).data('id')}]);
            self.close();
        });
        self.dom.on('input', function () {
            self.getResult();
        });
        self.cancelBtn.on('click', function (e) {
            e.preventDefault();
            self.list.hide();
            self.dom.val('');
            $.sp.publish('search_canceled', []);
        });
        self.cancelAll.on('click', function (e) {
            e.preventDefault();
            self.cancelSearch();
        });
        // temporary comment
        $(window).on('keydown', function (e) {
            if (e.keyCode == 13) {
                $.sp.publish('autocomplete_entered', [{'keyword': self.dom.val(), 'cityid': self.cityid}]);
            }
        });
        // $('#auto_tags').height(window.innerHeight);
    };

    AutoComplete.prototype.getResult = function() {
        var self = this,
            val = $.trim(self.dom.val());
        if(!val) {
            self.cancelAll.hide();
            self.tags.show();
            self.list.hide();
            return;
        }
        self.cancelAll.show();
        self.tags.hide();
        if($.isArray(self.op.resources)) {
            var _r = self.op.resources;
            self.dataHandle(_r);
        } else if (typeof self.op.resources == 'string') {
            $.ajax({
                type: 'post',
                url: self.op.resources,
                data: self.op.reqDataInit(val),
                dataType: 'json',
                success: function(da) {
                    var _da = self.op.repDataInit(da);
                    self.dataHandle(_da);
                }
            });
        } else {
            self.op.resources({
                data: {
                    'keyword': val,
                    'city_id': self.cityid
                },
                success: function (data) {
                    self.dataHandle(data);
                },
                error: function () {}
            });
        }
    };

    AutoComplete.prototype.dataHandle = function(_da) {
        var self = this;
        self.da = _da;
        _da = self.replaceKeyword(_da);
        if (_da.length > 0 && self.op.showDefaultData) {
            self.contentBox.html($.temp(self.op.liTpl, {'names': _da}));
            self.contentBox.append($.temp('autocomplete_default_data_tpl', {'name': self.dom.val()}));
            self.open();
        } else if (_da.length > 0) {
            self.contentBox.html($.temp(self.op.liTpl, {'names': _da}));
            self.open();
        } else if (_da.length === 0 && self.op.emptyHandle) {
            //self.contentBox.html($.temp('autocomplete_empty_tpl', {'name': self.dom.val()}));
            self.contentBox.html('<p style="padding:1.5rem;">没有找到该小区，换个小区试试呗</p>');
            self.open();
        } else if (_da.length === 0) {
            self.close();
        }
    };

    AutoComplete.prototype.replaceKeyword = function (_da) {
        var keyword = $.trim(this.dom.val()).replace(/\\/g, "");
        var data = [];
        var reg = new RegExp(keyword, 'g');
        for (var i = 0, len = _da.length; i < len; i++) {
            var temp = $.extend({}, _da[i]);
            temp.repAddress = _da[i].address.replace(reg, '<em style="color: #3e9fdd;">' + keyword + '</em>');
            temp.repName = _da[i].name.replace(reg, '<em style="color: #3e9fdd;">' + keyword + '</em>');
            data.push(temp);
        }
        return data;
    };

    AutoComplete.prototype.close = function () {
        this.contentBox.empty().hide();
    };

    AutoComplete.prototype.open = function () {
        this.contentBox.show();
    };

    AutoComplete.prototype.focus = function () {
        this.dom.focus();
    };

    AutoComplete.prototype.clearAutoIpt = function () {
        this.dom.val('');
    };

    AutoComplete.prototype.cancelSearch = function() {
        var self = this;
        self.dom.val('');
        self.cancelAll.hide();
        self.list.hide(300);
        self.tags.show();
    };

    AutoComplete.prototype.setInputVal = function (val) {
        var self = this;
        if(val) {
            self.dom.val(val);
            self.cancelAll.show();
            self.getResult();
        } else {
            self.cancelAll.hide();
            self.autoContent.hide();
            self.tags.show();
        }
        // self.dom.focus();
    };

    AutoComplete.prototype.changeCityId = function (id) {
        this.cityid = id;
    };

    return AutoComplete;
})();
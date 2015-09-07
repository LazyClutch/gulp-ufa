var tokenService = require('../services/tokenService.js');
module.exports=(function uploader() {
//define("ui.uploader", ['zepto', 'zepto.sp', 'app/service/tokenService', 'page.params'], function($, sp, service, params) {
    'use strict';

    var Uploader = function(_op) {
        var self = this;
        self.op = $.extend({}, {
            qiniuUploadUrl: 'http://upload.qiniu.com/',
            fileDom: $('#file' + $.params.index)
        }, _op);

        self.init();
    };

    Uploader.prototype.init = function() {
        var self = this;
        self.op.fileDom.on('change', function(event) {   // jshint ignore:line
            // TODO（优化Token，不需要每次发送请求。）
            var upCont = event.target.value.split('.'),
                re = /jpg|jpeg|gif|png|bmp/i,
                suffix = upCont[upCont.length-1];
            if(!re.test(suffix)) {
                $.sp.publish('uploader_error');
            }else{
                $.sp.publish('uploader_init');
                tokenService.getToken({
                    success: function(data) {
                        self.sucFn.call(self, data);
                    }
                });
            }
        });
    };

    Uploader.prototype.qiniuUpload = function(f, token) {
        var xhr = new XMLHttpRequest();
        var formData;
        var self = this;

        xhr.open('POST', self.op.qiniuUploadUrl, true);
        formData = new FormData();
        formData.append('token', token);
        formData.append('file', f);
        xhr.onreadystatechange = function(response) {   // jshint ignore:line
            if (xhr.readyState == 4 && xhr.status == 200 && xhr.responseText != "") {   // jshint ignore:line
                var result = JSON.parse(xhr.responseText);
                $.sp.publish('uploader_success', [{
                    images: result,
                    index: self.op.index
                }]);
            } else if (xhr.status != 200 && xhr.responseText) {
                $.sp.publish('uploader_error', [xhr.responseText]);
            }
        };

        xhr.send(formData);
    };

    Uploader.prototype.sucFn = function(response) {
        var self = this;
        var token = response.items[0];
        if (self.op.fileDom[0].files.length > 0 && token != "") {   // jshint ignore:line
            self.qiniuUpload(self.op.fileDom[0].files[0], token);
        } else {
            $.sp.publish('uploader_error', ['form input error']);
        }
    };

    return Uploader;
})();
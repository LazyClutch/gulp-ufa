module.exports=function(){
    // 获取token
    function getToken(data) {
        var params = {
            type: 'POST',
            ignoreAjaxLoading: true,
            url: '/api/storage-tokens'
        };
        $.http($.extend(params, data, true));
    }

    return {
        getToken: getToken
    };
}();
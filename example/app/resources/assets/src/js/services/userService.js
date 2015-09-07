module.exports=function(){
    function sendCode(data) {
        var params = {
            type: 'POST',
            url: '/api/passport/login/sms'
        };
        $.http($.extend(params, data, true));
    }

    function register(data) {
        var params = {
            type: 'POST',
            url: '/api/passport/login'
        };
        $.http($.extend(params, data, true));
    }

    function personInfo(data) {
        var params = {
            type: 'POST',
            url: '/api/profile'
        };
        $.http($.extend(params, data, true));
    }

    function changeInfo(data) {
        var params = {
            type: 'POST',
            url: '/api/profile/editAliDistrict'
        };
        $.http($.extend(params, data, true));
    }

    function withdraw(data) {
        var params = {
            type: 'POST',
            url: '/api/withdrawals'
        };
        $.http($.extend(params, data, true));
    }

    function getMore(data) {
        var params = {
            type: 'GET',
            ignoreAjaxLoading: true,
            url: '/my/account'
        };
        $.http($.extend(params, data, true));
    }

    return {
        sendCode: sendCode,
        register: register,
        personInfo: personInfo,
        changeInfo: changeInfo,
        withdraw: withdraw,
        getMore: getMore
    };
}();
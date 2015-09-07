module.exports=function(){
    function demand(data) {
        var params = {
            type: 'POST',
            url: '/api/community/demand/'
        };
        $.http($.extend(params, data, true));
    }

    return {
        demand: demand
    };
}();
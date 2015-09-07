module.exports = function() {
    // 获取房源列表
    function getHouseList(data) {
        var params = {
            type: 'GET',
            url: '/api/house/duplicate'
        };
        $.http($.extend(params, data, true));
    }

    // 更多看房记录
    function getHouseRecordMore(data) {
        var params = {
            type: 'GET',
            url: '/my/house'
        };
        $.http($.extend(params, data, true));
    }

    return {
        getHouseList: getHouseList,
        getHouseRecordMore: getHouseRecordMore
    };
}();
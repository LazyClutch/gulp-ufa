module.exports=function(){

    function checkRepeatablity(data) {
        var params = {
            type: 'POST',
            url: '/api/house/duplicate'
        };
        $.http($.extend(params, data, true));
    }

    // 获取搜索时候的小区列表
    function getCommunityList (data) {
        var params = {
            type: 'GET',
            ignoreAjaxLoading: true,
            url: '/api/community/search'
        };
        $.http($.extend(params, data, true));
    }

    function inputHouse (data) {
        var params = {
            type: 'POST',
            url: '/api/house/input'
        };
        $.http($.extend(params, data, true));
    }

    //收藏小区
    function collectCommunity(data) {
        var params = {
            type: 'POST',
            url: '/api/community/collect/'
        };
        $.http($.extend(params, data, true));
    }

    //获取房源/房东电话
    function unlock(data) {
        var params = {
            type: 'POST',
            url: '/api/bureau/unlock/'
        };
        $.http($.extend(params, data, true));
    }

    //房源单页获取更多同小区房源   
    function getMoreCommunityHouse(data) {
        var params = {
            type: 'POST',
            url: ''
        };
        $.http($.extend(params, data, true));
    }

    // 获取房源列表分页显示数据
    function getMoreHouse (data) {
        var params = {
            type: 'GET',
            url: '/api/property-list'
        };
        $.http($.extend(params, data, true));
    }

    return {
        checkRepeatablity: checkRepeatablity,
        getCommunityList: getCommunityList,
        inputHouse: inputHouse,
        collectCommunity: collectCommunity,
        unlock: unlock,
        getMoreCommunityHouse: getMoreCommunityHouse,
        getMoreHouse: getMoreHouse
    };
}();
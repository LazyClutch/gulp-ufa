var Waterfall = require('../modules/waterfall.js');
var service = require('../services/houseService.js');

$(function() {
    var params = $.params,
        pager = params.pager;

    function initWaterfall() {
        if (Number(pager.current_page) < Number(pager.last_page)) {  //jshint ignore:line
            new Waterfall({
                resources: service.getHouseRecordMore,
                onLoad: function(data) {
                    if (data.data.length > 0) {
                        $('.house-list').append($.temp('house_list_tepl', {
                            'names': data.data
                        }));
                    }
                },
                data: {
                    'page': 1,
                    'per_page': 10
                },
                wrap: '.content-wrapper',
                eventDom: $(window)
            });
        }
    }

    initWaterfall();
});
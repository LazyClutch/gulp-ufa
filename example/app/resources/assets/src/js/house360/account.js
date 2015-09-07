var Waterfall = require('../modules/waterfall.js');
var service = require('../services/userService.js');
$(function(dd) {
    init();
    function init() {/* jshint camelcase: false */
        if (Number($.params.pager.last_page) > Number($.params.pager.current_page)) {
            new Waterfall({
                resources: service.getMore,
                onLoad: function(data) {
                    if (data.data.length > 0) {
                        $('.list').append($.temp('money_list_tpl', {
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
});
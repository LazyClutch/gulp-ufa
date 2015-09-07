(function ($) {

    function parseQueryString(queryString) {
        var params = {}, queries, temp, i, l;

        // Split into key/value pairs
        queries = queryString.split("&");

        // Convert the array of strings into an object
        for (i = 0, l = queries.length; i < l; i++) {
            temp = queries[i].split('=');
            params[temp[0]] = temp[1];
        }

        return params;
    }

    /**
     * Replace query string
     * @param queryString 'name=test&pass=abc'
     * @param replaceRule
     * {
     *  name: 'user'
     * }
     */
    function replaceQueryString(queryString, replaceRule) {
        return queryString.replace(/(\w+)=(\w+)/ig, function (result, key, value) {
            /*jshint unused:false, eqnull:true */
            var newString = result;
            if (undefined !== replaceRule[key]) {
                newString = key + '=' + replaceRule[key];
            }
            return newString;
        });
    }

    (function($) {
        var e = {
            nextAll: function(s) {
                var $els = $(), $el = this.next();
                while( $el.length ) {
                    if(typeof s === 'undefined' || $el.is(s)) {
                        $els = $els.add($el);
                    }
                    $el = $el.next();
                }
                return $els;
            },
            prevAll: function(s) {
                var $els = $(), $el = this.prev();
                while( $el.length ) {
                    if(typeof s === 'undefined' || $el.is(s)){
                        $els = $els.add($el);
                    }
                    $el = $el.prev();
                }
                return $els;
            }
        };

        $.extend($.fn, e);
    })(Zepto);

    $.utils = {
        parseQueryString: parseQueryString,
        replaceQueryString: replaceQueryString
    };

    return $.utils;
})($);

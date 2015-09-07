var history = require('./history.js');
module.exports = (function () {
    'use strict';
    
    function Router () {
        var table = {};
        'get,post,delete,put'.replace(/[^,]+/g, function (name) {
            table[name] = [];              
        });
        this.routingTable = table;
    }

    function parseQuery(url) {
        var array = url.split("?"), query = {}, path = array[0], querystring = array[1];

        if (querystring) {
            var seg = querystring.split("&"),
                    len = seg.length, i = 0, s;
            for (; i < len; i++) {
                if (!seg[i]) {
                    continue;
                }
                s = seg[i].split("=");
                query[decodeURIComponent(s[0])] = decodeURIComponent(s[1]);
            }
        }
        return {
            path: path,
            query: query
        };
    }

    function queryToString(obj) {
        if (typeof obj == 'string') {
            return obj;
        }
        var str = [];
        for (var i in obj) {
            if (i == "query") {
                continue;
            }
            str.push(i + '=' + encodeURIComponent(obj[i]));
        }
        return str.length ? '?' + str.join("&") : '';
    }

    var placeholder = /([:*])(\w+)|\{(\w+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g;

    Router.prototype = {
        error: function (callback) {
            this.errorback = callback;
        },
        _pathToRegExp: function (pattern, opts) {
            var keys = opts.keys = [], compiled = '^', last = 0, m, name, regexp, segment;

            while ((m = placeholder.exec(pattern))) {
                name = m[2] || m[3];
                regexp = m[4] || (m[1] == '*' ? '.*' : 'string');
                segment = pattern.substring(last, m.index);
                var type = this.$types[regexp];
                var key = {
                    name: name
                };
                if (type) {
                    regexp = type.pattern;
                    key.decode = type.decode;
                }
                keys.push(key);
                compiled += quoteRegExp(segment, regexp, false);
                last = placeholder.lastIndex;
            }
            segment = pattern.substring(last);
            compiled += quoteRegExp(segment) + (opts.strict ? opts.last : "\/?") + '$';
            var sensitive = typeof opts.caseInsensitive === "boolean" ? opts.caseInsensitive : true;
            opts.regexp = new RegExp(compiled, sensitive ? 'i' : undefined);
            return opts;
        },
        add: function (method, path, callback, opts) {
            var array = this.routingTable[method.toLowerCase()];
            if (path.charAt(0) !== "/") {
                throw "path必须以/开头";
            }
            opts = opts || {};
            opts.callback = callback;
            if (path.length > 2 && path.charAt(path.length - 1) === "/") {
                path = path.slice(0, -1);
                opts.last = "/";
            }
            this.ensure(array, this._pathToRegExp(path, opts));
        },
        ensure: function (target, item) {
            if (target.indexOf(item) === -1) {
                return target.push(item);
            }
        },
        route: function (method, path, query) {
            path = path.trim();
            var states = this.routingTable[method];
            for (var i = 0, el; el = states[i++]; ) {
                var args = path.match(el.regexp);
                if (args) {
                    el.query = query || {};
                    el.path = path;
                    el.params = {};
                    var keys = el.keys;
                    args.shift();
                    if (keys.length) {
                        this._parseArgs(args, el);
                    }
                    return  el.callback.apply(el, args);
                }
            }
            if (this.errorback) {
                this.errorback();
            }
        },
        _parseArgs: function (match, stateObj) {
            var keys = stateObj.keys;
            for (var j = 0, jn = keys.length; j < jn; j++) {
                var key = keys[j];
                var value = match[j] || "";
                if (typeof key.decode === "function") {
                    var val = key.decode(value);
                } else {
                    try {
                        val = JSON.parse(value);
                    } catch (e) {
                        val = value;
                    }
                }
                match[j] = stateObj.params[key.name] = val;
            }
        },
        redirect: function (hash) {
            this.navigate(hash, {replace: true});
        },
        navigate: function (hash, options) {
            var parsed = parseQuery((hash.charAt(0) !== "/" ? "/" : "") + hash),
                    options = options || {};
            if (hash.charAt(0) === "/")
                hash = hash.slice(1);
            // if (!avalon.state || options.silent)
            if (true) {
                history && history.updateLocation(hash, $.extend({}, options, {silent: true}));
            }
            // if (!options.silent) {
                this.route("get", parsed.path, parsed.query, options);
            // }
        },
        when: function (path, redirect) {
            var me = this,
                path = path instanceof Array ? path : [path];
            $.each(path, function (index, p) {
                me.add("get", p, function () {
                    var info = me.urlFormate(redirect, this.params, this.query);
                    me.navigate(info.path + info.query, {replace: true});
                });
            });
            return this;
        },
        get: function (path, callback) {
        },
        urlFormate: function (url, params, query) {
            var query = query ? queryToString(query) : "",
                hash = url.replace(placeholder, function (mat) {
                    var key = mat.replace(/[\{\}]/g, '').split(":");
                    key = key[0] ? key[0] : key[1];
                    return params[key] || '';
                }).replace(/^\//g, '');
            return {
                path: hash,
                query: query
            }
        },
        $types: {
            date: {
                pattern: "[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])",
                decode: function (val) {
                    return new Date(val.replace(/\-/g, "/"));
                }
            },
            string: {
                pattern: "[^\\/]*"
            },
            bool: {
                decode: function (val) {
                    return parseInt(val, 10) === 0 ? false : true;
                },
                pattern: "0|1"
            },
            int: {
                decode: function (val) {
                    return parseInt(val, 10);
                },
                pattern: "\\d+"
            }
        }
    };

    "get,put,delete,post".replace(/[^,]+/g, function (method) {
        return  Router.prototype[method] = function (a, b, c) {
            this.add(method, a, b, c);
        }
    });

    function quoteRegExp(string, pattern, isOptional) {
        var result = string.replace(/[\\\[\]\^$*+?.()|{}]/g, "\\$&");
        if (!pattern)
            return result;
        var flag = isOptional ? '?' : '';
        return result + flag + '(' + pattern + ')' + flag;
    }
    $.router = new Router;
    return $.router;
})();
module.exports = (function($) {
    'use strict';
    
    var anchorElement = document.createElement('a');
    var History = function() {
        this.location = location;
    };
    History.started = false;
    History.IEVersion = (function() {
        var mode = document.documentMode;
        return mode ? mode : window.XMLHttpRequest ? 7 : 6;
    })();
    History.defaults = {
        basepath: "/",
        html5Mode: false,
        hashPrefix: "!",
        iframeID: null,
        interval: 50,
        fireAnchor: true
    };
    var oldIE = window.VBArray && History.IEVersion <= 7;
    var supportPushState = !!(window.history.pushState);
    var supportHashChange = !!("onhashchange" in window && (!window.VBArray || !oldIE));
    History.prototype = {
        constructor: History,
        getFragment: function(fragment) {
            if (fragment == null) {
                if (this.monitorMode === "popstate") {
                    fragment = this.getPath();
                } else {
                    fragment = this.getHash();
                }
            }
            return fragment.replace(/^[#\/]|\s+$/g, "");
        },
        getHash: function(window) {
            var path = (window || this).location.href;
            return this._getHash(path.slice(path.indexOf("#")));
        },
        _getHash: function(path) {
            if (path.indexOf("#/") === 0) {
                return decodeURIComponent(path.slice(2));
            }
            if (path.indexOf("#!/") === 0) {
                return decodeURIComponent(path.slice(3));
            }
            return "";
        },
        getPath: function() {
            var path = decodeURIComponent(this.location.pathname + this.location.search);
            var root = this.basepath.slice(0, -1);
            if (!path.indexOf(root)) {
                path = path.slice(root.length);
            }
            return path.slice(1);
        },
        _getAbsolutePath: function(a) {
            return !a.hasAttribute ? a.getAttribute("href", 4) : a.href;
        },
        start: function(options) {
            if (History.started) {
                throw new Error("angejia history has already been started");
            }
            History.started = true;
            this.options = $.extend({}, History.defaults, options);
            this.html5Mode = !!this.options.html5Mode;
            this.monitorMode = this.html5Mode ? "popstate" : "hashchange";
            if (!supportPushState) {
                if (this.html5Mode) {
                    this.html5Mode = false;
                }
                this.monitorMode = "hashchange";
            }
            if (!supportHashChange) {
                this.monitorMode = "iframepoll";
            }
            this.prefix = "#" + this.options.hashPrefix + "/";
            this.basepath = ("/" + this.options.basepath + "/").replace(/^\/+|\/+$/g, "/");
            this.fragment = this.getFragment();
            anchorElement.href = this.basepath;
            this.rootpath = this._getAbsolutePath(anchorElement);
            var that = this;
            var html = '<!doctype html><html><body>@</body></html>';
            if (this.options.domain) {
                html = html.replace("<body>", "<script>document.domain =" + this.options.domain + "</script><body>");
            }
            this.iframeHTML = html;
            if (this.monitorMode === "iframepoll") {
                $(function() {
                    if(that.iframe) {
                        return;
                    }
                    var iframe = that.iframe || document.getElementById(that.iframeID) || document.createElement('iframe');
                    iframe.src = 'javascript:0';
                    iframe.style.display = 'none';
                    iframe.tabIndex = -1;
                    document.body.appendChild(iframe);
                    that.iframe = iframe.contentWindow;
                    that._setIframeHistory(that.prefix + that.fragment);
                })
            }
            function checkUrl(e) {
                var iframe = that.iframe;
                if (that.monitorMode === "iframepoll" && !iframe) {
                    return false;
                }
                var pageHash = that.getFragment(), hash;
                if (iframe) {
                    var iframeHash = that.getHash(iframe);
                    if (pageHash !== that.fragment) {
                        that._setIframeHistory(that.prefix + pageHash);
                        hash = pageHash;
                    } else if (iframeHash !== that.fragment) {
                        that.location.hash = that.prefix + iframeHash;
                        hash = iframeHash;
                    }
                } else if (pageHash !== that.fragment) {
                    hash = pageHash;
                }
                if (hash !== void 0) {
                    that.fragment = hash;
                    options.fromHistory = true;
                    that.fireRouteChange(hash, options);
                } else {
                    window.scrollTo(0, 0);
                }
            }
            switch (this.monitorMode) {
                case "popstate":
                    this.checkUrl = $(window).on("popstate", checkUrl);
                    this._fireLocationChange = checkUrl;
                    break
                case  "hashchange":
                    this.checkUrl = $(window).on("hashchange", checkUrl);
                    break;
                case  "iframepoll":
                    this.checkUrl = setInterval(checkUrl, this.options.interval);
                    break;
            }
            $(function() {
                $.history.options.replace = false;
                that.fireRouteChange(that.fragment || "/", $.history.options);
            });
        },
        fireRouteChange: function(hash, options) {
            var router = $.router;
            if (router && router.navigate) {
                router.navigate(hash === "/" ? hash : "/" + hash, options);
            }
            if (this.options.fireAnchor) {
                scrollToAnchorId(hash.replace(/\?.*/g,""));
            }
        },
        stop: function() {
            $(window).off("popstate", this.checkUrl);
            $(window).off("hashchange", this.checkUrl);
            clearInterval(this.checkUrl);
            History.started = false;
        },
        updateLocation: function(hash, options, urlHash) {
            var options = options || {},
                rp = options.replace,
                st =    options.silent;
            if (this.monitorMode === "popstate") {
                var path = this.rootpath + hash + (urlHash || "");
                if(path != this.location.href.split("#")[0]) history[rp ? "replaceState" : "pushState"]({path: path}, document.title, path);
                if(!st) this._fireLocationChange();
            } else {
                var newHash = hash ? this.prefix + hash : '';
                if(st && hash != this.getHash()) {
                    this._setIframeHistory(newHash, rp);
                    this.fragment = this._getHash(newHash);
                }
                this._setHash(this.location, newHash, rp);
            }
        },
        _setHash: function(location, hash, replace){
            var href = location.href.replace(/(javascript:|#).*$/, '');
            if (replace){
                location.replace(href + hash);
            } else {
                location.hash = hash;
            }
        },
        _setIframeHistory: function(hash, replace) {
            if(!this.iframe) {
                return;
            }
            var idoc = this.iframe.document;
                idoc.open();
                idoc.write(this.iframeHTML);
                idoc.close();
            this._setHash(idoc.location, hash, replace);
        }
    }
    $.history = new History;
    $(document).on("click", function(event) {
        var defaultPrevented = "defaultPrevented" in event ? event['defaultPrevented'] : event.returnValue === false;
        if (defaultPrevented || event.ctrlKey || event.metaKey || event.which === 2){
            return;
        }
        var target = event.target;
        while (target.nodeName !== "A") {
            target = target.parentNode;
            if (!target || target.tagName === "BODY") {
                return;
            }
        }
        if (targetIsThisWindow(target.target)) {
            var href = oldIE ? target.getAttribute("href", 2) : target.getAttribute("href") || target.getAttribute("xlink:href");
            var prefix = $.history.prefix;
            if (href === null) {
                return;
            }
            var hash = href.replace(prefix, "").trim();
            if (href.indexOf(prefix) === 0) {
                event.preventDefault();
                $.router && $.router.navigate(hash, $.history.options);
            }
        }
    });
    function targetIsThisWindow(targetWindow) {
        if (!targetWindow || targetWindow === window.name || targetWindow === '_self' || (targetWindow === 'top' && window == window.top)) {
            return true;
        }
        return false;
    }
    function getFirstAnchor(list) {
        for (var i = 0, el; el = list[i++]; ) {
            if (el.nodeName === "A") {
                return el;
            }
        }
    }
    function scrollToAnchorId(hash, el) {
        if ((el = document.getElementById(hash))) {
            el.scrollIntoView();
        } else if ((el = getFirstAnchor(document.getElementsByName(hash)))) {
            el.scrollIntoView();
        } else {
            window.scrollTo(0, 0);
        }
    }
    return $.history;
})($);
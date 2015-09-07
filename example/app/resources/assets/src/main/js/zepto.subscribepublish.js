(function($) {
    $.sp = (function() {
        var events = {};

        function subscribe(moduleAction, callback, obj) {
            events[moduleAction] = events[moduleAction] || [];
            events[moduleAction].push({obj: obj, event: callback});
        }

        function unsubscribe(moduleAction, callback) {
            //delete events[moduleAction];
            var _events = events[moduleAction];
            for (var i=0, len = _events.length; i < len; i++) {
                if (callback === _events[i].event) {
                    _events.splice(i, 1);
                    break;
                }
            }
        }

        function publish(moduleAction, args) {
            var _events = events[moduleAction] || [];
            if (Object.prototype.toString.call(args) !== '[object Array]') {
                args = [args];
            }

            for (var i = 0,len = _events.length; i < len; i++) {
                _events[i].event.apply(_events[i].obj, args);
            }
        }

        return {
            //clear: clear,
            events: events,//TODO::remove
            subscribe: subscribe,
            unsubscribe: unsubscribe,
            publish: publish
        };
    })();

    return $.sp;
})($);
module.exports = (function () {

    var storage = {
        isSupport: window.localStorage ? true : false,
        set: function (key, val) {
            if(val === undefined) {
                return this.remove(key);
            }
            window.localStorage.setItem(key, this.stringify(val));
            return val;
        },
        get: function(key){
            return this.deserialize(window.localStorage.getItem(key));
        },
        has: function(key) {
            return window.localStorage.hasOwnProperty(key);
        },
        remove: function(key) {
            var val = this.get(key);
            window.localStorage.removeItem(key);
            return val;
        },
        clear: function() {
            return window.localStorage.clear();
        },
        deserialize: function(value) {
            if (typeof value != 'string') {
                return undefined;
            }
            try {
                return JSON.parse(value);
            } catch(e) {
                return value || undefined;
            }
        },
        isJSON: function(obj) {
            return typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() && !obj.length;
        },
        stringify: function(val) {
            return val === undefined || typeof val === "function" ? val+'' : JSON.stringify(val);
        }
    };

    return storage;
})();
function Http(){
    console.log('main');
}

if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {

    // AMD. Register as an anonymous module.
    define(function() {
        return Http;
    });
} else if (typeof module !== 'undefined' && module.exports) {
    module.exports = Http;
} else {
    $.http = Http;
}
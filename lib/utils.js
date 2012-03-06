(function (global) {
    var common = global.common || {};

    common.clock = {

        getTime: function () {
            return this.delegate();
        },

        delegate: function () {
            return new Date();
        }

    };

    if (typeof module === 'undefined') {
        global.common = common;
    } else {
        module.exports = common;
    }
}(this));
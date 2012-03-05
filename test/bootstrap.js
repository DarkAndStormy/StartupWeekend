(function (global) {

	global.console = global.console || {};
	global.console.log = buster.log;

    global.common = {
        // TODO: rewrite this with tests. it is ugly.
        getCallWithArgs: function (spy, args) {
            var call, argIdx;
            if (spy.calledWith.apply(spy, args)) {
                for (call = 0; call < spy.args.length; call++) {
                    if (spy.args[call].length >= args.length) {
                        for (argIdx = 0; argIdx < args.length; argIdx++) {
                            if (spy.args[call][argIdx] !== args[argIdx]) {
                                continue;
                            }
                            return spy.getCall(call);
                        }
                    }
                }
            }

            sinon.assert.fail('spy was not called with args [' + args.join(', ') + ']');
        },

        anyString: function (length) {
            var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz",
                randomstring = '',
                rnum,
                i;
            length = length || 8;
            for (i = 0; i < length; i++) {
                rnum = Math.floor(Math.random() * chars.length);
                randomstring += chars.substring(rnum,rnum+1);
            }

            return randomstring;
        }
    };

    if (typeof module !== 'undefined') {
        module.exports = global.common;
    }
}(this));
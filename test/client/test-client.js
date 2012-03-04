(function () {
	'use strict';

	buster.testCase('Client Tests', {

		setUp: function () {
			
		},

		'that this is working': function () {
			sinon.spy();
			assert.equals(true, true);
		}

	});
}());

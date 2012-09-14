"use strict";
require("buster");
var my = require("../src/oppgave.js");

buster.testCase("A module", {
    "states the obvious": function () {
	assert.equals(my.double(5), "10", "Should double the number");
    },
    "we need a funny failing test also": function () {
	assert.same(my.double(5), "10", "Should double the number");
    }
});

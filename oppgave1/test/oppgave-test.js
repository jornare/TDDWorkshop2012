/*
 * Oppgave 1
 * Dette er testene til oppgave 1.
 * Det er et par feil her, kan du finne de?
 * N�r du kj�rer "buster test" vil lint-feil vises i gult. Det er feil som har med hvor pent koden er satt opp � gj�re, ikke logiske feil.
 */

"use strict";
require("buster");
var my = require("../src/oppgave.js");

buster.testCase("My Test Case", {
    "The double of five should equal ten": function () {
	assert.equals(my.double(5), "10", "Should double the number");
    },
    "The double of five should be the same as 10": function () {
	assert.same(my.double(5), "10", "Double of 5 should be the same as 10");
    }
});

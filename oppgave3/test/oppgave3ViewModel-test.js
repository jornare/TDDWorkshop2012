/*
 * Tester til oppgave 3
 * Legg merke til "setUp" funksjonen. Alt som deklareres her er globalt tilgjengelig i dine tester.
 * Oppgaven er å lage this.vm.canReserveAnotherSeat, men husk å lage testene her først.
 * Hvilke krav stilles til en slik funksjon?
 * 	Kan du reservere et sete når lista (this.vm.seats) er:
 * 		tom
 * 		har ett element med eller uten navn utfylt?
 * 		osv...
 * Skriv 1 test som feiler, gi tastaturet til den andre og få han til å fikse feilen.
 * La han skrive en ny test som feiler og det er igjen din tur å rette.
 */
"use strict";
buster.testCase("The ViewModel", {
    "setUp": function () {
        this.vm = new ReservationsViewModel();
    },
    "total sum should be 200 when initialized": function () {
        assert.same(this.vm.totalSurcharge(), 200);
    },
    "total number of seats should be two": function () {
        assert.same(this.vm.seats().length, 2);
    },
    "after adding a seat there should be three seats": function () {
        this.vm.addSeat();
        assert.same(this.vm.seats().length, 3);
    },
    "after remoivng a seat there should be one seat left": function () {
        var seatToRemove = _.first(this.vm.seats());
        this.vm.removeSeat(seatToRemove);
        assert.same(this.vm.seats().length, 1);
    },
    "if an attendee chooses Premium option total price should be 125": function () {
        var premiumMeal = this.vm.availableMeals[1];
        _.first(this.vm.seats()).meal(premiumMeal);
        assert.same(this.vm.totalSurcharge(), 125);
    },
    "if both attendees choose Premium option total price should be twice 25": function () {
        var twoTimes25 = 25 * 2,
            premiumMeal = this.vm.availableMeals[1];
        _.first(this.vm.seats()).meal(premiumMeal);
        _.last(this.vm.seats()).meal(premiumMeal);
        assert.same(this.vm.totalSurcharge(), twoTimes25);
    }
});

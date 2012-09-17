"use strict";
buster.testCase("The ViewModel", {
    "setUp": function () {
        this.vm = new ReservationsViewModel();
    },
    "total sum should be zero when initialized": function () {
        assert.same(this.vm.totalSurcharge(), 0);
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
    "if an attendee chooses Premium option total price should be 50": function () {
        _.first(this.vm.seats()).meal(_.last(this.vm.availableMeals));
        assert.same(this.vm.totalSurcharge(), 0);
    },
    "if both attendees choose Premium option total price should be twice 50": function () {
        var twoTimes50 = 50 * 2,
            expensiveMeal = _.last(this.vm.availableMeals);
        _.first(this.vm.seats()).meal(expensiveMeal);
        _.last(this.vm.seats()).meal(expensiveMeal);
        assert.same(this.vm.totalSurcharge(), twoTimes50);
    }
});

"use strict";
buster.testCase("The ViewModel", {
    "setUp": function () {
        this.vm = new ReservationsViewModel();
    },
    
    "canReserveAnotherSeat should be defined": function() {
        assert.defined(this.vm.canReserveAnotherSeat);
    },
    
    "can reserve another seat when list is empty": function() {
        this.vm.seats([]);
        assert(this.vm.canReserveAnotherSeat());
    },
    
    "can not reserve another seat if list contains a seat with no name": function(){
        this.vm.addSeat();
        refute(this.vm.canReserveAnotherSeat(),"Should not be able to reserve another seat when empty seat is in list"); 
    },
    
    "can reserve another seat if an empty seat is added and given a name": function(){
        var newseat = this.vm.addSeat();
        newseat.name("ola");
        assert(this.vm.canReserveAnotherSeat(),""); 
    },
     "can reserve another seat if empty seat is deleted": function(){
        var newseat = this.vm.addSeat();
        this.vm.removeSeat(newseat);
        assert(this.vm.canReserveAnotherSeat(),""); 
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
    "if an attendee chooses Ultimate option total price should be 290": function () {
        _.first(this.vm.seats()).meal(_.last(this.vm.availableMeals));
        assert.same(this.vm.totalSurcharge(), 290);
    },
    "if both attendees choose Ultimate option total price should be twice 290": function () {
        var twoTimes290 = 290 * 2,
            expensiveMeal = _.last(this.vm.availableMeals);
        _.first(this.vm.seats()).meal(expensiveMeal);
        _.last(this.vm.seats()).meal(expensiveMeal);
        assert.same(this.vm.totalSurcharge(), twoTimes290);
    }
});
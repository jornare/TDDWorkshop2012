"use strict";
/*
 * Se http://sinonjs.org/docs/
 * 
 */
buster.testCase("The ViewModel", {
    "setUp": function () {
        // Spying on existing method
        this.spy(MYAPP.services, 'load');
        this.vm = new ReservationsViewModel();
    },
    "load should be called on initialization": function () {
        assert.calledOnce(MYAPP.services.load);
    },
    "should have one element when initialized": function () {
        assert.same(this.vm.seats().length, 1);
    },
    "should not save when an empty seat is added": function () {
        // replacing method with spy
        MYAPP.services.saveItem = this.spy();
        refute.calledOnce(MYAPP.services.saveItem);
        this.vm.addSeat();
        refute.calledOnce(MYAPP.services.saveItem);
    },
    "should not call save when an existing seat is added": function () {
        MYAPP.services.saveItem = this.spy();
        refute.calledOnce(MYAPP.services.saveItem);
        this.vm.addSeat(1, "Per", 1);
        refute.calledOnce(MYAPP.services.saveItem);
    },
    "should call save when a seat is modified": function () {
        var seat;
        MYAPP.services.saveItem = this.spy();
        refute.calledOnce(MYAPP.services.saveItem);
        seat = this.vm.addSeat(1, "Per", 1);
        refute.calledOnce(MYAPP.services.saveItem);
        seat.name("Petter");
        assert.calledOnce(MYAPP.services.saveItem);
    },
    "should call removeItem when a seat is removed": function () {
        var seat;
        MYAPP.services.removeItem = this.spy();
        refute.calledOnce(MYAPP.services.removeItem);
        seat = this.vm.addSeat(1, "Per", 1);
        refute.calledOnce(MYAPP.services.removeItem);
        this.vm.removeSeat(seat);
        assert.calledOnce(MYAPP.services.removeItem);
    }
});

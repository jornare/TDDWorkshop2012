"use strict";
/*
 * Se http://sinonjs.org/docs/
 * 
 */
buster.testCase("Load and Save The ViewModel", {
    "setUp": function () {
        // Spying on existing method
        this.spy(MYAPP.services, 'load');
        this.vm = new ReservationsViewModel();
    },
    "load should be called on initialization": function () {
        assert.calledOnce(MYAPP.services.load);
    },
    "should have one element when initialized": function () {

    },
    "should call save when an empty seat is added": function () {
        // replacing method with spy
        MYAPP.services.saveItem = this.spy();
        refute.calledOnce(MYAPP.services.saveItem);
        this.vm.addSeat();
        assert.calledOnce(MYAPP.services.saveItem);
    },
    "should not call save when an existing seat is added": function () {

    },
    "should call save when a seat is modified": function () {

    },
    "should call removeItem when a seat is removed": function () {

    }
});

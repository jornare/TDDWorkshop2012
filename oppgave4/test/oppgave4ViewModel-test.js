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
    }

});

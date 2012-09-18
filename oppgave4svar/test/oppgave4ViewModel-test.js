"use strict";
/*
 * Se http://sinonjs.org/docs/
 * 
 */
buster.testCase("The ViewModel", {
    "setUp": function () {
        // Spying on existing method
        this.spy(MYAPP.services, 'load');
        this.vm = new TaskListViewModel();
    },
    "load should be called on initialization": function () {
        assert.calledOnce(MYAPP.services.load);
    },
    "should have one element when initialized": function () {
        assert.same(this.vm.tasks().length, 1);
    },
    "should call save when save command is called, but not before": function () {
        // replacing method with spy
        MYAPP.services.save = this.spy();
        refute.calledOnce(MYAPP.services.save);
        this.vm.save();
        assert.calledOnce(MYAPP.services.save);
    },
    "should have loaded testdata from stub at init": function () {
        var firstTask = this.vm.tasks()[0];
        assert.defined(firstTask, 'There should be a loaded task');
        assert.equals(firstTask.title(), 'testtitle', 'The title should be title from the stub');
    },
    "the save function should have the tasklist as the first argument": function () {
        MYAPP.services.save = this.spy();
        this.vm.save();
        assert.calledWith(MYAPP.services.save, this.vm.tasks());
    }
});

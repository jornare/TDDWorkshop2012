"use strict";
buster.testCase("The ViewModel", {
    "should update the fullname when firstname changes": function () {
        var vm = new AppViewModel();
        vm.firstName("Arne");
        assert.equals(vm.fullName(), "Arne Bertington");
    },
    "should capitalized the last name capitalizeLastName is called": function () {
        var vm = new AppViewModel();
        vm.firstName("Arne");
        vm.capitalizeLastName();
        assert.equals(vm.fullName(), "Arne BERTINGTON");
    }
});

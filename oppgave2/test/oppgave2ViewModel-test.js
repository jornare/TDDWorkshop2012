/*
 * Tester til oppgave 2
 * Se http://busterjs.org/docs/assertions/ for måter å teste på ved bruk av assertions.
 * Eksempel:	assert.equals(verdi1, verdi2, feilmelding) //verdiene skal være like
 * 				refute(verdi1, verdi2, feilmelding) //verdiene skal være forskjellige
 * 				assert.defined(verdi1) //variabelen eller funksjonen skal være definert
 */
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

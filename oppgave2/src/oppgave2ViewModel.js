/*
 * I oppgave 2 skal vi bruke v�r f�rste ViewModel
 * Legg merke til hvordan vi bruker ko.observable() for � lage variable som skal oppdateres automatisk i GUI
 * Vi har ogs� ko.computed() som er en m�te � definere en funksjon som returnerer en verdi som ogs� blir automatisk oppdatert n�r en av
 * avhengighetene i funksjonen oppdaterer seg.
 * 
 * Oppgaven er � lage self.lowerCaseFirstName(), men husk � lage en test f�rst. Kanskje en test p� at den eksisterer overhodet?
 */
"use strict";
function AppViewModel() {
    var self = this;
    self.firstName = ko.observable("Bert");
    self.lastName = ko.observable("Bertington");

    self.fullName = ko.computed(function () {
        return self.firstName() + " " + self.lastName();
    }, self);

    self.capitalizeLastName = function () {
        var currentVal = self.lastName();        // Read the current value
        self.lastName(currentVal.toUpperCase()); // Write back a modified value
    };
}



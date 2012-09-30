/*
 * I oppgave 2 skal vi bruke vår første ViewModel
 * Legg merke til hvordan vi bruker ko.observable() for å lage variable som skal oppdateres automatisk i GUI
 * Vi har også ko.computed() som er en måte å definere en funksjon som returnerer en verdi som også blir automatisk oppdatert når en av
 * avhengighetene i funksjonen oppdaterer seg.
 * 
 * Oppgaven er å lage self.lowerCaseFirstName(), men husk å lage en test først. Kanskje en test på at den eksisterer overhodet?
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



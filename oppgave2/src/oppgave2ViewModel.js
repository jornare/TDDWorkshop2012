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



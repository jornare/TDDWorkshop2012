"use strict";

/*
 * Oppgave 3 - Collections & Observable Arrays
 * 
 * Lag self.canReserveAnotherSeat testdrevet (med PingPong om mulig)
 * Bind opp "Reserver ett sete til" knappen mot denne funksjonen (se index.html)
 * 
 */

function SeatReservation(name, initialMeal) {
    var self = this;
    self.name = name;
    self.meal = ko.observable(initialMeal);

    self.formattedPrice = ko.computed(function () {
        var price = self.meal().price;
        return price ? price.toFixed(2) + "kr" : "Gratis";
    });
}

// Overall viewmodel for this screen, along with initial state
function ReservationsViewModel() {
    var self = this;

    // Non-editable catalog data - would come from the server
    self.availableMeals = [
                           { id: 1, mealName: "Standard (Olapakka)", price: 100 },
                           { id: 2, mealName: "Premium (Pizza)", price: 25 },
                           { id: 3, mealName: "Ultimate (Pizza og &Oring;l)", price: 0 }
                       ];

    // Editable data
    self.seats = ko.observableArray([
        new SeatReservation("Steve", _.first(self.availableMeals)),
        new SeatReservation("Bert", _.first(self.availableMeals))
    ]);

    // Computed data
    self.totalSurcharge = ko.computed(function () {
        var sum  = _.reduce(self.seats(), function (sum, reservation) {
            return sum + reservation.meal().price;
        }, 0);
        return sum;
    });

    // Operations
    self.addSeat = function () {
        self.seats.push(new SeatReservation("", _.first(self.availableMeals)));
    };

    self.removeSeat = function (seat) {
        self.seats.remove(seat);
    };
}

"use strict";

/*
 * Oppgave 4 - Lasting og Lagring
 * 
 * 
 * 
 */

function SeatReservation(name, initialMeal) {
    var self = this;
    self.name = ko.observable(name);
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
        var newseat = new SeatReservation("", _.first(self.availableMeals));
        self.seats.push(newseat);
        return newseat;
    };

    self.removeSeat = function (seat) {
        self.seats.remove(seat);
    };

    self.canReserveAnotherSeat = ko.computed(function () {
        var i = 0, seats = self.seats();
        for (i = 0; i < seats.length; i += 1) {
            if (!seats[i].name()) {
                return false;
            }
        }
        return true;
    });
}

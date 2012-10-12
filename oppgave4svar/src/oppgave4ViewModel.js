"use strict";

/*
 * Oppgave 4 - Lasting og Lagring
 * 
 * 
 * 
 */

function SeatReservation(id, name, initialMeal) {
    var self = this;
    self.isLoading = false;
    self.id = ko.observable(id);
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
        { id: 0, mealName: "Standard (Olapakka)", price: 100 },
        { id: 1, mealName: "Premium (Pizza)", price: 25 },
        { id: 2, mealName: "Ultimate (Pizza og Øl)", price: 0 }
    ];

    // Editable data
    self.seats = ko.observableArray([
        //new SeatReservation("Steve", _.first(self.availableMeals)),
        //new SeatReservation("Bert", _.first(self.availableMeals))
    ]);

    // Computed data
    self.totalSurcharge = ko.computed(function () {
        var sum  = _.reduce(self.seats(), function (sum, reservation) {
            return sum + reservation.meal().price;
        }, 0);
        return sum;
    });

    // Operations
    self.addSeat = function (id, name, mealId) {
        var newseat, meal;
        if (typeof (mealId) === 'undefined') {
            newseat = new SeatReservation(null, "", _.first(self.availableMeals));
        } else {
            meal = self.availableMeals[mealId];
            newseat = new SeatReservation(id, name, meal);
        }
        newseat.name.subscribe(function ( newValue ) {
            if (!newseat.isLoading) {
                MYAPP.services.saveItem(newseat, function () {});
            }
        });
        newseat.meal.subscribe(function ( newValue ) {
            if (!newseat.isLoading) {
                MYAPP.services.saveItem(newseat, function () {});
            }
        });
        self.seats.push(newseat);
        return newseat;
    };

    self.removeSeat = function (seat) {
        MYAPP.services.removeItem(seat, function (err, response) {
            if (err) {
                alert(err);
            }
        });
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
    
    self.getSeatById = function (id) {
        var i, s = self.seats();
        for ( i = 0; i< s.length; i += 1) {
            if (s[i].id() == id) {
                return s[i];
            }
        }
        return null;
    };

    //merges data from server with seat reservations in viewmodel
    self.mergeSeats = function (data) {
        var i, j, seat, seats = self.seats(), newseat, foundseat;
        for (i = 0; i < seats.length; i += 1){//remove seats not in the viewmodel
            seat = seats[i];
            if (!seat.id()) { //If seat is not saved, don't remove it
            	continue;
            }
            foundseat = false;
            for (j = 0; j < data.length; j +=1 ){
                if (seat.id() == data[j].id){
                    foundseat = true;
                    break;
                }
            }
            if (!foundseat) {
                self.seats.remove(seat);
            }
        }
        
        for (i = 0; i< data.length; i += 1) {//add new seats from server
            newseat = data[i];
            seat = self.getSeatById(data[i].id);
            if (seat) {
            	seat.isLoading = true;
                seat.name(newseat.name);
                seat.meal(self.availableMeals[newseat.mealId]);
                seat.isLoading = false;
            } else {
                self.addSeat(newseat.id, newseat.name, newseat.mealId);
            }
        }
    };
    
    self.load = function () {
        MYAPP.services.load(function(err, data) {
            if (err) {
                return false;
            } else {
                self.mergeSeats(data);
            }
            return true;
        });
    };
    self.load();
    
    setInterval(function () {self.load();}, 2000);
}

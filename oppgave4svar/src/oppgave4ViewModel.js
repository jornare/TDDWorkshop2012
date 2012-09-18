"use strict";

/*
 * Oppgave 4 - Lasting og Lagring
 * 
 * 
 * 
 */

function SeatReservation(id, name, initialMeal) {
    var self = this;
    self.id = ko.observable(id);
    self.name = ko.observable(name);
    self.meal = ko.observable(initialMeal);

    self.formattedPrice = ko.computed(function () {
        var price = self.meal().price;
        return price ? price.toFixed(2) + "kr" : "Gratis";
    });
    
    self.name.subscribe(function () {
    	//TODO: save
    })
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
    	if (!id) {
        	newseat = new SeatReservation(null, "", _.first(self.availableMeals));
    	} else {
    		meal = self.availableMeals[ mealId-1 ];
    		newseat = new SeatReservation(id, name, meal);
    	}
        self.seats.push(newseat);
        return newseat;
    };

    self.removeSeat = function (seat) {
    	MYAPP.services.removeItem(seat, function (err, response) {
    		if( err ){
    			alert( err );
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
    
    self.load = function() {
    	MYAPP.services.load( function(err, data) {
    		if( err ) {
    			return false;
    		} else {
    			for ( i = 0; i< data.length; i +=1){
    				self.addSeat(data.id, data.name, data.mealId);
    			}
    		}
    		return true;
    	});
    	
    };
}

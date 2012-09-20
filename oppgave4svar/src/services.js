var MYAPP = MYAPP || {};
(function () {
    "use strict";
    var serverURL = "http://localhost:1337";
    MYAPP.services = MYAPP.services || {};

    MYAPP.services.load = function (callback) {
        $.ajax(serverURL + "/load", {
            data: '{}',
            dataType: 'json',
            type: 'post'
        }).success(function (result) {//Result is an array of Seat Reservations
            callback(null, result);
        }).error(function () {
            callback("some error occurred");
        });
    };

    MYAPP.services.saveItem = function (data, callback) {
        $.ajax(serverURL + "/saveItem", {
            data: ko.toJSON(data),
            dataType: 'json',
            type: "post"
        }).success(function (result) {
            if (!data.id()) {
                data.id(result.id);
            }
            callback(null, result);
        }).error(function () {
            callback("some error occured");
        });
    };

    MYAPP.services.removeItem = function (data, callback) {
        $.ajax(serverURL + "/removeItem", {
            data: ko.toJSON(data),
            dataType: 'json',
            type: "post"
        }).success(function (result) {
            callback(null, result);
        }).error(function (x, msg, err) {
            callback("some error occured" + msg);
        });
    };
}());

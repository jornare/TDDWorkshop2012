var MYAPP = MYAPP || {};
(function () {
    MYAPP.services = MYAPP.services || {};
    
    MYAPP.services.load = function (callback) {
        $.getJSON("http://localhost:1337/reservations")
        .success(function (result) {
            var mappedTasks = $.map(result, function(item) { return new Task(item) });
            callback(null, mappedTasks);})
        .error(function () {callback("some error occurred");});
    };
    
    MYAPP.services.save = function (data, callback) {
        $.ajax("http://localhost:1337/reservations", {
            data: ko.toJSON(data),
            type: "post", contentType: "application/json",
        })
        .success(function(result) { callback(null, result); })
        .error(function() { callback("some error occured"); });
    };
}());

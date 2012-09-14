var http = require('http'),
    response = JSON.stringify([{'name':'Ola','meal':1},{'name':'Per','meal':2},{'name':'Eva','meal':3},{'name':'Olga','meal':3}]);

// do not EVER use the death* for allow origin for real
// It's just used here to avoid having to run the index of a local fileserver
http.createServer(function (req, res) {
    if (req.method === "GET") {
        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*'
        });
        res.end(response);
    } else {
         res.writeHead(201, {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*'
        });
        res.end("POST OK, but server is stupid and does not save");
    }
}).listen(1337, '127.0.0.1');

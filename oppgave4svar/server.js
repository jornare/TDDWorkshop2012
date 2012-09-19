var http = require('http')
			, fs = require('fs')
			, reservations = [{id:1, 'name':'Ola','meal':1},
                    {id:2, 'name':'Per','meal':2},
                    {id:3, 'name':'Eva','meal':3},
                    {id:4, 'name':'Olga','meal':3}];

// do not EVER use the death* for allow origin for real
// It's just used here to avoid having to run the index of a local fileserver
http.createServer(function (req, res) {
    if (req.method === "GET") {

        console.log(req.url);
        if(req.url.indexOf('.')>0){
            res.writeHead(200, {
                'Content-Type': 'text/html',
                'Access-Control-Allow-Origin': '*'
            });        	
	        fs.readFile(__dirname + req.url,
	            function (err, data) {
	                if (err) {
	                    res.writeHead(400);
	                    return res.end('File not found');
	                }else{
	                	return res.end((data+'').replace(/^\uFEFF/, ''));
	                }
	        });
        }else{
            res.writeHead(200, {
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': '*'
            });        	
            res.end(JSON.stringify(reservations));
        }


    } else {
         res.writeHead(201, {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*'
        });
        res.end("POST OK, but server is stupid and does not save");
    }
}).listen(1337, '127.0.0.1');

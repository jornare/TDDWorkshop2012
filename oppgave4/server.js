var http = require('http')
			, fs = require('fs')
			, reservations = [{id:1, 'name':'Ola','mealId':1},
                    {id:2, 'name':'Per','mealId':2},
                    {id:3, 'name':'Eva','mealId':3},
                    {id:4, 'name':'Olga','mealId':3}];

// do not EVER use the death* for allow origin for real
// It's just used here to avoid having to run the index of a local file server
http.createServer(function (req, res) {
	var headers ={
            'Access-Control-Allow-Origin': '*',
            'Cache-Control':'no-cache, no-store, must-revalidate',
            'Expires':'0'
        };
	
	if (req.method == 'POST') {
    	headers['Content-Type']= 'text/plain';
        var body = '';
        req.on('data', function (dataChunk) {
            body += dataChunk.toString();
        });
        req.on('end', function () {
            console.log(body);
            var data = JSON.parse(body);
            switch(req.url){
            case '/load':
            	res.writeHead(200,headers);
            	res.end(JSON.stringify(reservations));
            	break;
            case '/saveItem':
            	if(data.id){//update
            		for(var i=0; i<reservations.length; i++){
            			if(reservations[i].id==data.id){
            				reservations[i].name = data.name;
            				reservations[i].mealId = data.meal.id;
            				break;
            			}
            		}
            	} else {//new
                	var d = new Date(), id;
                	id=d.getTime();
                	var seat ={id:id, 'name':data.name,'mealId':data.meal.id};
                	reservations.push(seat);
            	}

            	res.writeHead(200,headers);
            	res.end(JSON.stringify({id:id}));
            	break;       
            case '/removeItem':
            	var i, rid;
            	rid=data.id;
            	for(i = 0; i< reservations.length; i++){
            		if(reservations[i].id == rid){
            			reservations.splice(i,1);
            			console.log('Removed '+rid);
            			break;
            		}
            	}
            	res.writeHead(200,headers);
            	res.end(JSON.stringify({id:rid}));
            	break;  
            }
        });
    }else{
        fs.readFile(__dirname + req.url,
            function (err, data) {
                if (err) {
                    res.writeHead(400);
                    res.end('File not found');
                    console.log('File not found: ' + req.url);
                    return;
                }else{
                	res.write(data,'utf8');
                	res.end();
                	return;
                }
        });
    }

}).listen(1337, '127.0.0.1');

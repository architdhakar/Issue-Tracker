let http=require("http");

// Create server
http.createServer(function(req,res){
    res.writeHead(200,{'Content-type':'text/plain'});
    res.end('We have successfully created a server on port 4000');
}).listen(4000);
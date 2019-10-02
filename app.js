var express = require("express");
var app = new express();

app.get("/", function(req, res) {
    res.send("this will become our landing page soon");
});

app.get("*",function(req,res){
    res.send("Send something else.");
});

var port = 3000;
app.listen(port, function() {
    console.log("Server Connected at "+port);
});


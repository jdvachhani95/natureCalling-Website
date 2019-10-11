var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");

function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");    
    }); 
}
 
module.exports = seedDB;
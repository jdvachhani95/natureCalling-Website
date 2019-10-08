var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");

//INDEX - show all campgrounds
router.get("/", function(req, res) {
    //call all campgrounds from DB
    Campground.find({},function(err, allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index", {campgrounds:allCampgrounds});
        }
    });
});

//CREATE - add new campground to DB
router.post("/", function(req, res){
    
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name:name, image:image, description:desc};
    
    //Create new campground on DB
    Campground.create(newCampground, function(err,newlyCreated){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/campgrounds");
        }
    });
});

//NEW - show form to create new campground
router.get("/new", function(req, res){
    res.render("campgrounds/new");
});

// SHOW - shows more info about one campground 
router.get("/:id",function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/show", {campground:foundCampgrounds});
        }
    })
});

module.exports = router;
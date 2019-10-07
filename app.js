var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    seedDB      = require("./seeds");

    seedDB();
// ***** To avoid the mongodb error please see this link:https://mongoosejs.com/docs/deprecations.html
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
//*************** End of correction lines to connect db correctly!!

mongoose.connect("mongodb://localhost/natureCalling");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Campground.create({
//     name:"Salman creek", 
//     image:"https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//     description:"This is a very beautiful camping site right next to nature."
//     },function(err,campground){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(campground);
//     }
// });

// var campgrounds = [
//     {name:"Salman creek", image:"https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
//     {name:"Granband", image:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
//     {name:"Port stenly", image:"https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
//     {name:"Tobermory", image:"https://images.unsplash.com/photo-1545153996-e01b50d6ec38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
//     {name:"Gas pe", image:"https://images.unsplash.com/photo-1519395612667-3b754d7b9086?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"}
// ]

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/campgrounds", function(req, res) {
    //call all campgrounds from DB
    Campground.find({},function(err, allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("index", {campgrounds:allCampgrounds});
        }
    });
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

app.get("/campgrounds/:id",function(req, res){
    Campground.findById(req.params.id, function(err,foundCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("show", {campground:foundCampgrounds});
        }
    })
});


app.post("/campgrounds", function(req, res){
    
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



app.get("*",function(req,res){
    res.send("Send something else.");
});

var port = 3000;
app.listen(port, function() {
    console.log("Server Connected at "+port);
});

// cd C:\Program Files\MongoDB\Server\4.0\bin
const path = require('path');
const fs = require('fs');



let indexController ={
    showIndex : (req, res) => {
        res.render("index")
    },
    searchBar: (req,res) =>{
        res.redirect("index")
    },
}

module.exports = indexController;

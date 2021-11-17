const fs = require("fs")
const path = require('path');


let User = {

    allUsers: function (){
        return JSON.parse(fs.readFileSync(path.resolve(__dirname,"../db/users.json"), {encoding: "utf-8"}));
    },
    
    findUserByEmail: (field, value) =>{
        let usersJSON = fs.readFileSync(path.resolve(__dirname,"../db/users.json"), {encoding: "utf-8"});
        let usersList = [];
            if (usersJSON != ""){
                usersList = JSON.parse(usersJSON);
            };
        let userFound = usersList.find(oneUser => oneUser[field] == value)
        return userFound;
    }
}
    

module.exports = User

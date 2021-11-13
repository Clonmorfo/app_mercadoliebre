const { name } = require("ejs");
const fs = require ("fs");
const path = require("path");
const bcrypt = require("bcryptjs")

let usersJSON = fs.readFileSync(path.resolve(__dirname,"../db/users.json"), {encoding: "utf-8"});
let usersList = [];
if (usersJSON != ""){
    usersList = JSON.parse(usersJSON);
};


let controllerUser = {
    renderRegister: (req,res) => {
        res.render("register");
    },

    saveRegister: (req,res) => {
        let user = {
            id: usersList.length + 1,
            ...req.body,
            password: bcrypt.hashSync(req.body.password,10),
            avatar: req.file ? req.file.filename : "default-image.png" ,
        };
        
        usersList.push(user);
        usersJSON = JSON.stringify(usersList,null, " ");
        fs.writeFileSync(path.resolve(__dirname,"../db/users.json"), usersJSON);
        res.redirect("/users/register");        
    },

    renderUserList: (req, res) => {
        
        res.render("users/list",{"users": usersList });
    },

    deleteUser: (req, res) =>{
        for (i = 0; i< usersList.length; i++){
            if (usersList[i].id == req.params.id){
                for(j = i; j< usersList.length;j++){
                    usersList[j].id = usersList[j].id - 1;
                }
                if (usersList[i].avatar != "default-image.png"){
                    fs.unlinkSync(path.resolve(__dirname, "../../public/img/",productList[i].img))
                }
                usersList.splice(i,1)
            }
        }
        usersJSON = JSON.stringify(usersList,null, " ");
        fs.writeFileSync(path.resolve(__dirname,"../db/users.json"), usersJSON);
        res.redirect("/users/register"); 
    },
    viewUpdateUser: (req ,res) =>{
        
        res.render("users/update")

    },

    renderLogin: (req,res) =>{
        res.render("login")
    },
    login: (req,res) =>{
        res.redirect("/");
    }
}

module.exports = controllerUser ;
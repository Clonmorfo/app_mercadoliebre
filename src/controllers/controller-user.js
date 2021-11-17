const { name } = require("ejs");
const User = require("../models/User")
const fs = require ("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const {validationResult} = require("express-validator");
const { allUsers } = require("../models/User");


let usersJSON = fs.readFileSync(path.resolve(__dirname,"../db/users.json"), {encoding: "utf-8"});
let usersList = [];
if (usersJSON != ""){
    usersList = JSON.parse(usersJSON);
};


let controllerUser = {
    renderRegister: (req,res) => {
        res.render("register")
    },

    saveRegister: (req,res) => {
        let validations = validationResult(req);
        let userInDBEmail = User.findUserByEmail("email" , req.body.email);
        let user = {
            id: usersList.length + 1,
            ...req.body,
            password: bcrypt.hashSync(req.body.password,10),
            passwordconfirmation : undefined    ,
            avatar: req.file ? req.file.filename : "default-image.png" ,
        }; 

        if(userInDBEmail){
            return res.render("register",{
                errors: {
                    email: {
                        msg: "Este nombre de usuario ya esta en uso"
                    }
                }
            })
        }      
        

        if (validations.errors.length){
            return res.render("register",{errors: validations.mapped(), oldData: req.body})
        }else{
            usersList.push(user);
            usersJSON = JSON.stringify(usersList,null, " ");
            fs.writeFileSync(path.resolve(__dirname,"../db/users.json"), usersJSON);
            res.redirect("/users"); 
        }
        
         
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
                    fs.unlinkSync(path.resolve(__dirname, "../../public/images/users", usersList[i].avatar))
                }
                usersList.splice(i,1)
            }
        }
        usersJSON = JSON.stringify(usersList,null, " ");
        fs.writeFileSync(path.resolve(__dirname,"../db/users.json"), usersJSON);
        res.redirect("/users"); 
    },

    viewUpdateUser: (req, res) => {
        for(i= 0;i < usersList.length; i++){
            if (usersList[i].id == req.params.id){
                let id = usersList[i].id -1;
                res.render("users/update",{"usersList" : usersList, "id": id,});
            }            
        }
    },
    saveUpdateUser: (req, res) =>{
        
        for(let i =0; i < usersList.length; i++){
            if(req.file && usersList[i].avatar != "default-image.png" ){
                fs.unlinkSync(path.resolve(__dirname, "../../public/images/users", usersList[i].avatar))
            }
            let user = {
                ...usersList[i],
                username : req.body.username ? req.body.username: usersList[i].user,
                avatar : req.file ? req.file.filename : usersList[i].avatar,
                password : bcrypt.compareSync(req.body.password,usersList[i].password) ? usersList[i].password : 
                bcrypt.hashSync(req.body.password),
                adress : req.body.adress ? req.body.adress: usersList[i].adress,
            }
                        
            if(usersList[i].id == user.id){
                usersList.splice(i,1,user);
            }
            
        };
        usersJSON = JSON.stringify(usersList,null, " ");
        fs.writeFileSync(path.resolve(__dirname,"../db/users.json"), usersJSON);
        res.redirect("/users");

    },

    renderLogin: (req,res) =>{
        res.render("login")
    },
    login: (req,res) =>{
        for(let i = 0; i < User.allUsers().length;i++){
            if(req.body.username == User.allUsers()[i].username){
                if(bcrypt.compareSync(req.body.password,User.allUsers()[i].password)){
                    var userToLog = User.allUsers()[i];
                    break;
                }
            }
        }
        if(userToLog == undefined){
            return res.render("login",{errors :[
                {msg: "La contraseña o el email son incorrectas, revisa los campos y logueate de nuevo"}
            ]})
        }
        req.session.loggedUser = userToLog;
        res.redirect("/")
        
    }
}
module.exports = controllerUser ;
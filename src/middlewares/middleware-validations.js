let {body} = require("express-validator");
const User = require("../models/User")

const validator=[
    body("fullname")
    .isLength({min:1}).withMessage("El nombre es demasiado corto")
    .isLength({max:35}).withMessage("El nombre es demasiado largo"),

    body("username")
    .notEmpty().withMessage("El nombre de usuario es obligatorio").bail(),

    body("email")
        .notEmpty().withMessage("El Email es obligatorio").bail()
        .isEmail().withMessage("Debe ingresar un formato de Email valido").bail(),
        /*.custom(value => {
            return User.findUserByEmail(value).then(user => {
              if (user) {
                return Promise.reject('E-mail already in use');
              }
            });
          }),*/
        

    body("password")
        .notEmpty().withMessage("La contraseña no puede estar vacia").bail()
        .isLength({min:8}).withMessage("la contraseña debe tener al menos 8 caracteres"),

    body("passwordconfirmation")
    .custom((value,{req})=>{
        if(value != req.body.password){
            throw new Error("Las contraseñas deben de ser iguales");
        }
        return true;
    })
]
 module.exports = validator



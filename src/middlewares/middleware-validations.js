let {check} = require("express-validator");

const validator=[
    check("fullname")
    .isLength({min:1}).withMessage("El nombre es demasiado corto")
    .isLength({max:35}).withMessage("El nombre es demasiado largo"),

    check("username").notEmpty().withMessage("Este campo es obligatorio"),

    check("email")
        .notEmpty().withMessage("El Email es obligatorio").bail()
        .isEmail().withMessage("Debe ingresar un formato de Email valido"),

    check("password")
        .notEmpty().withMessage("La contraseña no puede estar vacia").bail()
        .isLength({min:8}).withMessage("la contraseña debe tener al menos 8 caracteres"),

    check("passwordconfirmation").custom((value,{req})=>{
        if(value != req.body.password){
            throw new Error("Las contraseñas deben de ser iguales");
        }
        return true;
    })
]
 module.exports = validator
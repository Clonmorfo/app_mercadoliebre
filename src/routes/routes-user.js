const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller-user');
const multer = require ('multer');
const path = require ('path');

/*Validations
const validations = require("../middlewares/middleware-validations")*/

// MULTER
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, path.resolve(__dirname, '../../public/images/users'))
    },
    filename: function(req,file,cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({storage: storage})

//User register render + save
router.get("/register", controller.renderRegister);
router.post("/register",upload.single("avatar"), controller.saveRegister);

//Listado de usuarios
router.get("/", controller.renderUserList);

//eliminacion de usuarios
router.delete("/:id/delete", controller.deleteUser);

//update de usuarios
router.get("/:id/update", controller.viewUpdateUser);



router.get("/login", controller.renderLogin);
router.post("/login", controller.login);

module.exports = router; 
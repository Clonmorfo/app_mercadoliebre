const express = require('express');
const router = express.Router();

const controller = require('../controllers/controller-index');


router.get("/", controller.showIndex);
router.post("/", controller.searchBar);

module.exports = router ;

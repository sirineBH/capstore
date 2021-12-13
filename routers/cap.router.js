const controller = require("../controllers/cap.controller")
const router = require("express").Router()
const guardAuth = require("./guardAuth")
const multer = require("multer")

router.get("/", controller.capLimitedController)
router.get("/caps/:id", guardAuth.isAuth, controller.getCapById)


module.exports = router
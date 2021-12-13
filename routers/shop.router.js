const controller = require("../controllers/cap.controller")
const router = require("express").Router()

router.get("/shop", controller.capController)

module.exports = router